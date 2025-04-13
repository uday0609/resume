import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Link, NavLink } from 'react-router-dom';

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
        <NavLink  to="/" className="fs-6" style={{ color: "#389ae0", fontWeight: 500 }}>Resume_Screener</NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className='justify-content-lg-end'>
          <Nav>
            <ul className='flex-lg-row flex-column' style={{listStyle:"none", display:"flex", paddingLeft:'0',justifyContent:"start", marginBottom:'0'}}>
              <li><NavLink to="/" className="nav-link mx-lg-2"> Home </NavLink></li>
              <li> <NavLink to="/about" className="nav-link mx-lg-2"> About </NavLink></li>
              <li><NavLink to="/tester" className="nav-link msx-lg-2"> Resume_Tester </NavLink></li>
            </ul>
            
          </Nav>
          <Nav>
            <NavLink to="/admin" className='admin mx-lg-2 '><i className="bi bi-person-badge-fill " style={{ fontSize: '18px' }}></i>Admin</NavLink>
           </Nav>
        
        </Navbar.Collapse>
    </Container>
      </Navbar>

  );


}

export default Header;

