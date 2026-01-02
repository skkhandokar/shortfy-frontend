import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
// import { DarkModeProvider } from "./context/DarkModeContext";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// Server-side metadata
export const metadata = {
  title: "Shortfy | The Best Free URL Shortener & Link Tracker",
  description: "Create short, branded, and custom URLs for free. Track clicks, location, and device analytics with Shortfy.xyz, the original link shortener.",
  keywords: "URL shortener, link tracker, custom shortcode, free link shortener, branded links, Shortfy",
  openGraph: {
    title: "Shortfy | Shorten Your Links Instantly",
    description: "The original free tool to shorten URLs and track analytics.",
    url: "https://shortfy.xyz",
    siteName: "Shortfy",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning যোগ করা হয়েছে যাতে ব্রাউজার এক্সটেনশন জনিত এরর না আসে
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ✅ Google AdSense Script */}
        <meta name="google-adsense-account" content="ca-pub-3914040246342551" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          {/* DarkModeProvider wraps everything */}
          {/* <DarkModeProvider> */}
            <Navbar />
            <main>{children}</main>
            <Footer />
          {/* </DarkModeProvider> */}
        </AuthProvider>
        <Analytics />
        <SpeedInsights /> {/* আপনার ইমপোর্টে ছিল কিন্তু বডিতে ছিল না, তাই যোগ করে দিলাম */}
      </body>
    </html>
  );
}