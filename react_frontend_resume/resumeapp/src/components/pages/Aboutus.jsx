import { Container, Row, Col } from "react-bootstrap";
import Image from 'react-bootstrap/Image';
// import Card from 'react-bootstrap/Card';
import "bootstrap-icons/font/bootstrap-icons.css";
import '../assets/css/Aboutus.css';
import cardimg from '../assets/images/cardimg.jpg';
const Aboutus = () => {
    return (
        <Container fluid className="bgbase pt-5 ">
            <Row className="d-flex justify-content-center  align-item-center " >
                <Col lg={11} data-aos="fade-up" className=" text-center mt-5">
                    <p className=" fs-4">Say goodbye to resume stress!</p>
                    <p className="display-6 px-4 fw-bold" style={{ color: "#389ae0", fontWeight: 900 }}>"Transforming
                        resumes into powerful career tools, tested for success and tailored to impress!"</p>
                    <p className=" fs-4">Our Offerings !</p>
                </Col>
            </Row>
            <Row className="d-flex justify-content-center align-item-center   mt-3">
                <div className="content">
                    <a class="card cardcss "  data-aos="fade-up" data-aos-delay="200"  href="#!">
                        <div class="front" >
                            
                            <div className="row pt-0">
                                <div class="col-12">
                                     <Image src={cardimg} rounded fluid/>
                                </div>
                                <div class="col-12 d-flex flex-column" >
                                    <h2 style={{marginTop:'-25px'}}><i className="bi bi-journal-bookmark-fill cardicon " ></i></h2>
                                    <h4 style={{color:"#389ae0"}} className=" fw-bold line-custom  mt-4 mx-auto text-center  justify-content-center align-items-center">Job-Specific Tailoring</h4>
                                </div>
                            </div>
                        </div>
                        <div class="back">
                            <div>  
                               <h6 className="fw-bold p-1"> Customize resumes that speak the job's language. </h6>

                                <p>Customizes resumes to align with the exact skills, qualifications, and keywords required for specific job roles.</p>
                                
                            </div>
                        </div></a><a class="card cardcss"   data-aos="fade-up" data-aos-delay="200" href="#!">
                        <div class="front" >
                            <div className="row pt-0">
                                <div class="col-12">
                                     <Image src={cardimg} rounded fluid/>
                                </div>
                                <div class="col-12 d-flex flex-column" >
                                    <h2 style={{marginTop:'-25px'}}><i className=" bi bi-file-post-fill cardicon " ></i></h2>
                                    <h4 style={{color:"#389ae0"}} className=" fw-bold line-custom  mt-4 mx-auto text-center  justify-content-center align-items-center">Job Description Match</h4>
                                </div>
                            </div>
                        </div>
                        <div class="back">
                            <div>
                               <h5 className="fw-bold p-1">See how well your resume fits the job.</h5>
                                 <p>Compares your resume to the job description to highlight key competencies and match role's requirements .</p>                            </div>
                        </div></a>
                        <a class="card cardcss"  data-aos="fade-up" data-aos-delay="200" href="#!">
                        <div class="front"><div className="row pt-0">
                                <div class="col-12">
                                     <Image src={cardimg} rounded fluid/>
                                </div>
                                <div class="col-12 d-flex flex-column" >
                                    <h2 style={{marginTop:'-25px'}}><i className="bi bi-clipboard2-check cardicon " ></i></h2>
                                    <h4 style={{color:"#389ae0"}} className=" fw-bold line-custom  mt-4 mx-auto text-center  justify-content-center align-items-center">Resume Tester</h4>
                                </div>
                            </div>
                        </div>
                        <div class="back">
                            <div>
                                 <h6 className="fw-bold p-1"> Stress-test your resume before it hits the real world.</h6>
                                <p> A feature that tests the compatibility of a resume with a
                                job, based on keywords, qualifications, and skills matching.</p>
                            </div>
                        </div></a><a class="card cardcss"   data-aos="fade-up" data-aos-delay="250" href="#!">
                        <div class="front">
                            <div className="row pt-0">
                                <div class="col-12">
                                     <Image src={cardimg} rounded fluid/>
                                </div>
                                <div class="col-12 d-flex flex-column" >
                                    <h2 style={{marginTop:'-25px'}}><i className="bi bi-file-earmark-arrow-up cardicon " ></i></h2>
                                    <h4 style={{color:"#389ae0"}} className=" fw-bold line-custom  mt-4 mx-auto text-center  justify-content-center align-items-center">Easy Resume Upload</h4>
                                </div>
                            </div>
                        </div>
                        <div class="back">
                            <div>
                                 <h5 className="fw-bold p-1">Drag. Drop. Done.</h5>
                                <p> Upload resumes in one click—fast, secure, and hassle-free.
                                    Quickly upload your resume to apply for jobs seamlessly without any hustle for the job made for you.</p>
                            </div>
                        </div></a><a class="card cardcss"   data-aos="fade-up" data-aos-delay="250" href="#!">
                        <div class="front" >
                            <div className="row pt-0">
                                <div class="col-12">
                                     <Image src={cardimg} rounded fluid/>
                                </div>
                                <div class="col-12 d-flex flex-column" >
                                    <h2 style={{marginTop:'-25px'}}><i className="bi bi-bookmark-star cardicon " ></i></h2>
                                    <h4 style={{color:"#389ae0"}} className=" fw-bold line-custom  mt-4 mx-auto text-center  justify-content-center align-items-center">Resume Match Score</h4>
                                </div>
                            </div>
                        </div>
                        <div class="back">
                            <div>
                                 <h5 className="fw-bold p-1">Instant clarity, measurable fit.</h5>
                                <p>  Get a personalized score showing how well your resume fits the job description.</p>
                            </div>
                        </div></a><a class="card cardcss"   data-aos="fade-up" data-aos-delay="250" href="#!">
                        <div class="front" >
                            <div className="row pt-0">
                                <div class="col-12">
                                     <Image src={cardimg} rounded fluid/>
                                </div>
                                <div class="col-12 d-flex flex-column" >
                                    <h2 style={{marginTop:'-25px'}}><i className="bi bi-card-checklist cardicon " ></i></h2>
                                    <h5 style={{color:"#389ae0"}} className=" fw-bold line-custom  mt-4 mx-auto text-center  justify-content-center align-items-center">Skill & Keyword Matching</h5>
                                </div>
                            </div>
                        </div>
                        <div class="back">
                            <div>
                                <h5 className="fw-bold p-1">Speak the recruiter’s language !</h5>
                                <p>  Ensure your resume aligns with the key skills and qualifications employers are looking for.</p>
                                {/* <p>Provident consectetur natus voluptatem quis tenetur sed beatae eius sint.</p> */}

                            </div>
                        </div></a>
                </div>
                {/* 
                <Col lg={4}  md={6} >
                    <Card style={{ width: '18rem' ,height:'14rem',backgroundColor:'white'}} className="mb-3 m-1 mx-auto mx-lg-0 text-center justify-content-center cardcss">
                        <Card.Body className="text-center ">
                            <Card.Subtitle className="m-2 p-2"><i className="bi bi-journal-bookmark-fill cardicon " ></i></Card.Subtitle>
                            <Card.Title  style={{color:"#389ae0",left:'10%'}} className="line-custom  text-center  justify-content-center">Job-Specific Tailoring</Card.Title>
                            <Card.Text >
                                Customizes resumes to align with the exact skills, qualifications,  and keywords required for specific job roles.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4}  md={6} >
                    <Card style={{ width: '18rem',height:'14rem',backgroundColor:'white'}} className="  mb-3 m-1 mx-auto mx-lg-0 text-center justify-content-center cardcss">
                        <Card.Body className="text-center ">
                            <Card.Subtitle className="m-2 p-2"><i className="bi bi-file-post-fill cardicon " ></i></Card.Subtitle>
                            <Card.Title  style={{color:"#389ae0",left:'8%'}} className="line-custom  text-center  justify-content-center">Job Description Match</Card.Title>
                            <Card.Text>
                                 Compares your resume to the job description to highlight key competencies and match role's requirements .
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4}  md={6} >
                    <Card style={{ width: '18rem',height:'14rem',backgroundColor:'white'}} className=" mb-3 m-1 mx-auto mx-lg-0 text-center justify-content-center cardcss">
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
            
                 <Col lg={4}  md={6} >
                    <Card style={{ width: '18rem',height:'14rem',backgroundColor:'white'}} className="mb-3 m-1 mx-auto mx-lg-0 text-center justify-content-center cardcss">
                        <Card.Body className="text-center ">
                            <Card.Subtitle className="m-2 p-2"><i className="bi bi-file-earmark-arrow-up cardicon " ></i></Card.Subtitle>
                            <Card.Title  style={{color:"#389ae0",left:'10%'}} className="line-custom  text-center  justify-content-center">Easy Resume Upload </Card.Title>
                            <Card.Text>
                                Quickly upload your resume to apply for jobs seamlessly without any hustle for the job made for you.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4}  md={6} >
                    <Card style={{ width: '18rem',height:'14rem',backgroundColor:'white'}} className=" mb-3 m-1 mx-auto mx-lg-0 text-center justify-content-center cardcss">
                        <Card.Body className="text-center ">
                            <Card.Subtitle className="m-2 p-2" ><i className="bi bi-bookmark-star cardicon" ></i></Card.Subtitle>
                            <Card.Title  style={{color:"#389ae0",left:"10%"}} className="line-custom  text-center  justify-content-center"> Resume Match Score</Card.Title>
                            <Card.Text>
                                Get a personalized score showing how well your resume fits the job description.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4}  md={6} >
                    <Card style={{ width: '18rem',height:'14rem',backgroundColor:'white'}} className="mb-3 m-1  mx-auto mx-lg-0 text-center justify-content-center cardcss">
                        <Card.Body className="text-center ">
                            <Card.Subtitle className="m-2 p-2"><i className="bi bi-card-checklist cardicon " ></i></Card.Subtitle>
                            <Card.Title  style={{color:"#389ae0",left:'5%'}} className="line-custom  text-center  justify-content-center"> Skill & Keyword Matching  </Card.Title>
                            <Card.Text>
                                Ensure your resume aligns with the key skills and qualifications employers are looking for.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col> */}
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
// #3febaf
{/* </Row> */ }
{/* <Row className="d-flex justify-content-center align-item-center flex-wrap ms-lg-5 mb-md-4 ps-lg-4  mt-3 ms-md-1"> */ }