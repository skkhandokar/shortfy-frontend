export default function PrivacyPolicy() {
  return (
    <main className=" bg-gradient-to-br from-green-300 via-teal-500 to-orange-200 text-white min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 mt-[50px] text-cyan-400">🔐 Privacy Policy</h1>

        <p className="mb-4 text-white-800">
          Welcome to <span className="text-orange-300 font-semibold">Shortfy.xyz</span>. Your privacy is critically important to us.
        </p>

        <h2 className="text-2xl font-semibold mt-8 text-cyan-300">1. Information We Collect</h2>
        <p className="text-white-800 mb-4">
          We collect minimal personal data, such as your email and password (hashed) for signup. We also collect anonymous link analytics (clicks, country, device, browser).
        </p>

        <h2 className="text-2xl font-semibold mt-8 text-cyan-300">2. How We Use Your Data</h2>
        <ul className="list-disc ml-6 text-white-800 mb-4">
          <li>To manage your account and dashboard</li>
          <li>To generate analytics on your shortened links</li>
          <li>To detect spam or malicious URLs</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 text-cyan-300">3. Cookies & Tracking</h2>
        <p className="text-white-800 mb-4">
          We use basic cookies to maintain login sessions. No third-party tracking or advertising cookies are used.
        </p>

        <h2 className="text-2xl font-semibold mt-8 text-cyan-300">4. Sharing Your Information</h2>
        <p className="text-white-800 mb-4">
          We do not sell or share your personal information with any third parties. All analytics are anonymized.
        </p>

        <h2 className="text-2xl font-semibold mt-8 text-cyan-300">5. Data Security</h2>
        <p className="text-white-800 mb-4">
          Your data is encrypted and securely stored. We use HTTPS to protect data in transit.
        </p>

        <h2 className="text-2xl font-semibold mt-8 text-cyan-300">6. Your Control</h2>
        <ul className="list-disc ml-6 text-white-800 mb-4">
          <li>You can delete your account at any time</li>
          <li>You can manage or remove your shortened URLs from your dashboard</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 text-cyan-300">7. Changes to This Policy</h2>
        <p className="text-white-800 mb-4">
          We may update our privacy policy from time to time. Changes will be posted here with an updated date.
        </p>

        <p className="text-sm text-white-800 mt-8">
          Last updated: July 20, 2025
        </p>
      </div>
    </main>
  );
}
