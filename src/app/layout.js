



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
      <head>
        {/* 🔒 FORCE SAME COLOR EVERYWHERE */}
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#ffffff" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="application-name" content="Shortfy" />
        <meta name="apple-mobile-web-app-title" content="Shortfy" />

        <HeadSchema />

        <meta
          name="google-adsense-account"
          content="ca-pub-3914040246342551"
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}
      >
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
