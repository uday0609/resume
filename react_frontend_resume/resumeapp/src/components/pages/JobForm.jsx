import { useState } from "react";
import { 
  Briefcase, FileText, Code, User, Building, Users, ClipboardList, Calendar, Plus, X 
} from "lucide-react"; 
import FormField from "./FormField";
import "./JobForm.css";

const JobForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    requiredSkills: "",
    experience: "",
    jobType: "",
    jobLocation: "",
    companyName: "",
    numberOfOpenings: "",
    maxApplications: "",
    applicationDeadline: "",
  });

  const [skills, setSkills] = useState([]);

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Prevent negative numbers
    if (["numberOfOpenings", "maxApplications"].includes(name) && value < 0) {
      value = 0;
    }

    setFormData({ ...formData, [name]: value });
  };

  const addSkill = () => {
    const newSkill = formData.requiredSkills.trim();
    if (newSkill !== "" && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setFormData({ ...formData, requiredSkills: "" });
    }
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value.trim()])
    );
    console.log("Submitted Data:", { ...cleanedData, skills });
  };

  return (
    <div className="job-form-container">
      <h2 className="form-title">Post a Job</h2>
      <form onSubmit={handleSubmit} className="job-form" autoComplete="off">
        <FormField label={<><Briefcase size={18} /> Job Title</>} type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required />
        
        <FormField label={<><FileText size={18} /> Job Description</>} type="text" name="jobDescription" value={formData.jobDescription} onChange={handleChange} required />

        {/* Skills Section */}
        <div className="form-group">
          <label><Code size={18} /> Required Skills</label>
          <div className="skill-input-container">
            <input
              type="text"
              name="requiredSkills"
              value={formData.requiredSkills}
              onChange={handleChange}
            />
            <button type="button" className="add-skill-btn" onClick={addSkill} aria-label="Add skill">
              <Plus size={16} />
            </button>
          </div>
          <div className="skills-box">
            {skills.map((skill, index) => (
              <div key={index} className="skill-tag">
                {skill} 
                <button 
                  type="button" 
                  className="remove-skill" 
                  onClick={() => removeSkill(index)} 
                  aria-label="Remove skill"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <FormField label={<><User size={18} /> Experience (Optional)</>} type="text" name="experience" value={formData.experience} onChange={handleChange} />
        
        <div className="form-group">
          <label><ClipboardList size={18} /> Job Type</label>
          <select name="jobType" value={formData.jobType} onChange={handleChange} required>
            <option value="" disabled>Select Job Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
          </select>
        </div>

        <div className="form-group">
          <label><Building size={18} /> Location</label>
          <select name="jobLocation" value={formData.jobLocation} onChange={handleChange} required>
            <option value="" disabled>Select Location</option>
            <option value="On-site">On-site</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Remote">Remote</option>
          </select>
        </div>

        <FormField label={<><Building size={18} /> Company Name</>} type="text" name="companyName" value={formData.companyName} onChange={handleChange} required />
        <FormField label={<><Users size={18} /> Number of Openings</>} type="number" name="numberOfOpenings" value={formData.numberOfOpenings} onChange={handleChange} required />
        <FormField label={<><ClipboardList size={18} /> Max Applications Accepted</>} type="number" name="maxApplications" value={formData.maxApplications} onChange={handleChange} required />
        <FormField label={<><Calendar size={18} /> Application Deadline (Optional)</>} type="date" name="applicationDeadline" value={formData.applicationDeadline} onChange={handleChange} />

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default JobForm;