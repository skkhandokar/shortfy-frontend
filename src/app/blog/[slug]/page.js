











import BlogDetailClient from "./BlogDetailClient";
import BASE_URL from "@/config/api";
// ১. এই ফাংশনটি গুগল বা ফেসবুকের জন্য মেটা ডেটা পাঠাবে
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const res = await fetch(`${BASE_URL}/api/blogs/${slug}/`, { cache: "no-store" });
  const blog = await res.json();

  if (!blog) return { title: "Blog Not Found | Shortfy.xyz" };

  return {
    title: `${blog.title} | Shortfy.xyz`,
    description: blog.meta_description || "Discover the best AI tools and content creation tips on Shortfy.",
    openGraph: {
      title: blog.title,
      description: blog.meta_description,
      images: [{ url: blog.cover_image }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.meta_description,
      images: [blog.cover_image],
    },
  };
}

// ২. এটি মূল পেজ যা Client Component টিকে কল করবে
export default function Page({ params }) {
  return <BlogDetailClient params={params} />;
}