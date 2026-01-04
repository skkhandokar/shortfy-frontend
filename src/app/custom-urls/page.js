







// 'use client'

// import { useEffect, useState, useRef } from 'react'
// import { useRouter } from 'next/navigation'
// import {
//   Card,
//   CardContent,
//   Typography,
//   Link as MuiLink,
//   Avatar,
//   Button,
//   Modal,
// } from '@mui/material'
// import Link from 'next/link'
// import { QRCodeCanvas } from 'qrcode.react'
// import ContentCopyIcon from '@mui/icons-material/ContentCopy'
// import ShareIcon from '@mui/icons-material/Share'
// import QrCodeIcon from '@mui/icons-material/QrCode'
// import AnalyticsIcon from '@mui/icons-material/Analytics'
// import DeleteIcon from '@mui/icons-material/Delete'

// export default function MyURLs() {
//   const [urls, setUrls] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [currentPage, setCurrentPage] = useState(1)
//   const [origin, setOrigin] = useState('')
//   const [qrUrl, setQrUrl] = useState('')
//   const [openQrModal, setOpenQrModal] = useState(false)
//   const [copiedCode, setCopiedCode] = useState('')
//   const [confirmDelete, setConfirmDelete] = useState(null) // { id, code }
//   const [deleteError, setDeleteError] = useState('')

//   const qrRef = useRef(null)
//   const router = useRouter()
//   const urlsPerPage = 10

//   /* ======================
//      Auth + Fetch URLs
//      ====================== */
//   useEffect(() => {
//     const token = localStorage.getItem('token')
//     if (!token) {
//       router.push('/signin')
//       return
//     }

//     setOrigin('https://shortfy.xyz')

//     fetch('https://skkhandokar22.pythonanywhere.com/api/custom-urls/', {
//       headers: {
//         Authorization: `Token ${token}`,
//       },
//     })
//       .then(res => res.json())
//       .then(data => {
//         setUrls(data)
//         setLoading(false)
//       })
//       .catch(() => setLoading(false))
//   }, [router])

//   /* ======================
//      Helpers
//      ====================== */
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

//   /* ======================
//      Delete Shortcode
//      ====================== */
//   const handleDeleteShortcode = async () => {
//     const token = localStorage.getItem('token')
//     if (!token) {
//       setDeleteError('⚠️ Login required')
//       return
//     }

//     const { id, code } = confirmDelete

//     try {
//       const res = await fetch(
//         `https://skkhandokar22.pythonanywhere.com/api/custom-delete-shortcode/${id}/${code}/`,
//         {
//           method: 'DELETE',
//           headers: {
//             Authorization: `Token ${token}`,
//           },
//         }
//       )

//       if (res.status === 200) {
//         setUrls(prev =>
//           prev.map(url =>
//             url.id === id
//               ? {
//                   ...url,
//                   custom_shortcodes: url.custom_shortcodes.filter(c => c !== code),
//                 }
//               : url
//           )
//         )
//         setConfirmDelete(null)
//       } else if (res.status === 204) {
//         setUrls(prev => prev.filter(url => url.id !== id))
//         setConfirmDelete(null)
//       } else {
//         setDeleteError('❌ Failed to delete shortcode')
//       }
//     } catch {
//       setDeleteError('❌ Failed to delete shortcode')
//     }
//   }

//   /* ======================
//      QR Download
//      ====================== */
//   const downloadQrCode = () => {
//     const canvas = qrRef.current?.querySelector('canvas')
//     if (!canvas) return
//     const image = canvas.toDataURL('image/png')
//     const link = document.createElement('a')
//     link.href = image
//     link.download = 'shortfy-qr-code.png'
//     link.click()
//   }

//   /* ======================
//      Share URL
//      ====================== */
//   const handleShare = (shortUrl) => {
//     if (navigator.share) {
//       navigator.share({
//         title: 'Shortfy URL',
//         text: 'Check out this short URL:',
//         url: shortUrl,
//       }).catch(err => console.log('Share failed:', err))
//     } else {
//       navigator.clipboard.writeText(shortUrl)
//       alert('URL copied to clipboard for sharing!')
//     }
//   }

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       {/* ================= HERO SECTION ================= */}
//       <h2 className="text-4xl font-bold text-indigo-700 mb-10 text-center">
//         🚀 My Shortened Links
//       </h2>

//       <div className="bg-gradient-to-r from-emerald-400 via-teal-400 py-12 mb-10 text-center text-white rounded-2xl shadow-lg">
//         <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
//           🎯 Your Custom Short URLs
//         </h1>
//         <p className="text-lg md:text-xl text-indigo-100">
//           Manage and track your custom shortened links in one place.
//         </p>
//       </div>
//       {/* ================================================= */}

//       {loading ? (
//         <p className="text-center text-gray-500 animate-pulse">Loading...</p>
//       ) : urls.length === 0 ? (
//         <p className="text-center text-gray-500">
//           No URLs found yet.{' '}
//           <Link href="/" className="text-indigo-600 font-semibold">
//             Start Shortening!
//           </Link>
//         </p>
//       ) : (
//         <>
//           <div className="grid gap-6">
//             {currentUrls.map(url => (
//               <Card
//                 key={url.id}
//                 className="bg-white border rounded-2xl shadow-lg hover:shadow-2xl transition"
//               >
//                 <CardContent className="flex flex-col sm:flex-row gap-6">
//                   <Avatar
//                     src={getFavicon(url.original_url)}
//                     variant="rounded"
//                     sx={{ width: 48, height: 48 }}
//                   />

//                   <div className="flex-1">
//                     <Typography variant="subtitle2" className="text-gray-500 uppercase mb-1">
//                       Short URLs
//                     </Typography>

//                     <div className="flex flex-col gap-2">
//                       {url.custom_shortcodes.map(code => {
//                         const shortUrl = `${origin}/${code}`
//                         const isConfirming =
//                           confirmDelete?.id === url.id &&
//                           confirmDelete?.code === code

//                         return (
//                           <div key={code}>
//                             <div className="flex flex-wrap items-center gap-2">
//                               <MuiLink
//                                 href={shortUrl}
//                                 target="_blank"
//                                 className="text-indigo-600 font-bold break-all"
//                               >
//                                 {shortUrl}
//                               </MuiLink>

//                               <Button
//                                 size="small"
//                                 variant="outlined"
//                                 startIcon={<ContentCopyIcon />}
//                                 onClick={() => {
//                                   navigator.clipboard.writeText(shortUrl)
//                                   setCopiedCode(code)
//                                   setTimeout(() => setCopiedCode(''), 2000)
//                                 }}
//                               >
//                                 Copy
//                               </Button>

//                               <Button
//                                 size="small"
//                                 variant="outlined"
//                                 startIcon={<ShareIcon />}
//                                 onClick={() => handleShare(shortUrl)}
//                               >
//                                 Share
//                               </Button>

//                               {copiedCode === code && (
//                                 <span className="text-green-600 text-sm">
//                                   Copied!
//                                 </span>
//                               )}

//                               <Button
//                                 size="small"
//                                 variant="outlined"
//                                 startIcon={<QrCodeIcon />}
//                                 onClick={() => {
//                                   setQrUrl(shortUrl)
//                                   setOpenQrModal(true)
//                                 }}
//                               >
//                                 QR
//                               </Button>

//                               <Button
//                                 size="small"
//                                 variant="outlined"
//                                 color="secondary"
//                                 startIcon={<AnalyticsIcon />}
//                                 onClick={() =>
//                                   window.open(`/analytics/${code}`, '_blank')
//                                 }
//                               >
//                                 Analytics
//                               </Button>

//                               <Button
//                                 size="small"
//                                 variant="outlined"
//                                 color="error"
//                                 startIcon={<DeleteIcon />}
//                                 onClick={() => {
//                                   setConfirmDelete({ id: url.id, code })
//                                   setDeleteError('')
//                                 }}
//                               >
//                                 Delete
//                               </Button>
//                             </div>

//                             {/* Inline Delete Confirmation */}
//                             {isConfirming && (
//                               <div className="mt-2 p-3 rounded-lg bg-red-100 border border-red-300 animate-fadeIn">
//                                 <p className="text-sm text-red-800 mb-2">
//                                   Are you sure you want to delete this shortcode?
//                                 </p>

//                                 <div className="flex gap-2">
//                                   <Button
//                                     size="small"
//                                     variant="contained"
//                                     color="error"
//                                     onClick={handleDeleteShortcode}
//                                   >
//                                     Yes
//                                   </Button>
//                                   <Button
//                                     size="small"
//                                     variant="outlined"
//                                     onClick={() => setConfirmDelete(null)}
//                                   >
//                                     No
//                                   </Button>
//                                 </div>

//                                 {deleteError && (
//                                   <p className="text-sm text-red-600 mt-2">
//                                     {deleteError}
//                                   </p>
//                                 )}
//                               </div>
//                             )}
//                           </div>
//                         )
//                       })}
//                     </div>

//                     <Typography
//                       variant="subtitle2"
//                       className="text-gray-500 uppercase mt-4"
//                     >
//                       Original URL
//                     </Typography>
//                     <Typography variant="body2" className="text-gray-400 break-words">
//                       {url.original_url}
//                     </Typography>

//                     <Typography variant="body2" className="mt-3 text-sm text-gray-500">
//                       📊 Clicks:{' '}
//                       <span className="text-indigo-700 font-bold">
//                         {url.clicks}
//                       </span>
//                     </Typography>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           {/* Pagination */}
//           <div className="flex justify-center items-center mt-8 gap-4">
//             <Button
//               variant="contained"
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage(p => p - 1)}
//             >
//               Previous
//             </Button>
//             <span>
//               Page {currentPage} of {totalPages}
//             </span>
//             <Button
//               variant="contained"
//               disabled={currentPage === totalPages}
//               onClick={() => setCurrentPage(p => p + 1)}
//             >
//               Next
//             </Button>
//           </div>
//         </>
//       )}

//       {/* QR Modal */}
//       <Modal open={openQrModal} onClose={() => setOpenQrModal(false)}>
//         <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 shadow-xl w-80 text-center">
//           <h2 className="text-xl font-bold mb-4 text-gray-700">QR Code</h2>
//           <div ref={qrRef} className="flex justify-center">
//             <QRCodeCanvas value={qrUrl} size={200} />
//           </div>
//           <p className="text-sm text-gray-500 mt-4 break-all">{qrUrl}</p>
//           <div className="mt-4 flex justify-center gap-3">
//             <Button onClick={downloadQrCode} variant="outlined">
//               Download
//             </Button>
//             <Button onClick={() => setOpenQrModal(false)} variant="contained">
//               Close
//             </Button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   )
// }










import CustomUrls from './CustomUrls'

export const metadata = {
  title: 'My Shortened URLs – Shortfy',
  description: 'Manage, track, and analyze your shortened links securely with Shortfy.',
  robots: 'index,follow',
}

export default function Page() {
  return <CustomUrls />
}
