'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  Typography,
  Link as MuiLink,
  Avatar,
  Button,
  Modal,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material'
import { QRCodeCanvas } from 'qrcode.react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ShareIcon from '@mui/icons-material/Share'
import QrCodeIcon from '@mui/icons-material/QrCode'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import DeleteIcon from '@mui/icons-material/Delete'

export default function CustomUrls() {
  const [urls, setUrls] = useState([])
  const [filteredUrls, setFilteredUrls] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [origin, setOrigin] = useState('')
  const [qrUrl, setQrUrl] = useState('')
  const [openQrModal, setOpenQrModal] = useState(false)
  const [copiedCode, setCopiedCode] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [deleteError, setDeleteError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterOption, setFilterOption] = useState('all')

  const qrRef = useRef(null)
  const router = useRouter()
  const urlsPerPage = 10

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/signin')
      return
    }

    setOrigin('https://shortfy.xyz')

    fetch('https://skkhandokar22.pythonanywhere.com/api/custom-urls/', {
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

  const getFavicon = (url) => {
    try {
      const domain = new URL(url).hostname
      return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`
    } catch {
      return '/default-favicon.png'
    }
  }


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
        Fetching your custom links and real-time performance data.
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


  // SEARCH + FILTER
  useEffect(() => {
    let temp = [...urls]

    if (searchTerm) {
      temp = temp.filter(url =>
        url.original_url.toLowerCase().includes(searchTerm.toLowerCase()) ||
        url.custom_shortcodes.some(code =>
          code.toLowerCase().includes(searchTerm.toLowerCase())
        )
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

  const handleDeleteShortcode = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setDeleteError('Login required')
      return
    }

    const { id, code } = confirmDelete

    try {
      const res = await fetch(
        `https://skkhandokar22.pythonanywhere.com/api/custom-delete-shortcode/${id}/${code}/`,
        { method: 'DELETE', headers: { Authorization: `Token ${token}` } }
      )

      if (res.status === 200) {
        setUrls(prev =>
          prev.map(url =>
            url.id === id
              ? { ...url, custom_shortcodes: url.custom_shortcodes.filter(c => c !== code) }
              : url
          )
        )
        setConfirmDelete(null)
      } else if (res.status === 204) {
        setUrls(prev => prev.filter(url => url.id !== id))
        setConfirmDelete(null)
      } else {
        setDeleteError('Failed to delete')
      }
    } catch {
      setDeleteError('Failed to delete')
    }
  }

  const downloadQrCode = () => {
    const canvas = qrRef.current?.querySelector('canvas')
    if (!canvas) return
    const image = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = image
    link.download = 'shortfy-qr-code.png'
    link.click()
  }

  const handleShare = (shortUrl) => {
    if (navigator.share) {
      navigator.share({
        title: 'Shortfy URL',
        text: 'Check this short URL',
        url: shortUrl,
      })
    } else {
      navigator.clipboard.writeText(shortUrl)
      alert('Link copied for sharing')
    }
  }

  return (
    <div className="max-w-5xl mx-auto pt-28 px-4 md:px-6 bg-white">
      {/* HEADER */}
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">
        My Shortened Links
      </h1>

      <div className="bg-slate-900 text-white rounded-xl p-8 mb-10 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">
          Manage Your Custom URLs
        </h2>
        <p className="text-slate-300">
          Track, share & manage your short links professionally
        </p>
      </div>

      {/* SEARCH + FILTER */}
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
): filteredUrls.length === 0 ? (
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
              <Card
                key={url.id}
                className="border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <CardContent className="flex flex-col sm:flex-row gap-6">
                  <Avatar
                    src={getFavicon(url.original_url)}
                    variant="rounded"
                    sx={{ width: 44, height: 44 }}
                  />

                  <div className="flex-1">
                    <Typography className="text-xs text-slate-500 uppercase mb-2">
                      Short URLs
                    </Typography>

                    {url.custom_shortcodes.map(code => {
                      const shortUrl = `${origin}/${code}`
                      const isConfirming =
                        confirmDelete?.id === url.id &&
                        confirmDelete?.code === code

                      return (
                        <div key={code} className="mb-4">
                          <div className="flex flex-wrap gap-2 items-center">
                            <MuiLink
                              href={shortUrl}
                              target="_blank"
                              className="text-indigo-700 font-medium break-all"
                            >
                              {shortUrl}
                            </MuiLink>

                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={<ContentCopyIcon />}
                              onClick={() => {
                                navigator.clipboard.writeText(shortUrl)
                                setCopiedCode(code)
                                setTimeout(() => setCopiedCode(''), 2000)
                              }}
                            >
                              Copy
                            </Button>

                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={<ShareIcon />}
                              onClick={() => handleShare(shortUrl)}
                            >
                              Share
                            </Button>

                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={<QrCodeIcon />}
                              onClick={() => {
                                setQrUrl(shortUrl)
                                setOpenQrModal(true)
                              }}
                            >
                              QR Code
                            </Button>

                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={<AnalyticsIcon />}
                              onClick={() =>
                                window.open(`/analytics/${code}`, '_blank')
                              }
                            >
                              Analytics
                            </Button>

                            <Button
                              size="small"
                              variant="outlined"
                              color="error"
                              startIcon={<DeleteIcon />}
                              onClick={() =>
                                setConfirmDelete({ id: url.id, code })
                              }
                            >
                              Delete
                            </Button>
                          </div>

                          {copiedCode === code && (
                            <p className="text-xs text-green-600 mt-1">
                              ✔ Copied to clipboard
                            </p>
                          )}

                          {isConfirming && (
                            <div className="mt-2 bg-slate-100 border border-slate-300 p-3 rounded-lg">
                              <p className="text-sm text-slate-700 mb-2">
                                Are you sure you want to delete this link?
                              </p>
                              <div className="flex gap-2">
                                <Button
                                  size="small"
                                  color="error"
                                  variant="contained"
                                  onClick={handleDeleteShortcode}
                                >
                                  Yes, Delete
                                </Button>
                                <Button
                                  size="small"
                                  variant="outlined"
                                  onClick={() => setConfirmDelete(null)}
                                >
                                  Cancel
                                </Button>
                              </div>
                              {deleteError && (
                                <p className="text-xs text-red-600 mt-2">
                                  {deleteError}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      )
                    })}

                    <p className="text-xs text-slate-500 mt-4">Original URL</p>
                    <p className="text-sm text-slate-700 break-words">
                      {url.original_url}
                    </p>

                    <p className="text-sm mt-2 text-slate-600">
                      Clicks:{' '}
                      <span className="font-semibold text-slate-900">
                        {url.clicks}
                      </span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Swipeable Pagination */}
          {totalPages > 1 && (
            <div className="overflow-x-auto mt-8">
              <div className="flex gap-2 min-w-max px-2">
                <Button
                  variant="outlined"
                  size="small"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
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
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {/* QR MODAL */}
      <Modal open={openQrModal} onClose={() => setOpenQrModal(false)}>
        <div className="bg-white rounded-xl p-6 w-80 shadow-xl mx-auto mt-40 text-center">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            QR Code
          </h2>
          <div ref={qrRef} className="flex justify-center">
            <QRCodeCanvas value={qrUrl} size={180} />
          </div>
          <p className="text-xs text-slate-500 mt-3 break-all">
            {qrUrl}
          </p>
          <div className="flex justify-center gap-3 mt-4">
            <Button variant="outlined" onClick={downloadQrCode}>
              Download
            </Button>
            <Button variant="contained" onClick={() => setOpenQrModal(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
