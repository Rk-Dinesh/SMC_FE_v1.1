import React, { useEffect, useState } from "react";
import PaginationBar from "../../components/PaginationBar";
import { Search} from "lucide-react";
import { useNavigate } from "react-router-dom";

const EarningTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const navigate = useNavigate();
  const totalItems = 30;
  return (
    <>
    <div className="flex  items-center border border-darkgray bg-darkgray rounded-full w-72 py-3 pl-4 text-white">
            <input
              type="text"
              className=" outline-0 placeholder:text-white px-2"
              placeholder="Search by date/user"
            />
               <Search className="size-6 stroke-3" />
    </div>
      <div className=" mt-2 bg-darkgray  px-2 py-2 rounded-4xl">
        <div className="overflow-auto no-scrollbar">
          <table className="font-poppins w-full text-gray-200  whitespace-nowrap">
            <thead>
              <tr className="">
                {["Sr.No", "Month", "Commission", "Link", "Action"].map(
                  (heading) => (
                    <th key={heading} className="px-1 py-2">
                      <h1 className="flex items-center justify-center bg-popup-gray px-2 py-2 font-semibold gap-1 border-[3px] border-teal-400 rounded-xl">
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
                  <p className="border-[3px] border-teal-400 rounded-xl bg-popup-gray py-8 px-2">
                    {" "}
                    1
                  </p>
                </td>
                <td className=" pr-2">
                  <p className="border-[3px] border-teal-400 rounded-xl bg-popup-gray py-8 px-2">
                    {" "}
                    JAN-2025
                  </p>
                </td>
                <td className=" pr-2">
                  <p className="border-[3px] border-teal-400 rounded-xl bg-popup-gray py-8 px-2">
                    {" "}
                    ₹3500
                  </p>
                </td>
                <td className=" pr-2">
                  <p className="border-[3px] border-teal-400 rounded-xl bg-popup-gray py-8 px-2">
                    {" "}
                    https://example.com/feb\n
                  </p>
                </td>
                <td className=" pr-2">
                  <p className="flex  justify-center  items-center gap-4 border-[3px] border-teal-400 rounded-xl bg-popup-gray py-5 px-2 ">
                    {" "}
                    <button className="bg-teal-400 px-8 rounded-lg text-black font-light">
                      Request <br /> Payout
                    </button>
                    <span className="cursor-pointer" onClick= {()=>navigate("/view_earning")}> View</span>
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

export default EarningTable;
