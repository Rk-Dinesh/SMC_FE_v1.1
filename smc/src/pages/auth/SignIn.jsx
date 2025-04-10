import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { AiOutlineLoading } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { PiEnvelope } from "react-icons/pi";

const SignIn = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handlePhoneChange = (value) => {
    setPhone(value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(),
  });

  const onSubmit = (data) => {
    if (!isCheckboxChecked) {
      toast.error("You must agree to the Terms and Privacy Policy");
      return;
    }

    if (!phone || phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }

    const userData = {
      ...data,
      phone,
    };

    navigate("/phone_otp", { state: { userData } });
  };

  return (
    <div className="bg-popup-gray h-screen flex justify-center items-center font-poppins text-white">
      <div className="lg:w-[430px] md:w-[430px] min-w-[300px] mx-1 bg-darkgray px-4 py-1 flex flex-col justify-center shadow-black shadow-md rounded-lg">
        <p className="text-5xl font-medium text-center py-2">
          <span className="text-teal-400">Seek</span>MyCourse
        </p>
        <form className="z-0" onSubmit={handleSubmit(onSubmit)}>
          <p className="text-center text-2xl my-2">Welcome!</p>
          <div className="flex flex-col gap-2 mx-4 my-2 font-extralight">
            {/* Phone */}
            <label htmlFor="phone">
              Phone <span className="text-red-600">*</span>
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
            <div className="flex justify-center gap-2 py-2">
            <button
                className="text-lg border border-white rounded-md px-4 py-1 text-white font-normal w-1/3"
             onClick={()=>navigate("/signup")}
              >
        
                  SignUp
                
              </button>
              <button
                className="text-lg bg-teal-400 rounded-md px-4 py-1 text-black font-normal w-1/3"
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
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default SignIn;
