import React, { useEffect, useState } from "react";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import OtpInput from "otp-input-react";
import { CgSpinner } from "react-icons/cg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../../../../../Firebase.Config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";

const Phone_OTP = ({ onClose }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [ph, setPh] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);

  useEffect(() => {
    if (resendTimer === 0) return;
    const timer = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [resendTimer]);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            OnSignup();
          },
          "expired-callback": () => {},
        }
      );
    }
  }

  function OnSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;
    const formatePh = "+" + ph;

    signInWithPhoneNumber(auth, formatePh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        setResendTimer(60);
        toast.success("OTP Sent Successfully");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onVerifyOTP() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        toast.success("Phone verified!");
        setLoading(false);
        console.log("phone number is verified");

        onClose();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error("Incorrect OTP");
      });
  }

  return (
    <div className="fixed inset-0 z-50 bg-transparent bg-opacity-40 backdrop-blur-sm flex items-center justify-center">
      <Toaster toastOptions={{ duration: 4000 }} />
      <div id="recaptcha-container" className="absolute top-0"></div>

      <div className="bg-darkgray text-white w-full max-w-md p-6 rounded-xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
        >
          ✕
        </button>

        {showOTP ? (
          <div className="flex flex-col justify-center items-center space-y-3 gap-5">
            <div className=" flex flex-col gap-3">
              <p className="text-2xl text-center">Verify Phone Number</p>
              <p className="mb-3">
                We have sent a one-time password (OTP) to your registered phone
                number + {ph}
              </p>
            </div>
            <OtpInput
              value={otp}
              onChange={setOtp}
              OTPLength={6}
              otpType="number"
              autoFocus
              inputClassName="w-12 h-12 rounded-md border border-gray-300 bg-white text-black text-xl text-center outline-none"
            />
            {resendTimer > 0 ? (
              `Resend OTP in ${resendTimer}s`
            ) : (
              <button onClick={sendOTP} className="text-blue-400 underline">
                Resend OTP
              </button>
            )}
            <button
              onClick={onVerifyOTP}
              className=" rounded-lg bg-teal-600 text-white px-4 py-2 flex items-center gap-2"
            >
              {loading && <CgSpinner className="animate-spin text-xl" />}
              Verify OTP
            </button>
            <div className="text-sm text-gray-400 text-center mb-4"></div>
          </div>
        ) : (
          <div className="flex flex-col text-black space-y-5 py-5 items-center gap-5">
            <p className="text-2xl text-white    text-center">
              Update Phone Number
            </p>
            <PhoneInput
              country={"in"}
              value={ph}
              onChange={setPh}
              inputStyle={{ width: "100%" }}
            />
            <div className="flex justify-center items-center gap-3">
              <button
                className="border rounded-lg bg-white text-black px-4 py-2 flex items-center gap-2"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                onClick={OnSignup}
                className="cursor-pointer rounded-lg bg-teal-500 text-white px-4 py-2 flex items-center gap-2"
              >
                {loading && <CgSpinner className="animate-spin text-xl" />}
                Send OTP
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Phone_OTP;
