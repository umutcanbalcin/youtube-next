import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { VideoType } from '@/types/VideoType';
import { FiShare, FiThumbsDown, FiThumbsUp } from 'react-icons/fi'; // Boş ikonlar
import { AiFillLike, AiFillDislike } from 'react-icons/ai'; // Dolu ikonlar
import { createLikeUnlike, deleteLikeUnlike, fetchCommentLikesUnlikes } from '@/actions/likeunlike';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/atoms/userAtom';
import { LikeUnlikeType } from '@/types/LikeUnlikeType';
import { CommentsType } from '@/types/CommentType';

interface LikeDislikeToolProps {
  comment: CommentsType;
}

const CommentLikeUnlike: React.FC<LikeDislikeToolProps> = ({ comment }) => {
  const [likes, setLikes] = useState<LikeUnlikeType[]>([]);
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    const fetchLikes = async () => {
      const response = await fetchCommentLikesUnlikes(comment.id);
      setLikes(response.data);
    };
    
    fetchLikes();
  }, [comment.id]);

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
        const newLike = await createLikeUnlike({ commentId: comment.id, userId: user.id, type: 'like' });
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
        const newUnlike = await createLikeUnlike({ commentId: comment.id, userId: user.id, type: 'unlike' });
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


  return (
    <div className='flex flex-row mt-3'>
          <div className='flex'>
            {existingLike ? <AiFillLike onClick={handleLike} className='text-gray-700' size={24} /> : <FiThumbsUp onClick={handleLike} size={24} />}
          <span className='mx-4  text-xl'>{totalLikes > 0 ? totalLikes : ''}</span>
          </div>
          {existingUnlike ? <AiFillDislike onClick={handleUnlike} className='text-gray-700' size={24} /> : <FiThumbsDown onClick={handleUnlike} size={24} />}
    </div>
  );
};

export default CommentLikeUnlike;
