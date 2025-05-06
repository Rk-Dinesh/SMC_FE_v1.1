import React, { useState } from "react";
import { Search } from "lucide-react";
import IMG from "../../../assets/images/courses.jpeg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import MessageContainer from "../MessageContainer";
import MessageBar from "../MessageBar";
import { useAppStore } from "../../../store";
import { API, formatDate } from "../../../Host";

const ViewGroup = () => {
  const { selectedChatData } = useAppStore();
  const [searchedContacts, setSearchedContacts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    navigate("/viewmembers", { state: { channelId: selectedChatData._id } });
  };

  const searchContacts = async (searchTerm) => {
    try {
      if (searchTerm.length > 0) {
        const response = await axios.post(`${API}/search`, { searchTerm });
        if (response.status === 200 && response.data.contacts) {
          setSearchedContacts(response.data.contacts);
        }
      } else {
        setSearchedContacts([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLeave = async () => {
    setLoading(true);
    try {
      const formData = {
        channelId: selectedChatData._id,
        userId: localStorage.getItem("user"),
      };
      const response = await axios.post(`${API}/leave-channel`, formData);
      console.log(response.data);
      toast.success("You have left the group successfully");
      setLoading(false);
      navigate("/study_group");
    } catch (error) {
      console.error("Error leaving group:", error);
      setLoading(false);
    }
  };

  const selectNewContact = async (contact) => {
    setIsOpen(false);

    const formData = {
      userId: contact._id,
      channelId: selectedChatData._id,
    };

    try {
      const response = await axios.post(`${API}/invite-user`, formData);

      toast.success("User Invited Successfully");
      setSearchedContacts([]);
      history.back();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong.");
      }
      setSearchedContacts([]);
    }
  };

  return (
    <>
      <div className="font-poppins ">
        <div className="grid grid-cols-12 gap-2 ">
          {selectedChatData && (
            <div className="lg:col-span-4 md:col-span-5 col-span-12 mx-1 my-1 bg-darkgray pb-3   text-gray-200 rounded-4xl ">
              <img src={IMG} alt="Course" className="rounded-4xl w-96 p-2 " />

              <div className="text-sm font-medium px-2 py-2">
                <p className="mb-2  text-xl px-2">{selectedChatData.name}</p>
                <div className="px-2 overflow-auto max-h-[200px] h-fit w-full text-sm">
                  <p>BIO: {selectedChatData.desc}</p>
                </div>
              </div>
              <div className="px-2">
                <p>Group Details</p>
                <p>
                  <span className="">Start Date : </span>
                  {formatDate(selectedChatData.createdAt)}
                </p>
                <p>
                  <span className="">Group Type: </span>Public
                </p>
                <p>
                  <span className=" ">No of Learners : </span>
                  {selectedChatData.members.length}
                </p>
                <p>
                  <span className="">Group Admin : </span>{" "}
                  {selectedChatData.creator}
                </p>
              </div>
              <div className="grid px-2 py-1 gap-4 w-full">
                <button
                  className="bg-teal-400 text-black px-6 py-2 rounded-md text-sm "
                  onClick={handleClick}
                >
                  View Members
                </button>
                <button
                  className="border-2 border-white text-white px-6 py-2 rounded-md text-sm "
                  onClick={handleLeave}
                >
                  {loading ? "Leaving..." : "Leave Group"}
                </button>
                {/* <button className="border-2 border-white text-white px-6 py-2 rounded-md text-sm ">
              Report Group
            </button> */}
                <button
                  className="border-2 border-white text-white px-6 py-2 rounded-md text-sm "
                  onClick={() => setIsOpen(true)}
                >
                  Invite Users
                </button>
              </div>
            </div>
          )}
          <div className=" lg:col-span-8 md:col-span-7 col-span-12">
            <div className=" lg:top-0 md:top-0  lg:h-[870px] md:h-[700px] h-[600px]  bg-darkgray flex flex-col md:static md:flex-1  rounded-4xl">
              <MessageContainer />
              <MessageBar />
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-darkgray text-white rounded-xl p-8 w-full max-w-md relative flex flex-col">
            <p
              className="cursor-pointer absolute -top-2 shadow-xl -right-2 text-white bg-popup-gray px-2 py-0.5 rounded-full text-xl"
              onClick={() => setIsOpen(false)}
            >
              X
            </p>
            <h3 className="text-lg font-semibold mb-3">Search Contacts</h3>
            <input
              type="text"
              placeholder="Type to search..."
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
              onChange={(e) => searchContacts(e.target.value)}
            />

            <div className="h-[250px] mt-4 overflow-y-auto">
              <div className="flex flex-col gap-5">
                {searchedContacts.map((contact) => (
                  <div
                    className="flex gap-3 items-center cursor-pointer"
                    key={contact.id}
                    onClick={() => selectNewContact(contact)}
                  >
                    <div className="w-12 h-12 relative">
                      <div className="uppercase w-12 h-12 text-lg border-[1px] bg-gray-500 flex items-center justify-center rounded-full">
                        {contact.fname
                          ? contact.fname.split("").shift()
                          : contact.email.split("").shift()}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span>
                        {contact.fname && contact.lname
                          ? `${contact.fname} ${contact.lname}`
                          : ""}
                      </span>
                      <span className="text-xs">{contact.email}</span>
                    </div>
                  </div>
                ))}
                {searchedContacts.length <= 0 && (
                  <div className="flex-1 mt-5 flex-col justify-center items-center">
                    <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-5 lg:text-2xl text-xl text-center">
                      <h3 className="poppins-medium">
                        Hi
                        <span className="text-teal-500">!</span> Search new
                        <span className="text-teal-500"> Contact. </span>
                      </h3>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewGroup;
