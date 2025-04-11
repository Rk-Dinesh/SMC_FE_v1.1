import React from "react";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";

const LogOut = ({ handleCloseModal}) => {
  const navigate = useNavigate();
  const redirect = () => {
    localStorage.clear()
    navigate("");
  };
  return (
    <Modal>
      <div className="w-[550px] min-h-[330px] my-4 mx-8 font-extralight font-poppins text-white">
        <p
          className="text-end text-2xl font-medium"
          onClick={() => handleCloseModal()}
        >
          X
        </p>
        <p className="text-center font-semibold text-xl">Logout</p>
        <p className="text-center text-lg my-10">
          Do you want to proceed with logout?
        </p>
        <div className="flex justify-around mt-24 gap-1 flex-wrap ">
          <button
            className={` font-normal   bg-white text-black rounded-md text-center w-36 py-2.5 my-2 `}
            onClick={() => handleCloseModal()}
          >
            Cancel
          </button>
          <button
            className={` font-normal bg-teal-400 text-black rounded-md text-center w-36 py-2.5 my-2 `}
            onClick={redirect}
          >
            Logout
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LogOut;