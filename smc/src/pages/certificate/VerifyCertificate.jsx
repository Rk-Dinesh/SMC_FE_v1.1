import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { toast } from "react-toastify";
import axios from "axios";
import { API } from "../../Host";

const VerifyCertificate = () => {
  const { courseId, userId } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const res = await axios.get(`${API}/api/certificate/${courseId}/${userId}`);
        if (res.status === 200 ) {
          setCertificate(res.data.data);
        } else {
          toast.error("Certificate not found.");
        }
      } catch (error) {
        console.error("Error fetching certificate:", error);
        toast.error("Failed to load certificate.");
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

  if (!certificate) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-white">
        <h1 className="text-2xl font-bold mb-4">Certificate Not Found</h1>
        <p>The certificate you're looking for does not exist or has been revoked.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <div className="bg-gray-800 border border-teal-500 shadow-lg rounded-lg p-8 max-w-3xl w-full text-center">
        <h1 className="text-3xl font-extrabold mb-6">Certificate Verification</h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold">Course Name</h2>
          <p className="text-gray-300">{certificate.courseName}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold">Student Name</h2>
          <p className="text-gray-300">{certificate.name || "N/A"}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold">Issue Date</h2>
          <p className="text-gray-300">{new Date(certificate.issueDate).toDateString()}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold">Status</h2>
          <p className={`font-semibold ${certificate.verified ? "text-green-400" : "text-red-400"}`}>
            {certificate.verified ? "✅ Verified" : "❌ Revoked / Invalid"}
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="mt-4 bg-teal-500 hover:bg-teal-600 text-black font-medium py-2 px-6 rounded"
        >
          Print Certificate
        </button>
      </div>
    </div>
  );
};

export default VerifyCertificate;