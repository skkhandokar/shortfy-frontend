// app/sitemap.js
// Dynamic + Static Sitemap for Shortfy.xyz
// SEO, AI-crawler & Google-friendly

export default async function sitemap() {
  const baseURL = "https://shortfy.xyz";
  let blogUrls = [];

  /* =====================================================
     1️⃣ Dynamic Blog URLs (from Django API)
     ===================================================== */
  try {
    const response = await fetch(
      "https://skkhandokar22.pythonanywhere.com/api/blogs/",
      {
        next: { revalidate: 1800 }, // প্রতি ১ ঘণ্টায় sitemap regenerate হবে
      }
    );

    if (response.ok) {
      const blogs = await response.json();

      // API response যদি array হয়
      if (Array.isArray(blogs)) {
        blogUrls = blogs.map((blog) => ({
          url: `${baseURL}/blog/${blog.slug}`,
          lastModified: new Date(
            blog.updated_at || blog.created_at || Date.now()
          ),
          changeFrequency: "weekly",
          priority: 0.8,
        }));
      }
    }
  } catch (error) {
    // API fail হলেও sitemap ভাঙবে না
    console.error("Sitemap blog fetch error:", error);
  }

  /* =====================================================
     2️⃣ Static Pages (Public & SEO-safe only)
     ===================================================== */
  const staticPages = [
    {
      url: baseURL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseURL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseURL}/bulkshortner`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseURL}/features`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${baseURL}/shorturlcheck`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${baseURL}/about`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${baseURL}/contact`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${baseURL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseURL}/terms-and-condition`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },

    // ❌ Auth / dashboard pages sitemap-এ না রাখাই SEO best practice
    // /signin
    // /signup
    // /my-urls
    // /dashboard
  ];

  /* =====================================================
     3️⃣ Final Sitemap Output
     ===================================================== */
  return [...staticPages, ...blogUrls];
}
