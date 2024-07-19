import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { VideoType } from '@/types/VideoType';
import { useRouter } from 'next/navigation';

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

  const handleVideoClick = () => {
    router.push(`/watch/${video.id}`);
  };

  return (
    <div 
      className="w-full h-40 cursor-pointer relative overflow-hidden rounded-lg" 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)} 
      onClick={handleVideoClick}
    >
      <div className="relative w-full h-full">
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
                  layout="fill"
                  style={{ objectFit: 'cover' }}
                  className="absolute inset-0"
                />
              ) : (
                <video
                  ref={videoRef}
                  controls={false}
                  loop
                  muted
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src={video.attributes.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 p-3 bg-gradient-to-t from-black via-transparent to-transparent text-white">
        <h2 className="text-lg font-bold">{video.attributes.title}</h2>
        <p className="text-sm font-light mt-1">{video.attributes.description}</p>
      </div>
    </div>
  );
};

export default VideoCard;
