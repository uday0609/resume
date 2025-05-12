import cohere
import torch
from sentence_transformers import util
import requests
import json

# ✅ Direct API Key
COHERE_API_KEY = "1b32r9bKmkQuFP1yjzxU0KSb8i0x9ULRp4szUZS0"

# ✅ Initialize Cohere Client
co = cohere.Client(COHERE_API_KEY)

def send_resume_to_api(resume, job):
    API_URL = "http://localhost:5000/resumes/post"

    payload = [
            {
                "name": resume.get("Name", "").strip(),  
                "email": resume.get("Email", "").strip(),
                "phone": resume.get("Phone Number", "").strip(),
                "skills": resume.get("Skills", []) if isinstance(resume.get("Skills", []), list) else resume.get("Skills", "").split(","),
                "job_id": int(job.get("Job ID", 0)) if str(job.get("Job ID", "")).isdigit() else 0,  
                "job_title": job.get("Job Title", "").strip(),
                "matching_score": float(job.get("Matching Score", "0").replace("%", ""))
            }
    ]
    print(json.dumps(payload,indent=4))
    
    try:
        headers={"Content-Type":"application/json"}
        response = requests.post(API_URL, json=payload,headers=headers)
        if response.status_code == 201:
            print(f"✅ Successfully stored: {resume['Name']} - {job['Job Title']}")
        else:
            print(f"❌ API Error: {response.json()}")
    except Exception as e:
        print(f"❌ Request failed: {e}")

# 🎯 Function to get Cohere Embeddings
def get_cohere_embedding(text):
    if not text.strip():
        return None
    try:
        response = co.embed(
            texts=[text],
            model="embed-english-v3.0",
            input_type="search_document",
            truncate="END"
        )
        return torch.tensor(response.embeddings[0])
    except Exception as e:
        print(f"❌ Error in embedding: {e}")
        return None

# 🎯 Function to calculate skill match percentage
def calculate_match_percentage(resume_skills, job_skills):
    if not resume_skills or not job_skills.strip():
        return 0.0, []  

    resume_set = set(map(str.lower, resume_skills))
    job_set = set(map(str.lower, job_skills.replace(",", ", ").split(", ")))  

    common_skills = resume_set.intersection(job_set)
    total_skills = len(job_set) if job_set else 1  
    matched_percentage = (len(common_skills) / total_skills) * 100

    return matched_percentage, common_skills

# 🎯 Function to match resume with jobs
def match_resume_with_jobs(resume_skills, jobs):
    if not jobs:
        print("❌ No jobs found!")  # Debugging ke liye
        return []

    best_job = None
    highest_match_score = 0.0
    MATCH_THRESHOLD = 85.0

    for job in jobs:
        job_id = job.get("job_id", "Unknown")  
        job_title = job.get("job_title", "Unknown Job")
        job_skills = job.get("required_skills", "").strip()
        print(f"📌 DEBUG: Checking Job → ID: {job_id}, Title: {job_title}, Skills: {job_skills}")

        if not job_skills:
            print(f"⚠️ Skipping job {job_id} ({job_title}) due to missing skills!")
            continue  

        # 🔍 Debugging Print
        print(f"📌 DEBUG: Checking Job → ID: {job_id}, Title: {job_title}, Skills: {job_skills}")

        resume_text = " ".join(resume_skills).lower()
        job_text = job_skills.lower()

        resume_embedding = get_cohere_embedding(resume_text)
        job_embedding = get_cohere_embedding(job_text)

        if resume_embedding is None or job_embedding is None:
            print(f"⚠️ Skipping {job_title} due to embedding error!")
            continue

        ai_similarity = util.pytorch_cos_sim(resume_embedding, job_embedding).item() * 100
        skill_match_percentage, matched_skills = calculate_match_percentage(resume_skills, job_skills)

        final_match_score = (ai_similarity * 0.7) + (skill_match_percentage * 0.3)

        if len(matched_skills) == 0:
            final_match_score = 0.0  

        print(f"📊 {job_title} (ID: {job_id}) AI Match: {ai_similarity:.2f}% | Skill Match: {skill_match_percentage:.2f}% | Matched: {matched_skills} → Final Score: {final_match_score:.2f}%")
        
        if final_match_score >= MATCH_THRESHOLD and final_match_score > highest_match_score:
            highest_match_score = final_match_score
            best_job = {
                "Job ID": job_id,
                "Job Title": job_title,
                "Matching Score": f"{final_match_score:.2f}%",
                "Required Skills": job_skills
            }

    return [best_job] if best_job else []

# ✅ Test Matching
if __name__ == "__main__":
    from fetch_jobs import fetch_all_jobs
    from extract_resume import process_all_resumes

    resumes = process_all_resumes()
    jobs = fetch_all_jobs()
    # print("🔍 DEBUG: Fetched Jobs →", jobs)  # 🛠 Check if job data is fetched properly

    for resume in resumes:
        print(f"📄 Checking matches for {resume.get('Name', 'Unknown Candidate')}...")
        matched_jobs = match_resume_with_jobs(resume["Skills"], jobs)
        if matched_jobs:
            send_resume_to_api(resume, matched_jobs[0])  
        print("✅ Best Matched Job:", matched_jobs)