import React from 'react';
import type { Wine } from '../lib/db';

interface WineFormProps {
  wine: Partial<Wine>;
  onChange: (field: keyof Wine, value: any) => void;
  isLoading?: boolean;
}

export default function WineForm({ wine, onChange, isLoading }: WineFormProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={wine.name || ''}
            onChange={(e) => onChange('name', e.target.value)}
            className="input mt-1"
            disabled={isLoading}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Producer</label>
          <input
            type="text"
            value={wine.producer || ''}
            onChange={(e) => onChange('producer', e.target.value)}
            className="input mt-1"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Vintage</label>
          <input
            type="text"
            value={wine.vintage || ''}
            onChange={(e) => onChange('vintage', e.target.value)}
            className="input mt-1"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Varietal</label>
          <input
            type="text"
            value={wine.varietal || ''}
            onChange={(e) => onChange('varietal', e.target.value)}
            className="input mt-1"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Region</label>
          <input
            type="text"
            value={wine.region || ''}
            onChange={(e) => onChange('region', e.target.value)}
            className="input mt-1"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Country</label>
          <input
            type="text"
            value={wine.country || ''}
            onChange={(e) => onChange('country', e.target.value)}
            className="input mt-1"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Alcohol Content</label>
          <input
            type="text"
            value={wine.alcoholContent || ''}
            onChange={(e) => onChange('alcoholContent', e.target.value)}
            className="input mt-1"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="text"
            value={wine.price || ''}
            onChange={(e) => onChange('price', e.target.value)}
            className="input mt-1"
            disabled={isLoading}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          value={wine.notes || ''}
          onChange={(e) => onChange('notes', e.target.value)}
          rows={4}
          className="input mt-1"
          disabled={isLoading}
        />
      </div>
    </div>
  );
}