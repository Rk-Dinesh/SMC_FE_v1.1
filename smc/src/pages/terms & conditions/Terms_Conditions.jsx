import React, { useState } from "react";

const tabData = {
  "Terms Of Services": {
    title: "Terms & Conditions",
    lastUpdate: "01-Jan-2025",
    sections: [
      {
        heading: "What is Lorem Ipsum?",
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...",
      },
      {
        heading: "Why do we use it?",
        content:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout...",
      },
    ],
  },
  "Privacy Policy": {
    title: "Privacy Policy",
    lastUpdate: "05-Jan-2025",
    sections: [
      {
        heading: "How we handle your data?",
        content:
          "We collect minimal user data to provide a better experience. Your data is stored securely and is never shared with third parties.",
      },
      {
        heading: "User Consent",
        content:
          "By using our service, you consent to our privacy practices outlined in this policy.",
      },
    ],
  },
};

const Terms_Conditions = () => {
  const [activeTab, setActiveTab] = useState("Terms Of Services");
  const currentTab = tabData[activeTab];

  return (
    <div>
      <div className="h-screen text-white">
        <div className="flex bg-darkgray py-4 px-2 rounded-2xl gap-4 mb-3">
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "Terms Of Services"
                ? "bg-teal-400 text-black"
                : " border-white border text-white"
            }`}
            onClick={() => setActiveTab("Terms Of Services")}
          >
            Terms Of Service
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "Privacy Policy"
                ? "bg-teal-400 text-black"
                : " border-white border text-white"
            }`}
            onClick={() => setActiveTab("Privacy Policy")}
          >
            Privacy Policy
          </button>
        </div>

        <div className="bg-darkgray px-3 py-5  rounded-2xl">
          <div className="pt-1.5 pb-5">
            <p className="text-xl font-light">{currentTab.title}</p>
            <p>
              Last Update on : <span>{currentTab.lastUpdate}</span>
            </p>
          </div>
          {currentTab.sections.map((section, index) => (
            <div className="py-3" key={index}>
              <p className="text-2xl font-semibold py-1">{section.heading}</p>
              <p>{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Terms_Conditions;
