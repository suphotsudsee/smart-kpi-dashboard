import { getHospitalDetail } from '@/lib/data';
import PageWrapper from '@/components/PageWrapper';
import ProgressBar from '@/components/ProgressBar';
import StatusBadge from '@/components/StatusBadge';
import Link from 'next/link';
import { ArrowLeft, Hospital } from 'lucide-react';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function HospitalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const hosp = await getHospitalDetail(parseInt(id), 2569);
  if (!hosp) notFound();

  const scores = hosp.scores;
  const passCount = scores.filter((s) => s.status === 'pass').length;
  const pct = scores.length > 0 ? Math.round((passCount / scores.length) * 100) : 0;

  return (
    <PageWrapper>
      <div className="bg-gradient-to-br from-blue-900 to-blue-600 text-white py-6 rounded-b-[20px]">
        <div className="max-w-5xl mx-auto px-4">
          <Link href="/hospital-summary" className="text-blue-200 hover:text-white text-sm flex items-center gap-1 mb-4">
            <ArrowLeft size={14} /> กลับหน้าสรุป
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <Hospital size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">{hosp.name}</h2>
              <p className="text-blue-200 text-sm">{hosp.type} | {hosp.code}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-xl border p-4 text-center">
            <div className="text-2xl font-extrabold text-blue-700">{pct}%</div>
            <div className="text-xs text-gray-500">ผ่าน</div>
          </div>
          <div className="bg-white rounded-xl border p-4 text-center">
            <div className="text-2xl font-extrabold text-green-600">{passCount}</div>
            <div className="text-xs text-gray-500">ผ่านเกณฑ์</div>
          </div>
          <div className="bg-white rounded-xl border p-4 text-center">
            <div className="text-2xl font-extrabold text-red-600">{scores.filter((s) => s.status === 'fail').length}</div>
            <div className="text-xs text-gray-500">ไม่ผ่าน</div>
          </div>
        </div>

        {/* KPI Score List */}
        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <h3 className="font-bold text-lg mb-4">ผลงานรายตัวชี้วัด</h3>
          <div className="space-y-3">
            {scores.map((score) => (
              <div key={score.id} className="flex items-center gap-4 py-2.5 border-b last:border-0">
                <Link href={`/kpi/${score.kpi.id}`} className="text-sm font-medium text-blue-700 hover:underline flex-1 min-w-0 truncate">
                  {score.kpi.name}
                </Link>
                <div className="w-40 hidden md:block">
                  <ProgressBar value={score.percent} target={score.kpi.targetPercent} size="sm" />
                </div>
                <span className={`text-sm font-extrabold w-16 text-right ${
                  score.status === 'pass' ? 'text-green-600' : score.status === 'fail' ? 'text-red-600' : 'text-gray-400'
                }`}>
                  {score.percent.toFixed(1)}%
                </span>
                <StatusBadge status={score.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
