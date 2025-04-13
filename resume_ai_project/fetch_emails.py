import os
import base64
import json
import re
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from folder_watcher import watch_resume_folder

# Gmail API Scopes
SCOPES = ["https://www.googleapis.com/auth/gmail.modify"]

def authenticate_gmail():
    """Authenticate user using OAuth 2.0"""
    creds = None
    if os.path.exists("token.json"):
        creds = Credentials.from_authorized_user_file("token.json", SCOPES)

    if not creds or not creds.valid:
        flow = InstalledAppFlow.from_client_secrets_file("credentials.json", SCOPES)
        creds = flow.run_local_server(port=0)

        with open("token.json", "w") as token:
            token.write(creds.to_json())

    return creds

def save_attachment(service, msg_id, attachment_id, filename):
    """Extracts and saves email attachments"""
    attachment = service.users().messages().attachments().get(
        userId="me", messageId=msg_id, id=attachment_id).execute()

    file_data = base64.urlsafe_b64decode(attachment["data"].encode("UTF-8"))

    # ✅ Ensure 'resumes' Folder Exists
    if not os.path.exists("resumes"):
        os.makedirs("resumes")

    file_path = os.path.join("resumes", filename)

    with open(file_path, "wb") as f:
        f.write(file_data)

    print(f"📁 Saved attachment: {file_path}")

def mark_email_as_read(service, msg_id):
    """Mark an email as read by removing the 'UNREAD' label"""
    service.users().messages().modify(
        userId="me",
        id=msg_id,
        body={"removeLabelIds": ["UNREAD"]}
    ).execute()
    print(f"✅ Email {msg_id} marked as read.")

def fetch_emails():
    """Fetch unread emails, extract attachments, and mark emails as read"""
    creds = authenticate_gmail()
    service = build("gmail", "v1", credentials=creds)

    results = service.users().messages().list(userId="me", labelIds=["INBOX"], q="is:unread").execute()
    messages = results.get("messages", [])

    if not messages:
        print("No unread emails found.")
        return

    for msg in messages:
        msg_id = msg["id"]
        message = service.users().messages().get(userId="me", id=msg_id).execute()

        headers = message["payload"]["headers"]
        subject = next((h["value"] for h in headers if h["name"] == "Subject"), "No Subject")
        sender = next((h["value"] for h in headers if h["name"] == "From"), "Unknown Sender")

        print(f"\n📩 Email Found:")
        print(f"  - Subject: {subject}")
        print(f"  - From: {sender}")

        # ✅ Check Attachments
        if "parts" in message["payload"]:
            for part in message["payload"]["parts"]:
                if "filename" in part and part["filename"]:
                    filename = part["filename"]
                    if not filename.lower().endswith((".pdf", ".docx")):
                        continue  # Skip non-resume files

                    if "attachmentId" in part["body"]:
                        attachment_id = part["body"]["attachmentId"]
                        save_attachment(service, msg_id, attachment_id, filename)

        # ✅ Mark Email as Read
        mark_email_as_read(service, msg_id)

if __name__ == "__main__":
    fetch_emails()