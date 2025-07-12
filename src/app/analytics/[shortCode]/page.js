'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { Tab } from '@headlessui/react';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

// Generate 150 distinct colors using HSL
const colors = [
  '#FF6384', '#89a5b7ff', '#FFCE56',
  '#66bb6a', '#ab47bc', '#ffa726',
  '#8d6e63', '#42a5f5', '#f44336',
  '#008080', '#800080', '#4c1e0eff', '#2E8B57',
  '#ca6379ff', '#466376ff', '#716b5cff',
  '#17d375ff', '#335871ff', '#b43131ff',
   '#df3b04ff', '#cf7acfff', '#dca593ff', '#081b10ff',
    '#c6a3c1ff', '#aa67aa8d', '#f76e40ff', '#599134ff',
     '#ffffffff', '#000000ff', '#a5a5a5ff', '#75ab8cff',
    '#04f900ff', '#fa04faff', '#6600ffff', '#006affff',  
     '#7fcdc1ff', '#d99fd9ff', '#6c67a3ff', '#945f5fff',
];

function topNWithOthers(data, n = 10) {
  if (!data) return [];
  if (data.length <= n) return data;
  const top = data.slice(0, n);
  const others = data.slice(n);
  const othersSum = others.reduce((acc, cur) => acc + cur.percentage, 0);
  return [...top, { label: "Others", percentage: parseFloat(othersSum.toFixed(2)) }];
}

const PieChart = ({ title, data }) => {
  if (!data || data.length === 0) return <p>No data available.</p>;

  const chartData = {
    labels: data.map(d => d.label),
    datasets: [{
      data: data.map(d => d.percentage),
      backgroundColor: colors.slice(0, data.length),
    }]
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-xl p-4">
      <h3 className="text-center font-semibold mb-4">{title}</h3>
      <Pie data={chartData} />
    </div>
  );
};

const BarChart = ({ title, data }) => {
  if (!data || data.length === 0) return <p>No data available.</p>;

  const chartData = {
    labels: data.map(d => d.label),
    datasets: [{
      label: title,
      data: data.map(d => d.percentage),
      backgroundColor: colors.slice(0, data.length),
    }]
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-xl p-4">
      <h3 className="text-center font-semibold mb-4">{title}</h3>
      <Bar data={chartData} options={{ indexAxis: 'y' }} />
    </div>
  );
};

export default function AnalyticsPage({ params }) {
  const { shortCode } = params;
  const [analytics, setAnalytics] = useState({
    country: [],
    browser: [],
    device: [],
    os: [],
    platform: [],
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!shortCode) return;

    axios.get(`https://skkhandokar22.pythonanywhere.com/api/analytics/${shortCode}/`)
      .then(res => setAnalytics(res.data))
      .catch(err => console.error(err));
  }, [shortCode]);

  // Limit to top 10 + others for countries (large list)
  const countryData = topNWithOthers(analytics.country, 30);

  // Other categories usually small, no trimming needed, but you can add topNWithOthers if you want
  const browserData = analytics.browser || [];
  const deviceData = analytics.device || [];
  const osData = analytics.os || [];
  const platformData = analytics.platform || [];

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-8">
        Analytics for: <span className="text-blue-600">{shortCode}</span>
      </h1>

      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="flex justify-center space-x-4 mb-8 flex-wrap">
          {['Country', 'Browser', 'Device', 'OS', 'Platform'].map(tabName => (
            <Tab
              key={tabName}
              className={({ selected }) =>
                `px-4 py-2 rounded-lg font-semibold cursor-pointer ${
                  selected ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`
              }
            >
              {tabName}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel>
            <BarChart title="Country % Clicks" data={countryData} />
          </Tab.Panel>
          <Tab.Panel>
            <PieChart title="Browser % Clicks" data={browserData} />
          </Tab.Panel>
          <Tab.Panel>
            <PieChart title="Device % Clicks" data={deviceData} />
          </Tab.Panel>
          <Tab.Panel>
            <PieChart title="OS % Clicks" data={osData} />
          </Tab.Panel>
          <Tab.Panel>
            <PieChart title="Platform % Clicks" data={platformData} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
