'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import SearchBar from './SearchBar';
import AuthButton from './AuthButton';
import { RiVideoAddLine } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/atoms/userAtom';



const Header = () => {
  const user=useRecoilValue(userAtom);
  const router=useRouter();
  return (
    <header className="px-4 md:px-10 py-2 md:py-4 mb-3">
      <div className="max-w-full mx-auto flex items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={() => router.push('/')}>
          <FontAwesomeIcon icon={faYoutube} className="text-red-500 text-3xl md:text-5xl" height={30} />
          <h1 className="text-xl md:text-3xl font-semibold ml-2">YouTube</h1>
        </div>
        <div className="hidden md:flex items-center space-x-6 w-2/5">
          <SearchBar />
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <button className="hover:text-gray-500 focus:outline-none focus:text-gray-500" onClick={() => router.push('/addvideo')}>
              <RiVideoAddLine size={35} />
            </button>
          ) : null}
          <AuthButton />
        </div>
      </div>
      {/* Mobile View */}
      <div className="md:hidden mt-4 flex justify-center">
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
