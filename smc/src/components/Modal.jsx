import React from "react";

const Modal = ({ children }) => {
  return (
    <div className="fixed inset-0  backdrop-blur-sm flex justify-center items-center ">
      <div className="overflow-hidden shadow-lg shadow-black bg-darkgray flex items-end rounded-xl justify-between relative font-poppins mx-1">
        {children}
      </div>
    </div>
  );
};

export default Modal;