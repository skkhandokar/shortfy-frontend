// app/[shortCode]/page.js

export default function RedirectPage({ params }) {
  const { shortCode } = params;

  return (
    <html>
      <body>
        <p>Redirecting...</p>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.location.href = 'https://www.shortfy.xyz/api/check/${shortCode}/';
            `,
          }}
        />
      </body>
    </html>
  );
}
