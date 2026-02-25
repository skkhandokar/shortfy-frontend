// app/robots.js
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard', 
        '/my-urls', 
        '/signin', 
        '/signup', 
        '/api/' // ইন্টারনাল এপিআই রুটগুলো ব্লক করা ভালো
      ],
    },
    sitemap: 'https://shortfy.xyz/sitemap.xml',
  }
}