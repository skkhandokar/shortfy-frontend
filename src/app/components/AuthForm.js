

// 'use client'

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import VisibilityIcon from "@mui/icons-material/Visibility"
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
// import GitHubIcon from "@mui/icons-material/GitHub"
// import { useAuth } from "../context/AuthContext"
// import Image from "next/image"
// import { Box } from "@mui/material"

// export default function AuthForm({ type = "signin" }) {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     identifier: "", 
//     password: ""
//   })
//   const [showPassword, setShowPassword] = useState(false)
//   const [error, setError] = useState("")
//   const [loading, setLoading] = useState(false)
//   const router = useRouter()
//   const { login } = useAuth()

//   const GoogleLogo = () => (
//     <Box component="img" src="https://developers.google.com/identity/images/g-logo.png"
//       alt="Google" sx={{ width: 18, height: 18, mr: 1 }} />
//   );

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handleSocialLogin = (provider) => {
//     window.location.href = `https://skkhandokar22.pythonanywhere.com/accounts/${provider}/login/`
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setError("")
//     setLoading(true)

//     const endpoint = type === "signup" ? "/api/register/" : "/api/login/"
    
//     const body = type === "signup" 
//       ? { username: formData.username, email: formData.email, password: formData.password }
//       : { username: formData.identifier, password: formData.password }

//     try {
//       const res = await fetch(`https://skkhandokar22.pythonanywhere.com${endpoint}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body),
//       })

//       const data = await res.json()
//       if (!res.ok) throw new Error(data.detail || data.error || "Login failed")

//       localStorage.setItem("token", data.token)
//       login(data.username, data.token)
//       router.push("/")
//     } catch (err) {
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="relative w-full max-w-md mx-auto mt-10 p-6 bg-white rounded-3xl shadow-xl border border-gray-100 transition-all duration-300">
      
//       {/* Animated Logo Section */}
//       <div className="text-center mb-8">
//         <div className="group inline-block">
//           <div className="transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-6">
//             <Image 
//               src="/circle_logo.png" 
//               alt="Logo" 
//               width={85} 
//               height={85} 
//               className="mx-auto mb-3 drop-shadow-md group-hover:drop-shadow-2xl" 
//               priority 
//             />
//           </div>
//         </div>
//         <h2 className="text-2xl font-black text-gray-900 tracking-tight">
//             {type === "signup" ? "Get Started" : "Welcome Back"}
//         </h2>
//         <p className="text-gray-400 text-sm mt-1">Please enter your details</p>
//       </div>

//       {/* Social Buttons */}
//       <div className="grid grid-cols-2 gap-4 mb-6">
//         <button onClick={() => handleSocialLogin('google')} className="flex items-center justify-center border border-gray-100 p-3 rounded-2xl hover:bg-gray-50 transition-all font-bold text-sm shadow-sm active:scale-95">
//           <GoogleLogo /> Google
//         </button>
//         <button onClick={() => handleSocialLogin('github')} className="flex items-center justify-center border border-gray-100 p-3 rounded-2xl hover:bg-gray-50 transition-all font-bold text-sm shadow-sm active:scale-95">
//           <GitHubIcon fontSize="small" className="mr-2"/> GitHub
//         </button>
//       </div>

//       {/* NEW: Styled "OR" Divider */}
//       <div className="relative my-8 flex items-center">
//         <div className="flex-grow border-t border-gray-100"></div>
//         <span className="flex-shrink mx-4 text-gray-400 text-xs font-bold uppercase tracking-widest">or continue with</span>
//         <div className="flex-grow border-t border-gray-100"></div>
//       </div>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {type === "signup" ? (
//           <>
//             <InputField name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
//             <InputField name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
//           </>
//         ) : (
//           <InputField name="identifier" placeholder="Username or Email" value={formData.identifier} onChange={handleChange} />
//         )}

//         <div className="relative">
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             placeholder="Password"
//             required
//             className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-5 py-4 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all"
//             onChange={handleChange}
//             value={formData.password}
//           />
//           <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-500 transition-colors">
//             {showPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
//           </button>
//         </div>

//         {error && <p className="text-red-500 text-[11px] font-bold bg-red-50 p-3 rounded-xl border border-red-100 animate-pulse">{error}</p>}

//         <button type="submit" disabled={loading} className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-black shadow-lg hover:shadow-gray-200 transition-all transform active:scale-95">
//           {loading ? "Processing..." : (type === "signup" ? "Create Account" : "Sign In")}
//         </button>
//       </form>

//       {/* Toggle Link */}
//       <div className="mt-8 text-center text-sm font-medium text-gray-500">
//         <p>
//           {type === "signup" ? "Already using Shortfy?" : "New to Shortfy?"}
//           <Link href={type === "signup" ? "/signin" : "/signup"} className="ml-2 font-bold text-emerald-400 hover:text-emerald-700 transition-colors">
//             {type === "signup" ? "Sign In" : "Register Now"}
//           </Link>
//         </p>
//       </div>
//     </div>
//   )
// }

// function InputField({ name, type = "text", placeholder, value, onChange }) {
//   return (
//     <input 
//       type={type} 
//       name={name} 
//       placeholder={placeholder} 
//       value={value} 
//       onChange={onChange} 
//       required
//       className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-5 py-4 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all" 
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
import BASE_URL from "@/config/api"

export default function AuthForm({ type = "signin" }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    identifier: "",
    password: "",
    confirmPassword: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false) // NEW: Separate state for confirm password
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  // Validation Logic
  const isPasswordValid = formData.password.length >= 8;
  const isMatch = formData.password === formData.confirmPassword;
  const isSignupDisabled = type === "signup" && (!isPasswordValid || !isMatch || !formData.username || !formData.email);

  const GoogleLogo = () => (
    <Box component="img" src="https://developers.google.com/identity/images/g-logo.png"
      alt="Google" sx={{ width: 18, height: 18, mr: 1 }} />
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSocialLogin = (provider) => {
    window.location.href = `${BASE_URL}/accounts/${provider}/login/`
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
      const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || data.error || "Authentication failed")

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
      
      <div className="text-center mb-8">
        <Image src="/circle_logo.png" alt="Logo" width={85} height={85} className="mx-auto mb-3" priority />
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            {type === "signup" ? "Get Started" : "Welcome Back"}
        </h2>
        <p className="text-gray-400 text-sm mt-1">Please enter your details</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <button onClick={() => handleSocialLogin('google')} className="flex items-center justify-center border border-gray-100 p-3 rounded-2xl hover:bg-gray-50 transition-all font-bold text-sm shadow-sm cursor-pointer">
          <GoogleLogo /> Google
        </button>
        <button onClick={() => handleSocialLogin('github')} className="flex items-center justify-center border border-gray-100 p-3 rounded-2xl hover:bg-gray-50 transition-all font-bold text-sm shadow-sm cursor-pointer">
          <GitHubIcon fontSize="small" className="mr-2"/> GitHub
        </button>
      </div>

      <div className="relative my-8 flex items-center">
        <div className="flex-grow border-t border-gray-100"></div>
        <span className="flex-shrink mx-4 text-gray-400 text-xs font-bold uppercase tracking-widest">or continue with</span>
        <div className="flex-grow border-t border-gray-100"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {type === "signup" ? (
          <>
            <InputField name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
            <InputField name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
          </>
        ) : (
          <InputField name="identifier" placeholder="Username or Email" value={formData.identifier} onChange={handleChange} />
        )}

        {/* Password Field */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            required
            className={`w-full rounded-2xl border px-5 py-4 outline-none transition-all ${formData.password && !isPasswordValid ? 'border-orange-300 bg-orange-50' : 'border-gray-200 bg-gray-50/50 focus:border-emerald-500'}`}
            onChange={handleChange}
            value={formData.password}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-500 cursor-pointer">
            {showPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
          </button>
        </div>

        {type === "signup" && formData.password && !isPasswordValid && (
          <p className="text-[10px] text-orange-500 font-bold ml-2">Password must be at least 8 characters</p>
        )}

        {/* Confirm Password Field (Only for Signup) */}
        {type === "signup" && (
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              className={`w-full rounded-2xl border px-5 py-4 outline-none transition-all ${formData.confirmPassword && !isMatch ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50/50 focus:border-emerald-500'}`}
              onChange={handleChange}
              value={formData.confirmPassword}
            />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-500 cursor-pointer">
              {showConfirmPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
            </button>
          </div>
        )}

        {error && <p className="text-red-500 text-[11px] font-bold bg-red-50 p-3 rounded-xl border border-red-100">{error}</p>}

        <button 
          type="submit" 
          disabled={loading || isSignupDisabled} 
          className={`w-full py-4 rounded-2xl font-bold shadow-lg transition-all transform active:scale-95 
            ${isSignupDisabled 
              ? 'bg-gray-300 cursor-not-allowed opacity-70' 
              : 'bg-gray-900 text-white hover:bg-black cursor-pointer'}`}
        >
          {loading ? "Processing..." : (type === "signup" ? "Create Account" : "Sign In")}
        </button>
      </form>

      <div className="mt-8 text-center text-sm font-medium text-gray-500">
        <p>
          {type === "signup" ? "Already using Shortfy?" : "New to Shortfy?"}
          <Link href={type === "signup" ? "/signin" : "/signup"} className="ml-2 font-bold text-emerald-400 hover:text-emerald-700 transition-colors cursor-pointer">
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
      className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-5 py-4 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all cursor-text"
    />
  )
}