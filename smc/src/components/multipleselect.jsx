import React, { useState } from 'react';

const MultiSelect = ({ options, selectedOptions, setSelectedOptions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (option.email && option.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="relative">
      <div className="border border-gray-300 rounded-md p-2 max-h-[250px] overflow-auto" onClick={toggleDropdown}>
        {selectedOptions.length === 0 ? (
          <span className="text-gray-500">Select contacts...</span>
        ) : (
          selectedOptions.map((value) => {
            const option = options.find(opt => opt.value === value);
            return (
              <span key={value} className="flex justify-between bg-teal-400 text-black px-3 py-1 mt-1">
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
        <div className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-full max-h-60 overflow-y-auto text-black transition-all duration-300 ease-in-out">
          <div className="flex items-center p-2 border-b border-gray-300">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="flex-grow p-2 outline-none"
            />
            <button onClick={clearSearch} className="text-gray-500 ml-2">
              Clear
            </button>
          </div>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                className={`p-2 cursor-pointer hover:bg-gray-200 border-b-2 border-gray-300 ${selectedOptions.includes(option.value) ? 'bg-gray-200' : ''}`}
                onClick={() => handleSelect(option)}
              >
                {option.label} <br />
                <span className="text-gray-500">{option.email}</span>
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">No contacts found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
