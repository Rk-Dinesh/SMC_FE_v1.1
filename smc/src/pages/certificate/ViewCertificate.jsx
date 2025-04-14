import React, { useRef } from "react";
import {toPng}from 'html-to-image';
import { jsPDF } from "jspdf";

import Logo from "../../assets/images/logo.png";
import AI from "../../assets/images/certificate bg.png";
import Badge from "../../assets/images/complete.png";
import Completed from "../../assets/images/completed.png";
import { useLocation } from "react-router-dom";
import { formatDate1 } from "../../Host";

const ViewCertificate = () => {
  const certificateRef = useRef(null);
  const { state } = useLocation();
  const { courseTitle, end } = state || {};

  const handleDownload = () => {
    const node = certificateRef.current;
    const A4_WIDTH = 1122;
    const A4_HEIGHT = 793;
  
    toPng(node, {
      cacheBust: true,
      width: A4_WIDTH,
      height: node.offsetHeight,
      style: {
        width: `${A4_WIDTH}px`,
        transform: "scale(1)",
        transformOrigin: "top left",
      },
    })
      .then((dataUrl) => {
        const pdf = new jsPDF("landscape", "pt", [A4_WIDTH, A4_HEIGHT]);
  
        const img = new Image();
        img.onload = () => {
          const imgHeight = (img.height * A4_WIDTH) / img.width;
          const y = (A4_HEIGHT - imgHeight) / 2;
          pdf.addImage(dataUrl, "PNG", 0, y, A4_WIDTH, imgHeight);
          pdf.save("certificate.pdf");
        };
        img.src = dataUrl;
      })
      .catch((err) => {
        console.error("Error generating PDF:", err);
        alert("Failed to generate PDF");
      });
  };

  return (
    <>
      <div className="text-white  border-b pb-2 mb-8  border-white">
        <p>My Certificates</p>
      </div>
      <div
        ref={certificateRef}
        className="relative w-full max-w-4xl mx-auto  p-12 text-white font-poppins bg-black overflow-hidden shadow-2xl"
      >
        {/* Background Image */}
        <div className="absolute right-0 top-0 h-full w-1/2 z-0">
          <img
            src={AI}
            alt="AI background"
            className="w-full h-full object-contain object-right"
          />
        </div>

        {/* Left Banner */}
        <div className="absolute left-0 top-0 h-full w-16 bg-teal-400 z-10 flex items-center justify-center">
          <span className="transform -rotate-90 text-black font-extrabold text-4xl tracking-wider whitespace-nowrap">
            AI COURSE GENERATOR
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10 px-10  pb-6 flex flex-col justify-center items-center">
          <div className="pb-8">
            <img src={Logo} alt="Logo" />
            <h3 className="text-2xl font-bold mt-2">
              CERTIFICATE OF COMPLETION
            </h3>
          </div>
          <p className="mt-2 text-lg">This is to certify that</p>
          <h1 className="text-3xl font-bold mt-3">{localStorage.getItem("userName")}</h1>
          <p className="mt-4 text-lg">
            has successfully completed the course on
          </p>
          <h2 className="text-2xl font-semibold mt-2">{courseTitle}</h2>
          <p className="mt-2 text-base">On {formatDate1(end)}</p>
        </div>

        {/* Completed Badge on Left */}
        <div className="absolute top-1 -right-36 z-20">
          <img src={Badge} alt="Badge" className="w-2/6" />
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={Completed}
              alt="image"
              className="relative w-6/12 top-2 right-24"
            />
            <p className="absolute right-52 -left-1.5 top-28 text-black text-xl font-extrabold -rotate-45">
              Completed
            </p>
          </div>
        </div>

        {/* Footer pinned to bottom inside the card */}
        <div className="absolute bottom-4 left-20 right-6 z-10 flex justify-between text-xs text-gray-400">
          <span>This is a system generated certificate</span>
          <span>A product of Morpheus Code</span>
        </div>
      </div>

      {/* Download Button */}
      <div className="flex justify-center my-6">
        <button
          onClick={handleDownload}
          className="bg-teal-400 text-black  px-6 py-2 rounded-md hover:font-semibold"
        >
          Download
        </button>
      </div>
    </>
  );
};

export default ViewCertificate;
