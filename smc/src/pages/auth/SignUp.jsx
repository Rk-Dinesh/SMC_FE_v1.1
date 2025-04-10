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

const UserSchema = yup.object().shape({
  fname: yup.string().required("First name is required"),
  lname: yup.string().required("Last name is required"),
  email: yup.string().email().required("Email is required"),
  dob: yup.string().required("Date of birth is required"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [processing, setProcessing] = useState(false);

  const getReferralCode = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("ref");
  };

  const handlePhoneChange = (value) => {
    setPhone(value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UserSchema),
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
      referralCode: getReferralCode(),
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
          <p className="text-center text-2xl my-2">Signup!</p>
          <div className="flex flex-col gap-2 mx-4 my-2 font-extralight">
            {/* First Name */}
            <label htmlFor="fname">
              First Name<span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <FaRegUser className="absolute left-2 top-1/2 transform -translate-y-1/2 text-black size-6 opacity-80" />
              <input
                type="text"
                placeholder="e.g John"
                {...register("fname")}
                className="pl-10 py-2 bg-white rounded-md px-4 text-black shadow-md outline-none w-full"
              />
            </div>
            <p className="text-center text-red-300">{errors.fname?.message}</p>

            {/* Last Name */}
            <label htmlFor="lname">
              Last Name <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <FaRegUser className="absolute left-2 top-1/2 transform -translate-y-1/2 text-black size-6 opacity-80" />
              <input
                type="text"
                placeholder="e.g Doe"
                {...register("lname")}
                className="pl-10 py-2 px-4 bg-white rounded-md text-black shadow-md outline-none w-full"
              />
            </div>
            <p className="text-center text-red-300">{errors.lname?.message}</p>

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

            {/* Email */}
            <label htmlFor="email">
              Email <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <PiEnvelope className="absolute left-2 top-1/2 transform -translate-y-1/2 text-black opacity-80 size-6" />
              <input
                type="email"
                placeholder="johndoe@gmail.com"
                {...register("email")}
                className="pl-10 py-2 bg-white rounded-md text-center text-black shadow-md outline-none w-full"
              />
            </div>
            <p className="text-center text-red-300">{errors.email?.message}</p>

            {/* DOB */}
            <label htmlFor="dob">
              Date of Birth <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              {...register("dob")}
              className="py-2 px-4 bg-white rounded-xl text-center text-black shadow-md outline-none"
            />
            <p className="text-center text-red-300">{errors.dob?.message}</p>

            {/* Terms */}
            <div className="flex gap-2 items-center my-4">
              <input
                type="checkbox"
                className="outline-none"
                onChange={(e) => setIsCheckboxChecked(e.target.checked)}
              />
              <p className="text-sm font-normal">
                I agree to the{" "}
                <span
                  className="text-teal-400 cursor-pointer"
                  onClick={() => navigate("/termsplus")}
                >
                  Terms of Service
                </span>{" "}
                &{" "}
                <span
                  className="text-teal-400 cursor-pointer"
                  onClick={() => navigate("/policyplus")}
                >
                  Privacy Policy
                </span>
              </p>
            </div>

            {/* Submit */}
            <div className="flex justify-center my-1">
              <button
                className="text-lg bg-teal-400 rounded-md px-4 py-1 text-black font-normal w-1/3"
                type="submit"
              >
                {processing ? (
                  <span className="flex justify-center gap-3">
                    <AiOutlineLoading className="h-6 w-6 animate-spin" />
                    <p>Creating...</p>
                  </span>
                ) : (
                  "Next"
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

export default SignUp;
