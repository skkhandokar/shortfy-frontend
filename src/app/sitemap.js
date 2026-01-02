export default async function sitemap() {
  const baseURL = "https://shortfy.xyz";

  // ১. আপনার ডাইনামিক ব্লগ ডেটা আনা (Django API থেকে)
  const response = await fetch("https://skkhandokar22.pythonanywhere.com/api/blogs/");
  const blogs = await response.json();

  // ২. ব্লগ পোস্টগুলোর জন্য ইউআরএল তৈরি
  const blogUrls = blogs.map((blog) => ({
    url: `${baseURL}/blog/${blog.slug}`,
    lastModified: new Date(blog.updated_at || blog.created_at),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // ৩. স্ট্যাটিক পেজগুলো যোগ করা (Home, Blog List, etc.)
  return [
    {
      url: baseURL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseURL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseURL}/signin`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
     {
      url: `${baseURL}/signup`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
     {
      url: `${baseURL}/about`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
     {
      url: `${baseURL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
     {
      url: `${baseURL}/terms-and-condition`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
     {
      url: `${baseURL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
     {
      url: `${baseURL}/shorturlcheck`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
     {
      url: `${baseURL}/features`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
     {
      url: `${baseURL}/custom-urls`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
     {
      url: `${baseURL}/my-urls`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...blogUrls,
  ];
}