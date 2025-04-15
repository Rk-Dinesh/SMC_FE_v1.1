import React, { useEffect, useState } from "react";
import PaginationBar from "../../components/PaginationBar";
import Pdf from "../../assets/images/pdf.png";
import Excel from "../../assets/images/excel.png";
import AddBankAccount from "./AddBankAccount";
import axios from "axios";
import { API } from "../../Host";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";



const BankDetails = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const totalItems = 30;

  const [addbankaccount, setAddBankAccount] = useState(false);
  const [bankAccount, setBankAccount] = useState([]);
  const userId = localStorage.getItem("user");

  const handleExcelExport = () => {
    if (!bankAccount || bankAccount.length === 0) return;
  
    // Format the data for Excel
    const worksheetData = bankAccount.map((acc) => ({
      "Bank Name": acc.bank_name,
      "Account Number": acc.acc,
      "IFSC Code": acc.ifsc,
      "Account Holder": acc.accname,
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bank Details");
  
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
  
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "Bank_Details.xlsx");
  };
  const handlePDFExport = () => {
    if (!bankAccount || bankAccount.length === 0) return;
  
    const doc = new jsPDF({ orientation: "potrait" });
    doc.setFontSize(18);
    doc.text("Bank Details", 14, 20);
  
    const head = [["Bank Name", "Account Number", "IFSC Code", "Account Holder"]];
    const body = bankAccount.map((acc) => [
      acc.bank_name,
      acc.acc,
      acc.ifsc,
      acc.accname,
    ]);
  
    autoTable(doc, {
      head,
      body,
      startY: 30,
      styles: {
        fontSize: 10,
        cellPadding: 4,
        overflow: "linebreak",
      },
      headStyles: {
        fillColor: [6, 182, 212], // teal
        textColor: 255,
        halign: "center",
      },
      bodyStyles: {
        halign: "center",
        valign: "middle",
      },
      columnStyles: {
        0: { cellWidth: 50 }, 
        1: { cellWidth: 40 }, 
        2: { cellWidth: 40 }, 
        3: { cellWidth: 50 }, 
      },
    });
  
    doc.save("Bank_Details.pdf");
  };
  
  

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const response = await axios.get(
          `${API}/api/getbankdetailsbyuser?user=${userId}`
        );
        setBankAccount(response.data.data.acc_details);
      } catch (error) {}
    };
    fetchBankDetails();
  }, [addbankaccount]);

  const handleAddBankAccount = () => {
    setAddBankAccount(true);
  };
  return (
    <>
      <div className="flex justify-between items-center mx-2">
        <div
          onClick={handleAddBankAccount}
          className=" cursor-pointer flex  items-center  bg-teal-400 rounded-full  py-3 px-6 "
        >
          + Add Bank Account
        </div>
        <div className="flex items-center gap-2 px-4 ">
          < p onClick={handlePDFExport}>
            <img src={Pdf} alt="Pdf icon" className="w-10" />
          </p>
          <p className="" onClick={handleExcelExport}>
            <img src={Excel} alt="Excel icon" className="w-10 " />
          </p>
        </div>
      </div>
      <div className="mt-2 bg-darkgray px-2 py-2 rounded-4xl">
        <div className="overflow-auto no-scrollbar">
          <table className="font-poppins w-full text-gray-200  whitespace-nowrap">
            <thead>
              <tr className="">
                {[
                  "Bank Name",
                  "Account Number",
                  "IFSC Code",
                  "Account Holder",
                ].map((heading) => (
                  <th key={heading} className="px-1 py-2">
                    <h1 className="flex items-center justify-center bg-popup-gray px-2 py-2 font-semibold gap-1 border-[3px] border-teal-400 rounded-2xl">
                      {heading}
                    </h1>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-center">
              {bankAccount &&
                bankAccount.map((details, index) => (
                  <tr className="" key={index}>
                    <td className=" px-2 py-1">
                      <p className="border-[3px] border-teal-400 rounded-2xl bg-popup-gray px-3 py-2">
                        {" "}
                        {details.bank_name}
                      </p>
                    </td>
                    <td className=" pr-2">
                      <p className="border-[3px] border-teal-400 rounded-2xl bg-popup-gray px-3 py-2">
                        {" "}
                        {details.acc}
                      </p>
                    </td>
                    <td className=" pr-2">
                      <p className="border-[3px] border-teal-400 rounded-2xl bg-popup-gray px-3 py-2">
                        {" "}
                        {details.ifsc}
                      </p>
                    </td>
                    <td className=" pr-2">
                      <p className="border-[3px] border-teal-400 rounded-2xl bg-popup-gray px-3 py-2">
                        {" "}
                        {details.accname}
                      </p>
                    </td>
                  </tr>
                ))}
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
      {addbankaccount && (
        <AddBankAccount onclose={() => setAddBankAccount(false)} />
      )}
    </>
  );
};

export default BankDetails;
