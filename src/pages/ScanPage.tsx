import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { Camera, Upload, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { scanWineLabel } from '../lib/scanner';
import ImageUploader from '../components/ImageUploader';

export default function ScanPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const navigate = useNavigate();

  const handleCapture = async () => {
    if (!webcamRef.current) return;
    
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    setIsScanning(true);
    try {
      const wineData = await scanWineLabel(imageSrc);
      navigate('/edit', { state: { wineData, imageUrl: imageSrc } });
    } catch (error) {
      console.error('Scanning failed:', error);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Add Wine to Collection</h1>

      {!showCamera ? (
        <div className="space-y-6">
          <button
            onClick={() => setShowCamera(true)}
            className="w-full btn btn-primary flex items-center justify-center space-x-2"
          >
            <Camera className="h-5 w-5" />
            <span>Use Camera</span>
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gradient-to-br from-purple-50 to-rose-50 text-gray-500">
                or
              </span>
            </div>
          </div>

          <ImageUploader
            onImageSelected={async (file) => {
              setIsScanning(true);
              try {
                const wineData = await scanWineLabel(file);
                navigate('/edit', { state: { wineData, imageUrl: URL.createObjectURL(file) } });
              } catch (error) {
                console.error('Scanning failed:', error);
              } finally {
                setIsScanning(false);
              }
            }}
          />
        </div>
      ) : (
        <div className="relative">
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full rounded-lg shadow-lg"
          />
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
            <button
              onClick={() => setShowCamera(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleCapture}
              disabled={isScanning}
              className="btn btn-primary"
            >
              {isScanning ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                'Capture'
              )}
            </button>
          </div>
        </div>
      )}

      {isScanning && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <Loader className="h-8 w-8 animate-spin text-purple-600 mx-auto mb-4" />
            <p className="text-gray-700">Analyzing wine label...</p>
          </div>
        </div>
      )}
    </div>
  );
}