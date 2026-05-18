import React, { useRef, useState } from 'react';
import { Upload, Camera, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import Button from '../ui/Button';

export default function ProductImageUploader({ onImageSelect }) {
  const [url, setUrl] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      onImageSelect({ file, url: objectUrl, type: 'file' });
    }
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (url) {
      onImageSelect({ file: null, url: url, type: 'url' });
      setUrl('');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      onImageSelect({ file, url: objectUrl, type: 'file' });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-4">
      <div 
        className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center hover:bg-gray-50 dark:hover:bg-[#1A1D24] transition-colors"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-full flex items-center justify-center">
            <ImageIcon className="h-8 w-8" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Upload Product Image</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
          Drag and drop an image file, or click to browse.
        </p>
        
        <div className="flex justify-center flex-wrap gap-4">
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <Button type="button" onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload File
          </Button>
          <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 border-gray-300 dark:border-gray-700">
            <Camera className="h-4 w-4" />
            Open Camera
          </Button>
        </div>
      </div>
      
      <div className="relative flex items-center py-2">
        <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
        <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">OR</span>
        <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
      </div>
      
      <form onSubmit={handleUrlSubmit} className="flex gap-2">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LinkIcon className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste image URL here..."
            className="block w-full pl-10 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A1D24] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          />
        </div>
        <Button type="submit" disabled={!url} variant="secondary">Add URL</Button>
      </form>
    </div>
  );
}
