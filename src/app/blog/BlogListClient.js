"use client";

import Link from "next/link";
import Head from "next/head";

const PAGE_SIZE = 6;

const categoryColors = {
  Social: "bg-indigo-100 text-indigo-700",
  Marketing: "bg-green-100 text-green-700",
  Tech: "bg-yellow-100 text-yellow-800",
  Default: "bg-gray-100 text-gray-700",
};

export default function BlogListClient({
  blogs = [],
  totalCount = 0,
  currentPage = 1,
}) {
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  if (!blogs.length) {
    return (
      <p className="text-center text-gray-500 py-24 text-lg">
        No articles found.
      </p>
    );
  }

  return (
    <>
      {/* SEO & Structured Data */}
      <Head>
        <title>Latest Articles | Your Blog</title>
        <meta
          name="description"
          content="Explore our latest articles on digital growth, link optimization, and technology. Read now for insights and tips."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://shortfy.xyz/blog" />
        {/* Structured data JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "Your Blog",
              "url": "https://shortfy.xyz/blog",
              "description": "Latest articles on digital growth, link optimization, and technology.",
              "blogPost": blogs.map((b) => ({
                "@type": "BlogPosting",
                headline: b.title,
                image: b.cover_image || "https://via.placeholder.com/400x200?text=No+Image",
                url: `https://shortfy.xyz/blog/${b.slug}`,
                description: b.meta_description,
                author: {
                  "@type": "Person",
                  name: b.author || "Admin",
                },
                datePublished: b.published_at || new Date().toISOString(),
              })),
            }),
          }}
        />
      </Head>

      <section className="pt-24 pb-16 px-4 max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Latest Articles
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Explore our latest insights on digital growth, link optimization, and technology.
          </p>
        </header>

        {/* Blog Grid */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => {
            const categoryClass =
              categoryColors[blog.category] || categoryColors.Default;

            return (
              <article
                key={blog.slug}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col"
              >
                {/* Cover Image */}
                <Link
                  href={`/blog/${blog.slug}`}
                  className="block h-48 overflow-hidden"
                >
                  <img
                    src={
                      blog.cover_image ||
                      "https://via.placeholder.com/400x200?text=No+Image"
                    }
                    alt={blog.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </Link>

                <div className="p-6 flex flex-col flex-grow">
                  {/* Category */}
                  {blog.category && (
                    <span
                      className={`w-fit mb-3 px-3 py-1 text-xs font-bold uppercase rounded-lg ${categoryClass}`}
                    >
                      {blog.category}
                    </span>
                  )}

                  {/* Title */}
                  <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-gray-900 mb-3 line-clamp-2">
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="hover:text-indigo-600 transition-colors"
                    >
                      {blog.title}
                    </Link>
                  </h2>

                  {/* Meta Description */}
                  <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-3 flex-grow">
                    {blog.meta_description}
                  </p>

                  {/* Footer */}
                  <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-400 font-medium uppercase">
                      {blog.reading_time || 3} min read
                    </span>

                    <Link
                      href={`/blog/${blog.slug}`}
                      className="text-indigo-600 text-sm sm:text-base font-bold inline-flex items-center hover:translate-x-1 transition-transform"
                    >
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
          <nav
            className="flex justify-center mt-16 gap-2 flex-wrap"
            aria-label="Blog pagination"
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (num) => (
                <Link
                  key={num}
                  href={`/blog?page=${num}`}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold transition-all ${
                    num === currentPage
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                      : "bg-gray-100 text-gray-600 hover:bg-indigo-50"
                  }`}
                >
                  {num}
                </Link>
              )
            )}
          </nav>
        )}
      </section>
    </>
  );
}
