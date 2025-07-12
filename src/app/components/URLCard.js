'use client'

import { useRef, useState } from 'react'
import { Card, CardContent, Typography, Link as MuiLink, Avatar, Button, Modal } from '@mui/material'
import { QRCodeCanvas } from 'qrcode.react'

export default function URLCard({ url, origin, setUrls }) {
  const shortUrl = `${origin}/${url.short_code}`
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const qrRef = useRef(null)

  const getFavicon = (url) => {
    try {
      const domain = new URL(url).hostname
      return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`
    } catch {
      return '/default-favicon.png'
    }
  }

  const handleDownload = () => {
    const canvas = qrRef.current?.querySelector('canvas')
    if (canvas) {
      const image = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = image
      link.download = 'shortfy-qr-code.png'
      link.click()
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token')
    if (!token) return

    if (!confirm('Are you sure you want to delete this URL?')) return

    try {
      const res = await fetch(`https://www.shortfy.xyz/api/delete/${id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${token}`,
        },
      })

      if (res.status === 204) {
        setUrls(prev => prev.filter(item => item.id !== id))
      } else {
        alert('Failed to delete URL')
      }
    } catch (err) {
      console.error('Delete error:', err)
    }
  }

  return (
    <>
      <Card className="bg-white border rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
        <CardContent className="flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="flex-shrink-0">
            <Avatar
              src={getFavicon(url.original_url)}
              alt="Site Icon"
              sx={{ width: 48, height: 48 }}
              variant="rounded"
            />
          </div>

          <div className="flex-1">
            <Typography variant="subtitle2" className="text-gray-500 uppercase tracking-wider mb-1">
              Short URL
            </Typography>
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <MuiLink
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 font-bold text-lg break-all"
              >
                {shortUrl}
              </MuiLink>
              <Button size="small" variant="outlined" onClick={handleCopy}>
                Copy
              </Button>
              {copied && <span className="text-green-600 text-sm font-medium">Copied!</span>}
              <Button size="small" variant="outlined" onClick={() => setOpen(true)}>
                QR
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="secondary"
                onClick={() => window.open(`/analytics/${url.short_code}`, '_blank')}
              >
                Show Analytics
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={() => handleDelete(url.id)}
              >
                Delete
              </Button>
            </div>

            <Typography variant="subtitle2" className="text-gray-500 uppercase tracking-wider mb-1">
              Original URL
            </Typography>
            <Typography variant="body2" className="text-gray-400 break-words text-sm">
              {url.original_url}
            </Typography>

            <Typography variant="body2" className="mt-4 text-sm text-gray-500">
              📊 Clicks: <span className="text-indigo-700 font-bold">{url.clicks}</span>
            </Typography>
          </div>
        </CardContent>
      </Card>

      {/* QR Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 shadow-xl text-center w-80">
          <h2 className="text-xl font-bold mb-4 text-gray-700">QR Code for your link</h2>
          <div ref={qrRef} className="flex justify-center">
            <QRCodeCanvas value={shortUrl} size={200} />
          </div>
          <p className="text-sm text-gray-500 mt-4 break-all">{shortUrl}</p>
          <div className="mt-4 flex justify-center gap-4">
            <Button onClick={handleDownload} variant="outlined" color="primary">
              Download QR
            </Button>
            <Button onClick={() => setOpen(false)} variant="contained">
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
