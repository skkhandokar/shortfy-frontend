



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
