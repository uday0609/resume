import React from 'react';
import { Modal} from 'react-bootstrap';  
import '../assets/css/ResultReport.css';
import { Container, Row,Col, Button } from "react-bootstrap";
import Scorebar from "./Scorebar";
import Table from 'react-bootstrap/Table';
// import { PDFDownloadLink } from '@react-pdf/renderer';
import Resultpdf from './Resultpdf';
const  ResultReport = ()=>{
    const extraData = {
        // Your extra data that is not on the page
        Name: "example use name ",
        address: "123 Main Street",
        email:"name@gmail.com"
      };
    const percentage=84;
    const messageStyle = {
        color: percentage >= 85 ? 'green' : percentage <= 30 ? 'red' : 'orange', // color as per value score
      };
    return(
       <>
         <Modal.Header closeButton>
                     <Modal.Title>HireSync</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Container>
                <Row >
                    <Col md={6} className=' p-1 d-flex align-items-center justify-content-center'>
                         <div className='mt-2  pt-1 ' >
                           <Scorebar value={percentage}/>
                         </div>
                    </Col>
                    <Col md={6} className=' p-2'>
                        <div className="message-container mt-2 pt-1 ">
                            {/* <h1>Your Progress: {percentage}%</h1> */}
                            <h5 style={messageStyle} className='fw-bold px-2'>
                                {percentage >= 85 ?  "Excellent! You have achieved"  : 
                                percentage <= 30 ? 'Low progress. Keep going!' : 'Good progress, almost there!'}
                            </h5>
                            <p className='pt-2 px-2' style={{textAlign:"justify", fontSize:'15px'}}>
                                {percentage >= 85 ?  "You'll be good candidate as your resume demonstrates a high level of relevance to the position."  : 
                                percentage <= 30 ?'Your resume does not appear to closely align with the required skills and experience for this position.'
                                 :'While your resume demonstrates some relevant skills and experience, it could be significantly improved by incorporating more targeted skills. '}
                            </p>
                            <p className='px-2 ' style={{textAlign:"justify",fontSize:'15px'}}>
                                {percentage >= 85 ?  "Your skills strongly aligns with the job requirements."  : 
                                percentage <= 30 ? " Incorporate more specific keywords and highlighting relevant achievements that directly match the role's needs."
                                 : 'Consider tailoring your resume further to highlight the key requirements listed in posting.'}
                            </p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={10} className='p-1 ps-3'>
                        <h4 className='fw-bold  fs-5' style={{color:" #007fbf"}}>Skill Set:</h4>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <p style={{backgroundColor:"#cfcbca",borderRadius:'10px'}}>
                                    <Row className=''>
                                        <Col xs={2} className=' p-1 d-none d-md-flex  justify-content-center align-items-center'>
                                            <i class="bi bi-lightbulb-fill text-warning fs-3" ></i>
                                        </Col>
                                        <Col xs={10}  className=' p-lg-1  p-3 ps-5 d-flex justify-content-center align-items-center'>
                                            <p style={{fontSize:'15px'}}> Your resume has <strong className='fw-bold'> 2 out of 4</strong> keywords that appear in the job description.</p>
                                        </Col>
                                    </Row>
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Table  striped bordered hover size="sm" responsive style={{textAlign:"center"}}>
                            <thead>
                                <tr>
                                    <th className='fw-bold fs-5' style={{color:" #007fbf"}}>Skills</th>
                                    <th  className='fw-bold fs-5' style={{color:" #007fbf"}}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td> frontend</td>
                                    <td><i class="bi bi-check-circle-fill text-success"></i></td>
                                </tr>

                                <tr>
                                    <td>machine learning</td>
                                    <td><i class="bi bi-exclamation-octagon-fill text-danger"></i></td>
                                </tr>
                                <tr>
                                    <td> full stack</td>
                                    <td><i class="bi bi-check-circle-fill text-success"></i></td>
                                </tr>
                                <tr>
                                    <td>backend</td>
                                    <td><i class="bi bi-exclamation-octagon-fill text-danger"></i></td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </Modal.Body>
        {/* <Modal.Footer> */}
            {/* <Button className='' variant='success'> download pdf</Button> */}
            {/* <PDFDownloadLink
             document={<Resultpdf extraData={extraData} />}
             fileName="my-report.pdf"
            >
            {({ loading }) => (loading ? 'Loading...' : 'Download PDF')}
            </PDFDownloadLink>
            */}
        {/* </Modal.Footer> */}
       </>
    );
}
export default ResultReport;