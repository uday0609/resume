import { Container, Row, Col, Button } from "react-bootstrap";
import resumetester from '../assets/images/resumetester.jpg';
import scannereline from '../assets/images/scannereline.jpg';
import Image from 'react-bootstrap/Image';
import '../assets/css/Resume_tester.css';
import { useState } from 'react';
import React from 'react';
import { Modal, Form ,Badge} from 'react-bootstrap';
import ResultReport from "./ResultReport";
const Resume_tester = () => {
    // const [show, setShow] = useState(false);
    const [show1, setLgShow1] = useState(false);
    const handleClose1 = () => setLgShow1(false);
    const handleShow1 = () => setLgShow1(true);

    const [show2, setLgShow2] = useState(false);
    const handleClose2 = () => setLgShow2(false);
    const handleShow2 = () => setLgShow2(true);

    const [jobTitle, setJobTitle] = useState('');
    const [skills, setSkills] = useState([]);
    const [skillInput, setSkillInput] = useState('');
    // const [dropdownSkills, setDropdownSkills] = useState([]);
    const [resume, setResume] = useState(null);
    const [errors, setErrors] = useState({}); // Validation errors
    const [formSubmitted, setFormSubmitted] = useState(false);
    // submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        // Validations
        if (!jobTitle) newErrors.jobTitle = 'Job Title is required';
        if (skills.length === 0) newErrors.skills = 'At least one skill is required';
        if (!resume) newErrors.resume = 'Resume is required';
        else if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(resume.type)) {
            newErrors.resume = 'Only PDF and DOC files are allowed';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            // Proceed with form submission logic
            setFormSubmitted(true); // Mark form as submitted
            alert('Form submitted successfully!');
        }
    };

    // adding skill
    const handleAddSkill = () => {
        const newSkills = skillInput
            .split(',')
            .map(skill => skill.trim())
            .filter(skill => skill && !skills.includes(skill));
        if (newSkills.length > 0) {
            setSkills(prev => [...prev, ...newSkills]);
            setSkillInput('');
        }
    };

    const handleRemoveSkill = (index) => {
        setSkills(skills.filter((_, i) => i !== index));
    };
    // Function to reset the skills list for a new user
    //  const handleNewUserSubmit = () => {
    // // Reset skills so the next user starts fresh
    //      setSkills([]);
    //  };
    // // Function to handle submitting skills (e.g., sending to a database)
    // const handleSubmitSkills = () => {
    //     // Assuming you want to send the skills to a database
    //     console.log('Skills to submit:', skills);
    //     // Make a call to an API or send skills to your backend here
    // };
    // Handle file upload change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setResume(file);
    };


    return (
        <Container className="pt-5 ">
            <Row className="pt-5">
                <Col lg={6} data-aos="zoom-in" className="p-3 my-1  d-flex  justify-content-center align-item-center">
                    <div className="mainbox">
                        <div /*style={{position: "relative"}}*/>
                            <Image src={resumetester} style={{ height: '100%', width: '100%' }}></Image>
                        </div>
                        <div className="InfoImageSection_scannerLineContainer__mkYZX">
                            <Image alt="Resume Checker   Scanner line" src={scannereline} className="InfoImageSection_scannerLineImage__LqUX7"></Image>
                        </div>
                    </div>
                </Col>
                <Col lg={6} data-aos="fade-left" className="pt-3 my-2 ">
                    <h3 className="display-4 p-2" style={{ fontWeight: '500', color: "#389ae0", textAlign: "justiffy" }}>Is your resume good enough?</h3>
                    <h5 className="fw-light p-3 " style={{ textAlign: "justify" }}> A tester that checks to ensure your resume is ready
                        to perform and get you interview callbacks . Our resume checker doesn’t just check your resume—it transforms
                        it! It finds errors and guides you on the right skills and keywords.</h5>
                    <Button href="#" onClick={handleShow1} variant="outline-primary" className="p-3 ms-3 fw-bold"> Test Now</Button>
                </Col>
            </Row>
            <Modal size="lg" show={show1} onHide={handleClose1} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>HireSync</Modal.Title>
                </Modal.Header>
                {/* <Modal.Body>//  Show Download Result Button after Form Submission
                        {formSubmitted && (
                            <div className="mt-3">
                            <Button variant="success" onClick={handleDownloadResult}>
                                Download Result
                            </Button>
                            </div>
                        )} */}
                {/* /</Modal.Body> */}
                <Modal.Body>
                    <Form onSubmit={handleSubmit} autoComplete="off">
                        <Container>
                            <Row>
                                <Col col md={6}>
                                    <Row>
                                        <Col md={12} className=" p-2 ">
                                            <Row style={{ textAlign: "center", }} className=" p-2">
                                                <Col md={12} className="">
                                                    <h5 className="fw-bold">STEP <span style={{ color: "#0573e9", fontSize: "22px" }}>1</span></h5>
                                                    <h6>Enter Job post's details here:</h6>
                                                </Col>
                                            </Row>
                                            <Row style={{ textAlign: "center", }} className=" p-2">
                                                <Col md={12} style={{ borderRadius: '10px' }} className="border border-primary  mt-1 p-1 align-items-center shadow">
                                                    <Form.Group controlId="jobTitle">
                                                        <Form.Label> <i class="bi bi-file-earmark-post-fill p-1" style={{ color: "#0573e9", fontSize: "19px" }}></i> Job Title</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder=""
                                                            value={jobTitle}
                                                            onChange={(e) => setJobTitle(e.target.value)}
                                                            className="inputstyle"
                                                        />
                                                        {errors.jobTitle && <Form.Text className="text-danger">{errors.jobTitle}</Form.Text>}
                                                    </Form.Group>
                                                    <Form.Group controlId="skills">
                                                        <Form.Label className="mt-2"> <i class="bi bi-ui-checks p-1 fw-bold" style={{ color: "#0573e9", fontSize: "21px" }}></i>  Skill Set</Form.Label>
                                                        <div className="skills-input d-flex">
                                                            <Form.Control
                                                                type="text"
                                                                placeholder=""
                                                                value={skillInput}
                                                                onChange={(e) => setSkillInput(e.target.value)}
                                                                onKeyDown={(e) => {
                                                                    if (e.key === 'Enter') {
                                                                        e.preventDefault();
                                                                        handleAddSkill();
                                                                    }
                                                                }}
                                                                className="inputstyle"
                                                            >

                                                            </Form.Control>
                                                            <Button variant="outline-secondary" onClick={handleAddSkill} className="ml-2">
                                                                <span className="plus-icon">+</span>
                                                            </Button>
                                                        </div>
                                                        {errors.skills && <Form.Text className="text-danger">{errors.skills}</Form.Text>}
                                                    </Form.Group>
                                                    <div className="mt-2">
                                                        {skills.map((skill, index) => (
                                                            <Badge key={index} bg="primary" className="me-2 m-1">
                                                                {skill}{' '}
                                                                <span style={{ cursor: 'pointer' }} onClick={() => handleRemoveSkill(index)}>
                                                                    &times;
                                                                </span>
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={6}>
                                    <Row>
                                        <Col md={12} className=" p-2">
                                            <Row style={{ textAlign: "center", }} className=" p-2">
                                                <Col md={12} className="p-1">
                                                    <h5 className="fw-bold">STEP <span style={{ color: "#0573e9", fontSize: "22px" }}>2</span></h5>
                                                    <h6>Upload your Resume here:</h6>
                                                </Col>
                                            </Row>
                                            <Row style={{ textAlign: "center", }} className=" p-2">
                                                <Col md={12} style={{ borderRadius: '10px' }} className="border border-primary  mt-1 p-3  p-lg-5 align-items-center shadow">
                                                    <h6 className="fw-light fs-6"> Upload a PDF or Word Doc file</h6>
                                                    <Form.Group controlId="resume">

                                                        <Form.Label className="uploadbutton"> <i class="bi bi-cloud-arrow-up-fill p-1"></i> Upload Resume</Form.Label>
                                                        <Form.Control
                                                            type="file"
                                                            accept=".doc,.docx,.pdf"
                                                            onChange={handleFileChange}
                                                            className="hidden"
                                                        />
                                                        {errors.resume && <Form.Text className="text-danger">{errors.resume}</Form.Text>}
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Row style={{ textAlign: "center", }} className=" p-1">
                                        <Col md={12} className="p-1">
                                            <h5 className="fw-bold">STEP <span style={{ color: "#0573e9", fontSize: "22px" }}>3</span></h5>
                                            <h6>Scan to compare and score your resume vs your job's post.</h6>
                                        </Col>
                                    </Row>
                                    <Row style={{ textAlign: "center", }}>
                                        <Col md={12}>
                                            <Button variant="primary" /*onClick={handleNewUserSubmit}*/ type="submit">
                                                START RESUME SCAN <i class="bi  bi-caret-right-fill fs-6 ps-1"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row style={{ textAlign: "center", }}>
                                        <Col md={12} className="mt-1 pt-1">
                                            <h6 className="text-success" style={{/*color:"#0573e9",*/fontSize: "16px" }}> To view  result
                                                <Button onClick={handleShow2} variant="success" size="sm" className="ms-2 mt-1"> Click here <i class="bi bi-arrow-right-circle-fill fs-5 ps-1"></i></Button> </h6>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                </Modal.Body>
            </Modal>
            <Modal size="lg" show={show2} onHide={handleClose2} backdrop="static" keyboard={false} centered>
                <ResultReport />
            </Modal>
        </Container>
    );
}
export default Resume_tester;
//  autoFocus
// #07e8bf
// #20e3e3
// #28a9e0
// #389ae0
//rgba(56, 154, 224, 0.85)
// {/* Button to submit skills (e.g., for sending to a database) */}
//     <Button onClick={handleSubmitSkills} variant="outline-primary" className="mt-3 ml-2">
//     Submit Skills
// </Button>