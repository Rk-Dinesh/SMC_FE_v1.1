import React, { useEffect, useRef, useState } from "react";
import Invoice from "../../../../assets/images/Invoice.png";
import { useLocation } from "react-router-dom";
import { API, formatDate1 } from "../../../../Host";
import axios from "axios";

const Subscription_Invoice = () => {
  const [processing, setProcessing] = useState(false);
  const [invoice, setInvoice] = useState({});
  const pdfRef = useRef(null);
  const location = useLocation();
  const subId = location?.state?.subId;

  useEffect(() => {
    const fetchSubs = async () => {
      const postURL = API + `/api/getsubonid/${subId}`;
      try {
        const response = await axios.get(postURL);
        setInvoice(response.data.sub);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    };

    fetchSubs();
  }, [subId]);

  return (
    <div className="text-white p-3 flex flex-col items-center justify-center">
      {invoice && (
        <div className="bg-darkgray w-full max-w-3xl rounded-xl p-6 space-y-6 shadow-lg">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
            <div>
              <p className="text-sm">
                Invoice No : <span>{invoice.recieptId}</span>
              </p>
            </div>
            <div className="text-left md:text-right">
              <img src={Invoice} alt="Invoice" className="w-72" />
            </div>
          </div>

          <div className="text-sm leading-relaxed space-y-1">
            <p>
              <span>Product</span>: <span>SeekMYCOURSE</span> Subscription
            </p>
            <p>Plan: {invoice.plan}</p>
            <p>Billing Type: {invoice.duration}</p>
            <p>Purchase Date: {formatDate1(invoice.date)}</p>
            <p>Plan Expiry Date: 31-Dec-2025</p>
          </div>

          <div className="bg-popup-gray rounded-lg p-3 text-sm font-mono break-words overflow-hidden">
            Payment ID : {invoice.subscription}
          </div>

          <div className="overflow-x-auto whitespace-nowrap bg-popup-gray px-2 rounded-2xl">
            <table className="w-full text-sm text-left text-white">
              <thead className="text-gray-300 font-medium border-b border-gray-700">
                <tr>
                  <th className="py-2 mx-3">Services</th>
                  <th className="text-center px-3">Period</th>
                  <th className="text-right px-3">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="py-3">
                    <p className="underline">SeekMYCOURSE</p>
                    <p className="text-xs text-gray-400">Yearly Subscription</p>
                  </td>
                  <td className="text-center">01-Jan-2025 - 01-Jan-2026</td>
                  <td className="text-right">{invoice.method === "razorpay"
                  ? `₹${parseFloat(invoice.amount).toFixed(2)}`
                  : `$${parseFloat(invoice.amount).toFixed(2)}`}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="w-full sm:max-w-sm ml-auto">Payment Summary</p>
          <div className="bg-popup-gray rounded-lg p-4 text-sm space-y-2 w-full sm:max-w-sm ml-auto">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{invoice.method === "razorpay"
                  ? `₹${parseFloat(invoice.amount).toFixed(2)}`
                  : `$${parseFloat(invoice.amount).toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (GST)</span>
              <span>
                {invoice.method === "razorpay"
                  ? `₹${(
                      parseFloat(invoice.amount) *
                      (invoice.tax / 100)
                    ).toFixed(2)}`
                  : `$${(
                      parseFloat(invoice.amount) *
                      (invoice.tax / 100)
                    ).toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t border-gray-600 pt-2">
              <span>TOTAL</span>
              <span>
                {" "}
                {(() => {
                  const amount = parseFloat(invoice.amount);
                  const tax = amount * (invoice.tax / 100);
                  const grandTotal = amount + tax;

                  return invoice.method === "razorpay"
                    ? `₹${grandTotal.toFixed(0)}.00`
                    : `$${grandTotal.toFixed(0)}`;
                })()}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Download Button */}
      <div className="text-center mt-4">
        <button className="bg-teal-500 hover:bg-teal-600 transition-colors duration-200 text-black px-6 py-2 rounded-lg w-full sm:w-auto">
          Download Invoice
        </button>
      </div>
    </div>
  );
};

export default Subscription_Invoice;
