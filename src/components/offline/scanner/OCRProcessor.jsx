import React, { useEffect, useState } from 'react';
import Tesseract from 'tesseract.js';
import { parseAndMergeInventory } from '../../../lib/inventoryParser';
import ScanProgress from './ScanProgress';

export default function OCRProcessor({ imageSource, onScanComplete, onCancel }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing AI Engine...");
  const [step, setStep] = useState(1);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!imageSource) {
      setError(true);
      setStatus("No image source provided.");
      return;
    }

    let isMounted = true;
    const runOCR = async () => {
      try {
        if (!isMounted) return;

        // Step 2: Extracting Text
        setStatus("Loading AI OCR Engine...");
        setStep(2);
        
        // MOCK OCR FOR TESTING
        // Simulate Tesseract progress
        for(let i = 0; i <= 100; i+=20) {
          if (!isMounted) return;
          setProgress(i);
          setStatus(`Extracting text: ${i}%`);
          await new Promise(r => setTimeout(r, 200));
        }
        
        if (!isMounted) return;
        
        // Step 3: Parsing Data
        setStatus("Parsing & Cleaning inventory data...");
        setStep(3);
        
        // Hardcoded output requested by user
        const text = `Headphones - 10
Shirts - 25
Socks - 12
Lotion - 11
Books - 18`;
        
        // Use smart parser
        const parsedProducts = parseAndMergeInventory(text);
        
        // Artificial delay for UI polish
        await new Promise(r => setTimeout(r, 800));
        
        if (!isMounted) return;

        // Step 4: Complete
        setStatus("Scan complete!");
        setStep(4);
        setTimeout(() => {
          if (isMounted) onScanComplete({ products: parsedProducts, rawText: text });
        }, 800);

      } catch (err) {
        if (isMounted) {
          setError(true);
          setStatus("Error during scanning. Please try again.");
          console.error(err);
        }
      }
    };

    runOCR();

    return () => {
      isMounted = false;
    };
  }, [imageSource, onScanComplete]);

  return (
    <div className="w-full max-w-xl mx-auto">
      <ScanProgress 
        step={step} 
        progress={progress} 
        status={status} 
        error={error} 
      />
      {error && (
        <div className="mt-4 flex justify-center">
          <button 
            onClick={onCancel}
            className="text-blue-500 hover:underline"
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
}
