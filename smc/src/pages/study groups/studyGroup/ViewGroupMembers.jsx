import React, { useEffect, useState } from "react";
import IMG from "../../../assets/images/courses.jpeg";
import { API, formatDate } from "../../../Host";
import axios from "axios";
import { useAppStore } from "../../../store";
import { useLocation, useNavigate } from "react-router-dom";

const ViewGroupMembers = () => {
  const location = useLocation();
  const { channelId } = location.state || {};
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();
  const {
    setSelectedChatType,
    setSelectedChatData,
    selectedChatData,
    setSelectedChatMessages,
  } = useAppStore();

  useEffect(() => {
    const getMembers = async () => {
      const response = await axios.get(
        `${API}/get-channel?channelId=${channelId}`
      );
      if (response.data.combinedMembers) {
        setMembers(response.data.combinedMembers);
      }
    };
    getMembers();
  }, []);

  const handleClick = async (contact) => {
    try {
      const formData = {
        userId: localStorage.getItem("user"),
        contactId: contact._id,
      };
      const response = await axios.post(`${API}/get-chat-id`, formData);

      if (response.data.chat) {
        setSelectedChatType("p2p");
        setSelectedChatData(response.data.chat);
        navigate("/view_profile");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleNavigate = (contact) => {
    navigate("/learnerProfile",{state : { userId: contact._id }});
  }

  return (
    <div>
      {members &&
        members.map((contact, index) => (
          <div
            className="bg-darkgray text-white py-4 px-6 rounded-4xl flex justify-between shadow-lg w-full  mx-auto mt-4 flex-wrap"
            key={index}
          >
            <div className="flex  space-x-4 items-center">
              <img
                src={IMG}
                alt="Profile"
                className="w-28 h-28 rounded-full border-2 border-teal-400"
              />

              <div>
                <h2 className="text-2xl font-light py-1.5 ">{`${contact.fname} ${contact.lname}`}</h2>
                <p className="text-lg text-gray-200 ">
                  Learner Since : {formatDate(contact.verifyTokenExpires)}
                </p>
              </div>
            </div>
            <div className="flex lg:flex-col md:flex-col flex-row  items-center gap-3 pt-4  ">
              {index === 0 && <p className="text-sm ">Group Admin</p>}
              <p
                onClick={() => handleNavigate(contact)}
                className=" cursor-pointer bg-teal-400 text-black w-34 text-center  py-1 rounded-md font-semibold hover:bg-cyan-300"
              >
                View Profile
              </p>
              {localStorage.getItem("user") === contact._id ? (
                <p className=" cursor-pointer border border-teal-400  w-34 text-center py-1 rounded-md font-semibold text-white">
                  You
                </p>
              ) : (
                <p
                  onClick={() => handleClick(contact)}
                  className=" cursor-pointer border border-teal-400  w-34 text-center py-1 rounded-md font-semibold text-white"
                >
                  Chat
                </p>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ViewGroupMembers;
