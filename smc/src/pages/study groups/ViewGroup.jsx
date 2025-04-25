import React, { useState } from "react";
import { Search } from "lucide-react";
import IMG from "../../assets/images/courses.jpeg";
import PaginationBar from "../../components/PaginationBar";
import MessageContainer from "./MessageContainer";
import MessageBar from "./MessageBar";
import { useAppStore } from "../../store";
import { formatDate } from "../../Host";

const ViewGroup = () => {
 const { selectedChatData } = useAppStore();
 
  return (
    <div className="font-poppins ">
      <div className="grid grid-cols-12 gap-2 ">
      {selectedChatData && (
        <div className="lg:col-span-4 md:col-span-5 col-span-12 mx-1 my-1 bg-darkgray pb-3   text-gray-200 rounded-4xl ">
          <img src={IMG} alt="Course" className="rounded-4xl w-96 p-2 " />
       
          <div className="text-sm font-medium px-2 py-2">
            <p className="mb-2  text-xl px-2">{selectedChatData.name}</p>
            <div className="px-2 overflow-auto max-h-[200px] h-fit w-full text-sm">
            <p >
              BIO: {selectedChatData.desc}
            </p>
          </div>
          </div>
          <div className="px-2">
            <p>Group Details</p>
            <p>
              <span className="">Start Date : </span>{formatDate(selectedChatData.createdAt)}
            </p>
            <p>
              <span className="">Group Type: </span>Public
            </p>
            <p>
              <span className=" ">No of Learners : </span>{selectedChatData.members.length}
            </p>
            <p>
              <span className="">Group Admin : </span> {selectedChatData.creator}
            </p>
          </div>
          <div className="grid px-2 py-1 gap-4 w-full">
            <button className="bg-teal-400 text-black px-6 py-2 rounded-md text-sm ">
              View Members
            </button>
            <button className="border-2 border-white text-white px-6 py-2 rounded-md text-sm ">
              Leave Group
            </button>
            {/* <button className="border-2 border-white text-white px-6 py-2 rounded-md text-sm ">
              Report Group
            </button>
            <button className="border-2 border-white text-white px-6 py-2 rounded-md text-sm ">
              Invite Users
            </button> */}
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
  );
};

export default ViewGroup;
