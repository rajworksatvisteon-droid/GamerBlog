import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const { login, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = '/';
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    login();
  };

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-800">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-800">
      <div className="bg-slate-900 p-8 rounded-lg border border-purple-500 w-full max-w-md shadow-2xl shadow-purple-500/10">
        <h2 className="text-white text-3xl mb-2 font-bold text-center italic">PLAYER LOGIN</h2>
        <p className="text-slate-400 text-center mb-8 text-sm">Sign in with Auth0 to continue.</p>

        <div className="space-y-6">
          <button 
            onClick={handleLogin}
            className="w-full py-3 rounded font-bold uppercase tracking-wider transition-all bg-purple-600 text-white hover:bg-purple-500 active:scale-95 shadow-lg shadow-purple-500/20"
          >
            Enter Game
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
          <p className="text-slate-400 text-sm">
            New to the site?{" "}
            <Link to="/signup" className="text-purple-400 hover:text-purple-300 font-bold transition-colors">
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};