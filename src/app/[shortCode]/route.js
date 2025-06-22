// app/[shortCode]/route.js
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { shortCode } = params;

  try {
    const res = await fetch(`https://skkhandokar22.pythonanywhere.com/api/check/${shortCode}/`);

    if (!res.ok) {
      return NextResponse.redirect(new URL('/not-found', request.url));
    }

    const data = await res.json();

    return NextResponse.redirect(data.original_url);
  } catch (err) {
    return NextResponse.redirect(new URL('/not-found', request.url));
  }
}
