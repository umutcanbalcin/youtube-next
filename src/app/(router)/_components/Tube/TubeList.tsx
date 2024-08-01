'use client';
import { getVideos } from '@/actions/getVideos';
import React, { useEffect, useState } from 'react';
import VideoCard from './VideoCard';
import { VideoType } from '@/types/VideoType';

interface videoListProp{
  searchVideos?:VideoType[] | null;
}

const VideoList: React.FC<videoListProp> = ({searchVideos}) => {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
 

  useEffect(() => {
    const fetchVideos = async () => {
      const videoData = await getVideos();  
      setVideos(videoData);
      setLoading(false);
    };

    fetchVideos();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="px-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-4">
        {videos.length === 0 ? (
          <p>No videos available</p>
        ) : ( searchVideos ? (searchVideos.map((video) => <VideoCard key={video.id} video={video} />)):(videos.map((video) => <VideoCard key={video.id} video={video} />))
        )}
      </div>
    </div>
  );
};

export default VideoList;
