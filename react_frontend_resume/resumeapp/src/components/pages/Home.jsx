import { Container, Row,Col } from "react-bootstrap";
import intro from '../assets/images/intro.png'; 
import intro2 from '../assets/images/intro2.jpg'; 
import Image from 'react-bootstrap/Image';
import '../assets/css/Home.css';
import resumes from '../assets/images/resumes.png';
import { startTypewriterEffect } from "../pages/Typewrite.js"; // Import the typewriter logic
import React, { useEffect,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
const  Home = ()=>{
    // useEffect(() => {
    //     // Create a script element
    //     const script = document.createElement('script');
    //     script.src = import('./Typewrite'); // The URL of the script you want to add
    //     script.async = true;  // Make sure the script is loaded asynchronously
    //     script.onload = () => {
    //       console.log('Script loaded successfully!');
    //     };
    //     // Append the script to the body
    //     document.body.appendChild(script);
    //     // Clean up by removing the script when the component unmounts
    //     // return () => {
    //     //   document.body.removeChild(script);
    //     //   console.log('Script removed');
    //     // };
    //   },[]); // Empty dependency array ensures it runs only once when the component mounts
    const typewriterRef = useRef(null); // Ref to the typewriter element
 const navigate = useNavigate();
  // Define your words array here (or use props/state)
  const words = ["Upload", "Optimize", "Get Hired!"];

  useEffect(() => {
    // Call the typewriter effect function when the component mounts
    if (typewriterRef.current) {
      startTypewriterEffect(typewriterRef.current, words);
    }

    // Cleanup function if necessary (not needed for this specific case)
    return () => {};
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

    return (
        <Container fluid className="bg pt-1">
            <Row className="base1  pt-5 ">
                <Col md={6} data-aos="fade-up-right" className="mt-lg-2 pt-lg-0   mt-3 pt-4  d-flex flex-column  justify-content-center align-items-center">
                    <h2 className=" fw-bold  p-1  mt-4  d-flex align-item-center justify-content-center">Your Next Job Starts Here</h2>
                    <div className="w-full h-full cont display-4 d-flex justify-center items-center" style={{display: "flex",justifycontent: "center",alignitems: "center"}}>
                       {/* <h1 id="typewriter" className="text-4xl display-4 " style={{color:"#389ae0"}}>Upload,optimize,get hired! </h1> */}
                       <h1 ref={typewriterRef} className="text-4xl display-4 fw-bold" style={{color:"#389ae0",height:'90px'}} id="typewriter"></h1>
                    </div>
    
                    <h3 className="mt-2 fs-4   text-center d-flex justify-content-center  ">"Let us help you craft the perfect resume and match it with top job opportunities." </h3>
                    <h3 className="fs-4 justify-content-center text-center "> It's time to land your dream job.</h3>
                    <div className="d-flex  justify-content-center flex-wrap flex-lg-nowrap  p-lg-2 p-1 gap-3  mt-lg-1  ">
                        <button /*style={{borderRadius:'10%'}}*/ onClick={() => navigate('/vacancies')} className='uploadbtn p-lg-2 p-1 mt-2 fs-5'>
                            <a href='' style={{textDecoration:'none'}}><i className="bi bi-file-earmark-arrow-up-fill"></i> Apply Now</a>
                        </button>
                        <button /*style={{borderRadius:'10%'}}*/onClick={() => navigate('/tester')} className='admin1  p-lg-2 p-1 mt-2 fs-5'>
                            <a href='' style={{textDecoration:'none'}}><i className="bi bi-journal-check"></i> Test Resume</a>
                        </button>
                    </div>
                </Col>
                <Col md={6} data-aos="zoom-in" className="p-lg-5 pt-4">
                  <Image src={resumes} rounded  fluid className="try"/>
                </Col>
            </Row>
        
            <Row className="mt-lg-5  p-2 d-flex ">
                <Col md={6}  data-aos="fade-up" data-aos-delay="190" className="p-lg-5 pt-5 pb-2 align-items-center">
                  <Image src={intro} rounded  fluid />
                </Col>
                
                <Col md={6} data-aos="fade-up"  data-aos-delay="190" className="d-flex justify-content-center align-item-center">
                    <div className="text-center mt-lg-5 pt-lg-4 ">
                        <h4  style={{color:"#389ae0"}} className="display-6 fw-bold pt-2"> "Resumes refined, careers defined."</h4>
                         <h5 className=" fw-light  p-2 mt-1 ">To empower job seekers by crafting optimized resumes and thoroughly 
                         testing them for maximum impact, ensuring every applicant stands out in the competitive job
                          market. </h5>
                          <h5 className=" fw-light  ">Be more than just another applicant — be unforgettable.</h5>
                    </div>
                </Col>
            </Row>
            {/* <Row className="mt-lg-2  p-2 d-flex "> 
                <Col lg={6} className=" order-sm-2 d-flex justify-content-center align-item-center">
                    <div className="text-center mt-lg-5 pt-lg-4 ">
                        <h4  style={{color:"#389ae0"}} className="display-6 fw-bold pt-2">Perfect resumes, proven results.</h4>
                         <h5 className=" fw-light  pt-2 pb-1  mx-lg-3 ">Unlock the power of  resume that works for YOU.</h5>
                         <h5 className=" fw-light   mx-lg-3 "> Go-to resource for 
                            job applicants,  providing expertly tested resumes that open doors 
                            to successful careers and lasting opportunities.  </h5>
                          <h5 className=" fw-light   mx-lg-3">Optimizing resumes , testing for perfection—your go-to
                             expert for job-winning documents!</h5>
                    </div>
                </Col>
                <Col lg={6} className=" order-sm-1 p-lg-5">
                  <Image src={intro2} rounded  fluid />
                </Col>
            </Row> */}
            {/* <Helmet> */}

        </Container>
    );
}
export default Home;
// "Get Your Resume Noticed" 
// "Say goodbye to resume stress!"
// "Your dream job is just one click away."
// "Unlock the power of a resume that works for YOU."
// "Be more than just another applicant — be unforgettable."
// "Get the job you deserve with a resume that stands out."
// Headline: "Your Next Job Starts Here — Upload, Optimize, Get Hired"
// Sub-Headline: "Let us help you craft the perfect resume and match it with top job opportunities. 
// It's time to land your dream job."
// 2. Brief Description with Value Proposition
// "In just a few clicks, upload your resume, optimize it with our ATS-powered checker, and instantly get 
// matched with job listings that suit your skills and experience. We streamline the job search 
// process from start to finish, so you can focus on what matters most—landing your next career opportunity."