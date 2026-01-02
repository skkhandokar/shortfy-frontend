"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Next.js Image ব্যবহার করা ভালো

const categoryColors = {
  Social: "bg-indigo-100 text-indigo-700",
  Marketing: "bg-green-100 text-green-700",
  Tech: "bg-yellow-100 text-yellow-800",
  Default: "bg-gray-100 text-gray-700",
};

const PAGE_SIZE = 6;

export default function BlogListClient({ initialBlogs }) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(initialBlogs.length / PAGE_SIZE);
  const paginatedBlogs = initialBlogs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="pt-24 pb-16 px-4 max-w-6xl mx-auto">
      <header className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Latest Articles</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our latest insights on digital growth, link optimization, and technology.
        </p>
      </header>

      {/* Blog Grid */}
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {paginatedBlogs.map((blog) => {
          const categoryClass = categoryColors[blog.category] || categoryColors.Default;

          return (
            <article
              key={blog.slug}
              className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Cover Image */}
              <Link href={`/blog/${blog.slug}`} className="block overflow-hidden h-48 relative">
                <img
                  src={blog.cover_image || "https://via.placeholder.com/400x200?text=No+Image"}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </Link>

              <div className="p-6 flex flex-col flex-grow">
                {blog.category && (
                  <span className={`inline-block w-fit px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg mb-3 ${categoryClass}`}>
                    {blog.category}
                  </span>
                )}

                <h3 className="text-xl font-bold mb-3 line-clamp-2">
                  <Link href={`/blog/${blog.slug}`} className="text-gray-900 hover:text-indigo-600 transition-colors">
                    {blog.title}
                  </Link>
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3 text-sm flex-grow">
                  {blog.meta_description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-tighter">
                    {blog.reading_time} min read
                  </span>
                  <Link href={`/blog/${blog.slug}`} className="text-indigo-600 font-bold text-sm hover:translate-x-1 transition-transform inline-flex items-center">
                    Read Post <span className="ml-1">→</span>
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="flex justify-center mt-16 space-x-2" aria-label="Pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => {
                setPage(num);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`w-10 h-10 rounded-xl font-bold transition-all ${
                num === page
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                  : "bg-gray-100 text-gray-600 hover:bg-indigo-50"
              }`}
            >
              {num}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}