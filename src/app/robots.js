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