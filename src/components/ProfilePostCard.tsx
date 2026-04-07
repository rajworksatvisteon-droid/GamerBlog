import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Post } from '../types';
import { getPostSlug } from '../utils/slug';
import { usePostStore } from '../store/postStore';

interface ProfilePostCardProps {
  post: Post;
  onEdit: (post: Post) => void;
}

export const ProfilePostCard = ({ post, onEdit }: ProfilePostCardProps) => {
  const deletePost = usePostStore((state) => state.deletePost);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const slug = getPostSlug(post);

  const handleDelete = () => {
    deletePost(post.id);
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="bg-slate-900 border-l-4 border-purple-500 p-4 sm:p-5 rounded-lg shadow-md min-h-[260px] max-h-[420px] flex flex-col justify-between">
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-36 sm:h-40 object-cover rounded mb-3 border border-slate-800"
            loading="lazy"
          />
        )}
        
        <div className="flex justify-between items-center mb-2">
          <span className="bg-purple-900 text-purple-200 text-xs font-semibold px-2 py-0.5 rounded">
            {post.category}
          </span>
          <span className="text-slate-500 text-xs">{post.createdAt}</span>
        </div>
        
        <Link to={`/post/${slug}`}>
          <h3 className="text-lg sm:text-xl font-bold mb-1 text-white hover:text-purple-400 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-slate-300 mb-2 text-sm sm:text-base line-clamp-2 flex-grow">
          {post.content}
        </p>
        
        <div className="flex justify-between items-center mt-auto">
          <div className="text-xs sm:text-sm font-medium text-purple-400 italic">
            By: {post.author}
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(post)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-red-500 p-6 rounded-lg shadow-2xl max-w-md w-full text-center">
            <h3 className="text-xl font-bold text-white mb-4">Delete Post?</h3>
            <p className="text-slate-400 mb-6">
              Are you sure you want to delete "{post.title}"? This action cannot be undone.
            </p>
            
            <div className="flex space-x-4">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-slate-700 text-white py-2 rounded font-medium hover:bg-slate-600 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white py-2 rounded font-medium hover:bg-red-700 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};