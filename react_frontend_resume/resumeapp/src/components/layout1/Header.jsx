import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
// import userImage from "../images/user.png";
import { NavLink } from "react-router-dom";

export default function Header({ showSidebar, setShowSidebar }) {
  const [user, setUser] = useState("");

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         // Decode the JWT token manually
//         const base64Url = token.split(".")[1];
//         const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//         const jsonPayload = decodeURIComponent(
//           atob(base64)
//             .split("")
//             .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
//             .join("")
//         );

//         const decoded = JSON.parse(jsonPayload);
//         // console.log(decoded);
//         setUser(decoded.name || "Unknown User"); 
//       } catch (error) {
//         console.error("Failed to decode token:", error);
//       }
//     } else {
//       console.log("No token found in local storage.");
//     }
//   }, []); 
  return (
    <nav
      className="navbar  navbar-expand-lg bg-light shadow "
      style={{ padding: "6px", marginBottom: "20px", height: "60px",position: "relative",
    zIndex: 10, // ensures it stays above sidebar
    width: "100%",}}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          {/* Sidebar Toggle */}
          <FontAwesomeIcon icon={faBars} size="lg" color="black" className="mx-2" onClick={() => setShowSidebar(!showSidebar)} style={{ cursor: "pointer" }} />
          {/* User Info */}
          <div className="d-flex align-items-center mx-2">
            {/* <Image src={userImage} alt="User" style={{ height: "30px", borderRadius: "50%", marginRight: "10px" }}/> */}
            <span style={{ color: "black", fontSize: "16px" }}>{user}</span>
            <button className="ms-2" style={{ border: "none",backgroundColor: "#389ae0", color: "white",padding: "2px 10px"}}> 
              Admin
            </button>
          </div>
        </div>

        {/* Notification and Logout */}
        <div className="d-flex align-items-center">
          <FontAwesomeIcon icon={faBell} size="lg" color="black" className="mx-3"/>
          <NavLink to={"/logout"}>
            <span style={{ color: "black", fontSize: "19px", cursor: "pointer" }}> 
              Logout <FontAwesomeIcon icon={faSignOutAlt} className="ms-2" color="black"/>
            </span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
