'use client'
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { VideoType } from '@/types/VideoType';
import { getVideoById } from '@/actions/getVideo';
import { CommentsType } from '@/types/CommentType';
import ReleatedVideoList from '../../_components/Tube/ReleatedVideoList';
import { getComments } from '@/actions/getComment';
import LikeDislikeTool from '../../_components/Tube/LikeDislikeTool';
import CommentTap from '../../_components/Comment/Comment';
import CommentInput from '../../_components/Comment/CommentInput';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/atoms/userAtom';
import createVideoClick from '@/actions/saveVideoClick';

const VideoDetail: React.FC = () => {
  const { id } = useParams();
  const [video, setVideo] = useState<VideoType | null>(null);
  const [comments, setComments] = useState<CommentsType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = useRecoilValue(userAtom);
  console.log(video);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let cookieId = null;

      // Cookie'den temporaryIdentity'i çekin
      const cookies = document.cookie.split('; ');
      const tokenCookie = cookies.find(row => row.startsWith('temporaryIdentity='));
      if (tokenCookie) {
        cookieId = tokenCookie.split('=')[1];
      }
      console.log('cookieId:', cookieId); // Cookie ID'sinin ne olduğunu kontrol et

      try {
        // Video detaylarını fetch edin
        const videoData = await getVideoById(id as string);
        setVideo(videoData);

        // Videoya ait yorumları fetch edin
        const commentsData = await getComments(id as string);
        setComments(commentsData);

        // Video tıklamasını kayıt edin
        if (cookieId) {
          await createVideoClick(id as string, cookieId);
        }
      } catch (error) {
        console.error('Error recording video click:', error);
        alert('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const fetchComments = async () => {
    const commentsData = await getComments(id as string);
    setComments(commentsData);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-4 px-10 flex mx-10">
      <div className="w-full lg:w-2/3 lg:mr-4 flex flex-col">
        {video && (
          <>
            <div className="relative w-full pb-[56.25%] overflow-hidden my-5">
              <video controls className="absolute top-0 left-0 w-full h-full object-contain">
                <source src={video.attributes.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <h1 className="text-2xl font-bold mb-4">{video.attributes.title}</h1>
            <LikeDislikeTool video={video} />
            <p className="mt-3">{video.attributes.description}</p>
          </>
        )}
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Comments</h2>
          {currentUser && <CommentInput id={id as string} fetchComments={fetchComments} />}
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <CommentTap key={index} comment={comment} />
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/3 lg:ml-5">
        <ReleatedVideoList />
      </div>
    </div>
  );
};

export default VideoDetail;
