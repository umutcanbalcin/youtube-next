'use client';
import { getVideos } from '@/actions/getVideos';
import React, { useEffect, useState } from 'react';
import VideoCard from './VideoCard';
import { VideoType } from '@/types/VideoType';
import ReleatedVideoCard from './ReleatedVideoCard';

const ReleatedVideoList: React.FC = () => {
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
    <div className="px-5 flex flex-col">
      <h1 className="text-2xl">Releated Videos</h1>
      <div className="grid grid-cols-1  gap-4 py-2">
        {videos.length === 0 ? (
          <p>No videos available</p>
        ) : (
          videos.map((video) => <ReleatedVideoCard key={video.id} video={video} />)
        )}
      </div>
    </div>
  );
};

export default ReleatedVideoList;
