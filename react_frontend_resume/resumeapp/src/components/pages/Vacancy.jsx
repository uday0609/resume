import React, { useState } from 'react';
import {
    Container, Row, Col, Button, Modal, Form, Spinner, Toast, ToastContainer,
} from 'react-bootstrap';
import {
    BriefcaseFill,
    CalendarFill,
    GeoAltFill,
    PeopleFill,
    Building,
} from 'react-bootstrap-icons';
import '../assets/css/Vacancy.css';
const jobsData = [
    {
        id: 1,
        title: 'Frontend Developer',
        status: 'Open',
        applicationDeadline: '2025-06-15',
        numberOfOpenings: 3,
        jobDetail: {
            jobTitle: 'Frontend Developer',
            jobDescription: 'Build React-based UIs using modern frameworks.',
            requiredSkills: 'React, JavaScript, HTML, CSS',
            experience: '2+ years',
            jobType: 'Full-time',
            jobLocation: 'Remote',
            companyName: 'TechCorp',
            numberOfOpenings: 3,
            maxApplications: 100,
            applicationDeadline: '2025-06-15',
        },
    },
    {
        id: 2,
        title: 'Backend Developer',
        status: 'Closed',
        applicationDeadline: '2025-05-01',
        numberOfOpenings: 1,
        jobDetail: {
            jobTitle: 'Backend Developer',
            jobDescription: 'Develop backend APIs and manage databases.',
            requiredSkills: 'Node.js, Express, MongoDB',
            experience: '3+ years',
            jobType: 'Full-time',
            jobLocation: 'On-site',
            companyName: 'DevSolutions',
            numberOfOpenings: 1,
            maxApplications: 50,
            applicationDeadline: '2025-05-01',
        },
    },
    // Add more jobs here...
];

function Vacancy() {
    const [jobs] = useState(jobsData);
    const [selectedJob, setSelectedJob] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', variant: 'info' });

    const handleCardClick = (job) => {
        setSelectedJob((prev) => (prev?.id === job.id ? null : job));
        setShowModal(false);
        setResume(null);
    };

    const handleApplyClick = () => {
        if (selectedJob.status === 'Closed') {
            setToast({ show: true, message: 'This job is closed. You cannot apply.', variant: 'danger' });
            return;
        }
        setShowModal(true);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!resume) return;

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setShowModal(false);
            setResume(null);
            setToast({
                show: true,
                message: `Successfully applied for ${selectedJob.jobDetail.jobTitle}`,
                variant: 'success',
            });
        }, 2000);
    };
    return (
        <>
            <Container fluid className="bgbase">
                <Row className="vacancy-row">
                    <h2 className="vacancy-heading text-center mb-2">
                        Explore Exciting Career Opportunities &mdash;  <strong className=" fw-bold"style={{color:"#389ae0"}}>Find Your Perfect Role Today</strong>
                    </h2>
                    <p className='vacancy-subheading text-center mb-4'>"Find Jobs That Fit Your Skills and Ambition."</p>
                    {/* Left Column: Job Cards */}
                    <Col md={5} className="card-list">
                        {jobs.map((job) => (
                            <div
                                key={job.id}
                                className={`card-item ${selectedJob?.id === job.id ? 'selected' : ''}`}
                                onClick={() => handleCardClick(job)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => e.key === 'Enter' && handleCardClick(job)}
                            >
                                <div className="card-content">
                                    <div className="card-left">
                                        <BriefcaseFill className="icon" />
                                        <div>
                                            <div className="card-title">{job.title}</div>
                                            <div className="card-subtitle">Deadline: {job.applicationDeadline}</div>
                                            <div className="card-subtitle">Openings: {job.numberOfOpenings}</div>
                                        </div>
                                    </div>
                                    <span
                                        className={`status-badge ${job.status === 'Open' ? 'status-open' : 'status-closed'
                                            }`}
                                    >
                                        {job.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </Col>

                    {/* Right Column: Job Details + Apply Button */}
                    <Col md={7} className="job-detail">
                        {selectedJob ? (
                            <>
                                <h4>{selectedJob.jobDetail.jobTitle}</h4>

                                <p className="job-description"><strong style={{ color: "#0d6efd" }}>Description:</strong> {selectedJob.jobDetail.jobDescription}</p>

                                <div className="job-info single-col">
                                    <p>
                                        <BriefcaseFill color="#0d6efd" />
                                        <strong>Skills Required:</strong> {selectedJob.jobDetail.requiredSkills}
                                    </p>
                                    <p>
                                        <Building color="#0d6efd" />
                                        <strong>Company:</strong> {selectedJob.jobDetail.companyName}
                                    </p>
                                    <p>
                                        <CalendarFill color="#0d6efd" />
                                        <strong>Application Deadline:</strong> {selectedJob.jobDetail.applicationDeadline}
                                    </p>
                                </div>

                                <div className="job-info two-col">
                                    <p>
                                        <PeopleFill color="#0d6efd" />
                                        <strong>Experience:</strong> {selectedJob.jobDetail.experience}
                                    </p>
                                    <p>
                                        <CalendarFill color="#0d6efd" />
                                        <strong>Job Type:</strong> {selectedJob.jobDetail.jobType}
                                    </p>
                                    <p>
                                        <GeoAltFill color="#0d6efd" />
                                        <strong>Location:</strong> {selectedJob.jobDetail.jobLocation}
                                    </p>
                                    <p>
                                        <PeopleFill color="#0d6efd" />
                                        <strong>Number of Openings:</strong> {selectedJob.jobDetail.numberOfOpenings}
                                    </p>
                                </div>
                                {/* <Button
                                    variant="primary"
                                    className="btn-apply"
                                    disabled={selectedJob.status === 'Closed'}
                                    onClick={handleApplyClick}
                                >
                                    Apply
                                </Button> */}
                                <div  className="d-flex justify-content-end mt-3"
                                    onClick={() => {
                                        if (selectedJob.status === 'Closed') {
                                            setToast({
                                                show: true,
                                                message: 'This job is closed.',
                                                variant: 'danger',
                                            });
                                        }
                                    }}
                                    style={{
                                        display: 'inline-block',
                                        cursor: selectedJob.status === 'Closed' ? 'not-allowed' : 'pointer',
                                    }}
                                >
                                    <Button
                                        variant="primary"
                                        className="btn-apply"
                                        disabled={selectedJob.status === 'Closed'}
                                        onClick={() => {
                                            if (selectedJob.status !== 'Closed') {
                                                handleApplyClick();
                                            }
                                        }}
                                    >
                                        Apply
                                    </Button>
                                </div>
{/* 
                                <ToastContainer position="bottom-end" className="p-3">
                                    <Toast
                                        bg={toast.variant}
                                        onClose={() => setToast({ ...toast, show: false })}
                                        show={toast.show}
                                        delay={3000}
                                        autohide
                                    >
                                        <Toast.Body className="text-white fw-bold fs-6">{toast.message}</Toast.Body>
                                    </Toast>
                                </ToastContainer> */}

                            </>
                        ) : (
                            <div className="placeholder-message">
                                <p>Please select a job card to see details and apply.</p>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>

            {/* Application Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Apply for {selectedJob?.jobDetail.jobTitle}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleFormSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formJobTitle">
                            <Form.Label>Job Title</Form.Label>
                            <Form.Control type="text" value={selectedJob?.jobDetail.jobTitle || ''} readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formResume">
                            <Form.Label>Upload Resume</Form.Label>
                            <Form.Control
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => setResume(e.target.files[0])}
                                required
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)} disabled={loading}>
                            Cancel
                        </Button>
                        <Button variant="success" type="submit" disabled={!resume || loading}>
                            {loading ? (
                                <>
                                    <Spinner animation="border" size="sm" className="me-2" role="status" aria-hidden="true" />
                                    Submitting...
                                </>
                            ) : (
                                'Submit Application'
                            )}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            {/* Toast Notifications */}
            <ToastContainer position="bottom-end" className=" p-3 toast-conatiner">
                <Toast
                    bg={toast.variant}
                    onClose={() => setToast({ ...toast, show: false })}
                    show={toast.show}
                    delay={3000}
                    autohide
                >
                    <Toast.Body className="text-white fw-bold fs-6">{toast.message}</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
}

export default Vacancy;
