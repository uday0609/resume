import React, { useEffect, useState } from "react";
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
import candidates from "../api/selectedCandidates";
import { FaEdit, FaTrashAlt,FaCaretRight } from "react-icons/fa";
export default function Candidates() {
  const [showAlert, setShowAlert] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [newData, setNewData] = useState({
    candidate_name: "",
    email: "",
    contact_number: "",
    company: "",
  });

  const [isUpdate, setIsUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  
  useEffect(() => {
      handleGetData();
    }, []);
  
  const handleGetData = async () => {
    try {
      const result = await candidates.getAllSelectedResumes();
      setSelectedCandidates(result);
      setFilteredData(result);
    } catch (error) {
      console.error("Error fetching job posts:", error);
    }
  };
 
  const handleModalClose = () => {
    setShowModal(false);
    setNewData({
      candidate_name: "",
      email: "",
      contact_number: "",
      company: "",
    });
    setIsUpdate(false);
    setSelectedId(null);
  };

  const handleModalShow = () => {
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      if (isUpdate) {
        await candidates.updateSelectedResume(selectedId, newData);
        toast.success("Candidate updated successfully");
      } else {
        await candidates.addSelectedResume(newData);
        toast.success("Candidate added successfully");
      }
      handleGetData();
      handleModalClose();
    }
    catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit form');
    }
  };

  useEffect(() => {}, [filterText, data]);
  const handleDeleteClick = (row) => {
    setSelectedId(row.resume_id);
    setDeleteModel(true);
  };
  const handleConfirmDelete = async () => {
    try {
      if (selectedId) {
        await candidates.deleteSelectedResume(selectedId);
        toast.success(" deleted successfully");
        handleGetData();
      }
    } catch (error) {
      toast.error("Error deleting ");
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
    try{
      const data = await candidates.getSelectedResumeById(row.resume_id);
      setSelectedId(data);
      setNewData({
        candidate_name: data.candidate_name,
        email: data.email,
        contact_number: data.contact_number,
      });
      setIsUpdate(true);
      handleModalShow();
    }
    catch (error) {
      console.error('Error fetching candidates:', error);
      toast.error('Failed to fetch candidates data');
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
    { name: <b>Name</b>, selector: (row) => row.candidate_name, sortable: true },
    { name: <b>Email</b>, selector: (row) => row.email, sortable: true },
    { name: <b>Phone</b>, selector: (row) => row.contact_number, sortable: true },
   
    {
      name: <b>Actions</b>,
      cell: (row) => (
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <FaEdit style={{ fontSize: "20px", color: "#28a745", cursor: "pointer"}} onClick={() => handleUpdateClick(row)}/>
          <FaTrashAlt style={{ fontSize: "20px", color: "#dc3545", cursor: "pointer"}} onClick={() => handleDeleteClick(row)}/>
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
          <Link style={{ textDecoration: "none", color: "black" }} to="/admin/home"> Home
            <FaCaretRight />
          </Link>
          <Breadcrumb.Item active style={{ fontWeight: "bold" }}> Candidates </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15), 0 0 20px rgba(0, 0, 0, 0.1)" }}>
          <Container fluid className="p-3">
            <p active style={{fontWeight: "bold" ,color:""}}> Shortlisted Candidates List </p>
            <hr />
            <Row> 
              <Col lg={12} md={6} sm={3}>
                <div className="d-flex align-items-center mb-3">
                  <input id="search" type="text" placeholder="Search..."
                    style={{ borderRadius: "10px",border: "none",padding: "0px 6px" }}
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                  />
                  <i className="fas fa-search position-relative" style={{ right: "30px",top: "60%"}}></i>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <DataTable
                  columns={columns}
                  data={filteredData}
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
            {isUpdate ? "Update " : "Add "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Container>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" type="text" value={newData.candidate_name}  required/>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control name="phone" type="text" value={newData.contact_number}  required/>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control name="email" type="email" value={newData.email}  required/>
                  </Form.Group>
                </Col>
              </Row>
             
            </Container>
            <Modal.Footer>
              <Button variant="primary" type="submit">
                {isUpdate ? "Update " : "Add update"}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      {/* delete model  */}
      <Modal show={deleteModel} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete ?</Modal.Body>
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