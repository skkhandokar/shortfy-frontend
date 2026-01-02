// "use client"; // Optional: use this if server fetch fails due to Turbopack

// import Link from "next/link";
// import { useState, useEffect } from "react";

// // Dynamic category colors
// const categoryColors = {
//   Social: "bg-indigo-100 text-indigo-700",
//   Marketing: "bg-green-100 text-green-700",
//   Tech: "bg-yellow-100 text-yellow-800",
//   Default: "bg-gray-100 text-gray-700",
// };

// const PAGE_SIZE = 6;

// export default function BlogPage({ searchParams }) {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Pagination
//   const [page, setPage] = useState(parseInt(searchParams?.page || 1));

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const res = await fetch(
//           "https://skkhandokar22.pythonanywhere.com/api/blogs/",
//           { cache: "no-cache" }
//         );
//         if (!res.ok) throw new Error("Failed to fetch blogs");
//         const data = await res.json();
//         setBlogs(data);
//       } catch (err) {
//         console.error("Blog fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBlogs();
//   }, []);

//   if (loading) return <p className="text-center mt-10">Loading blogs...</p>;

//   const totalPages = Math.ceil(blogs.length / PAGE_SIZE);
//   const paginatedBlogs = blogs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

//   return (
//     <div className="pt-24 pb-16 px-4 max-w-6xl mx-auto">
//       <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
//         Latest Articles
//       </h1>

//       {/* Blog Grid */}
//       <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//         {paginatedBlogs.map((blog) => {
//           const categoryClass =
//             categoryColors[blog.category] || categoryColors.Default;

//           return (
//             <div
//               key={blog.slug}
//               className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
//             >
//               {/* Cover Image */}
//               <div className="w-full h-48 relative">
//                 <img
//                   src={
//                     blog.cover_image ||
//                     "https://via.placeholder.com/400x200?text=No+Image"
//                   }
//                   alt={blog.title}
//                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                 />
//               </div>

//               <div className="p-6 flex flex-col flex-grow">
//                 {/* Category */}
//                 {blog.category && (
//                   <span
//                     className={`inline-block px-3 py-1 text-sm font-medium rounded-full mb-2 ${categoryClass} text-black`}
//                   >
//                     {blog.category}
//                   </span>
//                 )}

//                 {/* Title */}
//                 <Link
//                   href={`/blog/${blog.slug}`}
//                   className="text-xl font-semibold mb-3 text-black hover:text-indigo-600 transition-colors duration-300"
//                 >
//                   {blog.title}
//                 </Link>

//                 {/* Meta Description */}
//                 <p className="text-black mb-4 line-clamp-3 flex-grow">
//                   {blog.meta_description}
//                 </p>

//                 {/* Reading Time */}
//                 <span className="text-sm text-gray-500 mb-4">
//                   {blog.reading_time} min read
//                 </span>

//                 {/* Read More Button */}
//                 <Link
//                   href={`/blog/${blog.slug}`}
//                   className="mt-auto inline-block text-black font-medium hover:underline"
//                 >
//                   Read More →
//                 </Link>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center mt-12 space-x-2">
//         {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
//           <button
//             key={num}
//             onClick={() => setPage(num)}
//             className={`px-4 py-2 rounded ${
//               num === page
//                 ? "bg-black text-white"
//                 : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//             }`}
//           >
//             {num}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }











import BlogListClient from "./BlogListClient";

// ১. এই পেজের জন্য স্ট্যাটিক বা ডাইনামিক মেটাডেটা
export const metadata = {
  title: "Latest Articles on Technology & Marketing | Shortfy Blog",
  description: "Stay updated with the latest trends in AI, digital marketing, and link management. Read our expert articles on Shortfy.xyz.",
  openGraph: {
    title: "Shortfy Blog - Insights for Creators",
    description: "Expert tips and tricks for digital creators and marketers.",
    url: "https://shortfy.xyz/blog",
    type: "website",
  },
};

// ২. সার্ভার থেকে ডেটা ফেচ করা (SEO এর জন্য এটিই সবচেয়ে ভালো উপায়)
async function getBlogs() {
  const res = await fetch("https://skkhandokar22.pythonanywhere.com/api/blogs/", {
    next: { revalidate: 900 }, // প্রতি ১5 minutes ডেটা অটো আপডেট হবে
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <main>
      {/* গুগল এই H1 এবং কন্টেন্ট সরাসরি দেখতে পাবে */}
      <h1 className="sr-only">Shortfy Digital Marketing and Tech Blog</h1>
      <BlogListClient initialBlogs={blogs} />
    </main>
  );
}