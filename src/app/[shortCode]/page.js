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
              window.location.href = 'https://skkhandokar22.pythonanywhere.com/api/check/${shortCode}/';
            `,
          }}
        />
      </body>
    </html>
  );
}
