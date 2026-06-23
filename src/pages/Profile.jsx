import React, { useState } from 'react';
import { FiCalendar, FiFileText, FiEdit3, FiBookmark, FiMapPin, FiLink, FiTwitter, FiLinkedin, FiGithub } from 'react-icons/fi';
import Button from '../components/common/Button';
import useAuthStore from '../store/useAuthStore';
import EditProfileModal from '../components/profile/EditProfileModal';

const Profile = () => {
  const { user, updateUserProfile } = useAuthStore();
  const [activeTab, setActiveTab] = useState('Published');
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveProfile = async (data) => {
    await updateUserProfile(data);
    setIsEditing(false);
  };

  const stats = {
    stories: 0,
    followers: 0,
    following: 0
  };

  const tabs = [
    { id: 'Published', label: 'Published (0)', icon: <FiFileText className="w-4 h-4" /> },
    { id: 'Drafts', label: 'Drafts (0)', icon: <FiEdit3 className="w-4 h-4" /> },
    { id: 'Bookmarks', label: 'Bookmarks (0)', icon: <FiBookmark className="w-4 h-4" /> }
  ];

  return (
    <div className="w-full min-h-screen bg-[#f8f9fa] dark:bg-gray-900 pb-20">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 mb-8 relative">
          
          {/* Banner */}
          <div className="h-48 relative">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${user?.bannerUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop'}')`}}></div>
          </div>

          <div className="px-8 pb-8">
            {/* Avatar and Edit Button */}
            <div className="flex justify-between items-end -mt-16 mb-4 relative z-10">
              <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden shadow-md">
                {user?.avatar && !user.avatar.includes('dicebear') ? (
                  <img 
                    src={user.avatar} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-bold text-gray-400">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                )}
              </div>
              <Button 
                variant="primary" 
                onClick={() => setIsEditing(true)}
                className="rounded-full px-6 py-2 bg-[#0f172a] hover:bg-black text-white dark:bg-white dark:text-black"
              >
                Edit Profile
              </Button>
            </div>

            {/* User Details */}
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-secondary dark:text-white">{user?.name || 'User Name'}</h1>
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest border border-gray-200 dark:border-gray-600">
                  {user?.role || 'Writer'}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-4">@{user?.username || 'username'}</p>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
                {user?.bio || 'A reader and writer on BlogSphere publishing platform.'}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-100 dark:border-gray-700">
                {user?.location && (
                  <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                    <FiMapPin className="w-4 h-4" />
                    <span>{user.location}</span>
                  </div>
                )}
                {user?.website && (
                  <a href={user.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-primary hover:underline">
                    <FiLink className="w-4 h-4" />
                    <span>{user.website.replace(/^https?:\/\//, '')}</span>
                  </a>
                )}
                <div className="flex items-center gap-1.5">
                  <FiCalendar className="w-4 h-4" />
                  <span>Joined June 2026</span>
                </div>
                
                {/* Social Links */}
                {(user?.twitter || user?.linkedin || user?.github) && (
                  <div className="flex items-center gap-4 ml-auto border-l border-gray-200 dark:border-gray-700 pl-6">
                    {user?.twitter && (
                      <a href={`https://twitter.com/${user.twitter}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1DA1F2] transition-colors">
                        <FiTwitter className="w-4 h-4" />
                      </a>
                    )}
                    {user?.linkedin && (
                      <a href={`https://linkedin.com/in/${user.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0A66C2] transition-colors">
                        <FiLinkedin className="w-4 h-4" />
                      </a>
                    )}
                    {user?.github && (
                      <a href={`https://github.com/${user.github}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                        <FiGithub className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="flex gap-6">
                <div className="text-sm">
                  <span className="font-bold text-secondary dark:text-white mr-1">{stats.stories}</span>
                  <span className="text-gray-500">Stories</span>
                </div>
                <div className="text-sm">
                  <span className="font-bold text-secondary dark:text-white mr-1">{stats.followers}</span>
                  <span className="text-gray-500">Followers</span>
                </div>
                <div className="text-sm">
                  <span className="font-bold text-secondary dark:text-white mr-1">{stats.following}</span>
                  <span className="text-gray-500">Following</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors border ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-800 text-secondary dark:text-white border-gray-200 dark:border-gray-700 shadow-sm'
                  : 'bg-transparent text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 border-transparent'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Empty State Container */}
        <div className="w-full border border-dashed border-gray-300 dark:border-gray-700 rounded-3xl bg-transparent flex items-center justify-center h-48">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {activeTab === 'Published' && 'No stories published yet.'}
            {activeTab === 'Drafts' && 'No drafts saved yet.'}
            {activeTab === 'Bookmarks' && 'No bookmarked stories yet.'}
          </p>
        </div>

        {/* Edit Profile Modal */}
        <EditProfileModal 
          isOpen={isEditing} 
          onClose={() => setIsEditing(false)} 
          user={user}
          onSave={handleSaveProfile}
        />

      </div>
    </div>
  );
};

export default Profile;
