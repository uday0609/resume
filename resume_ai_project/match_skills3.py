import requests
import json
from sentence_transformers import SentenceTransformer, util
import torch
from fetch_jobs import fetch_all_jobs
from extract_resume import process_all_resumes
from datetime import datetime

# Load Model
model = SentenceTransformer('BAAI/bge-large-en-v1.5')

# Global Batch
selected_batch = []

# ✅ Utility Logger with Timestamp
def log(msg):
    print(f"[{datetime.now().strftime('%H:%M:%S')}] {msg}")

# ✅ Get Embedding
def get_embedding(text):
    return model.encode(text, convert_to_tensor=True)

# ✅ AI Match using Sentence Transformers
def calculate_ai_match(resume_skills, job_skills):
    if isinstance(job_skills, str):
        job_skills = [skill.strip() for skill in job_skills.split(",")]

    resume_set = set(map(str.lower, resume_skills))
    job_set = set(map(str.lower, job_skills))

    matched_skills = resume_set.intersection(job_set)
    if not matched_skills:
        return 0.0

    resume_embedding = get_embedding(" ".join(matched_skills))
    job_embedding = get_embedding(" ".join(job_set))

    ai_score = util.pytorch_cos_sim(resume_embedding, job_embedding).item() * 100
    skill_match_ratio = len(matched_skills) / max(len(job_set), 1)

    return round(ai_score * skill_match_ratio, 2)

# ✅ Skill Match (Simple Set Intersection)
def calculate_skill_match(resume_skills, job_skills):
    if isinstance(job_skills, str):
        job_skills = [skill.strip() for skill in job_skills.split(",")]

    resume_set = set(map(str.lower, resume_skills))
    job_set = set(map(str.lower, job_skills))

    matched_skills = resume_set.intersection(job_set)
    percentage = (len(matched_skills) / max(len(job_set), 1)) * 100

    return percentage, matched_skills

# ✅ Experience Match %
def match_experience(resume_exp, job_exp_required):
    try:
        resume_exp = float(resume_exp)
        job_exp_required = float(job_exp_required)
        return min((resume_exp / job_exp_required) * 100, 100) if job_exp_required > 0 else 100
    except:
        return 50

# ✅ Matching Resume With Jobs
def match_resume_with_jobs(resume, jobs):
    if not jobs:
        log("❌ No jobs found.")
        return []

    MATCH_THRESHOLD = 85.0
    resume_exp_raw = resume.get("Experience", "0")

    try:
        resume_exp = float(resume_exp_raw)
    except:
        resume_exp = 0.0

    valid_matches = []

    # Track best job for the resume
    best_match = None
    best_score = 0.0

    for job in jobs:
        job_id = job.get("job_id", "Unknown")
        job_skills = job.get("required_skills", "")
        job_exp = job.get("experience_required", 0)

        if isinstance(job_skills, str):
            job_skills = [skill.strip() for skill in job_skills.split(",")]

        try:
            job_exp = float(str(job_exp).strip())
        except:
            job_exp = 0.0

        if resume_exp < job_exp:
            continue

        skill_match, matched_skills = calculate_skill_match(resume["Skills"], job_skills)
        ai_score = calculate_ai_match(resume["Skills"], job_skills)
        exp_score = match_experience(resume_exp, job_exp)

        final_score = (skill_match * 0.4) + (ai_score * 0.4) + (exp_score * 0.2)

        print("\n────────────────────────────────────────────")
        log(f"👤 {resume.get('Name', 'Unknown')} → 🧾 Resume Exp: {resume_exp} yrs")
        print(f"💼 Job ID: {job_id} | Job Exp Req: {job_exp} yrs")
        print(f"✅ Matched Skills: {matched_skills}")
        print(f"📊 Skill Match %: {round(skill_match, 2)}%")
        print(f"🧠 AI Match %: {round(ai_score, 2)}%")
        print(f"📈 Exp Match %: {round(exp_score, 2)}%")
        print(f"🔥 Final Matching Score: {round(final_score, 2)}%")

        # Check if this job has a higher matching score
        if final_score >= MATCH_THRESHOLD and final_score > best_score:
            best_match = {
                "Job ID": job_id,
                "Experience Required": job_exp,
                "Matching Score": round(final_score, 2),
                "Required Skills": job_skills,
                "Skill Match %": round(skill_match, 2),
                "AI Match %": round(ai_score, 2),
                "Experience Match %": round(exp_score, 2)
            }
            best_score = final_score

    # Add the best match for this resume to the valid matches
    if best_match:
        valid_matches.append(best_match)

    return valid_matches

# ✅ Send Batch to DB
def send_batch_to_api(resume_batch):
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
            for resume, job in resume_batch
        ]
    }

    print("\n📦 SENDING BATCH TO DB")
    print("─────────────────────────────")
    for r, j in resume_batch:
        print(f"• {r.get('Name', 'Unknown')} → Job ID: {j.get('Job ID')} | Score: {j.get('Matching Score')}%")

    try:
        response = requests.post(API_URL, json=payload, headers={"Content-Type": "application/json"})
        print("✅ API Response:", response.json())
    except Exception as e:
        print("❌ Error sending batch:", e)