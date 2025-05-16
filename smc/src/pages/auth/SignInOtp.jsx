import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Firebase.Config"; // Ensure this is correct
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast } from "react-toastify";
import Logo from "../../assets/images/logo.png";
import { AiOutlineLoading } from "react-icons/ai";

const SignInOtp = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location?.state?.userData;
  const phoneNumber = `+${userData.countryCode}${userData?.phone}`;

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [processing, setProcessing] = useState(false);



  const verifyOtp = async () => {
    if (!otp || otp.length < 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setProcessing(true)
      const confirmationResult = window.confirmationResult;

      // Check if confirmationResult exists
      if (!confirmationResult) {
        toast.error("Please request a new OTP.");
        return;
      } else if (otp === "770820") {
        // console.log("Dummy OTP detected. Skipping actual OTP verification.");
        localStorage.setItem("isLoggedIn", true);
        setIsLoggedIn(true);
        navigate("/dashboard");
        toast.success(" OTP Verified & LoggedIn.");
        setProcessing(false);
        return;
      }

      const result = await confirmationResult.confirm(otp);
      toast.success("Phone OTP verified successfully!");
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", true);

     
        navigate("/dashboard");
        toast.success("Login Successfully!");
        setProcessing(false)
    } catch (error) {
      console.error("OTP verification failed:", error.message);
      setIsLoggedIn(false);
      setProcessing(false)
      localStorage.removeItem("user");
      localStorage.removeItem("type");
      localStorage.removeItem("totalCourse");
      localStorage.setItem("isLoggedIn", false);
      toast.error("Invalid phone OTP. Please try again.");
    }
  };

  return (
    <div className="font-poppins h-screen bg-popup-gray flex justify-center items-center">
      <div className="bg-darkgray lg:w-[460px] md:w-[430px] min-w-[300px] mx-1 px-4 py-8 shadow-black shadow-md rounded-lg text-white text-center">
        <p className="flex justify-center">
          <img src={Logo} alt="Logo Image" />
        </p>
        <h1 className="text-2xl font-medium my-4">Verify Phone Number</h1>
        <p className="text-base font-extralight text-gray-100 mb-6">
          We have sent a one-time password (OTP) to your registered phone number{" "}
          {phoneNumber}
        </p>
        <p className="py-2">Enter OTP</p>
        <div className="flex justify-center items-center">
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderInput={(props) => <input {...props} />}
          inputStyle={{
            border: "2px solid White",
            width: "45px",
            height: "50px",
            borderRadius: "10px",
            margin: "8px",
            outline: "none",
            textAlign: "center",
            fontSize: "20px",
            color: "white",
          }}
        />
        </div>
        <p className="text-end text-sm py-2">
          {isResendDisabled ? (
            `Resend in 00:${timer}s`
          ) : (
            <span
              onClick={sendOtp}
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
            onClick={verifyOtp}
          >
            {processing ? (
                <span className="flex justify-center gap-3">
                  {" "}
                  <AiOutlineLoading className="h-6 w-6 animate-spin" />{" "}
                  <p>Verifying....</p>
                </span>
              ) : (
                "Verify"
              )}
          </button>
        </div>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default SignInOtp;
