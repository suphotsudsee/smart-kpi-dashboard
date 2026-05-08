import { getKpisWithScores, getHospitals } from '@/lib/data';

export const dynamic = 'force-dynamic';
     1|import { getKpisWithScores, getHospitals } from '@/lib/data';
     2|import PageWrapper from '@/components/PageWrapper';
     3|import StatusBadge from '@/components/StatusBadge';
     4|import Link from 'next/link';
     5|
     6|export const dynamic = 'force-dynamic'
     7|
     8|export default async function KpiMatrixPage() {
     9|  const kpis = await getKpisWithScores(2569);
    10|  const hospitals = await getHospitals();
    11|
    12|  // Group by strategy
    13|  const grouped: Record<string, typeof kpis> = {};
    14|  for (const kpi of kpis) {
    15|    const key = kpi.strategy.name;
    16|    if (!grouped[key]) grouped[key] = [];
    17|    grouped[key].push(kpi);
    18|  }
    19|
    20|  return (
    21|    <PageWrapper>
    22|      <div className="bg-gradient-to-br from-blue-900 to-blue-600 text-white py-8 rounded-b-[30px]">
    23|        <div className="max-w-7xl mx-auto px-4">
    24|          <h2 className="text-2xl font-bold">เปรียบเทียบภาพรวม</h2>
    25|          <p className="text-blue-200 text-sm mt-1">ภาพรวมตัวชี้วัดแบ่งตามยุทธศาสตร์</p>
    26|        </div>
    27|      </div>
    28|
    29|      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
    30|        {Object.entries(grouped).map(([strategyName, stratKpis]) => {
    31|          const passCount = stratKpis.filter((k) => k.scores[0]?.status === 'pass').length;
    32|          const pct = stratKpis.length > 0 ? Math.round((passCount / stratKpis.length) * 100) : 0;
    33|          return (
    34|            <div key={strategyName} className="bg-white rounded-2xl border shadow-sm overflow-hidden">
    35|              <div className="bg-slate-800 text-white px-6 py-4 flex items-center justify-between">
    36|                <div>
    37|                  <h3 className="font-bold text-lg">{strategyName}</h3>
    38|                  <p className="text-slate-400 text-sm">{stratKpis[0]?.strategy.description}</p>
    39|                </div>
    40|                <div className="text-right">
    41|                  <div className="text-2xl font-extrabold">{pct}%</div>
    42|                  <div className="text-xs text-slate-400">{passCount}/{stratKpis.length} ผ่าน</div>
    43|                </div>
    44|              </div>
    45|              <div className="p-4 overflow-x-auto">
    46|                <table className="w-full text-sm">
    47|                  <thead>
    48|                    <tr className="border-b text-left text-gray-500">
    49|                      <th className="py-2 pr-4 w-12">#</th>
    50|                      <th className="py-2 pr-4">ตัวชี้วัด</th>
    51|                      <th className="py-2 pr-4">แหล่งข้อมูล</th>
    52|                      <th className="py-2 pr-4 text-center">ผลงาน</th>
    53|                      <th className="py-2 text-center">สถานะ</th>
    54|                    </tr>
    55|                  </thead>
    56|                  <tbody>
    57|                    {stratKpis.map((kpi) => {
    58|                      const score = kpi.scores[0];
    59|                      const pctVal = score?.percent || 0;
    60|                      return (
    61|                        <tr key={kpi.id} className="border-b last:border-0 hover:bg-gray-50">
    62|                          <td className="py-2 text-gray-400 font-bold">{kpi.order}</td>
    63|                          <td className="py-2">
    64|                            <Link href={`/kpi/${kpi.id}`} className="text-blue-600 hover:underline font-medium">
    65|                              {kpi.name}
    66|                            </Link>
    67|                          </td>
    68|                          <td className="py-2 text-xs text-gray-500">{kpi.dataSource}</td>
    69|                          <td className="py-2 text-center font-bold">{pctVal.toFixed(1)}%</td>
    70|                          <td className="py-2 text-center">
    71|                            <StatusBadge status={score?.status || 'pending'} />
    72|                          </td>
    73|                        </tr>
    74|                      );
    75|                    })}
    76|                  </tbody>
    77|                </table>
    78|              </div>
    79|            </div>
    80|          );
    81|        })}
    82|      </div>
    83|    </PageWrapper>
    84|  );
    85|}
    86|
