// 'use client'

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
// import { useAuth } from "../context/AuthContext"

// export default function AuthForm({ type = "signin" }) {
//   const [formData, setFormData] = useState({ username: "", email: "", password: "" })
//   const [error, setError] = useState("")
//   const router = useRouter()
//   const { login } = useAuth()

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setError("")

//     const endpoint = type === "signup" ? "/api/register/" : "/api/login/"
//     const body =
//       type === "signup"
//         ? formData
//         : { username: formData.username, password: formData.password }

//     try {
//       const res = await fetch(`https://skkhandokar22.pythonanywhere.com${endpoint}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body),
//       })

//       const data = await res.json()

//       if (!res.ok) {
//         if (data.username) throw new Error(data.username[0])
//         else if (data.email) throw new Error(data.email[0])
//         else if (data.error) throw new Error(data.error)
//         else throw new Error("Something went wrong")
//       }

//       localStorage.setItem("token", data.token)
//       login(data.username)

//       router.push("/")
//     } catch (err) {
//       setError(err.message)
//     }
//   }

//   return (
//     <div className="max-w-md mx-auto p-10 mt-20 bg-gradient-to-br from-violet-200 via-cyan-100 to-emerald-100 shadow-2xl rounded-3xl border border-gray-200 animate-fade-in">
//       <h2 className="text-3xl font-extrabold mb-8 text-center capitalize text-gray-800 tracking-wide">
//         {type === "signup" ? "Create an account" : "Welcome Back!"}
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <input
//           type="text"
//           name="username"
//           onChange={handleChange}
//           value={formData.username}
//           placeholder="Username"
//           required
//           className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-400/50 transition shadow-sm"
//         />

//         {type === "signup" && (
//           <input
//             type="email"
//             name="email"
//             onChange={handleChange}
//             value={formData.email}
//             placeholder="Email address"
//             required
//             className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-400/50 transition shadow-sm"
//           />
//         )}

//         <input
//           type="password"
//           name="password"
//           onChange={handleChange}
//           value={formData.password}
//           placeholder="Password"
//           required
//           className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-400/50 transition shadow-sm"
//         />

//         {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

//         <button
//           type="submit"
//           className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-2xl font-semibold tracking-wide shadow-md hover:shadow-lg transition-all duration-300"
//         >
//           {type === "signup" ? "Sign Up" : "Sign In"}
//         </button>
//       </form>

//       {/* Switch between signin/signup */}
//       <div className="mt-8 text-center">
//         {type === "signup" ? (
//           <p className="text-sm text-gray-600">
//             Already have an account?
//             <a
//               href="/signin"
//               className="ml-2 inline-flex items-center font-semibold text-emerald-500 hover:text-emerald-600 hover:underline transition-all duration-200 group"
//             >
//               Sign In
//               <ArrowForwardIcon
//                 fontSize="small"
//                 className="ml-1 transform group-hover:translate-x-1 transition-transform"
//               />
//             </a>
//           </p>
//         ) : (
//           <p className="text-sm text-gray-600">
//             Don't have an account?
//             <a
//               href="/signup"
//               className="ml-2 inline-flex items-center font-semibold text-emerald-500 hover:text-emerald-600 hover:underline transition-all duration-200 group"
//             >
//               Sign Up
//               <ArrowForwardIcon
//                 fontSize="small"
//                 className="ml-1 transform group-hover:translate-x-1 transition-transform"
//               />
//             </a>
//           </p>
//         )}
//       </div>
//     </div>
//   )
// }



'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import { useAuth } from "../context/AuthContext"

export default function AuthForm({ type = "signin" }) {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

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
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-white font-bold shadow-lg">
          S
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900">
          {type === "signup" ? "Create your Shortfy account" : "Sign in to Shortfy"}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Smart link shortening with real-time analytics.
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

        {type === "signup" && (
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
        )}

        <input
          type="password"
          name="password"
          autoComplete={type === "signup" ? "new-password" : "current-password"}
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
        {type === "signup" ? (
          <p>
            Already have an account?
            <a href="/signin" className="ml-2 font-semibold text-emerald-600 hover:underline inline-flex items-center group">
              Sign In
              <ArrowForwardIcon className="ml-1 text-sm group-hover:translate-x-1 transition-transform" />
            </a>
          </p>
        ) : (
          <p>
            Don’t have an account?
            <a href="/signup" className="ml-2 font-semibold text-emerald-600 hover:underline inline-flex items-center group">
              Sign Up
              <ArrowForwardIcon className="ml-1 text-sm group-hover:translate-x-1 transition-transform" />
            </a>
          </p>
        )}
      </div>
    </div>
  )
}


