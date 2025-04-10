import React from "react";
import { NotificationData } from "../../components/Data";

const Notifications = () => {
  return (
    <>
      {NotificationData &&
        NotificationData.map((data, index) => (
          <div
            className="font-poppins bg-darkgray text-gray-100 p-6 rounded-lg space-y-1 mb-3 "
            key={index}
          >
            <p className="text-xl font-semibold">{data.heading}</p>
            <p className="text-base">Date: {data.date}</p>
            <p className="text-justify">{data.content}</p>
          </div>
        ))}
    </>
  );
};

export default Notifications;
