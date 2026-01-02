// "use client";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";

// export const dynamic = "force-dynamic";

// async function getBlog(slug) {
//   const res = await fetch(
//     `https://skkhandokar22.pythonanywhere.com/api/blogs/${slug}/`,
//     { cache: "no-store" }
//   );
//   if (!res.ok) return null;
//   return res.json();
// }

// // Custom Markdown Components
// const markdownComponents = {
//   h1: ({ children }) => <h1 className="text-4xl font-bold my-4">{children}</h1>,
//   h2: ({ children }) => <h2 className="text-3xl font-semibold my-3">{children}</h2>,
//   h3: ({ children }) => <h3 className="text-2xl font-semibold my-2">{children}</h3>,
//   p: ({ children }) => <p className="my-2">{children}</p>,
//   strong: ({ children }) => <strong className="font-bold">{children}</strong>,
//   em: ({ children }) => <em className="italic">{children}</em>,
//   a: ({ href, children }) => (
//     <a
//       href={href}
//       className="text-indigo-600 hover:underline"
//       target="_blank"
//       rel="noreferrer"
//     >
//       {children}
//     </a>
//   ),
//   ul: ({ children }) => <ul className="list-disc ml-6 my-2">{children}</ul>,
//   ol: ({ children }) => <ol className="list-decimal ml-6 my-2">{children}</ol>,
//   li: ({ children }) => <li className="my-1">{children}</li>,
//   code: ({ children }) => (
//     <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">{children}</code>
//   ),
// };

// export default function BlogDetailClient({ params }) {
//   const [blog, setBlog] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [darkMode, setDarkMode] = useState(false);
//   const [scrollProgress, setScrollProgress] = useState(0);

//   useEffect(() => {
//     const fetchBlog = async () => {
//       const { slug } = await params;
//       const data = await getBlog(slug);
//       setBlog(data);
//       setLoading(false);
//     };
//     fetchBlog();
//   }, [params]);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop = window.scrollY;
//       const docHeight = document.body.scrollHeight - window.innerHeight;
//       setScrollProgress((scrollTop / docHeight) * 100);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   if (loading) {
//     return (
//       <div className="max-w-4xl mx-auto px-4 py-20 animate-pulse space-y-4">
//         <div className="h-10 bg-gray-300 rounded w-3/4"></div>
//         <div className="h-6 bg-gray-300 rounded w-1/2"></div>
//         <div className="h-64 bg-gray-300 rounded"></div>
//         <div className="h-6 bg-gray-300 rounded w-full"></div>
//       </div>
//     );
//   }

//   if (!blog) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <h1 className={`text-xl ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
//           Blog not found
//         </h1>
//       </div>
//     );
//   }

//   const bgClass = darkMode ? "bg-gray-900" : "bg-gray-50";
//   const textClass = darkMode ? "text-gray-100" : "text-gray-900";
//   const headerBg = darkMode ? "bg-gray-800" : "bg-white";
//   const headerText = darkMode ? "text-gray-100" : "text-gray-900";
//   const metaText = darkMode ? "text-gray-400" : "text-gray-500";

//   return (
//     <article className={`${bgClass} ${textClass} min-h-screen transition-colors duration-500 relative`}>
//       {/* Scroll Progress */}
//       <div className="fixed top-0 left-0 h-1 bg-indigo-500 z-50" style={{ width: `${scrollProgress}%` }} />

//       <div className="pt-24 max-w-4xl mx-auto px-4">
//         {/* Header */}
//         <header className={`${headerBg} border-b shadow-sm`}>
//           <div className="px-4 py-12">
//             <h1 className={`text-5xl font-extrabold mb-4 ${headerText}`}>{blog.title}</h1>
//             <div className={`flex flex-wrap items-center gap-4 text-sm ${metaText}`}>
//               <span>📅 {new Date(blog.created_at).toLocaleDateString()}</span>
//               <span>⏱ {blog.reading_time} min read</span>
//               {blog.category && (
//                 <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-xs font-medium">
//                   {blog.category}
//                 </span>
//               )}
//               {blog.is_featured && (
//                 <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
//                   Featured
//                 </span>
//               )}
//             </div>
//           </div>
//         </header>

//         {/* Cover Image */}
//         {blog.cover_image && (
//           <div className="px-4 py-8">
//             <Image
//               src={blog.cover_image}
//               alt={blog.title}
//               width={1200}
//               height={600}
//               className="rounded-xl shadow-lg w-full object-cover"
//             />
//           </div>
//         )}

//         {/* Blog Content */}
//         <section className="py-12 relative">
//           {/* Social Share */}
//           <div className="hidden md:flex flex-col gap-4 fixed left-4 top-32 z-10">
//             <Link
//               href={`https://www.facebook.com/sharer/sharer.php?u=https://shortfy.xyz/blog/${blog.slug}`}
//               target="_blank"
//               className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded shadow transition-all duration-300 transform hover:scale-110"
//             >
//               FB
//             </Link>
//             <Link
//               href={`https://wa.me/?text=https://shortfy.xyz/blog/${blog.slug}`}
//               target="_blank"
//               className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded shadow transition-all duration-300 transform hover:scale-110"
//             >
//               WA
//             </Link>
//           </div>

//           {/* Markdown content */}
//           <div className={`prose max-w-none ${darkMode ? "prose-invert" : ""}`}>
//             {blog.content && (
//               <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
//                 {blog.content}
//               </ReactMarkdown>
//             )}
//           </div>

//           {/* Tags */}
//           {blog.tags && blog.tags.length > 0 && (
//             <div className="mt-10 flex flex-wrap gap-2">
//               {blog.tags.map((tag) => (
//                 <span
//                   key={tag}
//                   className={`${
//                     darkMode ? "bg-gray-700 text-gray-200" : "bg-gray-200 text-gray-700"
//                   } px-3 py-1 rounded-full text-sm`}
//                 >
//                   #{tag}
//                 </span>
//               ))}
//             </div>
//           )}
//         </section>
//       </div>
//     </article>
//   );
// }











import BlogDetailClient from "./BlogDetailClient";

// ১. এই ফাংশনটি গুগল বা ফেসবুকের জন্য মেটা ডেটা পাঠাবে
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const res = await fetch(`https://skkhandokar22.pythonanywhere.com/api/blogs/${slug}/`, { cache: "no-store" });
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