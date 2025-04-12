import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../Host";
import { ThemeContext } from "../../App";

const Notifications = () => {
  const {global,setGlobal} = useContext(ThemeContext);
  const user= localStorage.getItem("user");


  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `${API}/api/getnotifybyid?user=${user}`
        );
        setNotifications(response.data.notify);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
   
    const fetchNotificationUpdate = async () => {
      try {
        const response = await axios.put(
          `${API}/api/updatenotify?user=${user}`
        );
        setGlobal(!global)
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotifications();
    fetchNotificationUpdate();
  }, []);



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
