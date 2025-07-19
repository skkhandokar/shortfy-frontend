export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold mb-6 mt-4 text-emerald-800">Terms & Conditions</h1>

      <p className="text-gray-600 text-lg leading-relaxed mb-4">
        These Terms and Conditions govern your use of Shortfy.xyz. By using this site, you agree to these terms. If you do not agree, please do not use our service.
      </p>

      <h2 className="text-2xl font-semibold text-emerald-700 mt-6 mb-2">1. Acceptable Use</h2>
      <p className="text-gray-700 text-lg mb-4">
        You agree not to use Shortfy.xyz for any illegal or malicious activity, including but not limited to:
      </p>
      <ul className="list-disc pl-6 text-gray-700 text-lg space-y-2">
        <li>Shortening URLs that lead to harmful, adult, or illegal content</li>
        <li>Sending spam or phishing messages using our links</li>
        <li>Attempting to exploit or hack the system</li>
      </ul>

      <h2 className="text-2xl font-semibold text-emerald-700 mt-6 mb-2">2. Link Removal</h2>
      <p className="text-gray-700 text-lg mb-4">
        We reserve the right to remove or disable any short link at any time, especially if it violates our terms or is reported for abuse.
      </p>

      <h2 className="text-2xl font-semibold text-emerald-700 mt-6 mb-2">3. Custom Shortcodes</h2>
      <p className="text-gray-700 text-lg mb-4">
        Custom short URLs are assigned on a first-come, first-served basis. We may reject or remove custom codes that are offensive, misleading, or infringe on trademarks.
      </p>

      <h2 className="text-2xl font-semibold text-emerald-700 mt-6 mb-2">4. No Warranty</h2>
      <p className="text-gray-700 text-lg mb-4">
        We provide this service “as is” without warranties of any kind. While we aim for uptime and reliability, we are not liable for lost links or data.
      </p>

      <h2 className="text-2xl font-semibold text-emerald-700 mt-6 mb-2">5. Changes to Terms</h2>
      <p className="text-gray-700 text-lg mb-4">
        We may update these Terms & Conditions at any time. Continued use of the service means you accept the new terms.
      </p>

      <p className="text-gray-700 text-lg mt-6">
        For legal concerns, email us at <a href="mailto:support@shortfy.xyz" className="text-emerald-700 underline">support@shortfy.xyz</a>.
      </p>
    </div>
  );
}
