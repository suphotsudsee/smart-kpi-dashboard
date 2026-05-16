'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Database } from 'lucide-react';

const DISTRICTS = [
  { value: '', label: 'ทุกอำเภอ' },
  { value: 'เมืองอุบลราชธานี', label: 'เมืองอุบลราชธานี' },
  { value: 'วารินชำราบ', label: 'วารินชำราบ' },
  { value: 'เดชอุดม', label: 'เดชอุดม' },
  { value: 'นาจะหลวย', label: 'นาจะหลวย' },
  { value: 'เขมราฐ', label: 'เขมราฐ' },
  { value: 'โขงเจียม', label: 'โขงเจียม' },
];

export default function DashboardHeader() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const district = searchParams.get('district') || '';

  function handleDistrictChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('district', value);
    } else {
      params.delete('district');
    }
    router.replace(`?${params.toString()}`);
  }

  function handleYearChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('year', value);
    router.replace(`?${params.toString()}`);
  }

  const heading = district ? `Dashboard สรุปตัวชี้วัด — ${district}` : 'Dashboard สรุปตัวชี้วัด';

  return (
    <div className="bg-gradient-to-br from-blue-900 to-blue-600 text-white py-10 rounded-b-[30px]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-2">
          <Database size={28} />
          <h2 className="text-2xl font-bold">{heading}</h2>
        </div>
        <p className="text-blue-200 text-sm">อัปเดตล่าสุด: 07/05/2569 12:08 น.</p>

        <div className="mt-3 flex gap-3">
          <select
            value={district}
            onChange={(e) => handleDistrictChange(e.target.value)}
            className="bg-white/10 border border-white/20 text-white rounded-lg px-4 py-2 text-sm"
          >
            {DISTRICTS.map((d) => (
              <option key={d.value} value={d.value} className="text-gray-900">
                {d.label}
              </option>
            ))}
          </select>

          <select
            value={searchParams.get('year') || '2569'}
            onChange={(e) => handleYearChange(e.target.value)}
            className="bg-white/10 border border-white/20 text-white rounded-lg px-4 py-2 text-sm"
          >
            {[2569, 2568, 2567, 2566, 2565].map((y) => (
              <option key={y} value={y} className="text-gray-900">ปีงบประมาณ {y}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
