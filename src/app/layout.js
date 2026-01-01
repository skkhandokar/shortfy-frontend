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
  title: "Shortfy",
  description:
    "Instantly shorten, manage, and share your links with ease. Simple, fast, and powerful URL shortening.",
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