import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import IMG from "../../assets/images/courses.jpeg";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import MessageContainer from "./MessageContainer";
import MessageBar from "./MessageBar";
import { useAppStore } from "../../store";
import axios from "axios";
import { API, formatDate } from "../../Host";

const ViewProfile = () => {
  const { selectedChatData } = useAppStore();
  const [User, setUser] = useState({});
  const [courses, setCourses] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${API}/api/getusersbyidchat?id=${selectedChatData._id}`
        );
        setUser(response.data.user.user);
        setCourses(response.data.user.course);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  const isValidUrl = (url) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)\\.)+[a-z]{2,}|" + // domain name
        "localhost|" + // localhost
        "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|" + // IP address
        "\\[?[a-f0-9]*:[a-f0-9:%.~+!$&'()*+,;=]*\\])" + // IPv6
        "(\\:\\d+)?(\\/[-a-z0-9+&@#\\/%?=~_|!:,.;]*[a-z0-9+&@#\\/%=~_|])?$",
      "i"
    ); // path
    return !!pattern.test(url);
  };

  return (
    <div className="font-poppins ">
      <div className="grid grid-cols-12 gap-4">
        {User && (
          <div className="lg:col-span-4 md:col-span-5 col-span-12 mx-1 my-1 bg-darkgray py-3 flex flex-col  items-center   text-gray-200 rounded-4xl ">
            <img
              src={IMG}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-teal-400 mt-2"
            />
            <div className="text-center py-4 font-light ">
              <p className="text-2xl">{`${User.fname} ${User.lname}`}</p>
              <p className="text-lg font-medium ">
                Learner Since:{" "}
                <span className="block text-lg">
                  {formatDate(User.verifyTokenExpires)}
                </span>
              </p>
              <p className="text-lg">No Of Courses Studied: {courses}</p>
            </div>
            <div className="px-2 overflow-auto max-h-[200px] h-fit w-full text-sm">
              <p className=" px-2 text-sm">
                BIO: {User.about || "No Info available"}
              </p>
            </div>
            <div className=" px-3 py-1 w-full mt-8">
              <p className="bg-teal-400 text-black px-6 py-3 text-center rounded-md text-lg font-normal">
                Block Users
              </p>
            </div>
            <div className="flex w-full px-5 items-center justify-center space-x-4 mt-8">
              {isValidUrl(User.facebook) && (
                <a
                  href={User.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF className="text-black bg-white rounded-full text-xl px-3.5 size-10 cursor-pointer" />
                </a>
              )}

              {isValidUrl(User.instagram) && (
                <a
                  href={User.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="text-black bg-white rounded-full text-xl px-3.5 size-10 cursor-pointer" />
                </a>
              )}

              {isValidUrl(User.twitter) && (
                <a
                  href={User.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter className="text-black bg-white rounded-full text-xl px-3.5 size-10 cursor-pointer" />
                </a>
              )}

              {isValidUrl(User.linkedIn) && (
                <a
                  href={User.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedinIn className="text-black bg-white rounded-full text-xl px-3.5 size-10 cursor-pointer" />
                </a>
              )}
            </div>
          </div>
        )}
        <div className=" lg:col-span-8 md:col-span-7 col-span-12">
          <div className="lg:top-0 md:top-0  lg:h-[870px] md:h-[700px] h-[600px]  bg-darkgray flex flex-col md:static md:flex-1  rounded-4xl">
            <MessageContainer />
            <MessageBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
