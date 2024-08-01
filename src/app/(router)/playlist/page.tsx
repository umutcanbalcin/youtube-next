'use client'
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRecoilState, useRecoilValue } from 'recoil';
import { searchVideoAtom } from '@/atoms/searchVideoAtom';
import VideoList from '../_components/Tube/TubeList';
import DialogComponent from '../_components/Menu/Dialog';
import { userAtom } from '@/atoms/userAtom';
import commentList from '@/actions/commentList';
import likeList from '@/actions/likeList';
import fetchMostViewed from '@/actions/mostViewVideos';
import lastVideos from '@/actions/lastVideos';

const PlayList: React.FC = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('list');
  const [results, setResults] = useRecoilState(searchVideoAtom);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const user=useRecoilValue(userAtom);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery==='cl') {
        setLoading(true);
        try {
          const response = await commentList(user?.id as string);
          setResults(response.data);
        } catch (error) {
          console.error('Error fetching search results:', error);
          setResults([]);
        } finally {
          setLoading(false);
          setSearched(true);
        }
      }else if(searchQuery==='ll'){
        setLoading(true);
        try {
          const response = await likeList(user?.id as string);
          setResults(response.data);
        } catch (error) {
          console.error('Error fetching search results:', error);
          setResults([]);
        } finally {
          setLoading(false);
          setSearched(true);
        }
      } 
      else if(searchQuery==='mostviewed'){
        setLoading(true);
        try {
          const response = await fetchMostViewed();
          console.log('Bu önceki',response.data)
          setResults(response.data);
        } catch (error) {
          console.error('Error fetching search results:', error);
          setResults([]);
        } finally {
          setLoading(false);
          setSearched(true);
        }
      } 
      else if(searchQuery==='lastviewed'){
        setLoading(true);
        try {
          const response = await lastVideos(user?.id as string);
          console.log('Burası',response);
          setResults(response);
        } catch (error) {
          console.error('Error fetching search results:', error);
          setResults([]);
        } finally {
          setLoading(false);
          setSearched(true);
        }
      } 
      else {
        setResults([]);
        setSearched(true);
      }
    };

    fetchSearchResults();
  }, [searchQuery, setResults,user?.id]);

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

export default PlayList;
