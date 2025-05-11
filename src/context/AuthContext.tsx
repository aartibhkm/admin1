import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminCredentials } from '../types';
import { ADMIN_CREDENTIALS } from '../utils/mockData';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (credentials: AdminCredentials) => Promise<boolean>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Check if user is already logged in
  useEffect(() => {
    const storedAuth = localStorage.getItem('instaParkAdminAuth');
    if (storedAuth) {
      setIsAuthenticated(JSON.parse(storedAuth));
    }
  }, []);

  const login = async (credentials: AdminCredentials): Promise<boolean> => {
    setError(null);
    
    // In a real app, this would make an API call to verify credentials
    if (credentials.username === ADMIN_CREDENTIALS.username && 
        credentials.password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      localStorage.setItem('instaParkAdminAuth', JSON.stringify(true));
      return true;
    } else {
      setError('Invalid username or password');
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('instaParkAdminAuth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};