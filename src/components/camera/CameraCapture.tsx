import React, { useRef } from 'react';
import Webcam from 'react-webcam';
import { Camera, X } from 'lucide-react';

interface CameraCaptureProps {
  onCapture: (imageSrc: string) => void;
  onClose: () => void;
  isLoading?: boolean;
}

export default function CameraCapture({ onCapture, onClose, isLoading }: CameraCaptureProps) {
  const webcamRef = useRef<Webcam>(null);

  const handleCapture = () => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      onCapture(imageSrc);
    }
  };

  return (
    <div className="relative">
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="w-full rounded-lg shadow-lg"
      />
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
        <button
          onClick={onClose}
          className="btn btn-secondary"
        >
          <X className="h-5 w-5 mr-2" />
          Cancel
        </button>
        <button
          onClick={handleCapture}
          disabled={isLoading}
          className="btn btn-primary"
        >
          <Camera className="h-5 w-5 mr-2" />
          Capture
        </button>
      </div>
    </div>
  );
}