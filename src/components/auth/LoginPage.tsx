import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Car, Key, User } from 'lucide-react';
import Button from '../ui/Button';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login({ username, password });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4">
              <Car size={32} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">InstaPark Admin</h1>
            <p className="text-slate-500 mt-2">Sign in to your admin account</p>
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md mb-6 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-1">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-slate-400" />
                  </div>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 w-full rounded-md border border-slate-300 py-2 px-3 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key size={18} className="text-slate-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 w-full rounded-md border border-slate-300 py-2 px-3 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>
              
              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full"
              >
                Sign In
              </Button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-sm text-slate-500">
            <p>Default credentials: "admin" / "parkadmin123"</p>
          </div>
        </div>
        
        <div className="px-8 py-4 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} InstaPark. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default LoginPage;