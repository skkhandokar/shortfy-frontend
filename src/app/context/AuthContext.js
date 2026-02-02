'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [username, setUsername] = useState(null)
  const [loading, setLoading] = useState(true) // ডাটা লোড হওয়া পর্যন্ত ট্র্যাক করবে

  useEffect(() => {
    // পেজ রিফ্রেশ করলে লোকাল স্টোরেজ থেকে ডাটা রিকভার করা
    const storedUsername = localStorage.getItem('username')
    const token = localStorage.getItem('token')
    
    if (storedUsername && token) {
      setUsername(storedUsername)
    }
    setLoading(false)
  }, [])

  // লগইন ফাংশন: এটি ম্যানুয়াল এবং সোশ্যাল দুই ক্ষেত্রেই কাজ করবে
  const login = (userData, token) => {
    setUsername(userData)
    localStorage.setItem('username', userData)
    localStorage.setItem('token', token)
  }

  const logout = () => {
    setUsername(null)
    localStorage.removeItem('username')
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ username, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)