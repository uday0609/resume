//  const Add_Jobs=()=>{
//      return(
//          <>
//              <div className="container-fluid pt-5 mt-5">
//                  <p> job forms </p>
//              </div>
//          </>
//      );
// }
//  export default Add_Jobs;

import { useState } from "react";
import {
  Briefcase, FileText, Code, User, Building, Users, ClipboardList, Calendar, Plus, X
} from "lucide-react";
import FormField from "./FormField";
import "../assets/css/JobForm.css";
import Post from "../api/jobPost";
import { Container, Row, Col, Button } from "react-bootstrap"
const Add_Jobs = () => {
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

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    const cleanedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value.trim()])
    );
    console.log("Submitted Data:", { ...cleanedData, skills });
    console.log(cleanedData)

    let sent = await Post.Add_Jobs_Description(cleanedData)
  };


  return (
    <>
      <Container fluid className="pt-5 mt-2">
        <div className="job-form-container">
          <h2 className="form-title">Post a Job</h2>
          <form onSubmit={handleSubmit1} className="job-form" autoComplete="off">

            {/* JOB DETAILS */}
            <h5 className="form-title mb-3 text-start">Job Details</h5>
            <Row>
              <Col md={6}>
                <div className="form-group">
                  <label><Briefcase size={18} /> Job Title</label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    required
                  />
                </div>
              </Col>
              <Col md={6}>
                <div className="form-group">
                  <label><FileText size={18} /> Job Description</label>
                  <input
                    type="text"
                    name="jobDescription"
                    value={formData.jobDescription}
                    onChange={handleChange}
                    required
                  />
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <div className="form-group">
                  <label><User size={18} /> Experience (Optional)</label>
                  <input
                    type="text"
                    className="experience-field"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                  />
                </div>
              </Col>
              <Col md={6}>
                <div className="form-group">
                  <label><Code size={18} /> Required Skills</label>
                  <div className="skill-input-container">
                    <input
                      className="skills-input"
                      type="text"
                      name="requiredSkills"
                      value={formData.requiredSkills}
                      onChange={handleChange}
                    />
                    <button type="button" className="add-skill-btn" onClick={addSkill}>
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
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </Col>
            </Row>

            {/* COMPANY INFO */}
            <h5 className="form-title mb-3 text-start">Company Info</h5>
            <Row>
              <Col md={6}>
                <div className="form-group">
                  <label><Building size={18} /> Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </Col>
              <Col md={6}>
                <div className="form-group">
                  <label><Building size={18} /> Job Location</label>
                  <select
                    name="jobLocation"
                    value={formData.jobLocation}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select Location</option>
                    <option value="On-site">On-site</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
              </Col>
            </Row>

            {/* JOB TYPE AND DEADLINE */}
            <h5 className="form-title mb-3 text-start">Job Preferences</h5>
            <Row>
              <Col md={6}>
                <div className="form-group">
                  <label><ClipboardList size={18} /> Job Type</label>
                  <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select Job Type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                  </select>
                </div>
              </Col>
              <Col md={6}>
                <div className="form-group">
                  <label><Calendar size={18} /> Application Deadline (Optional)</label>
                  <input
                    type="date"
                    name="applicationDeadline"
                    value={formData.applicationDeadline}
                    onChange={handleChange}
                  />
                </div>
              </Col>
            </Row>

            {/* LIMITS SECTION */}
            <h5 className="form-title mb-3 text-start">Openings & Limits</h5>
            <Row>
              <Col md={6}>
                <div className="form-group">
                  <label><Users size={18} /> Number of Openings</label>
                  <input
                    type="number"
                    name="numberOfOpenings"
                    value={formData.numberOfOpenings}
                    onChange={handleChange}
                    required
                  />
                </div>
              </Col>
              <Col md={6}>
                <div className="form-group">
                  <label><ClipboardList size={18} /> Max Applications</label>
                  <input
                    type="number"
                    name="maxApplications"
                    value={formData.maxApplications}
                    onChange={handleChange}
                    required
                  />
                </div>
              </Col>
            </Row>

            {/* SUBMIT */}
            <div className="form-group d-flex justify-content-end flex-end align-items-end"
            >
              <Row>
                <Col md={2}>
                  <Button type="submit" className="submit-btn btn btn-sm">Submit</Button>
                </Col>
              </Row>
            </div>
          </form>
        </div>
      </Container>



    </>
  );
};

export default Add_Jobs;