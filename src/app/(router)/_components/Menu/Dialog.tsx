// DialogComponent
'use client'
import { Button } from '@/components/ui/button';
import { MdHomeFilled } from "react-icons/md";
import React from 'react';
import { Separator } from '@/components/ui/separator';

const DialogComponent = () => {
  return (
    <div className=" ml-4">
      <Button variant={'outline'} className='w-full justify-start py-3 rounded-lg h-15 border-none hover:bg-gray-300 focus:bg-gray-100'>
        <MdHomeFilled className="mr-8 h-8 w-8" /> <span className='text-xl pl-4 font-normal'>Ana Sayfa</span>
      </Button>
      <Button variant={'outline'} className='w-full justify-start py-3 rounded-lg h-15 border-none hover:bg-gray-300 focus:bg-gray-100'>
        <MdHomeFilled className="mr-8 h-8 w-8" /> <span className='text-xl pl-4 font-normal'>Ana Sayfa</span>
      </Button>
      <Button variant={'outline'} className='w-full justify-start py-3 rounded-lg h-15 border-none hover:bg-gray-300 focus:bg-gray-100'>
        <MdHomeFilled className="mr-8 h-8 w-8" /> <span className='text-xl pl-4 font-normal'>Ana Sayfa</span>
      </Button>
      <Separator className="my-4" />
      <Button variant={'outline'} className='w-full justify-start py-3 rounded-lg h-15 border-none hover:bg-gray-300 focus:bg-gray-100'>
        <MdHomeFilled className="mr-8 h-8 w-8" /> <span className='text-xl pl-4 font-normal'>Ana Sayfa</span>
      </Button>
    </div>
  )
}

export default DialogComponent;
