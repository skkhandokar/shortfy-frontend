


'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import { Import } from "lucide-react";
import BASE_URL from "@/config/api";


export default function BulkShortener() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthToken(token);
  }, []);

  const isValidURL = (url) => {
    try {
      const u = new URL(url);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  };

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const lines = reader.result
        .split("\n")
        .map((l) => l.replace(/"/g, "").trim())
        .filter((l) => l && !l.toLowerCase().includes("url"));
      setInput(lines.join("\n"));
    };
    reader.readAsText(file);
  };

  const handleSubmit = async () => {
    setErrorMessage("");
    const urls = input
      .split("\n")
      .map((u) => u.trim())
      .filter(Boolean);

    const validUrls = urls.filter(isValidURL);
    if (validUrls.length === 0) {
      setErrorMessage("Please enter at least one valid URL.");
      return;
    }

    setLoading(true);
    setProgress(40);

    try {
      const config = authToken
        ? { headers: { Authorization: `Token ${authToken}` } }
        : {};
      const res = await axios.post(
        `${BASE_URL}/api/bulk-create/`,
        { urls: validUrls },
        config
      );
      setResults(res.data.data);
      setProgress(100);
    } catch (err) {
      setErrorMessage(
        err.response?.data?.error || "Bulk shortening failed. Please try again."
      );
    }

    setTimeout(() => {
      setLoading(false);
      setProgress(0);
    }, 500);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(
      results.map((r) => `https://shortfy.xyz/${r.short_code}`).join("\n")
    );
  };

  const exportCSV = () => {
    const csv =
      "Original URL,Short URL,Clicks\n" +
      results
        .map(
          (r) =>
            `"${r.original_url}","https://shortfy.xyz/${r.short_code}",${r.clicks}`
        )
        .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "shortfy-bulk-results.csv";
    a.click();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pt-24 md:pt-28 pb-12 bg-white text-black min-h-screen">

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-[#0A1A2F] text-center md:text-left">
        Bulk Shorten URLs Instantly
      </h1>
      <p className="text-gray-700 text-base md:text-lg mb-6 text-center md:text-left">
        Shorten hundreds of long links at once, track clicks, and export results.
      </p>

      {/* CSV Upload */}
      <label className="inline-block mb-4 text-sm bg-[#0A1A2F] text-white px-5 py-3 rounded-xl border border-gray-300 cursor-pointer hover:bg-gray-900 transition-all duration-300">
        Upload CSV
        <input type="file" hidden accept=".csv" onChange={handleCSVUpload} />
      </label>

      {/* Input Textarea */}
      <textarea
        rows={7}
        className="w-full border border-gray-300 rounded-2xl p-5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white text-black shadow-sm"
        placeholder={`https://example.com/page\nhttps://google.com/search?q=bulk\nhttps://yourwebsite.com/blog`}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {/* Live Validation */}
      {input && (
        <div className="mt-4 text-sm border rounded-xl p-4 bg-gray-50 shadow-md">
          <p className="font-medium mb-2 text-gray-800">
            Live validation preview:
          </p>
          {input.split("\n").map((line, i) => {
            const trimmed = line.trim();
            if (!trimmed) return null;
            const valid = isValidURL(trimmed);
            return (
              <p
                key={i}
                className={`break-all ${
                  valid ? "text-green-700" : "text-red-600 bg-red-50 px-1 rounded"
                }`}
              >
                {trimmed}
              </p>
            );
          })}
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <p className="mt-3 text-sm text-red-600">{errorMessage}</p>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-6 w-full md:w-auto bg-[#0A1A2F] text-white font-semibold px-8 py-4 rounded-2xl hover:bg-gray-900 transition-all duration-300 shadow-lg"
      >
        {loading ? "Processing..." : "Shorten URLs"}
      </button>

      {/* Progress Bar */}
      {loading && (
        <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-2 bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Results Section */}
      {results.length > 0 && (
        <div className="mt-8 space-y-4">

          {/* Copy & Export Buttons */}
          <div className="flex flex-col md:flex-row gap-3">
            <button
              onClick={copyAll}
              className="border border-blue-400 px-5 py-2 rounded-xl bg-[#0A1A2F] text-white hover:bg-gray-900 transition-all duration-300 shadow-sm font-medium"
            >
              Copy All
            </button>
            <button
              onClick={exportCSV}
              className="border border-blue-400 px-5 py-2 rounded-xl bg-[#0A1A2F] text-white hover:bg-gray-900 transition-all duration-300 shadow-sm font-medium"
            >
              Export CSV
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-xl text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border border-gray-300 text-left">Original URL</th>
                  <th className="p-3 border border-gray-300 text-left">Short URL</th>
                  <th className="p-3 border border-gray-300 text-center">Clicks</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50 transition-colors duration-300">
                    <td className="p-3 border border-gray-300 break-all">{r.original_url}</td>
                    <td className="p-3 border border-gray-300">
                      <a
                        href={`https://shortfy.xyz/${r.short_code}`}
                        target="_blank"
                        className="text-blue-700 hover:underline"
                      >
                        shortfy.xyz/{r.short_code}
                      </a>
                    </td>
                    <td className="p-3 border border-gray-300 text-center">{r.clicks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

    </div>
  );
}
