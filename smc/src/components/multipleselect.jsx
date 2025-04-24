import React, { useState } from 'react';

const MultiSelect = ({ options, selectedOptions, setSelectedOptions }) => {
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility

  const handleSelect = (option) => {
    if (selectedOptions.includes(option.value)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option.value));
    } else {
      setSelectedOptions([...selectedOptions, option.value]);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div className="border border-gray-300 rounded-md p-2" onClick={toggleDropdown}>
        {selectedOptions.length === 0 ? (
          <span className="text-gray-500">Select contacts...</span>
        ) : (
          selectedOptions.map((value) => {
            const option = options.find(opt => opt.value === value);
            return (
              <span key={value} className="bg-teal-400 text-black px-2 py-1 rounded-full mr-2">
                {option.label}
                <button
                  className="ml-2 text-red-500"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    handleSelect(option);
                  }}
                >
                  x
                </button>
              </span>
            );
          })
        )}
      </div>
      {isOpen && (
        <div className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-full max-h-60 overflow-y-auto text-black">
          {options.map((option) => (
            <div
              key={option.value}
              className={`p-2 cursor-pointer hover:bg-gray-200 ${selectedOptions.includes(option.value) ? 'bg-gray-200' : ''}`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
