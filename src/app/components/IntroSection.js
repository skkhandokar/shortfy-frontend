const IntroSection = () => {
  return (
    <Box className="mt-8 text-center bg-white/40 backdrop-blur-sm rounded-2xl shadow-md p-6 sm:p-10">
      <Typography variant="h5" className="text-emerald-800 font-bold mb-4">
        🔗 The Original URL Shortener
      </Typography>
      <Typography variant="body1" className="text-gray-700 text-lg">
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
