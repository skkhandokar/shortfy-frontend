// // app/robots.js
// export default function robots() {
//   return {
//     rules: {
//       userAgent: '*',
//       allow: '/',
//       disallow: [
//         '/dashboard', 
//         '/my-urls', 
//         '/signin', 
//         '/signup', 
//         '/api/' // ইন্টারনাল এপিআই রুটগুলো ব্লক করা ভালো
//       ],
//     },
//     sitemap: 'https://shortfy.xyz/sitemap.xml',
//   }
// }



export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [], // যে পেজগুলো গুগলকে দেখাতে চান না
    },
    sitemap: 'https://shortfy.xyz/sitemap.xml', // আপনার সাইটম্যাপের লিঙ্ক
  }
}