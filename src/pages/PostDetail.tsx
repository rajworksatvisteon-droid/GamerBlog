import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Post } from '../types';
import { extractIdFromSlug } from '../utils/slug';
import { usePostStore } from '../store/postStore';

export const PostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);

  const posts = usePostStore((state) => state.posts);

  useEffect(() => {
    if (!slug) return;
    const id = extractIdFromSlug(slug);
    const foundPost = posts.find((p) => p.id.startsWith(id));
    if (foundPost) {
      setPost(foundPost);
    }
  }, [slug, posts]);

  if (!post) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl text-slate-400 font-bold">Post not found, Gamer.</h2>
        <button onClick={() => navigate('/')} className="mt-4 text-purple-400 hover:underline">
          Return to Lobby
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-8 text-slate-400 hover:text-purple-400 flex items-center gap-2 transition-colors"
      >
        ← Back to Feed
      </button>

      <article className="bg-slate-900 border border-slate-700 p-8 rounded-lg shadow-2xl">
        <header className="mb-8 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-purple-900 text-purple-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {post.category}
            </span>
            <span className="text-slate-500 text-sm">{post.createdAt}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase">
            {post.title}
          </h1>
          <p className="mt-4 text-purple-400 font-medium text-lg">By: {post.author}</p>
        </header>


        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="mb-6 rounded shadow-lg max-h-96 mx-auto"
          />
        )}

        {/* YouTube Thumbnail */}
        {post.youtubeUrl && (() => {
          // Extract YouTube video ID
          const match = post.youtubeUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/);
          const videoId = match ? match[1] : null;
          return videoId ? (
            <div className="mb-6 flex justify-center">
              <a
                href={post.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Watch on YouTube"
              >
                <img
                  src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                  alt="YouTube video thumbnail"
                  className="rounded shadow-lg max-h-80 border-2 border-red-600 hover:scale-105 transition-transform"
                  style={{ cursor: 'pointer' }}
                />
              </a>
            </div>
          ) : null;
        })()}

        <div className="text-slate-300 leading-relaxed text-lg whitespace-pre-wrap">
          {post.content}
        </div>
      </article>
    </div>
  );
};