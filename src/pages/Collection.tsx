import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Search, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { db } from '../lib/db';
import WineCard from '../components/WineCard';
import EmptyState from '../components/EmptyState';

export default function Collection() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const wines = useLiveQuery(
    async () => {
      if (!searchQuery) {
        return db.wines.reverse().toArray();
      }
      
      const query = searchQuery.toLowerCase();
      return db.wines
        .filter(wine => 
          wine.name.toLowerCase().includes(query) ||
          wine.producer.toLowerCase().includes(query) ||
          wine.varietal.toLowerCase().includes(query) ||
          wine.region.toLowerCase().includes(query)
        )
        .reverse()
        .toArray();
    },
    [searchQuery]
  );

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this wine?')) {
      await db.wines.delete(id);
    }
  };

  if (!wines) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Wine Collection</h1>
        <Link to="/scan" className="btn btn-primary">
          <Plus className="h-4 w-4 mr-2" />
          Add Wine
        </Link>
      </div>

      {wines.length > 0 && (
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search your collection..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10"
            />
          </div>
        </div>
      )}

      {wines.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wines.map((wine) => (
            <WineCard
              key={wine.id}
              wine={wine}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}