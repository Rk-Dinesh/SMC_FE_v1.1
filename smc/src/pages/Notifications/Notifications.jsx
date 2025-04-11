import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../Host";

const Notifications = () => {
  const userId = localStorage.getItem("userId");
  console.log(userId);

  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `${API}/api/getnotifybyid?user=${userId}`
      );
      setNotifications(response.data.notify);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  return (
    <>
      {notifications &&
        notifications.map((data, index) => (
          <div
            className="font-poppins bg-darkgray text-gray-100 p-6 rounded-lg space-y-1 mb-3 "
            key={index}
          >
            <p className="text-xl font-semibold">{data.subject}</p>
            <p className="text-base">
              Date:{" "}
              {new Date(data.createdAt)
                .toLocaleDateString("en-GB")
                .replaceAll("/", "-")}
            </p>

            <p className="text-justify">{data.description}</p>
          </div>
        ))}
    </>
  );
};

export default Notifications;
