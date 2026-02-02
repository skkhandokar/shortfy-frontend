// 'use client'

// import { createContext, useContext, useEffect, useState } from 'react'

// const AuthContext = createContext()

// export function AuthProvider({ children }) {
//   const [username, setUsername] = useState(null)
//   const [loading, setLoading] = useState(true) // ডাটা লোড হওয়া পর্যন্ত ট্র্যাক করবে

//   useEffect(() => {
//     // পেজ রিফ্রেশ করলে লোকাল স্টোরেজ থেকে ডাটা রিকভার করা
//     const storedUsername = localStorage.getItem('username')
//     const token = localStorage.getItem('token')
    
//     if (storedUsername && token) {
//       setUsername(storedUsername)
//     }
//     setLoading(false)
//   }, [])

//   // লগইন ফাংশন: এটি ম্যানুয়াল এবং সোশ্যাল দুই ক্ষেত্রেই কাজ করবে
//   const login = (userData, token) => {
//     setUsername(userData)
//     localStorage.setItem('username', userData)
//     localStorage.setItem('token', token)
//   }

//   const logout = () => {
//     setUsername(null)
//     localStorage.removeItem('username')
//     localStorage.removeItem('token')
//   }

//   return (
//     <AuthContext.Provider value={{ username, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export const useAuth = () => useContext(AuthContext)



'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Image from "next/image"

export default function Navbar() {
  const { username, logout } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false) // Hydration error বাচাতে

  // ✅ Client-side mounting check
  useEffect(() => {
    setMounted(true)
  }, [])

  const isActive = (path) => pathname === path

  const handleProtectedClick = (href) => {
    if (username) {
      router.push(href)
    } else {
      router.push('/signin')
    }
    setOpen(false)
  }

  // যদি মাউন্ট না হয়, তবে কিছুই দেখাবে না (Flickering এবং Error বাচাতে)
  if (!mounted) return null;

  return (
    <nav
      className="fixed top-0 left-0 w-full bg-[#0A1A2F] text-white shadow-md z-50"
      aria-label="Primary Navigation"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/circle_logo.png"
            alt="Shortfy Logo"
            width={44}
            height={44}
            className="object-contain transition-transform group-hover:scale-110"
            priority
          />
          <span className="text-2xl font-semibold tracking-tight group-hover:text-slate-200">
            Shortfy
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-sm sm:text-base">
          {username && <span className="text-slate-300 font-medium">{username}</span>}

          {/* Protected links */}
          {['/my-urls', '/custom-urls', '/bulkshortner'].map((link) => (
            <button
              key={link}
              onClick={() => handleProtectedClick(link)}
              className={`cursor-pointer ${
                isActive(link) ? 'font-medium underline text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              {link === '/my-urls' ? 'My URLs' : link === '/custom-urls' ? 'Custom URLs' : 'Bulk'}
            </button>
          ))}

          {/* Public links */}
          <Link href="/features" className={`hover:text-white ${isActive('/features') ? 'underline' : ''}`}>
            Features
          </Link>
          <Link href="/shorturlcheck" className={`hover:text-white ${isActive('/shorturlcheck') ? 'underline' : ''}`}>
            Check URLs
          </Link>

          {username ? (
            <button onClick={logout} className="text-red-400 hover:text-red-500">Logout</button>
          ) : (
            <>
              <Link href="/signin" className="hover:text-white">Login</Link>
              <Link href="/signup" className="px-4 py-2 rounded-md bg-white text-[#0A1A2F] font-medium">Signup</Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#0A1A2F] border-t border-slate-700 px-6 py-6 space-y-4">
          {username && <span className="block text-slate-400 mb-2">{username}</span>}
          {['/my-urls', '/custom-urls', '/bulkshortner', '/features', '/shorturlcheck'].map((link) => (
            <button
              key={link}
              onClick={() => {
                ['/my-urls', '/custom-urls', '/bulkshortner'].includes(link) 
                  ? handleProtectedClick(link) 
                  : router.push(link);
                setOpen(false);
              }}
              className="block w-full text-left text-slate-300 hover:text-white py-2"
            >
              {link === '/my-urls' ? 'My URLs' : link === '/custom-urls' ? 'Custom URLs' : link === '/bulkshortner' ? 'Bulk' : 'Features'}
            </button>
          ))}
          {username ? (
            <button onClick={logout} className="block text-red-400 py-2">Logout</button>
          ) : (
            <div className="pt-4 space-y-4">
              <Link href="/signin" className="block text-slate-300">Login</Link>
              <Link href="/signup" className="block text-center px-4 py-2 rounded-md bg-white text-[#0A1A2F]">Signup</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}