import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../../Host";
import { toast } from "react-toastify";
import { AiOutlineLoading } from "react-icons/ai";
// import { ThemeContext } from "../../App";

const ListTopics = () => {
  const { state } = useLocation();
//   const {global,setGlobal} = useContext(ThemeContext);
  const [processing, setProcessing] = useState(false);
//   const { jsonData, mainTopic, type,lang } = state || {};
const mainTopic = "ai"
  const generatedText = {
    "generatedText": "```json\n{\n  \"ai\": [\n    {\n      \"title\": \"MERN Stack Development with AI Integration\",\n      \"subtopics\": [\n        {\"title\": \"Integrating AI models into React frontend\", \"theory\": \"\", \"youtube\": \"\", \"image\": \"\", \"done\": false},\n        {\"title\": \"Building AI-powered APIs with Node.js and Express\", \"theory\": \"\", \"youtube\": \"\", \"image\": \"\", \"done\": false},\n        {\"title\": \"Deploying MERN stack AI applications to cloud platforms\", \"theory\": \"\", \"youtube\": \"\", \"image\": \"\", \"done\": false}\n      ]\n    },\n    {\n      \"title\": \"AI-powered features in MERN applications\",\n      \"subtopics\": [\n        {\"title\": \"Implementing AI-driven search functionality\", \"theory\": \"\", \"youtube\": \"\", \"image\": \"\", \"done\": false},\n        {\"title\": \"Using AI for image recognition and processing\", \"theory\": \"\", \"youtube\": \"\", \"image\": \"\", \"done\": false},\n        {\"title\": \"Building a chatbot with AI using Dialogflow or similar\", \"theory\": \"\", \"youtube\": \"\", \"image\": \"\", \"done\": false}\n      ]\n    },\n    {\n      \"title\": \"AI Model Training and Deployment within a MERN Stack\",\n      \"subtopics\": [\n        {\"title\": \"Setting up a machine learning pipeline using Python and MongoDB\", \"theory\": \"\", \"youtube\": \"\", \"image\": \"\", \"done\": false},\n        {\"title\": \"Training and deploying custom AI models using TensorFlow.js\", \"theory\": \"\", \"youtube\": \"\", \"image\": \"\", \"done\": false},\n        {\"title\": \"Model optimization and performance tuning for MERN applications\", \"theory\": \"\", \"youtube\": \"\", \"image\": \"\", \"done\": false}\n      ]\n    },\n    {\n      \"title\": \"Data Management and AI in MERN\",\n      \"subtopics\": [\n        {\"title\": \"Designing efficient database schemas for AI-related data in MongoDB\", \"theory\": \"\", \"youtube\": \"\", \"image\": \"\", \"done\": false},\n        {\"title\": \"Data preprocessing and cleaning for AI model training\", \"theory\": \"\", \"youtube\": \"\", \"image\": \"\", \"done\": false},\n        {\"title\": \"Implementing data security and privacy measures for AI applications\", \"theory\": \"\", \"youtube\": \"\", \"image\": \"\", \"done\": false}\n      ]\n    }\n  ]\n}\n```\n"
}
const cleanedJsonString = generatedText.generatedText
        .replace(/```json/g, "")
        .replace(/```/g, "");
        const parsedJson = JSON.parse(cleanedJsonString);
    const jsonData = parsedJson;
    console.log(jsonData);
    
  const navigate = useNavigate();

  useEffect(() => {
    if (!jsonData) {
      navigate("/create");
    }
  }, []);

  const redirectform = () => {
    navigate("/create");
  };

  function redirectCourse() {
    const mainTopicData = jsonData[mainTopic][0];

    const firstSubtopic = mainTopicData.subtopics[0];

    if (type === "video & text course") {
      const query = `${firstSubtopic.title} ${mainTopic} in english`;
      sendVideo(query, firstSubtopic.title);
      setProcessing(true);
    } else {
        const prompt = `Strictly in ${lang}, Explain me about this subtopic of ${mainTopic} with examples :- ${firstSubtopic.title}. Please Strictly Don't Give Additional Resources And Images.`;
        const promptImage = `Example of ${firstSubtopic.title} in ${mainTopic}`;
      setProcessing(true);
      sendPrompt(prompt, promptImage);
    }
  }

  async function sendPrompt(prompt, promptImage) {
    const dataToSend = {
      prompt: prompt,
    };
    try {
      const postURL = API + "/api/generate";
      const res = await axios.post(postURL, dataToSend);
      const generatedText = res.data.text;
      const htmlContent = generatedText;

      try {
        const parsedJson = htmlContent;
        sendImage(parsedJson, promptImage);
      } catch (error) {
        sendPrompt(prompt, promptImage);
      }
    } catch (error) {
      sendPrompt(prompt, promptImage);
    }
  }

  async function sendImage(parsedJson, promptImage) {
    const dataToSend = {
      prompt: promptImage,
    };
    try {
      const postURL = API + "/api/image";
      const res = await axios.post(postURL, dataToSend);
      try {
        const generatedText = res.data.url;
        sendData(generatedText, parsedJson);
        //setProcessing(false);
      } catch (error) {
        sendImage(parsedJson, promptImage);
      }
    } catch (error) {
      sendImage(parsedJson, promptImage);
    }
  }

  async function sendData(image, theory) {
    jsonData[mainTopic][0].subtopics[0].theory = theory;
    jsonData[mainTopic][0].subtopics[0].image = image;

    const user = localStorage.getItem("user");
    const fname = localStorage.getItem('fname');
    const email = localStorage.getItem('email');
    const phone = localStorage.getItem('phone');
    const lname = localStorage.getItem('lname');
    const content = JSON.stringify(jsonData);
    const postURL = API + "/api/course";
    const response = await axios.post(postURL, {
      user,
      content,
      fname,
      lname,
      email,
      phone,
      type,
      mainTopic,
      lang
    });

    if (response.data.success) {
      toast.success(response.data.message);
      localStorage.setItem("courseId", response.data.courseId);
      localStorage.setItem("first", response.data.completed);
      localStorage.setItem("jsonData", JSON.stringify(jsonData));
      navigate("/content", {
        state: {
          jsonData: jsonData,
          mainTopic: mainTopic.toUpperCase(),
          type: type.toLowerCase(),
          courseId: response.data.courseId,
          end: "",
          pass:false,
          lang
        },
      });
      const formData ={
        user:user,
        subject:`Course Creation Confirmation`,
        description:`Your course ${mainTopic} has been successfully created!`
      }
      await axios.post(`${API}/api/notify`,formData)
      setGlobal(!global)
    } else {
      sendData(image, theory);
    }
  }

  async function sendDataVideo(image, theory) {
    jsonData[mainTopic][0].subtopics[0].theory = theory;
    jsonData[mainTopic][0].subtopics[0].youtube = image;

    const user = localStorage.getItem("user");
    const fname = localStorage.getItem('fname');
    const email = localStorage.getItem('email');
    const phone = localStorage.getItem('phone');
    const lname = localStorage.getItem('lname');
    const content = JSON.stringify(jsonData);
    const postURL = API + "/api/course";
    const response = await axios.post(postURL, {
      user,
      fname,
      lname,
      email,
      phone,
      content,
      type,
      mainTopic,
      lang
    });

    if (response.data.success) {
      toast.success(response.data.message);
      localStorage.setItem("courseId", response.data.courseId);
      localStorage.setItem("first", response.data.completed);
      localStorage.setItem("jsonData", JSON.stringify(jsonData));
      setProcessing(false)
      navigate("/content", {
        state: {
          jsonData: jsonData,
          mainTopic: mainTopic.toUpperCase(),
          type: type.toLowerCase(),
          courseId: response.data.courseId,
          end: "", pass: false,
           lang
        },
      });

      const formData ={
        user:user,
        subject:`Course Creation Confirmation`,
        description:`Your course ${mainTopic} has been successfully created!`
      }
      await axios.post(`${API}/api/notify`,formData)
      setGlobal(!global)
    } else {
      sendDataVideo(image, theory);
    }
  }

  async function sendVideo(query, subtopic) {
    const dataToSend = {
      prompt: query,
    };
    try {
      const postURL = API + "/api/yt";
      const res = await axios.post(postURL, dataToSend);

      try {
        const generatedText = res.data.url;
        sendTranscript(generatedText, subtopic);
      } catch (error) {
        sendVideo(query, subtopic);
      }
    } catch (error) {
      sendVideo(query, subtopic);
    }
  }

  async function sendTranscript(url, subtopic) {
    const dataToSend = {
      prompt: url,
    };
    try {
      const postURL = API + "/api/transcript";
      const res = await axios.post(postURL, dataToSend);

      try {
        const generatedText = res.data.url;
        const allText = generatedText.map((item) => item.text);
        const concatenatedText = allText.join(" ");
        const prompt = `Strictly in ${lang}, Summarize this theory in a teaching way and :- ${concatenatedText}.`;
        sendSummery(prompt, url);
      } catch (error) {
        const prompt = `Strictly in ${lang}, Explain me about this subtopic of ${mainTopic} with examples :- ${subtopic}. Please Strictly Don't Give Additional Resources And Images.`;
        sendSummery(prompt, url);
      }
    } catch (error) {
        const prompt = `Strictly in ${lang}, Explain me about this subtopic of ${mainTopic} with examples :- ${subtopic}. Please Strictly Don't Give Additional Resources And Images.`;
      sendSummery(prompt, url);
    }
  }

  async function sendSummery(prompt, url) {
    const dataToSend = {
      prompt: prompt,
    };
    try {
      const postURL = API + "/api/generate";
      const res = await axios.post(postURL, dataToSend);
      const generatedText = res.data.text;
      const htmlContent = generatedText;

      try {
        const parsedJson = htmlContent;
       // setProcessing(false);
        sendDataVideo(url, parsedJson);
      } catch (error) {
        sendSummery(prompt, url);
      }
    } catch (error) {
      sendSummery(prompt, url);
    }
  }

  const renderTopicsAndSubtopics = (topics) => {
    try {
        return (
            <div>
                {topics && topics.map((topic) => (
                    <div key={topic.title}>
                        <h3 className=' text-sm font-medium px-4 py-1.5 mt-4 bg-teal-500 border border-teal-500 text-slate-800'>{topic.title}</h3>
                        <div>
                            {topic.subtopics.map((subtopic) => (
                                <p className='text-sm font-extralight py-1.5 px-4 border' key={subtopic.title}>{subtopic.title}</p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        ); 
    } catch (error) {
        return (
            <div>
                {topics.map((topic) => (
                    <div key={topic.title}>
                        <h3 className=' text-sm font-medium px-4 py-1.5 mt-4 bg-teal-500 border-teal-500 text-slate-800'>{topic.title}</h3>
                        <div>
                            {topic.subtopics.map((subtopic) => (
                                <p className=' text-sm font-extralight py-1.5 px-4 border' key={subtopic.title}>{subtopic.title}</p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
};

  return (
    <div className=" text-lg  text-white mx-12 my-5">
        <h1 className="text-xl font-semibold mb-2">Generate Course</h1>
        <div className="h-0.5 w-full -translate-y-2/4 bg-gray-400 mb-8"></div>
      <p className="text-xl font-medium my-1 mt-6">{mainTopic.toUpperCase()}</p>
      <p className="text-sm my-2">
      Below is the list of Subtopics and chapters which your course will cover
      </p>
      {jsonData && mainTopic in jsonData ? (
            renderTopicsAndSubtopics(jsonData[mainTopic])
        ) : (
            <p className="text-red-500">No topics available for the selected main topic.</p>
        )}

      <div className=" flex flex-row justify-center gap-3 mt-5">
        <button
          className={` text-base bg-white text-black w-48 py-2  font-normal `}
          onClick={redirectform}
        >
          Back
        </button>
        <button
          className={` text-base bg-teal-500 w-48 py-2  font-normal `}
           onClick={navigate('/content')}
        >
          {processing ?  <span className="flex justify-center gap-3"> <AiOutlineLoading className="h-6 w-6 animate-spin" /> <p>Generating ....</p></span> : "Generate Course" }
        </button>
      </div>
    </div>
  );
};

export default ListTopics;
