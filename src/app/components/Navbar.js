'use client'

import Link from 'next/link'
import Head from 'next/head'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { username, logout } = useAuth()

  return (
    <>
      <Head>
        <title>{username ? `Welcome, ${username} | Shortfy` : 'Shortfy ✨ - Shorten your links'}</title>
        <meta name="description" content="A smart URL shortener for everyone." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-orange-300 text-white p-4 shadow-lg backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          <Link href="/" className="text-2xl font-extrabold tracking-wide hover:text-white transition-all duration-300">
            Shortfy ✨
          </Link>

          <div className="space-x-6 text-sm sm:text-base flex items-center">
            {username ? (
              <>
                <span className="font-semibold hidden sm:inline">👋 Hello, {username}</span>
                <Link href="/my-urls" className="hover:underline hover:text-orange-100 transition-all">
                  My URLs
                </Link>
                <Link href="/custom-urls" className="hover:underline hover:text-orange-100 transition-all">
                  Custom URLs
                </Link>
                <Link href="/shorturlcheck" className="hover:underline hover:text-orange-100 transition-all">
                  Check Short URLs
                </Link>
                <button
                  onClick={logout}
                  className="hover:underline text-red-100 hover:text-red-300 transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/signin" className="hover:underline hover:text-orange-100 transition-all">
                  Login
                </Link>
                <Link href="/signup" className="hover:underline hover:text-orange-100 transition-all">
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}
