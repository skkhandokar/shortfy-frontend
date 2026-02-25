export const dynamic = "force-dynamic"; // server-side fetching

export const runtime = "edge"; // optional, fast edge runtime

export async function GET() {
  // Django API থেকে sitemap.xml fetch
  const res = await fetch(
    "https://skkhandokar22.pythonanywhere.com/api/sitemap.xml",
    {
      cache: "no-store", // always fresh
    }
  );

  if (!res.ok) {
    return new Response("Failed to fetch sitemap", { status: 500 });
  }

  const xml = await res.text();

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml", // important for browsers/search engines
    },
  });
}
