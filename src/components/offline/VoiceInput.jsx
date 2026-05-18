import React, { useState, useEffect } from 'react';
import { Mic, MicOff, AlertCircle } from 'lucide-react';
import Button from '../ui/Button';

export default function VoiceInput({ onParsedProducts }) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      setIsSupported(false);
    }
  }, []);

  const handleVoiceCommand = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setFeedback('Listening... Try saying: "Add 10 headphones and 5 shirts"');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase().trim();
      setFeedback(`You said: "${transcript}"`);
      
      // Parse the voice command
      // Example regex to match "10 headphones", "5 shirts"
      // Looks for a number followed by word(s)
      const regex = /(\d+)\s+([a-z\s]+?)(?=\s+and\s+|\s*,|\s*$)/g;
      
      let match;
      const parsedProducts = [];
      
      while ((match = regex.exec(transcript)) !== null) {
        const qty = parseInt(match[1], 10);
        const name = match[2].trim();
        // filter out filler words
        const cleanedName = name.replace(/^(add|remove|sell|update|delete|create)\s+/i, '');
        if (cleanedName && qty) {
          parsedProducts.push({
            product: cleanedName,
            quantity: qty,
            price: 0
          });
        }
      }

      if (parsedProducts.length > 0) {
        setFeedback(`Detected ${parsedProducts.length} product(s)!`);
        onParsedProducts(parsedProducts);
      } else {
        setFeedback(`Could not detect quantities and products. Try "Add 5 socks".`);
      }
    };

    recognition.onerror = (event) => {
      if (event.error !== 'no-speech') {
        setFeedback(`Error: ${event.error}`);
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  if (!isSupported) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
        <AlertCircle className="h-5 w-5" />
        <p>Voice input is not supported in your browser.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-[#1A1D24]">
      <div className="relative mb-6">
        <div className={`h-20 w-20 rounded-full flex items-center justify-center transition-all cursor-pointer ${
          isListening ? 'bg-red-100 text-red-500 animate-pulse' : 'bg-blue-100 text-blue-500 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50'
        }`} onClick={!isListening ? handleVoiceCommand : undefined}>
          {isListening ? <MicOff className="h-10 w-10" /> : <Mic className="h-10 w-10" />}
        </div>
        {isListening && (
          <div className="absolute inset-0 border-4 border-red-500 rounded-full border-t-transparent animate-spin"></div>
        )}
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Voice Input</h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6 text-center max-w-sm h-12">
        {feedback || 'Speak naturally to add multiple products at once.'}
      </p>
      
      <Button 
        variant={isListening ? "danger" : "default"} 
        onClick={handleVoiceCommand}
        disabled={isListening}
        className="w-full sm:w-auto"
      >
        {isListening ? 'Listening...' : 'Start Speaking'}
      </Button>
    </div>
  );
}
