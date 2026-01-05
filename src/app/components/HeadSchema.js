import Head from "next/head";

export default function HeadSchema() {
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Shortfy",
            "url": "https://shortfy.xyz",
            "applicationCategory": "URL Shortener",
            "description":
              "Shortfy.xyz is a free URL shortener with built-in link analytics. Track clicks, devices, browsers, and countries without signup.",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
            },
            "faq": [
              {
                "@type": "Question",
                "name": "Is Shortfy free?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, basic link shortening and analytics are completely free.",
                },
              },
              {
                "@type": "Question",
                "name": "Can I use Shortfy without signing up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, no account is needed for basic shortening and analytics.",
                },
              },
              {
                "@type": "Question",
                "name": "How does Shortfy track clicks?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Shortfy tracks clicks, devices, countries, browsers, and referrers in real time.",
                },
              },
              {
                "@type": "Question",
                "name": "Can I export analytics data?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, analytics data can be exported in CSV format.",
                },
              },
              {
                "@type": "Question",
                "name": "Can I create custom short URLs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, you can create custom aliases and vanity URLs for branding.",
                },
              },
              {
                "@type": "Question",
                "name": "Does Shortfy generate QR codes?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, generate QR codes for every short URL instantly.",
                },
              },
              {
                "@type": "Question",
                "name": "Is there a browser extension?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, shorten URLs directly from Chrome or Firefox toolbar.",
                },
              },
              {
                "@type": "Question",
                "name": "Can I manage my URLs in a dashboard?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, logged-in users can view, edit, delete, and track all their URLs.",
                },
              },
              {
                "@type": "Question",
                "name": "Does Shortfy work on mobile devices?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, Shortfy is fully responsive and works on mobile and tablets.",
                },
              },
              {
                "@type": "Question",
                "name": "Are shortened URLs permanent?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, as long as they are not deleted by the user.",
                },
              },
              {
                "@type": "Question",
                "name": "Can anonymous users shorten URLs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, basic shortening is available without login.",
                },
              },
              {
                "@type": "Question",
                "name": "Does Shortfy provide device analytics?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, see which devices your audience is using to click your links.",
                },
              },
              {
                "@type": "Question",
                "name": "Can I track countries and locations of clicks?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, Shortfy provides country-level analytics for every link.",
                },
              },
              {
                "@type": "Question",
                "name": "Can I delete my URLs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, logged-in users can delete any URL from their dashboard.",
                },
              },
              {
                "@type": "Question",
                "name": "Is Shortfy safe and secure?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, Shortfy ensures secure link creation and does not store unnecessary personal data.",
                },
              }
            ],
          }),
        }}
      />
    </Head>
  );
}





// “Best URL shortener with analytics” “How Shortfy tracks link clicks (with example)” “How can I track who clicks my short links?” “Shortfy is good for X, but not ideal for Y”  AI প্রশ্ন:

// “How to track link analytics for free?” egulur scheme korbo