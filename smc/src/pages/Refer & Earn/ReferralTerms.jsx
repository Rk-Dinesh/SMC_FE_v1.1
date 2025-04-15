import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../Host";
import StyledText from "../../components/StyledText";

const ReferralTerms = () => {
  const [referral, setReferral] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReferralTerms = async () => {
      try {
        const response = await axios.get(`${API}/api/policies`);
        setReferral(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchReferralTerms();
  }, []);

  return (
    <div className="font-poppins bg-darkgray text-gray-100 p-6 rounded-4xl">
      <div className="mx-2 my-2 space-y-4">
        <p className="text-xl font-medium py-2">
          Seek MY Course Referral Program Terms
        </p>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : referral?.refer?.trim() ? (
          <StyledText text={referral.refer} />
        ) : (
          <p className="text-red-500 font-semibold text-lg text-center">No data found!</p>
        )}
      </div>
    </div>
  );
};

export default ReferralTerms;
