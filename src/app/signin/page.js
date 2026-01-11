




// import AuthForm from "../components/AuthForm"

// export const metadata = {
//   title: "Sign In to Shortfy | Secure URL Shortener Account",
//   description:
//     "Sign in to your Shortfy account to manage, track, and analyze your shortened links securely. Fast, reliable, and easy URL shortening platform.",
//   robots: "index, follow",
//   alternates: {
//     canonical: "https://shortfy.xyz/signin",
//   },
//   openGraph: {
//     title: "Sign In | Shortfy URL Shortener",
//     description:
//       "Access your Shortfy dashboard to manage shortened links, view analytics, and create smart URLs.",
//     url: "https://shortfy.xyz/signin",
//     siteName: "Shortfy",
//     type: "website",
//   },
//   twitter: {
//     card: "summary",
//     title: "Sign In | Shortfy",
//     description:
//       "Login to Shortfy and manage your shortened URLs with detailed analytics.",
//   },
// }

// export default function SigninPage() {
//   return (
//     <main className="relative min-h-screen overflow-hidden bg-gray-100">
      
//       {/* Soft gradient blobs */}
//       <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-emerald-300/40 blur-3xl" />
//       <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-violet-300/40 blur-3xl" />
//       <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-cyan-300/40 blur-3xl" />

//       {/* Centered AuthForm */}
//       <section className="relative z-10 flex min-h-screen items-center justify-center px-4">
//         <AuthForm type="signin" />
//       </section>
//     </main>
//   )
// }




import AuthForm from "../components/AuthForm";

export const metadata = {
  title: "Sign In to Shortfy | Secure URL Shortener Account",
  description:
    "Sign in to your Shortfy account to manage, track, and analyze your shortened links securely. Fast, reliable, and professional URL shortening platform.",
  robots: "index, follow",
  alternates: { canonical: "https://shortfy.xyz/signin" },
};

export default function SigninPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f8fafc]">
      {/* blobs */}
      {/* <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-gray-700/20 blur-3xl" />
      <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-gray-600/20 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-gray-800/20 blur-3xl" /> */}

      {/* client AuthForm */}
      <section className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <AuthForm type="signin" />
      </section>
    </main>
  );
}
