import os
import time
from extract_resume import process_all_resumes
from fetch_jobs import fetch_all_jobs
from match_skills3 import match_resume_with_jobs, send_batch_to_api

# 📂 Resume folder and settings
RESUME_FOLDER = "resumes"
BATCH_SIZE = 5
ALLOWED_EXTENSIONS = [".pdf", ".docx"]

# ✅ Check if file is a valid resume
def is_valid_resume(file):
    return os.path.splitext(file)[-1].lower() in ALLOWED_EXTENSIONS

if not os.path.exists(RESUME_FOLDER):
    os.makedirs(RESUME_FOLDER)

# 🗑️ Delete processed resumes
def delete_processed_resumes(processed_files):
    for file in processed_files:
        try:
            os.remove(os.path.join(RESUME_FOLDER, file))
            print(f"🗑️ Deleted: {file}")
        except Exception as e:
            print(f"❌ Failed to delete {file}: {e}")

# 👁️‍🗨️ Watch folder continuously
batch = []
def watch_resume_folder():
    print("👀 Watching folder for resumes...\n")

    while True:
        # Filter valid resumes
        valid_resumes = [f for f in os.listdir(RESUME_FOLDER) if is_valid_resume(f)]
        print(f"🔍 Valid Resumes Found: {len(valid_resumes)} - {valid_resumes}")

        if len(valid_resumes) < BATCH_SIZE:
            print(f"⏳ Waiting... Need {BATCH_SIZE - len(valid_resumes)} more resumes.")
            time.sleep(5)
            continue

        print(f"\n📦 {BATCH_SIZE} resumes found. Starting processing...")

        # Process resumes
        resumes, processed_files = process_all_resumes(BATCH_SIZE)
        if not resumes:
            print("⚠️ No resumes processed. Skipping...\n")
            time.sleep(5)
            continue
        
        jobs = fetch_all_jobs()

        if not jobs:
            print("❌ No jobs fetched. Skipping this batch...\n")
            time.sleep(10)
            continue

        for resume in resumes:
            if not isinstance(resume, dict):
                print("⚠️ Invalid resume format. Skipping...")
                continue

            print(f"\n📄 Matching jobs for: {resume.get('Name', 'Unknown')}...")
            matched_jobs = match_resume_with_jobs(resume, jobs)

            if matched_jobs:
                print(f"✅ Best Matched Job: {matched_jobs[0]}")
                batch.append((resume, matched_jobs[0]))
            else:
                print(f"❌ No Suitable Job Found for {resume.get('Name', 'Unknown')}!")

        # ✅ Send batch if it has 10 or more resumes
        if len(batch) >= 1:
            try:
                send_batch_to_api(batch)
                print(f"📤 Sent batch of {len(batch)} resumes to API")
                batch.clear()  # Clear batch after sending
            except Exception as e:
                print(f"❌ Error sending batch to API: {e}")
        else:
            print(f"🕒 Batch has only {len(batch)} resumes, waiting to complete 1.")

        # Delete processed resumes
        delete_processed_resumes(processed_files)
        print("🗑️ All processed resumes deleted.\n")

        # Wait before checking again
        time.sleep(5)

# 🔁 Run watcher only when executed directly
if __name__ == "__main__":
    watch_resume_folder()