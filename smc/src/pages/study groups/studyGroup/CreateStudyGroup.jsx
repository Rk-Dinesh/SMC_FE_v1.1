import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../../Host";
import { useNavigate } from "react-router-dom";
import MultiSelect from "../../../components/multipleselect";
import { useAppStore } from "../../../store";
import { useSocket } from "../../../Context/SocketContext";
import { AiOutlineLoading } from "react-icons/ai";

const CreateStudyGroup = () => {
  const navigate = useNavigate();
  const { addChannel } = useAppStore();
  const socket = useSocket();
  const [selectedValue, setSelectedValue] = useState("public");
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [allContacts, setAllContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [processing, setProcessing] = useState(false);
  const user = localStorage.getItem("user");

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${API}/all-contacts`);
      

      const allContacts = response.data.contacts.filter(
        (contact) => contact.value !== user
      );
      setAllContacts(allContacts);
    };
    getData();
  }, []);

  const validateStep = () => {
    const newErrors = {};
    if (currentStep === 1 && !groupName.trim()) {
      newErrors.groupName = "Group name is required.";
    }
    if (currentStep === 2 && !selectedValue) {
      newErrors.selectedValue = "Choose Visibility.";
    }
    if (currentStep === 3 && !selectedContacts) {
      newErrors.selectedContacts = "Contacts is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
    setErrors({});
  };

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const steps = [
    {
      id: 1,
      title: "Group Name",
      content: (
        <div className="lg:w-4/6 md:w-4/6 w-full mx-auto mt-12">
          <p className="text-lg text-center font-semibold">
            Launch Your Learning Squad: Enter Group Name.
          </p>
          <p className="text-sm text-center font-extralight my-3">
            “Enter a name for your study group. This will be the hub where you
            and your peers come together to learn and grow.”
          </p>
          <div className="flex flex-col lg:w-5/6 md:w-5/6 w-full mx-auto mt-4">
            <label htmlFor="fname">Enter Your Group Name</label>
            <input
              type="text"
              placeholder="Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className={`py-2 -mx-2 my-2 rounded-md px-4 text-black shadow-md outline-none bg-white ${
                errors.topicName ? "border-red-500 border" : ""
              }`}
            />
            {errors.groupName && (
              <p className="text-red-500 text-xs">{errors.groupName}</p>
            )}
          </div>
          <div className="flex flex-col lg:w-5/6 md:w-5/6 w-full mx-auto mt-4">
            <label htmlFor="fname">Description</label>
            <textarea
              rows={4}
              cols={50}
              maxLength={200}
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`py-2 -mx-2 my-2 rounded-md px-4 text-black shadow-md outline-none bg-white ${
                errors.topicName ? "border-red-500 border" : ""
              }`}
            />
            {errors.groupName && (
              <p className="text-red-500 text-xs">{errors.groupName}</p>
            )}
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: "Group Visibilty",
      content: (
        <div className="lg:w-4/6 md:w-4/6 w-full mx-auto mt-12">
          <h2 className="text-lg text-center font-semibold mb-2">
            Control Your Access: Public or Private Group?
          </h2>
          <p className="text-sm text-center font-extralight my-3">
            "Control who can join your group. Select 'Public' to allow anyone to
            join, or 'Private' to limit access to invited members."
          </p>
          <div className="flex flex-col space-y-2 mt-2">
            <div className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="value"
                id="public"
                value="public"
                onChange={handleRadioChange}
                checked={selectedValue === "public"}
                className="hidden peer"
              />
              <label
                htmlFor="public"
                className="flex items-center cursor-pointer"
              >
                <span className="w-4 h-4 border-2 border-teal-300 rounded-full flex items-center justify-center peer-checked:border-blue-500 peer-checked:bg-blue-500">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      selectedValue === "public" ? "bg-teal-300" : "hidden"
                    }`}
                  ></span>
                </span>
                <span className="ml-2 font-extralight">Public</span>
              </label>
            </div>
            <div className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="value"
                id="private"
                value="private"
                onChange={handleRadioChange}
                checked={selectedValue === "private"}
                className="hidden peer"
              />
              <label
                htmlFor="private"
                className="flex items-center cursor-pointer"
              >
                <span className="w-4 h-4 border-2 border-teal-300 rounded-full flex items-center justify-center peer-checked:border-blue-500 peer-checked:bg-blue-500">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      selectedValue === "private" ? "bg-teal-300" : "hidden"
                    }`}
                  ></span>
                </span>
                <span className="ml-2 font-extralight">Private</span>
              </label>
            </div>
          </div>
          {errors.selectedValue && (
            <p className="text-red-500 text-xs">{errors.selectedValue}</p>
          )}
        </div>
      ),
    },
    {
      id: 3,
      title: "Group Members",
      content: (
        <div className="lg:w-4/6 md:w-4/6 w-full mx-auto">
          <p className="text-lg text-center font-semibold">
            Expand Your Knowledge Squad: Add Member Emails
          </p>
          <p className="text-sm text-center font-extralight my-3">
            "Build your learning community. Enter the email addresses of the
            people you want to invite to your group."
          </p>
          <div className="flex flex-col w-5/6 mx-auto mt-4">
            <MultiSelect
              options={allContacts}
              selectedOptions={selectedContacts}
              setSelectedOptions={setSelectedContacts}
            />
            {errors.selectedContacts && (
              <p className="text-red-500 text-xs">{errors.selectedContacts}</p>
            )}
          </div>
        </div>
      ),
    },
  ];

  const currentStepData = steps.find((step) => step.id === currentStep);

  const handleSubmit = async () => {
    setProcessing(true);

    const formData = {
      userId: localStorage.getItem("user"),
      name: groupName,
      members: [user, ...selectedContacts],
      desc: description,
      visibility: selectedValue,
    };

    const response = await axios.post(`${API}/create-channel`, formData);
    setProcessing(false);
    setSelectedContacts([]);
    addChannel(response.data.channel);
    socket.emit("add-channel-notify", response.data.channel);
    navigate("/study_group");
  };
  return (
    <div className="text-white w-full">
      <h1 className="lg:text-xl md:text-xl text-base font-semibold mb-2">
        Create Study Group
      </h1>
      <div className="h-0.5 w-full -translate-y-2/4 bg-white mb-8"></div>
      <div className="flex justify-around lg:w-4/6 md:w-4/6 w-full my-3 mx-auto">
        {steps.map((step) => (
          <React.Fragment key={step.id}>
            <p className="text-xs">{step.title}</p>
          </React.Fragment>
        ))}
      </div>
      <div className="flex items-center justify-between  lg:w-3/6 md:w-3/6 w-full mb-6 mt-3 mx-auto">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${
                  currentStep >= step.id ? "bg-teal-500" : "bg-gray-500"
                }`}
              >
                {step.id}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 flex-grow ${
                  currentStep > step.id ? "bg-teal-500" : "bg-gray-500"
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="w-5/6 mx-auto">{currentStepData.content}</div>
      <div className="mt-6 flex justify-center space-x-3">
        <button
          className="px-8 py-1.5 rounded-md border border-white text-white hover:bg-gray-800 transition duration-300"
          type="button"
          onClick={handleBack}
          disabled={currentStep === 1}
        >
          Back
        </button>
        {currentStep === steps.length ? (
          <button
            className="px-8 py-1.5 rounded-md bg-teal-500 text-white hover:bg-teal-600 transition duration-300"
            type="button"
            onClick={handleSubmit}
            //disabled={Object.keys(errors).length > 0}
            disabled={processing}
          >
            {processing ? (
              <span className="flex justify-center gap-3">
                {" "}
                <AiOutlineLoading className="h-6 w-6 animate-spin" />{" "}
                <p>Creating ....</p>
              </span>
            ) : (
              "Submit"
            )}
          </button>
        ) : (
          <button
            className="px-8 py-1.5 rounded-md bg-teal-500 text-white hover:bg-teal-600 transition duration-300"
            type="button"
            onClick={handleNext}
            //disabled={Object.keys(errors).length > 0}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateStudyGroup;
