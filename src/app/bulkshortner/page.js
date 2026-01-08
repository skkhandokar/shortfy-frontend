// "use client";
// import { useState } from "react";
// import axios from "axios";

// export default function BulkShortener() {
//   const [input, setInput] = useState("");
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async () => {
//     const urls = input
//       .split("\n")
//       .map(u => u.trim())
//       .filter(Boolean);

//     if (urls.length === 0) return;

//     setLoading(true);
//     try {
//       const res = await axios.post(
//         "http://127.0.0.1:8000/api/bulk-create/",
//         { urls }
//       );
//       setResults(res.data.data);
//     } catch (err) {
//       alert("Bulk shortening failed");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">
//         Bulk URL Shortener
//       </h1>

//       <textarea
//         rows={8}
//         className="w-full border rounded p-3"
//         placeholder="Paste one long URL per line"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//       />

//       <button
//         onClick={handleSubmit}
//         disabled={loading}
//         className="mt-4 bg-black text-white px-6 py-2 rounded"
//       >
//         {loading ? "Processing..." : "Shorten All"}
//       </button>

//       {results.length > 0 && (
//         <div className="mt-6 overflow-x-auto">
//           <table className="w-full border">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="p-2 border">Original URL</th>
//                 <th className="p-2 border">Short URL</th>
//                 <th className="p-2 border">Clicks</th>
//               </tr>
//             </thead>
//             <tbody>
//               {results.map((item) => (
//                 <tr key={item.id}>
//                   <td className="p-2 border break-all">
//                     {item.original_url}
//                   </td>
//                   <td className="p-2 border">
//                     <a
//                       href={`https://shortfy.xyz/${item.short_code}`}
//                       target="_blank"
//                       className="text-blue-600"
//                     >
//                       shortfy.xyz/{item.short_code}
//                     </a>
//                   </td>
//                   <td className="p-2 border text-center">
//                     {item.clicks}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }



import BulkShortener from "../components/bulkshortnercmponats";

export default function BulkPage() {
  return <BulkShortener />;
}
