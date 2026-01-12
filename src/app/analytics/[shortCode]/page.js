


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

//       // ✅ Calculate total clicks based on country data (accurate for timeframe)
//       const total = res.data.country?.reduce((sum, item) => sum + (item.count || 0), 0) || 0;
//       setTotalClicks(total);

//       // Daily clicks for trend chart
//       const dailyRes = await axios.get(
//         `https://skkhandokar22.pythonanywhere.com/api/analytics/${shortCode}/daily/?time=${timeframe}`
//       );

//       setDailyClicks(dailyRes.data);

//       // Last click info
//       if (dailyRes.data?.length) {
//         setLastClick(dailyRes.data[dailyRes.data.length - 1].date);
//       } else {
//         setLastClick(null);
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

//     ws.onmessage = fetchAnalytics;
//     wsRef.current = ws;

//     return () => ws.close();
//   }, [shortCode, timeframe]);

//   const timeOptions = ['60m', '24h', '7d', '30d', '1yr', 'all'];
//   const peak = peakDay(dailyClicks);

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
//                     plugins: { legend: { display: false } },
//                   }}
//                   data={{
//                     labels: analytics[key]?.map(i => i.label),
//                     datasets: [
//                       {
//                         data: analytics[key]?.map(i => i.count),
//                         backgroundColor: COLORS,
//                       },
//                     ],
//                   }}
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
  '#42a5f5', '#f44336',
  '#008080', '#335871ff', '#b43131ff', '#df3b04ff', '#cf7acfff',
  '#dca593ff', '#081b10ff', '#c6a3c1ff','#800080', '#4c1e0eff', '#2E8B57',
  '#FF6384', '#89a5b7ff', '#FFCE56',
  '#66bb6a', '#ab47bc', '#ffa726',
  '#42a5f5', '#f44336', '#ca6379ff', '#466376ff', '#716b5cff', '#17d375ff',
   '#aa67aa8d',
  '#f76e40ff', '#599134ff', '#ffffffff', '#000000ff',
  '#a5a5a5ff', '#75ab8cff', '#04f900ff', '#fa04faff',
  '#6600ffff', '#006affff', '#7fcdc1ff', '#d99fd9ff',
  '#6c67a3ff', '#945f5fff',
  '#FF6384', '#89a5b7ff', '#FFCE56',
  '#66bb6a', '#ab47bc', '#ffa726',
  '#8d6e63', 
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

      // ✅ Total clicks based on country
      const total = res.data.country?.reduce((sum, i) => sum + (i.count || 0), 0) || 0;
      setTotalClicks(total);

      // Daily clicks for trend chart
      const dailyRes = await axios.get(
        `https://skkhandokar22.pythonanywhere.com/api/daily/${shortCode}/analytics/?time=${timeframe}`
      );

      setDailyClicks(dailyRes.data);

      // Last click info (most recent date from daily clicks)
      // if (dailyRes.data?.length) {
      //   const allDates = dailyRes.data.flatMap(d => Array(d.clicks).fill(d.date));
      //   setLastClick(allDates[allDates.length - 1] || null);
      // } else {
      //   setLastClick(null);
      // }

      setLastClick(res.data.last_click_time);

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

  // ---------------- HELPERS FOR PERCENTAGE BARS ----------------
  // ---------------- HELPERS FOR PERCENTAGE BARS ----------------
const getBarData = (key) => {
  const data = analytics[key] || [];
  const total = data.reduce((sum, i) => sum + i.count, 0) || 1; // avoid div by 0
  return {
    labels: data.map(i => `${i.label} (${i.count})`),
    datasets: [
      {
        data: data.map(i => (i.count / total) * 100), // percentage
        backgroundColor: COLORS,
      },
    ],
  };
};


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
                    plugins: {
                      legend: { display: false },
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            const item = analytics[key][context.dataIndex];
                            return `${item.label}: ${item.count} clicks`;
                          }
                        }
                      }
                    },
                    scales: {
                      x: { beginAtZero: true, max: 100 },
                      y: { beginAtZero: true },
                    },
                  }}
                  data={getBarData(key)}
                />
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>

    </div>
  );
}
