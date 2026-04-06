
import { Link } from 'react-router-dom';
import type { Post } from '../types';
import { getPostSlug } from '../utils/slug';


export const PostCard = ({ post }: { post: Post }) => {
  const slug = getPostSlug(post);
  return (
    <Link to={`/post/${slug}`} className="block group">
      <div className="bg-slate-900 border-l-4 border-purple-500 p-4 sm:p-5 rounded-lg shadow-md transition-all group-hover:translate-x-1 group-hover:border-purple-400 group-hover:bg-slate-800/60 min-h-[260px] max-h-[420px] flex flex-col justify-between">
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
        <h3 className="text-lg sm:text-xl font-bold mb-1 text-white group-hover:text-purple-400 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-slate-300 mb-2 text-sm sm:text-base line-clamp-2">
          {post.content}
        </p>
        <div className="text-xs sm:text-sm font-medium text-purple-400 italic mt-auto">
          By: {post.author}
        </div>
      </div>
    </Link>
  );
};