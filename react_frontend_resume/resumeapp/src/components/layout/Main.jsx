import React, { useState } from 'react'
import { Button, Col, Container, NavbarCollapse, Row, Stack } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import { Header, Sidebar } from "./index"



export default function Main() {
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <Container fluid className='bg-light'>
      <Row>
        <Col md={2} sm={'auto'} xs={'auto'} className={`p-0 ${!showSidebar ? 'd-none' : ''}`}>
          <Sidebar />
        </Col>
        
        <Col className='p-0 vh-100 overflow-auto'>
          <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
          {/* <Outlet /> */}
        </Col>
      </Row>
    </Container>
  )
}
