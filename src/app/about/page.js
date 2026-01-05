"use client";

import Head from "next/head";

export default function AboutPage() {
  return (
    <>
      {/* Head + Meta + JSON-LD Schema */}
      <Head>
        <title>About Shortfy.xyz - Free Short URL Generator</title>
        <meta
          name="description"
          content="Learn about Shortfy.xyz, a free URL shortener with built-in analytics, QR codes, and user dashboard. Clean, fast, and optional login."
        />

        {/* JSON-LD Schema for AI and Rich Results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Shortfy",
              "url": "https://shortfy.xyz",
              "applicationCategory": "URL Shortener",
              "description":
                "Shortfy.xyz is a free URL shortener with built-in link analytics, QR codes, and optional login. Clean, fast, and ad-free.",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "faq": [
                {
                  "@type": "Question",
                  "name": "Is Shortfy free?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, basic URL shortening, analytics, and QR codes are free to use."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do I need to sign up?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No, signup is optional. You can shorten URLs anonymously or create an account to track your links."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I track analytics?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, Shortfy provides click counts, country, device, and browser analytics for each link."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Does Shortfy generate QR codes?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, each short URL comes with a downloadable QR code."
                  }
                }
              ]
            })
          }}
        />
      </Head>

      {/* Page Content */}
      <main className="max-w-4xl mx-auto py-12 px-6 bg-gray-50">
        <h1 className="text-4xl font-bold mb-6 mt-4 text-emerald-800">About Shortfy.xyz</h1>

        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          At <strong>Shortfy.xyz</strong>, we believe in simplicity, speed, and freedom. Our mission is to make sharing and managing links easier for everyone—from casual users to businesses and content creators.
        </p>

        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Shortfy.xyz is a free and easy-to-use URL shortening platform that lets anyone create short, trackable, and customizable links in seconds. Whether you're sharing on social media, messaging apps, or running campaigns, our tool helps you clean up long, ugly URLs and replace them with short, branded links that look professional and perform better.
        </p>

        <h2 className="text-2xl font-semibold text-emerald-700 mt-8 mb-4">🔧 What We Offer</h2>
        <ul className="list-disc pl-6 text-gray-700 text-lg space-y-2">
          <li>Unlimited URL shortening — no restrictions or limits</li>
          <li>Custom short links (e.g., shortfy.xyz/yourname)</li>
          <li>Anonymous and authenticated shortening options</li>
          <li>Each shortened URL comes with a downloadable QR code</li>
          <li>User dashboard to manage and view your links</li>
          <li>Link analytics (clicks, devices, countries, browsers)</li>
        </ul>

        <h2 className="text-2xl font-semibold text-emerald-700 mt-8 mb-4">🌍 Why We Built It</h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          We noticed that most URL shorteners are either filled with ads, limit functionality, or force user registration. We wanted to change that. Shortfy.xyz is designed to be clean, ad-free, fast, and optional for login—so anyone can shorten links freely, anytime, without friction.
        </p>

        <p className="text-gray-700 text-lg leading-relaxed mb-2">
          Built in <strong>Bangladesh 🇧🇩</strong>, used around the world 🌍.
        </p>

        {/* Added HomePage Content (How it works + FAQ) */}
        <h2 className="text-2xl font-semibold mt-8 mb-2">How Shortfy Works</h2>
        <ol className="list-decimal list-inside mb-4 text-gray-700 text-lg space-y-1">
          <li>Go to <a href="https://shortfy.xyz" className="text-blue-600 underline">Shortfy.xyz</a></li>
          <li>Paste your long URL</li>
          <li>Click <strong>Shorten</strong></li>
          <li>Share your short link anywhere</li>
          <li>View analytics for each link in your dashboard</li>
        </ol>

        <h2 className="text-2xl font-semibold mb-2">Key Analytics Features</h2>
        <ul className="list-disc list-inside mb-4 text-gray-700 text-lg space-y-1">
          <li>Total clicks per link</li>
          <li>Unique visitors</li>
          <li>Country-level data</li>
          <li>Device type (Desktop/Mobile)</li>
          <li>Browser & Operating System</li>
          <li>Time-based stats: 24h, 7d, 30d</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2">FAQ</h2>
        <div className="mb-4 text-gray-700 text-lg space-y-2">
          <p><strong>Q: Is Shortfy free?</strong><br/>A: Yes, basic link shortening and analytics are completely free.</p>
          <p><strong>Q: Can I use Shortfy without signing up?</strong><br/>A: Yes, no account is needed for basic shortening and analytics.</p>
          <p><strong>Q: Does Shortfy track location?</strong><br/>A: Yes, country-level analytics are provided for each link.</p>
          <p><strong>Q: Can I generate QR codes?</strong><br/>A: Yes, every short link can generate a QR code for sharing.</p>
        </div>
      </main>
    </>
  );
}
