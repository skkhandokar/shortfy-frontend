// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import Navbar from "./components/Navbar";
// import HeadSchema from "./components/HeadSchema";
// import Footer from "./components/Footer";
// import { AuthProvider } from "./context/AuthContext";
// // import { DarkModeProvider } from "./context/DarkModeContext";

// import { Analytics } from "@vercel/analytics/react";
// import { SpeedInsights } from "@vercel/speed-insights/next";

// const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
// const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// // Server-side metadata
// export const metadata = {
//   title: "Shortfy | The Best Free URL Shortener & Link Tracker",
//   description: "Create short, branded, and custom URLs for free. Track clicks, location, and device analytics with Shortfy.xyz, the original link shortener.",
//   keywords: "URL shortener, link tracker, custom shortcode, free link shortener, branded links, Shortfy",
//   openGraph: {
//     title: "Shortfy | Shorten Your Links Instantly",
//     description: "The original free tool to shorten URLs and track analytics.",
//     url: "https://shortfy.xyz",
//     siteName: "Shortfy",
//     type: "website",
//   },
// };

// export default function RootLayout({ children }) {
//   return (
//     // suppressHydrationWarning যোগ করা হয়েছে যাতে ব্রাউজার এক্সটেনশন জনিত এরর না আসে
//     <html lang="en" suppressHydrationWarning>
//       <head>
//         {/* ✅ Google AdSense Script */}
//         <meta name="google-adsense-account" content="ca-pub-3914040246342551" />
//       </head>
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
//         <AuthProvider>
//           {/* DarkModeProvider wraps everything */}
//           {/* <DarkModeProvider> */}
//             <Navbar />
//             <main>{children}</main>
//             <Footer />
//           {/* </DarkModeProvider> */}
//         </AuthProvider>
//         <Analytics />
//         <SpeedInsights /> {/* আপনার ইমপোর্টে ছিল কিন্তু বডিতে ছিল না, তাই যোগ করে দিলাম */}
//       </body>
//     </html>
//   );
// }




import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeadSchema from "./components/HeadSchema";
import { AuthProvider } from "./context/AuthContext";
// import { DarkModeProvider } from "./context/DarkModeContext";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// Server-side metadata
export const metadata = {
  title: "Shortfy | The Best Free URL Shortener & Link Tracker",
  description:
    "Create short, branded, and custom URLs for free. Track clicks, location, and device analytics with Shortfy.xyz, the original link shortener.",
  keywords:
    "URL shortener, link tracker, custom shortcode, free link shortener, branded links, Shortfy",
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
    // suppressHydrationWarning prevents hydration errors from browser extensions
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ✅ Page metadata */}
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="application-name" content="Shortfy" />
        <meta name="apple-mobile-web-app-title" content="Shortfy" />

        {/* ✅ Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* ✅ Google AdSense */}
        <meta name="google-adsense-account" content="ca-pub-3914040246342551" />

        {/* ✅ JSON-LD Schema */}
        <HeadSchema />
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

        {/* Analytics + SpeedInsights */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
