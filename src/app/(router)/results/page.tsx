'use client'
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { searchVideoAtom } from '@/atoms/searchVideoAtom';
import VideoList from '../_components/Tube/TubeList';
import DialogComponent from '../_components/Menu/Dialog';
import searchVideos from '@/actions/searchVideo';

const Results: React.FC = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search_query');
  const [results, setResults] = useRecoilState(searchVideoAtom);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery) {
        setLoading(true);
        try {
          const response = await searchVideos(searchQuery);
          setResults(response.data);
        } catch (error) {
          console.error('Error fetching search results:', error);
          setResults([]);
        } finally {
          setLoading(false);
          setSearched(true);
        }
      } else {
        setResults([]);
        setSearched(true);
      }
    };

    fetchSearchResults();
  }, [searchQuery, setResults]);

  return (
    <div className='flex flex-row'>
      <div className='md:flex md:basis-1/6 md:flex-col hidden'>
        <DialogComponent />
      </div>
      <div className='flex-1'>
        {loading ? (
          <p>Loading...</p>
        ) : searched && results && results.length > 0 ? (
          <VideoList searchVideos={results} />
        ) : searched ? (
          <p>No results found</p>
        ) : null}
      </div>
    </div>
  );
};

export default Results;
