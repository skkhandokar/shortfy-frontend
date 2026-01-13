'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import { useAuth } from "../context/AuthContext"

export default function AuthFormSignup({ type = "signup" }) {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const endpoint = type === "signup" ? "/api/register/" : "/api/login/"
    const body =
      type === "signup"
        ? formData
        : { username: formData.username, password: formData.password }

    try {
      const res = await fetch(`https://skkhandokar22.pythonanywhere.com${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (!res.ok) {
        if (data.username) throw new Error(data.username[0])
        else if (data.email) throw new Error(data.email[0])
        else if (data.error) throw new Error(data.error)
        else throw new Error("Something went wrong")
      }

      localStorage.setItem("token", data.token)
      login(data.username)
      router.push("/")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md rounded-[28px] border border-white/60 bg-white/70 backdrop-blur-2xl p-10 shadow-[0_30px_80px_rgba(0,0,0,0.18)] animate-fade-in">
      
      {/* Brand */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 mt-8 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center relative">
          {/* Outer subtle ring */}
          <div className="absolute inset-0 rounded-full border border-gray-100 shadow-sm"></div>

          {/* SVG Custom Logo with previous gradient color feel */}
          <svg
            viewBox="0 0 100 100"
            className="h-12 w-12 sm:h-14 sm:w-14 drop-shadow-lg"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Shortfy logo"
          >
            {/* Top Arc with Arrow (Dark Blue) */}
            <path
              d="M25 40C28 25 45 15 65 22L72 15M72 15V32M72 15H55"
              stroke="#001f3f"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Speed Lines on the left */}
            <line x1="10" y1="42" x2="22" y2="42" stroke="#001f3f" strokeWidth="5" strokeLinecap="round"/>
            <line x1="15" y1="52" x2="22" y2="52" stroke="#001f3f" strokeWidth="5" strokeLinecap="round"/>

            {/* Center 'S' */}
            <text
              x="50%"
              y="58%"
              textAnchor="middle"
              fill="url(#gradient)"
              fontSize="34"
              fontWeight="900"
              fontFamily="sans-serif"
            >
              S
            </text>

            {/* Bottom Arc */}
            <path
              d="M30 65C40 80 65 82 80 65"
              stroke="black"
              strokeWidth="6"
              strokeLinecap="round"
              opacity="0.8"
            />
            <path
              d="M80 65L85 55M80 65L70 58"
              stroke="black"
              strokeWidth="6"
              strokeLinecap="round"
              opacity="0.8"
            />

            {/* Gradient Definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" /> {/* Emerald */}
                <stop offset="100%" stopColor="#06b6d4" /> {/* Cyan */}
              </linearGradient>
            </defs>
          </svg>
        </div>

        <h2 className="text-3xl font-extrabold text-gray-900">
          {type === "signup" ? "Create your Shortfy account" : "Sign in to Shortfy"}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {type === "signup"
            ? "Shorten, track, and manage your links smarter."
            : "Sign in to manage your links & analytics."}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="username"
          autoComplete="username"
          onChange={handleChange}
          value={formData.username}
          placeholder="Username"
          required
          className="w-full rounded-xl border border-gray-300 bg-white/90 px-5 py-3 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 transition"
        />

        <input
          type="email"
          name="email"
          autoComplete="email"
          onChange={handleChange}
          value={formData.email}
          placeholder="Email address"
          required
          className="w-full rounded-xl border border-gray-300 bg-white/90 px-5 py-3 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 transition"
        />

        <input
          type="password"
          name="password"
          autoComplete="new-password"
          onChange={handleChange}
          value={formData.password}
          placeholder="Password"
          required
          className="w-full rounded-xl border border-gray-300 bg-white/90 px-5 py-3 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 transition"
        />

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`mt-2 w-full rounded-xl py-3 font-semibold text-white shadow-lg transition-all
            ${loading
              ? "cursor-not-allowed bg-gray-400"
              : "bg-gradient-to-r from-emerald-500 to-cyan-500 hover:shadow-xl hover:brightness-110"
            }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              {type === "signup" ? "Creating account..." : "Signing in..."}
            </span>
          ) : (
            type === "signup" ? "Create Account" : "Sign In"
          )}
        </button>
      </form>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-gray-600">
        <p>
          {type === "signup" ? "Already have an account?" : "Don't have an account?"}
          <a
            href={type === "signup" ? "/signin" : "/signup"}
            className="ml-2 font-semibold text-emerald-600 hover:underline inline-flex items-center group"
          >
            {type === "signup" ? "Sign In" : "Sign Up"}
            <ArrowForwardIcon className="ml-1 text-sm group-hover:translate-x-1 transition-transform" />
          </a>
        </p>
      </div>
    </div>
  )
}
