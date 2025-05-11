import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './components/auth/LoginPage';
import Dashboard from './components/dashboard/Dashboard';
import UserManagement from './components/dashboard/UserManagement';
import BookingManagement from './components/dashboard/BookingManagement';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';

// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Layout component for authenticated pages
const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  // Apply dark mode class to html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  
  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <Sidebar />
      <div className="lg:ml-64 min-h-screen bg-slate-50 dark:bg-slate-900">
        <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
        <main>{children}</main>
      </div>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/users" element={
        <ProtectedRoute>
          <AdminLayout>
            <UserManagement />
          </AdminLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/bookings" element={
        <ProtectedRoute>
          <AdminLayout>
            <BookingManagement />
          </AdminLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/parking-spaces" element={
        <ProtectedRoute>
          <AdminLayout>
            <div className="p-6">
              <h1 className="text-2xl font-bold">Parking Spaces</h1>
              <p className="text-slate-500 mt-2">This section is under development.</p>
            </div>
          </AdminLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/reports" element={
        <ProtectedRoute>
          <AdminLayout>
            <div className="p-6">
              <h1 className="text-2xl font-bold">Reports</h1>
              <p className="text-slate-500 mt-2">This section is under development.</p>
            </div>
          </AdminLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/settings" element={
        <ProtectedRoute>
          <AdminLayout>
            <div className="p-6">
              <h1 className="text-2xl font-bold">Settings</h1>
              <p className="text-slate-500 mt-2">This section is under development.</p>
            </div>
          </AdminLayout>
        </ProtectedRoute>
      } />
      
      {/* Redirect root to dashboard if authenticated, otherwise to login */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;