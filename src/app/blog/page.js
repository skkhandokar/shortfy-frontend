



// app/blog/page.js


import BlogListClient from "./BlogListClient";
import BASE_URL from "@/config/api";

async function getBlogs(page) {
  const res = await fetch(
    `${BASE_URL}/api/blogs/?page=${page}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return res.json();
}

export default async function BlogPage(props) {
  // ✅ unwrap Promise
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page ?? 1);

  const data = await getBlogs(page);

  const blogs = data?.results ?? [];
  const totalCount = data?.count ?? 0;

  return (
    <main>
      <h1 className="sr-only">
        Shortfy Digital Marketing and Technology Blog
      </h1>

      <BlogListClient
        blogs={blogs}
        totalCount={totalCount}
        currentPage={page}
      />
    </main>
  );
}

