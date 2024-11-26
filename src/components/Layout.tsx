import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Wine, GalleryHorizontalEnd, PlusCircle } from 'lucide-react';

export default function Layout() {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-rose-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center space-x-2">
                <Wine className="h-6 w-6 text-purple-600" />
                <span className="font-semibold text-xl">WineScanner</span>
              </Link>
            </div>
            
            <div className="flex space-x-8">
              <Link
                to="/scan"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  location.pathname === '/scan'
                    ? 'border-purple-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Wine
              </Link>
              <Link
                to="/collection"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  location.pathname === '/collection'
                    ? 'border-purple-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <GalleryHorizontalEnd className="h-4 w-4 mr-2" />
                Collection
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}