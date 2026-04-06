
import { useAuth } from '../context/AuthContext';
import { PostCard } from '../components/PostCard';
import { usePostStore } from '../store/postStore';

export const Profile = () => {
  const { user } = useAuth();
  const posts = usePostStore((state) => state.posts);
  const myPosts = posts.filter(p => p.author === user?.username);

  return (
    <div className="py-10">
      <div className="bg-slate-900 p-6 rounded-lg mb-8 border border-purple-500">
        <h1 className="text-3xl font-bold">Player: {user?.username}</h1>
        <p className="text-slate-400">{user?.email}</p>
      </div>
      <h2 className="text-xl font-bold mb-4">Your Achievements (Posts)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {myPosts.map(post => <PostCard key={post.id} post={post} />)}
      </div>
    </div>
  );
};