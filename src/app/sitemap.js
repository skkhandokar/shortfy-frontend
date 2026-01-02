export default async function sitemap() {
  const baseURL = "https://shortfy.xyz";

  let blogUrls = [];

  try {
    // ১. ডাইনামিক ব্লগ ডেটা আনা
    const response = await fetch("https://skkhandokar22.pythonanywhere.com/api/blogs/", {
      next: { revalidate: 3600 }, // প্রতি ১ ঘণ্টায় আপডেট হবে
    });

    if (response.ok) {
      const blogs = await response.json();
      
      // ডেটা যদি অ্যারে হয় তবেই ম্যাপ করবে
      if (Array.isArray(blogs)) {
        blogUrls = blogs.map((blog) => ({
          url: `${baseURL}/blog/${blog.slug}`,
          lastModified: new Date(blog.updated_at || blog.created_at || new Date()),
          changeFrequency: 'weekly',
          priority: 0.8,
        }));
      }
    }
  } catch (error) {
    console.error("Sitemap fetch error:", error);
    // এরর আসলেও সাইট ক্রাশ করবে না, শুধু ব্লগের লিঙ্কগুলো বাদ যাবে
  }

  // ২. আপনার সব স্ট্যাটিক পেজ
  const staticPages = [
    { url: baseURL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseURL}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    
    { url: `${baseURL}/about`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
    { url: `${baseURL}/contact`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
    { url: `${baseURL}/terms-and-condition`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseURL}/privacy-policy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseURL}/shorturlcheck`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
    { url: `${baseURL}/features`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
    // dashboard এরিয়া সাধারণত সাইটম্যাপে না রাখাই ভালো, তবে চাইলে রাখতে পারেন
    ,
  ];

  return [...staticPages, ...blogUrls];
}