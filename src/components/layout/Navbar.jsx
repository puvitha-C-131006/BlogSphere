import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiMenu, FiSun, FiMoon, FiFeather, FiSearch, FiBell, FiUser, FiEdit3, FiBookOpen, FiLogOut } from 'react-icons/fi';
import Button from '../common/Button';
import useAuthStore from '../../store/useAuthStore';
import useThemeStore from '../../store/useThemeStore';
import useSearchStore from '../../store/useSearchStore';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const { searchTerm, setSearchTerm } = useSearchStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <FiFeather className="w-6 h-6 text-primary dark:text-white" strokeWidth={2.5} />
              <span className="font-bold text-xl text-secondary dark:text-white tracking-tight">BlogSphere</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-gray-900 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium text-sm">Explore</Link>
              <Link to="/create" className="text-gray-900 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium text-sm font-bold">Creator Studio</Link>
            </div>
          </div>
          
          {location.pathname === '/' && (
            <div className="hidden md:flex flex-1 max-w-lg mx-8 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400 w-4 h-4" />
              </div>
              <input 
                type="text" 
                placeholder="Search stories, topics, authors..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white text-sm rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-600 transition-colors"
              />
            </div>
          )}

          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isDarkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>

            {user ? (
              <div className="flex items-center gap-4 relative" ref={dropdownRef}>
                <button className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors">
                  <FiBell className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 focus:outline-none ml-2"
                >
                  {user.avatar && !user.avatar.includes('dicebear') ? (
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 bg-white" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-bold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                      {user.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 top-12 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 mb-2">
                      <p className="text-sm font-bold text-secondary dark:text-white">{user.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">@{user.username || 'username'} ({user.role || 'writer'})</p>
                    </div>
                    
                    <Link to="/profile" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <FiUser className="w-4 h-4 text-gray-400" />
                      My Profile
                    </Link>
                    <Link to="/create" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <FiEdit3 className="w-4 h-4 text-gray-400" />
                      Creator Studio
                    </Link>
                    <Link to="/dashboard" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <FiBookOpen className="w-4 h-4 text-gray-400" />
                      My Feed
                    </Link>
                    
                    <div className="border-t border-gray-100 dark:border-gray-700 mt-2 pt-2">
                      <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <FiLogOut className="w-4 h-4" />
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Button to="/login" className="rounded-full px-6 bg-[#0f172a] hover:bg-black dark:bg-white dark:text-black text-sm py-2">Sign In</Button>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button 
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 dark:text-gray-400"
            >
              {isDarkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>
            <button className="text-gray-600 dark:text-gray-300 hover:text-primary focus:outline-none p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <FiMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
