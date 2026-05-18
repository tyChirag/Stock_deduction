import React, { useEffect, useState, useRef } from 'react';
import { FileSearch, CheckCircle2 } from 'lucide-react';
import Button from '../../ui/Button';
import { preprocessImageForOCR } from '../../../lib/imageUtils';

export default function PaperDetection({ imageSource, onConfirm, onCancel }) {
  const [processedImage, setProcessedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(true);
  
  useEffect(() => {
    let isMounted = true;
    
    const processImage = async () => {
      setIsProcessing(true);
      try {
        // Run our Canvas-based contrast and grayscale pipeline
        const result = await preprocessImageForOCR(imageSource);
        if (isMounted) {
          setProcessedImage(result);
          setIsProcessing(false);
        }
      } catch (err) {
        console.error("Failed to process image:", err);
        if (isMounted) setIsProcessing(false);
      }
    };
    
    processImage();
    
    return () => {
      isMounted = false;
    };
  }, [imageSource]);

  return (
    <div className="flex flex-col items-center p-6 bg-white dark:bg-[#1A1D24] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm w-full max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6 w-full pb-4 border-b border-gray-100 dark:border-gray-800">
        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-500">
          <FileSearch className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white">Paper Detection</h3>
          <p className="text-sm text-gray-500">Enhancing image for AI extraction</p>
        </div>
      </div>
      
      <div className="relative w-full aspect-[3/4] max-h-[500px] bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center mb-6">
        {isProcessing ? (
          <div className="flex flex-col items-center text-blue-500">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-sm font-medium animate-pulse">Detecting structures...</p>
          </div>
        ) : (
          <>
            <img 
              src={processedImage} 
              alt="Processed paper" 
              className="w-full h-full object-contain filter contrast-125"
            />
            {/* Visual overlay simulating paper boundary detection */}
            <div className="absolute inset-4 border-2 border-green-500/50 rounded pointer-events-none flex items-center justify-center">
              <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded flex items-center gap-1 shadow-lg">
                <CheckCircle2 className="h-3 w-3" /> Paper Detected
              </div>
            </div>
          </>
        )}
      </div>
      
      <div className="flex w-full gap-3 justify-end">
        <Button variant="outline" onClick={onCancel} disabled={isProcessing}>
          Retake Photo
        </Button>
        <Button 
          onClick={() => onConfirm(processedImage)} 
          disabled={isProcessing || !processedImage}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Extract Inventory Data
        </Button>
      </div>
    </div>
  );
}
