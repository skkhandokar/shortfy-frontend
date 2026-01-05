
import AuthFormSignup from "../components/AuthFormSignup"

export const metadata = {
  title: "Sign Up for Shortfy | Secure URL Shortener Account",
  description:
    "Create a Shortfy account to shorten, track, and manage your links easily. Fast, reliable, and secure URL shortening platform.",
  robots: "index, follow",
  alternates: {
    canonical: "https://shortfy.xyz/signup",
  },
  openGraph: {
    title: "Sign Up | Shortfy URL Shortener",
    description:
      "Sign up to access your Shortfy dashboard, create smart URLs, and track link analytics.",
    url: "https://shortfy.xyz/signup",
    siteName: "Shortfy",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Sign Up | Shortfy",
    description:
      "Register at Shortfy to manage shortened URLs with detailed analytics.",
  },
}

export default function SignupPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f8fafc]">
      
      {/* Background blobs */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-emerald-300/40 blur-3xl" />
      <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-violet-300/40 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-cyan-300/40 blur-3xl" />

      {/* Centered Signup Form */}
      <section className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <AuthFormSignup type="signup" />
      </section>
    </main>
  )
}
