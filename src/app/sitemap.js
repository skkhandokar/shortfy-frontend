// app/sitemap.js
export default async function sitemap() {
  const baseURL = "https://shortfy.xyz";
  let blogUrls = [];

  try {
    const response = await fetch(
      "https://skkhandokar22.pythonanywhere.com/api/blogs/",
      {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 3600 }, 
      }
    );

    if (response.ok) {
      const blogs = await response.json();

      if (Array.isArray(blogs)) {
        blogUrls = blogs.map((blog) => {
          // তারিখ ইনভ্যালিড হলে যাতে ক্রাশ না করে তার ব্যবস্থা
          let safeDate;
          try {
            const rawDate = blog.updated_at || blog.created_at;
            safeDate = rawDate ? new Date(rawDate) : new Date();
            if (isNaN(safeDate.getTime())) safeDate = new Date(); // Invalid date check
          } catch (e) {
            safeDate = new Date();
          }

          return {
            url: `${baseURL}/blog/${blog.slug}`,
            lastModified: safeDate.toISOString(), // .toISOString() ব্যবহার করা নিরাপদ
            changeFrequency: "weekly",
            priority: 0.8,
          };
        });
      }
    }
  } catch (error) {
    console.error("Sitemap API Fetch Error:", error);
  }

  const staticPages = [
    { url: `${baseURL}/`, lastModified: new Date().toISOString(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseURL}/blog`, lastModified: new Date().toISOString(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseURL}/bulkshortner`, lastModified: new Date().toISOString(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseURL}/features`, lastModified: new Date().toISOString(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseURL}/shorturlcheck`, lastModified: new Date().toISOString(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseURL}/about`, lastModified: new Date().toISOString(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseURL}/contact`, lastModified: new Date().toISOString(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseURL}/privacy-policy`, lastModified: new Date().toISOString(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseURL}/terms-and-condition`, lastModified: new Date().toISOString(), changeFrequency: "yearly", priority: 0.4 },
  ];

  return [...staticPages, ...blogUrls];
}