import { getKpiDetail, getHospitalKpiComparison } from '@/lib/data';

export const dynamic = 'force-dynamic';
     1|import { getKpiDetail, getHospitalKpiComparison } from '@/lib/data';
     2|import PageWrapper from '@/components/PageWrapper';
     3|import ProgressBar from '@/components/ProgressBar';
     4|import StatusBadge from '@/components/StatusBadge';
     5|import Link from 'next/link';
     6|import { ExternalLink, ArrowLeft } from 'lucide-react';
     7|import { notFound } from 'next/navigation';
     8|
     9|export const dynamic = 'force-dynamic'
    10|
    11|export default async function KpiDetailPage({
    12|  params,
    13|}: {
    14|  params: Promise<{ id: string }>;
    15|}) {
    16|  const { id } = await params;
    17|  const kpi = await getKpiDetail(parseInt(id), 2569);
    18|  if (!kpi) notFound();
    19|
    20|  const score = kpi.scores[0];
    21|  const comparisons = await getHospitalKpiComparison(kpi.id, 2569);
    22|
    23|  return (
    24|    <PageWrapper>
    25|      <div className="bg-gradient-to-br from-blue-900 to-blue-600 text-white py-6 rounded-b-[20px]">
    26|        <div className="max-w-5xl mx-auto px-4">
    27|          <Link href="/" className="text-blue-200 hover:text-white text-sm flex items-center gap-1 mb-4">
    28|            <ArrowLeft size={14} /> กลับหน้าแรก
    29|          </Link>
    30|          <h2 className="text-xl font-bold">รายละเอียดตัวชี้วัด</h2>
    31|        </div>
    32|      </div>
    33|
    34|      <div className="max-w-5xl mx-auto px-4 py-6">
    35|        {/* KPI Info Card */}
    36|        <div className="bg-white rounded-2xl border shadow-sm p-6 mb-6">
    37|          <div className="flex items-center justify-between mb-4">
    38|            <span className="w-10 h-10 bg-slate-100 border rounded-xl flex items-center justify-center font-extrabold text-slate-600 text-lg">
    39|              {kpi.order}
    40|            </span>
    41|            <StatusBadge status={score?.status || 'pending'} />
    42|          </div>
    43|          <h1 className="text-lg font-bold text-gray-800 mb-2">{kpi.name}</h1>
    44|
    45|          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
    46|            <div className="text-center p-3 bg-gray-50 rounded-xl">
    47|              <div className="text-2xl font-extrabold text-blue-700">{score?.percent.toFixed(2) || '0'}%</div>
    48|              <div className="text-xs text-gray-500">ผลงาน</div>
    49|            </div>
    50|            <div className="text-center p-3 bg-gray-50 rounded-xl">
    51|              <div className="text-2xl font-extrabold text-amber-600">{kpi.targetPercent}%</div>
    52|              <div className="text-xs text-gray-500">เป้าหมาย</div>
    53|            </div>
    54|            <div className="text-center p-3 bg-gray-50 rounded-xl">
    55|              <div className="text-2xl font-extrabold text-green-700">{score?.score || 0}</div>
    56|              <div className="text-xs text-gray-500">คะแนน (1-5)</div>
    57|            </div>
    58|            <div className="text-center p-3 bg-gray-50 rounded-xl">
    59|              <div className="text-xl font-bold">A: {score?.valueA || 0} / B: {score?.valueB || 0}</div>
    60|              <div className="text-xs text-gray-500">ตัวตั้ง/ตัวหาร</div>
    61|            </div>
    62|          </div>
    63|
    64|          <div className="space-y-2 text-sm text-gray-600">
    65|            <div className="flex gap-2">
    66|              <span className="font-bold w-24">ยุทธศาสตร์:</span>
    67|              <span>{kpi.strategy.code}. {kpi.strategy.name}</span>
    68|            </div>
    69|            {kpi.cluster && (
    70|              <div className="flex gap-2">
    71|                <span className="font-bold w-24">กลุ่มงาน:</span>
    72|                <span>{kpi.cluster.code} {kpi.cluster.name}</span>
    73|              </div>
    74|            )}
    75|            <div className="flex gap-2">
    76|              <span className="font-bold w-24">แหล่งข้อมูล:</span>
    77|              <span>{kpi.dataSource}</span>
    78|            </div>
    79|          </div>
    80|
    81|          {kpi.hdcUrl && (
    82|            <a href={kpi.hdcUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-1 mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium">
    83|              ดูรายงาน HDC <ExternalLink size={14} />
    84|            </a>
    85|          )}
    86|        </div>
    87|
    88|        {/* Hospital Comparison */}
    89|        <div className="bg-white rounded-2xl border shadow-sm p-6">
    90|          <h3 className="font-bold text-lg mb-4">เปรียบเทียบรายหน่วยบริการ ({comparisons.length} แห่ง)</h3>
    91|          <div className="space-y-3">
    92|            {comparisons.map((comp) => (
    93|              <div key={comp.id} className="flex items-center gap-4 py-2 border-b last:border-0">
    94|                <Link href={`/hospital/${comp.hospital.id}`} className="text-sm font-medium text-blue-700 hover:underline w-48 truncate">
    95|                  {comp.hospital.name}
    96|                </Link>
    97|                <div className="flex-1">
    98|                  <ProgressBar value={comp.percent} target={kpi.targetPercent} size="sm" />
    99|                </div>
   100|                <span className={`text-sm font-extrabold w-16 text-right ${
   101|                  comp.status === 'pass' ? 'text-green-600' : comp.status === 'fail' ? 'text-red-600' : 'text-gray-400'
   102|                }`}>
   103|                  {comp.percent.toFixed(1)}%
   104|                </span>
   105|                <span className="text-xs text-gray-400 w-8">
   106|                  {comp.score}
   107|                </span>
   108|              </div>
   109|            ))}
   110|          </div>
   111|        </div>
   112|      </div>
   113|    </PageWrapper>
   114|  );
   115|}
   116|
