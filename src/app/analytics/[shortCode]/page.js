

'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'
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
  '#0f766e', '#9333ea', '#ca8a04', '#be123c', '#0284c7',


   '#42a5f5', '#f44336',
  '#008080', '#335871ff', '#b43131ff', '#df3b04ff', '#cf7acfff',
  '#dca593ff', '#081b10ff', '#c6a3c1ff','#800080', '#4c1e0eff', '#2E8B57',
  '#FF6384', '#89a5b7ff', '#FFCE56',
  '#66bb6a', '#ab47bc', '#ffa726',
  ,  '#ca6379ff', '#466376ff', '#716b5cff', '#17d375ff',
   '#aa67aa8d',
  '#f76e40ff', '#599134ff', '#ffffffff', '#000000ff',
  '#a5a5a5ff', '#75ab8cff', '#04f900ff', '#fa04faff',
  '#6600ffff', '#006affff', '#7fcdc1ff', '#d99fd9ff',
  '#6c67a3ff', '#945f5fff',`#2563eb`,`#dc2626`,`#059669`,`#7c3aed`,
 ` #ea580c`,`#0f766e`, `#9333ea`,`#ca8a04`,`#be123c`,`#0284c7`,
 `#1d4ed8`, `#b91c1c`, `#047857`, `#6d28d9`, `#c2410c`,
`#115e59`, `#7e22ce`, `#a16207`, `#9f1239`, `#0369a1`,

`#3b82f6`, `#ef4444`, `#10b981`, `#8b5cf6`, `#f97316`,
`#14b8a6`, `#a855f7`, `#eab308`, `#e11d48`, `#38bdf8`,

`#60a5fa`, `#f87171`, `#34d399`, `#a78bfa`, `#fb923c`,
`#2dd4bf`, `#c084fc`, `#facc15`, `#fb7185`, `#7dd3fc`,

`#1e40af`, `#7f1d1d`, `#064e3b`, `#4c1d95`, `#7c2d12`,
`#134e4a`, `#581c87`, `#713f12`, `#881337`, `#0c4a6e`,

`#2563eb`, `#991b1b`, `#065f46`, `#5b21b6`, `#9a3412`,
`#0f766e`, `#6b21a8`, `#854d0e`, `#9d174d`, `#075985`,

`#312e81`, `#450a0a`, `#022c22`, `#2e1065`, `#431407`,
`#042f2e`, `#3b0764`, `#422006`, `#4a044e`, `#082f49`



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
  const router = useRouter();
  const { username } = useAuth();
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
/* ---------------- AUTH PROTECTION ---------------- */
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // যদি টোকেন বা ইউজার না থাকে, তবে সাইন-ইন পেজে পাঠিয়ে দাও
    if (!token && !username) {
      router.push('/signin');
    }
  }, [username, router]);

  /* ---------------- FETCH DATA ---------------- */
  const fetchAnalytics = async () => {
    if (!shortCode) return;
    const token = localStorage.getItem('token');
    setLoading(true);
    try {
      const res = await axios.get(
        `https://skkhandokar22.pythonanywhere.com/api/analytics/${shortCode}/?time=${timeframe}`,
        { headers: { Authorization: `Token ${token}` } }
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
    } 
    catch (err) {
      // যদি সার্ভার থেকে ৪০১ বা ৪MD৩ এরর আসে (টোকেন ভুল হলে)
      if (err.response?.status === 401) {
        router.push('/signin');
      }
    }
    finally {
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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      {/* সেন্ট্রাল অ্যানিমেটেড লোগো বা আইকন */}
      <div className="relative flex items-center justify-center mb-8">
        <div className="absolute animate-ping h-20 w-20 rounded-full bg-emerald-400 opacity-20"></div>
        <div className="relative bg-white p-4 rounded-2xl shadow-xl border border-emerald-100">
          <div className="animate-spin h-10 w-10 border-4 border-emerald-500 border-t-transparent rounded-full" />
        </div>
      </div>

      {/* টেক্সট অ্যানিমেশন */}
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-gray-800 animate-pulse">
          Analyzing Data...
        </h3>
        <p className="text-gray-500 text-sm max-w-xs mx-auto">
          Fetching the latest click insights and geographic trends for you.
        </p>
      </div>

      {/* নিচের দিকে ছোট প্রগ্রেস বার (ঐচ্ছিক) */}
      <div className="mt-8 w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-emerald-500 animate-[loading_1.5s_ease-in-out_infinite] origin-left" 
             style={{ width: '100%', animation: 'shimmer 1.5s infinite' }}>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
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








