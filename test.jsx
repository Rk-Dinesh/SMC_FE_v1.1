const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState("4");
  const [selectedType, setSelectedType] = useState("Text & Image Course");
  const [processing, setProcessing] = useState(false);
  const [paidMember, setPaidMember] = useState(false);
  const [courses, setCourses] = useState([]);
  const [Count, setCount] = useState(0);
  const [lang, setLang] = useState('English');

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

  

    const mainTopic = document.getElementById("topic1").value;

    if (!mainTopic.trim()) {
      setProcessing(false);
      toast.error("Please fill in all required fields");
      return;
    }

    if (subtopics.length === 0) {
      setProcessing(false);
      toast.error("Please fill in all required fields");
      return;
    }

    const prompt = `Strictly in ${lang}, Generate a list of Strict ${selectedValue} topics and any number sub topic for each topic for main title ${mainTopic.toLowerCase()}, everything in single line. Those ${selectedValue} topics should Strictly include these topics :- ${subtopics.join(', ').toLowerCase()}. Strictly Keep theory, youtube, image field empty. Generate in the form of JSON in this format {
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
                lang
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
              lang
            },
          });
        }
      } catch (error) {
        //sendPrompt(prompt, mainTopic, selectedType);
      }
    } catch (error) {
      //sendPrompt(prompt, mainTopic, selectedType);
    }
  }