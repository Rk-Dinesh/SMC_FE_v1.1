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
          <div className="px-2">
            <p className=" px-2 text-sm">
              BIO: Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Fugit tenetur consectetur consequuntur recusandae cumque
              cupiditate exercitationem esse possimus incidunt totam dolore quo
              officiis architecto, neque fuga natus enim quisquam. Porro minima
              rerum odio, sit corporis nesciunt unde quam necessitatibus
              dignissimos ipsum doloribus nam est, quidem officia recusandae
              adipisci eveniet laudantium dolore nisi harum veniam ab? Impedit
              non accusamus maxime? Facere, repudiandae illum sed voluptatibus
              quisquam sequi veniam esse tenetur ipsam, vero ullam inventore
              repellat ad nemo odio, omnis recusandae voluptates velit
              architecto iusto quod distinctio magnam cumque unde! Quia
              architecto quisquam esse perspiciatis, ad quidem libero iste ab
              dignissimos consequatur.
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
            <div className=" mx-4  flex justify-center items-center gap-4">
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
                <span className="text-end py-2 px-2">12.05 AM</span>
              </p>
            </div>

            <div className=" mx-4 flex items-center gap-4">
              <span className="bg-popup-gray rounded-full px-2 py-2 text-lg">
                VN
              </span>
              <p className="bg-popup-gray rounded-3xl px-4 py-4 mx-6 w-full">
                <img
                  src={IMG}
                  alt="Image"
                  className="rounded-4xl p-2 w-full "
                />
              </p>
            </div>
            <p className="flex justify-between items-center mt-4 gap-4">
              <span className="text-white text-4xl ml-6">+</span>
              <input
                type="text"
                className="w-full bg-white outline-none py-4 rounded-lg"
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
