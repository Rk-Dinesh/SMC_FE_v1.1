import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Firebase.Config"; // Ensure this is correct
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast } from "react-toastify";
import Logo from "../../assets/images/logo.png";

const SignInOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location?.state?.userData;
  const phoneNumber = `+${userData.countryCode}${userData?.phone}`;

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [confirmationResult, setConfirmationResult] = useState(null);

  const sendOtp = async () => {
    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "invisible",
          }
        );
      }

      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );
      setConfirmationResult(confirmation);
      toast.success("OTP sent successfully!");
      setIsResendDisabled(true);
      setTimer(30);
    } catch (error) {
      console.error("OTP send failed:", error);
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  useEffect(() => {
    sendOtp();

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

  const verifyOtp = async () => {
    if (!otp || otp.length < 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      const result = await confirmationResult.confirm(otp);
      toast.success("Phone OTP verified successfully!");
      setTimeout(() => {
        navigate("/dashboard");
        toast.success("Login Successfully!");
      }, 1200);
    } catch (error) {
      console.error("OTP verification failed:", error.message);
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
            Next
          </button>
        </div>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default SignInOtp;
