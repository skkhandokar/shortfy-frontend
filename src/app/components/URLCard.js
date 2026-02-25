
'use client'

import { useRef, useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Link as MuiLink,
  Avatar,
  Button,
  Modal,
} from '@mui/material'
import { QRCodeCanvas } from 'qrcode.react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ShareIcon from '@mui/icons-material/Share'
import QrCodeIcon from '@mui/icons-material/QrCode'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import DeleteIcon from '@mui/icons-material/Delete'
const BASE_URL = "https://skkhandokar22.pythonanywhere.com";

export default function URLCard({ url, origin, setUrls }) {
  const shortUrl = `${origin}/${url.short_code}`

  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  const qrRef = useRef(null)

  const getFavicon = (link) => {
    try {
      const domain = new URL(link).hostname
      return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`
    } catch {
      return '/default-favicon.png'
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Shortfy URL',
          text: 'Check out this short URL:',
          url: shortUrl,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // fallback if Web Share API is not supported
      navigator.clipboard.writeText(shortUrl)
      alert('URL copied to clipboard for sharing!')
    }
  }

  const handleDownload = () => {
    const canvas = qrRef.current?.querySelector('canvas')
    if (!canvas) return
    const image = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = image
    link.download = 'shortfy-qr-code.png'
    link.click()
  }

  const handleDelete = async () => {
    const token = localStorage.getItem('token')

    if (!token) {
      setDeleteError('⚠️ Login required')
      return
    }

    try {
      const res = await fetch(
        `${BASE_URL}/api/delete/${url.id}/`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )

      if (res.status === 204) {
        setUrls((prev) => prev.filter((item) => item.id !== url.id))
        setConfirmDelete(false)
      } else {
        setDeleteError('❌ Failed to delete URL')
      }
    } catch {
      setDeleteError('❌ Failed to delete URL')
    }
  }

  return (
    <>
      <Card className="bg-white border rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
        <CardContent className="flex flex-col sm:flex-row gap-6">
          {/* favicon */}
          <Avatar
            src={getFavicon(url.original_url)}
            variant="rounded"
            sx={{ width: 48, height: 48 }}
          />

          <div className="flex-1">
            {/* Short URL */}
            <Typography
              variant="subtitle2"
              className="text-gray-500 uppercase tracking-wider mb-1"
            >
              Short URL
            </Typography>

            <div className="flex flex-wrap items-center gap-2 mb-2">
              <MuiLink
                href={shortUrl}
                target="_blank"
                className="text-indigo-600 font-bold break-all"
              >
                {shortUrl}
              </MuiLink>

              <Button
                size="small"
                variant="outlined"
                startIcon={<ContentCopyIcon />}
                onClick={handleCopy}
              >
                Copy
              </Button>

              <Button
                size="small"
                variant="outlined"
                startIcon={<ShareIcon />}
                onClick={handleShare}
              >
                Share
              </Button>

              {copied && (
                <span className="text-green-600 text-sm font-medium">
                  Copied!
                </span>
              )}

              <Button
                size="small"
                variant="outlined"
                startIcon={<QrCodeIcon />}
                onClick={() => setOpen(true)}
              >
                QR
              </Button>

              <Button
                size="small"
                variant="outlined"
                color="secondary"
                startIcon={<AnalyticsIcon />}
                onClick={() =>
                  window.open(`/analytics/${url.short_code}`, '_blank')
                }
              >
                Analytics
              </Button>

              <Button
                size="small"
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => {
                  setConfirmDelete(true)
                  setDeleteError('')
                }}
              >
                Delete
              </Button>
            </div>

            {/* Inline Delete Confirmation */}
            {confirmDelete && (
              <div className="mt-2 p-3 rounded-lg bg-red-100 border border-red-300 animate-fadeIn">
                <p className="text-sm text-red-800 mb-2">
                  Are you sure you want to delete this URL?
                </p>

                <div className="flex gap-2">
                  <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={handleDelete}
                  >
                    Yes
                  </Button>

                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => setConfirmDelete(false)}
                  >
                    No
                  </Button>
                </div>
              </div>
            )}

            {deleteError && (
              <p className="text-sm text-red-600 mt-2">{deleteError}</p>
            )}

            {/* Original URL */}
            <Typography
              variant="subtitle2"
              className="text-gray-500 uppercase tracking-wider mt-4"
            >
              Original URL
            </Typography>
            <Typography variant="body2" className="text-gray-400 break-words">
              {url.original_url}
            </Typography>

            <Typography variant="body2" className="mt-3 text-sm text-gray-500">
              📊 Clicks:{' '}
              <span className="text-indigo-700 font-bold">
                {url.clicks}
              </span>
            </Typography>
          </div>
        </CardContent>
      </Card>

      {/* QR Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 shadow-xl w-80 text-center">
          <h2 className="text-xl font-bold mb-4 text-gray-700">
            QR Code
          </h2>

          <div ref={qrRef} className="flex justify-center">
            <QRCodeCanvas value={shortUrl} size={200} />
          </div>

          <p className="text-sm text-gray-500 mt-4 break-all">
            {shortUrl}
          </p>

          <div className="mt-4 flex justify-center gap-3">
            <Button
              onClick={handleDownload}
              variant="outlined"
              startIcon={<QrCodeIcon />}
            >
              Download
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



