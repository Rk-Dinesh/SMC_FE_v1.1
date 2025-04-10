import React, { useEffect, useState } from "react";
import PaginationBar from "../../components/PaginationBar";
import Pdf from "../../assets/images/pdf.png";
import Excel from "../../assets/images/excel.png";
import { useNavigate } from "react-router-dom";

const PayOutDetails = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const navigate = useNavigate();
  const totalItems = 30;
  return (
    <>
      <div className="flex justify-end items-center mx-2 gap-2">
        <p>
          <img src={Pdf} alt="Pdf icon" className="w-10" />
        </p>
        <p className="">
          <img src={Excel} alt="Excel icon" className="w-10 " />
        </p>
      </div>
      <div className=" mt-2 bg-darkgray  px-2 py-2 rounded-4xl">
        <div className="overflow-auto no-scrollbar">
          <table className="font-poppins w-full text-gray-200  whitespace-nowrap">
            <thead>
              <tr className="">
                {["Date", "Link", "Commission", "Transaction Id", "Action"].map(
                  (heading) => (
                    <th key={heading} className="px-1 py-2">
                      <h1 className="flex items-center justify-center bg-popup-gray px-2 py-2 font-semibold  gap-1 border-[3px] border-teal-400 rounded-xl">
                        {heading}
                      </h1>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="text-center">
              <tr className="">
                <td className=" px-2 py-1">
                  <p className="border-[3px] border-teal-400 rounded-lg bg-popup-gray py-8 px-2">
                    {" "}
                    01- JAN-2025
                  </p>
                </td>
                <td className="  pr-2">
                  <p className="border-[3px] border-teal-400 rounded-lg bg-popup-gray py-8 px-2">
                    {" "}
                    https://example.com/feb\n
                  </p>
                </td>
                <td className="  pr-2">
                  <p className="border-[3px] border-teal-400 rounded-lg bg-popup-gray py-8 px-2">
                    {" "}
                    ₹3500
                  </p>
                </td>
                <td className="  pr-2">
                  <p className="border-[3px] border-teal-400 rounded-lg bg-popup-gray py-8 px-2">
                    {" "}
                    UTRIBS00123548
                  </p>
                </td>
                <td className=" pr-2">
                  <p className="border-[3px] border-teal-400 rounded-lg bg-popup-gray py-8 px-2 ">
                    View
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="fixed bottom-6 right-0 left-0 py-2">
        <PaginationBar
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          onItemsPerPageChange={setItemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
};

export default PayOutDetails;
