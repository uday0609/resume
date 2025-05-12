import { Container, Row,Col } from "react-bootstrap";
// import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import '../assets/css/Aboutus.css';
const Aboutus = ()=>{
    return(
        <Container fluid className="bgbase pt-5 ">
            <Row className="d-flex justify-content-center align-item-center " >
                <Col lg={11}className=" text-center mt-5">
                        <h4 className="fw-light">Say goodbye to resume stress!</h4>
                        <p className=" display-6 px-4" style={{color:"#389ae0",fontWeight:500}}>"Transforming
                         resumes into powerful career tools, tested for success and tailored to impress!"</p>
                </Col>
            </Row>
            <Row className="d-flex justify-content-center align-item-center  ms-lg-5 ps-lg-4 mt-3">
                <Col lg={4}  md={3} >
                    <Card style={{ width: '18rem',backgroundColor:'white'}} className=" m-1 text-center justify-content-center cardcss">
                        <Card.Body className="text-center ">
                            <Card.Subtitle className="m-2 p-2"><i className="bi bi-journal-bookmark-fill cardicon " ></i></Card.Subtitle>
                            <Card.Title  style={{color:"#389ae0",left:'10%'}} className="line-custom  text-center  justify-content-center">Job-Specific Tailoring</Card.Title>
                            <Card.Text >
                                Customizes resumes to align with the exact skills, qualifications,  and keywords required for specific job roles.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4}  md={3} >
                    <Card style={{ width: '18rem',backgroundColor:'white'}} className="  m-1 text-center justify-content-center cardcss">
                        <Card.Body className="text-center ">
                            <Card.Subtitle className="m-2 p-2"><i className="bi bi-file-post-fill cardicon " ></i></Card.Subtitle>
                            <Card.Title  style={{color:"#389ae0",left:'8%'}} className="line-custom  text-center  justify-content-center">Job Description Match</Card.Title>
                            <Card.Text>
                                 Compares your resume to the job description to highlight key competencies and match role's requirements .
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4}  md={3} >
                    <Card style={{ width: '18rem',backgroundColor:'white'}} className=" m-1 text-center justify-content-center cardcss">
                        <Card.Body className="text-center ">
                            <Card.Subtitle className="m-2 p-2"><i className="bi bi-clipboard2-check cardicon " ></i></Card.Subtitle>
                            <Card.Title  style={{color:"#389ae0",left:'23%'}} className="line-custom">  Resume Tester</Card.Title>
                            <Card.Text>
                                A feature that tests the compatibility of a resume with a
                                job, based on keywords, qualifications, and skills matching.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex justify-content-center align-item-center flex-wrap ms-lg-5 ps-lg-4  mt-3 ms-md-1">
                 <Col lg={4}  md={3} >
                    <Card style={{ width: '18rem',backgroundColor:'white'}} className=" m-1 text-center justify-content-center cardcss">
                        <Card.Body className="text-center ">
                            <Card.Subtitle className="m-2 p-2"><i className="bi bi-file-earmark-arrow-up cardicon " ></i></Card.Subtitle>
                            <Card.Title  style={{color:"#389ae0",left:'10%'}} className="line-custom  text-center  justify-content-center">Easy Resume Upload </Card.Title>
                            <Card.Text>
                                Quickly upload your resume to apply for jobs seamlessly without any hustle for the job made for you. .
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4}  md={3} >
                    <Card style={{ width: '18rem',backgroundColor:'white'}} className=" m-1 text-center justify-content-center cardcss">
                        <Card.Body className="text-center ">
                            <Card.Subtitle className="m-2 p-2" ><i className="bi bi-bookmark-star cardicon" ></i></Card.Subtitle>
                            <Card.Title  style={{color:"#389ae0",left:"10%"}} className="line-custom  text-center  justify-content-center"> Resume Match Score</Card.Title>
                            <Card.Text>
                                Get a personalized score showing how well your resume fits the job description.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4}  md={3} >
                    <Card style={{ width: '18rem',backgroundColor:'white'}} className=" m-1 text-center justify-content-center cardcss">
                        <Card.Body className="text-center ">
                            <Card.Subtitle className="m-2 p-2"><i className="bi bi-card-checklist cardicon " ></i></Card.Subtitle>
                            <Card.Title  style={{color:"#389ae0",left:'3%'}} className="line-custom  text-center  justify-content-center"> Skill & Keyword Matching  </Card.Title>
                            <Card.Text>
                                Ensure your resume aligns with the key skills and qualifications employers are looking for.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row> 
        </Container>
    );
}
export default Aboutus;
// npm i -D react-router-dom
// Easy Resume Upload: Quickly upload your resume to apply for jobs.
// Resume Match Score: Get a personalized score showing how well your resume fits the job description.
// Skill & Keyword Matching: Ensure your resume aligns with the key skills and qualifications employers are looking for.
// Smart Keyword & Skill Matching: We analyze both the job description and your resume to ensure key skills, qualifications, 
// and keywords are aligned for maximum visibility.