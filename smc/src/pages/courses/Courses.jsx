import React, { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Search } from "lucide-react";
import IMG from "../../assets/images/courses.jpeg";
import PaginationBar from "../../components/PaginationBar";

const Courses = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const totalItems = 30;


  return (
    <div>
      <div className="text-white flex justify-between border-b pb-2 pl-7 border-white">
        <p>My Courses</p>
        <p className="flex  gap-2">
          All Courses
          <span>
            <SlidersHorizontal />
          </span>
        </p>
      </div>
      <span className="flex  justify-end py-3  items-center">
        <input
          type="text"
          placeholder="Search by topic name"
          className="text-white placeholder:text-white rounded-l-full px-4 py-2 bg-black outline-none "
        />
        <button className="text-white font-bold bg-black rounded-r-full pr-4 py-2">
          <Search />
        </button>
      </span>
      <div className="grid grid-cols-12 gap-3 py-3  ">
        <div className=" col-span-3 bg-darkgray pb-3 text-white rounded-4xl ">
          <img src={IMG} alt="Course" className="rounded-4xl w-full p-4  " />
          <div className="text-xs px-6  leading-relaxed">
            <p>
              <span className="">Date:</span> 12-Mar-2025
            </p>
            <p>
              <span className="">CCNA Security For starters</span>
            </p>
            <p>
              <span className="">Type:</span> Video & Theory Course
            </p>
            <p>
              <span className="">No of Subtopics:</span> 05
            </p>
            <p>
              <span className="">Language:</span> English
            </p>
          </div>
          <div className="flex gap-2 mt-4 justify-center">
            <button className="bg-teal-400 text-black px-4 py-1 rounded-md text-sm ">
              Continue
            </button>
          </div>
        </div>
        <div className=" col-span-3 bg-darkgray pb-3 text-white rounded-4xl ">
          <img src={IMG} alt="Course" className="rounded-4xl w-full p-4  " />
          <div className="text-xs px-6  leading-relaxed">
            <p>
              <span className="">Date:</span> 12-Mar-2025
            </p>
            <p>
              <span className="">CCNA Security For starters</span>
            </p>
            <p>
              <span className="">Type:</span> Video & Theory Course
            </p>
            <p>
              <span className="">No of Subtopics:</span> 05
            </p>
            <p>
              <span className="">Language:</span> English
            </p>
          </div>
          <div className="flex gap-2 mt-4 justify-center">
          <button className="bg-white text-black px-4 py-1 rounded-md text-sm ">
              Certificate
            </button>
            <button className="bg-teal-400 text-black px-4 py-1 rounded-md text-sm ">
              Continue
            </button>
          </div>
        </div>
      </div>
     <div className=" text-end fixed bottom-2 right-0">
     <PaginationBar
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        onItemsPerPageChange={setItemsPerPage}
        onPageChange={setCurrentPage}
      />
     </div>
    </div>
  );
};

export default Courses;
