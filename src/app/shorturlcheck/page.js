"use client";
import { useState } from "react";

export default function CheckShortURL() {
  const [shortUrl, setShortUrl] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setOriginalUrl("");
    setError("");

    if (!shortUrl.trim()) {
      setError("⚠️ Please enter a short URL.");
      return;
    }

    setLoading(true);

    try {
      const shortCode = shortUrl.trim().split("/").pop();
      const res = await fetch(`https://skkhandokar22.pythonanywhere.com/api/checkshortcode/${shortCode}/`);
      const data = await res.json();

      if (res.ok) {
        setOriginalUrl(data.original_url);
      } else {
        setError(data.error || "❌ Short URL not found.");
      }
    } catch {
      setError("🚫 Failed to fetch. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-400 to-orange-300 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl p-8 space-y-6">
        <h1 className="text-3xl font-extrabold text-center text-emerald-800 tracking-wide">
          🔍 Check a Short URL
        </h1>

        <input
          type="text"
          placeholder="Enter full short URL (e.g. https://shortfy.xyz/UU3y3d)"
          value={shortUrl}
          onChange={(e) => setShortUrl(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/60"
        />

        <button
          onClick={handleCheck}
          disabled={loading}
          className="w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-orange-400 hover:from-emerald-600 hover:to-orange-500 text-white font-semibold py-3 rounded-lg transition-all hover:scale-105"
        >
          {loading ? "Checking..." : "Get Original URL"}
        </button>

        {originalUrl && (
          <div className="bg-green-100 border border-green-400 rounded-lg p-4 text-center text-green-700 shadow-md">
            <p className="font-semibold mb-2">✅ Original URL Found:</p>
            <a
              href={originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-800 underline break-words font-medium"
            >
              {originalUrl}
            </a>
          </div>
        )}

        {error && (
          <p className="text-center text-red-600 font-semibold">{error}</p>
        )}
      </div>
    </div>
  );
}
