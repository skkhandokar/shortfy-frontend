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

export default nextConfig;
