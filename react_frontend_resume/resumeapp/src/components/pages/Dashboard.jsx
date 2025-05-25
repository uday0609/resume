// import React,{ useState} from "react";
import { FaUserTie, FaTasks, FaStamp, FaRegTimesCircle } from "react-icons/fa";
import { Container, Row, Col } from "react-bootstrap";
import BarChart from '../pages/BarChart.jsx';
import React from "react";
import JobProgressChart from "./JobProgressChart.js";
const Dashboard = () => {
  // Sample data 
  const totalJobsapplications = 160;
  const selected = 100;
  const hold = 60;
//   const rejected = 40;

  // Chart expects an array in the correct order
  const barChartData = [totalJobsapplications, selected, hold];

    return (
        <>
            {/* <div className="container-fluid vh-100  pt-5 mt-3" style={{backgroundColor:'#f0f7f7'}} >
             <div> <p > trial page</p></div>
        </div> */}
            <Container fluid className="py-1" style={{ backgroundColor: "#f8f9fa" }}>
                <Row className="mt-1 pt-1">
                    <Col lg={4} sm={6} xs={12}>
                        <div
                            className="p-3 d-flex align-items-center my-3 rounded-1 shadow "
                            style={{
                                backgroundColor: "white",
                                borderLeft: "4px solid #389ae0",
                                borderBottom: "4px solid #389ae0"
                            }}
                        >
                            <div className="flex-grow-1 text-start ms-1 me-2">
                                <p style={{ fontSize: "14px" }} className="text-muted fw-bold  mb-1">JOB APPLICATIONS</p>
                                <h5 className="mb-0 ">{totalJobsapplications}</h5>
                            </div>
                            <FaUserTie className="p-2 shadow" style={{ color: "#389ae0", borderRadius: "43%", border: "1px solid #389ae0", fontSize: "53px" }} />

                        </div>
                    </Col>
                    <Col lg={4} sm={6} xs={12}>
                        <div
                            className="p-3 d-flex align-items-center my-3 rounded-1 shadow"
                            style={{
                                backgroundColor: "white",
                                borderLeft: "4px solid #389ae0",
                                borderBottom: "4px solid #389ae0"
                            }}
                        >
                            <div className="flex-grow-1 text-start ms-1 me-2">
                                <p style={{ fontSize: "14px" }} className="text-muted  fw-bold mb-1">SHORTLISTED</p>
                                <h5 className="mb-0 ">{selected}</h5>
                            </div>
                            <FaTasks className="p-2 shadow" style={{ color: "#389ae0", borderRadius: "43%", border: "1px solid #389ae0", fontSize: "53px" }} />

                        </div>
                    </Col>
                    <Col lg={4} sm={6} xs={12}>
                        <div
                            className="p-3 d-flex align-items-center my-3 rounded-1 shadow"
                            style={{
                                backgroundColor: "white",
                                borderLeft: "4px solid #389ae0",
                                borderBottom: "4px solid #389ae0"
                            }}
                        >
                            <div className="flex-grow-1 text-start ms-1 me-2">
                                <p style={{ fontSize: "12px" }} className="text-muted mb-1 fw-bold">ON-HOLD APPLICANTS</p>
                                <h5 className="mb-0 ">{hold}</h5>
                            </div>
                            <FaStamp className="p-2 shadow" style={{ color: "#389ae0", borderRadius: "42%", border: "1px solid #389ae0", fontSize: "53px" }} />
                        </div>
                    </Col>
                    {/* <Col lg={3} sm={6} xs={12}>
                        <div
                            className="p-3 d-flex align-items-center my-3 rounded-1 shadow"
                            style={{
                                backgroundColor: "white",
                                borderLeft: "4px solid #389ae0",
                                borderBottom: "4px solid #389ae0"
                            }}
                        >
                            <div className="flex-grow-1 text-start ms-1 me-2">
                                <p style={{ fontSize: "11.7px" }} className="text-muted fw-bold mb-1">REJECTED APPLICATIONS</p>
                                <h5 className="mb-0 ">{rejected}</h5>
                            </div>
                            <FaRegTimesCircle className=" p-2 shadow" style={{ color: "#389ae0", border: "1px solid #389ae0", borderRadius: "43%", fontSize: "53px" }} />

                        </div>
                    </Col> */}
                </Row>
                <Row>
                    <Col lg={6}>
                        <BarChart data={barChartData} />
                    </Col>
                    <Col lg={6}>
                         <JobProgressChart />
                    </Col>
                </Row>
            </Container>
        </>
    );
}
export default Dashboard;