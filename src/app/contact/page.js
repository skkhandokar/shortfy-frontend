'use client';

import Head from 'next/head';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function ContactPage() {
  return (
    <>
      {/* Head + Meta + JSON-LD */}
      <Head>
        <title>Contact Us - Shortfy.xyz</title>
        <meta
          name="description"
          content="Contact Shortfy.xyz for support, business inquiries, suggestions, or legal concerns. Professional URL shortener with analytics and custom links."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ContactPage",
              "name": "Contact Us - Shortfy.xyz",
              "url": "https://shortfy.xyz/contact",
              "description": "Contact Shortfy.xyz for support, business inquiries, suggestions, or legal concerns."
            })
          }}
        />
      </Head>

      {/* Page Content */}
      <main className="min-h-screen bg-white text-black px-6 md:px-12 py-16 max-w-6xl mx-auto">
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-12 text-center text-[#0A1A2F]">
          Contact Us
        </h1>

        {/* Intro Section */}
        <section className="bg-gray-50 border border-gray-200 rounded-xl p-8 shadow-md mb-8">
          <p className="text-lg md:text-xl leading-relaxed text-gray-800">
            We're here to help! Whether you have questions, suggestions, business inquiries, or you're experiencing any issues with our service, feel free to reach out to us. Our support team strives to respond within 24–48 hours.
          </p>
        </section>

        {/* AdSense Placeholder */}
        <div className="bg-gray-100 border border-gray-200 rounded-xl p-6 shadow-md mb-8 text-center text-gray-500 italic">
          {/* Replace this div with your AdSense code */}
          Ad space (300x250) – Your ad will appear here
        </div>

        {/* Email Support with CTA */}
        <section className="bg-gray-50 border border-gray-200 rounded-xl p-8 shadow-md mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#0A1A2F]">📧 Email Support</h2>
          <p className="text-lg md:text-xl text-gray-800 mb-4">
            Send us an email anytime. We'll respond quickly to assist with your queries or concerns.
          </p>
          <a
            href="mailto:support@shortfy.xyz"
            className="inline-block bg-[#0A1A2F] text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-[#081529] transition-colors duration-300"
          >
            Send Email
          </a>
        </section>

        {/* Address */}
        <section className="bg-gray-50 border border-gray-200 rounded-xl p-8 shadow-md mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#0A1A2F]">📍 Our Address</h2>
          <p className="text-lg md:text-xl text-gray-800">Sylhet, Bangladesh</p>
        </section>

        {/* Social Media */}
        <section className="bg-gray-50 border border-gray-200 rounded-xl p-8 shadow-md mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#0A1A2F]">📱 Follow Us</h2>
          <p className="text-lg md:text-xl text-gray-800 mb-4">
            Follow us on social platforms for updates, tips, and news about Shortfy.xyz.
          </p>
          <div className="flex space-x-4 text-[#0A1A2F] text-2xl">
            <a href="#" aria-label="Facebook" className="hover:text-blue-600 transition-colors duration-300"><FaFacebook /></a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-400 transition-colors duration-300"><FaTwitter /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-700 transition-colors duration-300"><FaLinkedin /></a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-500 transition-colors duration-300"><FaInstagram /></a>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-gray-50 border border-gray-200 rounded-xl p-8 shadow-md mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#0A1A2F]">❓ Frequently Asked Questions</h2>
          <div className="text-lg md:text-xl text-gray-800 space-y-4">
            <p><strong>Q:</strong> How fast is the link shortening process?<br/><strong>A:</strong> Just a few seconds! Copy your long URL, paste it, and get a short link instantly.</p>
            <p><strong>Q:</strong> Can I track clicks without signing up?<br/><strong>A:</strong> Yes! Analytics are available for every link. Signing up gives you a dashboard to manage all your links in one place.</p>
            <p><strong>Q:</strong> Are there any limits?<br/><strong>A:</strong> Shortfy.xyz offers unlimited link shortening for free with optional account creation.</p>
            <p><strong>Q:</strong> Can I use Shortfy.xyz for business campaigns?<br/><strong>A:</strong> Absolutely! Custom URLs, analytics, and QR codes make Shortfy perfect for professional marketing campaigns.</p>
            <p><strong>Q:</strong> Is my data secure?<br/><strong>A:</strong> Yes, we prioritize security and privacy. We never share your personal information with third parties.</p>
          </div>
        </section>

        {/* AdSense Placeholder */}
        <div className="bg-gray-100 border border-gray-200 rounded-xl p-6 shadow-md mb-8 text-center text-gray-500 italic">
          {/* Replace this div with your AdSense code */}
          Ad space (728x90) – Your ad will appear here
        </div>

        {/* Legal Notice */}
        <section className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-md mb-12">
          <p className="text-gray-600 text-sm md:text-base italic">
            For legal matters or abuse reports, please use the subject line “Legal Notice” in your email.
          </p>
        </section>
      </main>
    </>
  );
}
