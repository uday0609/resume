import requests

# ✅ Job descriptions fetch karne ka API URL
API_URL = "http://localhost:5000/jobs"

def fetch_all_jobs():
    try:
        response = requests.get(API_URL)
        if response.status_code == 200:
            jobs = response.json()  # ✅ JSON response convert to Python dict
            return jobs
        else:
            print(f"❌ Error fetching jobs: {response.status_code}")
            return []
    except requests.exceptions.RequestException as e:
        print(f"❌ API Call Failed: {e}")
        return []

# ✅ Test API Call
if __name__ == "__main__":
    all_jobs = fetch_all_jobs()
    print("✅ Jobs Fetched:", all_jobs)