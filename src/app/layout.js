import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeadSchema from "./components/HeadSchema";
import { AuthProvider } from "./context/AuthContext";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Shortfy | The Best Free URL Shortener & Link Tracker",
  description:
    "Create short, branded, and custom URLs for free. Track clicks, location, and device analytics with Shortfy.xyz.",
  keywords:
    "URL shortener, link tracker, custom shortcode, free link shortener, branded links, Shortfy",
  verification: {
    google: "sGVAG-17vNkPu8PURvnm76Vtu1N_plJr0oXAm1eJn_M",
  },
  applicationName: "Shortfy",
  appleWebApp: {
    title: "Shortfy",
  },
  // Viewport এবং Theme Color এখন মেটাডেটার অংশ (Next.js 14+)
  themeColor: "#ffffff",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}
      >
        <AuthProvider>
          <HeadSchema /> {/* স্কিমা সার্ভার সাইডে রেন্ডার হওয়া জরুরি */}
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>

        <Analytics />
        <SpeedInsights />
        
        {/* AdSense এর জন্য সঠিক পদ্ধতি */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3914040246342551"
          crossOrigin="anonymous"
        ></script>
      </body>
    </html>
  );
}