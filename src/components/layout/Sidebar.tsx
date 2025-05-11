import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  CalendarClock, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Car,
  BarChart3
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Users size={20} />, label: 'Users', path: '/users' },
    { icon: <CalendarClock size={20} />, label: 'Bookings', path: '/bookings' },
    { icon: <Car size={20} />, label: 'Parking Spaces', path: '/parking-spaces' },
    { icon: <BarChart3 size={20} />, label: 'Reports', path: '/reports' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <button 
          onClick={toggleMobileMenu}
          className="p-2 rounded-md bg-blue-600 text-white"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-30 bg-slate-900 text-white transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          w-64 flex flex-col ${className}
        `}
      >
        <div className="p-5 border-b border-slate-700">
          <div className="flex items-center">
            <Car size={32} className="text-blue-500 mr-2" />
            <h1 className="text-xl font-bold">InstaPark Admin</h1>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center px-4 py-3 rounded-md transition-colors
                    ${isActive(item.path) 
                      ? 'bg-blue-700 text-white' 
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'}
                  `}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-700">
          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-3 rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <LogOut size={20} className="mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}
    </>
  );
};

export default Sidebar;