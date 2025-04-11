import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../Host";

const Terms_Conditions = () => {
  const [policies, setPolicies] = useState({});
  const [activeTab, setActiveTab] = useState("terms");
  const [noDataFound, setNoDataFound] = useState(false);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get(`${API}/api/policies`);
        const info = response.data.data;

        if (!info || Object.keys(info).length === 0) {
          setNoDataFound(true);
        } else {
          setPolicies(info);
          setNoDataFound(false);
        }
      } catch (error) {
        console.log(error);
        setNoDataFound(true);
      }
    };
    fetchPolicies();
  }, []);

  const tabOptions = {
    terms: "Terms of Service",
    privacy: "Privacy Policy",
  };

  return (
    <div className="text-white">
      <div className="flex bg-darkgray py-4 px-2 rounded-2xl gap-4 mb-3 flex-wrap">
        {Object.keys(tabOptions).map((key) => (
          <button
            key={key}
            className={`px-4 py-2 rounded-md ${
              activeTab === key
                ? "bg-teal-400 text-black"
                : "border-white border text-white"
            }`}
            onClick={() => setActiveTab(key)}
          >
            {tabOptions[key]}
          </button>
        ))}
      </div>

      <div className="bg-darkgray px-3 py-5 rounded-2xl">
        <div className="pt-1.5 pb-5">
          <p className="text-xl font-light">{tabOptions[activeTab]}</p>
        </div>

        {noDataFound ? (
          <p className="text-red-400">No data found.</p>
        ) : (
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{
              __html:
                policies[activeTab] && policies[activeTab].trim()
                  ? policies[activeTab]
                  : "<p>No content found.</p>",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Terms_Conditions;
