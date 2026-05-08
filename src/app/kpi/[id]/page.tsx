import { getKpiDetail, getHospitalKpiComparison } from '@/lib/data';
import PageWrapper from '@/components/PageWrapper';
import ProgressBar from '@/components/ProgressBar';
import StatusBadge from '@/components/StatusBadge';
import Link from 'next/link';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function KpiDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const kpi = await getKpiDetail(parseInt(id), 2569);
  if (!kpi) notFound();

  const score = kpi.scores[0];
  const comparisons = await getHospitalKpiComparison(kpi.id, 2569);

  return (
    <PageWrapper>
      <div className="bg-gradient-to-br from-blue-900 to-blue-600 text-white py-6 rounded-b-[20px]">
        <div className="max-w-5xl mx-auto px-4">
          <Link href="/" className="text-blue-200 hover:text-white text-sm flex items-center gap-1 mb-4">
            <ArrowLeft size={14} /> กลับหน้าแรก
          </Link>
          <h2 className="text-xl font-bold">รายละเอียดตัวชี้วัด</h2>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* KPI Info Card */}
        <div className="bg-white rounded-2xl border shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="w-10 h-10 bg-slate-100 border rounded-xl flex items-center justify-center font-extrabold text-slate-600 text-lg">
              {kpi.order}
            </span>
            <StatusBadge status={score?.status || 'pending'} />
          </div>
          <h1 className="text-lg font-bold text-gray-800 mb-2">{kpi.name}</h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <div className="text-2xl font-extrabold text-blue-700">{score?.percent.toFixed(2) || '0'}%</div>
              <div className="text-xs text-gray-500">ผลงาน</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <div className="text-2xl font-extrabold text-amber-600">{kpi.targetPercent}%</div>
              <div className="text-xs text-gray-500">เป้าหมาย</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <div className="text-2xl font-extrabold text-green-700">{score?.score || 0}</div>
              <div className="text-xs text-gray-500">คะแนน (1-5)</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <div className="text-xl font-bold">A: {score?.valueA || 0} / B: {score?.valueB || 0}</div>
              <div className="text-xs text-gray-500">ตัวตั้ง/ตัวหาร</div>
            </div>
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex gap-2">
              <span className="font-bold w-24">ยุทธศาสตร์:</span>
              <span>{kpi.strategy.code}. {kpi.strategy.name}</span>
            </div>
            {kpi.cluster && (
              <div className="flex gap-2">
                <span className="font-bold w-24">กลุ่มงาน:</span>
                <span>{kpi.cluster.code} {kpi.cluster.name}</span>
              </div>
            )}
            <div className="flex gap-2">
              <span className="font-bold w-24">แหล่งข้อมูล:</span>
              <span>{kpi.dataSource}</span>
            </div>
          </div>

          {kpi.hdcUrl && (
            <a href={kpi.hdcUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-1 mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium">
              ดูรายงาน HDC <ExternalLink size={14} />
            </a>
          )}
        </div>

        {/* Hospital Comparison */}
        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <h3 className="font-bold text-lg mb-4">เปรียบเทียบรายหน่วยบริการ ({comparisons.length} แห่ง)</h3>
          <div className="space-y-3">
            {comparisons.map((comp) => (
              <div key={comp.id} className="flex items-center gap-4 py-2 border-b last:border-0">
                <Link href={`/hospital/${comp.hospital.id}`} className="text-sm font-medium text-blue-700 hover:underline w-48 truncate">
                  {comp.hospital.name}
                </Link>
                <div className="flex-1">
                  <ProgressBar value={comp.percent} target={kpi.targetPercent} size="sm" />
                </div>
                <span className={`text-sm font-extrabold w-16 text-right ${
                  comp.status === 'pass' ? 'text-green-600' : comp.status === 'fail' ? 'text-red-600' : 'text-gray-400'
                }`}>
                  {comp.percent.toFixed(1)}%
                </span>
                <span className="text-xs text-gray-400 w-8">
                  {comp.score}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
