import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import { AiOutlineLoading } from "react-icons/ai";
import axios from "axios";
import { API } from "../../Host";
import Logo from "../../assets/images/logo.png";
import { auth } from "../../Firebase.Config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const SignIn = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        delete window.recaptchaVerifier;
      }
    };
  }, []);

  const handlePhoneChange = (value, data) => {
    setPhone(value);
    setCountryCode(data.dialCode);
  };

  const redirectSignUp = () => {
    navigate("/signup");
  };

  const setUpRecaptcha = () => {
    if (window.recaptchaVerifier) {
      return;
    }
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          console.log("reCAPTCHA verified");
        },
      }
    );
  };

  const handleSendOtp = async (e) => {
    setProcessing(true);
    e.preventDefault();
    const localPhone = phone.slice(countryCode.length);
    const formData = {
      phone: localPhone,
    };

    const userData = {
      phone: localPhone,
      countryCode: countryCode,
    };

    try {
      const res = await axios.post(`${API}/api/usersignin`, formData);
      if (!res.data.success) {
        toast.error(res.data.message || "Phone number not found.");
        return;
      }
      localStorage.setItem("user", res.data.userId._id);
      localStorage.setItem("type", res.data.userId.type);
      localStorage.setItem("userName", res.data.userName);
      localStorage.setItem("totalCourse", res.data.totalCourse);
     

      setUpRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const formattedPhone = phone.startsWith("+") ? phone : "+" + phone;

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        appVerifier
      );
      window.confirmationResult = confirmationResult;

      toast.success("OTP sent successfully!");
      setProcessing(false);
      navigate("/signin_otp", { state: { userData} });
    } catch (error) {
      console.error("Invalid sign-in process", error);

      if (error.code === "auth/invalid-phone-number") {
        toast.error(
          "Invalid phone number format. Please enter a valid number."
        );
        setProcessing(false);
      } else if (error.code === "auth/quota-exceeded") {
        toast.error("SMS quota exceeded. Try again later.");
        setProcessing(false);
      } else if (error.code === "auth/billing-not-enabled") {
        toast.error(
          "Billing is not enabled in your Firebase project. Please enable it."
        );
        setProcessing(false);
      } else {
        setProcessing(false);
        toast.error("Invalid sign-in process");
      }
    }
  };

  return (
    <div className="bg-popup-gray h-screen flex justify-center items-center font-poppins text-white">
      <div className="lg:w-[430px] md:w-[430px] min-w-[300px] h-[550px] mx-1  bg-darkgray px-4 py-1 flex flex-col shadow-black shadow-md rounded-lg">
       
        <form className="z-0" onSubmit={handleSendOtp}>
          <img src={Logo} alt="Logo" className="w-full mt-8" />
          <p className="text-center text-3xl my-6">Welcome !</p>
          <div className="flex flex-col gap-3 mx-2 my-4 ">
            <label htmlFor="phone" className="mx-6 mb-2 mt-3">
              Phone Number <span className="text-red-600">*</span>
            </label>
            <div className="lg:w-5/6 md:w-5/6 w-5/6 mx-6">
              <PhoneInput
                country={"in"}
                value={phone}
                onChange={handlePhoneChange}
                className="w-full py-1  px-1 text-black rounded-md shadow-md outline-none bg-white  "
                inputStyle={{
                  border: "none",
                  // textAlign: "center",
                  fontSize: "16px",
                  marginLeft: "-4px",
                  width:'250px'
                }}
                placeholder="9999999999"
                buttonStyle={{
                  // background: "linear-gradient(to right, #3D03FA, #A71CD2)",
                  width: "30px",
                  borderRadius: "8px",
                  marginLeft: "10px",
                  border: "none",
                  background: "white",
                }}
              />
            </div>

            <div className=" cursor-pointer flex justify-center gap-6 py-6 my-8">
              <p
                className="text-lg text-center border-2 border-white rounded-lg px-4 py-1 text-white font-normal w-1/3"
                onClick={() => navigate("/signup")}
              >
                SignUp
              </p>
              <button
                className=" cursor-pointer text-lg bg-teal-400 rounded-lg px-4 py-1 text-black font-normal w-1/3"
                type="submit"
              >
                {processing ? (
                  <span className="flex justify-center gap-3">
                    <AiOutlineLoading className="h-6 w-6 animate-spin" />
                    <p>login...</p>
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </div>
         
        </form>
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default SignIn;
