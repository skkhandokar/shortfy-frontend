"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function BulkShortener() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [invalidUrls, setInvalidUrls] = useState([]);
  const [authToken, setAuthToken] = useState(null);

  // 🔹 Check if user is logged in and get token
  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthToken(token);
  }, []);

  // 🔹 URL validation
  const isValidURL = (url) => {
    try {
      const u = new URL(url);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  };

  // 🔹 Live typing validation
  useEffect(() => {
    const lines = input
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    setInvalidUrls(lines.filter((l) => !isValidURL(l)));
  }, [input]);

  // 🔹 CSV upload
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

  // 🔹 Submit
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
      // ✅ Send auth token if available
      const config = authToken
        ? { headers: { Authorization: `Token ${authToken}` } }
        : {};

      const res = await axios.post(
        "https:skkhandokar22.pythonanywhere.com/api/bulk-create/",
        { urls: validUrls },
        config
      );

      setResults(res.data.data);
      setProgress(10);
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

  // 🔹 Copy all short URLs
  const copyAll = () => {
    navigator.clipboard.writeText(
      results.map((r) => `https://shortfy.xyz/${r.short_code}`).join("\n")
    );
  };

  // 🔹 Export CSV
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
    <div className="max-w-5xl mx-auto px-4 pt-24 md:pt-28 pb-6">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
        Bulk Shorten URLs Instantly
      </h1>
      <p className="text-gray-600 text-base md:text-lg mb-4">
        Shorten hundreds of long links at once, track clicks, and export results.
      </p>

      <label className="inline-block mb-3 text-sm bg-gray-100 px-4 py-2 rounded-lg border cursor-pointer hover:bg-gray-200">
        Upload CSV
        <input type="file" hidden accept=".csv" onChange={handleCSVUpload} />
      </label>

      <textarea
        rows={7}
        className="w-full border rounded-xl p-4 text-sm focus:ring-2 focus:ring-black outline-none"
        placeholder={`https://example.com/page\nhttps://google.com/search?q=bulk\nhttps://yourwebsite.com/blog`}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {input && (
        <div className="mt-3 text-sm border rounded-lg p-3 bg-gray-50">
          <p className="font-medium mb-1">Live validation preview:</p>
          {input.split("\n").map((line, i) => {
            const trimmed = line.trim();
            if (!trimmed) return null;
            const valid = isValidURL(trimmed);
            return (
              <p
                key={i}
                className={`break-all ${
                  valid
                    ? "text-green-700"
                    : "text-red-600 bg-red-50 px-1 rounded"
                }`}
              >
                {trimmed}
              </p>
            );
          })}
        </div>
      )}

      {errorMessage && (
        <p className="mt-3 text-sm text-red-600">{errorMessage}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-5 w-full md:w-auto bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-900 transition"
      >
        {loading ? "Processing..." : "Shorten URLs"}
      </button>

      {loading && (
        <div className="mt-4 h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-black rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {results.length > 0 && (
        <>
          <div className="flex flex-col md:flex-row gap-3 mt-6">
            <button
              onClick={copyAll}
              className="border px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              Copy All
            </button>
            <button
              onClick={exportCSV}
              className="border px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              Export CSV
            </button>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full border rounded-xl text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border">Original URL</th>
                  <th className="p-3 border">Short URL</th>
                  <th className="p-3 border">Clicks</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="p-3 border break-all">{r.original_url}</td>
                    <td className="p-3 border">
                      <a
                        href={`https://shortfy.xyz/${r.short_code}`}
                        target="_blank"
                        className="text-blue-600 hover:underline"
                      >
                        shortfy.xyz/{r.short_code}
                      </a>
                    </td>
                    <td className="p-3 border text-center">{r.clicks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
