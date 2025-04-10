import React, { useState } from "react";
import { RiPencilFill } from "react-icons/ri";
import Phone_OTP from "./phoneotp/Phone_OTP";

const Personal_Info = () => {
  const [OTP_verification, setOTP_verification] = useState(false);
  const [user, setUser] = useState({
    firstName: "Naveen",
    lastName: "Kumar",
    email: "naveen@email.com",
    phone: "+919876543210", // Always store full international format for APIs
    dob: "2005-01-20",       // ISO format for consistency
  });

  const Openotp = () => setOTP_verification(true);

  return (
    <>
      <div className="grid grid-cols-12 p-8 gap-8 text-white">
        <div className="col-span-6">
          <label className="block mb-5 text-lg">First Name</label>
          <p className="bg-transparent border-b border-white text-gray-300 w-96 outline-none py-1">
            {" "}
           {user.firstName}
          </p>
        </div>
        <div className="col-span-6">
          <label className="block mb-5 text-lg">Last Name</label>
          <p className="bg-transparent border-b border-white text-gray-300 w-96 outline-none py-1">
            {" "}
            {user.lastName}
          </p>
        </div>
        <div className="col-span-6 w-96">
          <div className="flex items-center justify-between mb-5 gap-2">
            <label className="text-lg">Email</label>
            <button className="flex items-center gap-1 text-sm text-gray-300 hover:text-white">
              <RiPencilFill size={16} />
              Edit
            </button>
          </div>
          <div className="flex justify-between items-center  py-1">
            <p className="bg-transparent border-b border-white text-gray-300 w-96 outline-none py-1">
              {" "}
              {user.email}
            </p>
          </div>
        </div>
        <div className="col-span-6 w-96">
          <div className="flex items-center justify-between mb-5 gap-2">
            <label className="text-lg">Phone</label>
            <button
              className="flex items-center gap-1 text-sm text-gray-300 hover:text-white"
              onClick={Openotp}
            >
              <RiPencilFill size={16} />
              Edit
            </button>
          </div>
          <div className="flex   items-center  py-1">
            <p className="bg-transparent border-b border-white text-gray-300 w-96 outline-none py-1">
              {" "}
              {user.phone}
            </p>
          </div>
        </div>
        <div className="col-span-6">
          <label className="block mb-5 text-lg">Date of Birth</label>
          <p className="bg-transparent border-b border-white text-gray-300 w-96 outline-none py-1">
            {" "}
            {user.dob}
          </p>
        </div>
      </div>
      {OTP_verification && (
        <Phone_OTP onClose={() => setOTP_verification(false)} />
      )}
    </>
  );
};

export default Personal_Info;
