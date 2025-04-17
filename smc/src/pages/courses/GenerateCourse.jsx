import React, { useEffect, useState } from "react";

import { API } from "../../Host";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";

const GenerateCourse = () => {
  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "Hindi" }
  ];
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState("4");
  const [selectedType, setSelectedType] = useState("Text & Image Course");
  const [topicName, setTopicName] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const [errors, setErrors] = useState({});

  const [currentStep, setCurrentStep] = useState(1);

  const [processing, setProcessing] = useState(false);
  const [paidMember, setPaidMember] = useState(false);
  const [courses, setCourses] = useState([]);
  const [Count, setCount] = useState(0);


  let type = localStorage.getItem("type");
  const user = localStorage.getItem("user");

  useEffect(() => {
    const fetchData = async () => {
      const userType = localStorage.getItem("type");
    
      
      if (userType !== "free") {
        setPaidMember(true);
        await getCount();
        await getCourse();
      } else {
        await getCourse();
      }
    };

    fetchData();
  }, []);

  async function getCount() {
    const postURL = API + `/api/getcountplan?user=${user}`;
    try {
      const response = await axios.get(postURL);
      const responseData = response.data;
      setCount(responseData[0].count);
    } catch (error) {}
  }

  async function getCourse() {
    const postURL = API + `/api/courses?userId=${user}`;
    try {
      const response = await axios.get(postURL);
      setCourses(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const updateCount = async () => {
    const dataToSend = {
      user: localStorage.getItem("user"),
    };

    const postURL = API + "/api/updatecount";
    try {
      const response = await axios.post(postURL, dataToSend);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleRadioChangeType = (event) => {
    setSelectedType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subtopics = [];
    setProcessing(true);

    const mainTopic = topicName;
  

    if (!mainTopic.trim()) {
      setProcessing(false);
      toast.error("Please fill in all required fields");
      return;
    }

   const lang = selectedLanguage;

    const prompt = `Strictly in ${lang}, Generate a list of Strict ${selectedValue} topics and any number sub topic for each topic for main title ${mainTopic.toLowerCase()}, everything in single line. Those ${selectedValue} topics should Strictly include these topics :- ${subtopics
      .join(", ")
      .toLowerCase()}. Strictly Keep theory, youtube, image field empty. Generate in the form of JSON in this format {
      "${mainTopic.toLowerCase()}": [
 {
 "title": "Topic Title",
 "subtopics": [
  {
  "title": "Sub Topic Title",
  "theory": "",
  "youtube": "",
  "image": "",
  "done": false
  },
  {
  "title": "Sub Topic Title",
  "theory": "",
  "youtube": "",
  "image": "",
  "done": false
  }
 ]
 },
 {
 "title": "Topic Title",
 "subtopics": [
  {
  "title": "Sub Topic Title",
  "theory": "",
  "youtube": "",
  "image": "",
  "done": false
  },
  {
  "title": "Sub Topic Title",
  "theory": "",
  "youtube": "",
  "image": "",
  "done": false
  }
 ]
 }
]
}`;

    sendPrompt(prompt, mainTopic, selectedType);
  
  };

  async function sendPrompt(prompt, mainTopic, selectedType) {
    const dataToSend = {
      prompt: prompt,
    };

    try {
      const res = await axios.post(`${API}/api/prompt`, dataToSend);
      const generatedText = res.data.generatedText;
      const cleanedJsonString = generatedText
        .replace(/```json/g, "")
        .replace(/```/g, "");
      try {
        const parsedJson = JSON.parse(cleanedJsonString);

        setProcessing(false);

        // Check the type of subscription and the end date before navigating
        if (type === "free" && courses.length >= 1) {
          toast.error("Please subscribe to access more courses.");
        } else if (type !== "free") {
          if (Count > 0) {
            await updateCount();
            navigate("/topics", {
              state: {
                jsonData: parsedJson,
                mainTopic: mainTopic.toLowerCase(),
                type: selectedType.toLowerCase(),
                lang:selectedLanguage,
              },
            });
          } else {
            toast.error(
              "Your monthly plan has reached the limit. Please upgrade the Monthly plan for further access"
            );
          }
        } else {
          navigate("/topics", {
            state: {
              jsonData: parsedJson,
              mainTopic: mainTopic.toLowerCase(),
              type: selectedType.toLowerCase(),
              lang:selectedLanguage,
            },
          });
        }
      } catch (error) {
        //sendPrompt(prompt, mainTopic, selectedType);
        console.log(error);
        
      }
    } catch (error) {
      //sendPrompt(prompt, mainTopic, selectedType);
    }
  }

  const validateStep = () => {
    const newErrors = {};
    if (currentStep === 1 && !topicName.trim()) {
      newErrors.topicName = "Topic name is required.";
    }
    if (currentStep === 2 && !selectedValue) {
      newErrors.selectedValue = "Number of subtopics is required.";
    }
    if (currentStep === 3 && !selectedLanguage) {
      newErrors.selectedLanguage = "Course language is required.";
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

  const steps = [
    {
      id: 1,
      title: "Course Topic",
      content: (
        <div className="lg:w-4/6 md:w-4/6 w-full mx-auto mt-12">
          <p className="text-lg text-center font-semibold">
            Ignite Your Curiosity: What Do You Want to Learn?
          </p>
          <p className="text-sm text-center font-extralight my-3">
            Define your learning focus. Input the topic you wish to study, and
            we will generate a course that is customized to your needs.
          </p>
          <div className="flex flex-col lg:w-5/6 md:w-5/6 w-full mx-auto mt-4">
            <label htmlFor="fname">Enter Your Topic Name</label>
            <input
              type="text"
              placeholder="Topic Name"
              value={topicName}
              onChange={(e) => setTopicName(e.target.value)}
              className={`py-2 -mx-2 my-2 rounded-md px-4 text-black shadow-md outline-none bg-white ${
                errors.topicName ? "border-red-500 border" : ""
              }`}
            />
            {errors.topicName && (
              <p className="text-red-500 text-xs">{errors.topicName}</p>
            )}
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: "No Of Subtopic",
      content: (
        <div className="lg:w-4/6 md:w-4/6 w-full mx-auto mt-12">
          <h2 className="text-lg text-center font-semibold mb-2">
            Tailor Your Focus: Number of Subtopics?
          </h2>
          <p className="text-sm text-center font-extralight my-3">
            Specify the number of subtopics you need. We'll break down the topic
            into manageable sections for effective learning.
          </p>
          <p className="font-light">Select No of Subtopics</p>
          <div className="flex flex-col space-y-2 mt-2">
            <div className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="value"
                id="4"
                value="4"
                onChange={handleRadioChange}
                checked={selectedValue === "4"}
                className="hidden peer"
              />
              <label htmlFor="4" className="flex items-center cursor-pointer">
                <span className="w-4 h-4 border-2 border-teal-300 rounded-full flex items-center justify-center peer-checked:border-blue-500 peer-checked:bg-blue-500">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      selectedValue === "4" ? "bg-teal-300" : "hidden"
                    }`}
                  ></span>
                </span>
                <span className="ml-2 font-extralight">05 Subtopics</span>
              </label>
            </div>
            <div className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="value"
                id="7"
                value="7"
                onChange={handleRadioChange}
                checked={selectedValue === "7"}
                className="hidden peer"
                disabled={type === "free"}
              />
              <label htmlFor="7" className="flex items-center cursor-pointer">
                <span className="w-4 h-4 border-2 border-teal-300 rounded-full flex items-center justify-center peer-checked:border-blue-500 peer-checked:bg-blue-500">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      selectedValue === "7" ? "bg-teal-300" : "hidden"
                    }`}
                  ></span>
                </span>
                <span className="ml-2 font-extralight">10 Subtopics</span>
              </label>
            </div>
          </div>
          {errors.selectedValue && (
            <p className="text-red-500 text-xs">{errors.selectedValue}</p>
          )}
          <p className="my-3 font-light">Choose your course content type</p>
          <div className="flex flex-col space-y-2 mt-3">
            <div className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="value1"
                id="textcourse"
                value="Text & Image Course"
                onChange={handleRadioChangeType}
                checked={selectedType === "Text & Image Course"}
                className="hidden peer"
              />
              <label
                htmlFor="textcourse"
                className="flex items-center cursor-pointer"
              >
                <span className="w-4 h-4 border-2 border-teal-300 rounded-full flex items-center justify-center peer-checked:border-blue-500 peer-checked:bg-blue-500">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      selectedType === "Text & Image Course"
                        ? "bg-teal-500"
                        : "hidden"
                    }`}
                  ></span>
                </span>
                <span className="ml-2 font-extralight">
                  Theory & Image Course
                </span>
              </label>
            </div>
            <div className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="value1"
                id="videocourse"
                value="Video & Text Course"
                onChange={handleRadioChangeType}
                checked={selectedType === "Video & Text Course"}
                className="hidden peer"
              />
              <label
                htmlFor="videocourse"
                className="flex items-center cursor-pointer"
              >
                <span className="w-4 h-4 border-2 border-teal-300 rounded-full flex items-center justify-center peer-checked:border-blue-500 peer-checked:bg-blue-500">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      selectedType === "Video & Text Course"
                        ? "bg-teal-500"
                        : "hidden"
                    }`}
                  ></span>
                </span>
                <span className="ml-2 font-extralight">
                  Video & Theory Course
                </span>
              </label>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: "Course Language",
      content: (
        <div className="lg:w-4/6 md:w-4/6 w-full mx-auto">
          <p className="text-lg text-center font-semibold">
            Speak Your Language: Select Your Course Language.
          </p>
          <p className="text-sm text-center font-extralight my-3">
            Personalize your learning experience by choosing your course
            language. We'll generate content that aligns with your linguistic
            preferences.
          </p>
          <div className="flex flex-col w-5/6 mx-auto mt-4">
            <label htmlFor="language" className="lg:w-4/5 md:w-4/5 w-full mx-auto mb-2">
              Course Language{" "}
            </label>
            <select
              className={`w-4/5 mx-auto px-4 py-2 border border-gray-500 rounded-md bg-white outline-none text-black ${
                errors.selectedLanguage ? "border-red-500" : ""
              }`}
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              <option value="">Select a language</option>
              {languages.map((country) => (
                <option key={country.code} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.selectedLanguage && (
              <p className="text-red-500 text-xs">{errors.selectedLanguage}</p>
            )}
          </div>
        </div>
      ),
    },
  ];

  const currentStepData = steps.find((step) => step.id === currentStep);

  return (
    <div className="text-white w-full">
      <h1 className="lg:text-xl md:text-xl text-base font-semibold mb-2">Generate Course</h1>
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
           {processing ? <span className="flex justify-center gap-3">
                         {" "}
                         <AiOutlineLoading className="h-6 w-6 animate-spin" />{" "}
                         <p>Generating ....</p>
                       </span> : "Submit"}
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

export default GenerateCourse;
