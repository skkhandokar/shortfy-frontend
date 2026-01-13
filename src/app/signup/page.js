
import AuthFormSignup from "../components/AuthFormSignup"
import AuthForm from "../components/AuthForm"

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
      {/* <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-emerald-300/40 blur-3xl" />
      <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-violet-300/40 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-cyan-300/40 blur-3xl" /> */}

      {/* Centered Signup Form */}
      <section className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <AuthForm type="signup" />
      </section>
    </main>
  )
}






// "use client"

// import Link from "next/link"
// import { FaGoogle, FaGithub } from "react-icons/fa"

// export default function AuthFormSignup({ type = "signup" }) {
//   return (
//     <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl">

//       {/* Title */}
//       <h2 className="text-center text-xl sm:text-2xl font-bold text-slate-900">
//         Sign up for Shortfy
//       </h2>
//       <p className="mt-2 text-center text-sm text-slate-600">
//         Create an account to manage and track your short links
//       </p>

//       {/* Social signup */}
//       <div className="mt-6 space-y-3">
//         <button
//           type="button"
//           className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 hover:bg-slate-50 transition"
//         >
//           <FaGoogle className="text-red-500" />
//           Sign up with Google
//         </button>

//         <button
//           type="button"
//           className="flex w-full items-center justify-center gap-3 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 transition"
//         >
//           <FaGithub />
//           Sign up with GitHub
//         </button>
//       </div>

//       {/* Divider */}
//       <div className="my-6 flex items-center gap-3">
//         <div className="h-px flex-1 bg-slate-200" />
//         <span className="text-xs text-slate-500">OR</span>
//         <div className="h-px flex-1 bg-slate-200" />
//       </div>

//       {/* Email signup */}
//       <form className="space-y-4">
//         <input
//           type="text"
//           placeholder="Full name"
//           className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-slate-900 focus:outline-none"
//         />

//         <input
//           type="email"
//           placeholder="Email address"
//           className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-slate-900 focus:outline-none"
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-slate-900 focus:outline-none"
//         />

//         <button
//           type="submit"
//           className="w-full rounded-lg bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 transition"
//         >
//           Create account
//         </button>
//       </form>

//       {/* Footer */}
//       <p className="mt-6 text-center text-xs sm:text-sm text-slate-600">
//         Already have an account?{" "}
//         <Link
//           href="/signin"
//           className="font-medium text-blue-900 hover:underline"
//         >
//           Sign in
//         </Link>
//       </p>
//     </div>
//   )
// }
