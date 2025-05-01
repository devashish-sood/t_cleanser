'use client';

import { useState } from 'react';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [expandedUrl, setExpandedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleButtonClick = async () => {
    try {
      setError(null);
      const response = await fetch('/api/unshorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: inputValue }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to expand URL');
      }

      setExpandedUrl(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setExpandedUrl(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold mb-2">T Cleanser</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="px-4 py-2 border rounded"
          />
          <button
            onClick={handleButtonClick}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go
          </button>
        </div>
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
        {expandedUrl && (
          <div className="text-sm">
            Expanded URL: <a href={expandedUrl} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">{expandedUrl}</a>
          </div>
        )}
      </div>
    </div>
  );
}
