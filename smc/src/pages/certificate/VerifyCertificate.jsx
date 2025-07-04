import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import AI from "../../assets/images/certificate bg.png";
import Completed from "../../assets/images/completed.png";
import { toast } from "react-toastify";
import axios from "axios";
import { API, formatDate1 } from "../../Host";

const VerifyCertificate = () => {
  const { courseId, userId } = useParams();
  const [certificate, setCertificate] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const res = await axios.get(
          `${API}/api/certificate/${courseId}/${userId}`
        );
        if (res.status === 200) {
          setCertificate(res.data.data);
        } else {
          toast.error("Certificate not found.");
        }
      } catch (error) {
        console.error("Error fetching certificate:", error);
        //toast.error("Certificate not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [courseId, userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center ">
      <div className="text-center mt-2 mb-6 max-w-xl">
        <img
          src={Logo}
          alt="Institution Logo"
          className="w-80 h-auto mx-auto mb-3 drop-shadow-md"
        />

        <p className="text-gray-400 mt-2 text-sm md:text-base">
          This is an official document verifying the successful completion of a
          course.
        </p>

        <div
          className={`mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-full text-lg font-semibold ${
            certificate.verified
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {certificate.verified ? (
            <p> Verified Certificate</p>
          ) : (
            <p>Revoked / Invalid</p>
          )}
        </div>
      </div>
      {certificate.verified ? (
        <>
          <div className="hidden md:block lg:block mx-auto relative text-white font-poppins w-full h-[540px] px-6 max-w-3xl text-center  bg-darkgray border-[14px] border-teal-400">
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
                {certificate.name || "Revoked"}
              </p>
              <div className="h-[2px] w-4/6 mt-2 bg-slate-100"></div>
              <p className="mt-4 text-lg">
                has successfully completed the course on
              </p>
              <p className="capitalize text-2xl font-semibold mt-2">
                {certificate.courseName || "Course Title"}
              </p>
              <p className="mt-2 text-base">
                On {formatDate1(certificate.issueDate) || "N/A"}
              </p>
            </div>

            <div className=" absolute bottom-0 right-0  flex justify-evenly items-end  text-sm text-gray-200">
              <span className="mb-6">
                This is a system generated certificate
              </span>
              <img src={Completed} alt="image" className="w-1/5" />

              <span className="mb-6">A product of Morpheus Code</span>
            </div>
          </div>
          <div className="visible sm:invisible flex flex-col mx-3 justify-center items-center text-gray-200">
            <h1 className="text-2xl font-bold mb-6">
              Your Certificate Details
            </h1>
            <p className="text-base text-center mb-6">
              Congratulations! You have successfully completed the course:
            </p>
            <h2 className="text-xl font-bold mb-4">
              {certificate.courseName || "Course Title"}
            </h2>
            <p className="text-base mb-6">
              Name: {certificate.name || "Revoked"}
            </p>
            <p className="text-base mb-6">
              Completion Date: {formatDate1(certificate.issueDate) || "N/A"}
            </p>
            <p
              className={`font-semibold ${
                certificate.verified ? "text-green-400" : "text-red-400"
              }`}
            >
              {certificate.verified ? "✅ Verified" : "❌ Revoked / Invalid"}
            </p>
          </div>{" "}
        </>
      ) : (
        <div className="flex flex-col justify-center items-center  text-white">
          <h1 className="text-2xl font-bold mb-4">Certificate Not Found</h1>
          <p>
            The certificate you're looking for does not exist or has been
            revoked.
          </p>
        </div>
      )}
    </div>
  );
};

export default VerifyCertificate;
