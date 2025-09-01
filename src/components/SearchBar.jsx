import React from "react";
import { FiSearch } from "react-icons/fi"; // Feather icon for search

const SearchBar = ({ placeholder = "Search documents..." }) => {
  return (
    <div className="w-full max-w mx-auto">
      <div className="relative">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
          <FiSearch className="h-5 w-5" />
        </span>
        <input
          type="text"
          placeholder={placeholder}
          className="w-full bg-white border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm transition-all duration-200"
        />
      </div>
    </div>
  );
};

export default SearchBar;
