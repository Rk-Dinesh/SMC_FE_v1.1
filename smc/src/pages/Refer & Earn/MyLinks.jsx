import React, { useEffect, useState } from "react";
import PaginationBar from "../../components/PaginationBar";
import Pdf from "../../assets/images/pdf.png";
import Excel from "../../assets/images/excel.png";
import { API } from "../../Host";
import axios from "axios";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable"; 

const MyLinks = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const totalItems = 30;
  const userId = localStorage.getItem("user");
  const [myLinks, setMyLinks] = useState({});
  useEffect(() => {
    const fetchMyLinks = async () => {
      try {
        const response = await axios.get(
          `${API}/api/referralbyid?referrerId=${userId}`
        );
        

        setMyLinks(response.data.data);
      } catch (error) {}
    };
    fetchMyLinks();
  }, []);

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet([
      {
        Date: new Date(myLinks.createdAt)
          .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
          .toUpperCase(),
        Link: myLinks.referralLink,
        Commission: myLinks.commission,
        "No Of Paid Users": myLinks.paidUsers?.length,
      },
    ]);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "MyLinks");

    const excelFile = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    saveAs(
      new Blob([excelFile], { type: "application/octet-stream" }),
      "my_links.xlsx"
    );
  };

  const downloadPDF = () => {
    const doc = new jsPDF({ orientation: "potrait" }); // More width
    doc.setFontSize(18);
    doc.text("My Links Report", 14, 20);
  
    const tableData = [
      {
        label: "Date",
        value: new Date(myLinks.createdAt)
          .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
          .toUpperCase(),
      },
      {
        label: "Link",
        value: myLinks.referralLink,
      },
      {
        label: "Commission",
        value: myLinks.commission,
      },
      {
        label: "Paid Users",
        value: myLinks.paidUsers?.length || 0,
      },
    ];
  
    const headRow = tableData.map((item) => item.label);
    const valueRow = tableData.map((item) => item.value);
  
    autoTable(doc, {
      head: [headRow],
      body: [valueRow],
      startY: 30,
      styles: {
        fontSize: 10,
        cellPadding: 4,
        overflow: "linebreak", 
      },
      headStyles: {
        fillColor: [6, 182, 212], 
        halign: "center",
        valign: "middle",
      },
      bodyStyles: {
        valign: "top",
        halign: "center",
      },
      columnStyles: {
        0: { cellWidth: 30 }, 
        1: { cellWidth: 80 }, 
        2: { cellWidth: 40 }, 
        3: { cellWidth: 30 }, 
      },
    });
  
    doc.save("my_links_report.pdf");
  };
  
  

  return (
    <>
      <div className="flex justify-between items-center mx-2">
        <div className="flex  items-center  bg-teal-400 rounded-full  py-3 px-6 ">
          + Create a Link
        </div>
        <div className="flex items-center gap-2 px-4 ">
          <p onClick={downloadPDF}>
            <img src={Pdf} alt="Pdf icon" className="w-10" />
          </p>
          <p onClick={downloadExcel}>
            <img src={Excel} alt="Excel icon" className="w-10 " />
          </p>
        </div>
      </div>
      <div className=" mt-2 bg-darkgray  px-2 py-2 rounded-4xl">
        <div className="overflow-auto no-scrollbar">
          <table className="font-poppins w-full text-gray-200  whitespace-nowrap">
            <thead>
              <tr className="">
                {[
                  "Date",
                  "Link",
                  "Commission",
                  "No Of Paid Users",
                  "Actions",
                ].map((heading) => (
                  <th key={heading} className="px-1 py-2">
                    <h1 className="flex items-center justify-center bg-popup-gray px-2 py-2 font-semibold gap-1 border-[3px] border-teal-400 rounded-xl">
                      {heading}
                    </h1>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-center">
              <tr className="">
                <td className=" px-2 py-1">
                  <p className="border-[3px] border-teal-400 rounded-lg bg-popup-gray py-8 px-2">
                    {new Date(myLinks.createdAt)
                      .toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                      .toUpperCase()}
                  </p>
                </td>
                <td className="pr-2 ">
                  <p className="w-[600px] border-[3px] border-teal-400 rounded-lg text-wrap bg-popup-gray px-3 py-5  break-words  leading-snug">
                    {myLinks.referralLink}
                  </p>
                </td>
                <td className=" pr-2">
                  <p className="border-[3px] border-teal-400 rounded-lg bg-popup-gray py-8 px-2">
                    {" "}
                    {myLinks.commission}
                  </p>
                </td>
                <td className=" pr-2">
                  <p className="border-[3px] border-teal-400 rounded-lg bg-popup-gray py-8 px-2">
                    {myLinks.paidUsers?.length}
                  </p>
                </td>
                <td className=" pr-2 ">
                  <p className=" border-[3px] border-teal-400 rounded-lg bg-popup-gray py-8 px-2 ">
                    Share Link
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

export default MyLinks;
