'use client';
import { useState } from 'react';

export default function CheckShortURL() {
  const [shortUrl, setShortUrl] = useState('');
  const [originalUrl, setOriginalUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setOriginalUrl('');
    setError('');

    if (!shortUrl.trim()) {
      setError('⚠️ Please enter a short URL.');
      return;
    }

    setLoading(true);

    try {
      const shortCode = shortUrl.trim().split('/').pop();
      const res = await fetch(
        `https://skkhandokar22.pythonanywhere.com/api/checkshortcode/${shortCode}/`
      );
      const data = await res.json();

      if (res.ok) {
        setOriginalUrl(data.original_url);
      } else {
        setError(data.error || '❌ Short URL not found.');
      }
    } catch {
      setError('🚫 Failed to fetch. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen md:min-h-screen bg-gray-100 flex flex-col items-center justify-start md:justify-center px-4 pt-20 md:pt-0">

      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 space-y-6">
        {/* SEO-Friendly Heading */}
        <h1 className="text-3xl font-extrabold text-center text-gray-900 tracking-wide">
          🔍 Check a Short URL
        </h1>
        <p className="text-center text-gray-700">
          Enter a short URL to find its original link.
        </p>

        {/* Input */}
        <input
          type="text"
          placeholder="Enter full short URL (e.g. https://shortfy.xyz/UU3y3d)"
          value={shortUrl}
          onChange={(e) => setShortUrl(e.target.value)}
          className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 bg-gray-100 text-gray-900"
        />

        {/* Button */}
        <button
          onClick={handleCheck}
          disabled={loading}
          className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-3 rounded-lg transition-all hover:scale-105"
        >
          {loading ? 'Checking...' : 'Get Original URL'}
        </button>

        {/* Original URL Result */}
        {originalUrl && (
          <div className="bg-gray-100 border border-gray-400 rounded-lg p-4 text-center text-gray-900 shadow-md">
            <p className="font-semibold mb-2">✅ Original URL Found:</p>
            <a
              href={originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline break-words font-medium text-gray-800"
            >
              {originalUrl}
            </a>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <p className="text-center text-red-600 font-semibold">{error}</p>
        )}
      </div>
    </div>
  );
}
