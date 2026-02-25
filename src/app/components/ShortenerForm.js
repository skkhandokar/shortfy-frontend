




"use client";

import { useState, useEffect } from "react";
import axios from "axios";
const BASE_URL = "https://skkhandokar22.pythonanywhere.com";
import { useRouter } from "next/navigation";
import {
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function ShortenerForm() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [customShortCode, setCustomShortCode] = useState("");
  const [isCustomShortCode, setIsCustomShortCode] = useState(false);

  const router = useRouter();
  const BASE_URLL = "https://shortfy.xyz";

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const isNotCustomValidLength =
    customShortCode.length === 0 ||
    customShortCode.length === 6 ||
    customShortCode.length === 7;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url || !url.startsWith("http")) {
      setError("Please enter a valid URL starting with http or https.");
      return;
    }

    if (isCustomShortCode && isNotCustomValidLength) {
      setError("Custom shortcode length cannot be 0, 6, or 7 characters.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const config = token
        ? { headers: { Authorization: `Token ${token}` } }
        : {};

      const data = isCustomShortCode
        ? { original_url: url, custom_shortcodes: [customShortCode] }
        : { original_url: url };

      const endpoint = isCustomShortCode
        ? `${BASE_URL}/api/custom-url/`
        : `${BASE_URL}/api/create/`;

      const response = await axios.post(endpoint, data, config);

      const shortened = isCustomShortCode
        ? `${BASE_URLL}/${customShortCode}`
        : `${BASE_URLL}/${response.data.short_code}`;

      setShortUrl(shortened);
      setError("");
      setSnackbarMessage("URL shortened successfully!");
      setOpenSnackbar(true);
    } catch (err) {
      setError(err.response?.data?.error || "Error creating short URL");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setSnackbarMessage("URL copied to clipboard!");
    setOpenSnackbar(true);
  };

  return (
    <Box className="w-full max-w-xl mx-auto bg-white border border-slate-200 rounded-3xl shadow-xl p-8 sm:p-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <TextField
          fullWidth
          label="Paste your long URL here"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />

        <Button
          type="button"
          variant={isCustomShortCode ? "contained" : "outlined"}
          onClick={() => setIsCustomShortCode(!isCustomShortCode)}
          fullWidth
        >
          {isCustomShortCode ? "Use Random Shortcode" : "Use Custom Shortcode"}
        </Button>

        {isCustomShortCode && (
          <TextField
            fullWidth
            label="Custom Shortcode"
            value={customShortCode}
            onChange={(e) => setCustomShortCode(e.target.value)}
            error={isNotCustomValidLength}
            helperText={
              isNotCustomValidLength
                ? "Cannot be 0, 6, or 7 characters"
                : ""
            }
          />
        )}

        <Button type="submit" variant="contained" fullWidth>
          Shorten It 🚀
        </Button>
      </form>

      {error && (
        <Typography color="error" className="mt-4 text-center">
          {error}
        </Typography>
      )}

      {shortUrl && (
        <>
          <Divider className="my-8" />

          <Box className="p-5 rounded-2xl bg-slate-50 text-center space-y-3 border border-slate-200">
            <Typography variant="h6" className="text-[#0A1A2F]">
              Your Short Link
            </Typography>

            <Box className="flex justify-center items-center gap-2 flex-wrap">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-slate-700 break-all"
              >
                {shortUrl}
              </a>

              <Button onClick={handleCopy} size="small" variant="contained">
                <ContentCopyIcon fontSize="small" />
              </Button>
            </Box>

            {isAuthenticated && (
              <Box className="flex flex-col sm:flex-row gap-2 mt-4">
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => router.push("/my-urls")}
                >
                  My URLs
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => router.push("/custom-urls")}
                >
                  Custom URLs
                </Button>
              </Box>
            )}
          </Box>
        </>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success">{snackbarMessage}</Alert>
      </Snackbar>
    </Box>
  );
}

