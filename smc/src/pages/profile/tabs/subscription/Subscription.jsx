import React from "react";

const Subscription = () => {
  const data = [
    {
      date: "01-Jan-2025",
      plan: "Free",
      amount: "INR 999.00",
      transactionId: "uyautsiusiusitsatsigsiugis",
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-3">
          <p className="col-span-3 px-2 text-base">Active Subscription:</p>
          <div className="col-span-3 space-y-6 text-sm p-1.5 rounded-lg bg-gray-700">
            <div>
              <p>
                Plan Name : <span>Basic</span>
              </p>
              <p>
                Courses Generated : <span>12</span>
              </p>
              <p>
                Courses Left : <span>22</span>
              </p>
              <p>
                Plan Expiry : <span> 01-Mar-2026</span>
              </p>
              <p>
                Purchase Date : <span>01-Mar-2025</span>
              </p>
            </div>
            <div className="col-span-3 ">
              <p className="pb-4">Plan Features</p>
              <span className="col-span-3">
                <p>Generate 10 Course / Year </p>
                <p>Theory & Image Course</p>
                <p>Up to 10 Subtopics</p>
                <p>Theory & Video Course</p>
                <p>AI Tutor for doubt solving</p>
                <p>Create / Join Study Groups</p>
                <p>Export Course as PDF</p>
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-9 ">
          <p className="col-span-9 px-2 text-base"> Subscription Plan:</p>
          <div className="col-span-8">
            <table className="w-full bg-gray-700 rounded-2xl">
              <thead>
                <tr className="border-b border-amber-50">
                  <th className=" pt-5 border-r">Date</th>
                  <th className=" pt-5 border-r">Plan</th>
                  <th className=" pt-5 border-r">Amount</th>
                  <th className=" pt-5 border-r">Transaction ID</th>
                  <th className="pt-5">Action</th>
                </tr>
              </thead>
              <tbody className="">
              {data.map((item, idx) => (
              <tr key={idx} className="border-t border-gray-700">
                <td className="p-4 border-r">{item.date}</td>
                <td className="p-4 border-r">{item.plan}</td>
                <td className="p-4 border-r">{item.amount}</td>
                <td className="p-4 break-words border-r">{item.transactionId}</td>
                <td className="p-4">
                  <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-1 px-4 rounded-lg">
                    View
                  </button>
                </td>
              </tr>
            ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
