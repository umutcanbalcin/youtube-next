'use client'
import { Button } from '@/components/ui/button';
import { MdHomeFilled, MdTrendingUp, MdHistory, MdThumbUp, MdComment } from "react-icons/md";
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';

const DialogComponent = () => {
  const router=useRouter();
  return (
    <div className="ml-4 my-6 flex flex-col gap-2">
      <Button variant={'outline'} className='w-full justify-start py-3 rounded-lg h-15 border-none hover:bg-gray-300 focus:bg-gray-100'>
        <MdHomeFilled className="mr-8 h-8 w-8" /> <span className='text-xl pl-4 font-normal'>Ana Sayfa</span>
      </Button>
      <Button variant={'outline'} onClick={()=>router.push(`/playlist?list=mostviewed`)}  className='w-full justify-start py-3 rounded-lg h-15 border-none hover:bg-gray-300 focus:bg-gray-100'>
        <MdTrendingUp className="mr-8 h-8 w-8" /> <span className='text-xl pl-4 font-normal'>En Çok İzlenenler</span>
      </Button>
     
      <Separator className="my-4" />
      <Button variant={'outline'} onClick={()=>router.push(`/playlist?list=lastviewed`)} className='w-full justify-start py-3 rounded-lg h-15 border-none hover:bg-gray-300 focus:bg-gray-100'>
        <MdHistory className="mr-8 h-8 w-8" /> <span className='text-xl pl-4 font-normal'>En Son izlediklerim</span>
      </Button>
      <Button variant={'outline'} onClick={()=>router.push(`/playlist?list=ll`)} className='w-full justify-start py-3 rounded-lg h-15 border-none hover:bg-gray-300 focus:bg-gray-100'>
        <MdThumbUp className="mr-8 h-8 w-8"  /> <span className='text-xl pl-4 font-normal'>Beğendiğim Videolar</span>
      </Button>
      <Button variant={'outline'} onClick={()=>router.push(`/playlist?list=cl`)} className='w-full justify-start py-3 rounded-lg h-15 border-none hover:bg-gray-300 focus:bg-gray-100'>
        <MdComment className="mr-8 h-8 w-8" /> <span className='text-xl pl-4 font-normal'>Yorum Yaptığım Videolar</span>
      </Button>
    </div>
  );
}

export default DialogComponent;
