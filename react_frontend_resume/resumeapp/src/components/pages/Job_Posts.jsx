import React, { useEffect, useState } from "react";
// import Post from "../api/jobPost";
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrashAlt, FaSearch, FaCaretRight, FaPlusCircle } from "react-icons/fa";
import {
  Briefcase, FileText, Code, User, Building, Users, ClipboardList, Calendar, Plus, X
} from "lucide-react";
import FormField from "./FormField";
// import "../assets/css/JobForm.css";
import JobForm from './JobForm.jsx'
import Post from "../api/jobPost";
import { useNavigate } from "react-router-dom";
export default function Job_Posts() {
  const [showAlert, setShowAlert] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);
  const [jobPosts, setJobPosts] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    job_title: "",
    job_description: "",
    required_skills: "",
    experience_required: "",
  });

  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [show1, setLgShow1] = useState(false);
  const navigate = useNavigate();

  // const handleClose1 = () => setLgShow1(false);
  // const handleShow1 = () => setLgShow1(true);
   const [showJobForm, setShowJobForm] = useState(false);

  const handleShow1 = () => {
    navigate("/admin/add_job");

  };

  const handleCloseForm = () => {
    setShowJobForm(false);
  };
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



  useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = async () => {
    try {
      const result = await Post.getAllResume();
      setJobPosts(result);
      setFilteredJobs(result);
    } catch (error) {
      console.error("Error fetching job posts:", error);
    }
  };
  const handleModalClose = () => {
    setShowModal(false);
    setNewJob({
      job_title: "",
      job_description: "",
      required_skills: "",
      experience_required: "",
    });
    setIsUpdate(false);
    setSelectedJob(null);
  };

  const handleModalShow = () => {
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isUpdate) {
        await Post.updateJobDescriptions(selectedJob.job_id, newJob);
        toast.success("Job updated successfully!");
      } else {
        await Post.addJob(newJob);
        toast.success("Job added successfully!");
      }
      handleGetData();
      handleModalClose();
    } catch (error) {
      toast.error("Error while saving job post");
    }
  };

  const handleDeleteClick = (row) => {
    setSelectedId(row.job_id);
    setDeleteModel(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (selectedId) {
        await Post.deleteJobDescription(selectedId);
        toast.success("Job deleted successfully");
        handleGetData();
      }
    } catch (error) {
      toast.error("Error deleting job");
    } finally {
      setDeleteModel(false);
      setSelectedId(null);
    }
  };

  const handleCancel = () => {
    setDeleteModel(false);
    setSelectedId(null);
  };

  const handleUpdateClick = async (row) => {
    try {
      const response = await fetch(`http://localhost:5000/jobs/${row.job_id}`);
      
      // Check if the response is valid JSON
      const data = await response.json();
      console.log('Received job data:', data); // Log the response

      // Ensure `required_skills` is an array and not a string
      const requiredSkills = Array.isArray(data.required_skills) ? data.required_skills : JSON.parse(data.required_skills);

      setSelectedJob(data);
      setNewJob({
        job_title: data.job_title,
        job_description: data.job_description,
        required_skills: requiredSkills,
        experience_required: data.experience_required,
        company_name: data.company_name,
        location: data.location,
        job_type: data.job_type,
        deadline: data.deadline,
        openings: data.openings,
        max_applications: data.max_applications,
      });
      
      setIsUpdate(true);
      handleModalShow();
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };

  const columns = [
    {
      name: <b>S.No.</b>,
      selector: (row, index) => index + 1,
      sortable: true,
      width: "60px",
      style: {
        borderRight: "2px solid #dee2e6",
        fontWeight: "bold",
      },
    },
    { name: <b>Title</b>, selector: (row) => row.job_title, sortable: true },
    { name: <b>Description</b>, selector: (row) => row.job_description, sortable: true },
    { name: <b>Company</b>, selector: (row) => row.company_name, sortable: true },
    {
      name: <b>Actions</b>,
      cell: (row) => (
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <FaEdit style={{ fontSize: "20px", color: "#28a745", cursor: "pointer" }} onClick={() => handleUpdateClick(row)} />
          <FaTrashAlt style={{ fontSize: "20px", color: "#dc3545", cursor: "pointer" }} onClick={() => handleDeleteClick(row)} />
        </div>
      ),
    },
  ];

  const customStyles = {
    table: {
      style: {
        textAlign: "left",
      },
    },
    headCells: {
      style: {
        background: " #389ae0",
        // background: "linear-gradient(rgb(71 71 86), rgb(22, 33, 62))",
        color: "white",
      },
    },
    headRow: {
      style: {
        minHeight: "30px",
      },
    },
    rows: {
      style: {
        minHeight: "34px",
      },
    },
  };

  return (
    <Container className="container-fluid  pt-3 mt-2">
      {showAlert && (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>Record was not deleted.</strong>
          <button type="button" className="close float-end" onClick={() => setShowAlert(false)} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}

      <div>
        <Breadcrumb>
          <Link style={{ textDecoration: "none", color: "black" }} to="/admin/home"> Home
            <FaCaretRight />
          </Link>
          <Breadcrumb.Item active style={{ fontWeight: "bold" }}> Job Posts </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15), 0 0 20px rgba(0, 0, 0, 0.1)" }}>
        <Container fluid className="p-3">
          <p style={{ fontWeight: "bold" }}>Job Posts List</p>


          <hr />
          <Row>
            <Col lg={12} md={6} sm={3}>
              <div className="d-flex justify-content-between mb-3">
                <div>
                  <FaSearch className="me-2" />
                  <input id="search" type="text" placeholder="Search..."
                    style={{ borderRadius: "10px", border: "none", padding: "0px 6px" }}
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                  />
                </div>
                <i className="fas fa-search position-relative" style={{ right: "30px", top: "60%" }}></i>
                <Button className="   btn-sm mt-1 me-3 p-1" href="#"   onClick={handleShow1} style={{ background: " #389ae0" }}>
                  Add Job  <FaPlusCircle className="ms-1" />
                  {/* {showJobForm && <JobForm onClose={handleCloseForm} />} */}
                </Button>
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <DataTable
                columns={columns}
                data={filteredJobs}
                pagination
                highlightOnHover
                striped
                customStyles={customStyles}
              />
            </Col>
          </Row>
        </Container>
      </div>

      <Modal show={showModal} style={{ fontSize: "16px" }} size="lg" backdrop="static" onHide={handleModalClose}>
        <Modal.Header style={{ fontSize: "16px" }} closeButton>
          <Modal.Title>
            {isUpdate ? "Update Job" : "Add Job"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Container>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Job Title</Form.Label>
                    <Form.Control name="job_title" type="text" value={newJob.job_title} onChange={handleInputChange} required />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Job Description</Form.Label>
                    <Form.Control name="job_description" type="text" value={newJob.job_description} onChange={handleInputChange} required />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Required Skills</Form.Label>
                    <Form.Control name="required_skills" type="text" value={newJob.required_skills} onChange={handleInputChange} required />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Experience Required</Form.Label>
                    <Form.Control name="experience_required" type="number" value={newJob.experience_required} onChange={handleInputChange} required />
                  </Form.Group>
                </Col>
              </Row>
              <Modal.Footer>

                <Row>
                  <Col md={4}>
                    <Button variant="primary" type="submit">
                      {isUpdate ? "Update Job" : "Add Job"}
                    </Button>
                  </Col>
                </Row>
              </Modal.Footer>
            </Container>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={deleteModel} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this job post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
          <Button variant="danger" onClick={handleConfirmDelete}>Confirm</Button>
        </Modal.Footer>
      </Modal>
      {/* add job modal */}
      {/* <Modal size="lg" show={show1} fullscreen={fullscreen} onHide={handleClose1} backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <div className="job-form-container">
              <form onSubmit={handleSubmit1} className="job-form" autoComplete="off"> */}

                {/* JOB DETAILS */}
                {/* <h5 className="form-title mb-3 text-start">Job Details</h5>
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
                </Row> */}

                {/* COMPANY INFO */}
                {/* <h5 className="form-title mb-3 text-start">Company Info</h5>
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
                </Row> */}

                {/* JOB TYPE AND DEADLINE */}
                {/* <h5 className="form-title mb-3 text-start">Job Preferences</h5>
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
                </Row> */}

                {/* LIMITS SECTION */}
                {/* <h5 className="form-title mb-3 text-start">Openings & Limits</h5>
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
                </Row> */}

                {/* SUBMIT */}
                {/* <div className="form-group d-flex justify-content-end">
                  <Button type="submit" className="submit-btn btn btn-sm" onSubmit={handleSubmit1}>Submit</Button>
                </div>
              </form>
            </div>
          </Container>
        </Modal.Body>
      </Modal> */}

      <ToastContainer />
    </Container>
  );
}
