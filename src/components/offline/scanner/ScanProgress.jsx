import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScanSearch, Cpu, Sparkles, CheckCircle, AlertTriangle } from 'lucide-react';

export default function ScanProgress({ step, progress, status, error }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-[#1A1D24] overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl" />
      
      <AnimatePresence mode="wait">
        <motion.div 
          key={error ? 'error' : step}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.1, opacity: 0 }}
          className="relative mb-6 z-10"
        >
          <div className="h-20 w-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center shadow-lg">
            {error ? (
              <AlertTriangle className="h-10 w-10 text-red-500" />
            ) : (
              <>
                {step === 1 && <Cpu className="h-10 w-10 text-blue-500 animate-pulse" />}
                {step === 2 && <ScanSearch className="h-10 w-10 text-blue-500 animate-bounce" />}
                {step === 3 && <Sparkles className="h-10 w-10 text-purple-500 animate-pulse" />}
                {step === 4 && <CheckCircle className="h-10 w-10 text-green-500" />}
              </>
            )}
          </div>
          {step < 4 && !error && (
            <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full border-t-blue-500 animate-spin"></div>
          )}
        </motion.div>
      </AnimatePresence>
      
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 relative z-10">
        {error ? 'Scan Failed' : 'Smart AI Scanner'}
      </h3>
      
      <p className={`mb-6 font-medium h-6 relative z-10 text-center ${error ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
        {status}
      </p>
      
      {step === 2 && !error && (
        <div className="w-full max-w-md bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2 overflow-hidden relative z-10">
          <motion.div 
            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2.5 rounded-full" 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>
      )}
      
      {step === 2 && !error && (
        <p className="text-sm text-gray-400 dark:text-gray-500 relative z-10">{progress}% Completed</p>
      )}
    </div>
  );
}
