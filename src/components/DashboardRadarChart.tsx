'use client';

import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip, Legend,
} from 'recharts';

interface RadarData {
  name: string;
  total: number;
  pass: number;
  avgScore: number;
}

export default function DashboardRadarChart({ data }: { data: RadarData[] }) {
  const chartData = data.map((d) => ({
    dimension: d.name,
    passRate: d.total > 0 ? Math.round((d.pass / d.total) * 100) : 0,
    avgScore: d.avgScore * 20, // Scale 0-5 to 0-100
  }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <RadarChart data={chartData}>
        <PolarGrid stroke="#e2e8f0" />
        <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 11, fill: '#64748b' }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
        <Tooltip />
        <Legend />
        <Radar name="ผ่านเกณฑ์ (%)" dataKey="passRate" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
        <Radar name="คะแนนเฉลี่ย (scaled)" dataKey="avgScore" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} />
      </RadarChart>
    </ResponsiveContainer>
  );
}
