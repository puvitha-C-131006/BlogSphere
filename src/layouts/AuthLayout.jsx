import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { FiFeather } from 'react-icons/fi';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center p-4 transition-colors">
      <Link to="/" className="flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
        <FiFeather className="w-8 h-8 text-[#0f172a] dark:text-white" strokeWidth={2.5} />
        <span className="font-bold text-2xl text-[#0f172a] dark:text-white tracking-tight">BlogSphere</span>
      </Link>
      
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 transition-colors">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
