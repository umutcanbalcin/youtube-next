import React from 'react';
import { CommentsType } from '@/types/CommentType';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import CommentLikeUnlike from '../Tube/CommentLikeUnlike';

interface CommentsProps {
  comment: CommentsType;
}

const CommentTap: React.FC<CommentsProps> = ({ comment }) => {
  const getAvatarContent = () => {
    if (comment.attributes.userId.data.attributes.profilePicture) {
      return (
        <Avatar className="w-12 h-12">
          <AvatarImage src={comment.attributes.userId.data.attributes.profilePicture} />
        </Avatar>
      );
    } else {
      const name = comment.attributes.userId.data.attributes.name;
      const initials = name
        .split(' ')
        .map((part) => part.charAt(0).toUpperCase())
        .join('');

      return (
        <Avatar className="w-12 h-12">
          {initials}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      );
    }
  };

  return (
    <div className="p-2 mb-2 flex flex-row items-left">
      <div className='flex'>
        {getAvatarContent()}
      </div>
      <div className='ml-4 flex flex-col'>
        <p className='font-bold'>{comment.attributes.userId.data.attributes.name}</p>
        <p>{comment.attributes.content}</p>
        <CommentLikeUnlike comment={comment} />
      </div>
      
    </div>
  );
};

export default CommentTap;
