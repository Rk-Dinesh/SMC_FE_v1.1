import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

import Logo from "../../assets/images/logo.png";
import AI from "../../assets/images/certificate bg.png";
import Badge from "../../assets/images/complete.png";
import Completed from "../../assets/images/completed.png";
import { useLocation } from "react-router-dom";
import { formatDate1 } from "../../Host";

const ViewCertificate = () => {
  const certificateRef = useRef(null);
  const [isContentVisible, setContentVisible] = useState(false);
  const { state } = useLocation();
  const { courseTitle, end } = state || {};  

  const handleDownload = () => {
    setContentVisible(true);
    const element = certificateRef.current;

    // Store original width
    const originalWidth = element.style.width;

    // Force 900px width for download
    element.style.width = "900px";
    element.style.visibility = "visible";

    html2canvas(element, { scale: 2 })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("landscape", "mm", "a4");

        const imgWidth = 297; // A4 landscape width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const x = (297 - imgWidth) / 2; // center horizontally in landscape A4
        const y = (210 - imgHeight) / 2; // optional: center vertically if needed

        pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);

        pdf.save(`SMC ${courseTitle} Certificate.pdf`);
        

        // Revert width after download
        element.style.width = originalWidth;
      })
      .catch((err) => {
        console.error("Error generating canvas for PDF:", err);
      });
  };

  return (
    <>
      <div
        style={{
          color: "#ffffff",
          borderBottom: "1px solid white",
          paddingBottom: "0.5rem",
          marginBottom: "2rem",
        }}
      >
        <p>My Certificates</p>
      </div>

      <div
        ref={certificateRef}
        style={{
          position: "relative",
          margin: "0 auto",
          color: "#ffffff",
          fontFamily: "Poppins, sans-serif",
          boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
          width: "100%", // Allow responsiveness
          maxWidth: "900px", // 800px for portrait, ~1123 for landscape A4
          padding: "40px",
          backgroundColor: "#000000",
        }}
      >
        {/* Background Image */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            height: "100%",
            width: "50%",
            zIndex: 0,
          }}
        >
          <img
            src={AI}
            alt="AI background"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "right",
            }}
          />
        </div>

        {/* Left Banner */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: "4rem",
            backgroundColor: "#14b8a6", // teal-400 hex
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              transform: "rotate(-90deg)",
              color: "#000000",
              fontWeight: "900",
              fontSize: "2.2rem",
              letterSpacing: "0.1em",
              whiteSpace: "nowrap",
            }}
          >
            AI COURSE GENERATOR
          </span>
        </div>

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            paddingLeft: "2.5rem",
            paddingRight: "2.5rem",
            paddingBottom: "1.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ paddingBottom: "2rem", textAlign: "center" }}>
            <img src={Logo} alt="Logo" />
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginTop: "0.5rem",
              }}
            >
              CERTIFICATE OF COMPLETION
            </h3>
          </div>
          <p style={{ marginTop: "0.5rem", fontSize: "1.125rem" }}>
            This is to certify that
          </p>
          <h1
            style={{
              fontSize: "1.875rem",
              fontWeight: "bold",
              marginTop: "0.75rem",
            }}
          >
            {localStorage.getItem("userName")}
          </h1>
          <div
            style={{
              height: "2px",
              width: "83.333333%",
              marginTop: "0.5rem",
              backgroundColor: "#475569",
            }}
          ></div>
          <p style={{ marginTop: "1rem", fontSize: "1.125rem" }}>
            has successfully completed the course on
          </p>
          <h2
            style={{ fontSize: "1.5rem", fontWeight: 600, marginTop: "0.5rem" }}
          >
            {courseTitle}
          </h2>
          <p style={{ marginTop: "0.5rem", fontSize: "1rem" }}>
            On {end}
          </p>
        </div>

        {/* Badge */}
        <div
          style={{
            position: "absolute",
            top: "0.25rem",
            right: "-8rem",
            zIndex: 20,
          }}
        >
          <img src={Badge} alt="Badge" style={{ width: "33.3333%" }} />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={Completed}
              alt="image"
              style={{
                position: "relative",
                width: "50%",
                top: "0.5rem",
                right: "6rem",
              }}
            />
            <p
              style={{
                position: "absolute",
                right: "11rem",
                top: "6rem",
                transform: "rotate(-45deg)",
                color: "#000000",
                fontSize: "1.3rem",
                fontWeight: "900",
              }}
            >
              Completed
            </p>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: "1rem",
            left: "5rem",
            right: "1.5rem",
            zIndex: 10,
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.75rem",
            color: "#9ca3af",
          }}
        >
          <span>This is a system generated certificate</span>
          <span>A product of Morpheus Code</span>
        </div>
      </div>

      {/* Download Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1.5rem",
          marginBottom: "1.5rem",
        }}
      >
        <button
          onClick={handleDownload}
          style={{
            backgroundColor: "#14b8a6", // teal-400
            color: "#000000",
            padding: "0.5rem 1.5rem",
            borderRadius: "0.375rem",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          Download
        </button>
      </div>
    </>
  );
};

export default ViewCertificate;
