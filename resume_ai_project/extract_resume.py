import os
import re
import spacy
import pdfplumber
import docx2txt
import phonenumbers

# ✅ Load NLP model
nlp = spacy.load("en_core_web_sm")

# ✅ Resume folder path
RESUME_FOLDER = "resumes"

# 📄 PDF se text extract karne ka function
def extract_text_from_pdf(pdf_path):
    text = ""
    try:
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
    except Exception as e:
        print(f"❌ PDF Extraction Error: {e}")
    return text.strip()

# 📝 DOCX se text extract karne ka function
def extract_text_from_docx(docx_path):
    try:
        return docx2txt.process(docx_path)
    except Exception as e:
        print(f"❌ DOCX Extraction Error: {e}")
        return ""

# 📧 Email extract karne ka function
def extract_email(text):
    email_regex = r"[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+"
    match = re.findall(email_regex, text)
    return match[0] if match else None

# 📞 Phone number extract karne ka function
def extract_phone_number(text):
    phone_numbers = []
    for match in phonenumbers.PhoneNumberMatcher(text, "IN"):  # "IN" = India
        phone_numbers.append(phonenumbers.format_number(match.number, phonenumbers.PhoneNumberFormat.INTERNATIONAL))
    return phone_numbers[0] if phone_numbers else None

# 🏷 Name extract karne ka function (NLP)
def extract_name(text):
    doc = nlp(text)
    for ent in doc.ents:
        if ent.label_ == "PERSON":
            return ent.text
    return None

# 💼 Skills extract karne ka function
def extract_skills(text):
    # List of skills (You can expand this as needed)
    skills_list = [
        "Python", "Java", "C", "C++", "C#", "JavaScript", "Go", "Rust", "Swift", "Kotlin",
        "Dart", "Ruby", "PHP", "TypeScript", "Perl", "R", "Scala", "Objective-C",
        "HTML", "CSS", "Bootstrap", "Tailwind CSS", "SASS", "LESS", "XML", "JSON",
        "React.js", "Vue.js", "Angular", "Svelte", "Next.js", "Nuxt.js", "Gatsby",
        "Node", "Express", "FastAPI", "Flask", "Django", "Spring Boot",
        "Laravel", "CodeIgniter", "Ruby on Rails", "ASP.NET", "Meteor.js",
        "SQL", "MySQL", "PostgreSQL", "SQLite", "MongoDB", "Redis", "Cassandra",
        "DynamoDB", "MariaDB", "Oracle SQL", "MS SQL Server", "Neo4j", "Elasticsearch",
        "TensorFlow", "PyTorch", "Keras", "OpenCV", "Scikit-Learn", "NLTK", "Pandas", "NumPy",
        "Docker", "Kubernetes", "Terraform", "Ansible", "Git", "GitHub", "Bitbucket",
        "AWS", "Azure", "Google Cloud", "Firebase", "Linux", "Windows Server",
        "Cybersecurity", "Penetration Testing", "Ethical Hacking", "Wireshark",
        "Solidity", "Blockchain", "Smart Contracts", "Machine Learning", "Deep Learning",
        "Power BI", "Tableau", "Business Intelligence", "SAP", "ERP","Node.js","Vue","React","Angular.js","Express.js"
    ]

    # Convert text to lowercase
    text = text.lower()

    # Store extracted skills in a set to avoid duplicates
    found_skills = set()

    # Sort skills by length (longest first) to prevent partial matching issues
    sorted_skills = sorted(skills_list, key=lambda x: -len(x))

    # Regex-based exact matching
    for skill in sorted_skills:
        pattern = rf"\b{re.escape(skill.lower())}\b"  # Exact word boundary match
        if re.search(pattern, text):
            found_skills.add(skill)

    return list(found_skills)

# 🔍 Experience extract karne ka function
def extract_experience(text):
    exp_pattern = r"(\d+(?:\.\d+)?)\s*(?:years?|yrs?|year)"
    matches = re.findall(exp_pattern, text, re.IGNORECASE)
    return float(matches[0]) if matches else 0.0

# 📍 Address extract karne ka function
def extract_address(text):
    doc = nlp(text)
    for ent in doc.ents:
        if ent.label_ == "GPE":  # GPE = City, State, Country
            return ent.text
    return None

# 🎯 Resume Process Karne Ka Function
def process_resume(file_path):
    if file_path.endswith(".pdf"):
        text = extract_text_from_pdf(file_path)
    elif file_path.endswith(".docx"):
        text = extract_text_from_docx(file_path)
    else:
        return {"Error": "Unsupported file format"}

    data = {
        "Name": extract_name(text),
        "Email": extract_email(text),
        "Phone Number": extract_phone_number(text),
        "Skills": extract_skills(text),
        "Experience": extract_experience(text),
        "Address": extract_address(text)
    }
    return data

# 📂 Folder Ke Saare Resumes Process Karne Ka Function (with limit)
def process_all_resumes(limit=None):
    resumes_data = []
    processed_files = []
    if not os.path.exists(RESUME_FOLDER):
        print("❌ Resume Folder Not Found!")
        return [], []

    count = 0
    for file in os.listdir(RESUME_FOLDER):
        if file.endswith(".pdf") or file.endswith(".docx"):
            if limit is not None and count >= limit:
                break
            resume_path = os.path.join(RESUME_FOLDER, file)
            print(f"📄 Processing: {file}")
            try:
                resume_data = process_resume(resume_path)
                resumes_data.append(resume_data)
                processed_files.append(file)
                count += 1
            except Exception as e:
                print(f"❌ Error processing {file}: {e}")

    return resumes_data, processed_files

# ✅ Run Code
if __name__ == "__main__":
    extracted_resumes = process_all_resumes()
    for res in extracted_resumes:
        print("✅ Extracted Data:", res)