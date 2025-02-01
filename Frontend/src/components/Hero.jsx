import { useState } from "react";
import axios from "axios";

const Hero = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShortUrl("");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/short`,
        { originalUrl }
      );
      setShortUrl(`${import.meta.env.VITE_BACKEND_URL}/${res.data.url.shortUrl}`);
    } catch (err) {
      setError("Failed to shorten URL");
    }
    setLoading(false);
  };

  return (
    <div className="h-full flex py-20 items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">URL Shortener</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="url"
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
            placeholder="Enter your URL"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Shortening..." : "Shorten URL"}
          </button>
        </form>
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        {shortUrl && (
          <div className="mt-4 p-3 bg-gray-700 rounded text-center">
            <p>Shortened URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 break-words"
            >
              {shortUrl}
            </a>
            <button
              onClick={() => navigator.clipboard.writeText(shortUrl)}
              className="block mt-2 bg-green-500 hover:bg-green-600 py-1 px-4 rounded"
            >
              Copy
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
