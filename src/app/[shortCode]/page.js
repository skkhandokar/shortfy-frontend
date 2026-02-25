

const BASE_URL = "https://skkhandokar22.pythonanywhere.com";




export default async function RedirectPage({ params }) {
  // params এখন একটি Promise, তাই await করতে হবে
  const { shortCode } = await params;

  return (
    <div>
      <p>Redirecting...</p>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.location.href = '${BASE_URL}/api/check/${shortCode}/';
          `,
        }}
      />
    </div>
  );
}

