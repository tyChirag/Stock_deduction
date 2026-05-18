import React, { useEffect, useState } from 'react';
import { ScanSearch, Cpu, Sparkles, CheckCircle } from 'lucide-react';
import Tesseract from 'tesseract.js';
import { motion, AnimatePresence } from 'framer-motion';
import { preprocessImageForOCR } from '../../lib/imageUtils';
import { parseAndMergeInventory } from '../../lib/inventoryParser';

export default function OCRScanner({ imageFile, imageUrl, onScanComplete }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing AI Engine...");
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!imageFile && !imageUrl) return;

    let isMounted = true;
    const runOCR = async () => {
      try {
        // Step 1: Preprocessing
        setStatus("Enhancing image quality...");
        setStep(1);
        
        const target = imageFile || imageUrl;
        const processedImageBase64 = await preprocessImageForOCR(target);
        
        if (!isMounted) return;

        // Step 2: Extracting Text
        setStatus("Loading AI OCR Engine...");
        setStep(2);
        
        const result = await Tesseract.recognize(
          processedImageBase64,
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
        
        // Step 3: Parsing Data
        setStatus("Parsing & Cleaning inventory data...");
        setStep(3);
        
        const text = result.data.text;
        
        // Use smart parser
        const parsedProducts = parseAndMergeInventory(text);
        
        // Artificial delay for UI polish
        await new Promise(r => setTimeout(r, 800));
        
        if (!isMounted) return;

        // Step 4: Complete
        setStatus("Scan complete!");
        setStep(4);
        setTimeout(() => {
          if (isMounted) onScanComplete(parsedProducts, text);
        }, 800);

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
    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-[#1A1D24] overflow-hidden relative">
      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl" />
      
      <AnimatePresence mode="wait">
        <motion.div 
          key={step}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.1, opacity: 0 }}
          className="relative mb-6 z-10"
        >
          <div className="h-20 w-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center shadow-lg">
            {step === 1 && <Cpu className="h-10 w-10 text-blue-500 animate-pulse" />}
            {step === 2 && <ScanSearch className="h-10 w-10 text-blue-500 animate-bounce" />}
            {step === 3 && <Sparkles className="h-10 w-10 text-purple-500 animate-pulse" />}
            {step === 4 && <CheckCircle className="h-10 w-10 text-green-500" />}
          </div>
          {step < 4 && (
            <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full border-t-blue-500 animate-spin"></div>
          )}
        </motion.div>
      </AnimatePresence>
      
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 relative z-10">Smart AI Scanner</h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6 font-medium h-6 relative z-10 text-center">{status}</p>
      
      {step === 2 && (
        <div className="w-full max-w-md bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2 overflow-hidden relative z-10">
          <motion.div 
            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2.5 rounded-full" 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>
      )}
      
      {step === 2 && (
        <p className="text-sm text-gray-400 dark:text-gray-500 relative z-10">{progress}% Completed</p>
      )}
    </div>
  );
}
