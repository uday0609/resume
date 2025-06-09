import React from "react";

export default function Footer() {
  return (
    <footer style={footerStyle} className="text-center ">
      <div style={containerStyle}>
        <p className="mb-1">
          &copy; Copyright
          <span style={{ color: "#3b5998" }}>HireSync</span>. All Rights Reserved.
        </p>
        <p className="mb-0">
          Designed and Developed by{" "}
          <strong style={{ color: "#007bff" }}>AI Challengers Unity</strong>
        </p>
      </div>
    </footer>
  );
}

const footerStyle = {
  // background: 'black'  ,
  background: 'rgba(225, 237, 238, 0.56)',
    // backgroundImage: " linear-gradient(to bottom, transparent 60%, rgb(247, 244, 244) 100%), url(../images/bg.jpg)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  color: "#000",
  padding: "15px 10px",
  width: "100%",
  marginTop: "auto ",
  boxShadow: "0px -2px 4px rgba(0, 0, 0, 0.2)",
};

const containerStyle = {
  maxWidth: "960px",
  margin: "0 auto",
  textAlign: "center",
  
};
