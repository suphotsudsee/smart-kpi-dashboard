import { getHospitalDetail } from '@/lib/data';

export const dynamic = 'force-dynamic';
     1|import { getHospitalDetail } from '@/lib/data';
     2|import PageWrapper from '@/components/PageWrapper';
     3|import ProgressBar from '@/components/ProgressBar';
     4|import StatusBadge from '@/components/StatusBadge';
     5|import Link from 'next/link';
     6|import { ArrowLeft, Hospital } from 'lucide-react';
     7|import { notFound } from 'next/navigation';
     8|
     9|export const dynamic = 'force-dynamic'
    10|
    11|export default async function HospitalDetailPage({
    12|  params,
    13|}: {
    14|  params: Promise<{ id: string }>;
    15|}) {
    16|  const { id } = await params;
    17|  const hosp = await getHospitalDetail(parseInt(id), 2569);
    18|  if (!hosp) notFound();
    19|
    20|  const scores = hosp.scores;
    21|  const passCount = scores.filter((s) => s.status === 'pass').length;
    22|  const pct = scores.length > 0 ? Math.round((passCount / scores.length) * 100) : 0;
    23|
    24|  return (
    25|    <PageWrapper>
    26|      <div className="bg-gradient-to-br from-blue-900 to-blue-600 text-white py-6 rounded-b-[20px]">
    27|        <div className="max-w-5xl mx-auto px-4">
    28|          <Link href="/hospital-summary" className="text-blue-200 hover:text-white text-sm flex items-center gap-1 mb-4">
    29|            <ArrowLeft size={14} /> กลับหน้าสรุป
    30|          </Link>
    31|          <div className="flex items-center gap-3">
    32|            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
    33|              <Hospital size={24} />
    34|            </div>
    35|            <div>
    36|              <h2 className="text-xl font-bold">{hosp.name}</h2>
    37|              <p className="text-blue-200 text-sm">{hosp.type} | {hosp.code}</p>
    38|            </div>
    39|          </div>
    40|        </div>
    41|      </div>
    42|
    43|      <div className="max-w-5xl mx-auto px-4 py-6">
    44|        {/* Summary Stats */}
    45|        <div className="grid grid-cols-3 gap-3 mb-6">
    46|          <div className="bg-white rounded-xl border p-4 text-center">
    47|            <div className="text-2xl font-extrabold text-blue-700">{pct}%</div>
    48|            <div className="text-xs text-gray-500">ผ่าน</div>
    49|          </div>
    50|          <div className="bg-white rounded-xl border p-4 text-center">
    51|            <div className="text-2xl font-extrabold text-green-600">{passCount}</div>
    52|            <div className="text-xs text-gray-500">ผ่านเกณฑ์</div>
    53|          </div>
    54|          <div className="bg-white rounded-xl border p-4 text-center">
    55|            <div className="text-2xl font-extrabold text-red-600">{scores.filter((s) => s.status === 'fail').length}</div>
    56|            <div className="text-xs text-gray-500">ไม่ผ่าน</div>
    57|          </div>
    58|        </div>
    59|
    60|        {/* KPI Score List */}
    61|        <div className="bg-white rounded-2xl border shadow-sm p-6">
    62|          <h3 className="font-bold text-lg mb-4">ผลงานรายตัวชี้วัด</h3>
    63|          <div className="space-y-3">
    64|            {scores.map((score) => (
    65|              <div key={score.id} className="flex items-center gap-4 py-2.5 border-b last:border-0">
    66|                <Link href={`/kpi/${score.kpi.id}`} className="text-sm font-medium text-blue-700 hover:underline flex-1 min-w-0 truncate">
    67|                  {score.kpi.name}
    68|                </Link>
    69|                <div className="w-40 hidden md:block">
    70|                  <ProgressBar value={score.percent} target={score.kpi.targetPercent} size="sm" />
    71|                </div>
    72|                <span className={`text-sm font-extrabold w-16 text-right ${
    73|                  score.status === 'pass' ? 'text-green-600' : score.status === 'fail' ? 'text-red-600' : 'text-gray-400'
    74|                }`}>
    75|                  {score.percent.toFixed(1)}%
    76|                </span>
    77|                <StatusBadge status={score.status} />
    78|              </div>
    79|            ))}
    80|          </div>
    81|        </div>
    82|      </div>
    83|    </PageWrapper>
    84|  );
    85|}
    86|
