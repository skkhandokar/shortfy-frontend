const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "skkhandokar22.pythonanywhere.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;

