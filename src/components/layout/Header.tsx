import React from 'react';
import { Bell, Sun, Moon, Search } from 'lucide-react';
import Button from '../ui/Button';

interface HeaderProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleDarkMode, isDarkMode }) => {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center w-full max-w-lg">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 pl-10 pr-4 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleDarkMode}
            className="p-2 rounded-full"
            icon={isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          >
            <span className="sr-only">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </Button>
          
          <button className="relative p-2">
            <Bell className="h-5 w-5 text-slate-600" />
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              3
            </span>
          </button>
          
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
              A
            </div>
            <span className="ml-2 text-sm font-medium text-slate-700 hidden sm:inline-block">
              Admin
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;