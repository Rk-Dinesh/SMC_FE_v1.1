import React, { useState } from "react";
import { Search } from "lucide-react";
import IMG from "../../assets/images/courses.jpeg";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import MessageContainer from "./MessageContainer";
import MessageBar from "./MessageBar";

const ViewProfile = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const totalItems = 30;

  return (
    <div className="font-poppins ">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4 mx-1 my-1 bg-darkgray py-3 flex flex-col  items-center   text-gray-200 rounded-4xl ">
          <img
            src={IMG}
            alt="Profile"
            className="w-40 h-48 rounded-full border-4 border-teal-400"
          />
          <div className="text-center py-4 font-light ">
            <p className="text-2xl">Vishnu Nair</p>
            <p className="text-xl">Learner Since: 01-MAR-2025</p>
            <p className="text-xl">No Of Courses Studied: 25</p>
          </div>
          <div className="px-2 overflow-auto h-[300px] w-full">
            <p className=" px-2 text-sm">
              BIO: Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Fugit tenetur consectetur consequuntur recusandae cumque
              cupiditate exercitationem esse possimus incidunt totam dolore quo
              officiis architecto, neque fuga natus enim quisquam. Porro minima
              rerum odio, sit corporis nesciunt unde quam necessitatibus
              dignissimos ipsum doloribus nam est, quidem officia recusandae
              adipisci eveniet laudantium dolore nisi harum veniam ab? Impedit
              non accusamus maxime? .
              BIO: Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Fugit tenetur consectetur consequuntur recusandae cumque
              cupiditate exercitationem esse possimus incidunt totam dolore quo
              officiis architecto, neque fuga natus enim quisquam. Porro minima
              rerum odio, sit corporis nesciunt unde quam necessitatibus
              dignissimos ipsum doloribus nam est, quidem officia recusandae
              adipisci eveniet laudantium dolore nisi harum veniam ab? Impedit
              non accusamus maxime? .
            </p>
          </div>
          <div className=" px-3 py-1 w-full mt-8">
            <p className="bg-teal-400 text-black px-6 py-3 text-center rounded-md text-lg font-normal">
              Block Users
            </p>
          </div>
          <div className="flex w-full px-5 items-start space-x-4 mt-8">
            <FaFacebookF className="text-black bg-white rounded-full text-xl  px-3.5 size-10 cursor-pointer" />

            <FaInstagram className="text-black bg-white rounded-full text-xl px-3.5 size-10  cursor-pointer" />

            <FaTwitter className="text-black bg-white rounded-full text-xl px-3.5 size-10  cursor-pointer" />

            <FaLinkedinIn className="text-black bg-white  rounded-full px-3.5 size-10  cursor-pointer" />

            <FaYoutube className="text-black bg-white rounded-full text-xl px-3.5 size-10 cursor-pointer" />
          </div>
        </div>
        <div className=" col-span-8">
      

          <div className="fixed top-0 h-[870px]  bg-darkgray flex flex-col md:static md:flex-1  rounded-4xl">
      
      <MessageContainer />
      <MessageBar />
    </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
