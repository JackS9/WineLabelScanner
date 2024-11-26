import React from 'react';
import { Wine } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmptyState() {
  return (
    <div className="text-center py-12">
      <Wine className="h-16 w-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No wines in your collection
      </h3>
      <p className="text-gray-500 mb-6">
        Start by adding your first wine to your collection.
      </p>
      <Link to="/scan" className="btn btn-primary">
        Add Your First Wine
      </Link>
    </div>
  );
}