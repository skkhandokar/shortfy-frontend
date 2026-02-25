// 'use client'

// import Link from 'next/link'
// // import Head from 'next/head' // ❌ এটি ডিলিট করুন
// import { usePathname, useRouter } from 'next/navigation'
// import { useState, useEffect } from 'react'
// import { Menu, X } from 'lucide-react'
// import { useAuth } from '../context/AuthContext'
// import Image from "next/image"

// export default function Navbar() {
//   const { username, logout } = useAuth()
//   const pathname = usePathname()
//   const router = useRouter()
//   const [open, setOpen] = useState(false)
//   const [isAuthenticated, setIsAuthenticated] = useState(false)

//   useEffect(() => {
//     const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
//     setIsAuthenticated(!!token)
//   }, [])

//   const isActive = (path) => pathname === path

//   const handleProtectedClick = (href) => {
//     if (username || isAuthenticated) {
//       router.push(href)
//     } else {
//       router.push('/signin')
//     }
//     setOpen(false)
//   }

//   return (
//     <>
//       {/* ❌ এখান থেকে <Head> ট্যাগটি সরিয়ে ফেলা হয়েছে */}
      
//       <nav
//         className="fixed top-0 left-0 w-full bg-[#0A1A2F] text-white shadow-md z-50"
//         aria-label="Primary Navigation"
//       >
//         {/* ... বাকি কোড সব একই থাকবে ... */}
//         <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4">
//            {/* Logo */}
//            <Link href="/" className="flex items-center gap-3 group">
//             <Image
//               src="/circle_logo.png"
//               alt="Shortfy Logo"
//               width={44}
//               height={44}
//               className="object-contain transition-transform group-hover:scale-110"
//               priority
//             />
//             <span className="text-2xl font-semibold tracking-tight group-hover:text-slate-200">
//               Shortfy
//             </span>
//           </Link>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-6 text-sm sm:text-base">
//             <span className="text-slate-300">{username}</span>
//             {/* ... বাকি বাটন এবং লিঙ্কগুলো ... */}
//             <Link
//               href="/signin"
//               className="cursor-pointer px-4 py-2 rounded-md bg-white text-[#0A1A2F] font-medium"
//             >
//               Login
//             </Link>
//           </div>
          
//           {/* Mobile Hamburger */}
//           <button
//             onClick={() => setOpen(!open)}
//             className="md:hidden text-white cursor-pointer"
//           >
//             {open ? <X size={26} /> : <Menu size={26} />}
//           </button>
//         </div>
//         {/* ... Mobile Menu Content ... */}
//       </nav>
//     </>
//   )
// }





'use client'

import Link from 'next/link'
import Head from 'next/head'
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
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsAuthenticated(!!token)
  }, [])

  const isActive = (path) => pathname === path

  const handleProtectedClick = (href) => {
    if (username || isAuthenticated) {
      router.push(href)
    } else {
      router.push('/signin')
    }
    setOpen(false)
  }

  return (
    <>
      <Head>
        <title>
          {username
            ? `Dashboard | ${username} – Shortfy`
            : 'Shortfy – Professional URL Shortener'}
        </title>
        <meta
          name="description"
          content="Shortfy is a professional, fast, and secure URL shortener with analytics and custom links."
        />
      </Head>

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
            <span className="text-slate-300">{username}</span>

            {/* Protected links */}
            {['/my-urls', '/custom-urls', '/bulkshortner'].map((link) => (
              <button
                key={link}
                onClick={() => handleProtectedClick(link)}
                className={`cursor-pointer ${
                  isActive(link) ? 'font-medium underline' : 'hover:text-white'
                }`}
              >
                {link === '/my-urls'
                  ? 'My URLs'
                  : link === '/custom-urls'
                  ? 'Custom URLs'
                  : 'Bulk'}
              </button>
            ))}

            {/* Public links */}
            <Link
              href="/features"
              className={`cursor-pointer ${
                isActive('/features') ? 'font-medium underline' : 'hover:text-white'
              }`}
            >
              Features
            </Link>

            {/* ✅ Added Blog Link */}
            <Link
              href="/blog"
              className={`cursor-pointer ${
                isActive('/blog') ? 'font-medium underline' : 'hover:text-white'
              }`}
            >
              Blog
            </Link>

            <Link
              href="/shorturlcheck"
              className={`cursor-pointer ${
                isActive('/shorturlcheck') ? 'font-medium underline' : 'hover:text-white'
              }`}
            >
              Check URLs
            </Link>

            {username ? (
              <button
                onClick={logout}
                className="cursor-pointer text-red-400 hover:text-red-500"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/signin"
                className="cursor-pointer px-4 py-2 rounded-md bg-white text-[#0A1A2F] font-medium"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            aria-label="Open menu"
            onClick={() => setOpen(!open)}
            className="md:hidden text-white cursor-pointer"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden bg-[#0A1A2F] border-t border-slate-700 px-6 py-6 space-y-4 text-sm">
            <span className="block text-slate-400">{username}</span>

            {/* ✅ Updated array to include /blog */}
            {['/my-urls', '/custom-urls', '/bulkshortner', '/features', '/blog', '/shorturlcheck'].map((link) => {
              const label =
                link === '/my-urls'
                  ? 'My URLs'
                  : link === '/custom-urls'
                  ? 'Custom URLs'
                  : link === '/bulkshortner'
                  ? 'Bulk'
                  : link === '/features'
                  ? 'Features'
                  : link === '/blog'
                  ? 'Blog'
                  : 'Check URLs'
              
              const isProtected = ['/my-urls', '/custom-urls', '/bulkshortner'].includes(link)

              return (
                <button
                  key={link}
                  onClick={() => {
                    isProtected ? handleProtectedClick(link) : router.push(link);
                    setOpen(false); // Close menu on click
                  }}
                  className={`block cursor-pointer ${
                    isActive(link) ? 'font-medium underline text-white' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              )
            })}

            {username ? (
              <button
                onClick={() => {
                  logout()
                  setOpen(false)
                }}
                className="cursor-pointer text-red-400 hover:text-red-500"
              >
                Logout
              </button>
            ) : (
              <>
                <Link href="/signin" onClick={() => setOpen(false)} className="cursor-pointer block text-slate-300 hover:text-white">
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="cursor-pointer block px-4 py-2 rounded-md bg-white text-[#0A1A2F] font-medium"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  )
}
