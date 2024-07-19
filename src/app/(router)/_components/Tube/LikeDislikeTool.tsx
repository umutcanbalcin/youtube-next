import React, { useEffect, useState } from 'react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { VideoType } from '@/types/VideoType';
import { FiShare, FiThumbsDown, FiThumbsUp } from 'react-icons/fi'; // Boş ikonlar
import { AiFillLike, AiFillDislike } from 'react-icons/ai'; // Dolu ikonlar
import { createLikeUnlike, deleteLikeUnlike, fetchLikesUnlikes } from '@/actions/likeunlike';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/atoms/userAtom';
import { LikeUnlikeType } from '@/types/LikeUnlikeType';

interface LikeDislikeToolProps {
  video: VideoType;
}

const LikeDislikeTool: React.FC<LikeDislikeToolProps> = ({ video }) => {
  const [likes, setLikes] = useState<LikeUnlikeType[]>([]);
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    const fetchLikes = async () => {
      const response = await fetchLikesUnlikes(video.id);
      setLikes(response.data);
    };
    
    fetchLikes();
  }, [video.id]);

  const existingLike = likes.find((like) => like.attributes.userId?.data.id === user?.id && like.attributes.type === 'like');
  const existingUnlike = likes.find((like) => like.attributes.userId?.data.id === user?.id && like.attributes.type === 'unlike');

  const handleLike = async () => {
    if (user) {
      if (existingLike) {
        await deleteLikeUnlike(existingLike.id);
        setLikes((prevLikes) => prevLikes.filter((like) => like.id !== existingLike.id));
      } else {
        if (existingUnlike) {
          await deleteLikeUnlike(existingUnlike.id);
          setLikes((prevLikes) => prevLikes.filter((like) => like.id !== existingUnlike.id));
        }
        const newLike = await createLikeUnlike({ videoId: video.id, userId: user.id, type: 'like' });
        setLikes((prevLikes) => [
          ...prevLikes,
          {
            id: newLike.data.id,
            attributes: {
              type: 'like',
              userId: {
                data: user,
              },
              createdAt: new Date(),
              updatedAt: new Date(),
              publishedAt: new Date(),
            },
          },
        ]);
      }
    }
  };

  const handleUnlike = async () => {
    if (user) {
      if (existingUnlike) {
        await deleteLikeUnlike(existingUnlike.id);
        setLikes((prevLikes) => prevLikes.filter((like) => like.id !== existingUnlike.id));
      } else {
        if (existingLike) {
          await deleteLikeUnlike(existingLike.id);
          setLikes((prevLikes) => prevLikes.filter((like) => like.id !== existingLike.id));
        }
        const newUnlike = await createLikeUnlike({ videoId: video.id, userId: user.id, type: 'unlike' });
        setLikes((prevLikes) => [
          ...prevLikes,
          {
            id: newUnlike.data.id,
            attributes: {
              type: 'unlike',
              userId: {
                data: user,
              },
              createdAt: new Date(),
              updatedAt: new Date(),
              publishedAt: new Date(),
            },
          },
        ]);
      }
    }
  };

  let totalLikes = likes.filter((like) => like.attributes.type === 'like').length;
  let totalUnlikes = likes.filter((like) => like.attributes.type === 'unlike').length;
  let totalLikeUnlike = totalLikes - totalUnlikes;

  return (
    <div className='flex flex-row justify-between items-center'>
      <Avatar className="w-12 h-12">
        <AvatarImage src={video.attributes.userId.data.attributes.profilePicture} />
      </Avatar>
      <div className='flex gap-4 h-12'>
        <div className="flex items-center rounded-full bg-gray-200">
          <Button variant={'link'} size={'lg'} onClick={handleLike} 
          className='hover:bg-gray-300 w-full h-full rounded-l-full hover:no-underline'>
            {existingLike ? <AiFillLike className='text-gray-700' size={24} /> : <FiThumbsUp size={24} />}
            <span className='ml-4 text-xl'>{totalLikeUnlike > 0 ? totalLikeUnlike : ''}</span>
          </Button>
          <Separator orientation='vertical' className='h-4/6 bg-gray-600' color='black'/>
          <Button variant={'link'} size={'lg'} onClick={handleUnlike} 
          className='hover:bg-gray-300 w-full h-full rounded-r-full hover:no-underline'>
            {existingUnlike ? <AiFillDislike className='text-gray-700' size={24} /> : <FiThumbsDown size={24} />}
            <span className='ml-4 text-xl'>{totalLikeUnlike < 0 ? totalLikeUnlike * -1 : ''}</span>
          </Button>
        </div>
        <div className="flex items-center rounded-full bg-gray-200">
          <Button variant={'link'} className="flex items-center gap-2 hover:no-underline">
            <FiShare size={30} /> <span className='text-xl'>Share</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LikeDislikeTool;
