import React, { useState } from "react";
import { Search } from "lucide-react";
import IMG from "../../assets/images/courses.jpeg";
import PaginationBar from "../../components/PaginationBar";
import { StudyGroupData } from "../../components/Data";
import { useNavigate } from "react-router-dom";

const StudyGroups = () => {
    const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const totalItems = 30;

  return (
    <div className="font-poppins ">
      <div className="text-white flex justify-between border-b pb-2 pl-2 border-white">
        <p>My Study Groups</p>
      </div>
      <div className=" flex justify-end items-center w-fit place-self-end border border-darkgray bg-darkgray rounded-full  py-3 px-3 my-2 text-white">
        <input
          type="text"
          className=" outline-0 placeholder:text-white placeholder:text-sm px-2"
          placeholder="Search by group name"
        />
        <Search className="size-6 stroke-3" />
      </div>
      <div className="flex justify-center ">
      <div className="grid grid-cols-12 ">
        {StudyGroupData &&
          StudyGroupData.map((data, index) => (
            <div className="col-span-4 mx-1 my-1 bg-darkgray pb-3 w-56 text-gray-200 rounded-4xl ">
              <img src={IMG} alt="Course" className="rounded-4xl p-2" />

              <div className="text-sm font-light px-2" key={index}>
                <p>Group Name</p>
                <p >
                  <span className="pr-1">Date Created :</span>
                  {data.date}
                </p>
                <p>
                  <span className="">Description : {data.description}</span>
                </p>
                <p>
                  <span className="pr-1">Creator :</span>
                  {data.creator}
                </p>
                <p>
                  <span className="">No of Learners :</span>
                </p>
              </div>
              <div className="flex gap-2 mt-4 justify-center">
                <button onClick={()=>navigate("/view_group")} className= " cursor-pointer bg-teal-400 text-black px-6 py-0.5 rounded-sm text-sm ">
                  View Group
                </button>
              </div>
            </div>
          ))}
      </div>
      </div>
      <div className=" fixed bottom-6 right-0 left-0 py-2">
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

export default StudyGroups;
