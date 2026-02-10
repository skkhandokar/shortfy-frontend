
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material'
import Link from 'next/link'
import URLCard from '../components/URLCard'
import BASE_URL from '@/config/api'
export default function MyURLs() {
  const [urls, setUrls] = useState([])
  const [filteredUrls, setFilteredUrls] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [origin, setOrigin] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterOption, setFilterOption] = useState('all')
  const urlsPerPage = 10

  const router = useRouter()
  const BASE_URLL = 'https://shortfy.xyz'

  // Fetch URLs
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/signin')
      return
    }

    if (typeof window !== 'undefined') setOrigin(BASE_URLL)

    fetch(`${BASE_URL}/api/my-urls/`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setUrls(data)
        setFilteredUrls(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [router])


   const LoadingSkeleton = () => (
  <div className="flex flex-col items-center justify-center p-12 w-full animate-fade-in">
    {/* সেন্ট্রাল অ্যানিমেটেড লোগো */}
    <div className="relative flex items-center justify-center mb-8">
      <div className="absolute animate-ping h-20 w-20 rounded-full bg-emerald-400 opacity-20"></div>
      <div className="relative bg-white p-4 rounded-2xl shadow-xl border border-emerald-100">
        <div className="animate-spin h-10 w-10 border-4 border-emerald-500 border-t-transparent rounded-full" />
      </div>
    </div>

    {/* টেক্সট অ্যানিমেশন */}
    <div className="text-center space-y-2">
      <h3 className="text-xl font-semibold text-gray-800 animate-pulse">
        Syncing Your Dashboard...
      </h3>
      <p className="text-gray-500 text-sm max-w-xs mx-auto">
        Fetching your short links and real-time performance data.
      </p>
    </div>

    {/* প্রগ্রেস বার */}
    <div className="mt-8 w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
      <div className="h-full bg-emerald-500 origin-left" 
           style={{ width: '100%', animation: 'shimmer 1.5s infinite linear' }}>
      </div>
    </div>

    <style jsx>{`
      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      .animate-fade-in {
        animation: fadeIn 0.5s ease-in;
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `}</style>
  </div>
);
  // Search + Filter
  useEffect(() => {
    let temp = [...urls]

    if (searchTerm) {
      temp = temp.filter(url =>
        url.original_url.toLowerCase().includes(searchTerm.toLowerCase()) ||
        url.short_code.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterOption === 'highClicks') {
      temp = temp.sort((a, b) => b.clicks - a.clicks)
    } else if (filterOption === 'lowClicks') {
      temp = temp.sort((a, b) => a.clicks - b.clicks)
    }

    setFilteredUrls(temp)
    setCurrentPage(1)
  }, [searchTerm, filterOption, urls])

  const indexOfLastUrl = currentPage * urlsPerPage
  const indexOfFirstUrl = indexOfLastUrl - urlsPerPage
  const currentUrls = filteredUrls.slice(indexOfFirstUrl, indexOfLastUrl)
  const totalPages = Math.ceil(filteredUrls.length / urlsPerPage)

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))

  return (
    <div className="max-w-5xl mx-auto pt-28 px-4 md:px-6 bg-white">
      {/* HEADER */}
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">
        My Shortened Links
      </h1>

      <div className="bg-slate-900 text-white rounded-xl p-8 mb-10 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">
          Manage Your Short URLs
        </h2>
        <p className="text-slate-300">
          Track, share & manage your short links professionally
        </p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
        <TextField
          label="Search URL or Shortcode"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          className="flex-1"
        />
        <FormControl size="small" className="w-48">
          <InputLabel>Filter</InputLabel>
          <Select
            value={filterOption}
            label="Filter"
            onChange={(e) => setFilterOption(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="highClicks">High Clicks</MenuItem>
            <MenuItem value="lowClicks">Low Clicks</MenuItem>
          </Select>
        </FormControl>
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : filteredUrls.length === 0 ? (
        <div className="text-center py-20 animate-fade-in">
          <p className="text-gray-500 text-lg mb-4 font-medium">No URLs found yet.</p>
          <Link href="/" className="inline-flex items-center px-8 py-3 bg-black text-white font-bold rounded-2xl hover:bg-emerald-400 transition-all shadow-lg hover:shadow-emerald-200 active:scale-95">
            Start Shortening!
          </Link>
        </div>
      ): (
        <>
          <div className="grid gap-6">
            {currentUrls.map((url) => (
              <URLCard key={url.id} url={url} origin={origin} setUrls={setUrls}/>
            ))}
          </div>

          {/* Swipeable / Mobile-Friendly Pagination */}
          {totalPages > 1 && (
            <div className="overflow-x-auto mt-8">
              <div className="flex gap-2 min-w-max px-2">
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  Prev
                </Button>

                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1
                  return (
                    <Button
                      key={page}
                      size="small"
                      variant={currentPage === page ? 'contained' : 'outlined'}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  )
                })}

                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

