import { createCommentAction } from '@/actions/createComment';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Smile } from 'lucide-react';

interface CommentInputProp {
  id: string;
  fetchComments: () => Promise<void>;
}

const CommentInput: React.FC<CommentInputProp> = ({ id, fetchComments }) => {
  const [newComment, setNewComment] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { mutate: createComment, isPending } = useMutation({
    mutationKey: ["createComment"],
    mutationFn: async () => createCommentAction(newComment, id),
    onSuccess: () => {
      alert('Yorum başarılı bir şekilde oluşturuldu');
      setNewComment('');
      fetchComments(); // Refresh comments after creating a new comment
    },
    onError: (error) => {
      alert(error);
    },
  });

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === '') return;
    createComment();
  };

  const handleEmojiClick = (emoji: string) => {
    setNewComment((prevComment) => prevComment + emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="mt-4 flex flex-col relative mb-5">
      <input
        className="w-full p-2 border-b border-gray-300 focus:border-b-2 focus:border-blue-500 focus:outline-none"
        placeholder="Yorum yaz..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            handleCommentSubmit(e);
          }
        }}
      />
      <div className="flex justify-between items-center mt-2">
        <Button
          className="flex items-center border-none rounded-full h-14 w-14"
          variant="outline"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          <Smile className="w-full h-full text-3xl" />
        </Button>
        <Button
          className={`bg-blue-500 text-white rounded-2xl hover:bg-blue-600 ${newComment.trim() === '' ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleCommentSubmit}
          disabled={isPending || newComment.trim() === ''}
        >
          {isPending ? "Yorum Ekleniyor..." : "Yorum Ekle"}
        </Button>
      </div>
      {showEmojiPicker && (
        <div className="absolute mt-2 bg-white border border-gray-300 p-2 rounded shadow-lg z-10">
          {['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍'].map((emoji) => (
            <span
              key={emoji}
              className="cursor-pointer text-xl"
              onClick={() => handleEmojiClick(emoji)}
            >
              {emoji}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentInput;
