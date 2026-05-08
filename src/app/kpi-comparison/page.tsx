import { getKpisWithScores, getHospitals } from '@/lib/data';
import { getHospitalKpiComparison } from '@/lib/data';
import PageWrapper from '@/components/PageWrapper';
import ProgressBar from '@/components/ProgressBar';
import Link from 'next/link';

export default async function KpiComparisonPage({
  searchParams,
}: {
  searchParams: Promise<{ kpi?: string }>;
}) {
  const params = await searchParams;
  const kpis = await getKpisWithScores(2569);
  const hospitals = await getHospitals();
  const selectedKpiId = params.kpi ? parseInt(params.kpi) : kpis[0]?.id;

  const comparisons = selectedKpiId ? await getHospitalKpiComparison(selectedKpiId, 2569) : [];
  const selectedKpi = kpis.find((k) => k.id === selectedKpiId);

  return (
    <PageWrapper>
      <div className="bg-gradient-to-br from-blue-900 to-blue-600 text-white py-8 rounded-b-[30px]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold">เปรียบเทียบรายตัว</h2>
          <p className="text-blue-200 text-sm mt-1">เปรียบเทียบผลงานแต่ละหน่วยบริการแยกตามตัวชี้วัด</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* KPI Selector */}
        <div className="bg-white rounded-2xl border shadow-sm p-5 mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-2">เลือกตัวชี้วัด</label>
          <form className="flex gap-3">
            <select name="kpi" defaultValue={selectedKpiId} className="flex-1 border rounded-lg px-4 py-2.5 text-sm bg-white">
              {kpis.map((kpi) => (
                <option key={kpi.id} value={kpi.id}>
                  {kpi.order}. {kpi.name.substring(0, 80)}
                </option>
              ))}
            </select>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-700">
              แสดง
            </button>
          </form>
        </div>

        {selectedKpi && (
          <div className="bg-white rounded-2xl border shadow-sm p-5 mb-4">
            <h3 className="font-bold text-lg mb-1">{selectedKpi.name}</h3>
            <p className="text-sm text-gray-500">เป้าหมาย {selectedKpi.targetPercent}% | แหล่งข้อมูล: {selectedKpi.dataSource}</p>
          </div>
        )}

        {/* Hospital Comparison */}
        <div className="space-y-3">
          {comparisons.map((comp) => (
            <div key={comp.id} className="bg-white rounded-2xl border p-4 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <Link href={`/hospital/${comp.hospital.id}`} className="font-bold text-sm text-blue-700 hover:underline">
                    {comp.hospital.name}
                  </Link>
                  <span className="text-xs text-gray-400 ml-2">{comp.hospital.type}</span>
                </div>
                <div className="text-right">
                  <span className={`text-xl font-extrabold ${
                    comp.status === 'pass' ? 'text-green-600' : comp.status === 'fail' ? 'text-red-600' : 'text-gray-400'
                  }`}>
                    {comp.percent.toFixed(2)}%
                  </span>
                </div>
              </div>
              <ProgressBar value={comp.percent} target={selectedKpi?.targetPercent || 100} size="sm" />
              <div className="text-xs text-gray-400 mt-1">
                A: {comp.valueA} / B: {comp.valueB} | คะแนน: {comp.score}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
