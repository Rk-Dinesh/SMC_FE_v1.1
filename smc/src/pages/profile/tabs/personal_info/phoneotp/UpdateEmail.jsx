import React, { useEffect, useState } from "react";
import Modal from "../../../../../components/Modal";
import { API } from "../../../../../Host";
import axios from "axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";

const emailSchema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
});

const otpSchema = yup.object().shape({
  otp: yup
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .required("OTP is required"),
});

const UpdateEmail = ({ user, onClose, onSuccess }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [step, setStep] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [newEmail, setNewEmail] = useState(null);

  const {
    register: emailRegister,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors },
  } = useForm({
    resolver: yupResolver(emailSchema),
  });

  const {
    handleSubmit: handleOtpSubmit,
    formState: { errors: otpErrors },
  } = useForm({
    resolver: yupResolver(otpSchema),
  });

  const CloseEmailModal = () => {
    setStep(1);
    setNewEmail(null);
    setOtp("");
    onClose();
  };

  const handleSendOtp = async (data) => {
    setNewEmail(data.email);
    const formData = {
      email: data.email,
      fname: user.fname,
      lname: user.lname,
    };

    try {
      setProcessing(true);
      const response = await axios.post(`${API}/api/otp`, formData);
      if (response.status === 200) {
        toast.success("OTP sent successfully!");
        setStep(2);
        setTimer(30);
        setIsResendDisabled(true);
      }
    } catch (error) {
      if (error.response?.data?.error === "EMAIL_ALREADY_EXISTS") {
        toast.error("This email is already associated with another account.");
        CloseEmailModal();
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setProcessing(false);
    }
  };

  const resendOtp = async () => {
    try {
      const res = await axios.post(`${API}/api/otp`, {
        email: newEmail,
        fname: user.fname,
        lname: user.lname,
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

  const handleValidateOtp = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setProcessing(true);

      const validateResponse = await axios.post(`${API}/api/validate-otp`, {
        email: newEmail,
        otp,
      });

      if (validateResponse.status === 200 && validateResponse.data.success) {
        const phone = user.phone

        const updateResponse = await axios.post(
          `${API}/api/emailupdate?phone=${phone}`,
          { email: newEmail }
        );

        if (updateResponse.status === 200) {
          localStorage.setItem("email", newEmail);
          toast.success("Email updated successfully!");
          if (onSuccess) onSuccess(); // Refresh user data
          CloseEmailModal();
          navigate("/profile");
        } else {
          toast.error("Failed to update email.");
        }
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error validating OTP:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    if (step === 2) {
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
    }
  }, [step]);

  return (
    <Modal>
      <div className="w-[480px] min-h-[280px]  text-white font-poppins mx-auto  p-6 relative">
        <p
          className="text-end text-2xl -mx-6 -mt-6   font-medium cursor-pointer"
          onClick={onClose}
        >
          ×
        </p>

        {step === 1 && (
          <>
            <p className="text-center text-xl font-semibold my-4">Update Email</p>
            <p className="text-center text-sm text-gray-300 mx-4 my-6">
              Enter your new email address. A verification OTP will be sent to this email.
            </p>
            <form onSubmit={handleEmailSubmit(handleSendOtp)}>
              <div className="mx-6">
                <label htmlFor="email" className="text-sm mb-1 block">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="johndoe@gmail.com"
                  className={`w-full bg-transparent border-b border-gray-500 text-white outline-none py-2 transition-all duration-200 focus:border-white ${
                    emailErrors.email ? "border-red-500" : ""
                  }`}
                  {...emailRegister("email")}
                />
                {emailErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {emailErrors.email.message}
                  </p>
                )}
              </div>
              <div className="flex justify-center gap-4 mt-10">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-white text-black px-6 py-2 rounded-md hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`bg-[#00E4C7] text-black px-6 py-2 rounded-md hover:brightness-110 transition-all ${
                    processing ? "opacity-50 pointer-events-none" : ""
                  }`}
                >
                  {processing ? "Sending..." : "Next"}
                </button>
              </div>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="text-2xl font-medium my-4 text-center">Verify Email</h1>
            <p className="text-base font-extralight text-gray-100 text-center mb-6">
              We have sent a one-time password (OTP) to your new email {newEmail}
            </p>
            <p className="py-2 text-center my-2">Enter OTP</p>
           <div className="flex w-full justify-center items-center">
           <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => <input {...props} />}
              inputStyle={{
                border: "2px solid White",
                width: "35px",
                height: "35px",
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
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button
                className="bg-teal-400 text-black px-8 py-1.5 rounded-md text-lg"
                onClick={handleValidateOtp}
                disabled={processing}
              >
                {processing ? "Verifying..." : "Next"}
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default UpdateEmail;
