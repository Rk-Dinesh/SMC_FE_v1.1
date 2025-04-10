import React, { useState } from "react";
import { Search } from "lucide-react";
import IMG from "../../assets/images/courses.jpeg";
import PaginationBar from "../../components/PaginationBar";

const ViewGroup = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const totalItems = 30;

  return (
    <div className="font-poppins ">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4 mx-1 my-1 bg-darkgray pb-3   text-gray-200 rounded-4xl ">
          <img src={IMG} alt="Course" className="rounded-4xl w-96 p-2 " />

          <div className="text-sm font-medium px-2 py-2">
            <p>Group Name</p>
            <p>
              <span className="">
                Description : Lorem ipsum, dolor sit amet consectetur
                adipisicing elit. Earum a rerum minima cum ea ex autem quidem
                ducimus, quam ipsam rem blanditiis, ut quasi doloremque placeat
                velit doloribus? Maxime iure necessitatibus eligendi quibusdam
                sint nostrum cumque, quo nihil earum et sequi optio quia ea
                impedit fuga tempora amet vitae! Adipisci eaque deleniti
                consectetur quidem ut, voluptates rem unde expedita provident
                cupiditate iure ullam, architecto molestiae. Libero ex cum
                necessitatibus magnam? Vitae suscipit facilis dolore! Alias
                dolorem iusto numquam eum cumque deserunt molestiae atque
                obcaecati, ipsam, rem sit debitis ducimus, soluta magni amet
                commodi asperiores doloribus. Dolor dolore nobis maiores
                perferendis?
              </span>
            </p>
          </div>
          <div className="px-2">
            <p>Group Details</p>
            <p>
              <span className="">Start Date :</span>01-Jan-2025
            </p>
            <p>
              <span className="">Group Type:</span>Public
            </p>
            <p>
              <span className="">No of Learners :</span>178
            </p>
            <p>
              <span className="">Group Admin :</span>Vishnu Nair
            </p>
          </div>
          <div className="grid px-2 py-1 gap-4 w-full">
            <button className="bg-teal-400 text-black px-6 py-2 rounded-md text-sm ">
              View Group
            </button>
            <button className="border-2 border-white text-white px-6 py-2 rounded-md text-sm ">
              Leave Group
            </button>
            <button className="border-2 border-white text-white px-6 py-2 rounded-md text-sm ">
              Report Group
            </button>
            <button className="border-2 border-white text-white px-6 py-2 rounded-md text-sm ">
              Invite Users
            </button>
          </div>
        </div>
        <div className=" col-span-8">
          <div className=" flex justify-between bg-darkgray rounded-lg  py-3 px-4 my-2 text-white">
            <input
              type="text"
              className=" outline-0 placeholder:text-white placeholder:text-sm px-2"
              placeholder="Search...."
            />
            <Search className="size-6 stroke-3" />
          </div>
          <div className="px-4  bg-darkgray h-[870px] grid items-center  text-white text-center rounded-4xl">
            <p className="my-2">01-Jan-2025</p>
            <p className=" mx-4  flex justify-center items-center gap-4">
              <span className="bg-popup-gray rounded-full px-2 py-2 text-lg">
                VN
              </span>
              <p className="bg-popup-gray rounded-3xl px-4 py-4 text-sm font-light ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corporis consectetur explicabo quia omnis aperiam. Quaerat
                voluptates dolorem recusandae? Adipisci quidem quibusdam
                suscipit doloribus, ab pariatur eius quaerat odio porro illum in
                commodi molestiae neque alias aperiam eveniet maxime laborum
                velit, debitis earum. Suscipit itaque, cupiditate corrupti illo
                dicta molestiae dignissimos!
                <p className="text-end py-2 px-2">12.05 AM</p>
              </p>
             
            </p>

            <p className=" mx-4 flex items-center gap-4">
              <span className="bg-popup-gray rounded-full px-2 py-2 text-lg">
                VN
              </span>
              <p className="bg-popup-gray rounded-3xl px-4 py-4 mx-6 w-full">
                <img src={IMG} alt="Image" className="rounded-4xl p-2 w-full " />
              </p>
            </p>
            <p className="flex justify-between items-center mt-4 gap-4">
                <span className="text-white text-4xl ml-6">+</span>
                <input type="text"  className="w-full bg-white outline-none py-4 rounded-lg" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewGroup;
