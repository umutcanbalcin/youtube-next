// components/SearchBar.tsx
import React, { useState } from 'react';
import { FaSearch, FaMicrophone } from 'react-icons/fa';

const SearchBar: React.FC = () => {




  return (
    <form  className="flex flex-1 items-center bg-gray-200 rounded-full px-4 py-2 text-2xl h-14" >
      <FaSearch className="text-gray-500 mr-2" />
      <input
        type="text"
    
        placeholder="Ara..."
        className="bg-transparent focus:outline-none w-full"
      />
      <button type="submit" className="ml-2 focus:outline-none">
        <FaMicrophone className="text-gray-500" />
      </button>
    </form>
  );
};

export default SearchBar;
