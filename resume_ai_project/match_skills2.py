import requests
import json
from sentence_transformers import SentenceTransformer, util
import torch
from fetch_jobs import fetch_all_jobs
from extract_resume import process_all_resumes

# ✅ Load AI Model
model = SentenceTransformer('BAAI/bge-large-en-v1.5')

# ✅ Function to Get Text Embeddings
def get_embedding(text):
    return model.encode(text, convert_to_tensor=True)

# ✅ Function to Calculate AI Match (Matched Skills Only)
def calculate_ai_match(resume_skills, job_skills):
    resume_set = set(map(str.lower, resume_skills))
    job_set = set(map(str.lower, job_skills.split(",")))

    matched_skills = resume_set.intersection(job_set)
    if not matched_skills:
        return 0.0  # No match, AI Score = 0

    matched_skills_text = " ".join(matched_skills)
    job_skills_text = " ".join(job_set)

    resume_embedding = get_embedding(matched_skills_text)
    job_embedding = get_embedding(job_skills_text)

    ai_score = util.pytorch_cos_sim(resume_embedding, job_embedding).item() * 100
    skill_match_ratio = len(matched_skills) / max(len(job_set), 1)
    
    return round(ai_score * skill_match_ratio, 2)

# ✅ Function to Calculate Skill Match
def calculate_skill_match(resume_skills, job_skills):
    resume_set = set(map(str.lower, resume_skills))
    job_set = set(map(str.lower, job_skills.split(",")))

    matched_skills = resume_set.intersection(job_set)
    skill_match_percentage = (len(matched_skills) / max(len(job_set), 1)) * 100

    return skill_match_percentage, matched_skills

# ✅ Function to Calculate Experience Match
def match_experience(resume_exp, job_exp_required):
    try:
        resume_exp = float(resume_exp)
        job_exp_required = float(job_exp_required)
        experience_score = min((resume_exp / job_exp_required) * 100, 100) if job_exp_required > 0 else 100
    except:
        experience_score = 50  # Default score if experience data is invalid

    return experience_score

# ✅ Function to Match Resume with Jobs
def match_resume_with_jobs(resume, jobs):
    if not jobs:
        print("❌ No jobs found! Exiting...")
        return []

    MATCH_THRESHOLD = 85.0
    resume_exp_raw = resume.get("Experience", "0").strip()
    try:
        resume_exp = float(resume_exp_raw)
    except:
        resume_exp = 0.0

    valid_job_matches = []

    for job in jobs:
        job_id = job.get("job_id", "Unknown")
        job_skills = job.get("required_skills", "")
        job_exp_raw = job.get("experience_required", "")

        # Skip job if no skills mentioned
        if not job_skills:
            continue

        # Clean experience
        try:
            job_exp = float(str(job_exp_raw).strip())
        except:
            job_exp = 0.0

        # ❌ Skip job if required experience is more than resume experience
        if resume_exp < job_exp:
            continue

        # Skills
        job_skills = str(job_skills).strip()
        skill_match_percentage, matched_skills = calculate_skill_match(resume["Skills"], job_skills)
        ai_match_score = calculate_ai_match(resume["Skills"], job_skills)
        experience_score = match_experience(resume_exp, job_exp)

        # Weighted Final Score
        final_score = (
            (skill_match_percentage * 0.4) +
            (ai_match_score * 0.4) +
            (experience_score * 0.2)
        )

        if final_score >= MATCH_THRESHOLD:
            valid_job_matches.append({
                "Job ID": job_id,
                "Experience Required": job_exp,
                "Matching Score": round(final_score, 2),
                "Required Skills": job_skills,
                "Skill Match %": round(skill_match_percentage, 2),
                "AI Match %": round(ai_match_score, 2),
                "Experience Match %": round(experience_score, 2)
            })

    # ✅ Return the best match only (highest score)
    if valid_job_matches:
        best_job = max(valid_job_matches, key=lambda x: x["Matching Score"])
        return [best_job]

    return []  # ❌ No valid job match

# ✅ Function to Send Resume to API
def send_resume_to_api(resume, job):
    if not isinstance(resume, dict):
        print(f"❌ Invalid resume format: {resume}")
        return  

    API_URL = "http://localhost:5000/resumes/post"

    payload = {
        "resumes": [
            {
                "name": resume.get("Name", "").strip(),
                "email": resume.get("Email", "").strip(),
                "phone": resume.get("Phone Number", "").strip(),
                "skills": resume.get("Skills", []) if isinstance(resume.get("Skills", []), list) else [skill.strip() for skill in resume.get("Skills", "").split(",")],
                "job_id": int(job.get("Job ID", 0)) if str(job.get("Job ID", "")).isdigit() else 0,
                "experience": resume.get("Experience", "").strip(),
                "matching_score": float(str(job.get("Matching Score", "0")).replace("%", ""))
            }
        ]
    }

    print("\n📤 Sending Payload to API:")
    print(json.dumps(payload, indent=4))

    try:
        headers = {"Content-Type": "application/json"}
        response = requests.post(API_URL, json=payload, headers=headers)

        print("API Response:", response.json())

        if response.status_code == 201:
            print(f"✅ Successfully stored resume for {resume.get('Name', 'Unknown')}")
        else:
            print(f"❌ API Error: {response.json()}")

    except Exception as e:
        print(f"❌ Request failed: {e}")

# ✅ Get all resumes & jobs
resumes = process_all_resumes()
jobs = fetch_all_jobs()

if not resumes:
    print("❌ No resumes found! Exiting...")
    exit()

# ✅ Process each resume
for resume in resumes:
    if not isinstance(resume, dict):  
        print(f"❌ Skipping invalid resume: {resume}")
        continue  
 
    print(f"📄 Checking matches for {resume.get('Name', 'Unknown Candidate')}...")
    matched_jobs = match_resume_with_jobs(resume, jobs)
    
    if matched_jobs:
        send_resume_to_api(resume, matched_jobs[0])
        print(f"✅ Best Matched Job: {matched_jobs[0]}")
    else:
        print(f"❌ No Suitable Job Found for {resume.get('Name', 'Unknown')}!")