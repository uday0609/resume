import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUser,
  faHandHoldingUsd,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
// import logo from "../images/logo.jpg";
import "./Sidebar.css";
export default function Sidebar() {
  const location = useLocation();
  const navbarContent = [
    // { path: "/admin",
    //   label: "Users",
    //   icon: <FontAwesomeIcon icon={faHouse} size="lg" />
    //  },
    {
      path: "/admin/home",
      label: "Home",
      icon: <FontAwesomeIcon icon={faHouse} size="lg" />,
    },
    {
      path: "/admin/donations",
      label: "Donations",
      icon: <FontAwesomeIcon icon={faHandHoldingUsd} size="lg" />,
    },
    {
      path: "/admin/enquires",
      label: "Enquires",
      icon: <FontAwesomeIcon icon={faCommentDots} size="lg" />,
    },
  ];

  return (
    <Container
      fluid
      className="p-0 vh-100"
      style={{
        background: "linear-gradient(180deg,rgb(71 71 86), rgb(22, 33, 62))",
        color: "white",
        textDecoration:"none"
      }}
    >
      {/* Logo Section */}
      <Container fluid className="p-0 py-3 text-center">
        <Navbar.Brand>  
          <img
            alt="Al-Medhi"
            // src={logo}
            width="120"
            height="120"
            style={{
              borderRadius: "50%",
              marginTop: "10px",
              marginLeft: "60px",
            }}
            className="d-inline-block align-top m-3 m-lg-auto m-md-0"
          />
        </Navbar.Brand>
        <hr style={{ borderColor: "white", margin: "10px 20px" }} />
      </Container>

      {/* Navigation Links */}
      <Nav className="flex-column" activeKey="/">
        {navbarContent.map((item, index) => (
          <Nav.Item key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `d-block py-2 px-3 ${
                  isActive ? "bg-light text-dark" : "text-white"
                }`
              }
              style={{
                textDecoration: "none!important",
                fontSize: "15px",
                borderRadius: "0px 50px 50px",
                margin: "5px 10px", 
              }}
            >
              <span style={{ marginRight: "10px" }}>{item.icon}</span>
              {item.label}
            </NavLink>
          </Nav.Item>
        ))}
      </Nav>
    </Container>
  );
}
