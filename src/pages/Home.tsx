import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Library, Search } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center -mt-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Your Personal Wine Journey
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Scan wine labels, discover detailed information, and build your collection.
          Let's explore the world of wine together.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-4xl w-full">
        <Link
          to="/scan"
          className="group bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
            <Camera className="h-8 w-8 text-purple-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Scan Wine Label</h2>
          <p className="text-gray-600">
            Use your camera to instantly capture and analyze wine labels
          </p>
        </Link>

        <Link
          to="/collection"
          className="group bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          <div className="bg-rose-100 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-rose-200 transition-colors">
            <Library className="h-8 w-8 text-rose-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Your Collection</h2>
          <p className="text-gray-600">
            Browse and manage your personal wine collection
          </p>
        </Link>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-amber-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Smart Analysis</h2>
          <p className="text-gray-600">
            Get detailed information and recommendations for each wine
          </p>
        </div>
      </div>

      <div className="mt-16 text-center">
        <p className="text-sm text-gray-500">
          Powered by advanced AI and comprehensive wine data
        </p>
      </div>
    </div>
  );
}