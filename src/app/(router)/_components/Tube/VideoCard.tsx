import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { VideoType } from '@/types/VideoType';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/atoms/userAtom';

interface VideoProps {
  video: VideoType;
}

const VideoCard: React.FC<VideoProps> = ({ video }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
 
  
  useEffect(() => {

    if (isHovered && videoRef.current) {
      videoRef.current.play();
    } else if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered]);

  const getTimeAgo = (createdAt: string): string => {
    const currentDate = new Date();
    const createdAtDate = new Date(createdAt);
    const timeDifference = currentDate.getTime() - createdAtDate.getTime();
    const secondsDifference = Math.floor(timeDifference / 1000);

    if (secondsDifference < 60) {
      return `${secondsDifference} saniye önce`;
    } else if (secondsDifference < 3600) {
      const minutes = Math.floor(secondsDifference / 60);
      return `${minutes} dakika önce`;
    } else if (secondsDifference < 86400) {
      const hours = Math.floor(secondsDifference / 3600);
      return `${hours} saat önce`;
    } else {
      const days = Math.floor(secondsDifference / 86400);
      return `${days} gün önce`;
    }
  };
  const name=video.attributes.userId.data.attributes.name;
  return (
    <div 
      className="p-4 relative cursor-pointer" 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)} 
      onClick={() => router.push(`/watch/${video.id}`)}  // Burayı güncelledik
    >
      <div className="relative w-full h-0 pb-[56.25%] overflow-hidden">
        <div className="absolute inset-0">
          {isHovered ? (
            <video
              ref={videoRef}
              controls={false}
              autoPlay
              loop
              muted
              className="absolute inset-0 w-full h-full object-cover"
              poster={video.attributes.thumbnail || undefined}
            >
              <source src={video.attributes.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <>
              {video.attributes.thumbnail ? (
                <Image
                  src={video.attributes.thumbnail}
                  alt={video.attributes.title}
                  fill
                  priority
                  style={{objectFit:'cover'}}
                  sizes='w-full'
                  className="absolute inset-0 w-full h-full rounded-2xl"
                />
              ) : (
                <video ref={videoRef} controls={false} loop muted className="absolute inset-0 w-full h-full object-cover rounded-2xl">
                  <source src={video.attributes.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </>
          )}
        </div>
      </div>
      <div className="flex my-3">
        <Avatar className="w-12 h-12">
          <AvatarImage src={video.attributes.userId.data.attributes.profilePicture} />
          <AvatarFallback> <AvatarFallback>{name.split(' ').map((part)=> part.charAt(0).toUpperCase()).join('')}</AvatarFallback></AvatarFallback>
        </Avatar>
        <div className="flex flex-col ml-5">
          <h2 className="text-xl font-bold ">{video.attributes.title}</h2>
          <span className="text-sm font-light mt-2">{video.attributes.userId.data.attributes.name}</span>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">{video.attributes.videoclicks.data.length} görüntülenme</span>
            <span className="inline-metadata-item text-sm text-gray-500 mr-2">•</span>
            <span>{getTimeAgo(video.attributes.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
