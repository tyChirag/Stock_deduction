import React, { useRef } from 'react';
import { Upload, Camera, Image as ImageIcon } from 'lucide-react';
import Button from '../ui/Button';

export default function ImageUploader({ onImageSelect }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onImageSelect(file, url);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onImageSelect(file, url);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
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
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Upload Inventory Sheet</h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
        Drag and drop a bill, invoice, or handwritten note, or click to browse.
      </p>
      
      <div className="flex justify-center flex-wrap gap-4">
        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <Button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Upload Image
        </Button>
        <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2">
          <Camera className="h-4 w-4" />
          Open Camera
        </Button>
      </div>
    </div>
  );
}
