import React, { useState } from 'react';
import { Button } from '@progress/kendo-react-buttons';
import { Input } from '@progress/kendo-react-inputs';
import { Trash, Send } from 'lucide-react';

interface Comment {
  id: string;
  text: string;
  date: string;
}

const CommentSystem: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const newCommentObject = {
      id: Date.now().toString(),
      text: newComment,
      date: new Date().toLocaleString(),
    };

    setComments((prev) => [...prev, newCommentObject]);
    setNewComment('');
  };

  const handleDeleteComment = (id: string) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Leave a Comment/Feedback</h3>
      <Input
        value={newComment}
        onChange={(e) => setNewComment(e.value as string)}
        placeholder="Write your comment here..."
        className="w-full mb-4"
      />
      <Button themeColor="primary" onClick={handleAddComment} className="mb-6 flex items-center">
        <Send className="w-4 h-4 mr-2" />
        Send Feedback
      </Button>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-100 p-4 rounded-lg flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-800">{comment.text}</p>
              <span className="text-xs text-gray-500">{comment.date}</span>
            </div>
            <button onClick={() => handleDeleteComment(comment.id)} className="text-gray-400 hover:text-gray-600">
              <Trash className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSystem;
