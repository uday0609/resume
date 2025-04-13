import { FaUserTie,FaTasks ,FaStamp ,FaRegTimesCircle  } from "react-icons/fa";
import { Container, Row,Col } from "react-bootstrap";

const Dashboard = () => {
    return (
        <>
            {/* <div className="container-fluid vh-100  pt-5 mt-3" style={{backgroundColor:'#f0f7f7'}} >
             <div> <p > trial page</p></div>
        </div> */}
            <Container fluid className="py-4" style={{ backgroundColor: "#f8f9fa" }}>
                <Row className="mt-4 pt-4">
                    <Col lg={3} sm={6} xs={12}>
                        <div
                            className="p-3 d-flex align-items-center my-3 rounded-1"
                            style={{
                                backgroundColor: "rgba(111, 177, 247,0.1)",
                                borderLeft: "4px solid #007bff",
                                borderBottom: "4px solid #007bff"
                            }}
                        >
                            <div className="flex-grow-1 text-start ms-1 me-2">
                                <p style={{ fontSize: "14px" }} className="text-muted fw-bold  mb-1">JOB APPLICATIONS</p>
                                <h5 className="mb-0 ">200</h5>
                            </div>
                            <FaUserTie  className="p-2" style={{ color: "#007bff",backgroundColor:"rgba(111, 177, 247,0.4)",borderRadius:"43%",border:"1px solid #007bff", fontSize: "53px" }} />

                        </div>
                    </Col>
                    <Col lg={3} sm={6} xs={12}>
                        <div
                            className="p-3 d-flex align-items-center my-3 rounded-1"
                            style={{
                                backgroundColor: "rgba(140, 201, 99,0.1)",
                                borderLeft: "4px solid #67d31f",
                                borderBottom: "4px solid #67d31f"
                            }}
                        >
                            <div className="flex-grow-1 text-start ms-1 me-2">
                                <p style={{ fontSize: "14px" }} className="text-muted  fw-bold mb-1">SHORTLISTED</p>
                                <h5 className="mb-0 ">144</h5>
                            </div>
                            <FaTasks   className="p-2" style={{ color: "#67d31f",backgroundColor:"rgba(140, 201, 99,0.3)",borderRadius:"43%", border:"1px solid #67d31f", fontSize: "53px" }} />

                        </div>
                    </Col>
                    <Col lg={3} sm={6} xs={12}>
                        <div
                            className="p-3 d-flex align-items-center my-3 rounded-1"
                            style={{
                                backgroundColor: "rgba(214, 114, 123,0.1)",
                                borderLeft: "4px solid #dc3545",
                                borderBottom: "4px solid #dc3545"
                            }}
                        >
                            <div className="flex-grow-1 text-start ms-1 me-2">
                                <p style={{ fontSize: "12px" }} className="text-muted mb-1 fw-bold">ON-HOLD APPLICANTS</p>
                                <h5 className="mb-0 ">14</h5>
                            </div>
                            <FaStamp    className="p-2" style={{ color: "#dc3545", borderRadius:"42%",backgroundColor:"rgba(214, 114, 123,0.4)", border:"1px solid #dc3545",fontSize: "53px" }} />

                        </div>
                    </Col>
                    <Col lg={3} sm={6} xs={12}>
                        <div
                            className="p-3 d-flex align-items-center my-3 rounded-1"
                            style={{
                                backgroundColor: "rgba(252, 225, 145,0.2)",
                                borderLeft: "4px solid #ffc107",
                                borderBottom: "4px solid #ffc107"
                            }}
                        >
                            <div className="flex-grow-1 text-start ms-1 me-2">
                                <p style={{ fontSize: "11.7px" }} className="text-muted fw-bold mb-1">REJECTED APPLICATIONS</p>
                                <h5 className="mb-0 ">42</h5>
                            </div>
                            <FaRegTimesCircle  className=" p-2" style={{ color: "#ffc107" ,border:"1px solid #ffc107",backgroundColor:"rgba(252, 225, 145,0.6)" ,borderRadius:"43%", fontSize: "53px" }} />

                        </div>
                    </Col>
                </Row>
            </Container>
                </>
                );
}
 export default Dashboard;