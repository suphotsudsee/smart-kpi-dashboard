import { fetchMophReport, INSTYPE_LABELS, type OpdInstypeRow } from "@/lib/moph-api";
import PageWrapper from "@/components/PageWrapper";
import { Activity, Filter } from "lucide-react";

/** Hospital name mapping — MOPH API ไม่มีชื่อ รพ. โดยตรง (ใช้ static map) */
const HOSPITAL_NAMES: Record<string, string> = {
  "10952": "โรงพยาบาลนาจะหลวย",
  "03685": "รพ.สต.โนนสมบูรณ์",
  "03686": "รพ.สต.โคกสว่าง",
  "03687": "รพ.สต.นาโพธิ์",
  "03688": "รพ.สต.บุ่งหวาย",
  "03689": "รพ.สต.บ้านตูม",
  "03690": "รพ.สต.ห้วยขะยุง",
  "03691": "รพ.สต.หนองแสง",
  "13875": "รพ.สต.ดงสวาง",
};

function hospitalName(code: string): string {
  return HOSPITAL_NAMES[code] || code;
}

export const dynamic = "force-dynamic";

export default async function OpdInstypePage() {
  let rows: OpdInstypeRow[] = [];
  let error: string | null = null;

  try {
    const result = await fetchMophReport({
      tableName: "s_op_instype_all",
      year: 2569,
    });
    if (result.success) rows = result.data;
    else error = result.error ?? "API returned no data";
  } catch (e) {
    error = String(e);
  }

  // Filter: เฉพาะ อ.นาจะหลวย (areacode starts with 3412)
  const nachaluaiRows = rows.filter((r) => r.areacode?.startsWith("3412"));

  if (error) {
    return (
      <PageWrapper>
        <div className="max-w-4xl mx-auto p-8 text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">⚠️ ไม่สามารถเชื่อมต่อ MOPH API ได้</h2>
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      </PageWrapper>
    );
  }

  if (!nachaluaiRows.length) {
    return (
      <PageWrapper>
        <div className="max-w-4xl mx-auto p-8 text-center">
          <h2 className="text-xl font-bold text-gray-400 mb-2">ไม่มีข้อมูล</h2>
          <p className="text-gray-500 text-sm">ไม่พบข้อมูลสำหรับ อ.นาจะหลวย ปี 2569</p>
        </div>
      </PageWrapper>
    );
  }

  // Aggregate totals
  let totalPersons = 0;
  let totalVisits = 0;
  const instypeTotals: Record<string, { persons: number; visits: number }> = {};

  for (const row of nachaluaiRows) {
    totalPersons += parseInt(row.inscl_all, 10) || 0;
    totalVisits += parseInt(row.visit_all, 10) || 0;

    for (let i = 1; i <= 5; i++) {
      const key = `inscl${i}` as keyof OpdInstypeRow;
      const visitKey = `inscl_visit${i}` as keyof OpdInstypeRow;
      const persons = parseInt((row as any)[key], 10) || 0;
      const visits = parseInt((row as any)[visitKey], 10) || 0;
      if (persons || visits) {
        if (!instypeTotals[key]) instypeTotals[key] = { persons: 0, visits: 0 };
        instypeTotals[key].persons += persons;
        instypeTotals[key].visits += visits;
      }
    }
  }

  const sortedInstypes = Object.entries(instypeTotals).sort((a, b) => b[1].visits - a[1].visits);
  const maxPersons = Math.max(...sortedInstypes.map(([, v]) => v.persons), 1);
  const maxVisits = Math.max(...sortedInstypes.map(([, v]) => v.visits), 1);

  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-700 to-teal-500 text-white rounded-2xl p-6 mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Activity size={28} />
            อัตราการใช้บริการผู้ป่วยนอก
          </h2>
          <p className="text-teal-100 mt-1 text-sm flex items-center gap-2">
            จำแนกตามกลุ่มสิทธิการรักษา — ปีงบประมาณ 2569
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
              <Filter size={12} /> อ.นาจะหลวย
            </span>
          </p>
          <div className="flex gap-4 mt-3">
            <p className="text-teal-200 font-bold">
              <span className="text-white/70 text-sm">ผู้ป่วย: </span>
              {totalPersons.toLocaleString("th-TH")} คน
            </p>
            <p className="text-teal-200 font-bold">
              <span className="text-white/70 text-sm">ครั้งบริการ: </span>
              {totalVisits.toLocaleString("th-TH")} ครั้ง
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <MiniCard label="หน่วยบริการ" value={nachaluaiRows.length} color="blue" />
          <MiniCard label="ผู้ป่วยรวม" value={totalPersons.toLocaleString("th-TH")} color="green" />
          <MiniCard label="ครั้งบริการ" value={totalVisits.toLocaleString("th-TH")} color="purple" />
        </div>

        {/* By Instype — Persons */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-5">
          <h3 className="font-bold text-gray-800 mb-4">จำนวนผู้ป่วยนอกแยกตามสิทธิ (คน)</h3>
          <div className="space-y-3">
            {sortedInstypes.map(([key, { persons }]) => {
              const pct = ((persons / maxPersons) * 100).toFixed(0);
              return (
                <div key={key}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{INSTYPE_LABELS[key] || key}</span>
                    <span className="text-gray-500 font-mono text-xs">{persons.toLocaleString("th-TH")}</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-3 rounded-full bg-teal-500 transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* By Instype — Visits */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-5">
          <h3 className="font-bold text-gray-800 mb-4">จำนวนครั้งบริการแยกตามสิทธิ (ครั้ง)</h3>
          <div className="space-y-3">
            {sortedInstypes.map(([key, { visits }]) => {
              const pct = ((visits / maxVisits) * 100).toFixed(0);
              return (
                <div key={key}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{INSTYPE_LABELS[key] || key}</span>
                    <span className="text-gray-500 font-mono text-xs">{visits.toLocaleString("th-TH")}</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-3 rounded-full bg-blue-500 transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hospital list */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h3 className="font-bold text-gray-800 mb-4">รายหน่วยบริการ — อ.นาจะหลวย</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="py-2 pr-4">รหัส</th>
                  <th className="py-2 pr-4">ชื่อหน่วยบริการ</th>
                  <th className="py-2 pr-4 text-right">ผู้ป่วย</th>
                  <th className="py-2 pr-4 text-right">ครั้งบริการ</th>
                  <th className="py-2 text-right">ครั้ง/คน</th>
                </tr>
              </thead>
              <tbody>
                {nachaluaiRows
                  .sort((a, b) => (parseInt(b.visit_all, 10) || 0) - (parseInt(a.visit_all, 10) || 0))
                  .map((row) => {
                    const persons = parseInt(row.inscl_all, 10) || 0;
                    const visits = parseInt(row.visit_all, 10) || 0;
                    const ratio = persons ? (visits / persons).toFixed(1) : "—";
                    return (
                      <tr key={row.hospcode} className="border-b last:border-0 hover:bg-gray-50">
                        <td className="py-2 pr-4 font-mono text-xs text-gray-600">{row.hospcode}</td>
                        <td className="py-2 pr-4 text-sm text-gray-800">{hospitalName(row.hospcode)}</td>
                        <td className="py-2 pr-4 text-right">{persons.toLocaleString("th-TH")}</td>
                        <td className="py-2 pr-4 text-right">{visits.toLocaleString("th-TH")}</td>
                        <td className="py-2 text-right">{ratio}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs text-gray-400 text-center mt-6">
          ข้อมูลจาก MOPH Open Data API — opendata.moph.go.th | ประมวลผลล่าสุด: {nachaluaiRows[0]?.date_com || "—"}
        </p>
      </div>
    </PageWrapper>
  );
}

function MiniCard({ label, value, color }: { label: string; value: number | string; color: "blue" | "green" | "purple" }) {
  const bg = color === "blue" ? "bg-blue-50 border-blue-200" : color === "purple" ? "bg-purple-50 border-purple-200" : "bg-green-50 border-green-200";
  const text = color === "blue" ? "text-blue-800" : color === "purple" ? "text-purple-800" : "text-green-800";
  return (
    <div className={`rounded-xl border p-4 text-center ${bg}`}>
      <div className={`text-xl font-bold ${text}`}>{value}</div>
      <div className="text-xs mt-1 text-gray-500">{label}</div>
    </div>
  );
}
