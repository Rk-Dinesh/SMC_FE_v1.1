import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import { AiOutlineLoading } from "react-icons/ai";
import axios from "axios";
import { API } from "../../Host";
import Logo from "../../assets/images/logo.png";

const SignIn = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [processing, setProcessing] = useState(false);

  const handlePhoneChange = (value,data) => {
    setPhone(value);
    setCountryCode(data.dialCode);
  };

  const handleLogin = async () => {
    if (!phone || phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    const localPhone = phone.slice(countryCode.length);
    const userData = {
      phone: localPhone,
      countryCode: countryCode,
    };
    try {
      setProcessing(true);
      const res = await axios.post(`${API}/api/usersignin`, { phone: localPhone });
      
      
      if (!res.data.success) {
        toast.error(res.data.message || "Phone number not found.");
        return;
      }
    
      localStorage.setItem("user", res.data.userId._id);
      
    
      navigate("/signin_otp", { state: { userData} });
    } catch (error) {
      console.error("Error:", error);
      toast.error("User not found!");
    } finally {
      setProcessing(false);
    }
    
  };

  return (
    <div className="bg-popup-gray h-screen flex justify-center items-center font-poppins text-white">
      <div className="lg:w-[430px] md:w-[430px] min-w-[300px] h-[550px] mx-1 bg-darkgray px-4 py-1 flex flex-col shadow-black shadow-md rounded-lg">
        <img src={Logo} alt="Logo Image" />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <p className="text-center text-2xl my-4">Welcome!</p>
          <div className="flex flex-col gap-2 mx-4 my-6 py-6 font-extralight">
            <label htmlFor="phone">
              Phone Number <span className="text-red-600">*</span>
            </label>
            <PhoneInput
              country={"in"}
              value={phone}
              onChange={handlePhoneChange}
              className="w-full py-1 text-black font-poppins font-extralight rounded-xl shadow-md outline-none bg-white"
              inputStyle={{
                border: "none",
                fontSize: "16px",
                width: "250px",
                borderRadius: "24px",
              }}
              placeholder="9999999999"
              buttonStyle={{
                width: "30px",
                borderRadius: "8px",
                border: "none",
                background: "white",
              }}
            />
            <div className="flex justify-center gap-6 py-6 my-8">
              <button
                className="text-lg border-2 border-white rounded-lg px-4 py-1 text-white font-normal w-1/3"
                onClick={() => navigate("/signup")}
              >
                SignUp
              </button>
              <button
                className="text-lg bg-teal-400 rounded-lg px-4 py-1 text-black font-normal w-1/3"
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
      </div>
      <p className="absolute bottom-2 right-0 px-2 text-base font-light">
        Made With <span className="text-red-600 px-1">&#x2764;</span>
        <span className="text-white pl-1">Morpheus Code</span>
      </p>
    </div>
  );
};

export default SignIn;
