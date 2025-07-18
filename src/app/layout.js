import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { AuthProvider } from "./context/AuthContext"
import { Analytics } from "@vercel/analytics/react"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export const metadata = {
  title: "Shortfy",
  description: "Instantly shorten, manage, and share your links with ease. Simple, fast, and powerful URL shortening.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google AdSense Script */}
        
      <meta name="google-adsense-account" content="ca-pub-3914040246342551"></meta>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
