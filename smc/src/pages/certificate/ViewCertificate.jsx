import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import Logo from "../../assets/images/logo.png";
import AI from "../../assets/images/certificate bg.png";
import Completed from "../../assets/images/completed.png";
import { useLocation } from "react-router-dom";
import { API, formatDate1 } from "../../Host";
import { toast } from "react-toastify";
import axios from "axios";

const ViewCertificate = () => {
  const certificateRef = useRef(null);
  const [certificateDetails, setCertificateDetails] = useState({});
  const { state } = useLocation();
  const userName = localStorage.getItem("userName");
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");
  const { courseId, userIds } = state || {};

  console.log("Course ID:", courseId);
  console.log("User IDs:", userIds);
  

  useEffect(() => {
    if (courseId && userIds) {
      fetchCertificateDetails();
    } else {
      toast.error("Invalid course or user ID.");
    }
  }, [courseId, userIds]);

  useEffect(() => {
    const generateQRCode = async () => {
      if (courseId && userIds) {
        const urlToEncode = `${window.location.origin}/verify-certificate/${courseId}/${userIds}`;
        try {
          const dataUrl = await QRCode.toDataURL(urlToEncode);
          setQrCodeDataUrl(dataUrl);
        } catch (err) {
          console.error("Error generating QR code:", err);
        }
      }
    };

    generateQRCode();
  }, [courseId, userIds]);

  const fetchCertificateDetails = async () => {
    try {
      const response = await axios.get(
        `${API}/api/certificate/${courseId}/${userIds}`
      );
      console.log("Certificate Details:", response.data);
      setCertificateDetails(response.data.data);
    } catch (error) {
      console.error("Error fetching certificate details:", error);
      toast.error("Failed to fetch certificate details.");
    }
  };

  const handleDownload = async () => {
    try {
      const pdf = new jsPDF("landscape", "mm", "a4");
      const pageW = 297;
      const pageH = 210;

      const border = 4;
      pdf.setFillColor(20, 184, 166); // #14b8a6 (Tailwind teal-400)
      pdf.rect(0, 0, pageW, pageH, "F");

      // 2️⃣ Inner dark-gray content area
      const ix = border;
      const iy = border;
      const iw = pageW - 2 * border;
      const ih = pageH - 2 * border;
      pdf.setFillColor("#1D1D1D"); // Tailwind bg-darkgray
      pdf.rect(ix, iy, iw, ih, "F");

      // 3️⃣ Right faded background image
      pdf.addImage(AI, "JPEG", ix + iw / 2, iy, iw / 2, ih);

      // === 4️⃣ Compute dynamic ribbon height to fit text + padding ===
      const verticalText = "AI COURSE GENERATOR";
      const chars = verticalText.replace(/\s/g, "").length;
      const stepY = 9; // spacing between letters
      const textBlockHeight = chars * stepY;
      const paddingY = 8; // 10 mm top/bottom padding
      const ribbonH = textBlockHeight + 2 * paddingY;
      const ribbonW = 20; // ribbon width
      const ribbonX = ix;
      const ribbonY = iy + (ih - ribbonH) / 2; // center ribbon vertically

      pdf.setFillColor(255, 255, 255);
      // Ribbon dimensions
      const radius = 16;

      // Start path
      pdf.setFillColor(255, 255, 255);
      pdf.setDrawColor(255, 255, 255);
      pdf.setLineJoin("round");

      // Start path for right side ribbon with rounded corners
      pdf.moveTo(ribbonX + ribbonW - radius, ribbonY); // Starting just before the top-right rounded corner

      // Top-right corner curve
      pdf.lineTo(ribbonX, ribbonY); // top edge
      pdf.lineTo(ribbonX, ribbonY + ribbonH); // left edge
      pdf.lineTo(ribbonX + ribbonW - radius, ribbonY + ribbonH); // bottom edge before curve

      // Bottom-right curve
      pdf.curveTo(
        ribbonX + ribbonW,
        ribbonY + ribbonH,
        ribbonX + ribbonW,
        ribbonY + ribbonH,
        ribbonX + ribbonW,
        ribbonY + ribbonH - radius
      );

      // Right vertical
      pdf.lineTo(ribbonX + ribbonW, ribbonY + radius);

      // Top-right curve
      pdf.curveTo(
        ribbonX + ribbonW,
        ribbonY,
        ribbonX + ribbonW,
        ribbonY,
        ribbonX + ribbonW - radius,
        ribbonY
      );

      // Close and fill
      pdf.close();
      pdf.fill();

      const textX = ribbonX + ribbonW / 2 + 4; // center of ribbon
      let startY = ribbonY + ribbonH - paddingY - stepY / 2; // start from bottom inside ribbon

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(32);
      pdf.setTextColor(0, 0, 0);

      let drawn = 0;
      for (let i = 0; i < verticalText.length; i++) {
        const ch = verticalText[i];
        if (ch !== " ") {
          pdf.text(ch, textX, startY - drawn * stepY, {
            angle: 90,
          });
          drawn++;
        }
      }

      // 6️⃣ Logo (centered inside the content area)
      pdf.addImage(Logo, "PNG", ix + 30, iy + 10, iw - 60, 20);

      // 7️⃣ Certificate content (centered text)
      const cx = ix + iw / 2;
      pdf.setTextColor(255, 255, 255);
      pdf
        .setFontSize(30)
        .setFont("helvetica", "bold")
        .text("CERTIFICATE OF COMPLETION", cx, iy + 50, { align: "center" });
      pdf
        .setFontSize(16)
        .text("This is to certify that", cx, iy + 65, { align: "center" });
      pdf
        .setFontSize(22)
        .text(formatName(userName), cx, iy + 82, { align: "center" });

      // Underline
      pdf
        .setDrawColor(226, 232, 240)
        .setLineWidth(1)
        .line(cx - 74, iy + 86, cx + 74, iy + 86);

      pdf
        .setFontSize(16)
        .text("has successfully completed the course on", cx, iy + 102, {
          align: "center",
        });
      pdf
        .setFontSize(20)
        .text(formatName(certificateDetails.courseName), cx, iy + 118, {
          align: "center",
        });
      pdf
        .setFontSize(14)
        .text(`On ${formatDate1(certificateDetails.issueDate)}`, cx, iy + 132, {
          align: "center",
        });

      // Add QR Code to PDF (bottom-left)
      if (qrCodeDataUrl) {
        const qrWidth = 40;
        const qrHeight = 40;
        const qrX = ix + 35; // bottom-left margin X
        const qrY = pageH - qrHeight - 25; // bottom-left margin Y

        pdf.addImage(qrCodeDataUrl, "PNG", qrX, qrY, qrWidth, qrHeight);
      }

      // 8️⃣ Footer text
      // 8️⃣ Footer text
      pdf.setFontSize(12).setTextColor(255, 255, 255);
      pdf.text("This is a system generated certificate", ix + 6, pageH - 10);
      pdf.text("A product of Morpheus Code", pageW - 80, pageH - 10);

      // 9️⃣ "Completed" badge (centered at the bottom)
      const badgeWidth = 60;
      const badgeHeight = 50;
      const badgeX = (pageW - badgeWidth) / 2;
      const badgeY = pageH - badgeHeight - 10; // 10mm padding from bottom

      pdf.addImage(Completed, "PNG", badgeX, badgeY, badgeWidth, badgeHeight);
      pdf.save(`SMC_${certificateDetails.courseName}_certificate.pdf`);
      toast.success("Certificate downloaded successfully!");
    } catch (err) {
      console.error(err);
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
      <div className="text-white border-b border-white pb-2 mb-8">
        <p>My Certificates</p>
      </div>

      <div
        ref={certificateRef}
        className="hidden md:block lg:block mx-auto relative text-white font-poppins w-full h-[540px] px-6 max-w-3xl text-center  bg-darkgray border-[14px] border-teal-400"
      >
        <div className="absolute top-0 -right-4 h-full w-1/2 z-0 opacity-40">
          <img src={AI} alt="AI background" className="w-full h-full" />
        </div>

        <div className="absolute top-14 left-0  h-96 w-16 bg-white z-10 flex items-center justify-center rounded-r-3xl">
          <span className="transform -rotate-90 text-black font-extrabold text-3xl tracking-wide whitespace-nowrap ">
            AI COURSE GENERATOR
          </span>
        </div>

        <div className="relative z-10 px-10 pb-6 flex flex-col items-center justify-center w-full">
          <div className="flex flex-col justify-center items-center p-2 mx-8">
            <img src={Logo} alt="Logo" className="w-2/3" />
            <p className="lg:text-3xl md:text-xl font-extrabold mt-2 whitespace-nowrap ">
              CERTIFICATE OF COMPLETION
            </p>
          </div>
          <p className="mt-2 text-lg">This is to certify that</p>
          <p className="text-3xl font-bold mt-3">
            {certificateDetails.userName || userName}
          </p>
          <div className="h-[2px] w-4/6 mt-2 bg-slate-100"></div>
          <p className="mt-4 text-lg">
            has successfully completed the course on
          </p>
          <p className="capitalize text-2xl font-semibold mt-2">
            {certificateDetails.courseName || "Course Title"}
          </p>
          <p className="mt-2 text-base">
            On {formatDate1(certificateDetails.issueDate)}
          </p>
        </div>

        <div className="absolute bottom-16 left-24 flex justify-center items-center  rounded-full shadow-lg">
          {qrCodeDataUrl ? (
            <img
              src={qrCodeDataUrl}
              alt="Certificate QR Code"
              width="100"
              height="100"
            />
          ) : (
            <p>Loading QR...</p>
          )}
        </div>

        <div className=" absolute bottom-0 right-0  flex justify-evenly items-end  text-sm text-gray-200">
          <span className="mb-6">This is a system generated certificate</span>
          <img src={Completed} alt="image" className="w-1/5" />

          <span className="mb-6">A product of Morpheus Code</span>
        </div>
      </div>

      <div className="visible sm:invisible flex flex-col mx-3 justify-center items-center text-gray-200">
        <h1 className="text-2xl font-bold mb-6">Your Certificate Details</h1>
        <p className="text-base text-center mb-6">
          Congratulations! You have successfully completed the course:
        </p>
        <h2 className="text-xl font-bold mb-4">
          {certificateDetails.courseName || "Course Title"}
        </h2>
        <p className="text-base mb-6">
          Name: {certificateDetails.userName || userName}
        </p>
        <p className="text-base mb-6">
          Completion Date: {formatDate1(certificateDetails.issueDate)}
        </p>
         <div className="absolute bottom-16 left-24 flex justify-center items-center  rounded-full shadow-lg">
          {qrCodeDataUrl ? (
            <img
              src={qrCodeDataUrl}
              alt="Certificate QR Code"
              width="100"
              height="100"
            />
          ) : (
            <p>Loading QR...</p>
          )}
        </div>
        <p className="text-sm text-teal-400 text-center">
          Click the button below to download your certificate.
        </p>
      </div>

      <div className="fixed bottom-60 left-0 right-0 flex justify-center sm:relative sm:mt-6">
        <p
          onClick={handleDownload}
          className="bg-teal-500 text-black py-2 px-6 rounded-md font-medium"
        >
          Download
        </p>
      </div>
    </>
  );
};

export default ViewCertificate;
