import { getHospitalsWithScores } from '@/lib/data';

export const dynamic = 'force-dynamic';
     1|import { getHospitalsWithScores } from '@/lib/data';
     2|import PageWrapper from '@/components/PageWrapper';
     3|import StatusBadge from '@/components/StatusBadge';
     4|import Link from 'next/link';
     5|import { Hospital, ChevronRight } from 'lucide-react';
     6|
     7|export const dynamic = 'force-dynamic'
     8|
     9|export default async function HospitalSummaryPage() {
    10|  const hospitals = await getHospitalsWithScores(2569);
    11|
    12|  return (
    13|    <PageWrapper>
    14|      <div className="bg-gradient-to-br from-blue-900 to-blue-600 text-white py-8 rounded-b-[30px]">
    15|        <div className="max-w-7xl mx-auto px-4">
    16|          <h2 className="text-2xl font-bold">สรุปรายหน่วยบริการ</h2>
    17|          <p className="text-blue-200 text-sm mt-1">ผลงานตัวชี้วัดแยกรายหน่วยบริการ</p>
    18|        </div>
    19|      </div>
    20|
    21|      <div className="max-w-7xl mx-auto px-4 py-6">
    22|        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
    23|          {hospitals.map((hosp) => {
    24|            const scores = hosp.scores;
    25|            const total = scores.length;
    26|            const pass = scores.filter((s) => s.status === 'pass').length;
    27|            const fail = scores.filter((s) => s.status === 'fail').length;
    28|            const pct = total > 0 ? Math.round((pass / total) * 100) : 0;
    29|            
    30|            return (
    31|              <Link
    32|                key={hosp.id}
    33|                href={`/hospital/${hosp.id}`}
    34|                className="bg-white rounded-2xl border p-5 hover:shadow-lg hover:-translate-y-1 transition-all block"
    35|              >
    36|                <div className="flex items-start justify-between mb-3">
    37|                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
    38|                    <Hospital size={20} className="text-blue-600" />
    39|                  </div>
    40|                  <ChevronRight size={16} className="text-gray-300 mt-1" />
    41|                </div>
    42|                <h3 className="font-bold text-sm mb-1">{hosp.name}</h3>
    43|                <span className="text-xs text-gray-400">{hosp.type}</span>
    44|                
    45|                <div className="mt-3 flex items-center gap-4">
    46|                  <div>
    47|                    <div className="text-2xl font-extrabold text-blue-700">{pct}%</div>
    48|                    <div className="text-xs text-gray-400">ผ่าน</div>
    49|                  </div>
    50|                  <div className="flex-1">
    51|                    <div className="flex gap-1 mb-1">
    52|                      <span className="text-xs text-green-600 font-bold">✓ {pass}</span>
    53|                      <span className="text-xs text-red-600 font-bold ml-2">✗ {fail}</span>
    54|                    </div>
    55|                    <div className="text-xs text-gray-400">รวม {total} ตัวชี้วัด</div>
    56|                  </div>
    57|                </div>
    58|              </Link>
    59|            );
    60|          })}
    61|        </div>
    62|      </div>
    63|    </PageWrapper>
    64|  );
    65|}
    66|
