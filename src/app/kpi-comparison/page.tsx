import { getKpisWithScores, getHospitals } from '@/lib/data';
import { getHospitalKpiComparison } from '@/lib/data';

export const dynamic = 'force-dynamic';
     1|import { getKpisWithScores, getHospitals } from '@/lib/data';
     2|import { getHospitalKpiComparison } from '@/lib/data';
     3|import PageWrapper from '@/components/PageWrapper';
     4|import ProgressBar from '@/components/ProgressBar';
     5|import Link from 'next/link';
     6|
     7|export const dynamic = 'force-dynamic'
     8|
     9|export default async function KpiComparisonPage({
    10|  searchParams,
    11|}: {
    12|  searchParams: Promise<{ kpi?: string }>;
    13|}) {
    14|  const params = await searchParams;
    15|  const kpis = await getKpisWithScores(2569);
    16|  const hospitals = await getHospitals();
    17|  const selectedKpiId = params.kpi ? parseInt(params.kpi) : kpis[0]?.id;
    18|
    19|  const comparisons = selectedKpiId ? await getHospitalKpiComparison(selectedKpiId, 2569) : [];
    20|  const selectedKpi = kpis.find((k) => k.id === selectedKpiId);
    21|
    22|  return (
    23|    <PageWrapper>
    24|      <div className="bg-gradient-to-br from-blue-900 to-blue-600 text-white py-8 rounded-b-[30px]">
    25|        <div className="max-w-7xl mx-auto px-4">
    26|          <h2 className="text-2xl font-bold">เปรียบเทียบรายตัว</h2>
    27|          <p className="text-blue-200 text-sm mt-1">เปรียบเทียบผลงานแต่ละหน่วยบริการแยกตามตัวชี้วัด</p>
    28|        </div>
    29|      </div>
    30|
    31|      <div className="max-w-7xl mx-auto px-4 py-6">
    32|        {/* KPI Selector */}
    33|        <div className="bg-white rounded-2xl border shadow-sm p-5 mb-6">
    34|          <label className="block text-sm font-bold text-gray-700 mb-2">เลือกตัวชี้วัด</label>
    35|          <form className="flex gap-3">
    36|            <select name="kpi" defaultValue={selectedKpiId} className="flex-1 border rounded-lg px-4 py-2.5 text-sm bg-white">
    37|              {kpis.map((kpi) => (
    38|                <option key={kpi.id} value={kpi.id}>
    39|                  {kpi.order}. {kpi.name.substring(0, 80)}
    40|                </option>
    41|              ))}
    42|            </select>
    43|            <button type="submit" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-700">
    44|              แสดง
    45|            </button>
    46|          </form>
    47|        </div>
    48|
    49|        {selectedKpi && (
    50|          <div className="bg-white rounded-2xl border shadow-sm p-5 mb-4">
    51|            <h3 className="font-bold text-lg mb-1">{selectedKpi.name}</h3>
    52|            <p className="text-sm text-gray-500">เป้าหมาย {selectedKpi.targetPercent}% | แหล่งข้อมูล: {selectedKpi.dataSource}</p>
    53|          </div>
    54|        )}
    55|
    56|        {/* Hospital Comparison */}
    57|        <div className="space-y-3">
    58|          {comparisons.map((comp) => (
    59|            <div key={comp.id} className="bg-white rounded-2xl border p-4 hover:shadow-md transition-all">
    60|              <div className="flex items-center justify-between mb-2">
    61|                <div>
    62|                  <Link href={`/hospital/${comp.hospital.id}`} className="font-bold text-sm text-blue-700 hover:underline">
    63|                    {comp.hospital.name}
    64|                  </Link>
    65|                  <span className="text-xs text-gray-400 ml-2">{comp.hospital.type}</span>
    66|                </div>
    67|                <div className="text-right">
    68|                  <span className={`text-xl font-extrabold ${
    69|                    comp.status === 'pass' ? 'text-green-600' : comp.status === 'fail' ? 'text-red-600' : 'text-gray-400'
    70|                  }`}>
    71|                    {comp.percent.toFixed(2)}%
    72|                  </span>
    73|                </div>
    74|              </div>
    75|              <ProgressBar value={comp.percent} target={selectedKpi?.targetPercent || 100} size="sm" />
    76|              <div className="text-xs text-gray-400 mt-1">
    77|                A: {comp.valueA} / B: {comp.valueB} | คะแนน: {comp.score}
    78|              </div>
    79|            </div>
    80|          ))}
    81|        </div>
    82|      </div>
    83|    </PageWrapper>
    84|  );
    85|}
    86|
