import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Signup = () => {
  const { signup, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = '/';
    }
  }, [isAuthenticated]);

  const handleSignup = () => {
    signup();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-800">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-800">
      <div className="bg-slate-900 p-8 rounded-lg border border-purple-500 w-96">
        <h2 className="text-white text-3xl mb-6 font-bold">New Player</h2>
        <p className="text-slate-400 text-center mb-8 text-sm">Create your account with Auth0.</p>
        
        <button 
          onClick={handleSignup}
          className="w-full p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-bold mb-4 transition-all"
        >
          Sign Up with Auth0
        </button>
        
        <div className="text-center text-slate-400 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400 hover:underline">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};