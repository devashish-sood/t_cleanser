'use client';

import { useState } from 'react';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
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

      // Automatically redirect to the expanded URL
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-gray-50">
      <div className="w-full max-w-md flex flex-col gap-6 items-center bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800">Tiktok Link Cleanser</h2>
        <div className="w-full flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter TikTok URL"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleButtonClick}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium"
          >
            Fix
          </button>
        </div>
        {error && (
          <div className="w-full p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>
        )}
      </div>
    </div>
  );
}
