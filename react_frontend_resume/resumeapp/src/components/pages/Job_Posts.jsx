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
  const [donations, setDonations] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [jobs ,setJobs] = useState([]);
  const [newDonation, setNewDonation] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    amount: "",
    order_id: "",
    payment_id: "",
    status: "",
    payment_method: "",
    currency: "",
    remarks: "",
  });

  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = async () => {
    try {
      const result = await Post.getAllResume();
      console.log(result);
      setJobs(result);

    //   const filteredDonations = result.filter(
    //     (item) =>
    //       item.name.toLowerCase().includes(filterText.toLowerCase()) ||
    //       item.email.toLowerCase().includes(filterText.toLowerCase())
    //   );
      setFilteredDonations(result);

    //   setDonations(result);
    } catch (error) {
    //   console.error("Error fetching donations:", error);
    //   setDonations([]);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setNewDonation({
      name: "",
      email: "",
      phone: "",
      address: "",
      amount: "",
      order_id: "",
      payment_id: "",
      status: "",
      payment_method: "",
      currency: "",
      remarks: "",
    });
    setIsUpdate(false);
    setSelectedDonation(null);
  };

  const handleModalShow = () => {
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDonation({ ...newDonation, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   if (isUpdate) {
    //     await DonationApi.updateDonation(selectedDonation.id, newDonation);

    //     toast.success("Donation updated successfully!");
    //     handleGetData();
    //   } else {
    //     // await DonationApi.addDonation(newDonation);
    //     toast.success("Donation added successfully!");
    //   }
    //   handleGetData();
    //   handleModalClose();
    // } catch (error) {
    //   toast.error("Error while saving donation");
    // }
  };

  useEffect(() => {}, [filterText, donations]);

  const handleDeleteClick = (row) => {
    setSelectedId(row.id);
    setDeleteModel(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (selectedId) {
        // await DonationApi.deleteDonation(selectedId);
        toast.success("Donation deleted successfully");
        handleGetData();
      }
    } catch (error) {
      toast.error("Error deleting donation");
    } finally {
      setDeleteModel(false);
      setSelectedId(null);
    }
  };
  
  const handleCancel = () => {
    setDeleteModel(false);
    setSelectedId(null);
  };

  const handleUpdateClick = (row) => {
    setSelectedDonation(row);
    setNewDonation({
      title: row.job_title,
      description: row.job_description,
      // company: row.company_name,
      // location: row.location,
      skills: row.required_skills,
      experience: row.experience_required,
      
      // payment_id: row.payment_id,
      // status: row.status,
      // payment_method: row.payment_method,
      // currency: row.currency,
      // remarks: row.remarks,
    });
    setIsUpdate(true);
    handleModalShow();
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
    { name: <b>Descipition</b>, selector: (row) => row.job_description, sortable: true },
    // { name: <b>Skills</b>, selector: (row) => row.skills, sortable: true },
    // { name: <b>Experience</b>, selector: (row) => row.exprences, sortable: true },
    { name: <b>Company</b>, selector: (row) => row.company_name, sortable: true },
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
          <Breadcrumb.Item active style={{ fontWeight: "bold" }}>  Donations </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      {/* const var ="Add_Jobs.jsx" */}
      <div style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15), 0 0 20px rgba(0, 0, 0, 0.1)" }}>
          <Container fluid className="p-3">
            <p active style={{fontWeight: "bold" ,color:""}}> Donation List </p>
            <button active style={{color:"Blue"}} className="float-end btn btn-btn-primary btn-sm"><Link to="../Add_Jobs">Add Jobs</Link></button>
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
                  data={filteredDonations}
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
            {isUpdate ? "Update Donation" : "Add Donation"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Container>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Job Title</Form.Label>
                    <Form.Control name="job_title" type="text" value={newDonation.name} onChange={handleInputChange} required/>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Job Description</Form.Label>
                    <Form.Control name="job_description" type="text" value={newDonation.phone} onChange={handleInputChange} required/>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Required Skills</Form.Label>
                    <Form.Control name="required_skills" type="email" value={newDonation.email} onChange={handleInputChange} required/>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Experience Required</Form.Label>
                    <Form.Control name="experience_required" type="number" value={newDonation.amount} onChange={handleInputChange} required/>
                  </Form.Group>
                </Col>
              </Row>
              {/* <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control name="address" type="text" value={newDonation.address} onChange={handleInputChange} required/>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Order ID</Form.Label>
                    <Form.Control name="order_id" type="text" value={newDonation.order_id} onChange={handleInputChange} disabled/>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Control name="status" type="text" value={newDonation.status} onChange={handleInputChange} required/>
                  </Form.Group>
                </Col>
              </Row> */}
            </Container>
            <Modal.Footer>
              <Button variant="primary" type="submit">
                {isUpdate ? "Update Donation" : "Add Donation"}
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
        <Modal.Body>Are you sure you want to delete this donation?</Modal.Body>
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

