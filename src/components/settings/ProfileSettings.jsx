import React, { useState } from 'react';
import { Camera, Save } from 'lucide-react';
import useStore from '../../store/useStore';
import Button from '../ui/Button';
import Card from '../ui/Card';

export default function ProfileSettings() {
  const { user, updateUser } = useStore();
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    mobile: user.mobile || '',
    businessName: user.businessName || '',
    address: user.address || ''
  });
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Profile Settings</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your personal and business profile details.</p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-6 pb-6 border-b border-gray-100 dark:border-gray-800">
            <div className="relative group cursor-pointer">
              <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" className="h-full w-full object-cover bg-gray-50 dark:bg-gray-800" />
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Profile Picture</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">JPG, GIF or PNG. Max size of 800K</p>
              <div className="flex gap-3">
                <Button variant="outline" type="button" className="text-xs py-1.5 h-auto">Upload New</Button>
                <Button variant="ghost" type="button" className="text-xs py-1.5 h-auto text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20">Remove</Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-[#1A1D24] dark:text-white transition-shadow"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-[#1A1D24] dark:text-white transition-shadow"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
              <input 
                type="tel" 
                value={formData.mobile}
                onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-[#1A1D24] dark:text-white transition-shadow"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Business Name</label>
              <input 
                type="text" 
                value={formData.businessName}
                onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-[#1A1D24] dark:text-white transition-shadow"
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Store Address</label>
              <textarea 
                rows={3}
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-[#1A1D24] dark:text-white transition-shadow"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 pt-4 mt-6 border-t border-gray-100 dark:border-gray-800">
            {isSaved && <span className="text-sm text-green-600 dark:text-green-400 font-medium">Changes saved successfully!</span>}
            <Button type="button" variant="outline">Cancel</Button>
            <Button type="submit" className="gap-2">
              <Save className="h-4 w-4" /> Save Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
