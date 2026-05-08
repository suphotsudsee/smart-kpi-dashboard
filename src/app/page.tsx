import { getKpisWithScores, getDashboardStats, getDimensionScores } from '@/lib/data';

export const dynamic = 'force-dynamic';
     1|import { getKpisWithScores, getDashboardStats, getDimensionScores } from '@/lib/data';
     2|import PageWrapper from '@/components/PageWrapper';
     3|import StatCard from '@/components/StatCard';
     4|import ProgressBar from '@/components/ProgressBar';
     5|import StatusBadge from '@/components/StatusBadge';
     6|import Link from 'next/link';
     7|import { CheckCircle, XCircle, AlertTriangle, Database, ChevronRight } from 'lucide-react';
     8|import DashboardRadarChart from '@/components/DashboardRadarChart';
     9|
    10|export const dynamic = 'force-dynamic'
    11|
    12|export default async function HomePage() {
    13|  const kpis = await getKpisWithScores(2569);
    14|  const stats = await getDashboardStats(2569);
    15|  const dimScores = await getDimensionScores(2569);
    16|
    17|  // Group KPIs by cluster
    18|  const grouped: Record<string, typeof kpis> = {};
    19|  for (const kpi of kpis) {
    20|    const key = kpi.cluster?.name || kpi.strategy.name;
    21|    if (!grouped[key]) grouped[key] = [];
    22|    grouped[key].push(kpi);
    23|  }
    24|
    25|  return (
    26|    <PageWrapper>
    27|      {/* Header Banner */}
    28|      <div className="bg-gradient-to-br from-blue-900 to-blue-600 text-white py-10 rounded-b-[30px]">
    29|        <div className="max-w-7xl mx-auto px-4">
    30|          <div className="flex items-center gap-3 mb-2">
    31|            <Database size={28} />
    32|            <h2 className="text-2xl font-bold">Dashboard สรุปตัวชี้วัด</h2>
    33|          </div>
    34|          <p className="text-blue-200 text-sm">อัปเดตล่าสุด: 07/05/2569 12:08 น.</p>
    35|          
    36|          {/* Year Selector */}
    37|          <select className="mt-3 bg-white/10 border border-white/20 text-white rounded-lg px-4 py-2 text-sm">
    38|            {[2569, 2568, 2567, 2566, 2565].map((y) => (
    39|              <option key={y} value={y} className="text-gray-900">ปีงบประมาณ {y}</option>
    40|            ))}
    41|          </select>
    42|        </div>
    43|      </div>
    44|
    45|      <div className="max-w-7xl mx-auto px-4 -mt-6">
    46|        {/* Stats Cards */}
    47|        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
    48|          <StatCard label="ตัวชี้วัดทั้งหมด" value={stats.total} color="blue" icon={<Database size={22} />} />
    49|          <StatCard label="ผ่านเกณฑ์" value={stats.pass} color="green" icon={<CheckCircle size={22} />} />
    50|          <StatCard label="ไม่ผ่าน" value={stats.fail} color="red" icon={<XCircle size={22} />} />
    51|          <StatCard label="ไม่มีข้อมูล" value={stats.noData} color="gray" icon={<AlertTriangle size={22} />} />
    52|        </div>
    53|
    54|        {/* Radar Chart & Dimensions */}
    55|        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-8">
    56|          <h5 className="font-bold text-gray-800 mb-1">6 มิติการทำงาน</h5>
    57|          <p className="text-gray-400 text-sm mb-4">วิเคราะห์สมดุลการทำงานรายด้าน</p>
    58|          <div className="max-w-md mx-auto">
    59|            <DashboardRadarChart data={dimScores} />
    60|          </div>
    61|        </div>
    62|
    63|        {/* KPI List grouped by cluster */}
    64|        <div className="space-y-6 pb-12">
    65|          {Object.entries(grouped).map(([clusterName, clusterKpis]) => (
    66|            <div key={clusterName}>
    67|              <div className="bg-slate-700 text-white px-5 py-3 rounded-xl font-bold mb-3">
    68|                {clusterName}
    69|              </div>
    70|              <div className="space-y-2">
    71|                {clusterKpis.map((kpi) => {
    72|                  const score = kpi.scores[0];
    73|                  const pct = score?.percent || 0;
    74|                  const status = score?.status || 'pending';
    75|                  return (
    76|                    <div
    77|                      key={kpi.id}
    78|                      className={`bg-white rounded-2xl border p-4 hover:shadow-md transition-all flex items-center gap-4 ${
    79|                        kpi.dataSource === 'Manual'
    80|                          ? 'border-l-6 border-l-amber-500'
    81|                          : 'border-l-6 border-l-blue-500'
    82|                      }`}
    83|                    >
    84|                      <div className="w-9 h-9 bg-slate-100 border rounded-xl flex items-center justify-center font-extrabold text-slate-600 text-sm shrink-0">
    85|                        {kpi.order}
    86|                      </div>
    87|                      <div className="flex-1 min-w-0">
    88|                        <div className="font-medium text-sm text-gray-800 mb-1 truncate">
    89|                          {kpi.name}
    90|                        </div>
    91|                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1.5">
    92|                          <span className="capitalize">{kpi.dataSource}</span>
    93|                          <StatusBadge status={status} />
    94|                        </div>
    95|                        <ProgressBar value={pct} target={kpi.targetPercent} size="sm" />
    96|                      </div>
    97|                      <div className="text-right shrink-0">
    98|                        <div className="text-lg font-extrabold">
    99|                          {pct.toFixed(2)}%
   100|                        </div>
   101|                        <Link
   102|                          href={`/kpi/${kpi.id}`}
   103|                          className="text-blue-500 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
   104|                        >
   105|                          รายละเอียด <ChevronRight size={14} />
   106|                        </Link>
   107|                      </div>
   108|                    </div>
   109|                  );
   110|                })}
   111|              </div>
   112|            </div>
   113|          ))}
   114|        </div>
   115|      </div>
   116|    </PageWrapper>
   117|  );
   118|}
   119|
