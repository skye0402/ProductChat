'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  const [matchcode, setMatchcode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleClearVectorStore = async () => {
    setIsLoading(true);
    setStatus('Clearing vector store...');
    
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'clear' }),
      });
      
      const data = await response.json();
      setStatus(data.message || data.error);
    } catch (error) {
      console.error('Error clearing vector store:', error);
      setStatus('Error clearing vector store');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInitialLoad = async () => {
    if (!matchcode) {
      setStatus('Please enter a matchcode');
      return;
    }

    setIsLoading(true);
    setStatus('Loading products...');

    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          action: 'load',
          matchcode 
        }),
      });
      
      const data = await response.json();
      setStatus(data.message || data.error);
    } catch (error) {
      console.error('Error loading products:', error);
      setStatus('Error loading products');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="p-4 border-b mb-4">
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-2" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
              clipRule="evenodd" 
            />
          </svg>
          Back to Menu
        </Link>
      </div>

      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        <div className="space-y-4">
          <button
            onClick={handleClearVectorStore}
            disabled={isLoading}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400"
          >
            Clear HANA VS
          </button>

          <div className="space-y-2">
            <input
              type="text"
              value={matchcode}
              onChange={(e) => setMatchcode(e.target.value)}
              placeholder="Enter matchcode (e.g., APJ*)"
              className="w-full p-2 border rounded-lg"
              disabled={isLoading}
            />
            <button
              onClick={handleInitialLoad}
              disabled={isLoading}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              Initial Load with SAP Product Master API
            </button>
          </div>

          {status && (
            <div className="p-4 bg-gray-100 rounded-lg">
              {status}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 