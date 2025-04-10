import React, { useState } from "react";

const ExpandableText = ({ text, minLength = 300 }) => {
  const [expanded, setExpanded] = useState(false);

  if (text.length <= minLength) {
    return (
      <p className="bg-gray-800 rounded-md p-4 w-full text-justify leading-relaxed">
        {text}
      </p>
    );
  }

  const displayedText = expanded ? text : `${text.slice(0, minLength)}...`;

  return (
    <div className="bg-gray-800 rounded-md p-4 w-full text-justify leading-relaxed">
      <p className="whitespace-pre-line">{displayedText}</p>
      <button
        className="text-teal-400 mt-2 underline"
        onClick={() => setExpanded((prev) => !prev)}
      >
        {expanded ? "See Less" : "See More"}
      </button>
    </div>
  );
};

export default ExpandableText;
