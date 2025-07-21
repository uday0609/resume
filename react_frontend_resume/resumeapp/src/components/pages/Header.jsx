import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Link, NavLink } from 'react-router-dom';
import { FaIdBadge } from "react-icons/fa";
import HireSync from "../assets/images/HireSync.png"
import '../assets/css/Header.css';
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);

  //   const toggleNavbar = () => {
  //     setIsOpen(!isOpen);
  //   };

  //   const closeNavbar = () => {
  //     setIsOpen(false);
  //   };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <Navbar collapseOnSelect expand="lg" className={`navbar shadow ${isScrolled ? 'navbar-scrolled' : ''} `}>
      <Container>
         <img src={HireSync} alt="HireSync Logo" className="brand-logo fluid" />
        <NavLink to="/" className="fs-5 me-auto fw-bold .brand-logo " style={{ color: "#389ae0",  }}>HireSync</NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className='justify-content-lg-end'>
          <div className="w-100 d-lg-flex justify-content-between align-items-center">
            <Nav className="mx-auto">
              <ul className='flex-lg-row flex-column ' style={{ listStyle: "none", display: "flex", paddingLeft: '0', justifyContent: "start", marginBottom: '0' }}>
                <li><NavLink to="/" className={({ isActive }) =>
                  `nav-link mx-lg-2 ${isActive ? 'active-link' : ''}`
                }> Home </NavLink></li>
                <li> <NavLink to="/about" className={({ isActive }) =>
                  `nav-link mx-lg-2 ${isActive ? 'active-link' : ''}`
                }> About </NavLink></li>
                <li><NavLink to="/tester" className={({ isActive }) =>
                  `nav-link mx-lg-2 ${isActive ? 'active-link' : ''}`
                }> Resume Tester </NavLink></li>
                <li><NavLink to="/vacancies" className={({ isActive }) =>
                  `nav-link mx-lg-2 ${isActive ? 'active-link' : ''}`
                }> Vacancies </NavLink></li>
              </ul>

            </Nav>
          </div>
          <Nav className="ms-lg-auto mt-2 mt-lg-0">
            <NavLink
              to="/admin"
              className="admin nav-link mx-lg-2 d-inline-lg-flex align-items-center"
              style={{
                fontSize: "17px",
                border: "2px solid #389ae0",
                borderRadius: "8px",
                padding: "3px 6px",
                color: "#389ae0",
                textDecoration: "none",
                whiteSpace: "nowrap",
                width: "fit-content",
                // alignSelf: "center"
              }}
            >
              <FaIdBadge className="me-1" />
              Admin
            </NavLink>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>

  );


}

export default Header;

