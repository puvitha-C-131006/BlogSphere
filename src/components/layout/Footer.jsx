import React from 'react';
import { Link } from 'react-router-dom';
import { FiTwitter, FiLinkedin, FiGithub, FiFeather } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
              <FiFeather className="w-6 h-6 text-secondary dark:text-white" />
              <span className="font-bold text-xl text-secondary dark:text-white tracking-tight">BlogSphere</span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
              A premium space for ideas, code, stories, and mindful thoughts. Share your perspective with the world.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-secondary dark:hover:text-white transition-colors">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-secondary dark:hover:text-white transition-colors">
                <FiLinkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-secondary dark:hover:text-white transition-colors">
                <FiGithub className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Discover Column */}
          <div>
            <h3 className="font-bold text-secondary dark:text-white mb-6 text-sm">Discover</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="#" className="text-gray-500 dark:text-gray-400 hover:text-secondary dark:hover:text-white transition-colors">Explore Stories</Link></li>
              <li><Link to="#" className="text-gray-500 dark:text-gray-400 hover:text-secondary dark:hover:text-white transition-colors">Trending Articles</Link></li>
              <li><Link to="#" className="text-gray-500 dark:text-gray-400 hover:text-secondary dark:hover:text-white transition-colors">Popular Authors</Link></li>
            </ul>
          </div>

          {/* Write Column */}
          <div>
            <h3 className="font-bold text-secondary dark:text-white mb-6 text-sm">Write</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/create" className="text-gray-500 dark:text-gray-400 hover:text-secondary dark:hover:text-white transition-colors">Creator Studio</Link></li>
              <li><Link to="#" className="text-gray-500 dark:text-gray-400 hover:text-secondary dark:hover:text-white transition-colors">Author Guidelines</Link></li>
            </ul>
          </div>

          {/* Platform Column */}
          <div>
            <h3 className="font-bold text-secondary dark:text-white mb-6 text-sm">Platform</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="#" className="text-gray-500 dark:text-gray-400 hover:text-secondary dark:hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="text-gray-500 dark:text-gray-400 hover:text-secondary dark:hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="#" className="text-gray-500 dark:text-gray-400 hover:text-secondary dark:hover:text-white transition-colors">Accessibility</Link></li>
            </ul>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-end items-center pt-8 border-t border-gray-100 dark:border-gray-800">
          <p className="text-gray-400 text-xs">
            Made with ❤️ for thinkers & creators
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
