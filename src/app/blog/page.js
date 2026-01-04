


// import BlogListClient from "./BlogListClient";

// // ১. এই পেজের জন্য স্ট্যাটিক বা ডাইনামিক মেটাডেটা
// export const metadata = {
//   title: "Latest Articles on Technology & Marketing | Shortfy Blog",
//   description: "Stay updated with the latest trends in AI, digital marketing, and link management. Read our expert articles on Shortfy.xyz.",
//   openGraph: {
//     title: "Shortfy Blog - Insights for Creators",
//     description: "Expert tips and tricks for digital creators and marketers.",
//     url: "https://shortfy.xyz/blog",
//     type: "website",
//   },
// };

// // ২. সার্ভার থেকে ডেটা ফেচ করা (SEO এর জন্য এটিই সবচেয়ে ভালো উপায়)
// async function getBlogs() {
//   const res = await fetch("https://skkhandokar22.pythonanywhere.com/api/blogs/", {
//     next: { revalidate: 900 }, // প্রতি ১5 minutes ডেটা অটো আপডেট হবে
//   });
//   if (!res.ok) return [];
//   return res.json();
// }

// export default async function BlogPage() {
//   const blogs = await getBlogs();

//   return (
//     <main>
//       {/* গুগল এই H1 এবং কন্টেন্ট সরাসরি দেখতে পাবে */}
//       <h1 className="sr-only">Shortfy Digital Marketing and Tech Blog</h1>
//       <BlogListClient initialBlogs={blogs} />
//     </main>
//   );
// }






// app/blog/page.js

import BlogListClient from "./BlogListClient";

async function getBlogs(page) {
  const res = await fetch(
    `https://skkhandokar22.pythonanywhere.com/api/blogs/?page=${page}`,
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

