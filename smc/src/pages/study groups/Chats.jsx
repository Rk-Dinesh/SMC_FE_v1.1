import React, { useState } from "react";
import IMG from "../../assets/images/courses.jpeg";
import { useNavigate } from "react-router-dom";

const Chats = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-end items-center mx-2 ">
        <p
          onClick={() => setIsOpen(true)}
          className=" cursor-pointer bg-teal-400 px-4 py-2 rounded-md  hover:bg-cyan-300 "
        >
          + Add People
        </p>
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
          <p onClick={() => navigate("/view_profile")} className=" cursor-pointer bg-teal-400 text-black px-6 py-1 rounded-md font-semibold hover:bg-cyan-300">
            View
          </p>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-darkgray text-white rounded-xl p-8 w-full max-w-md relative flex gap-4 items-center">
            <p
              className=" cursor-pointer absolute -top-2 shadow-xl -right-2 text-white bg-popup-gray px-2 py-0.5 rounded-full text-xl "
              onClick={() => setIsOpen(false)}
            >
              X
            </p>
            <h3 className="text-lg font-semibold ">Search</h3>
            <input
              type="text"
              placeholder="Type to search..."
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Chats;
