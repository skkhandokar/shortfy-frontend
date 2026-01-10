





// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import axios from 'axios';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
// } from 'chart.js';
// import { Pie, Bar } from 'react-chartjs-2';
// import { Tab } from '@headlessui/react';

// ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

// const colors = [
//   '#FF6384', '#89a5b7ff', '#FFCE56',
//   '#66bb6a', '#ab47bc', '#ffa726',
//   '#8d6e63', '#42a5f5', '#f44336',
//   '#008080', '#800080', '#4c1e0eff', '#2E8B57',
//   '#ca6379ff', '#466376ff', '#716b5cff', '#17d375ff',
//   '#335871ff', '#b43131ff', '#df3b04ff', '#cf7acfff',
//   '#dca593ff', '#081b10ff', '#c6a3c1ff', '#aa67aa8d',
//   '#f76e40ff', '#599134ff', '#ffffffff', '#000000ff',
//   '#a5a5a5ff', '#75ab8cff', '#04f900ff', '#fa04faff',
//   '#6600ffff', '#006affff', '#7fcdc1ff', '#d99fd9ff',
//   '#6c67a3ff', '#945f5fff',
// ];

// function topNWithOthers(data, n = 10) {
//   if (!data) return [];
//   if (data.length <= n) return data;
//   const top = data.slice(0, n);
//   const others = data.slice(n);
//   const othersSum = others.reduce((acc, cur) => acc + cur.percentage, 0);
//   return [...top, { label: 'Others', percentage: parseFloat(othersSum.toFixed(2)) }];
// }

// const PieChart = ({ title, data }) => {
//   if (!data || data.length === 0) return <p className="text-center">No data available.</p>;

//   const chartData = {
//     labels: data.map((d) => d.label),
//     datasets: [
//       {
//         data: data.map((d) => d.percentage),
//         backgroundColor: colors.slice(0, data.length),
//       },
//     ],
//   };

//   return (
//     <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-xl p-4">
//       <h3 className="text-center font-semibold mb-4">{title}</h3>
//       <Pie data={chartData} />
//     </div>
//   );
// };

// const BarChart = ({ title, data }) => {
//   if (!data || data.length === 0) return <p className="text-center">No data available.</p>;

//   const chartData = {
//     labels: data.map((d) => d.label),
//     datasets: [
//       {
//         label: title,
//         data: data.map((d) => d.percentage),
//         backgroundColor: colors.slice(0, data.length),
//       },
//     ],
//   };

//   return (
//     <div className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-xl p-4">
//       <h3 className="text-center font-semibold mb-4">{title}</h3>
//       <Bar data={chartData} options={{ indexAxis: 'y' }} />
//     </div>
//   );
// };

// export default function AnalyticsPage() {
//   const params = useParams();
//   const shortCode = params.shortCode;

//   const [analytics, setAnalytics] = useState({
//     country: [],
//     browser: [],
//     device: [],
//     os: [],
//     platform: [],
//   });
//   const [timeframe, setTimeframe] = useState('24h');
//   const [loading, setLoading] = useState(true);
//   const [selectedIndex, setSelectedIndex] = useState(0);

//   const timeOptions = ['24h', '7d', '30d', '1yr', 'all'];

//   const fetchAnalytics = async () => {
//     if (!shortCode) return;
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `https://skkhandokar22.pythonanywhere.com/api/analytics/${shortCode}/?time=${timeframe}`
//       );
//       setAnalytics(res.data);
//     } catch (err) {
//       console.error(err);
//       setAnalytics({
//         country: [],
//         browser: [],
//         device: [],
//         os: [],
//         platform: [],
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAnalytics();
//   }, [shortCode, timeframe]);

//   const countryData = topNWithOthers(analytics.country, 30);
//   const browserData = analytics.browser || [];
//   const deviceData = analytics.device || [];
//   const osData = analytics.os || [];
//   const platformData = analytics.platform || [];

//   return (
//     <div className="p-6 min-h-screen bg-gray-50">
//       <h1 className="text-3xl font-bold text-center mb-6">
//         Analytics for: <span className="text-blue-600">{shortCode}</span>
//       </h1>

//       {/* ✅ Timeframe selector */}
//       <div className="flex justify-center mb-6 space-x-2 flex-wrap">
//         {timeOptions.map((tf) => (
//           <button
//             key={tf}
//             className={`px-4 py-2 rounded-lg font-medium ${
//               timeframe === tf
//                 ? 'bg-blue-600 text-white'
//                 : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
//             }`}
//             onClick={() => setTimeframe(tf)}
//           >
//             {tf.toUpperCase()}
//           </button>
//         ))}
//       </div>

//       {loading ? (
//         <p className="text-center text-gray-500 text-lg animate-pulse">Loading analytics...</p>
//       ) : (
//         <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
//           <Tab.List className="flex justify-center space-x-4 mb-8 flex-wrap">
//             {['Country', 'Browser', 'Device', 'OS', 'Platform'].map((tabName) => (
//               <Tab
//                 key={tabName}
//                 className={({ selected }) =>
//                   `px-4 py-2 rounded-lg font-semibold cursor-pointer ${
//                     selected
//                       ? 'bg-blue-600 text-white'
//                       : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
//                   }`
//                 }
//               >
//                 {tabName}
//               </Tab>
//             ))}
//           </Tab.List>

//           <Tab.Panels>
//             <Tab.Panel>
//               <BarChart title="Country % Clicks" data={countryData} />
//             </Tab.Panel>
//             <Tab.Panel>
//               <PieChart title="Browser % Clicks" data={browserData} />
//             </Tab.Panel>
//             <Tab.Panel>
//               <PieChart title="Device % Clicks" data={deviceData} />
//             </Tab.Panel>
//             <Tab.Panel>
//               <PieChart title="OS % Clicks" data={osData} />
//             </Tab.Panel>
//             <Tab.Panel>
//               <PieChart title="Platform % Clicks" data={platformData} />
//             </Tab.Panel>
//           </Tab.Panels>
//         </Tab.Group>
//       )}
//     </div>
//   );
// }















// 'use client';

// import { useEffect, useState, useRef } from 'react';
// import { useParams } from 'next/navigation';
// import axios from 'axios';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   PointElement,
//   LineElement,
// } from 'chart.js';
// import { Pie, Bar, Line } from 'react-chartjs-2';
// import { Tab } from '@headlessui/react';
// import { CSVLink } from 'react-csv';

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   PointElement,
//   LineElement
// );

// const colors = [
//   '#FF6384', '#89a5b7ff', '#FFCE56', '#66bb6a', '#ab47bc', '#ffa726',
//   '#8d6e63', '#42a5f5', '#f44336', '#008080', '#800080', '#4c1e0eff',
//   '#2E8B57', '#ca6379ff', '#466376ff', '#716b5cff', '#17d375ff',
//   '#335871ff', '#b43131ff', '#df3b04ff', '#cf7acfff', '#dca593ff',
//   '#081b10ff', '#c6a3c1ff', '#aa67aa8d', '#f76e40ff', '#599134ff',
//   '#ffffffff', '#000000ff', '#a5a5a5ff', '#75ab8cff', '#04f900ff',
//   '#fa04faff', '#6600ffff', '#006affff', '#7fcdc1ff', '#d99fd9ff',
//   '#6c67a3ff', '#945f5fff',
// ];

// function topNWithOthers(data, n = 10) {
//   if (!data) return [];
//   if (data.length <= n) return data;
//   const top = data.slice(0, n);
//   const others = data.slice(n);
//   const othersSum = others.reduce((acc, cur) => acc + cur.percentage, 0);
//   return [...top, { label: 'Others', percentage: parseFloat(othersSum.toFixed(2)) }];
// }

// const PieChart = ({ title, data }) => {
//   if (!data || data.length === 0) return <p className="text-center">No data available.</p>;

//   const chartData = {
//     labels: data.map((d) => d.label),
//     datasets: [
//       {
//         data: data.map((d) => d.percentage),
//         backgroundColor: colors.slice(0, data.length),
//       },
//     ],
//   };

//   return (
//     <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-xl p-4 mb-4">
//       <h3 className="text-center font-semibold mb-4">{title}</h3>
//       <Pie data={chartData} />
//     </div>
//   );
// };

// const BarChart = ({ title, data }) => {
//   if (!data || data.length === 0) return <p className="text-center">No data available.</p>;

//   const chartData = {
//     labels: data.map((d) => d.label),
//     datasets: [
//       {
//         label: title,
//         data: data.map((d) => d.percentage),
//         backgroundColor: colors.slice(0, data.length),
//       },
//     ],
//   };

//   return (
//     <div className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-xl p-4 mb-4">
//       <h3 className="text-center font-semibold mb-4">{title}</h3>
//       <Bar data={chartData} options={{ indexAxis: 'y' }} />
//     </div>
//   );
// };

// const LineChart = ({ title, data }) => {
//   if (!data || data.length === 0) return <p className="text-center">No data available.</p>;

//   const chartData = {
//     labels: data.map((d) => d.date),
//     datasets: [
//       {
//         label: title,
//         data: data.map((d) => d.clicks),
//         borderColor: '#3b82f6',
//         backgroundColor: '#93c5fd88',
//         tension: 0.3,
//         fill: true,
//       },
//     ],
//   };

//   return (
//     <div className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-xl p-4 mb-4">
//       <h3 className="text-center font-semibold mb-4">{title}</h3>
//       <Line data={chartData} />
//     </div>
//   );
// };

// export default function AnalyticsPage() {
//   const params = useParams();
//   const shortCode = params.shortCode;

//   const [analytics, setAnalytics] = useState({
//     country: [],
//     browser: [],
//     device: [],
//     os: [],
//     platform: [],
//   });
//   const [dailyClicks, setDailyClicks] = useState([]);
//   const [referrerData, setReferrerData] = useState([]);
//   const [botData, setBotData] = useState([]);
//   const [timeframe, setTimeframe] = useState('24h');
//   const [loading, setLoading] = useState(true);
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const wsRef = useRef(null);

//   const timeOptions = ['24h', '7d', '30d', '1yr', 'all'];

//   const fetchAnalytics = async () => {
//     if (!shortCode) return;
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `https://skkhandokar22.pythonanywhere.com/api/analytics/${shortCode}/?time=${timeframe}`
//       );
//       setAnalytics(res.data);

//       // Referrer & bot
//       const refBotRes = await axios.get(
//         `https://skkhandokar22.pythonanywhere.com/api/analytics/${shortCode}/extra/`
//       );
//       setReferrerData(refBotRes.data.referrer || []);
//       setBotData(refBotRes.data.bot || []);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchDailyClicks = async () => {
//     if (!shortCode) return;
//     try {
//       const dailyRes = await axios.get(
//         `https://skkhandokar22.pythonanywhere.com/api/analytics/${shortCode}/daily/`
//       );
//       setDailyClicks(dailyRes.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchAnalytics();
//     fetchDailyClicks();

//     // WebSocket for real-time clicks
//     const ws = new WebSocket(`wss://skkhandokar22.pythonanywhere.com/ws/analytics/${shortCode}/`);
//     ws.onmessage = (event) => {
//       const msg = JSON.parse(event.data);
//       if (msg.type === 'click') {
//         // Only update daily clicks on real-time
//         fetchDailyClicks();
//       }
//     };
//     wsRef.current = ws;

//     return () => ws.close();
//   }, [shortCode, timeframe]);

//   const countryData = topNWithOthers(analytics.country, 30);
//   const browserData = analytics.browser || [];
//   const deviceData = analytics.device || [];
//   const osData = analytics.os || [];
//   const platformData = analytics.platform || [];

//   return (
//     <div className="p-6 min-h-screen bg-gray-50">
//       <h1 className="text-3xl font-bold text-center mb-6">
//         Analytics for: <span className="text-blue-600">{shortCode}</span>
//       </h1>

//       {/* Timeframe selector */}
//       <div className="flex justify-center mb-6 space-x-2 flex-wrap">
//         {timeOptions.map((tf) => (
//           <button
//             key={tf}
//             className={`px-4 py-2 rounded-lg font-medium ${
//               timeframe === tf
//                 ? 'bg-blue-600 text-white'
//                 : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
//             }`}
//             onClick={() => setTimeframe(tf)}
//           >
//             {tf.toUpperCase()}
//           </button>
//         ))}
//       </div>

//       {loading ? (
//         <p className="text-center text-gray-500 text-lg animate-pulse">Loading analytics...</p>
//       ) : (
//         <>
//           {/* CSV Export */}
//           {dailyClicks.length > 0 && (
//             <div className="flex justify-center mb-4">
//               <CSVLink
//                 data={dailyClicks}
//                 filename={`daily_clicks_${shortCode}.csv`}
//                 className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
//               >
//                 Export Daily Clicks CSV
//               </CSVLink>
//             </div>
//           )}

//           <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
//             <Tab.List className="flex justify-center space-x-4 mb-8 flex-wrap">
//               {[
//                 'Country',
//                 'Browser',
//                 'Device',
//                 'OS',
//                 'Platform',
//                 'Daily Clicks',
//                 'Referrer',
//                 'Bot vs Human',
//               ].map((tabName) => (
//                 <Tab
//                   key={tabName}
//                   className={({ selected }) =>
//                     `px-4 py-2 rounded-lg font-semibold cursor-pointer ${
//                       selected
//                         ? 'bg-blue-600 text-white'
//                         : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
//                     }`
//                   }
//                 >
//                   {tabName}
//                 </Tab>
//               ))}
//             </Tab.List>

//             <Tab.Panels>
//               <Tab.Panel>
//                 <BarChart title="Country % Clicks" data={countryData} />
//               </Tab.Panel>
//               <Tab.Panel>
//                 <PieChart title="Browser % Clicks" data={browserData} />
//               </Tab.Panel>
//               <Tab.Panel>
//                 <PieChart title="Device % Clicks" data={deviceData} />
//               </Tab.Panel>
//               <Tab.Panel>
//                 <PieChart title="OS % Clicks" data={osData} />
//               </Tab.Panel>
//               <Tab.Panel>
//                 <PieChart title="Platform % Clicks" data={platformData} />
//               </Tab.Panel>
//               <Tab.Panel>
//                 <LineChart title="Daily Click Trend" data={dailyClicks} />
//               </Tab.Panel>
//               <Tab.Panel>
//                 <PieChart title="Referrer % Clicks" data={referrerData} />
//               </Tab.Panel>
//               <Tab.Panel>
//                 <PieChart title="Bot vs Human" data={botData} />
//               </Tab.Panel>
//             </Tab.Panels>
//           </Tab.Group>
//         </>
//       )}
//     </div>
//   );
// }









// 'use client';

// import { useEffect, useState, useRef } from 'react';
// import { useParams } from 'next/navigation';
// import axios from 'axios';

// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   PointElement,
//   LineElement,
// } from 'chart.js';

// import { Pie, Bar, Line } from 'react-chartjs-2';
// import { Tab } from '@headlessui/react';
// import { CSVLink } from 'react-csv';

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   PointElement,
//   LineElement
// );

// /* ---------- Utils ---------- */

// const colors = [
//   '#2563eb', '#16a34a', '#dc2626', '#9333ea', '#f59e0b',
//   '#0d9488', '#db2777', '#4b5563', '#22c55e', '#e11d48'
// ];

// function topNWithOthers(data, n = 10) {
//   if (!data || data.length <= n) return data || [];
//   const top = data.slice(0, n);
//   const others = data.slice(n);
//   const sum = others.reduce((a, b) => a + b.percentage, 0);
//   return [...top, { label: 'Others', percentage: +sum.toFixed(2) }];
// }

// /* ---------- Charts ---------- */

// const PieChart = ({ title, data }) => {
//   if (!data || data.length === 0)
//     return <p className="text-center text-gray-500">No data</p>;

//   return (
//     <div className="bg-white rounded-xl shadow p-3 sm:p-5 overflow-x-auto">
//       <h3 className="text-center font-semibold mb-3">{title}</h3>
//       <Pie
//         data={{
//           labels: data.map(d => d.label),
//           datasets: [{
//             data: data.map(d => d.percentage),
//             backgroundColor: colors,
//           }],
//         }}
//       />
//     </div>
//   );
// };

// const BarChart = ({ title, data }) => {
//   if (!data || data.length === 0)
//     return <p className="text-center text-gray-500">No data</p>;

//   return (
//     <div className="bg-white rounded-xl shadow p-3 sm:p-5 overflow-x-auto">
//       <h3 className="text-center font-semibold mb-3">{title}</h3>
//       <Bar
//         options={{ indexAxis: 'y', responsive: true, maintainAspectRatio: false }}
//         data={{
//           labels: data.map(d => d.label),
//           datasets: [{
//             label: title,
//             data: data.map(d => d.percentage),
//             backgroundColor: colors,
//           }],
//         }}
//         height={400}
//       />
//     </div>
//   );
// };

// const LineChart = ({ data }) => {
//   if (!data || data.length === 0)
//     return <p className="text-center text-gray-500">No daily data</p>;

//   return (
//     <div className="bg-white rounded-xl shadow p-3 sm:p-5 overflow-x-auto">
//       <h3 className="text-center font-semibold mb-4">Daily Click Trend</h3>
//       <Line
//         data={{
//           labels: data.map(d => d.date),
//           datasets: [{
//             label: 'Clicks',
//             data: data.map(d => d.clicks),
//             borderColor: '#2563eb',
//             backgroundColor: '#93c5fd88',
//             fill: true,
//             tension: 0.3,
//           }],
//         }}
//       />
//     </div>
//   );
// };

// /* ---------- Page ---------- */

// export default function AnalyticsPage() {
//   const { shortCode } = useParams();

//   const [analytics, setAnalytics] = useState({});
//   const [dailyClicks, setDailyClicks] = useState([]);
//   const [referrerData, setReferrerData] = useState([]);
//   const [botData, setBotData] = useState([]);
//   const [timeframe, setTimeframe] = useState('24h');
//   const [loading, setLoading] = useState(true);

//   const wsRef = useRef(null);
//   const timeOptions = ['24h', '7d', '30d', '1yr', 'all'];

//   useEffect(() => {
//     if (!shortCode) return;

//     const loadData = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(
//           `https://skkhandokar22.pythonanywhere.com/api/analytics/${shortCode}/?time=${timeframe}`
//         );
//         setAnalytics(res.data);

//         const daily = await axios.get(
//           `https://skkhandokar22.pythonanywhere.com/api/analytics/${shortCode}/daily/`
//         );
//         setDailyClicks(daily.data);

//         try {
//           const extra = await axios.get(
//             `https://skkhandokar22.pythonanywhere.com/api/analytics/${shortCode}/extra/`
//           );
//           setReferrerData(extra.data.referrer || []);
//           setBotData(extra.data.bot || []);
//         } catch {
//           setReferrerData([]);
//           setBotData([]);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();

//     const ws = new WebSocket(
//       `wss://skkhandokar22.pythonanywhere.com/ws/analytics/${shortCode}/`
//     );
//     ws.onmessage = () => loadData();
//     wsRef.current = ws;

//     return () => ws.close();
//   }, [shortCode, timeframe]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="animate-pulse text-gray-500">Loading analytics…</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 px-3 py-4 sm:px-6 sm:py-6">
//       <h1 className="text-xl sm:text-3xl font-bold text-center mb-6 break-all">
//         Analytics: <span className="text-blue-600">{shortCode}</span>
//       </h1>

//       {/* Timeframe */}
//       <div className="flex justify-center gap-2 mb-6 flex-wrap text-sm sm:text-base">
//         {timeOptions.map(t => (
//           <button
//             key={t}
//             onClick={() => setTimeframe(t)}
//             className={`px-3 py-2 rounded-lg font-medium ${
//               t === timeframe
//                 ? 'bg-blue-600 text-white'
//                 : 'bg-gray-300 hover:bg-gray-400'
//             }`}
//           >
//             {t.toUpperCase()}
//           </button>
//         ))}
//       </div>

//       {/* CSV */}
//       <div className="flex justify-center mb-4 px-2">
//         <CSVLink
//           data={dailyClicks}
//           filename={`daily_clicks_${shortCode}.csv`}
//           className="bg-green-600 text-white px-4 py-2 rounded-lg w-full sm:w-auto text-center"
//         >
//           Export Daily Clicks CSV
//         </CSVLink>
//       </div>

//       {/* Daily Graph */}
//       <div className="max-w-5xl mx-auto mb-10 px-1 sm:px-0">
//         <LineChart data={dailyClicks} />
//       </div>

//       {/* Tabs */}
//       <Tab.Group>
//         <Tab.List className="flex gap-3 mb-6 overflow-x-auto px-2 sm:justify-center">
//           {['Country','Browser','Device','OS','Platform','Referrer','Bot vs Human']
//             .map(tab => (
//               <Tab
//                 key={tab}
//                 className={({ selected }) =>
//                   `px-3 py-2 sm:px-4 rounded-lg font-semibold text-sm sm:text-base whitespace-nowrap ${
//                     selected
//                       ? 'bg-blue-600 text-white'
//                       : 'bg-gray-300 hover:bg-gray-400'
//                   }`
//                 }
//               >
//                 {tab}
//               </Tab>
//             ))}
//         </Tab.List>

//         <Tab.Panels className="max-w-5xl mx-auto space-y-4 sm:space-y-6 px-1 sm:px-0">
//           <Tab.Panel>
//             <BarChart
//               title="Country Click %"
//               data={topNWithOthers(analytics.country, 30)}
//             />
//           </Tab.Panel>
//           <Tab.Panel><PieChart title="Browser %" data={analytics.browser} /></Tab.Panel>
//           <Tab.Panel><PieChart title="Device %" data={analytics.device} /></Tab.Panel>
//           <Tab.Panel><PieChart title="OS %" data={analytics.os} /></Tab.Panel>
//           <Tab.Panel><PieChart title="Platform %" data={analytics.platform} /></Tab.Panel>
//           <Tab.Panel><PieChart title="Referrer %" data={referrerData} /></Tab.Panel>
//           <Tab.Panel><PieChart title="Bot vs Human" data={botData} /></Tab.Panel>
//         </Tab.Panels>
//       </Tab.Group>
//     </div>
//   );
// }










// 'use client';

// import { useEffect, useState, useRef } from 'react';
// import { useParams } from 'next/navigation';
// import axios from 'axios';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   PointElement,
//   LineElement,
// } from 'chart.js';
// import { Pie, Bar, Line } from 'react-chartjs-2';
// import { Tab } from '@headlessui/react';
// import { CSVLink } from 'react-csv';

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   PointElement,
//   LineElement
// );

// const COLORS = [
//   '#FF6384', '#89a5b7ff', '#FFCE56',
//   '#66bb6a', '#ab47bc', '#ffa726',
//   '#8d6e63', '#42a5f5', '#f44336',
//   '#008080', '#800080', '#4c1e0eff', '#2E8B57',
//   '#ca6379ff', '#466376ff', '#716b5cff', '#17d375ff',
//   '#335871ff', '#b43131ff', '#df3b04ff', '#cf7acfff',
//   '#dca593ff', '#081b10ff', '#c6a3c1ff', '#aa67aa8d',
//   '#f76e40ff', '#599134ff', '#ffffffff', '#000000ff',
//   '#a5a5a5ff', '#75ab8cff', '#04f900ff', '#fa04faff',
//   '#6600ffff', '#006affff', '#7fcdc1ff', '#d99fd9ff',
//   '#6c67a3ff', '#945f5fff',
// ];

// function timeAgo(date) {
//   if (!date) return 'No clicks yet';
//   const sec = Math.floor((new Date() - new Date(date)) / 1000);
//   if (sec < 10) return 'just now';
//   if (sec < 60) return `${sec}s ago`;
//   const min = Math.floor(sec / 60);
//   if (min < 60) return `${min}m ago`;
//   const hr = Math.floor(min / 60);
//   if (hr < 24) return `${hr}h ago`;
//   return `${Math.floor(hr / 24)}d ago`;
// }

// export default function AnalyticsPage() {
//   const { shortCode } = useParams();

//   const [analytics, setAnalytics] = useState({});
//   const [dailyClicks, setDailyClicks] = useState([]);
//   const [totalClicks, setTotalClicks] = useState(0);
//   const [lastClick, setLastClick] = useState(null);
//   const [timeframe, setTimeframe] = useState('24h');
//   const [loading, setLoading] = useState(true);

//   const wsRef = useRef(null);

//   const fetchAnalytics = async () => {
//     if (!shortCode) return;
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `https://skkhandokar22.pythonanywhere.com/api/analytics/${shortCode}/?time=${timeframe}`
//       );

//       setAnalytics(res.data);

//       const total =
//         (res.data.country || []).reduce((s, i) => s + i.percentage, 0) || 0;
//       setTotalClicks(Math.round(total));

//       const dailyRes = await axios.get(
//         `https://skkhandokar22.pythonanywhere.com/api/analytics/${shortCode}/daily/`
//       );
//       setDailyClicks(dailyRes.data);

//       if (dailyRes.data.length) {
//         setLastClick(dailyRes.data[dailyRes.data.length - 1].date);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAnalytics();

//     const ws = new WebSocket(
//       `wss://skkhandokar22.pythonanywhere.com/ws/analytics/${shortCode}/`
//     );

//     ws.onmessage = () => {
//       setLastClick(new Date().toISOString());
//       fetchAnalytics();
//     };

//     wsRef.current = ws;
//     return () => ws.close();
//   }, [shortCode, timeframe]);

//   const timeOptions = ['24h', '7d', '30d', '1yr', 'all'];

//   return (
//     <div className="min-h-screen bg-[#f9fafb] text-gray-900 p-6 pt-28">

//       <h1 className="text-3xl font-bold text-center mb-10 tracking-tight">
//   Analytics · <span className="text-gray-700">{shortCode}</span>
// </h1>

//       {/* Summary */}
//       {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
//         <div className="bg-white border rounded-xl p-6 text-center">
//           <p className="text-sm text-gray-500">Total Clicks</p>
//           <p className="text-4xl font-bold text-black">{totalClicks}</p>
//         </div>
//         <div className="bg-white border rounded-xl p-6 text-center">
//           <p className="text-sm text-gray-500">Last Click</p>
//           <p className="text-lg font-semibold text-gray-800">
//             {timeAgo(lastClick)}
//           </p>
//         </div>
//       </div> */}

//       {/* Daily Click Graph – ALWAYS SHOW */}
//       <div className="bg-white border rounded-xl p-6 max-w-5xl mx-auto mb-10">
//        {dailyClicks.length > 0 && (
//         <div className="flex justify-center mb-6">
//           <CSVLink
//             data={dailyClicks}
//             filename={`daily_clicks_${shortCode}.csv`}
//             className="px-4 py-2 bg-black text-white rounded-md text-sm"
//           >
//             Download Daily Click CSV
//           </CSVLink>
//         </div>
//       )}
//         <h2 className="text-lg font-semibold mb-4 text-center">
//           Daily Click Trend
//         </h2>
//         <Line
//           data={{
//             labels: dailyClicks.map((i) => i.date),
//             datasets: [
//               {
//                 label: 'Clicks',
//                 data: dailyClicks.map((i) => i.clicks),
//                 borderColor: '#000',
//                 backgroundColor: '#00000015',
//                 tension: 0.3,
//                 fill: true,
//               },
//             ],
//           }}
//         />
//       </div>

//       {/* Time Filter */}
//       <div className="flex justify-center gap-2 mb-8 flex-wrap">
//         {timeOptions.map((t) => (
//           <button
//             key={t}
//             onClick={() => setTimeframe(t)}
//             className={`px-4 py-2 rounded-md border text-sm ${
//               timeframe === t
//                 ? 'bg-black text-white'
//                 : 'bg-white hover:bg-gray-100'
//             }`}
//           >
//             {t.toUpperCase()}
//           </button>
//         ))}
//       </div>

//       {/* Other analytics */}
//       <Tab.Group>
//         <Tab.List className="flex justify-center gap-3 mb-6 flex-wrap">
//           {['Country', 'Browser', 'Device', 'OS', 'Platform'].map((t) => (
//             <Tab
//               key={t}
//               className={({ selected }) =>
//                 `px-4 py-2 text-sm rounded-md border ${
//                   selected
//                     ? 'bg-black text-white'
//                     : 'bg-white hover:bg-gray-100'
//                 }`
//               }
//             >
//               {t}
//             </Tab>
//           ))}
//         </Tab.List>

//         <Tab.Panels>
//           {['country', 'browser', 'device', 'os', 'platform'].map((key) => (
//             <Tab.Panel key={key}>
//               <Bar
//                 data={{
//                   labels: analytics[key]?.map((i) => `${i.label} ${i.count} Clicks`),
//                   datasets: [
//                     {
//                       data: analytics[key]?.map((i) => i.count),
//                       backgroundColor: COLORS,
//                     },
//                   ],
//                 }}
//               />
//             </Tab.Panel>
//           ))}
//         </Tab.Panels>
//       </Tab.Group>
//     </div>
//   );
// }



'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { Tab } from '@headlessui/react';
import { CSVLink } from 'react-csv';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

const COLORS = [
  '#FF6384', '#89a5b7ff', '#FFCE56',
  '#66bb6a', '#ab47bc', '#ffa726',
  '#42a5f5', '#f44336',
];

/* ---------------- HELPERS ---------------- */

function timeAgo(date) {
  if (!date) return 'No clicks yet';
  const sec = Math.floor((new Date() - new Date(date)) / 1000);
  if (sec < 10) return 'just now';
  if (sec < 60) return `${sec}s ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  return `${Math.floor(hr / 24)}d ago`;
}

function averageClicksPerDay(data) {
  if (!data?.length) return 0;
  const total = data.reduce((s, i) => s + i.clicks, 0);
  return Math.round(total / data.length);
}

function peakDay(data) {
  if (!data?.length) return null;
  return data.reduce((max, cur) =>
    cur.clicks > max.clicks ? cur : max
  );
}

/* ---------------- COMPONENT ---------------- */

export default function AnalyticsPage() {
  const { shortCode } = useParams();

  const [analytics, setAnalytics] = useState({});
  const [dailyClicks, setDailyClicks] = useState([]);
  const [totalClicks, setTotalClicks] = useState(0);
  const [lastClick, setLastClick] = useState(null);
  const [timeframe, setTimeframe] = useState('24h');
  const [loading, setLoading] = useState(true);

  const wsRef = useRef(null);

  const fetchAnalytics = async () => {
    if (!shortCode) return;
    setLoading(true);

    try {
      const res = await axios.get(
        `https://skkhandokar22.pythonanywhere.com/api/analytics/${shortCode}/?time=${timeframe}`
      );

      setAnalytics(res.data);

      // ✅ Time based total clicks
      const total =
        Object.values(res.data || {})
          .flat()
          .reduce((sum, item) => sum + (item.count || 0), 0);

      setTotalClicks(total);

      const dailyRes = await axios.get(
        `https://skkhandokar22.pythonanywhere.com/api/analytics/${shortCode}/daily/?time=${timeframe}`
      );

      setDailyClicks(dailyRes.data);

      // ✅ Last click
      if (dailyRes.data?.length) {
        setLastClick(dailyRes.data[dailyRes.data.length - 1].date);
      } else {
        setLastClick(null);
      }

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();

    const ws = new WebSocket(
      `wss://skkhandokar22.pythonanywhere.com/ws/analytics/${shortCode}/`
    );

    ws.onmessage = fetchAnalytics;
    wsRef.current = ws;

    return () => ws.close();
  }, [shortCode, timeframe]);

  const timeOptions = ['60m', '24h', '7d', '30d', '1yr', 'all'];
  const peak = peakDay(dailyClicks);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 px-3 sm:px-6 pt-24">

      <h1 className="text-xl sm:text-3xl font-bold text-center mb-8 break-all">
        Analytics · <span className="text-gray-700">{shortCode}</span>
      </h1>

      {/* ================= GA STYLE SUMMARY ================= */}
      <section
        aria-label="Google Analytics summary"
        className="max-w-6xl mx-auto mb-10"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

          <div className="bg-white border rounded-xl p-4">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Total Clicks
            </p>
            <p className="text-2xl sm:text-3xl font-bold mt-2">
              {totalClicks}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {timeframe.toUpperCase()}
            </p>
          </div>

          <div className="bg-white border rounded-xl p-4">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Avg / Day
            </p>
            <p className="text-2xl sm:text-3xl font-bold mt-2">
              {averageClicksPerDay(dailyClicks)}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Based on trend
            </p>
          </div>

          <div className="bg-white border rounded-xl p-4">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Peak Day
            </p>
            <p className="text-lg sm:text-xl font-semibold mt-2">
              {peak?.date || '—'}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {peak?.clicks || 0} clicks
            </p>
          </div>

          <div className="bg-white border rounded-xl p-4">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Last Click
            </p>
            <p className="text-lg sm:text-xl font-semibold mt-2">
              {timeAgo(lastClick)}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Live update
            </p>
          </div>

        </div>
      </section>

      {/* ================= DAILY GRAPH ================= */}
      <div className="bg-white border rounded-xl p-4 sm:p-6 max-w-5xl mx-auto mb-8">
        {dailyClicks.length > 0 && (
          <div className="flex justify-center mb-4">
            <CSVLink
              data={dailyClicks}
              filename={`daily_clicks_${shortCode}.csv`}
              className="px-4 py-2 bg-black text-white rounded-md text-xs sm:text-sm"
            >
              Download CSV
            </CSVLink>
          </div>
        )}

        <h2 className="text-sm sm:text-lg font-semibold mb-4 text-center">
          Daily Click Trend
        </h2>

        <div className="relative h-[260px] sm:h-[360px]">
          <Line
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
            }}
            data={{
              labels: dailyClicks.map(i => i.date),
              datasets: [
                {
                  data: dailyClicks.map(i => i.clicks),
                  borderColor: '#000',
                  backgroundColor: '#00000020',
                  tension: 0.35,
                  fill: true,
                },
              ],
            }}
          />
        </div>
      </div>

      {/* ================= TIME FILTER ================= */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {timeOptions.map(t => (
          <button
            key={t}
            onClick={() => setTimeframe(t)}
            className={`px-3 py-1.5 rounded-md text-xs sm:text-sm border transition ${
              timeframe === t
                ? 'bg-black text-white'
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ================= OTHER ANALYTICS ================= */}
      <Tab.Group>
        <Tab.List className="flex flex-wrap justify-center gap-2 mb-6">
          {['Country', 'Browser', 'Device', 'OS', 'Platform'].map(t => (
            <Tab
              key={t}
              className={({ selected }) =>
                `px-3 py-1.5 text-xs sm:text-sm rounded-md border ${
                  selected
                    ? 'bg-black text-white'
                    : 'bg-white hover:bg-gray-100'
                }`
              }
            >
              {t}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="max-w-5xl mx-auto bg-white border rounded-xl p-4 sm:p-6">
          {['country', 'browser', 'device', 'os', 'platform'].map(key => (
            <Tab.Panel key={key}>
              <div className="relative h-[300px] sm:h-[420px]">
                <Bar
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis:
                      typeof window !== 'undefined' && window.innerWidth < 640
                        ? 'y'
                        : 'x',
                    plugins: { legend: { display: false } },
                  }}
                  data={{
                    labels: analytics[key]?.map(i => i.label),
                    datasets: [
                      {
                        data: analytics[key]?.map(i => i.count),
                        backgroundColor: COLORS,
                      },
                    ],
                  }}
                />
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>

    </div>
  );
}
