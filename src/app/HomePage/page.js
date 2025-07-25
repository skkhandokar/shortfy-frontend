"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {
  Container, TextField, Button, Box, Typography,
  Snackbar, Alert, Divider
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [customShortCode, setCustomShortCode] = useState('');
  const [isCustomShortCode, setIsCustomShortCode] = useState(false);
  const router = useRouter();

  // Move this here to use in both render and submit
  const isNotCustomValidLength = (customShortCode.length ===0 ||customShortCode.length ===6 || customShortCode.length ===7);

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

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url || !url.startsWith('http')) {
      setError('Please enter a valid URL starting with http or https.');
      return;
    }

    if (isCustomShortCode && isNotCustomValidLength) {
    setError('Custom shortcode length cannot be 0, 6, or 7 characters.');
    return;
  }

    try {
      const token = localStorage.getItem('token');
      const config = token
        ? { headers: { Authorization: `Token ${token}` } }
        : {};

      const data = isCustomShortCode
        ? { original_url: url, custom_shortcodes: [customShortCode] }
        : { original_url: url };

      const endpoint = isCustomShortCode
        ? 'https://skkhandokar22.pythonanywhere.com/api/custom-url/'
        : 'https://skkhandokar22.pythonanywhere.com/api/create/';

      const response = await axios.post(endpoint, data, config);

      const shortened = isCustomShortCode
        ? `${window.location.origin}/${customShortCode}`
        : `${window.location.origin}/${response.data.short_code}`;

      setShortUrl(shortened);
      setError('');
      setSnackbarMessage('URL shortened successfully!');
      setOpenSnackbar(true);
    } catch (err) {
      console.error("Error response:", err.response?.data);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Error creating short URL');
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setSnackbarMessage('URL copied to clipboard!');
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-emerald-200 via-teal-100 to-orange-100 flex items-center justify-center p-6">
      <Container maxWidth="sm">
        <Box className="bg-white/30 backdrop-blur-md rounded-3xl shadow-2xl p-10">
          <Typography variant="h4" className="text-center font-extrabold mb-8 text-emerald-700 tracking-wide">
            ✨ Shortfy Your Links
          </Typography>

          <form onSubmit={handleSubmit} className="space-y-6">
            <TextField
              fullWidth
              label="Paste your long URL here"
              variant="outlined"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              placeholder="https://example.com/your-awesome-link"
            />

            <Button
              type="button"
              variant={isCustomShortCode ? 'contained' : 'outlined'}
              color="secondary"
              onClick={() => setIsCustomShortCode(!isCustomShortCode)}
              fullWidth
              className="transition-all hover:scale-105"
            >
              {isCustomShortCode ? 'Use Random Shortcode' : 'Use Custom Shortcode'}
            </Button>

           {isCustomShortCode && (
               <>
                <TextField
                  fullWidth
                  label="Enter Custom Shortcode"
                  variant="outlined"
                  value={customShortCode}
                  onChange={(e) => setCustomShortCode(e.target.value)}
                  placeholder="e.g. abc12"
                  error={isNotCustomValidLength}
                  helperText={isNotCustomValidLength ? "Custom shortcode cannot be 0, 6 or 7 characters" : ""}
                />
              </>
            )}


            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isCustomShortCode && isNotCustomValidLength}
              fullWidth
              className="bg-gradient-to-r from-emerald-400 via-teal-300 to-orange-300 text-white font-bold py-3 hover:from-emerald-500 hover:to-orange-400 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Shorten It 🚀
            </Button>
          </form>

          {error && (
            <Typography color="error" className="mt-4 text-center font-semibold">
              {error}
            </Typography>
          )}

          {shortUrl && (
            <>
              <Divider className="my-8" />
              <Box className="p-4 bg-white/40 backdrop-blur-sm rounded-xl text-center space-y-3 shadow-md">
                <Typography variant="h6" className="text-emerald-800">
                  Here’s Your Short Link!
                </Typography>
                <Box className="flex items-center justify-center space-x-2">
                  <Typography variant="body1" className="break-all text-emerald-700 font-semibold">
                    <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                      {shortUrl}
                    </a>
                  </Typography>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleCopy}
                    size="small"
                    className="hover:scale-110"
                  >
                    <ContentCopyIcon fontSize="small" />
                  </Button>
                </Box>

                {isAuthenticated && (
                  <div className="flex flex-col space-y-2 mt-4">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => router.push('/my-urls')}
                      className="hover:underline hover:text-emerald-700"
                    >
                      View My URLs
                    </Button>

                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => router.push('/custom-urls')}
                      className="hover:underline hover:text-indigo-700"
                    >
                      View My Custom URLs
                    </Button>
                  </div>
                )}
              </Box>
            </>
          )}
        </Box>

    <IntroSection />      
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
