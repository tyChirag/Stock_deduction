import React, { useState } from 'react';
import ImageUploader from './ImageUploader';
import OCRScanner from './OCRScanner';
import InventoryPreviewTable from './InventoryPreviewTable';
import ScanHistory from './ScanHistory';
import { X, Sparkles } from 'lucide-react';

export default function SmartScanner({ onClose, onAddProducts }) {
  const [step, setStep] = useState('upload'); // 'upload', 'scanning', 'preview'
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  
  // Dummy extracted data
  const dummyData = [
    { product: "iPhone 15", quantity: 12, price: 79999 },
    { product: "AirPods Pro", quantity: 5, price: 24999 }
  ];

  const handleImageSelect = (file, url) => {
    setImageFile(file);
    setImageUrl(url);
    setStep('scanning');
  };

  const handleScanComplete = () => {
    setStep('preview');
  };

  const handleConfirm = (items) => {
    onAddProducts(items);
    onClose();
  };

  const handleCancel = () => {
    setImageFile(null);
    setImageUrl(null);
    setStep('upload');
  };

  return (
    <div className="bg-gray-50/50 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-800 rounded-xl p-4 sm:p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-500" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Smart Inventory Scanner</h2>
        </div>
        <button onClick={onClose} className="p-2 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          {step === 'upload' && (
            <ImageUploader onImageSelect={handleImageSelect} />
          )}
          
          {step === 'scanning' && (
            <OCRScanner onScanComplete={handleScanComplete} />
          )}

          {step === 'preview' && (
            <InventoryPreviewTable 
              initialData={dummyData} 
              onConfirm={handleConfirm} 
              onCancel={handleCancel} 
            />
          )}
        </div>
        
        <div className="lg:col-span-1">
          <ScanHistory />
        </div>
      </div>
    </div>
  );
}
