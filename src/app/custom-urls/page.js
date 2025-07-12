// 'use client'

// import { useEffect, useState, useRef } from 'react'
// import { useRouter } from 'next/navigation'
// import { Card, CardContent, Typography, Link as MuiLink, Avatar, Button, Modal } from '@mui/material'
// import Link from 'next/link'
// import { QRCodeCanvas } from 'qrcode.react'

// export default function MyURLs() {
//   const [urls, setUrls] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [currentPage, setCurrentPage] = useState(1)
//   const [origin, setOrigin] = useState('')
//   const [qrUrl, setQrUrl] = useState('')
//   const [openQrModal, setOpenQrModal] = useState(false)
//   const qrRef = useRef(null)

//   const urlsPerPage = 10
//   const router = useRouter()

//   useEffect(() => {
//     const token = localStorage.getItem('token')
//     if (!token) {
//       router.push('/signin')
//       return
//     }

//     if (typeof window !== 'undefined') {
//       setOrigin(window.location.origin)
//     }

//     fetch('http://127.0.0.1:8000/api/custom-urls/', {
//       headers: {
//         Authorization: `Token ${token}`,
//       },
//     })
//       .then(res => res.json())
//       .then(data => {
//         setUrls(data)
//         setLoading(false)
//       })
//       .catch(err => {
//         console.error(err)
//         setLoading(false)
//       })
//   }, [router])

//   const getFavicon = (url) => {
//     try {
//       const domain = new URL(url).hostname
//       return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`
//     } catch {
//       return '/default-favicon.png'
//     }
//   }

//   const indexOfLastUrl = currentPage * urlsPerPage
//   const indexOfFirstUrl = indexOfLastUrl - urlsPerPage
//   const currentUrls = urls.slice(indexOfFirstUrl, indexOfLastUrl)
//   const totalPages = Math.ceil(urls.length / urlsPerPage)

//   const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1))
//   const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages))

//   const handleOpenQrModal = (url) => {
//     setQrUrl(url)
//     setOpenQrModal(true)
//   }

//   const handleCloseQrModal = () => {
//     setOpenQrModal(false)
//   }

//   const downloadQrCode = () => {
//     const canvas = qrRef.current?.querySelector('canvas')
//     if (canvas) {
//       const image = canvas.toDataURL('image/png')
//       const link = document.createElement('a')
//       link.href = image
//       link.download = 'shortfy-qr-code.png'
//       link.click()
//     }
//   }

//   const handleDeleteShortcode = async (id, shortcode) => {
//     const token = localStorage.getItem('token')
//     if (!token) {
//       alert('You must be logged in to delete a shortcode.')
//       return
//     }

//     if (!confirm(`Are you sure you want to delete shortcode "${shortcode}"?`)) return

//     try {
//       const res = await fetch(`http://127.0.0.1:8000/api/custom-delete-shortcode/${id}/${shortcode}/`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: `Token ${token}`,
//         },
//       })

//       if (res.status === 200) {
//         setUrls((prev) =>
//           prev.map((url) => {
//             if (url.id === id) {
//               return {
//                 ...url,
//                 custom_shortcodes: url.custom_shortcodes.filter((c) => c !== shortcode),
//               }
//             }
//             return url
//           })
//         )
//       } else if (res.status === 204) {
//         setUrls((prev) => prev.filter((url) => url.id !== id))
//       } else {
//         const data = await res.json()
//         alert(data.error || 'Failed to delete shortcode')
//       }
//     } catch (err) {
//       console.error('Delete shortcode error:', err)
//       alert('An error occurred while deleting shortcode')
//     }
//   }

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <h2 className="text-4xl font-bold text-indigo-700 mb-10 text-center">
//         🚀 My Shortened Links
//       </h2>

//       <div className="bg-gradient-to-r from-emerald-400 via-teal-400 py-12 mb-10 text-center text-white rounded-2xl shadow-lg">
//         <h1 className="text-4xl md:text-5xl font-extrabold mb-4">🎯 Your Custom Short URLs</h1>
//         <p className="text-lg md:text-xl text-indigo-100">Manage and track your custom shortened links in one place.</p>
//       </div>

//       {loading ? (
//         <p className="text-center text-gray-500 text-lg animate-pulse">Loading...</p>
//       ) : urls.length === 0 ? (
//         <p className="text-center text-gray-500 text-lg">
//           No URLs found yet.{' '}
//           <Link href="/" className="text-indigo-600 hover:text-indigo-800 font-semibold transition duration-300">
//             Start shortening!
//           </Link>
//         </p>
//       ) : (
//         <>
//           <div className="grid gap-6">
//             {currentUrls.map((url) => (
//               <Card
//                 key={url.id}
//                 className="bg-white border rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
//               >
//                 <CardContent className="flex flex-col sm:flex-row sm:items-center gap-6">
//                   <div className="flex-shrink-0">
//                     <Avatar
//                       src={getFavicon(url.original_url)}
//                       alt="Site Icon"
//                       sx={{ width: 48, height: 48 }}
//                       variant="rounded"
//                     />
//                   </div>

//                   <div className="flex-1">
//                     <Typography variant="subtitle2" className="text-gray-500 uppercase tracking-wider mb-1">
//                       Short URLs
//                     </Typography>

//                     <div className="flex flex-col gap-2 mb-3">
//                       {url.custom_shortcodes?.length > 0 ? (
//                         url.custom_shortcodes.map((code) => {
//                           const shortUrl = `${origin}/${code}`
//                           return (
//                             <div key={code} className="flex items-center gap-2 flex-wrap">
//                               <MuiLink
//                                 href={shortUrl}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="text-indigo-600 hover:text-indigo-800 font-bold text-lg break-all"
//                               >
//                                 {shortUrl}
//                               </MuiLink>
//                               <Button size="small" variant="outlined" onClick={() => navigator.clipboard.writeText(shortUrl)}>
//                                 Copy
//                               </Button>
//                               <Button size="small" variant="outlined" onClick={() => handleOpenQrModal(shortUrl)}>
//                                 QR
//                               </Button>
//                               <Button
//                                 size="small"
//                                 variant="outlined"
//                                 color="secondary"
//                                 onClick={() => window.open(`/analytics/${code}`, '_blank')}
//                               >
//                                 Show Analytics
//                               </Button>
//                               <Button
//                                 size="small"
//                                 variant="outlined"
//                                 color="error"
//                                 onClick={() => handleDeleteShortcode(url.id, code)}
//                               >
//                                 Delete
//                               </Button>
//                             </div>
//                           )
//                         })
//                       ) : (
//                         <Typography variant="body2" className="text-gray-500 italic">
//                           No shortcodes available
//                         </Typography>
//                       )}
//                     </div>

//                     <Typography variant="subtitle2" className="text-gray-500 uppercase tracking-wider mb-1">
//                       Original URL
//                     </Typography>
//                     <Typography variant="body2" className="text-gray-400 break-words text-sm">
//                       {url.original_url}
//                     </Typography>

//                     <Typography variant="body2" className="mt-4 text-sm text-gray-500">
//                       📊 Clicks: <span className="text-indigo-700 font-bold">{url.clicks}</span>
//                     </Typography>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           {/* Pagination */}
//           <div className="flex justify-center items-center mt-8 space-x-4">
//             <Button variant="contained" color="primary" onClick={handlePrevPage} disabled={currentPage === 1}>
//               Previous
//             </Button>
//             <span className="text-gray-700">
//               Page {currentPage} of {totalPages}
//             </span>
//             <Button variant="contained" color="primary" onClick={handleNextPage} disabled={currentPage === totalPages}>
//               Next
//             </Button>
//           </div>
//         </>
//       )}

//       {/* QR Code Modal */}
//       <Modal open={openQrModal} onClose={handleCloseQrModal}>
//         <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 shadow-xl text-center w-80">
//           <h2 className="text-xl font-bold mb-4 text-gray-700">QR Code for your link</h2>
//           <div ref={qrRef} className="flex justify-center">
//             <QRCodeCanvas value={qrUrl} size={200} />
//           </div>
//           <p className="text-sm text-gray-500 mt-4 break-all">{qrUrl}</p>
//           <div className="mt-4 flex justify-center gap-4">
//             <Button onClick={downloadQrCode} variant="outlined" color="primary">
//               Download QR
//             </Button>
//             <Button onClick={handleCloseQrModal} variant="contained">
//               Close
//             </Button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   )
// }








'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, Typography, Link as MuiLink, Avatar, Button, Modal } from '@mui/material'
import Link from 'next/link'
import { QRCodeCanvas } from 'qrcode.react'

export default function MyURLs() {
  const [urls, setUrls] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [origin, setOrigin] = useState('')
  const [qrUrl, setQrUrl] = useState('')
  const [openQrModal, setOpenQrModal] = useState(false)
  const [copiedCode, setCopiedCode] = useState('')
  const qrRef = useRef(null)

  const urlsPerPage = 10
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/signin')
      return
    }

    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin)
    }

    fetch('https://skkhandokar22.pythonanywhere.com/api/custom-urls/', { 
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

  const getFavicon = (url) => {
    try {
      const domain = new URL(url).hostname
      return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`
    } catch {
      return '/default-favicon.png'
    }
  }

  const indexOfLastUrl = currentPage * urlsPerPage
  const indexOfFirstUrl = indexOfLastUrl - urlsPerPage
  const currentUrls = urls.slice(indexOfFirstUrl, indexOfLastUrl)
  const totalPages = Math.ceil(urls.length / urlsPerPage)

  const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1))
  const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages))

  const handleOpenQrModal = (url) => {
    setQrUrl(url)
    setOpenQrModal(true)
  }

  const handleCloseQrModal = () => {
    setOpenQrModal(false)
  }

  const downloadQrCode = () => {
    const canvas = qrRef.current?.querySelector('canvas')
    if (canvas) {
      const image = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = image
      link.download = 'shortfy-qr-code.png'
      link.click()
    }
  }

  const handleDeleteShortcode = async (id, shortcode) => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('You must be logged in to delete a shortcode.')
      return
    }

    if (!confirm(`Are you sure you want to delete shortcode "${shortcode}"?`)) return

    try {
      const res = await fetch(
        `https://skkhandokar22.pythonanywhere.com/api/custom-delete-shortcode/${id}/${shortcode}/`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )

      if (res.status === 200) {
        setUrls(prev =>
          prev.map(url =>
            url.id === id
              ? {
                  ...url,
                  custom_shortcodes: url.custom_shortcodes.filter(c => c !== shortcode),
                }
              : url
          )
        )
      } else if (res.status === 204) {
        setUrls(prev => prev.filter(url => url.id !== id))
      } else {
        const data = await res.json()
        alert(data.error || 'Failed to delete shortcode')
      }
    } catch (err) {
      console.error('Delete shortcode error:', err)
      alert('An error occurred while deleting shortcode')
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-indigo-700 mb-10 text-center">🚀 My Shortened Links</h2>

      <div className="bg-gradient-to-r from-emerald-400 via-teal-400 py-12 mb-10 text-center text-white rounded-2xl shadow-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">🎯 Your Custom Short URLs</h1>
        <p className="text-lg md:text-xl text-indigo-100">
          Manage and track your custom shortened links in one place.
        </p>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 text-lg animate-pulse">Loading...</p>
      ) : urls.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No URLs found yet.{' '}
          <Link href="/" className="text-indigo-600 hover:text-indigo-800 font-semibold transition duration-300">
            Start shortening!
          </Link>
        </p>
      ) : (
        <>
          <div className="grid gap-6">
            {currentUrls.map(url => (
              <Card
                key={url.id}
                className="bg-white border rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
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
                      Short URLs
                    </Typography>

                    <div className="flex flex-col gap-2 mb-3">
                      {url.custom_shortcodes && url.custom_shortcodes.length > 0 ? (
                        url.custom_shortcodes.map(code => {
                          const shortUrl = `${origin}/${code}`
                          return (
                            <div key={code} className="flex items-center gap-2 flex-wrap">
                              <MuiLink
                                href={shortUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-600 hover:text-indigo-800 font-bold text-lg break-all"
                              >
                                {shortUrl}
                              </MuiLink>
                              <Button
                                size="small"
                                variant="outlined"
                                onClick={() => {
                                  navigator.clipboard.writeText(shortUrl)
                                  setCopiedCode(code)
                                  setTimeout(() => setCopiedCode(''), 2000)
                                }}
                              >
                                Copy
                              </Button>
                              {copiedCode === code && (
                                <span className="text-green-600 text-sm font-medium">Copied!</span>
                              )}
                              <Button
                                size="small"
                                variant="outlined"
                                onClick={() => handleOpenQrModal(shortUrl)}
                              >
                                QR
                              </Button>
                              <Button
                                size="small"
                                variant="outlined"
                                color="secondary"
                                onClick={() => window.open(`/analytics/${code}`, '_blank')}
                              >
                                Show Analytics
                              </Button>
                              <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                onClick={() => handleDeleteShortcode(url.id, code)}
                              >
                                Delete
                              </Button>
                            </div>
                          )
                        })
                      ) : (
                        <Typography variant="body2" className="text-gray-500 italic">
                          No shortcodes available
                        </Typography>
                      )}
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
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <Button variant="contained" color="primary" onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </Button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <Button variant="contained" color="primary" onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </Button>
          </div>
        </>
      )}

      {/* QR Code Modal */}
      <Modal open={openQrModal} onClose={handleCloseQrModal}>
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 shadow-xl text-center w-80">
          <h2 className="text-xl font-bold mb-4 text-gray-700">QR Code for your link</h2>
          <div ref={qrRef} className="flex justify-center">
            <QRCodeCanvas value={qrUrl} size={200} />
          </div>
          <p className="text-sm text-gray-500 mt-4 break-all">{qrUrl}</p>
          <div className="mt-4 flex justify-center gap-4">
            <Button onClick={downloadQrCode} variant="outlined" color="primary">
              Download QR
            </Button>
            <Button onClick={handleCloseQrModal} variant="contained">
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
