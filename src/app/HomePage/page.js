import ShortenerForm from "../components/ShortenerForm";

export const metadata = {
  title: "Shortfy – Fast & Smart URL Shortener",
  description:
    "Shortfy helps you instantly create short URLs, track clicks, browsers, countries, and devices. Use custom shortcodes and generate QR codes in seconds.",
};

export default function HomePage() {
  const appLink = "https://play.google.com/store/apps/details?id=com.skkhandokar.shortfy";
  const extensionLink = "https://chromewebstore.google.com/detail/akpbgdedbilmnjkcdckihlenmhmfocdi?utm_source=item-share-cb"; // আপনার ক্রোম এক্সটেনশনের আসল লিঙ্কটি এখানে দিন

  return (
    <main className="min-h-screen flex flex-col items-center pt-28 px-4 bg-white">
      
      {/* Hero Section */}
      <section className="text-center max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0A1A2F] mb-4 leading-tight">
          🔗 Shortfy – Fast, Reliable & Smart URL Shortener
        </h1>

        <p className="text-slate-700 text-lg sm:text-xl mb-8 leading-relaxed">
          Instantly shorten any URL and share it anywhere. Track clicks, devices,
          browsers, and countries. Customize your links with branded shortcodes
          and generate QR codes for seamless sharing.
        </p>

        {/* Primary CTA */}
        <a
          href="#shortener"
          className="inline-block bg-[#0A1A2F] text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-slate-800 transition-colors"
          aria-label="Go to URL Shortener"
        >
          Shorten Your URL 🚀
        </a>
      </section>

      {/* URL Shortener Form */}
      <section id="shortener" className="mt-12 w-full max-w-xl">
        <ShortenerForm />
      </section>

      {/* --- Multi-Platform Tools Section --- */}
      <section className="mt-24 w-full max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#0A1A2F]">Available on All Platforms</h2>
          <p className="text-slate-500 mt-2">Access Shortfy from your phone or browser anytime.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Android App Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-8 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="mb-4">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${appLink}`} 
                alt="Scan to download"
                className="w-28 h-28 border-4 border-white rounded-xl shadow-sm"
              />
            </div>
            <h3 className="text-xl font-bold text-[#0A1A2F]">Android App</h3>
            <p className="text-sm text-slate-600 mb-6 mt-2">
              Shorten links on the go and get real-time push notifications for analytics.
            </p>
            <a href={appLink} target="_blank" rel="noopener noreferrer">
              <img 
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" 
                alt="Get it on Google Play" 
                className="w-[180px] hover:scale-105 transition-transform"
              />
            </a>
            <span className="mt-2 text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase">Early Access</span>
          </div>

          {/* Chrome Extension Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-8 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="w-28 h-28 mb-4 flex items-center justify-center bg-white rounded-xl shadow-sm">
               {/* Chrome Logo Icon */}
               <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C8.21 0 4.83 1.75 2.62 4.51L6.05 10.45C6.39 8.1 8.44 6.26 10.91 6.26H21.5C20.12 2.58 16.51 0 12 0Z" fill="#EA4335"/>
                  <path d="M5.4 11.58L0.470001 3.03C0.16 4.39 0 5.8 0 7.26C0 12.37 3.2 16.73 7.68 18.42L11.11 12.48C9.42 12.48 7.91 11.59 7.08 10.25L5.4 11.58Z" fill="#FBBC05"/>
                  <path d="M12 17.74C10.74 17.74 9.61 17.21 8.81 16.38L5.38 22.32C7.3 23.41 9.54 24.04 12 24.04C16.89 24.04 21 21.16 22.84 17.02L17.7 17.02C16.49 17.44 15.2 17.74 12 17.74Z" fill="#34A853"/>
                  <path d="M12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5Z" fill="#4285F4"/>
               </svg>
            </div>
            <h3 className="text-xl font-bold text-[#0A1A2F]">Chrome Extension</h3>
            <p className="text-sm text-slate-600 mb-6 mt-2">
              One-click link shortening directly from your browser toolbar. No more switching tabs.
            </p>
            <a 
              href={extensionLink} 
              target="_blank" 
              className="inline-block bg-white border border-slate-300 text-[#0A1A2F] font-semibold px-6 py-2 rounded-lg shadow-sm hover:bg-slate-100 transition-colors"
            >
              Add to Chrome 🧩
            </a>
            <span className="mt-4 text-[10px] font-bold text-slate-400 uppercase">Available in Web Store</span>
          </div>

        </div>
      </section>
      {/* --- End of Tools Section --- */}

      {/* Trust Signals */}
      <section className="mt-20 mb-12 text-center text-slate-700 max-w-2xl space-y-2 text-sm">
        <p>Trusted by hundreds of users worldwide 🌎</p>
        <p>Secure, fast, and AI-friendly URL shortening service</p>
        <p>100% uptime & responsive on mobile and desktop devices</p>
      </section>
    </main>
  );
}