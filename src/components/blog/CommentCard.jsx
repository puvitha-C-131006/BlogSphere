import React from 'react';

const CommentCard = ({ comment }) => {
  return (
    <div className="flex gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100">
      {comment.author?.avatar && !comment.author.avatar.includes('dicebear') ? (
        <img 
          src={comment.author.avatar} 
          alt={comment.author?.name || 'Anonymous'} 
          className="w-10 h-10 rounded-full object-cover shadow-sm shrink-0 bg-white"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500 shrink-0">
          {comment.author?.name?.charAt(0).toUpperCase() || 'A'}
        </div>
      )}
      <div className="flex-1">
        <div className="flex items-baseline justify-between mb-2">
          <h4 className="font-semibold text-secondary">{comment.author?.name || 'Anonymous'}</h4>
          <span className="text-xs text-gray-500 font-medium">
            {comment.createdAt?.toDate ? comment.createdAt.toDate().toLocaleDateString() : comment.date || 'Just now'}
          </span>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
          {comment.content}
        </p>
      </div>
    </div>
  );
};

export default CommentCard;
