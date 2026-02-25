// app/sitemap.js
export default async function sitemap() {
  const baseURL = "https://shortfy.xyz";
  let blogUrls = [];

  try {
    // API Call with a timeout or safer error handling
    const response = await fetch(
      "https://skkhandokar22.pythonanywhere.com/api/blogs/",
      {
        next: { revalidate: 1800 }, 
      }
    );

    if (response.ok) {
      const blogs = await response.json();

      if (Array.isArray(blogs)) {
        blogUrls = blogs.map((blog) => {
          // তারিখ ইনভ্যালিড হলে বর্তমান সময় ব্যবহার করবে
          const lastMod = blog.updated_at || blog.created_at;
          const validDate = lastMod ? new Date(lastMod) : new Date();
          
          return {
            url: `${baseURL}/blog/${blog.slug}`,
            lastModified: isNaN(validDate.getTime()) ? new Date() : validDate,
            changeFrequency: "weekly",
            priority: 0.8,
          };
        });
      }
    }
  } catch (error) {
    console.error("Sitemap fetch error:", error);
    // API এরর দিলে ব্লগ ছাড়াই স Sitemap জেনারেট হবে, ক্র্যাশ করবে না
  }

  const staticPages = [
    { url: baseURL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseURL}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseURL}/bulkshortner`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseURL}/features`, lastModified: new Date(), changeFrequency: "daily", priority: 0.7 },
    { url: `${baseURL}/shorturlcheck`, lastModified: new Date(), changeFrequency: "daily", priority: 0.7 },
    { url: `${baseURL}/about`, lastModified: new Date(), changeFrequency: "daily", priority: 0.7 },
    { url: `${baseURL}/contact`, lastModified: new Date(), changeFrequency: "daily", priority: 0.7 },
    { url: `${baseURL}/privacy-policy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseURL}/terms-and-condition`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  return [...staticPages, ...blogUrls];
}