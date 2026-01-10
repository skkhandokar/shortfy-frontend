'use client';

import Head from 'next/head';

export default function TermsPage() {
  return (
    <>
      {/* Head + Meta + JSON-LD */}
      <Head>
        <title>Terms & Conditions - Shortfy.xyz</title>
        <meta
          name="description"
          content="Read the Terms & Conditions of Shortfy.xyz, a professional URL shortener with analytics, custom URLs, QR codes, and optional login."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Terms & Conditions - Shortfy.xyz",
              "url": "https://shortfy.xyz/terms",
              "description": "Terms & Conditions for using Shortfy.xyz, a professional URL shortener with analytics and custom links."
            })
          }}
        />
      </Head>

      {/* Page Content */}
      <main className="min-h-screen bg-white text-black px-6 md:px-12 py-16 max-w-6xl mx-auto">
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-12 text-center text-[#0A1A2F]">
          Terms & Conditions
        </h1>

        {/* Terms Content */}
        <section className="space-y-8">
          {/* Intro */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 shadow-md">
            <p className="text-lg md:text-xl leading-relaxed text-gray-800">
              These Terms and Conditions govern your use of <strong>Shortfy.xyz</strong>. By using this site, you agree to these terms. If you do not agree, please do not use our service.
            </p>
          </div>

          {/* Acceptable Use */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 shadow-md">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#0A1A2F]">1. Acceptable Use</h2>
            <p className="text-lg md:text-xl text-gray-800 mb-4">
              You agree not to use Shortfy.xyz for any illegal or malicious activity, including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-lg md:text-xl text-gray-800">
              <li>Shortening URLs that lead to harmful, adult, or illegal content</li>
              <li>Sending spam or phishing messages using our links</li>
              <li>Attempting to exploit or hack the system</li>
            </ul>
          </div>

          {/* Link Removal */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 shadow-md">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#0A1A2F]">2. Link Removal</h2>
            <p className="text-lg md:text-xl text-gray-800">
              We reserve the right to remove or disable any short link at any time, especially if it violates our terms or is reported for abuse.
            </p>
          </div>

          {/* Custom Shortcodes */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 shadow-md">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#0A1A2F]">3. Custom Shortcodes</h2>
            <p className="text-lg md:text-xl text-gray-800">
              Custom short URLs are assigned on a first-come, first-served basis. We may reject or remove custom codes that are offensive, misleading, or infringe on trademarks.
            </p>
          </div>

          {/* No Warranty */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 shadow-md">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#0A1A2F]">4. No Warranty</h2>
            <p className="text-lg md:text-xl text-gray-800">
              We provide this service “as is” without warranties of any kind. While we aim for uptime and reliability, we are not liable for lost links or data.
            </p>
          </div>

          {/* Changes to Terms */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 shadow-md">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#0A1A2F]">5. Changes to Terms</h2>
            <p className="text-lg md:text-xl text-gray-800">
              We may update these Terms & Conditions at any time. Continued use of the service means you accept the new terms.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 shadow-md">
            <p className="text-lg md:text-xl text-gray-800">
              For legal concerns, email us at <a href="mailto:support@shortfy.xyz" className="text-[#0A1A2F] underline">support@shortfy.xyz</a>.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
