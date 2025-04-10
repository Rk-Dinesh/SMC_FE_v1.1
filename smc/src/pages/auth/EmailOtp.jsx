import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { API } from "../../Host";

const EmailOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location?.state?.userData;
  const EMAILID = userData?.email;
  const referralCode = userData.referralCode;

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const verifyEmailOtp = async () => {
    if (!otp || otp.length < 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      // Step 1: Verify email OTP
      
      const verifyRes = await axios.post(`${API}/api/validate-otp`, {
        email: EMAILID,
        otp,
      });

      if (!verifyRes.data.success) {
        toast.error("Invalid OTP. Please try again.");
        return;
      }

      toast.success("Email verified successfully!");

      // Step 2: Register user
      const apiEndpoint = referralCode
      ? `${API}/api/usersignup?ref=${referralCode}`
      : `${API}/api/usersignup`;
      const response = await axios.post(apiEndpoint, userData);

      if (response.status===200) {
        toast.success("Account created successfully!");
        navigate("/dashboard"); // navigate to success page
      } else {
        toast.error("Failed to register user. Try again later.");
      }
    } catch (error) {
      console.error("Error verifying email OTP:", error.message);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const resendOtp = async () => {
    try {
      const res = await axios.post(`${API}/api/otp`, {
        email: EMAILID,
      });

      if (res.data.success) {
        toast.success("OTP resent successfully!");
        setIsResendDisabled(true);
        setTimer(30);
      } else {
        toast.error("Failed to resend OTP.");
      }
    } catch (err) {
      toast.error("Error resending OTP.");
    }
  };

  return (
    <div className="font-poppins h-screen bg-popup-gray flex justify-center items-center">
      <div className="bg-darkgray lg:w-[460px] md:w-[430px] min-w-[300px] mx-1 px-4 py-8 shadow-black shadow-md rounded-lg text-white text-center">
        <p className="text-5xl font-medium text-center py-4">
          <span className="text-teal-400">Seek</span>MyCourse
        </p>
        <h1 className="text-2xl font-medium my-4">Verify Email</h1>
        <p className="text-base font-extralight text-gray-100 mb-6">
          We have sent a one-time password (OTP) to your registered email{" "}
          {EMAILID}
        </p>
        <p className="py-2">Enter OTP</p>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderInput={(props) => <input {...props} />}
          inputStyle={{
            border: "2px solid White",
            width: "55px",
            height: "65px",
            borderRadius: "10px",
            margin: "8px",
            outline: "none",
            textAlign: "center",
            fontSize: "20px",
            color: "white",
          }}
        />
        <p className="text-end text-sm py-2">
          {isResendDisabled ? (
            `Resend in 00:${timer}s`
          ) : (
            <span
              onClick={resendOtp}
              className="text-blue-400 cursor-pointer hover:underline"
            >
              Resend OTP
            </span>
          )}
        </p>
        <div className="flex justify-center items-center gap-2 my-6 py-6">
          <button
            className="bg-white text-black px-8 py-1.5 rounded-md text-lg"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <button
            className="bg-teal-400 text-black px-8 py-1.5 rounded-md text-lg"
            onClick={verifyEmailOtp}
          >
            Next
          </button>
        </div>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default EmailOtp;
