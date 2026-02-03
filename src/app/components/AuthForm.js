

// 'use client'

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
// import { useAuth } from "../context/AuthContext"
// import Image from "next/image"

// export default function AuthForm({ type = "signin" }) {
//   const [formData, setFormData] = useState({ username: "", email: "", password: "" })
//   const [error, setError] = useState("")
//   const [loading, setLoading] = useState(false)
//   const router = useRouter()
//   const { login } = useAuth()

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setError("")
//     setLoading(true)

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
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="w-full max-w-md rounded-[28px] border border-white/60 bg-gray-100 backdrop-blur-2xl p-10 shadow-[0_30px_80px_rgba(0,0,0,0.18)] animate-fade-in">
      
//       {/* Brand */}
//       <div className="mb-8 text-center">
//    <div className="mx-auto mb-4 mt-9 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg transition-transform duration-300 hover:scale-110">
//   <Image
//     src="/circle_logo.png"
//     alt="Shortfy Logo"
//     width={62}
//     height={62}
//     className="object-contain"
//     priority
//   />
// </div>


//         <h2 className="text-3xl font-extrabold text-gray-900">
//           {type === "signup" ? "Create your Shortfy account" : "Sign in to Shortfy"}
//         </h2>
//         <p className="mt-2 text-sm text-gray-600">
//           Smart link shortening with real-time analytics.
//         </p>
//       </div>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="space-y-5">
//         <input
//           type="text"
//           name="username"
//           autoComplete="username"
//           onChange={handleChange}
//           value={formData.username}
//           placeholder="Username"
//           required
//           className="w-full rounded-xl border border-gray-300 bg-white/90 px-5 py-3 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 transition"
//         />

//         {type === "signup" && (
//           <input
//             type="email"
//             name="email"
//             autoComplete="email"
//             onChange={handleChange}
//             value={formData.email}
//             placeholder="Email address"
//             required
//             className="w-full rounded-xl border border-gray-300 bg-white/90 px-5 py-3 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 transition"
//           />
//         )}

//         <input
//           type="password"
//           name="password"
//           autoComplete={type === "signup" ? "new-password" : "current-password"}
//           onChange={handleChange}
//           value={formData.password}
//           placeholder="Password"
//           required
//           className="w-full rounded-xl border border-gray-300 bg-white/90 px-5 py-3 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 transition"
//         />

//         {error && (
//           <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
//             {error}
//           </div>
//         )}

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={loading}
//           className={`mt-2 w-full rounded-xl py-3 font-semibold text-white shadow-lg transition-all
//             ${loading
//               ? "cursor-not-allowed bg-gray-400"
//               : "bg-gradient-to-r from-emerald-500 to-cyan-500 hover:shadow-xl hover:brightness-110"
//             }`}
//         >
//           {loading ? (
//             <span className="flex items-center justify-center gap-2">
//               <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
//               {type === "signup" ? "Creating account..." : "Signing in..."}
//             </span>
//           ) : (
//             type === "signup" ? "Create Account" : "Sign In"
//           )}
//         </button>
//       </form>

//       {/* Footer */}
//       <div className="mt-8 text-center text-sm text-gray-600">
//         {type === "signup" ? (
//           <p>
//             Already have an account?
//             <a href="/signin" className="ml-2 font-semibold text-emerald-600 hover:underline inline-flex items-center group">
//               Sign In
//               <ArrowForwardIcon className="ml-1 text-sm group-hover:translate-x-1 transition-transform" />
//             </a>
//           </p>
//         ) : (
//           <p>
//             Don’t have an account?
//             <a href="/signup" className="ml-2 font-semibold text-emerald-600 hover:underline inline-flex items-center group">
//               Sign Up
//               <ArrowForwardIcon className="ml-1 text-sm group-hover:translate-x-1 transition-transform" />
//             </a>
//           </p>
//         )}
//       </div>
//     </div>
//   )
// }


// 'use client'

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
// import VisibilityIcon from "@mui/icons-material/Visibility"
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
// import { useAuth } from "../context/AuthContext"
// import Image from "next/image"

// export default function AuthForm({ type = "signin" }) {
//   const [formData, setFormData] = useState({ username: "", email: "", password: "" })
//   const [showPassword, setShowPassword] = useState(false) // Password toggle state
//   const [error, setError] = useState("")
//   const [loading, setLoading] = useState(false)
//   const router = useRouter()
//   const { login } = useAuth()

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setError("")
//     setLoading(true)

//     const endpoint = type === "signup" ? "/api/register/" : "/api/login/"
//     const body = type === "signup" 
//       ? formData 
//       : { username: formData.username, password: formData.password }

//     try {
//       const res = await fetch(`https://skkhandokar22.pythonanywhere.com${endpoint}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body),
//       })

//       const data = await res.json()

//       if (!res.ok) {
//         throw new Error(data.username?.[0] || data.email?.[0] || data.error || "Something went wrong")
//       }

//       localStorage.setItem("token", data.token)
//       login(data.username)
//       router.push("/")
//     } catch (err) {
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="relative group w-full max-w-md">
//       {/* Background Glow */}
//       <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-20 blur-xl transition duration-1000 group-hover:opacity-40"></div>
      
//       <div className="relative w-full rounded-[30px] border border-white/60 bg-white/90 backdrop-blur-2xl p-8 sm:p-10 shadow-xl">
        
//         {/* Brand/Logo Section - Fixed Alignment */}
//         <div className="mb-8 text-center">
//           <div className="mx-auto  flex mb-4 mt-9  h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:rotate-6">
//             <Image
//               src="/circle_logo.png"
//               alt="Shortfy Logo"
//               width={50}
//               height={50}
//               className="object-contain"
//               priority
//             />
//           </div>
//           <h2 className="text-2xl font-black tracking-tight text-gray-900">
//             {type === "signup" ? "Get Started" : "Welcome Back"}
//           </h2>
//         </div>

//         {/* Form Section */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <InputField 
//             name="username" 
//             placeholder="Username" 
//             value={formData.username} 
//             onChange={handleChange} 
//           />
          
//           {type === "signup" && (
//             <InputField 
//               name="email" 
//               type="email" 
//               placeholder="Email address" 
//               value={formData.email} 
//               onChange={handleChange} 
//             />
//           )}

//           {/* Password Field with Eye Icon */}
//           <div className="relative group/pass">
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               onChange={handleChange}
//               value={formData.password}
//               placeholder="Password"
//               required
//               className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-5 py-4 pr-12 text-gray-900 placeholder-gray-400 outline-none transition-all duration-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//             >
//               {showPassword ? (
//                 <VisibilityOffIcon fontSize="small" />
//               ) : (
//                 <VisibilityIcon fontSize="small" />
//               )}
//             </button>
//           </div>

//           {error && (
//             <div className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 p-3.5 text-xs font-bold text-red-600 animate-in fade-in slide-in-from-top-1">
//               <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
//               {error}
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className={`mt-2 w-full rounded-2xl py-4 font-bold text-white transition-all duration-300 active:scale-95
//               ${loading 
//                 ? "bg-gray-400 cursor-not-allowed" 
//                 : "bg-gray-900 hover:bg-black hover:shadow-lg"
//               }`}
//           >
//             {loading ? "Processing..." : (type === "signup" ? "Create Account" : "Sign In")}
//           </button>
//         </form>

//         {/* Footer */}
//         <div className="mt-8 text-center text-sm font-medium text-gray-500">
//           <p>
//             {type === "signup" ? "Already have an account?" : "New to Shortfy?"}
//             <a href={type === "signup" ? "/signin" : "/signup"} className="ml-2 font-bold text-emerald-600 hover:underline">
//               {type === "signup" ? "Sign In" : "Create Account"}
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

// function InputField({ name, type = "text", placeholder, value, onChange }) {
//   return (
//     <input
//       type={type}
//       name={name}
//       onChange={onChange}
//       value={value}
//       placeholder={placeholder}
//       required
//       className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-5 py-4 text-gray-900 placeholder-gray-400 outline-none transition-all duration-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
//     />
//   )
// }


'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import GitHubIcon from "@mui/icons-material/GitHub"
import { useAuth } from "../context/AuthContext"
import Image from "next/image"
import { Box } from "@mui/material"

export default function AuthForm({ type = "signin" }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    identifier: "", 
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const GoogleLogo = () => (
    <Box component="img" src="https://developers.google.com/identity/images/g-logo.png"
      alt="Google" sx={{ width: 18, height: 18, mr: 1 }} />
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSocialLogin = (provider) => {
    window.location.href = `https://skkhandokar22.pythonanywhere.com/accounts/${provider}/login/`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const endpoint = type === "signup" ? "/api/register/" : "/api/login/"
    
    const body = type === "signup" 
      ? { username: formData.username, email: formData.email, password: formData.password }
      : { username: formData.identifier, password: formData.password }

    try {
      const res = await fetch(`https://skkhandokar22.pythonanywhere.com${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || data.error || "Login failed")

      localStorage.setItem("token", data.token)
      login(data.username, data.token)
      router.push("/")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative w-full max-w-md mx-auto mt-10 p-6 bg-white rounded-3xl shadow-xl border border-gray-100 transition-all duration-300">
      
      {/* Animated Logo Section */}
      <div className="text-center mb-8">
        <div className="group inline-block">
          <div className="transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-6">
            <Image 
              src="/circle_logo.png" 
              alt="Logo" 
              width={85} 
              height={85} 
              className="mx-auto mb-3 drop-shadow-md group-hover:drop-shadow-2xl" 
              priority 
            />
          </div>
        </div>
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            {type === "signup" ? "Get Started" : "Welcome Back"}
        </h2>
        <p className="text-gray-400 text-sm mt-1">Please enter your details</p>
      </div>

      {/* Social Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button onClick={() => handleSocialLogin('google')} className="flex items-center justify-center border border-gray-100 p-3 rounded-2xl hover:bg-gray-50 transition-all font-bold text-sm shadow-sm active:scale-95">
          <GoogleLogo /> Google
        </button>
        <button onClick={() => handleSocialLogin('github')} className="flex items-center justify-center border border-gray-100 p-3 rounded-2xl hover:bg-gray-50 transition-all font-bold text-sm shadow-sm active:scale-95">
          <GitHubIcon fontSize="small" className="mr-2"/> GitHub
        </button>
      </div>

      {/* NEW: Styled "OR" Divider */}
      <div className="relative my-8 flex items-center">
        <div className="flex-grow border-t border-gray-100"></div>
        <span className="flex-shrink mx-4 text-gray-400 text-xs font-bold uppercase tracking-widest">or continue with</span>
        <div className="flex-grow border-t border-gray-100"></div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {type === "signup" ? (
          <>
            <InputField name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
            <InputField name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
          </>
        ) : (
          <InputField name="identifier" placeholder="Username or Email" value={formData.identifier} onChange={handleChange} />
        )}

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            required
            className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-5 py-4 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all"
            onChange={handleChange}
            value={formData.password}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-500 transition-colors">
            {showPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
          </button>
        </div>

        {error && <p className="text-red-500 text-[11px] font-bold bg-red-50 p-3 rounded-xl border border-red-100 animate-pulse">{error}</p>}

        <button type="submit" disabled={loading} className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-black shadow-lg hover:shadow-gray-200 transition-all transform active:scale-95">
          {loading ? "Processing..." : (type === "signup" ? "Create Account" : "Sign In")}
        </button>
      </form>

      {/* Toggle Link */}
      <div className="mt-8 text-center text-sm font-medium text-gray-500">
        <p>
          {type === "signup" ? "Already using Shortfy?" : "New to Shortfy?"}
          <Link href={type === "signup" ? "/signin" : "/signup"} className="ml-2 font-bold text-blue-400 hover:text-blue-700 transition-colors">
            {type === "signup" ? "Sign In" : "Register Now"}
          </Link>
        </p>
      </div>
    </div>
  )
}

function InputField({ name, type = "text", placeholder, value, onChange }) {
  return (
    <input 
      type={type} 
      name={name} 
      placeholder={placeholder} 
      value={value} 
      onChange={onChange} 
      required
      className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-5 py-4 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all" 
    />
  )
}