import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Loader, Save, Search } from 'lucide-react';
import { db } from '../lib/db';
import type { Wine } from '../lib/db';
import WineForm from '../components/WineForm';
import { searchWineInfo } from '../lib/search';
import { scrapeWineData } from '../lib/scraper';

export default function EditWine() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isScraping, setIsScraping] = useState(false);
  const [wine, setWine] = useState<Partial<Wine>>(
    location.state?.wine || location.state?.wineData || {
      dateAdded: new Date(),
      links: [],
    }
  );

  useEffect(() => {
    if (id) {
      db.wines.get(parseInt(id)).then((existingWine) => {
        if (existingWine) {
          setWine(existingWine);
        }
      });
    }
  }, [id]);

  const handleChange = (field: keyof Wine, value: any) => {
    setWine((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      if (id) {
        await db.wines.update(parseInt(id), wine);
      } else {
        await db.wines.add(wine as Wine);
      }
      navigate('/collection');
    } catch (error) {
      console.error('Failed to save wine:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    setIsScraping(true);
    try {
      const searchQuery = `${wine.name} ${wine.producer} ${wine.vintage} wine`;
      const links = await searchWineInfo(searchQuery);
      
      // Scrape content from each link
      const scrapedData = await Promise.all(
        links.map((link) => scrapeWineData(link))
      );
      
      setWine((prev) => ({
        ...prev,
        links,
        scrapedData: scrapedData.join('\n\n'),
      }));
    } catch (error) {
      console.error('Failed to fetch wine info:', error);
    } finally {
      setIsScraping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          {id ? 'Edit Wine' : 'Add New Wine'}
        </h1>
        <div className="space-x-4">
          <button
            onClick={handleSearch}
            disabled={isScraping || !wine.name}
            className="btn btn-secondary"
          >
            {isScraping ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Find Info
              </>
            )}
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading || !wine.name}
            className="btn btn-primary"
          >
            {isLoading ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Wine
              </>
            )}
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <WineForm
          wine={wine}
          onChange={handleChange}
          isLoading={isLoading || isScraping}
        />

        {wine.imageUrl && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Label Image</h3>
            <img
              src={wine.imageUrl}
              alt="Wine Label"
              className="max-w-md rounded-lg shadow-md"
            />
          </div>
        )}

        {wine.scrapedData && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Additional Information</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 whitespace-pre-line">
                {wine.scrapedData}
              </p>
            </div>
          </div>
        )}

        {wine.links && wine.links.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Related Links</h3>
            <ul className="space-y-2">
              {wine.links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-800"
                  >
                    {new URL(link).hostname}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}