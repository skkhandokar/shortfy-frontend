'use client';

import Head from 'next/head';

export default function AboutPage() {
  return (
    <>
      {/* Head + Meta + JSON-LD */}
      <Head>
        <title>About Shortfy.xyz - Free URL Shortener</title>
        <meta
          name="description"
          content="Learn about Shortfy.xyz, a professional URL shortener with analytics, QR codes, optional login, clean UI, and fast performance."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Shortfy",
              "url": "https://shortfy.xyz",
              "applicationCategory": "URL Shortener",
              "description": "Shortfy.xyz is a free URL shortener with analytics, QR codes, optional login, clean UI, and fast performance.",
              "operatingSystem": "Web",
              "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
              "faq": [
                {
                  "@type": "Question",
                  "name": "Is Shortfy free?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Yes, all basic features are free." }
                },
                {
                  "@type": "Question",
                  "name": "Do I need to sign up?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Signup is optional; you can shorten links anonymously or track them with an account." }
                },
                {
                  "@type": "Question",
                  "name": "Can I track analytics?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Yes, you can view clicks, countries, devices, and browsers." }
                },
                {
                  "@type": "Question",
                  "name": "Does Shortfy generate QR codes?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Yes, every short URL has a downloadable QR code." }
                }
              ]
            })
          }}
        />
      </Head>

      {/* Page Content */}
      <main className="min-h-screen bg-white text-black px-6 md:px-12 py-16 max-w-6xl mx-auto">
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-[#0A1A2F]">
          About Shortfy.xyz
        </h1>

        {/* Mission Section */}
        <section className="mb-12">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 shadow-md">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#0A1A2F]">
              Our Mission
            </h2>
            <p className="text-lg md:text-xl leading-relaxed mb-4">
              At <strong>Shortfy.xyz</strong>, we believe in simplicity, speed, and freedom. Our mission is to make sharing and managing links easier for everyone—from casual users to businesses and content creators.
            </p>
            <p className="text-lg md:text-xl leading-relaxed">
              Shortfy.xyz is a free and easy-to-use URL shortening platform that lets anyone create short, trackable, and customizable links in seconds. Share on social media, messaging apps, or campaigns with clean, branded links.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-12">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 shadow-md">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-[#0A1A2F]">🔧 Key Features</h2>
            <ul className="list-disc pl-6 space-y-3 text-lg md:text-xl">
              <li>Unlimited URL shortening — no restrictions</li>
              <li>Custom short links (e.g., shortfy.xyz/yourname)</li>
              <li>Bulk Shortening with One Click</li>
              <li>Anonymous or authenticated shortening options</li>
              <li>Downloadable QR codes for each link</li>
              <li>User dashboard to manage and view your links</li>
              <li>Link analytics: clicks, devices, countries, browsers</li>
            </ul>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-12">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 shadow-md">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-[#0A1A2F]">🚀 How Shortfy Works</h2>
            <ol className="list-decimal list-inside text-lg md:text-xl space-y-2">
              <li>Go to <a href="https://shortfy.xyz" className="text-[#0A1A2F] underline">Shortfy.xyz</a></li>
              <li>Paste your long URL</li>
              <li>Click <strong>Shorten</strong></li>
              <li>Share your short link anywhere</li>
              <li>View analytics for each link in your dashboard</li>
            </ol>
          </div>
        </section>

        {/* Why Section */}
        <section className="mb-12">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 shadow-md">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-[#0A1A2F]">🌍 Why We Built It</h2>
            <p className="text-lg md:text-xl leading-relaxed mb-4">
              Most URL shorteners are ad-filled, limited, or force signup. Shortfy.xyz is clean, fast, ad-free, and login is optional.
            </p>
            <p className="text-lg md:text-xl leading-relaxed">
              Built in <strong>Bangladesh 🇧🇩</strong> and used globally 🌍.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 shadow-md">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-[#0A1A2F]">❓ FAQ</h2>
            <div className="space-y-4 text-lg md:text-xl">
              <p><strong>Q: Is Shortfy free?</strong><br/>A: Yes, all basic features are free to use.</p>
              <p><strong>Q: Do I need to sign up?</strong><br/>A: Signup is optional; shorten links anonymously or track them with an account.</p>
              <p><strong>Q: Can I track analytics?</strong><br/>A: Yes, analytics include clicks, country, device, and browser info.</p>
              <p><strong>Q: Does Shortfy generate QR codes?</strong><br/>A: Yes, every short URL comes with a downloadable QR code.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
