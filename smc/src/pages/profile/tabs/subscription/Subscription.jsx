import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../../../Host";

const Subscription = ({ user }) => {
  const [subscription, setSubscription] = useState({});

  const userId = localStorage.getItem("user");

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${API}/api/getsubsbyid?user=${userId}`);

      const info = response.data.sub[0];
      console.log(info);
      
      setSubscription(info);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const data = [
    {
      date: "01-Jan-2025",
      plan: "Free",
      amount: "INR 999.00",
      transactionId: "uyautsiusiusitsatsigsiugis",
    },
  ];

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-4">
          <p className="text-base mb-2">Active Subscription:</p>
          <div className="space-y-6 text-sm p-4 rounded-lg bg-popup-gray text-white">
            <div>
              <p>
                Plan Name: <span className="font-medium">Basic</span>
              </p>
              <p>
                Courses Generated: <span className="font-medium">12</span>
              </p>
              <p>
                Courses Left: <span className="font-medium">22</span>
              </p>
              <p>
                Plan Expiry: <span className="font-medium">01-Mar-2026</span>
              </p>
              <p>
                Purchase Date: <span className="font-medium">01-Mar-2025</span>
              </p>
            </div>
            <div>
              <p className="pb-2 font-semibold">Plan Features</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Generate 10 Courses / Year</li>
                <li>Theory & Image Course</li>
                <li>Up to 10 Subtopics</li>
                <li>Theory & Video Course</li>
                <li>AI Tutor for doubt solving</li>
                <li>Create / Join Study Groups</li>
                <li>Export Course as PDF</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="md:col-span-8">
          <p className="text-base mb-2">Subscription Plan:</p>
          <div className="overflow-x-auto">
            <table className="w-full bg-popup-gray  text-white rounded-2xl">
              <thead>
                <tr className="border-b border-amber-50 text-left">
                  <th className="p-4 border-r">Date</th>
                  <th className="p-4 border-r">Plan</th>
                  <th className="p-4 border-r">Amount</th>
                  <th className="p-4 border-r">Transaction ID</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, idx) => (
                  <tr key={idx} className="border-t border-gray-600">
                    <td className="p-4 border-r">{item.date}</td>
                    <td className="p-4 border-r">{item.plan}</td>
                    <td className="p-4 border-r">{item.amount}</td>
                    <td className="p-4 border-r break-all">
                      {item.transactionId}
                    </td>
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
