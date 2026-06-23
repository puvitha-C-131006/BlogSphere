import React, { useState } from 'react';
import { FiX, FiTrash2, FiTwitter, FiLinkedin, FiGithub } from 'react-icons/fi';
import Button from '../common/Button';

const EditProfileModal = ({ isOpen, onClose, user, onSave }) => {
  const [form, setForm] = useState({
    name: user?.name || '',
    username: user?.username || '',
    bio: user?.bio || '',
    avatar: user?.avatar || '',
    bannerUrl: user?.bannerUrl || '',
    website: user?.website || '',
    location: user?.location || '',
    twitter: user?.twitter || '',
    linkedin: user?.linkedin || '',
    github: user?.github || ''
  });

  const [previewAvatar, setPreviewAvatar] = useState(user?.avatar || '');
  const [previewBanner, setPreviewBanner] = useState(user?.bannerUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop');

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({ ...form, avatar: previewAvatar, bannerUrl: previewBanner });
  };

  const handleAvatarPreset = (url) => {
    setPreviewAvatar(url);
    setForm({ ...form, avatar: url });
  };

  const handleBannerPreset = (url) => {
    setPreviewBanner(url);
    setForm({ ...form, bannerUrl: url });
  };

  const presetBanners = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2564&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1505909182942-e2f09aee3e89?q=80&w=2564&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2564&auto=format&fit=crop'
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-5xl shadow-2xl flex flex-col max-h-[95vh]">
        
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-gray-100 dark:border-gray-800 shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Profile</h2>
            <p className="text-sm text-gray-500 mt-1">Update your professional bio, profile picture, social links, and contact options.</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full dark:[&::-webkit-scrollbar-thumb]:bg-gray-600">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Form Column */}
            <div className="lg:col-span-2 space-y-8">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Full Name *</label>
                  <input 
                    type="text" 
                    value={form.name} 
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Username *</label>
                  <input 
                    type="text" 
                    value={form.username} 
                    onChange={(e) => setForm({...form, username: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  />
                </div>
              </div>

              {/* Cover Banner Image */}
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Cover Banner Image</label>
                <div className="w-full h-24 rounded-xl border border-gray-200 dark:border-gray-700 mb-4 overflow-hidden relative">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${previewBanner}')`}}></div>
                </div>
                
                <div className="mb-3">
                  <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Custom Banner URL</label>
                  <input 
                    type="text" 
                    value={previewBanner}
                    onChange={(e) => setPreviewBanner(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Curated Banner Presets:</label>
                  <div className="flex gap-2">
                    {presetBanners.map((url, idx) => (
                      <button key={idx} onClick={() => handleBannerPreset(url)} className="w-16 h-8 rounded-md border border-gray-200 hover:scale-105 transition-transform overflow-hidden relative">
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${url}')`}}></div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Bio</label>
                <textarea 
                  value={form.bio} 
                  onChange={(e) => setForm({...form, bio: e.target.value})}
                  rows="3"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none text-sm"
                  placeholder="A reader and writer on BlogSphere publishing platform."
                ></textarea>
              </div>

              {/* Website and Location */}
              <div className="grid grid-cols-2 gap-4 border-b border-gray-100 dark:border-gray-800 pb-8">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Website Link</label>
                  <input 
                    type="text" 
                    value={form.website} 
                    onChange={(e) => setForm({...form, website: e.target.value})}
                    placeholder="https://example.com"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Location</label>
                  <input 
                    type="text" 
                    value={form.location} 
                    onChange={(e) => setForm({...form, location: e.target.value})}
                    placeholder="City, Country"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
                  />
                </div>
              </div>

              {/* Social Profiles */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-3">Social Profiles</label>
                <div className="space-y-3">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <FiTwitter className="w-4 h-4" />
                    </div>
                    <input type="text" value={form.twitter} onChange={(e) => setForm({...form, twitter: e.target.value})} placeholder="Twitter Handle (e.g. twitter_user)" className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm" />
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <FiLinkedin className="w-4 h-4" />
                    </div>
                    <input type="text" value={form.linkedin} onChange={(e) => setForm({...form, linkedin: e.target.value})} placeholder="LinkedIn Profile Name (e.g. user-name)" className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm" />
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <FiGithub className="w-4 h-4" />
                    </div>
                    <input type="text" value={form.github} onChange={(e) => setForm({...form, github: e.target.value})} placeholder="GitHub Username (e.g. github_user)" className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm" />
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Preview */}
            <div className="lg:col-span-1">
              <div className="sticky top-0 pt-4">
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-3">Real-Time Profile Preview</label>
                
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm">
                  {/* Banner */}
                  <div className="h-24 relative">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${previewBanner}')`}}></div>
                  </div>
                  
                  {/* Avatar */}
                  <div className="flex justify-center -mt-10 relative z-10 mb-2">
                    <div className="w-20 h-20 rounded-full border-4 border-white dark:border-gray-900 bg-gray-100 flex items-center justify-center overflow-hidden">
                      {previewAvatar && !previewAvatar.includes('dicebear') ? (
                        <img src={previewAvatar} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-3xl font-bold text-gray-400">{form.name?.charAt(0).toUpperCase() || 'U'}</span>
                      )}
                    </div>
                  </div>

                  <div className="text-center px-6 pb-6">
                    <h3 className="font-bold text-gray-900 dark:text-white leading-tight">{form.name || 'Your Name'}</h3>
                    <p className="text-xs text-gray-500 mb-3">@{form.username || 'username'}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                      {form.bio || 'A reader and writer on BlogSphere publishing platform.'}
                    </p>

                    <div className="flex justify-center gap-8 border-t border-gray-100 dark:border-gray-800 pt-4">
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white text-sm">0</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">Posts</p>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white text-sm">0</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">Followers</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 dark:border-gray-800 p-6 flex justify-end gap-3 bg-gray-50 dark:bg-gray-800/50 rounded-b-2xl shrink-0">
          <Button variant="outline" className="rounded-full px-6 py-2 border-gray-300" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} className="rounded-full px-6 py-2 bg-[#0f172a] hover:bg-black text-white">Save Changes</Button>
        </div>

      </div>
    </div>
  );
};

export default EditProfileModal;
