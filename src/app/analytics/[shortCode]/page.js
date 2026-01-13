





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
// import { Bar, Line } from 'react-chartjs-2';
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
//   '#42a5f5', '#f44336',
//   '#008080', '#335871ff', '#b43131ff', '#df3b04ff', '#cf7acfff',
//   '#dca593ff', '#081b10ff', '#c6a3c1ff','#800080', '#4c1e0eff', '#2E8B57',
//   '#FF6384', '#89a5b7ff', '#FFCE56',
//   '#66bb6a', '#ab47bc', '#ffa726',
//   '#42a5f5', '#f44336', '#ca6379ff', '#466376ff', '#716b5cff', '#17d375ff',
//    '#aa67aa8d',
//   '#f76e40ff', '#599134ff', '#ffffffff', '#000000ff',
//   '#a5a5a5ff', '#75ab8cff', '#04f900ff', '#fa04faff',
//   '#6600ffff', '#006affff', '#7fcdc1ff', '#d99fd9ff',
//   '#6c67a3ff', '#945f5fff',
//   '#FF6384', '#89a5b7ff', '#FFCE56',
//   '#66bb6a', '#ab47bc', '#ffa726',
//   '#8d6e63', 
// ];

// /* ---------------- HELPERS ---------------- */

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

// function averageClicksPerDay(data) {
//   if (!data?.length) return 0;
//   const total = data.reduce((s, i) => s + i.clicks, 0);
//   return Math.round(total / data.length);
// }

// function peakDay(data) {
//   if (!data?.length) return null;
//   return data.reduce((max, cur) =>
//     cur.clicks > max.clicks ? cur : max
//   );
// }

// /* ---------------- COMPONENT ---------------- */

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

//       // ✅ Total clicks based on country
//       const total = res.data.country?.reduce((sum, i) => sum + (i.count || 0), 0) || 0;
//       setTotalClicks(total);

//       // Daily clicks for trend chart
//       const dailyRes = await axios.get(
//         `https://skkhandokar22.pythonanywhere.com/api/daily/${shortCode}/analytics/?time=${timeframe}`
//       );

//       setDailyClicks(dailyRes.data);

//       setLastClick(res.data.last_click_time);

//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAnalytics();

//     const ws = new WebSocket(
//       `wss://skkhandokar22.pythonanywhere.com/ws/analytics/${shortCode}/`
//     );

//     ws.onmessage = fetchAnalytics;
//     wsRef.current = ws;

//     return () => ws.close();
//   }, [shortCode, timeframe]);

//    if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
//       </div>
//     );
//   }

//   const timeOptions = ['60m', '24h', '7d', '30d', '1yr', 'all'];
//   const peak = peakDay(dailyClicks);

//   // ---------------- HELPERS FOR PERCENTAGE BARS ----------------
//   // ---------------- HELPERS FOR PERCENTAGE BARS ----------------
// const getBarData = (key) => {
//   const data = analytics[key] || [];
//   const total = data.reduce((sum, i) => sum + i.count, 0) || 1; // avoid div by 0
//   return {
//     labels: data.map(i => `${i.label} (${i.count})`),
//     datasets: [
//       {
//         data: data.map(i => (i.count / total) * 100), // percentage
//         backgroundColor: COLORS,
//       },
//     ],
//   };
// };


//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-900 px-3 sm:px-6 pt-24">

//       <h1 className="text-xl sm:text-3xl font-bold text-center mb-8 break-all">
//         Analytics · <span className="text-gray-700">{shortCode}</span>
//       </h1>

//       {/* ================= GA STYLE SUMMARY ================= */}
//       <section
//         aria-label="Google Analytics summary"
//         className="max-w-6xl mx-auto mb-10"
//       >
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

//           <div className="bg-white border rounded-xl p-4">
//             <p className="text-xs uppercase tracking-wide text-gray-500">
//               Total Clicks
//             </p>
//             <p className="text-2xl sm:text-3xl font-bold mt-2">
//               {totalClicks}
//             </p>
//             <p className="text-xs text-gray-400 mt-1">
//               {timeframe.toUpperCase()}
//             </p>
//           </div>

//           <div className="bg-white border rounded-xl p-4">
//             <p className="text-xs uppercase tracking-wide text-gray-500">
//               Avg / Day
//             </p>
//             <p className="text-2xl sm:text-3xl font-bold mt-2">
//               {averageClicksPerDay(dailyClicks)}
//             </p>
//             <p className="text-xs text-gray-400 mt-1">
//               Based on trend
//             </p>
//           </div>

//           <div className="bg-white border rounded-xl p-4">
//             <p className="text-xs uppercase tracking-wide text-gray-500">
//               Peak Day
//             </p>
//             <p className="text-lg sm:text-xl font-semibold mt-2">
//               {peak?.date || '—'}
//             </p>
//             <p className="text-xs text-gray-400 mt-1">
//               {peak?.clicks || 0} clicks
//             </p>
//           </div>

//           <div className="bg-white border rounded-xl p-4">
//             <p className="text-xs uppercase tracking-wide text-gray-500">
//               Last Click
//             </p>
//             <p className="text-lg sm:text-xl font-semibold mt-2">
//               {timeAgo(lastClick)}
//             </p>
//             <p className="text-xs text-gray-400 mt-1">
//               Live update
//             </p>
//           </div>

//         </div>
//       </section>

//       {/* ================= DAILY GRAPH ================= */}
//       <div className="bg-white border rounded-xl p-4 sm:p-6 max-w-5xl mx-auto mb-8">
//         {dailyClicks.length > 0 && (
//           <div className="flex justify-center mb-4">
//             <CSVLink
//               data={dailyClicks}
//               filename={`daily_clicks_${shortCode}.csv`}
//               className="px-4 py-2 bg-black text-white rounded-md text-xs sm:text-sm"
//             >
//               Download CSV
//             </CSVLink>
//           </div>
//         )}

//         <h2 className="text-sm sm:text-lg font-semibold mb-4 text-center">
//           Daily Click Trend
//         </h2>

//         <div className="relative h-[260px] sm:h-[360px]">
//           <Line
//             options={{
//               responsive: true,
//               maintainAspectRatio: false,
//               plugins: { legend: { display: false } },
//             }}
//             data={{
//               labels: dailyClicks.map(i => i.date),
//               datasets: [
//                 {
//                   data: dailyClicks.map(i => i.clicks),
//                   borderColor: '#000',
//                   backgroundColor: '#00000020',
//                   tension: 0.35,
//                   fill: true,
//                 },
//               ],
//             }}
//           />
//         </div>
//       </div>

//       {/* ================= TIME FILTER ================= */}
//       <div className="flex flex-wrap justify-center gap-2 mb-6">
//         {timeOptions.map(t => (
//           <button
//             key={t}
//             onClick={() => setTimeframe(t)}
//             className={`px-3 py-1.5 rounded-md text-xs sm:text-sm border transition ${
//               timeframe === t
//                 ? 'bg-black text-white'
//                 : 'bg-white hover:bg-gray-100'
//             }`}
//           >
//             {t.toUpperCase()}
//           </button>
//         ))}
//       </div>

//       {/* ================= OTHER ANALYTICS ================= */}
//       <Tab.Group>
//         <Tab.List className="flex flex-wrap justify-center gap-2 mb-6">
//           {['Country', 'Browser', 'Device', 'OS', 'Platform'].map(t => (
//             <Tab
//               key={t}
//               className={({ selected }) =>
//                 `px-3 py-1.5 text-xs sm:text-sm rounded-md border ${
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

//         <Tab.Panels className="max-w-5xl mx-auto bg-white border rounded-xl p-4 sm:p-6">
//           {['country', 'browser', 'device', 'os', 'platform'].map(key => (
//             <Tab.Panel key={key}>
//               <div className="relative h-[300px] sm:h-[420px]">
//                 <Bar
//                   options={{
//                     responsive: true,
//                     maintainAspectRatio: false,
//                     indexAxis:
//                       typeof window !== 'undefined' && window.innerWidth < 640
//                         ? 'y'
//                         : 'x',
//                     plugins: {
//                       legend: { display: false },
//                       tooltip: {
//                         callbacks: {
//                           label: function(context) {
//                             const item = analytics[key][context.dataIndex];
//                             return `${item.label}: ${item.count} clicks`;
//                           }
//                         }
//                       }
//                     },
//                     scales: {
//                       x: { beginAtZero: true, max: 100 },
//                       y: { beginAtZero: true },
//                     },
//                   }}
//                   data={getBarData(key)}
//                 />
//               </div>
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
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Tab } from '@headlessui/react';
import { CSVLink } from 'react-csv';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

/* ---------------- COLORS ---------------- */
const COLORS = [
  '#2563eb', '#dc2626', '#059669', '#7c3aed', '#ea580c',
  '#0f766e', '#9333ea', '#ca8a04', '#be123c', '#0284c7'
];

/* ---------------- HELPERS ---------------- */
function timeAgo(date) {
  if (!date) return 'No clicks yet';
  const sec = Math.floor((new Date() - new Date(date)) / 1000);
  if (sec < 60) return `${sec}s ago`;
  if (sec < 3600) return `${Math.floor(sec / 60)}m ago`;
  if (sec < 86400) return `${Math.floor(sec / 3600)}h ago`;
  return `${Math.floor(sec / 86400)}d ago`;
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

function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.max(1, Math.floor(value / 20));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(start);
      }
    }, 20);
    return () => clearInterval(timer);
  }, [value]);
  return <>{display}</>;
}

/* ---------------- MODAL ---------------- */
function DetailModal({ open, onClose, title, data }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white max-w-md w-full rounded-xl p-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-lg">{title}</h3>
          <button onClick={onClose} className="text-xl">×</button>
        </div>
        <ul className="space-y-2 max-h-72 overflow-y-auto">
          {data.map((i, idx) => (
            <li
              key={idx}
              className="flex justify-between text-sm border-b pb-1"
            >
              <span>{i.label}</span>
              <span className="font-medium">{i.count} clicks</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------------- PERCENTAGE LIST ---------------- */
function PercentageList({ data, onClickItem }) {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('desc');

  const filtered = (data || [])
    .filter(i => i.label.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (sort === 'desc' ? b.count - a.count : a.count - b.count));

  const total = filtered.reduce((s, i) => s + i.count, 0) || 1;

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border px-3 py-1.5 rounded-md text-sm w-full"
        />
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="border px-3 py-1.5 rounded-md text-sm"
        >
          <option value="desc">Top → Bottom</option>
          <option value="asc">Bottom → Top</option>
        </select>
      </div>

      <div className="space-y-3">
        {filtered.map((item, idx) => {
          const percent = ((item.count / total) * 100).toFixed(1);
          return (
            <div
              key={idx}
              onClick={() => onClickItem(item)}
              className="cursor-pointer group"
              title={`${item.label} • ${item.count} clicks • ${percent}%`}
            >
              <div className="flex justify-between text-sm mb-1">
                <span className="truncate font-medium">{item.label}</span>
                <span className="text-gray-600">
                  <AnimatedNumber value={Number(percent)} />%
                </span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${percent}%`,
                    backgroundColor: COLORS[idx % COLORS.length],
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

/* ---------------- MAIN COMPONENT ---------------- */
export default function AnalyticsPage() {
  const { shortCode } = useParams();
  const [analytics, setAnalytics] = useState({});
  const [dailyClicks, setDailyClicks] = useState([]);
  const [totalClicks, setTotalClicks] = useState(0);
  const [lastClick, setLastClick] = useState(null);
  const [timeframe, setTimeframe] = useState('24h');
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [modalTitle, setModalTitle] = useState('');

  const wsRef = useRef(null);

  /* ---------------- FETCH DATA ---------------- */
  const fetchAnalytics = async () => {
    if (!shortCode) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `https://skkhandokar22.pythonanywhere.com/api/analytics/${shortCode}/?time=${timeframe}`
      );
      setAnalytics(res.data);
      const total =
        res.data.country?.reduce((s, i) => s + i.count, 0) || 0;
      setTotalClicks(total);

      const dailyRes = await axios.get(
        `https://skkhandokar22.pythonanywhere.com/api/daily/${shortCode}/analytics/?time=${timeframe}`
      );
      setDailyClicks(dailyRes.data);
      setLastClick(res.data.last_click_time);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- WEBSOCKET ---------------- */
  useEffect(() => {
    fetchAnalytics();

    if (!shortCode) return;
    const ws = new WebSocket(
      `wss://skkhandokar22.pythonanywhere.com/ws/analytics/${shortCode}/`
    );

    ws.onmessage = (msg) => {
      // Whenever server sends data, re-fetch analytics
      fetchAnalytics();
    };

    wsRef.current = ws;

    return () => ws.close();
  }, [shortCode, timeframe]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-t-black rounded-full" />
      </div>
    );
  }

  const timeOptions = ['60m', '24h', '7d', '30d', '1yr', 'all'];
  const avg = averageClicksPerDay(dailyClicks);
  const peak = peakDay(dailyClicks);

  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-24">
      <h1 className="text-2xl font-bold text-center mb-6 break-all">
        Analytics · {shortCode}
      </h1>

      {/* SUMMARY */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-6xl mx-auto mb-8">
        <div className="bg-white border rounded-xl p-4">
          <p className="text-xs text-gray-500">Total Clicks</p>
          <p className="text-3xl font-bold">
            <AnimatedNumber value={totalClicks} />
          </p>
          <p className="text-xs text-gray-400 mt-1">{timeframe.toUpperCase()}</p>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <p className="text-xs text-gray-500">Avg / Day</p>
          <p className="text-3xl font-bold">{avg}</p>
          <p className="text-xs text-gray-400 mt-1">Based on trend</p>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <p className="text-xs text-gray-500">Peak Day</p>
          <p className="text-lg sm:text-xl font-semibold mt-2">{peak?.date || '—'}</p>
          <p className="text-xs text-gray-400 mt-1">{peak?.clicks || 0} clicks</p>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <p className="text-xs text-gray-500">Last Click</p>
          <p className="text-lg sm:text-xl font-semibold mt-2">{timeAgo(lastClick)}</p>
          <p className="text-xs text-gray-400 mt-1">Live update</p>
        </div>
      </div>

      {/* DAILY LINE + CSV */}
      <div className="bg-white border rounded-xl p-4 sm:p-6 max-w-5xl mx-auto mb-6">
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
        <Line
          options={{ responsive: true, plugins: { legend: { display: false } } }}
          data={{
            labels: dailyClicks.map(i => i.date),
            datasets: [
              {
                data: dailyClicks.map(i => i.clicks),
                borderColor: '#000',
                backgroundColor: '#00000020',
                fill: true,
                tension: 0.35,
              },
            ],
          }}
        />
      </div>

      {/* TIME FILTER */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {timeOptions.map(t => (
          <button
            key={t}
            onClick={() => setTimeframe(t)}
            className={`px-3 py-1.5 rounded-md text-sm border ${
              timeframe === t ? 'bg-black text-white' : 'bg-white'
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* TABS */}
      <Tab.Group>
        <Tab.List className="flex flex-wrap justify-center gap-2 mb-4">
          {['Country', 'Browser', 'Device', 'OS', 'Platform'].map(t => (
            <Tab
              key={t}
              className={({ selected }) =>
                `px-3 py-1.5 rounded-md border text-sm ${
                  selected ? 'bg-black text-white' : 'bg-white'
                }`
              }
            >
              {t}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="bg-white border rounded-xl p-4 max-w-5xl mx-auto">
          {['country', 'browser', 'device', 'os', 'platform'].map(key => (
            <Tab.Panel key={key}>
              <PercentageList
                data={analytics[key]}
                onClickItem={(item) => {
                  setModalTitle(item.label);
                  setModalData(analytics[key]);
                  setModalOpen(true);
                }}
              />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>

      <DetailModal
        open={modalOpen}
        title={modalTitle}
        data={modalData}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
















// 'use client';

// import { useEffect, useState, useRef } from 'react';
// import { useParams } from 'next/navigation';
// import axios from 'axios';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Line } from 'react-chartjs-2';
// import { Tab } from '@headlessui/react';
// import { CSVLink } from 'react-csv';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend
// );

// /* ---------------- COLORS ---------------- */
// const COLORS = [
//   '#2563eb', '#dc2626', '#059669', '#7c3aed', '#ea580c',
//   '#0f766e', '#9333ea', '#ca8a04', '#be123c', '#0284c7'
// ];

// /* ---------------- HELPERS ---------------- */
// function timeAgo(date) {
//   if (!date) return 'No clicks yet';
//   const sec = Math.floor((new Date() - new Date(date)) / 1000);
//   if (sec < 60) return `${sec}s ago`;
//   if (sec < 3600) return `${Math.floor(sec / 60)}m ago`;
//   if (sec < 86400) return `${Math.floor(sec / 3600)}h ago`;
//   return `${Math.floor(sec / 86400)}d ago`;
// }

// function averageClicksPerDay(data) {
//   if (!data?.length) return 0;
//   const total = data.reduce((s, i) => s + i.clicks, 0);
//   return Math.round(total / data.length);
// }

// function peakDay(data) {
//   if (!data?.length) return null;
//   return data.reduce((max, cur) =>
//     cur.clicks > max.clicks ? cur : max
//   );
// }

// function AnimatedNumber({ value }) {
//   const [display, setDisplay] = useState(0);
//   useEffect(() => {
//     let start = 0;
//     const step = Math.max(1, Math.floor(value / 20));
//     const timer = setInterval(() => {
//       start += step;
//       if (start >= value) {
//         setDisplay(value);
//         clearInterval(timer);
//       } else {
//         setDisplay(start);
//       }
//     }, 20);
//     return () => clearInterval(timer);
//   }, [value]);
//   return <>{display}</>;
// }

// /* ---------------- MODAL ---------------- */
// function DetailModal({ open, onClose, title, data }) {
//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
//       <div className="bg-white max-w-md w-full rounded-xl p-5">
//         <div className="flex justify-between items-center mb-3">
//           <h3 className="font-semibold text-lg">{title}</h3>
//           <button onClick={onClose} className="text-xl">×</button>
//         </div>
//         <ul className="space-y-2 max-h-72 overflow-y-auto">
//           {data.map((i, idx) => (
//             <li
//               key={idx}
//               className="flex justify-between text-sm border-b pb-1"
//             >
//               <span>{i.label}</span>
//               <span className="font-medium">{i.count} clicks</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// /* ---------------- PERCENTAGE LIST ---------------- */
// function PercentageList({ data, onClickItem }) {
//   const [search, setSearch] = useState('');
//   const [sort, setSort] = useState('desc');

//   const filtered = (data || [])
//     .filter(i => i.label.toLowerCase().includes(search.toLowerCase()))
//     .sort((a, b) => (sort === 'desc' ? b.count - a.count : a.count - b.count));

//   const total = filtered.reduce((s, i) => s + i.count, 0) || 1;

//   return (
//     <>
//       <div className="flex flex-col sm:flex-row gap-2 mb-4">
//         <input
//           placeholder="Search..."
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//           className="border px-3 py-1.5 rounded-md text-sm w-full"
//         />
//         <select
//           value={sort}
//           onChange={e => setSort(e.target.value)}
//           className="border px-3 py-1.5 rounded-md text-sm"
//         >
//           <option value="desc">Top → Bottom</option>
//           <option value="asc">Bottom → Top</option>
//         </select>
//       </div>

//       <div className="space-y-3">
//         {filtered.map((item, idx) => {
//           const percent = ((item.count / total) * 100).toFixed(1);
//           return (
//             <div
//               key={idx}
//               onClick={() => onClickItem(item)}
//               className="cursor-pointer group"
//               title={`${item.label} • ${item.count} clicks • ${percent}%`}
//             >
//               <div className="flex justify-between text-sm mb-1">
//                 <span className="truncate font-medium">{item.label}</span>
//                 <span className="text-gray-600">
//                   <AnimatedNumber value={Number(percent)} />%
//                 </span>
//               </div>
//               <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
//                 <div
//                   className="h-full rounded-full transition-all duration-700"
//                   style={{
//                     width: `${percent}%`,
//                     backgroundColor: COLORS[idx % COLORS.length],
//                   }}
//                 />
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// }

// /* ---------------- MAIN COMPONENT ---------------- */
// export default function AnalyticsPage() {
//   const { shortCode } = useParams();
//   const [analytics, setAnalytics] = useState({});
//   const [dailyClicks, setDailyClicks] = useState([]);
//   const [totalClicks, setTotalClicks] = useState(0);
//   const [lastClick, setLastClick] = useState(null);
//   const [timeframe, setTimeframe] = useState('24h');
//   const [loading, setLoading] = useState(true);

//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalData, setModalData] = useState([]);
//   const [modalTitle, setModalTitle] = useState('');

//   const wsRef = useRef(null);

//   /* ---------------- FETCH DATA ---------------- */
//   const fetchAnalytics = async () => {
//     if (!shortCode) return;
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `https://skkhandokar22.pythonanywhere.com/api/analytics/${shortCode}/?time=${timeframe}`
//       );
//       setAnalytics(res.data);
//       const total =
//         res.data.country?.reduce((s, i) => s + i.count, 0) || 0;
//       setTotalClicks(total);

//       const dailyRes = await axios.get(
//         `https://skkhandokar22.pythonanywhere.com/api/daily/${shortCode}/analytics/?time=${timeframe}`
//       );
//       setDailyClicks(dailyRes.data);
//       setLastClick(res.data.last_click_time);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ---------------- WEBSOCKET + POLLING ---------------- */
//   useEffect(() => {
//     fetchAnalytics();

//     if (!shortCode) return;

//     // WS Live update
//     const ws = new WebSocket(
//       `wss://skkhandokar22.pythonanywhere.com/ws/analytics/${shortCode}/`
//     );

//     ws.onmessage = () => fetchAnalytics();
//     wsRef.current = ws;

//     // Polling every 10s just in case WS fails
//     const interval = setInterval(fetchAnalytics, 10000);

//     return () => {
//       ws.close();
//       clearInterval(interval);
//     };
//   }, [shortCode, timeframe]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin h-10 w-10 border-4 border-t-black rounded-full" />
//       </div>
//     );
//   }

//   const timeOptions = ['60m', '24h', '7d', '30d', '1yr', 'all'];
//   const avg = averageClicksPerDay(dailyClicks);
//   const peak = peakDay(dailyClicks);

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 pt-24">
//       <h1 className="text-2xl font-bold text-center mb-6 break-all">
//         Analytics · {shortCode}
//       </h1>

//       {/* SUMMARY */}
//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-6xl mx-auto mb-8">
//         <div className="bg-white border rounded-xl p-4">
//           <p className="text-xs text-gray-500">Total Clicks</p>
//           <p className="text-3xl font-bold">
//             <AnimatedNumber value={totalClicks} />
//           </p>
//           <p className="text-xs text-gray-400 mt-1">{timeframe.toUpperCase()}</p>
//         </div>
//         <div className="bg-white border rounded-xl p-4">
//           <p className="text-xs text-gray-500">Avg / Day</p>
//           <p className="text-3xl font-bold">{avg}</p>
//           <p className="text-xs text-gray-400 mt-1">Based on trend</p>
//         </div>
//         <div className="bg-white border rounded-xl p-4">
//           <p className="text-xs text-gray-500">Peak Day</p>
//           <p className="text-lg sm:text-xl font-semibold mt-2">{peak?.date || '—'}</p>
//           <p className="text-xs text-gray-400 mt-1">{peak?.clicks || 0} clicks</p>
//         </div>
//         <div className="bg-white border rounded-xl p-4">
//           <p className="text-xs text-gray-500">Last Click</p>
//           <p className="text-lg sm:text-xl font-semibold mt-2">{timeAgo(lastClick)}</p>
//           <p className="text-xs text-gray-400 mt-1">Live update</p>
//         </div>
//       </div>

//       {/* DAILY LINE + CSV */}
//       <div className="bg-white border rounded-xl p-4 sm:p-6 max-w-5xl mx-auto mb-6">
//         {dailyClicks.length > 0 && (
//           <div className="flex justify-center mb-4">
//             <CSVLink
//               data={dailyClicks}
//               filename={`daily_clicks_${shortCode}.csv`}
//               className="px-4 py-2 bg-black text-white rounded-md text-xs sm:text-sm"
//             >
//               Download CSV
//             </CSVLink>
//           </div>
//         )}
//         <Line
//           options={{ responsive: true, plugins: { legend: { display: false } } }}
//           data={{
//             labels: dailyClicks.map(i => i.date),
//             datasets: [
//               {
//                 data: dailyClicks.map(i => i.clicks),
//                 borderColor: '#000',
//                 backgroundColor: '#00000020',
//                 fill: true,
//                 tension: 0.35,
//               },
//             ],
//           }}
//         />
//       </div>

//       {/* TIME FILTER */}
//       <div className="flex flex-wrap justify-center gap-2 mb-6">
//         {timeOptions.map(t => (
//           <button
//             key={t}
//             onClick={() => setTimeframe(t)}
//             className={`px-3 py-1.5 rounded-md text-sm border ${
//               timeframe === t ? 'bg-black text-white' : 'bg-white'
//             }`}
//           >
//             {t.toUpperCase()}
//           </button>
//         ))}
//       </div>

//       {/* TABS */}
//       <Tab.Group>
//         <Tab.List className="flex flex-wrap justify-center gap-2 mb-4">
//           {['Country', 'Browser', 'Device', 'OS', 'Platform'].map(t => (
//             <Tab
//               key={t}
//               className={({ selected }) =>
//                 `px-3 py-1.5 rounded-md border text-sm ${
//                   selected ? 'bg-black text-white' : 'bg-white'
//                 }`
//               }
//             >
//               {t}
//             </Tab>
//           ))}
//         </Tab.List>

//         <Tab.Panels className="bg-white border rounded-xl p-4 max-w-5xl mx-auto">
//           {['country', 'browser', 'device', 'os', 'platform'].map(key => (
//             <Tab.Panel key={key}>
//               <PercentageList
//                 data={analytics[key]}
//                 onClickItem={(item) => {
//                   setModalTitle(item.label);
//                   setModalData(analytics[key]);
//                   setModalOpen(true);
//                 }}
//               />
//             </Tab.Panel>
//           ))}
//         </Tab.Panels>
//       </Tab.Group>

//       <DetailModal
//         open={modalOpen}
//         title={modalTitle}
//         data={modalData}
//         onClose={() => setModalOpen(false)}
//       />
//     </div>
//   );
// }
