'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

const IntroSection = () => {
  return (
    <Box className="mt-10 text-center bg-white/40 backdrop-blur-md rounded-2xl shadow-md p-6 sm:p-10">
      <Typography variant="h4" className="text-emerald-700 font-bold mb-4">
        🔗 The Original URL Shortener
      </Typography>
      <Typography variant="body1" className="text-gray-800 text-lg">
        Create shorter URLs instantly with our simple tool. 
        Track clicks, devices, countries, and browsers. 
        Customize your links with branded shortcodes and even QR codes.
      </Typography>
      <Typography variant="body2" className="mt-4 text-gray-600">
        Everything is free. Stay organized, safe, and efficient with your links.
      </Typography>
    </Box>
  );
};

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const handleShorten = async () => {
    setCopied(false);
    try {
      const res = await fetch('https://shortfy.xyz/api/shorten/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ original_url: originalUrl }),
      });

      const data = await res.json();
      if (res.ok) {
        setShortUrl(data.short_url);
      } else {
        alert(data.error || 'Failed to shorten URL');
      }
    } catch (error) {
      alert('Error shortening URL');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="bg-gradient-to-br from-emerald-100 via-teal-100 to-orange-100 min-h-screen py-20">
      <Container maxWidth="sm">
        <Box className="bg-white/40 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-10">
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            className="text-emerald-800 font-bold mb-4"
          >
            ✂️ Shorten Your Link
          </Typography>

          <TextField
            fullWidth
            label="Enter Original URL"
            variant="outlined"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            className="mb-4 bg-white rounded"
          />

          <Button
            fullWidth
            variant="contained"
            color="success"
            onClick={handleShorten}
            className="py-3"
          >
            Shorten URL
          </Button>

          {shortUrl && (
            <Paper
              elevation={3}
              className="mt-6 p-4 rounded-xl border border-gray-200 bg-white flex flex-col gap-2"
            >
              <Typography className="text-gray-800">
                Shortened URL:
              </Typography>
              <Box className="flex items-center justify-between">
                <Typography variant="body1" className="text-blue-600 font-semibold truncate">
                  {shortUrl}
                </Typography>
                <Button
                  onClick={handleCopy}
                  size="small"
                  variant="outlined"
                  color="primary"
                  className="ml-2"
                >
                  {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
                </Button>
              </Box>
            </Paper>
          )}
        </Box>

        {/* Intro / Summary Section */}
        <IntroSection />
      </Container>
    </main>
  );
}
