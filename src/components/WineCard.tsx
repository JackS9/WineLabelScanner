import React from 'react';
import { Link } from 'react-router-dom';
import { Wine, Edit, Trash2 } from 'lucide-react';
import type { Wine as WineType } from '../lib/db';

interface WineCardProps {
  wine: WineType;
  onDelete: (id: number) => void;
}

export default function WineCard({ wine, onDelete }: WineCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        {wine.imageUrl ? (
          <img
            src={wine.imageUrl}
            alt={wine.name}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
            <Wine className="h-12 w-12 text-gray-400" />
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {wine.name}
        </h3>
        <p className="text-sm text-gray-600 mb-2">
          {wine.producer} • {wine.vintage}
        </p>
        
        <div className="text-sm text-gray-500 space-y-1 mb-4">
          <p>{wine.varietal}</p>
          <p>{wine.region}, {wine.country}</p>
          {wine.price && <p>Price: {wine.price}</p>}
        </div>

        <div className="flex justify-between items-center">
          <Link
            to={`/edit/${wine.id}`}
            className="btn btn-secondary py-1 px-3"
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Link>
          <button
            onClick={() => wine.id && onDelete(wine.id)}
            className="text-red-600 hover:text-red-800 p-2"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}