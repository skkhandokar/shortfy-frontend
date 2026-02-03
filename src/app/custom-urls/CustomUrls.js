



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
import Link from 'next/link'
import { QRCodeCanvas } from 'qrcode.react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import QrCodeIcon from '@mui/icons-material/QrCode'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import DeleteIcon from '@mui/icons-material/Delete'

export default function CustomUrls() {
  const [urls, setUrls] = useState([])
  const [filteredUrls, setFilteredUrls] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [mounted, setMounted] = useState(false)
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
  const origin = "https://shortfy.xyz"

  useEffect(() => {
    setMounted(true)
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    
    if (!token) {
      router.push('/signin')
      return
    }

    fetch('https://skkhandokar22.pythonanywhere.com/api/custom-urls/', {
      headers: { Authorization: `Token ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        const urlData = Array.isArray(data) ? data : []
        setUrls(urlData)
        setFilteredUrls(urlData)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [router])

  useEffect(() => {
    if (!mounted) return
    let temp = [...urls]
    if (searchTerm) {
      temp = temp.filter(url =>
        (url.original_url?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (url.custom_shortcodes?.some(code => code.toLowerCase().includes(searchTerm.toLowerCase())))
      )
    }
    if (filterOption === 'highClicks') temp.sort((a, b) => b.clicks - a.clicks)
    else if (filterOption === 'lowClicks') temp.sort((a, b) => a.clicks - b.clicks)

    setFilteredUrls(temp)
    setCurrentPage(1)
  }, [searchTerm, filterOption, urls, mounted])

  // --- সুন্দর স্কেলিটন লোডার ---
  const LoadingSkeleton = () => (
    <div className="flex flex-col items-center justify-center p-12 w-full animate-fade-in">
      <div className="relative flex items-center justify-center mb-8">
        <div className="absolute animate-ping h-20 w-20 rounded-full bg-emerald-400 opacity-20"></div>
        <div className="relative bg-white p-4 rounded-2xl shadow-xl border border-emerald-100">
          <div className="animate-spin h-10 w-10 border-4 border-emerald-500 border-t-transparent rounded-full" />
        </div>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-gray-800 animate-pulse">Syncing Your Dashboard...</h3>
        <p className="text-gray-500 text-sm max-w-xs mx-auto">Fetching your custom links and real-time performance data.</p>
      </div>
      <div className="mt-8 w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-emerald-500 origin-left shimmer-animation"></div>
      </div>
      <style jsx>{`
        .shimmer-animation { width: 100%; animation: shimmer 1.5s infinite linear; }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .animate-fade-in { animation: fadeIn 0.5s ease-in; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  )

  const getFavicon = (url) => {
    try {
      const domain = new URL(url).hostname
      return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`
    } catch { return '/default-favicon.png' }
  }

  const handleDeleteShortcode = async () => {
    const token = localStorage.getItem('token')
    if (!token || !confirmDelete) return
    const { id, code } = confirmDelete
    try {
      const res = await fetch(`https://skkhandokar22.pythonanywhere.com/api/custom-delete-shortcode/${id}/${code}/`,
        { method: 'DELETE', headers: { Authorization: `Token ${token}` } }
      )
      if (res.status === 200 || res.status === 204) {
        setUrls(prev => prev.map(url => url.id === id ? { ...url, custom_shortcodes: url.custom_shortcodes.filter(c => c !== code) } : url).filter(url => url.custom_shortcodes.length > 0))
        setConfirmDelete(null)
      } else { setDeleteError('Failed to delete') }
    } catch { setDeleteError('Network error') }
  }

  if (!mounted) return null

  const indexOfLastUrl = currentPage * urlsPerPage
  const indexOfFirstUrl = indexOfLastUrl - urlsPerPage
  const currentUrls = filteredUrls.slice(indexOfFirstUrl, indexOfLastUrl)
  const totalPages = Math.ceil(filteredUrls.length / urlsPerPage)

  return (
    <div className="max-w-5xl mx-auto pt-28 pb-20 px-4 md:px-6 bg-white min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">My Shortened Links</h1>

      <div className="bg-slate-900 text-white rounded-xl p-8 mb-10 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">Manage Your Custom URLs</h2>
        <p className="text-slate-300">Track, share & manage your short links professionally</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
        <TextField label="Search URL or Shortcode" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} size="small" className="flex-1" />
        <FormControl size="small" className="w-48">
          <InputLabel>Filter</InputLabel>
          <Select value={filterOption} label="Filter" onChange={(e) => setFilterOption(e.target.value)}>
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
          <Link href="/" className="inline-flex items-center px-8 py-3 bg-black text-white font-bold rounded-2xl hover:bg-blue-400 transition-all shadow-lg hover:shadow-blue-200 active:scale-95">
            Start Shortening!
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {currentUrls.map(url => (
            <Card key={url.id} className="border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition">
              <CardContent className="flex flex-col sm:flex-row gap-6">
                <Avatar src={getFavicon(url.original_url)} variant="rounded" sx={{ width: 44, height: 44 }} />
                <div className="flex-1">
                  <Typography className="text-xs text-slate-500 uppercase mb-2 font-bold tracking-wider">Short URLs</Typography>
                  {url.custom_shortcodes.map(code => {
                    const shortUrl = `${origin}/${code}`
                    const isConfirming = confirmDelete?.id === url.id && confirmDelete?.code === code
                    return (
                      <div key={code} className="mb-4 border-b border-gray-50 pb-4 last:border-0">
                        <div className="flex flex-wrap gap-2 items-center">
                          <MuiLink href={shortUrl} target="_blank" className="text-indigo-700 font-bold break-all hover:text-indigo-900">{shortUrl}</MuiLink>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Button size="small" variant="outlined" startIcon={<ContentCopyIcon />} onClick={() => { navigator.clipboard.writeText(shortUrl); setCopiedCode(code); setTimeout(() => setCopiedCode(''), 2000); }}>Copy</Button>
                            <Button size="small" variant="outlined" startIcon={<QrCodeIcon />} onClick={() => { setQrUrl(shortUrl); setOpenQrModal(true); }}>QR</Button>
                            <Button size="small" variant="outlined" startIcon={<AnalyticsIcon />} onClick={() => window.open(`/analytics/${code}`, '_blank')}>Analytics</Button>
                            <Button size="small" variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => setConfirmDelete({ id: url.id, code })}>Delete</Button>
                          </div>
                        </div>
                        {copiedCode === code && <p className="text-xs text-green-600 mt-1 font-bold animate-pulse">✔ Copied to clipboard</p>}
                        {isConfirming && (
                          <div className="mt-3 bg-red-50 p-4 rounded-xl border border-red-100 animate-in fade-in zoom-in duration-200">
                            <p className="text-sm text-red-700 mb-3 font-semibold">Are you sure you want to delete this link?</p>
                            <div className="flex gap-2">
                              <Button size="small" color="error" variant="contained" onClick={handleDeleteShortcode} sx={{ borderRadius: '10px' }}>Yes, Delete</Button>
                              <Button size="small" variant="outlined" onClick={() => setConfirmDelete(null)} sx={{ borderRadius: '10px' }}>Cancel</Button>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                  <p className="text-xs text-slate-500 mt-2 font-bold uppercase tracking-tighter">Original URL</p>
                  <p className="text-sm text-slate-700 break-words font-medium opacity-80">{url.original_url}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="px-3 py-1 bg-slate-100 rounded-full">
                      <p className="text-xs font-bold text-slate-900">Clicks: {url.clicks}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12">
          <Button variant="outlined" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} sx={{ borderRadius: '12px' }}>Prev</Button>
          <Typography className="font-bold text-slate-600">Page {currentPage} / {totalPages}</Typography>
          <Button variant="outlined" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} sx={{ borderRadius: '12px' }}>Next</Button>
        </div>
      )}

      {/* QR Modal */}
      <Modal open={openQrModal} onClose={() => setOpenQrModal(false)}>
        <div className="bg-white rounded-[32px] p-8 w-80 shadow-2xl mx-auto mt-32 text-center outline-none border border-slate-100">
          <h2 className="text-xl font-black text-slate-900 mb-6">Link QR Code</h2>
          <div ref={qrRef} className="flex justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <QRCodeCanvas value={qrUrl} size={200} />
          </div>
          <p className="text-[10px] text-slate-400 mt-4 break-all px-2">{qrUrl}</p>
          <div className="flex flex-col gap-3 mt-8">
            <Button variant="contained" fullWidth onClick={() => {
              const canvas = qrRef.current?.querySelector('canvas');
              const link = document.createElement('a');
              link.href = canvas.toDataURL();
              link.download = 'shortfy-qr.png';
              link.click();
            }} sx={{ borderRadius: '14px', py: 1.5, bgcolor: '#0f172a', fontWeight: 'bold' }}>Download PNG</Button>
            <Button variant="text" fullWidth onClick={() => setOpenQrModal(false)} sx={{ color: '#64748b', fontWeight: 'bold' }}>Close</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}