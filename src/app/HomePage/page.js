

// import ShortenerForm from '../components/ShortenerForm'

// export const metadata = {
//   title: 'Shortfy – URL Shortener',
//   description: 'Create short URLs, track clicks, devices, countries, browsers, and use custom shortcodes with QR codes.',
// }

// export default function HomePage() {
//   return (
    
//     <main className="min-h-screen bg-gradient-to-tr from-emerald-200 via-teal-100 to-orange-100 flex flex-col items-center pt-20">
//       <h1 className="text-5xl font-extrabold text-center text-emerald-700 mb-8">
//         🔗 Shortfy – Fast URL Shortener
//       </h1>

//       <p className="text-center text-gray-800 text-lg max-w-2xl mb-12">
//         Create shorter URLs instantly. Track clicks, devices, countries, and browsers. 
//         Customize your links with branded shortcodes and generate QR codes.
//       </p>

//       <ShortenerForm />
//     </main>
//   )
// }




import ShortenerForm from "../components/ShortenerForm";

export const metadata = {
  title: "Shortfy – Fast & Smart URL Shortener",
  description:
    "Shortfy helps you instantly create short URLs, track clicks, browsers, countries, and devices. Use custom shortcodes and generate QR codes in seconds.",
};

export default function HomePage() {
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

      {/* Trust Signals */}
      <section className="mt-16 mb-4 text-center text-slate-700 max-w-2xl space-y-2 text-sm">
        <p>Trusted by hundreds of users worldwide 🌎</p>
        <p>Secure, fast, and AI-friendly URL shortening service</p>
        <p>100% uptime & responsive on mobile and desktop devices</p>
        <p>   </p>
        <p> 
        </p>
      </section>
    </main>
  );
}
