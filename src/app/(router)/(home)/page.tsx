'use client'
import React from 'react';
import DialogComponent from '../_components/Menu/Dialog';
import VideoList from '../_components/Tube/TubeList';
import useTemporaryIdentity from '@/hooks/useTemporaryIdentity';


const HomePage = () => {
  useTemporaryIdentity();

  return (
    <div className='flex flex-row'>
      <div className='md:flex md:basis-1/6 md:flex-col hidden'>
        <DialogComponent />
      </div>
      <div className='flex-1'>
        <VideoList />
      </div>
    </div>
  );
};

export default HomePage;
