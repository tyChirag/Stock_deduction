import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import HelpCenterModal from './HelpCenterModal';

export default function HelpWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 sm:bottom-8 right-4 sm:right-8 z-40 p-3 sm:p-4 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group"
      >
        <HelpCircle className="h-6 w-6" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap dark:bg-gray-800">
          Quick Guide
        </span>
      </button>

      <HelpCenterModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
