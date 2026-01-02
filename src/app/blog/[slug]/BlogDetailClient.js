"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// মার্কডাউন কম্পোনেন্ট কাস্টমাইজেশন
const markdownComponents = {
  h1: ({ children }) => <h1 className="text-4xl font-bold my-4 leading-tight">{children}</h1>,
  h2: ({ children }) => <h2 className="text-3xl font-semibold my-3 border-b pb-2">{children}</h2>,
  p: ({ children }) => <p className="my-4 leading-relaxed text-lg">{children}</p>,
  a: ({ href, children }) => (
    <a href={href} className="text-indigo-600 font-medium underline" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  ul: ({ children }) => <ul className="list-disc ml-6 my-4 space-y-2">{children}</ul>,
  code: ({ children }) => <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">{children}</code>,
};

async function getBlog(slug) {
  const res = await fetch(`https://skkhandokar22.pythonanywhere.com/api/blogs/${slug}/`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default function BlogDetailClient({ params }) {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const fetchBlog = async () => {
      const { slug } = await params;
      const data = await getBlog(slug);
      setBlog(data);
      setLoading(false);
    };
    fetchBlog();
  }, [params]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((scrollTop / docHeight) * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) return <div className="p-20 text-center">Loading...</div>;
  if (!blog) return <div className="p-20 text-center">Not Found</div>;

  return (
    <article className={`${darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"} min-h-screen relative`}>
      <div className="fixed top-0 left-0 h-1.5 bg-indigo-500 z-50 transition-all duration-200" style={{ width: `${scrollProgress}%` }} />
      <div className="pt-24 max-w-4xl mx-auto px-4 pb-20">
        <header className="mb-10">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight">{blog.title}</h1>
          <div className="text-gray-500 font-medium flex gap-4">
             <span>📅 {new Date(blog.created_at).toLocaleDateString()}</span>
             <span>⏱ {blog.reading_time || '5'} min read</span>
          </div>
        </header>

        {blog.cover_image && (
          <div className="mb-12 relative h-[400px]">
            <Image src={blog.cover_image} alt={blog.title} fill className="rounded-2xl object-cover shadow-2xl" priority />
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-10">
          <aside className="md:w-16 flex md:flex-col gap-4 sticky top-32 h-fit">
             <Link href={`https://www.facebook.com/sharer/sharer.php?u=https://shortfy.xyz/blog/${blog.slug}`} target="_blank" className="bg-[#1877F2] text-white p-2 rounded text-center">FB</Link>
             <Link href={`https://wa.me/?text=https://shortfy.xyz/blog/${blog.slug}`} target="_blank" className="bg-[#25D366] text-white p-2 rounded text-center">WA</Link>
          </aside>
          <div className={`flex-1 prose max-w-none ${darkMode ? "prose-invert" : ""}`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {blog.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </article>
  );
}