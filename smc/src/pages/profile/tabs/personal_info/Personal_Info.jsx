import React, { useEffect, useState } from "react";
import { RiPencilFill } from "react-icons/ri";
import Phone_OTP from "./phoneotp/Phone_OTP";
import axios from "axios";
import UpdateEmail from "./phoneotp/UpdateEmail";
import { API } from "../../../../Host";

const Personal_Info = () => {
  const [OTP_verification, setOTP_verification] = useState(false);
  const [update_email, setUpdate_email] = useState(false);
  const [user, setUser] = useState({});
  const userId = localStorage.getItem("user");

  const Openotp = () => setOTP_verification(true);
  const OpenUpdate_email = () => setUpdate_email(true);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${API}/api/getusersbyid?id=${userId}`);
      const info = response.data.user;
      setUser(info);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  return (
    <>
      {user && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-8 text-white">
            <div className="flex flex-col">
              <label className="mb-2 text-lg">First Name</label>
              <p className="bg-transparent border-b border-white text-gray-300 py-1">
                {user.fname}
              </p>
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-lg">Last Name</label>
              <p className="bg-transparent border-b border-white text-gray-300 py-1">
                {user.lname}
              </p>
            </div>

            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <label className="text-lg">Email</label>
                <button
                  className="flex items-center gap-1 text-base text-gray-300 hover:text-white"
                  onClick={OpenUpdate_email}
                >
                  <RiPencilFill size={20} />
                  Edit
                </button>
              </div>
              <p className="bg-transparent border-b border-white text-gray-300 py-1">
                {user.email}
              </p>
            </div>

            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <label className="text-lg">Phone</label>
                <button
                  className="flex items-center gap-1 text-base text-gray-300 hover:text-white"
                  onClick={Openotp}
                >
                  <RiPencilFill size={20} />
                  Edit
                </button>
              </div>
              <p className="bg-transparent border-b border-white text-gray-300 py-1">
                {user.phone}
              </p>
            </div>

            <div className="flex flex-col">
              <label className="mb-2 text-lg">Date of Birth</label>
              <p className="bg-transparent border-b border-white text-gray-300 py-1">
                {user.dob}
              </p>
            </div>
          </div>

          {OTP_verification && (
            <Phone_OTP onClose={() => setOTP_verification(false)} user={user} 
            onSuccess={fetchUser}/>
          )}

          {update_email && (
            <UpdateEmail
              onClose={() => setUpdate_email(false)}
              user={user}
              onSuccess={fetchUser} // ✅ Refresh data after email update
            />
          )}
        </>
      )}
    </>
  );
};

export default Personal_Info;
