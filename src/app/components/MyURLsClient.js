'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@mui/material'
import URLCard from './URLCard'
const BASE_URL = "https://skkhandokar22.pythonanywhere.com";

export default function MyURLsClient() {
  const [urls, setUrls] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const urlsPerPage = 10
  const router = useRouter()
  const origin = 'https://shortfy.xyz'

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/signin')
      return
    }

    fetch(`${BASE_URL}/api/my-urls/`, {
      headers: { Authorization: `Token ${token}` },
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

  const handlePrevPage = () => setCurrentPage(p => Math.max(p - 1, 1))
  const handleNextPage = () => setCurrentPage(p => Math.min(p + 1, totalPages))

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-indigo-700 mb-10 text-center">
        🚀 My Shortened Links
      </h2>

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
            {currentUrls.map(url => (
              <URLCard key={url.id} url={url} origin={origin} setUrls={setUrls} />
            ))}
          </div>
          <div className="flex justify-center items-center mt-8 space-x-4">
            <Button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</Button>
            <span>Page {currentPage} of {totalPages}</span>
            <Button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</Button>
          </div>
        </>
      )}
    </div>
  )
}


