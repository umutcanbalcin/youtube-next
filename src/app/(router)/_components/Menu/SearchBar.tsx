'use client';

import React, { useState } from 'react';
import { FaSearch, FaMicrophone } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import searchVideos from '@/actions/searchVideo';
import { searchVideoAtom } from '@/atoms/searchVideoAtom';
import { useRouter } from 'next/navigation';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [, setResults] = useRecoilState(searchVideoAtom);
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await searchVideos(searchTerm);
      setResults(data.data); // Arama sonuçlarını state'e kaydedin
      console.log('Search Results:', data.data); // Arama sonuçlarını kontrol edin
      router.push(`/results?search_query=${searchTerm}`); // Arama sonuçları sayfasına yönlendirin
    } catch (error) {
      console.error('Error during search:', error);
    } finally {
      setSearchTerm('');
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-1 items-center bg-gray-200 rounded-full px-4 py-2 text-2xl h-14"
    >
      <FaSearch className="text-gray-500 mr-2" />
      <input
        type="text"
        placeholder="Ara..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-transparent focus:outline-none w-full"
      />
      <button type="submit" className="ml-2 focus:outline-none">
        <FaMicrophone className="text-gray-500" />
      </button>
    </form>
  );
};

export default SearchBar;
