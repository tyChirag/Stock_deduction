import React, { useState } from 'react';
import useStore from '../../store/useStore';
import Button from '../ui/Button';

export default function AccountSettings() {
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
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Profile Information</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Update your personal details and public profile.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Mobile Number</label>
            <input 
              type="tel" 
              value={formData.mobile}
              onChange={(e) => setFormData({...formData, mobile: e.target.value})}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Business Name</label>
            <input 
              type="text" 
              value={formData.businessName}
              onChange={(e) => setFormData({...formData, businessName: e.target.value})}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Store Address</label>
          <textarea 
            rows={3}
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
          {isSaved && <span className="text-sm text-green-600 dark:text-green-400 font-medium">Changes saved successfully!</span>}
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
}
