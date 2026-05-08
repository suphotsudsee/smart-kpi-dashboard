import { getKpisWithScores, getDashboardStats, getDimensionScores } from '@/lib/data';
import PageWrapper from '@/components/PageWrapper';
import StatCard from '@/components/StatCard';
import ProgressBar from '@/components/ProgressBar';
import StatusBadge from '@/components/StatusBadge';
import Link from 'next/link';
import { CheckCircle, XCircle, AlertTriangle, Database, ChevronRight } from 'lucide-react';
import DashboardRadarChart from '@/components/DashboardRadarChart';

export default async function HomePage() {
  const kpis = await getKpisWithScores(2569);
  const stats = await getDashboardStats(2569);
  const dimScores = await getDimensionScores(2569);

  // Group KPIs by cluster
  const grouped: Record<string, typeof kpis> = {};
  for (const kpi of kpis) {
    const key = kpi.cluster?.name || kpi.strategy.name;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(kpi);
  }

  return (
    <PageWrapper>
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-600 text-white py-10 rounded-b-[30px]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <Database size={28} />
            <h2 className="text-2xl font-bold">Dashboard สรุปตัวชี้วัด</h2>
          </div>
          <p className="text-blue-200 text-sm">อัปเดตล่าสุด: 07/05/2569 12:08 น.</p>
          
          {/* Year Selector */}
          <select className="mt-3 bg-white/10 border border-white/20 text-white rounded-lg px-4 py-2 text-sm">
            {[2569, 2568, 2567, 2566, 2565].map((y) => (
              <option key={y} value={y} className="text-gray-900">ปีงบประมาณ {y}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <StatCard label="ตัวชี้วัดทั้งหมด" value={stats.total} color="blue" icon={<Database size={22} />} />
          <StatCard label="ผ่านเกณฑ์" value={stats.pass} color="green" icon={<CheckCircle size={22} />} />
          <StatCard label="ไม่ผ่าน" value={stats.fail} color="red" icon={<XCircle size={22} />} />
          <StatCard label="ไม่มีข้อมูล" value={stats.noData} color="gray" icon={<AlertTriangle size={22} />} />
        </div>

        {/* Radar Chart & Dimensions */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-8">
          <h5 className="font-bold text-gray-800 mb-1">6 มิติการทำงาน</h5>
          <p className="text-gray-400 text-sm mb-4">วิเคราะห์สมดุลการทำงานรายด้าน</p>
          <div className="max-w-md mx-auto">
            <DashboardRadarChart data={dimScores} />
          </div>
        </div>

        {/* KPI List grouped by cluster */}
        <div className="space-y-6 pb-12">
          {Object.entries(grouped).map(([clusterName, clusterKpis]) => (
            <div key={clusterName}>
              <div className="bg-slate-700 text-white px-5 py-3 rounded-xl font-bold mb-3">
                {clusterName}
              </div>
              <div className="space-y-2">
                {clusterKpis.map((kpi) => {
                  const score = kpi.scores[0];
                  const pct = score?.percent || 0;
                  const status = score?.status || 'pending';
                  return (
                    <div
                      key={kpi.id}
                      className={`bg-white rounded-2xl border p-4 hover:shadow-md transition-all flex items-center gap-4 ${
                        kpi.dataSource === 'Manual'
                          ? 'border-l-6 border-l-amber-500'
                          : 'border-l-6 border-l-blue-500'
                      }`}
                    >
                      <div className="w-9 h-9 bg-slate-100 border rounded-xl flex items-center justify-center font-extrabold text-slate-600 text-sm shrink-0">
                        {kpi.order}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-gray-800 mb-1 truncate">
                          {kpi.name}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1.5">
                          <span className="capitalize">{kpi.dataSource}</span>
                          <StatusBadge status={status} />
                        </div>
                        <ProgressBar value={pct} target={kpi.targetPercent} size="sm" />
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-lg font-extrabold">
                          {pct.toFixed(2)}%
                        </div>
                        <Link
                          href={`/kpi/${kpi.id}`}
                          className="text-blue-500 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                        >
                          รายละเอียด <ChevronRight size={14} />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
