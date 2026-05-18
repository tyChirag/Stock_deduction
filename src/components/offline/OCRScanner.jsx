import React, { useEffect, useState } from 'react';
import { ScanSearch } from 'lucide-react';
import Tesseract from 'tesseract.js';

export default function OCRScanner({ imageFile, imageUrl, onScanComplete }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing AI Engine...");

  useEffect(() => {
    if (!imageFile && !imageUrl) return;

    let isMounted = true;
    const runOCR = async () => {
      try {
        setStatus("Loading OCR Engine...");
        
        // Target is either file object or a URL
        const target = imageFile || imageUrl;
        
        const result = await Tesseract.recognize(
          target,
          'eng',
          {
            logger: m => {
              if (m.status === 'recognizing text' && isMounted) {
                setProgress(Math.floor(m.progress * 100));
                setStatus(`Extracting text: ${Math.floor(m.progress * 100)}%`);
              }
            }
          }
        );
        
        if (!isMounted) return;
        
        const text = result.data.text;
        setStatus("Parsing inventory data...");
        
        // Regex parsing logic for handwritten/printed formats
        // Examples: "Books - 18", "Socks 12", "Lotion : 11"
        const lines = text.split('\n');
        const parsedProducts = [];
        const regex = /^([a-zA-Z0-9\s]+?)\s*[-:]?\s*(\d+)$/;
        
        lines.forEach(line => {
          const match = line.trim().match(regex);
          if (match) {
            const productName = match[1].trim();
            const qty = parseInt(match[2], 10);
            if (productName && qty) {
              parsedProducts.push({
                product: productName,
                quantity: qty,
                price: 0
              });
            }
          }
        });
        
        setStatus("Scan complete!");
        setTimeout(() => {
          if (isMounted) onScanComplete(parsedProducts, text);
        }, 500);

      } catch (error) {
        if (isMounted) {
          setStatus("Error during scanning. Please try again.");
          console.error(error);
          setTimeout(() => onScanComplete([], ""), 1500);
        }
      }
    };

    runOCR();

    return () => {
      isMounted = false;
    };
  }, [imageFile, imageUrl, onScanComplete]);

  return (
    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-[#1A1D24]">
      <div className="relative mb-6">
        <div className="h-20 w-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center animate-pulse">
          <ScanSearch className="h-10 w-10 text-blue-500" />
        </div>
        <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Smart Scanning</h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6 font-medium h-6">{status}</p>
      
      <div className="w-full max-w-md bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2 overflow-hidden">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-400 dark:text-gray-500">{progress}% Completed</p>
    </div>
  );
}
