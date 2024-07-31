import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { VideoType } from '@/types/VideoType';
import { useRouter } from 'next/navigation';

interface VideoProps {
  video: VideoType;
}

const ReleatedVideoCard: React.FC<VideoProps> = ({ video }) => {
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

  return (
    <div 
      className="p-2 md:p-4 relative cursor-pointer flex"
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)} 
      onClick={() => router.push(`/watch/${video.id}`)}
    >
      <div className="relative flex-1 md:h-30 lg:h-40 overflow-hidden">
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
                  sizes="(max-width: 600px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                  className="absolute inset-0 w-full h-full rounded-lg"
                />
              ) : (
                <video
                  ref={videoRef}
                  controls={false}
                  loop
                  muted
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                >
                  <source src={video.attributes.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col ml-4 my-2 md:my-3"> 
        <h2 className="text-lg md:text-xl font-bold">{video.attributes.title}</h2> 
        <p className="text-sm font-light mt-1 md:mt-2">{video.attributes.description}</p> 
        <div className="flex items-center mt-1 md:mt-2"> 
          <span className="text-sm">{getTimeAgo(video.attributes.createdAt)}</span> 
        </div>
      </div>
    </div>
  );
};

export default ReleatedVideoCard;
