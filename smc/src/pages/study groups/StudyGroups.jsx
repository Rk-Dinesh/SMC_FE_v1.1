import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import IMG from "../../assets/images/courses.jpeg";
import PaginationBar from "../../components/PaginationBar";
import { StudyGroupData } from "../../components/Data";
import { useNavigate } from "react-router-dom";
import { API, formatDate } from "../../Host";
import axios from "axios";
import MultiSelect from "../../components/multipleselect";
import { useAppStore } from "../../store";
import { useSocket } from "../../Context/SocketContext";

const StudyGroups = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const totalItems = 30;
  const [isOpen, setIsOpen] = useState(false);
  const [allContacts, setAllContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [groupName, setGroupName] = useState({});
  const [description, setDescription] = useState("");
  const { addChannel } = useAppStore();
  const socket = useSocket();
  const userId = localStorage.getItem("user");  
  const [loading, setLoading] = useState(false)
  const {
    channels,
    setChannels,
    setSelectedChatType,
    setSelectedChatData,
    selectedChatData,
    setSelectedChatMessages,
  } = useAppStore();

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${API}/all-contacts`);
      setAllContacts(response.data.contacts);
    };
    getData();
  }, []);

  useEffect(() => {
    const getChannels = async () => {
      const response = await axios.get(
        `${API}/get-user-channels?userId=${userId}`
      );

      if (response.data.channels) {
        setChannels(response.data.channels);
      }
    };
    getChannels();
  }, [setChannels]);

  const createChannel = async () => {
    setLoading(true);
    const formData = {
      userId: localStorage.getItem("user"),
      name: groupName,
      members: selectedContacts,
      desc: description,
    };

    const response = await axios.post(`${API}/create-channel`, formData);

    setIsOpen(false);
    setLoading(false);
    setSelectedContacts([]);
    addChannel(response.data.channel);
    socket.emit("add-channel-notify", response.data.channel);
  };

  const handleClick = (contact) => {
    setSelectedChatType("channel");
    setSelectedChatData(contact);
    if (selectedChatData && selectedChatData._id !== contact._id) {
      setSelectedChatMessages([]);
    }
    navigate("/view_group");
  };

  return (
    <>
      <div className="font-poppins ">
        <div className="text-white text-nowrap flex  items-center border-b  pl-2 border-white">
          <p>My Study Groups</p>
          <div className="flex justify-end items-center gap-2 w-full px-2 ">
            <div className=" flex justify-end items-center w-fit place-self-end border border-darkgray bg-darkgray rounded-full  py-2 px-3 my-2 text-white">
              <input
                type="text"
                className=" outline-0 placeholder:text-white placeholder:text-sm px-2"
                placeholder="Search by group name"
              />
              <Search className="size-6 stroke-3" />
            </div>
            <button
              className="bg-teal-500 px-4 py-1.5 rounded-lg "
              onClick={() => setIsOpen(true)}
            >
              {" "}
              + Create Group
            </button>
          </div>
        </div>

        <div className="flex justify-center ">
          <div className="grid grid-cols-12 gap-2  ">
            {channels &&
              channels.map((data, index) => (
                <div className="lg:col-span-4 md:col-span-6 col-span-6 mx-1 my-1 bg-darkgray pb-3 p-0.5  text-gray-200 rounded-4xl ">
                  <img src={IMG} alt="Course" className="rounded-4xl p-2" />

                  <div className="text-sm font-light px-2" key={index}>
                    <p>{data.name}</p>
                    <p>
                      <span className="pr-1">
                        Date Created : {formatDate(data.createdAt)}
                      </span>
                      {data.date}
                    </p>
                    <p>
                      <span className="">Description : {data.desc}</span>
                    </p>
                    <p>
                      <span className="pr-1">Creator : </span>
                      {data.creator}
                    </p>
                    <p>
                      <span className="">
                        No of Learners : {data.members.length}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-2 mt-4 justify-center">
                    <button
                      onClick={() => handleClick(data)}
                      className=" cursor-pointer bg-teal-400 text-black px-6 py-0.5 rounded-sm text-sm "
                    >
                      View Group
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="left-0 py-2">
          <PaginationBar
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            onItemsPerPageChange={setItemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-darkgray text-white rounded-xl p-8 w-full max-w-md relative flex flex-col">
            <p
              className="cursor-pointer absolute -top-2 shadow-xl -right-2 text-white bg-popup-gray px-2 py-0.5 rounded-full text-xl"
              onClick={() => setIsOpen(false)}
            >
              X
            </p>
            <h3 className="text-lg font-semibold mb-3">Create Group</h3>
            <label htmlFor="group"> Group Name :</label>
            <input
              type="text"
              placeholder="Group Name"
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 my-2"
            />{" "}
            <label htmlFor="group"> Description :</label>
            <input
              type="text"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 my-2"
            />
            <label htmlFor="contacts" className="my-2">
              Select Contacts:
            </label>
            <MultiSelect
              options={allContacts}
              selectedOptions={selectedContacts}
              setSelectedOptions={setSelectedContacts}
            />
            <button
              onClick={() => createChannel()}
              className=" w-full py-1.5  bg-teal-500 hover:bg-teal-900 transition-all duration-300 mt-4 rounded-xl"
            >
             {loading ? "Creating..." : "Create Group"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default StudyGroups;
