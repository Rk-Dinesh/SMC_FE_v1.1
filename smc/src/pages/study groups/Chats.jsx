import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store";
import axios from "axios";
import { API } from "../../Host";
import IMG from "../../assets/images/courses.jpeg";

const Chats = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);
  const navigate = useNavigate();
  const {
    setSelectedChatType,
    setSelectedChatData,
    selectedChatData,
    setDirectMessagesContacts,
    directMessagesContacts,
  } = useAppStore();

console.log(selectedChatData, "selectedChatData");

  useEffect(() => {
    const getContactsWithMessages = async () => {
      const response = await axios.get(`${API}/get-contacts-for-list`);
      if (response.data.contacts) {
        setDirectMessagesContacts(response.data.contacts);
      }
    };
    getContactsWithMessages();
  }, [setDirectMessagesContacts,isOpen]);
  
  

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

  const selectNewContact = (contact) => {
    setIsOpen(false);
    setSelectedChatType("contact");
    setSelectedChatData(contact);
    setSearchedContacts([]);
    navigate("/view_profile");
  };

  const handleClick = (contact) => {
    if (isChannel) setSelectedChatType("channel");
    else setSelectedChatType("contact");
    setSelectedChatData(contact);
    if (selectedChatData && selectedChatData._id !== contact._id) {
      setSelectedChatMessages([]);
    }
  };

  return (
    <>
      <div className="flex justify-end items-center mx-2 ">
        <p
          onClick={() => setIsOpen(true)}
          className="cursor-pointer bg-teal-400 px-4 py-2 rounded-md hover:bg-cyan-300"
        >
          + Add People
        </p>
      </div>
      <div className="mt-5">
      {directMessagesContacts.map((contact) => (
        <div
          key={contact._id}
          className={`pl-10 py-2  transition-all duration-300 cursor-pointer ${
            selectedChatData && selectedChatData._id === contact._id
              ? "bg-[#8417ff] hover:bg-[#8417ff]"
              : "hover:bg-[#f1f1f111] "
          }`}
          onClick={() => handleClick(contact)}
        >
         
        </div>
      ))}
    </div>
      <div className="bg-darkgray text-white py-4 px-6 rounded-4xl flex justify-between shadow-lg w-full  mx-auto mt-4">
        <div className="flex  space-x-4">
          <img
            src={IMG}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-teal-400"
          />
          <div className="py-4 px-2">
            <h2 className="text-4xl font-light py-1 ">Vishnu Nair</h2>
            <p className="text-gray-300 ">
              Lorem ipsum is dummy text for replacement of dummy text instead of
              original text
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-sm text-gray-200 mb-8">06-Apr-2025, 10:30 AM</p>
          <p
            onClick={() => navigate("/view_profile")}
            className=" cursor-pointer bg-teal-400 text-black px-6 py-1 rounded-md font-semibold hover:bg-cyan-300"
          >
            View
          </p>
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

export default Chats;
