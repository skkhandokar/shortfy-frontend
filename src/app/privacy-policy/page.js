'use client';

import Head from 'next/head';

export default function PrivacyPolicy() {
  return (
    <>
      {/* Head + Meta + JSON-LD */}
      <Head>
        <title>Privacy Policy - Shortfy.xyz</title>
        <meta
          name="description"
          content="Read Shortfy.xyz Privacy Policy. Learn how we collect, use, and protect your data. Free URL shortener with analytics, optional login, and full privacy compliance."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Privacy Policy - Shortfy.xyz",
              "url": "https://shortfy.xyz/privacy",
              "description": "Learn how Shortfy.xyz collects, uses, and protects your data.",
            }),
          }}
        />
      </Head>

      {/* Page Content */}
      <main className="min-h-screen bg-white text-black px-6 md:px-12 py-16 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-12 text-center text-[#0A1A2F]">
          🔐 Privacy Policy
        </h1>

        {/* Introduction */}
        <section className="mb-8">
          <p className="text-lg md:text-xl text-gray-800 leading-relaxed mb-4">
            At <a href="https://shortfy.xyz" className="text-[#0A1A2F] underline font-semibold" target="_blank" rel="noopener noreferrer">Shortfy.xyz</a>, your privacy is one of our top priorities. This Privacy Policy explains what information we collect, how we use it, and what choices you have regarding your data. By using Shortfy.xyz, you agree to the terms outlined in this policy.
          </p>
          <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
            This policy applies to all visitors, users, and account holders of our platform. Whether you use our service anonymously or with an account, we are committed to protecting your privacy and ensuring your data remains secure.
          </p>
        </section>

        {/* Information We Collect */}
        <section className="bg-gray-50 border border-gray-200 rounded-xl p-8 shadow-md mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#0A1A2F]">📝 1. Information We Collect</h2>
          <p className="text-gray-800 mb-4 text-base md:text-lg">
            We collect the minimum amount of data necessary to provide our service efficiently:
          </p>
          <ul className="list-disc ml-6 text-gray-800 mb-4 text-base md:text-lg space-y-2">
            <li>Account information like email and password (hashed) when you sign up.</li>
            <li>Anonymous analytics such as click counts, countries, devices, and browsers for your shortened links.</li>
            <li>IP addresses for security and fraud prevention purposes.</li>
          </ul>
          <p className="text-gray-800 text-base md:text-lg">
            We do not request or store sensitive information such as credit card numbers, social security numbers, or personal identification documents.
          </p>
        </section>

        {/* How We Use Your Data */}
        <section className="bg-gray-50 border border-gray-200 rounded-xl p-8 shadow-md mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#0A1A2F]">🔧 2. How We Use Your Data</h2>
          <ul className="list-disc ml-6 text-gray-800 mb-4 text-base md:text-lg space-y-2">
            <li>To create and manage your account and dashboard.</li>
            <li>To generate analytics on your shortened links.</li>
            <li>To detect and prevent spam, phishing, or malicious activities.</li>
            <li>To improve and personalize the user experience on Shortfy.xyz.</li>
          </ul>
          <p className="text-gray-800 text-base md:text-lg">
            Your data is never sold to third parties. Aggregated, anonymous analytics may be used for product improvement.
          </p>
        </section>

        {/* Cookies & Tracking */}
        <section className="bg-gray-50 border border-gray-200 rounded-xl p-8 shadow-md mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#0A1A2F]">🍪 3. Cookies & Tracking</h2>
          <p className="text-gray-800 mb-4 text-base md:text-lg">
            Shortfy.xyz uses minimal cookies to maintain login sessions and provide a smooth experience. We do not use third-party advertising cookies.
          </p>
          <p className="text-gray-800 text-base md:text-lg">
            You can disable cookies in your browser settings, but some features, like staying logged in, may not function properly.
          </p>
        </section>

        {/* Sharing Your Information */}
        <section className="bg-gray-50 border border-gray-200 rounded-xl p-8 shadow-md mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#0A1A2F]">🔒 4. Sharing Your Information</h2>
          <p className="text-gray-800 mb-4 text-base md:text-lg">
            We do not sell or share your personal information with third parties. Only anonymized analytics data may be used to improve the service.
          </p>
          <p className="text-gray-800 text-base md:text-lg">
            In certain cases, we may share your data if legally required or to prevent fraud and abuse.
          </p>
        </section>

        {/* Data Security */}
        <section className="bg-gray-50 border border-gray-200 rounded-xl p-8 shadow-md mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#0A1A2F]">🛡️ 5. Data Security</h2>
          <p className="text-gray-800 mb-4 text-base md:text-lg">
            We use strong encryption for passwords and HTTPS to protect data in transit. Regular security audits are conducted to ensure platform integrity.
          </p>
        </section>

        {/* Your Control */}
        <section className="bg-gray-50 border border-gray-200 rounded-xl p-8 shadow-md mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#0A1A2F]">⚙️ 6. Your Control</h2>
          <ul className="list-disc ml-6 text-gray-800 mb-4 text-base md:text-lg space-y-2">
            <li>You can delete your account at any time.</li>
            <li>You can manage or remove your shortened URLs from the dashboard.</li>
            <li>You may request a copy of your data by contacting our support.</li>
          </ul>
        </section>

        {/* Third-Party Services */}
        <section className="bg-gray-50 border border-gray-200 rounded-xl p-8 shadow-md mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#0A1A2F]">🔗 7. Third-Party Services</h2>
          <p className="text-gray-800 mb-4 text-base md:text-lg">
            Shortfy.xyz may use third-party services for hosting, analytics, and security. These providers are bound by strict privacy agreements.
          </p>
        </section>

        {/* Children's Privacy */}
        <section className="bg-gray-50 border border-gray-200 rounded-xl p-8 shadow-md mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#0A1A2F]">👶 8. Children's Privacy</h2>
          <p className="text-gray-800 mb-4 text-base md:text-lg">
            Shortfy.xyz is not intended for children under 13. We do not knowingly collect personal information from children.
          </p>
        </section>

        {/* Updates to Policy */}
        <section className="bg-gray-50 border border-gray-200 rounded-xl p-8 shadow-md mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#0A1A2F]">🔄 9. Changes to This Policy</h2>
          <p className="text-gray-800 mb-4 text-base md:text-lg">
            We may update this policy occasionally. Updates will be posted on this page with the latest date.
          </p>
        </section>

        {/* Contact for Privacy */}
        <section className="bg-gray-50 border border-gray-200 rounded-xl p-8 shadow-md mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#0A1A2F]">📞 10. Contact Us Regarding Privacy</h2>
          <p className="text-gray-800 text-base md:text-lg mb-2">
            For questions, concerns, or data requests regarding privacy, please email:
          </p>
          <p className="text-lg md:text-xl">
            <a href="mailto:privacy@shortfy.xyz" className="text-[#0A1A2F] underline font-semibold">
              support@shortfy.xyz
            </a>
          </p>
        </section>

        {/* Last Updated */}
        <p className="text-sm md:text-base text-gray-600 mb-12">
          Last updated: January 10, 2026
        </p>
      </main>
    </>
  );
}
