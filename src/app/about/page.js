export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
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
        <li>User dashboard to manage and view your links</li>
        <li>Link analytics (coming soon!)</li>
      </ul>

      <h2 className="text-2xl font-semibold text-emerald-700 mt-8 mb-4">🌍 Why We Built It</h2>

      <p className="text-gray-700 text-lg leading-relaxed mb-4">
        We noticed that most URL shorteners are either filled with ads, limit functionality, or force user registration. We wanted to change that. Shortfy.xyz is designed to be clean, ad-free, fast, and optional for login—so anyone can shorten links freely, anytime, without friction.
      </p>

      <p className="text-gray-700 text-lg leading-relaxed mb-2">
        Built in <strong>Bangladesh 🇧🇩</strong>, used around the world 🌍.
      </p>
    </div>
  );
}
