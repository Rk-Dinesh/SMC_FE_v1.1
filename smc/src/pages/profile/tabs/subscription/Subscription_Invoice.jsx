import React from "react";

const Subscription_Invoice = () => {
  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center p-4">
      <div className="bg-[#1e1e1e] w-full max-w-3xl rounded-xl p-6 space-y-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
          <div>
            <p className="text-sm font-medium">
              Invoice No : <span className="font-semibold">MCTLLP/01</span>
            </p>
          </div>
          <div className="text-left md:text-right">
            <h1 className="text-2xl font-bold text-cyan-400">{`</MORPHEUS>`}</h1>
            <p className="text-sm font-semibold text-gray-300">
              MORPHEUS CODE TECHNOLOGIES LLP
            </p>
          </div>
        </div>
        <div className="text-sm leading-relaxed space-y-1">
          <p>
            <span className="font-semibold">Product</span>:{" "}
            <span>SeekMYCOURSE</span> Subscription
          </p>
          <p>
            <span className="font-semibold">Plan</span>: Basic
          </p>
          <p>
            <span className="font-semibold">Billing Type</span>: Monthly
          </p>
          <p>
            <span className="font-semibold">Purchase Date</span>: 01-Jan-2025
          </p>
          <p>
            <span className="font-semibold">Plan Expiry Date</span>: 31-Dec-2025
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 text-sm font-mono break-words overflow-hidden">
          Payment ID : ggkaskgsagashsalaaslkaslk
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-white">
            <thead className="text-gray-300 font-medium border-b border-gray-700">
              <tr>
                <th className="py-2">Services</th>
                <th className="text-center">Period</th>
                <th className="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800">
                <td className="py-3">
                  <p className="underline">SeekMYCOURSE</p>
                  <p className="text-xs text-gray-400">Yearly Subscription</p>
                </td>
                <td className="text-center">01-Jan-2025 - 01-Jan-2026</td>
                <td className="text-right">₹1999.00</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 text-sm space-y-2 w-full sm:max-w-sm ml-auto">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹1999.00</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (GST)</span>
            <span>₹360.00</span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t border-gray-600 pt-2">
            <span>TOTAL</span>
            <span>₹2359.00</span>
          </div>
        </div>
        <div className="text-center">
          <button className="bg-teal-500 hover:bg-teal-600 transition-colors duration-200 text-black font-semibold px-6 py-2 rounded-lg w-full sm:w-auto">
            Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscription_Invoice;
