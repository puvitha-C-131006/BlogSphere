import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const BlogCard = ({ post, onEdit, onDelete }) => {
  return (
    <article className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={post.coverImage || post.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop'} 
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary text-xs font-semibold rounded-full shadow-sm">
            {post.category || 'Technology'}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-3 mb-4 text-xs text-gray-500 font-medium">
          <div className="flex items-center gap-1.5">
            <img 
              src={post.author?.avatar || post.authorImage || `https://ui-avatars.com/api/?name=${post.author?.name || 'Anonymous'}&background=random`} 
              alt={post.author?.name || 'Anonymous'} 
              className="w-6 h-6 rounded-full"
            />
            <span className="text-secondary">{post.author?.name || post.author || 'Anonymous'}</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
          <span>{post.createdAt?.toDate ? post.createdAt.toDate().toLocaleDateString() : post.date || 'Just now'}</span>
        </div>
        <h2 className="text-xl font-bold text-secondary mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          <Link to={`/blog/${post.id}`}>{post.title}</Link>
        </h2>
        <p className="text-gray-500 mb-6 line-clamp-3 flex-grow leading-relaxed">
          {post.subtitle || post.description || 'No description available.'}
        </p>
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <Link 
            to={`/blog/${post.id}`} 
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary group/link"
          >
            Read More
            <FiArrowRight className="transition-transform group-hover/link:translate-x-1" />
          </Link>
          <div className="flex items-center gap-4">
            {onEdit && (
              <button onClick={(e) => { e.preventDefault(); onEdit(post.id); }} className="text-gray-400 hover:text-secondary text-sm font-medium transition-colors">
                Edit
              </button>
            )}
            {onDelete && (
              <button onClick={(e) => { e.preventDefault(); onDelete(post.id); }} className="text-gray-400 hover:text-red-500 text-sm font-medium transition-colors">
                Delete
              </button>
            )}
            {!onEdit && !onDelete && (
              <span className="text-xs text-gray-400 font-medium">{post.readTime || '5 min read'}</span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
