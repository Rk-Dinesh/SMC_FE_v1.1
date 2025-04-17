import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

import Logo from "../../assets/images/logo.png";
import AI from "../../assets/images/certificate bg.png";
import Badge from "../../assets/images/complete.png";
import Completed from "../../assets/images/completed.png";
import { useLocation } from "react-router-dom";
import { formatDate1 } from "../../Host";
import { toast } from "react-toastify";

const ViewCertificate = () => {
  const certificateRef = useRef(null);
  const [isContentVisible, setContentVisible] = useState(false);
  const { state } = useLocation();
  const userName = localStorage.getItem("userName");
  const { courseTitle, end } = state || {};

  const handleDownload1 = () => {
    setContentVisible(true);
    const element = certificateRef.current;

    // Store original styles
    const originalWidth = element.style.width;
    const originalVisibility = element.style.visibility;
    const originalDisplay = element.style.display;

    // Temporarily show for download
    element.style.width = "900px";
    element.style.visibility = "visible";
    element.style.display = "block";

    html2canvas(element, { scale: 2 })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("landscape", "mm", "a4");

        const imgWidth = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const x = (297 - imgWidth) / 2;
        const y = (210 - imgHeight) / 2;

        pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
        pdf.save(`SMC ${courseTitle} Certificate.pdf`);

        // Revert styles
        element.style.width = originalWidth;
        element.style.visibility = originalVisibility;
        element.style.display = originalDisplay;
      })
      .catch((err) => {
        console.error("Error generating canvas for PDF:", err);
      });
  };

  const handleDownload = async () => {
    try {
      const pdf = new jsPDF("landscape", "mm", "a4");
      pdf.setFillColor(0, 0, 0); // RGB for black
      pdf.rect(0, 0, 297, 210, "F");

      // Background
      pdf.addImage(AI, "JPEG", 0, 0, 297, 210);

      // Logo
      pdf.addImage(Logo, "PNG", 78.5, 20, 140, 25); // Centered horizontally

      // 1) Teal sidebar (25 mm wide)
      pdf.setFillColor(20, 184, 166); // Tailwind’s #14b8a6
      pdf.rect(0, 0, 15, 210, "F");

      // 2) Draw vertical text bottom-to-top rotated 90 degrees
      const verticalText = "AI COURSE GENERATOR";
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(38); // roughly a Tailwind text-2xl
      pdf.setTextColor(0, 0, 0); // black letters

      const startY = 200; // Start near the bottom of A4 (210)
      const stepY = 10.5; // Spacing for each letter

      for (let i = 0; i < verticalText.length; i++) {
        const ch = verticalText[i];
        if (ch !== " ") {
          // Rotate each letter 90 degrees and place it ascending from bottom to top
          pdf.text(ch, 12, startY - i * stepY, { angle: 90 });
        }
      }

      // BADGE (top right)
      pdf.addImage(Badge, "PNG", 255, 0, 35, 70); // Outer badge

      // COMPLETED STAMP
      pdf.addImage(Completed, "PNG", 253, 18, 40, 35); // Inner stamp

      // Text OVER the Completed stamp
      pdf.setFontSize(15); // Smaller font fits better
      pdf.setTextColor(0, 0, 0); // Black color

      // Centered text on stamp (adjusted manually)
      const text = "Completed";
      const textX = 272; // X-center of the stamp
      const textY = 38; // Y-center of the stamp

      // Center-align the text (visually aligned)
      pdf.text(text, textX, textY, { align: "center", baseline: "middle" });

      // Main certificate content
      pdf.setFontSize(24);
      pdf.setTextColor("#FFFFFF");
      pdf.text("CERTIFICATE OF COMPLETION", 148.5, 70, { align: "center" });

      pdf.setFontSize(18);
      pdf.text("This is to certify that", 148.5, 88, { align: "center" });

      pdf.setFontSize(22);
      pdf.text(userName, 148.5, 106, { align: "center" });

      pdf.setDrawColor(71, 85, 105);
      pdf.setLineWidth(0.5);
      pdf.line(64.5, 110, 232.5, 110);

      pdf.setFontSize(16);
      pdf.text("has successfully completed the course on", 148.5, 125, {
        align: "center",
      });

      pdf.setFontSize(20);
      pdf.text(courseTitle, 148.5, 142, { align: "center" });

      pdf.setFontSize(16);
      pdf.text(`on ${formatDate1(end)}`, 148.5, 157, { align: "center" });

      // Footer
      pdf.setFontSize(10);
      pdf.setTextColor("#9ca3af");
      pdf.text("This is a system generated certificate", 20, 200);
      pdf.text("A product of Morpheus Code", 240, 200);

      pdf.save(`SMC_${courseTitle}_certificate.pdf`);
      toast.success("Certificate downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to download certificate.");
    }
  };
  const formatName = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(" ");
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
        className=" lg:block md:block hidden mx-auto"
        style={{
          position: "relative",
          color: "#ffffff",
          fontFamily: "Poppins, sans-serif",
          boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
          width: "100%",
          maxWidth: "900px",
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
            backgroundColor: "#14b8a6",
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
          <div className="flex flex-col justify-center items-center p-8">
            <img src={Logo} alt="Logo" className="w-1/2" />
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
            {formatName(localStorage.getItem("userName"))}
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
            className="first-letter:uppercase"
            style={{
              fontSize: "1.5rem",
              fontWeight: 600,
              marginTop: "0.5rem",
            }}
          >
            {courseTitle}
          </h2>
          <p style={{ marginTop: "0.5rem", fontSize: "1rem" }}>
            On{" "}
            {new Date(end)
              .toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
              .toUpperCase()
              .replace(/\s/g, "-")}
          </p>
        </div>

        {/* Badge */}
        <div className="absolute sm:top-1 sm:-right-40  md:-right-32 z-20">
          <img src={Badge} alt="Badge" className="md:w-[34%] sm:w-[25%]" />
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
              className="relative md:w-[50%] md:top-2 md:right-24 sm:right-[100px]   sm:w-[40%] "
              src={Completed}
              alt="image"
            />
            <p
              className="absolute md:right-48 md:top-26 sm:top-16 sm:right-48 text-[17px] "
              style={{
                transform: "rotate(-45deg)",
                color: "#000000",
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

      <div className="visible sm:invisible flex flex-col mx-3 justify-center items-center text-gray-200 ">
        <h1 className="text-2xl font-bold mb-6">Your Certificate Details</h1>
        <p className="text-base text-center mb-6">
          Congratulations! You have successfully completed the course:
        </p>
        <h2 className="text-xl font-bold mb-4">{courseTitle}</h2>
        <p className="text-base mb-6">Name: {userName}</p>
        <p className="text-base mb-6">Completion Date: {formatDate1(end)}</p>
        <p className="text-sm text-teal-400  text-center">
          Click the button below to download your certificate.
        </p>
      </div>

      {/* Download Button */}
      <div className="fixed bottom-60 left-0 right-0 flex justify-center sm:relative sm:mt-6">
        <button
          onClick={handleDownload}
          className="bg-teal-500 text-black py-2 px-6 rounded-md font-medium"
        >
          Download
        </button>
      </div>
    </>
  );
};

export default ViewCertificate;
