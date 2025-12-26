

// export default function RedirectPage({ params }) {
//   const { shortCode } = params;

//   return (
//     <html>
//       <body>
//         <p>Redirecting...</p>
//         <script
//           dangerouslySetInnerHTML={{
//             __html: `
//               window.location.href = 'https://skkhandokar22.pythonanywhere.com/api/check/${shortCode}/';
//             `,
//           }}
//         />
//       </body>
//     </html>
//   );
// }







export default async function RedirectPage({ params }) {
  // params এখন একটি Promise, তাই await করতে হবে
  const { shortCode } = await params;

  return (
    <div>
      <p>Redirecting...</p>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.location.href = 'https://skkhandokar22.pythonanywhere.com/api/check/${shortCode}/';
          `,
        }}
      />
    </div>
  );
}

