import { getHospitalsWithScores } from '@/lib/data';
import PageWrapper from '@/components/PageWrapper';
import StatusBadge from '@/components/StatusBadge';
import Link from 'next/link';
import { Hospital, ChevronRight } from 'lucide-react';

export default async function HospitalSummaryPage() {
  const hospitals = await getHospitalsWithScores(2569);

  return (
    <PageWrapper>
      <div className="bg-gradient-to-br from-blue-900 to-blue-600 text-white py-8 rounded-b-[30px]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold">สรุปรายหน่วยบริการ</h2>
          <p className="text-blue-200 text-sm mt-1">ผลงานตัวชี้วัดแยกรายหน่วยบริการ</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hospitals.map((hosp) => {
            const scores = hosp.scores;
            const total = scores.length;
            const pass = scores.filter((s) => s.status === 'pass').length;
            const fail = scores.filter((s) => s.status === 'fail').length;
            const pct = total > 0 ? Math.round((pass / total) * 100) : 0;
            
            return (
              <Link
                key={hosp.id}
                href={`/hospital/${hosp.id}`}
                className="bg-white rounded-2xl border p-5 hover:shadow-lg hover:-translate-y-1 transition-all block"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Hospital size={20} className="text-blue-600" />
                  </div>
                  <ChevronRight size={16} className="text-gray-300 mt-1" />
                </div>
                <h3 className="font-bold text-sm mb-1">{hosp.name}</h3>
                <span className="text-xs text-gray-400">{hosp.type}</span>
                
                <div className="mt-3 flex items-center gap-4">
                  <div>
                    <div className="text-2xl font-extrabold text-blue-700">{pct}%</div>
                    <div className="text-xs text-gray-400">ผ่าน</div>
                  </div>
                  <div className="flex-1">
                    <div className="flex gap-1 mb-1">
                      <span className="text-xs text-green-600 font-bold">✓ {pass}</span>
                      <span className="text-xs text-red-600 font-bold ml-2">✗ {fail}</span>
                    </div>
                    <div className="text-xs text-gray-400">รวม {total} ตัวชี้วัด</div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </PageWrapper>
  );
}
