import React from "react";
import Logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SubscriptionPlans = () => {
  const navigate = useNavigate();
  const handleSelect = () => {
    navigate("/dashboard");
    toast.success("Welcome To SeekMyCourse!");
  };
  return (
    <>
      <div className="h-screen font-poppins bg-darkgray py-4">
        <p className="flex  justify-center  py-4">
          <img src={Logo} alt="logo Image" />
        </p>

        <div className="flex justify-center  gap-6 text-white h-4/5">
          {/* Starter Plan */}

          <div className=" bg-darkgray border-2 border-gray-100 rounded-4xl  shadow-md p-4 w-1/5 ">
            <h2 className="text-teal-400 text-2xl font-semibold mb-2">
              Starter
            </h2>
            <div className="grid  items-center justify-center h-8/12">
              <p className="text-4xl text-center text-teal-400 font-bold ">
                FREE
              </p>
              <p onClick={handleSelect} className="bg-teal-400 cursor-pointer text-black text-center font-semibold  py-2 rounded-md mt-8">
                Select
              </p>

              <ul className="space-y-2 text-lg ">
                <li>Generate 1 Free Course</li>
                <li>Theory & Image Course</li>
                <li>Up to 05 Subtopics</li>
                <li>AI Tutor for doubt solving</li>
              </ul>
            </div>
          </div>

          {/* Basic Plan */}
          <div className=" bg-teal-400 text-black rounded-4xl  shadow-md p-4 w-1/5">
            <h2 className="text-black text-2xl font-semibold mb-2">Basic</h2>
            <div className="grid  items-center justify-center h-5/6">
              <p className="text-3xl text-center font-bold">
                ₹999 <span className="text-xl ">/ Year</span>
              </p>
              <p className="text-xl text-center">Billed Annually</p>
              <p onClick={handleSelect} className="bg-darkgray text-center cursor-pointer text-white font-semibold px-6 py-2 rounded-md ">
                Select
              </p>
              <ul className="font-semibold space-y-2 text-lg">
                <li>Generate 10 Course / Year</li>
                <li>Theory & Image Course</li>
                <li>Theory & Video Course</li>
                <li>Up to 10 Subtopics</li>
                <li>AI Tutor for doubt solving</li>
                <li>Create / Join Study Groups</li>
                <li>Export Course as PDF</li>
              </ul>
            </div>
          </div>
          <div className="  bg-darkgray border border-gray-100 rounded-4xl shadow-md p-6  w-1/5">
            <h2 className="text-teal-400 text-2xl font-semibold mb-2">Pro</h2>
            <div className="grid  items-center justify-center h-5/6">
              <p className="text-3xl  text-center text-teal-400 font-bold">
                ₹ 1999 <span className="text-xl">/ Year</span>
              </p>
              <p className="text-xl text-center my-4 ">Billed Annually</p>
              <p onClick={handleSelect} className="bg-teal-400 text-center cursor-pointer text-black font-semibold px-6 py-2 rounded-md mb-6">
                Select
              </p>
              <ul className="space-y-2 text-lg">
                <li>Generate 10 Course / Year</li>
                <li>Theory & Image Course</li>
                <li>Theory & Video Course</li>
                <li>Up to 10 Subtopics</li>
                <li>AI Tutor for doubt solving</li>
                <li>Create / Join Study Groups</li>
                <li>Export Course as PDF</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPlans;
