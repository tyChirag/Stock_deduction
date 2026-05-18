import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, RefreshCw, AlertTriangle } from 'lucide-react';
import Button from '../../ui/Button';

export default function CameraScanner({ onCapture, onCancel }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      // Prioritize the rear camera on mobile devices
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Could not access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Set canvas dimensions to match video stream
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert to Data URL (JPEG for smaller size, high quality)
    const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
    
    // Convert base64 to File object to mimic upload
    fetch(dataUrl)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
        onCapture(file, dataUrl);
      });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-black/50 absolute top-0 w-full z-10 text-white">
        <h3 className="font-semibold">Scanner Mode</h3>
        <button onClick={onCancel} className="p-2 hover:bg-white/20 rounded-full transition-colors">
          <X className="h-6 w-6" />
        </button>
      </div>

      {error ? (
        <div className="flex-grow flex flex-col items-center justify-center p-8 text-center text-white">
          <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
          <p className="text-xl mb-6">{error}</p>
          <Button onClick={onCancel} variant="outline" className="border-white text-white hover:bg-white/10">
            Go Back
          </Button>
        </div>
      ) : (
        <div className="relative flex-grow flex items-center justify-center overflow-hidden">
          {/* Live Video Feed */}
          <video 
            ref={videoRef}
            autoPlay 
            playsInline 
            className="absolute min-w-full min-h-full object-cover"
          />
          
          {/* Hidden Canvas for capturing the frame */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Scanner Overlay (Viewfinder) */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
            {/* Darkened edges */}
            <div className="w-full h-full border-[40px] border-black/40 relative">
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-500"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-500"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-500"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-500"></div>
              
              {/* Animated scan line */}
              <div className="absolute left-0 right-0 h-0.5 bg-blue-500/50 shadow-[0_0_8px_2px_rgba(59,130,246,0.5)] animate-[scan_2s_ease-in-out_infinite]" />
            </div>
            
            <p className="absolute bottom-32 text-white font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-md animate-pulse">
              Align inventory sheet within frame
            </p>
          </div>
        </div>
      )}

      {/* Controls */}
      {!error && (
        <div className="h-32 bg-black w-full flex items-center justify-around pb-6 px-8 relative z-20">
          <button 
            onClick={() => {
              stopCamera();
              startCamera();
            }}
            className="p-4 text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <RefreshCw className="h-6 w-6" />
          </button>
          
          <button 
            onClick={handleCapture}
            className="h-20 w-20 bg-white rounded-full border-4 border-gray-300 active:scale-95 transition-transform flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            <Camera className="h-8 w-8 text-black" />
          </button>
          
          <div className="w-14" /> {/* Spacer to balance the layout */}
        </div>
      )}
    </div>
  );
}
