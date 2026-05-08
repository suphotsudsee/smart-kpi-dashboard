import { getKpisWithScores, getHospitals } from '@/lib/data';
import PageWrapper from '@/components/PageWrapper';
import StatusBadge from '@/components/StatusBadge';
import Link from 'next/link';

export default async function KpiMatrixPage() {
  const kpis = await getKpisWithScores(2569);
  const hospitals = await getHospitals();

  // Group by strategy
  const grouped: Record<string, typeof kpis> = {};
  for (const kpi of kpis) {
    const key = kpi.strategy.name;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(kpi);
  }

  return (
    <PageWrapper>
      <div className="bg-gradient-to-br from-blue-900 to-blue-600 text-white py-8 rounded-b-[30px]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold">เปรียบเทียบภาพรวม</h2>
          <p className="text-blue-200 text-sm mt-1">ภาพรวมตัวชี้วัดแบ่งตามยุทธศาสตร์</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {Object.entries(grouped).map(([strategyName, stratKpis]) => {
          const passCount = stratKpis.filter((k) => k.scores[0]?.status === 'pass').length;
          const pct = stratKpis.length > 0 ? Math.round((passCount / stratKpis.length) * 100) : 0;
          return (
            <div key={strategyName} className="bg-white rounded-2xl border shadow-sm overflow-hidden">
              <div className="bg-slate-800 text-white px-6 py-4 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">{strategyName}</h3>
                  <p className="text-slate-400 text-sm">{stratKpis[0]?.strategy.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-extrabold">{pct}%</div>
                  <div className="text-xs text-slate-400">{passCount}/{stratKpis.length} ผ่าน</div>
                </div>
              </div>
              <div className="p-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-gray-500">
                      <th className="py-2 pr-4 w-12">#</th>
                      <th className="py-2 pr-4">ตัวชี้วัด</th>
                      <th className="py-2 pr-4">แหล่งข้อมูล</th>
                      <th className="py-2 pr-4 text-center">ผลงาน</th>
                      <th className="py-2 text-center">สถานะ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stratKpis.map((kpi) => {
                      const score = kpi.scores[0];
                      const pctVal = score?.percent || 0;
                      return (
                        <tr key={kpi.id} className="border-b last:border-0 hover:bg-gray-50">
                          <td className="py-2 text-gray-400 font-bold">{kpi.order}</td>
                          <td className="py-2">
                            <Link href={`/kpi/${kpi.id}`} className="text-blue-600 hover:underline font-medium">
                              {kpi.name}
                            </Link>
                          </td>
                          <td className="py-2 text-xs text-gray-500">{kpi.dataSource}</td>
                          <td className="py-2 text-center font-bold">{pctVal.toFixed(1)}%</td>
                          <td className="py-2 text-center">
                            <StatusBadge status={score?.status || 'pending'} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </PageWrapper>
  );
}
