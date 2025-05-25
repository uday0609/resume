import React, { useEffect, useState } from "react";
import Post from "../api/jobPost";

import {
  Container,
  Row,
  Col,
  Card,
  Breadcrumb,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export default function Job_Posts() {
  const [showAlert, setShowAlert] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    job_title: "",
    job_description: "",
    required_skills: "",
    experience_required: "",
    company_name: "",
    location: "",
  });

  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = async () => {
    try {
      const result = await Post.getAllResume();
      // console.log(result);
      setFilteredJobs(result);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setNewJob({
      job_title: "",
      job_description: "",
      required_skills: "",
      experience_required: "",
      company_name: "",
      location: "",
    });
    setIsUpdate(false);
    setSelectedJob(null);
  };

  // const handleModalShow = () => {
  //   setShowModal(true);
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log("isUpdate:", isUpdate, "selectedId:", selectedId);

      if (isUpdate && selectedId) {
        await Post.updateJobDescriptions(newJob, selectedId);
        toast.success("Job updated successfully!");
        handleGetData();
      } else {
        toast.success("Job added successfully!");
      }
      handleGetData();
      handleModalClose();
    } catch (error) {
      toast.error("Error while saving job.");
    }
  };  

  useEffect(() => {}, [filterText, jobs]);

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
      const result = await Post.getJobById(row);
      if (result) {
        setJobs(result);
        setNewJob({
          job_title: result.job_title,
          job_description: result.job_description,
          required_skills: result.required_skills,
          experience_required: result.experience_required,
          company_name: result.company_name,
          location: result.location,
        });

        // console.log("Row id is: ", result.job_id);
        setIsUpdate(true);
        setSelectedId(result.job_id);
        handleModalShow();
      }
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
        background: "linear-gradient(rgb(71 71 86), rgb(22, 33, 62))",
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
    <Container>
      {showAlert && (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <strong>Record was not deleted.</strong>
          <button
            type="button"
            className="close float-end"
            onClick={() => setShowAlert(false)}
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}

      <div>
        <Breadcrumb>
          <Link style={{ textDecoration: "none", color: "black" }} to="/admin/home">{" "} Home <i className="fa fa-angle-right"></i> </Link>
          <Breadcrumb.Item active style={{ fontWeight: "bold" }}> Jobs </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15), 0 0 20px rgba(0, 0, 0, 0.1)" }}>
        <Container fluid className="p-3">
          <p active style={{ fontWeight: "bold", color: "" }}> Job List </p>
          <button active style={{ color: "Blue" }} className="float-end btn btn-btn-primary btn-sm"><Link to="../Add_Jobs">Add Jobs</Link></button>
          <hr />
          <Row>
            <Col lg={12} md={6} sm={3}>
              <div className="d-flex align-items-center mb-3">
                <input id="search" type="text" placeholder="Search..."
                  style={{ borderRadius: "10px", border: "none", padding: "0px 6px" }}
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                />
                <i className="fas fa-search position-relative" style={{ right: "30px", top: "60%" }}></i>
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
          <Modal.Title id="contained-modal-title-vcenter">
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
                    <Form.Control name="experience_required" type="text" value={newJob.experience_required} onChange={handleInputChange} required />
                  </Form.Group>
                </Col>
              </Row>
            </Container>
            <Modal.Footer>
              <Button variant="primary" type="submit">
                {isUpdate ? "Update Job" : "Add Job"}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={deleteModel} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this job?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </Container>
  );
}