import React, { useState } from 'react';
import CameraScanner from './CameraScanner';
import PaperDetection from './PaperDetection';
import OCRProcessor from './OCRProcessor';
import ReviewInventoryModal from './ReviewInventoryModal';
import ProductImageUploader from '../ProductImageUploader';
import Button from '../../ui/Button';
import { Camera } from 'lucide-react';

export default function SmartScanner({ onComplete, onCancel }) {
  const [stage, setStage] = useState('UPLOAD'); // UPLOAD, CAMERA, DETECT, PROCESS, REVIEW
  const [imageSource, setImageSource] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [parsedData, setParsedData] = useState([]);
  const [rawText, setRawText] = useState("");

  // Stage 1: Upload or Camera
  const handleImageSelect = (fileOrUrl) => {
    setImageSource(fileOrUrl);
    setStage('DETECT');
  };

  // Stage 2: Paper Detection Complete
  const handleDetectionComplete = (enhancedImage) => {
    setProcessedImage(enhancedImage);
    setStage('PROCESS');
  };

  // Stage 3: OCR Processing Complete
  const handleOCRComplete = (data) => {
    setParsedData(data.products);
    setRawText(data.rawText);
    setStage('REVIEW');
  };

  // Stage 4: Review Complete
  const handleReviewConfirm = (finalData) => {
    onComplete(finalData);
  };

  return (
    <div className="w-full">
      {stage === 'UPLOAD' && (
        <div className="flex flex-col gap-6 max-w-xl mx-auto">
          <ProductImageUploader onImageSelect={({ file, url }) => handleImageSelect(file || url)} />
          
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
          </div>

          <Button 
            onClick={() => setStage('CAMERA')} 
            className="w-full py-6 flex items-center justify-center gap-2 text-lg bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
            variant="outline"
          >
            <Camera className="h-6 w-6 text-blue-500" />
            Open Camera Scanner
          </Button>
        </div>
      )}

      {stage === 'CAMERA' && (
        <CameraScanner 
          onCapture={(file) => handleImageSelect(file)}
          onCancel={() => setStage('UPLOAD')}
        />
      )}

      {stage === 'DETECT' && (
        <PaperDetection 
          imageSource={imageSource}
          onConfirm={handleDetectionComplete}
          onCancel={() => setStage('UPLOAD')}
        />
      )}

      {stage === 'PROCESS' && (
        <OCRProcessor 
          imageSource={processedImage}
          onScanComplete={handleOCRComplete}
          onCancel={() => setStage('DETECT')}
        />
      )}

      {stage === 'REVIEW' && (
        <ReviewInventoryModal 
          initialData={parsedData}
          rawText={rawText}
          onConfirm={handleReviewConfirm}
          onCancel={onCancel}
          onRescan={() => setStage('UPLOAD')}
        />
      )}
    </div>
  );
}
