export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold mb-6 mt-4 text-emerald-800">Contact Us</h1>

      <p className="text-gray-700 text-lg leading-relaxed mb-4">
        We're here to help! Whether you have questions, suggestions, business inquiries, or you're experiencing any issues with our service, feel free to reach out to us.
      </p>

      <h2 className="text-2xl font-semibold text-emerald-700 mt-6 mb-3">📧 Email Support</h2>
      <p className="text-gray-700 text-lg mb-2">
        Send us an email anytime, and we’ll do our best to respond within 24–48 hours.
      </p>
      <p className="text-lg">
        <a href="mailto:support@shortfy.xyz" className="text-emerald-700 underline font-semibold">
          support@shortfy.xyz
        </a>
      </p>

      <h2 className="text-2xl font-semibold text-emerald-700 mt-8 mb-3">📍 Our Address</h2>
      <p className="text-gray-700 text-lg">Sylhet, Bangladesh</p>

      <h2 className="text-2xl font-semibold text-emerald-700 mt-8 mb-3">📱 Social Media</h2>
      <p className="text-gray-700 text-lg mb-2">
        Coming soon — follow us on social platforms to get updates and tips!
      </p>

      <p className="text-gray-600 mt-10 italic text-sm">
        For legal matters or abuse reports, please use the subject line “Legal Notice” in your email.
      </p>
    </div>
  );
}
