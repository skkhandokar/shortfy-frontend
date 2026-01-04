


'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@mui/material'
import Link from 'next/link'
import URLCard from '../components/URLCard'


export default function MyURLs() {
  const [urls, setUrls] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [origin, setOrigin] = useState('')
  const urlsPerPage = 10

  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/signin')
      return
    }
const BASE_URL = 'https://shortfy.xyz';

    if (typeof window !== 'undefined') {
      setOrigin(BASE_URL)
    }

    fetch('https://skkhandokar22.pythonanywhere.com/api/my-urls/', {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setUrls(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [router])

  const indexOfLastUrl = currentPage * urlsPerPage
  const indexOfFirstUrl = indexOfLastUrl - urlsPerPage
  const currentUrls = urls.slice(indexOfFirstUrl, indexOfLastUrl)
  const totalPages = Math.ceil(urls.length / urlsPerPage)

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-indigo-700 mb-10 text-center">
        🚀 My Shortened Links
      </h2>

      <div className="bg-gradient-to-r from-emerald-400 via-teal-400 py-12 mb-10 text-center text-white rounded-2xl shadow-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">🎯 Your Shortened URLs</h1>
        <p className="text-lg md:text-xl text-indigo-100">Manage and track your shortened links in one place.</p>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 text-lg animate-pulse">Loading...</p>
      ) : urls.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No URLs found yet.{' '}
          <Link href="/" className="text-indigo-600 hover:text-indigo-800 font-semibold transition duration-300">
            Start Shortening!
          </Link>
        </p>
      ) : (
        <>
          <div className="grid gap-6">
            {currentUrls.map((url) => (
              <URLCard key={url.id} url={url} origin={origin}  setUrls={setUrls}/>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <Button
              variant="contained"
              color="primary"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  )
}





// export const metadata = {
//   title: 'My Shortened URLs – Shortfy',
//   description:
//     'Manage, track, and analyze your shortened links securely with Shortfy.',
// }

// import MyURLsClient from '../components/MyURLsClient'

// export default function MyURLsPage() {
//   return <MyURLsClient />
// }
