// app/sitemap.js
export default async function sitemap() {
  const baseURL = "https://shortfy.xyz";
  let blogUrls = [];

  // --- ১. ডাইনামিক ব্লগ পোস্টগুলো নিয়ে আসা (Django API) ---
  try {
    const response = await fetch(
      "https://skkhandokar22.pythonanywhere.com/api/blogs/",
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Shortfy-Sitemap-Generator/1.0'
        },
        next: { revalidate: 3600 }, // প্রতি ১ ঘণ্টায় আপডেট হবে
      }
    );

    if (response.ok) {
      const blogs = await response.json();

      if (Array.isArray(blogs)) {
        blogUrls = blogs.map((blog) => {
          // তারিখ ইনভ্যালিড হলে বর্তমান সময় ব্যাকআপ হিসেবে থাকবে
          const date = blog.updated_at || blog.created_at || new Date().toISOString();
          return {
            url: `${baseURL}/blog/${blog.slug}`,
            lastModified: new Date(date),
            changeFrequency: "weekly",
            priority: 0.8,
          };
        });
      }
    }
  } catch (error) {
    console.error("Sitemap API Fetch Error:", error);
    // এপিআই ফেল করলে শুধু স্ট্যাটিক পেজগুলো রিটার্ন হবে
  }

  // --- ২. স্ট্যাটিক পেজগুলো সাজানো ---
  const staticPages = [
    { url: baseURL, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseURL}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseURL}/bulkshortner`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseURL}/features`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseURL}/shorturlcheck`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseURL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseURL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseURL}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseURL}/terms-and-condition`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
  ];

  return [...staticPages, ...blogUrls];
}