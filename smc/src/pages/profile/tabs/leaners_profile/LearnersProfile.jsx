import React, { useState } from "react";
import { RiPencilFill } from "react-icons/ri";
import ExpandableText from "../../../../components/ExpandableText";

const LearnersProfile = () => {
  const [editMode, setEditMode] = useState(false);

  const [profile, setProfile] = useState({
    learningGoals:
      "My primary goal is to become a highly skilled full-stack developer with a deep understanding of modern JavaScript frameworks, RESTful APIs, and cloud services. I aim to build scalable web applications that are both performant and user-friendly. Additionally, I want to sharpen my problem-solving skills and contribute to meaningful open-source projects.",
    experienceLevel:
      "I currently consider myself an intermediate-level developer. I have approximately 1.5 to 2 years of hands-on experience building web applications using the MERN stack. During this time, I have worked on small to mid-scale projects, collaborated with teams using Git/GitHub, and explored deployment using platforms like Vercel and Render. I'm now exploring backend systems in greater depth including Express middlewares, JWT auth, and server-side performance optimization.",
    resourceNeeds:
      "I'm looking for comprehensive, structured learning resources like in-depth video tutorials, guided real-world projects, and interactive coding challenges. Access to a strong community or mentor who can provide feedback on my code would be incredibly valuable. I would also benefit from articles, documentation, and hands-on labs that simulate real-world scenarios and emphasize best practices.",
    newSkillsTarget:
      "In the next few months, I want to develop fluency in DevOps fundamentals, such as Docker, Kubernetes, and setting up CI/CD pipelines using GitHub Actions or Jenkins. I also plan to dive deeper into testing libraries (Jest, React Testing Library), explore GraphQL, and get hands-on with TypeScript for type-safe applications. Additionally, I want to build expertise in using Redux Toolkit and advanced React concepts like custom hooks and performance profiling.",
    areaOfInterest:
      "I'm deeply interested in web development, particularly with the MERN stack. I also have a strong curiosity about integrating AI tools into apps, building real-time collaborative features, and contributing to impactful open-source projects. Exploring cloud-native technologies and serverless architecture is also on my radar.",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  

  return (
    <div>
      <div className="flex justify-end">
        <button
          className="flex items-center gap-1 text-lg text-gray-300 hover:text-white"
          onClick={() => setEditMode(!editMode)}
        >
          <RiPencilFill size={24} />
          {editMode ? "Cancel" : "Edit"}
        </button>
      </div>

      <div className="grid gap-4 grid-cols-2 text-white mt-4">
        <div className="flex flex-col gap-3">
          <div>
            <label>Learning Goals :</label>
            {editMode ? (
              <textarea
                name="learningGoals"
                value={profile.learningGoals}
                onChange={handleChange}
                className="bg-gray-700 rounded-md p-2 w-full"
                rows={6}
              />
            ) : (
              <ExpandableText text={profile.learningGoals} />
            )}
          </div>

          <div>
            <label>Experience Level :</label>
            {editMode ? (
              <textarea
                name="experienceLevel"
                value={profile.experienceLevel}
                onChange={handleChange}
                className="bg-gray-700 rounded-md p-2 w-full"
                rows={6}
              />
            ) : (
              <ExpandableText text={profile.experienceLevel} />        )}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label>Resource Needs :</label>
            {editMode ? (
              <textarea
                name="resourceNeeds"
                value={profile.resourceNeeds}
                onChange={handleChange}
                className="bg-gray-700 rounded-md p-2 w-full"
                rows={6}
              />
            ) : (
              <ExpandableText text={profile.resourceNeeds} />     
            )}
          </div>

          <div>
            <label>New Skills Target :</label>
            {editMode ? (
              <textarea
                name="newSkillsTarget"
                value={profile.newSkillsTarget}
                onChange={handleChange}
                className="bg-gray-700 rounded-md p-2 w-full"
                rows={6}
              />
            ) : (
              <ExpandableText text={profile.newSkillsTarget} />     
            )}
          </div>
        </div>
        <div className="col-span-2">
          <div>
            <label>Area of Interest :</label>
            {editMode ? (
              <textarea
                name="areaOfInterest"
                value={profile.areaOfInterest}
                onChange={handleChange}
                className="bg-gray-700 rounded-md p-2 w-full"
                rows={4}
              />
            ) : (
              <ExpandableText text={profile.areaOfInterest} />     
            )}
          </div>
        </div>

        {editMode && (
          <div className="col-span-2 flex justify-center mt-4">
            <button
              className="bg-teal-500 px-6 py-2 text-black text-lg rounded-md"
              onClick={() => setEditMode(false)}
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearnersProfile;
