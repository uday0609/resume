import schedule
import time
import threading
from fetch_emails import fetch_emails
from folder_watcher import watch_resume_folder

def job_fetch_emails():
    try:
        print("\n⏰ [Scheduler] Running fetch_emails()...")
        fetch_emails()
    except Exception as e:
        print(f"❌ Error in job_fetch_emails: {e}")

def start_resume_watcher():
    print("\n👁️ Starting Resume Watcher in Background...\n")
    watch_resume_folder()

if __name__ == "__main__":
    # For testing, run every 10 seconds
    schedule.every(5).minutes.do(job_fetch_emails)

    watcher_thread = threading.Thread(target=start_resume_watcher)
    watcher_thread.daemon = True
    watcher_thread.start()

    print("🚀 Auto Scheduler Started...\n")

    try:
        while True:
            schedule.run_pending()
            print("⏳ Waiting for next scheduled job...")
            time.sleep(1)
    except KeyboardInterrupt:
        print("🛑 Scheduler stopped by user.")