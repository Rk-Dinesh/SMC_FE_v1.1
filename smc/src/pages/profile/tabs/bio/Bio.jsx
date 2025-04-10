import React, { useState } from "react";
import { RiPencilFill } from "react-icons/ri";

const Bio = () => {
  const [editbioMode, setEditbioMode] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [bioText, setBioText] = useState(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry..."
  );

  const [socialLinks, setSocialLinks] = useState({
    facebook: "https://facebook.com/yourprofile",
    instagram: "https://instagram.com/yourprofile",
    twitter: "https://twitter.com/yourprofile",
    linkedin: "https://linkedin.com/in/yourprofile",
  });


  const handleSave = () => {
    setEditMode(false);
  };
  return (
    <div className="bg-darkgray text-white px-3 rounded-2xl">
      <button className="flex justify-end w-full gap-1 text-lg text-gray-300 hover:text-white"
       onClick={() => setEditbioMode(!editbioMode)}>
        <RiPencilFill size={24} />
        {editbioMode ? "Cancel" : "Edit"}
      </button>
      {editbioMode ? (
        <textarea
          className="text-base leading-7 py-4 w-full text-black bg-white rounded-md p-2"
          rows={4}
          value={bioText}
        />
      ) : (
        <p className="text-base leading-7 py-4">{bioText}</p>
      )}
      <hr className="border-gray-600 my-4" />
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg">Social Links</p>
        <button
          className="flex items-center gap-1 text-lg text-gray-300 hover:text-white"
          onClick={() => setEditMode(!editMode)}
        >
          <RiPencilFill size={24} />
          {editMode ? "Cancel" : "Edit"}
        </button>
      </div>
      <div className="grid grid-cols-2 gap-10 w-[760px]">
        {["facebook", "instagram", "twitter", "linkedin"].map((key) => (
          <div className="flex-col gap-2 py-4 flex" key={key}>
            <label htmlFor={key} className="px-1 capitalize">
              {key === "twitter" ? "X" : key}
            </label>
            {editMode ? (
              <input
                type="text"
                name={key}
                placeholder={socialLinks[key]}
                className="bg-white text-black rounded-md h-10 w-96 px-2"
              />
            ) : (
              <p className="bg-transparent border-b border-white text-gray-300 w-96 py-1">
                {socialLinks[key]}
              </p>
            )}
          </div>
        ))}

        {editMode && (
          <div className="flex col-span-2 justify-center ml-7 items-center">
            <button
              className="bg-teal-500 px-6 text-black text-lg rounded-md"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        )}
    </div>
    </div>
  );
};

export default Bio;
