"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Activity, Users, Hospital, BedDouble, Building2, ArrowRight,
  TrendingUp, AlertTriangle, CheckCircle, XCircle, Link2,
  Phone, Heart, Syringe, Ambulance, MapPin, Clock, ShieldAlert,
  Stethoscope, ChevronRight,
} from "lucide-react";

// ============================================================================
// Types
// ============================================================================

interface InstypeItem { key: string; label: string; persons: number; visits: number; }
interface HospitalItem { hospcode: string; name: string; persons: number; visits: number; ratio: number; }
interface SectionData {
  totalPersons: number; totalVisits: number; hospitalCount: number; dateCom: string;
  instypes: InstypeItem[]; hospitals: HospitalItem[];
}
interface NachaluaiData {
  ok: boolean; year: number; district: string;
  opd: SectionData; ipd: SectionData;
}
interface TableInfo { name: string; status: "working" | "broken"; reason?: string; }

// ============================================================================
// Main Component
// ============================================================================

export default function CommandCenter() {
  const [data, setData] = useState<NachaluaiData | null>(null);
  const [tables, setTables] = useState<TableInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/nachaluai/data").then(r => r.json()),
      fetch("/api/nachaluai/tables").then(r => r.json()),
    ]).then(([d, t]) => {
      if (d.ok) setData(d); else setError(d.error);
      if (t.ok) setTables([...t.working, ...t.broken]);
    }).catch(e => setError(String(e)))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} />;
  if (!data) return null;

  const workingCount = tables.filter(t => t.status === "working").length;
  const totalTables = tables.length;

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white font-sans">

      {/* ======== TOP BAR ======== */}
      <header className="border-b border-white/5 px-6 py-3 flex items-center justify-between bg-[#0d1321]/80 backdrop-blur sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
            <Activity size={14} className="text-black" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-wider">JHCIS PROVINCIAL COMMAND CENTER</h1>
            <p className="text-[10px] text-gray-500 tracking-wide">UBON RATCHATHANI PRIMARY CARE — {data.district}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            LIVE
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })}
          </span>
          <span className="bg-white/5 px-2 py-0.5 rounded text-gray-400">
            API {workingCount}/{totalTables}
          </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-5">
        {/* ======== ROW 1: KPI CARDS (6 cards) ======== */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* Card 1: Total OPD */}
            <KpiCard
              icon={<Users size={16} />}
              label="Total OPD"
              value={data.opd.totalPersons.toLocaleString("th-TH")}
              sub={`${data.opd.totalVisits.toLocaleString("th-TH")} ครั้ง`}
              color="emerald"
              detail={`${data.opd.hospitalCount} หน่วยบริการ`}
            />

            {/* Card 2: IPD */}
            <KpiCard
              icon={<BedDouble size={16} />}
              label="IPD"
              value={data.ipd.totalPersons.toLocaleString("th-TH")}
              sub={`${data.ipd.totalVisits.toLocaleString("th-TH")} วัน`}
              color="cyan"
              detail={`${data.ipd.hospitalCount} หน่วยบริการ`}
            />

            {/* Card 3: NCD Clinic */}
            <KpiCard
              icon={<Heart size={16} />}
              label="NCD Clinic"
              value="—"
              sub="รอเชื่อมต่อ JHCIS"
              color="amber"
              detail="ICD E10-E14, I10-I15"
              warning
            />

            {/* Card 4: Telemedicine */}
            <KpiCard
              icon={<Phone size={16} />}
              label="Telemedicine"
              value="—"
              sub="เป้าหมาย ≥ 30%"
              color="purple"
              detail="รอเชื่อมต่อ JHCIS"
              warning
            />

            {/* Card 5: Health Promotion */}
            <KpiCard
              icon={<Syringe size={16} />}
              label="PP/HP"
              value="—"
              sub="ANC · วัคซีน · PP"
              color="pink"
              detail="รอเชื่อมต่อ JHCIS"
              warning
            />

            {/* Card 6: Refer Out */}
            <KpiCard
              icon={<Ambulance size={16} />}
              label="Refer Out"
              value="—"
              sub="ไป รพ.แม่ข่าย"
              color="red"
              detail="รอเชื่อมต่อ JHCIS"
              warning
            />
          </div>
        </section>

        {/* ======== ROW 2: MAP + ALERTS ======== */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Map Placeholder */}
          <div className="lg:col-span-2 bg-white/5 rounded-xl border border-white/5 p-5">
            <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <MapPin size={15} className="text-emerald-400" />
              Real-time Monitoring Map — อ.นาจะหลวย
            </h3>
            <div className="aspect-[16/10] bg-[#060b14] rounded-lg border border-white/5 flex items-center justify-center">
              <div className="text-center space-y-3">
                <MapPin size={40} className="text-gray-600 mx-auto" />
                <div>
                  <p className="text-sm text-gray-500">แผนที่แสดงหมุด รพ.สต. 9 แห่ง</p>
                  <p className="text-xs text-gray-600 mt-1">
                    🟢 ปกติ · 🟡 หนาแน่น · 🔴 ฉุกเฉิน
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-2 text-xs">
                  {Object.entries({
                    "รพ.นาจะหลวย": "🟢", "รพ.สต.โนนสมบูรณ์": "🟢",
                    "รพ.สต.โคกสว่าง": "🟢", "รพ.สต.นาโพธิ์": "🟢",
                    "รพ.สต.บุ่งหวาย": "🟢", "รพ.สต.บ้านตูม": "🟢",
                    "รพ.สต.ห้วยขะยุง": "🟢", "รพ.สต.หนองแสง": "🟢",
                    "รพ.สต.ดงสวาง": "🟢",
                  }).map(([name, status]) => (
                    <span key={name} className="bg-white/5 px-2 py-0.5 rounded">{status} {name}</span>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-[10px] text-gray-600 mt-2 text-center">
              Leaflet Map — activate when lat/lng confirmed for all 9 locations
            </p>
          </div>

          {/* Critical Alerts */}
          <div className="bg-white/5 rounded-xl border border-white/5 p-5">
            <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <ShieldAlert size={15} className="text-red-400" />
              Critical Alerts
            </h3>
            <div className="space-y-3">
              <AlertItem
                icon="🩸"
                title="BP ≥ 180/110 mmHg"
                desc="ผู้ป่วยความดันวิกฤต"
                count="—"
              />
              <AlertItem
                icon="🩸"
                title="DTX ≥ 300 / ≤ 50 mg/dL"
                desc="น้ำตาลในเลือดวิกฤต"
                count="—"
              />
              <AlertItem
                icon="🫁"
                title="O₂ Sat < 90%"
                desc="ค่าออกซิเจนต่ำ"
                count="—"
              />
              <AlertItem
                icon="🚨"
                title="Triage Level 1"
                desc="Resuscitation"
                count="—"
              />
            </div>
            <p className="text-[10px] text-gray-600 mt-3 text-center">
              ข้อมูลจาก visitdiag + lab results · รอเชื่อมต่อ JHCIS
            </p>
          </div>
        </section>

        {/* ======== ROW 3: OPD + IPD DETAIL PANELS ======== */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* OPD Panel */}
          <div className="bg-white/5 rounded-xl border border-white/5 p-5">
            <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <Users size={15} className="text-emerald-400" />
              OPD — ผู้ป่วยนอก แยกตามสิทธิ
            </h3>
            <div className="space-y-2 mb-4">
              {data.opd.instypes.map(i => (
                <SimpleBar key={i.key} label={i.label} value={i.persons} max={Math.max(...data.opd.instypes.map(x => x.persons), 1)} color="emerald" />
              ))}
            </div>
            <div className="space-y-2">
              {data.opd.instypes.map(i => (
                <SimpleBar key={`v-${i.key}`} label={i.label} value={i.visits} max={Math.max(...data.opd.instypes.map(x => x.visits), 1)} color="cyan" label2="ครั้ง" />
              ))}
            </div>
          </div>

          {/* IPD Panel */}
          <div className="bg-white/5 rounded-xl border border-white/5 p-5">
            <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <BedDouble size={15} className="text-cyan-400" />
              IPD — ผู้ป่วยใน แยกตามสิทธิ
            </h3>
            <div className="space-y-2 mb-4">
              {data.ipd.instypes.map(i => (
                <SimpleBar key={i.key} label={i.label} value={i.persons} max={Math.max(...data.ipd.instypes.map(x => x.persons), 1)} color="purple" />
              ))}
            </div>
            <div className="space-y-2">
              {data.ipd.instypes.map(i => (
                <SimpleBar key={`v-${i.key}`} label={i.label} value={i.visits} max={Math.max(...data.ipd.instypes.map(x => x.visits), 1)} color="amber" label2="วัน" />
              ))}
            </div>
          </div>
        </section>

        {/* ======== ROW 4: PCU TABLE ======== */}
        <section>
          <div className="bg-white/5 rounded-xl border border-white/5 p-5">
            <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <Building2 size={15} className="text-emerald-400" />
              PCU Status Table — เรียงตามยอด OPD
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-gray-500 text-left">
                    <th className="py-2 pr-3 font-medium">รหัส</th>
                    <th className="py-2 pr-3 font-medium">ชื่อหน่วยบริการ</th>
                    <th className="py-2 pr-3 font-medium text-right">OPD คน</th>
                    <th className="py-2 pr-3 font-medium text-right">OPD ครั้ง</th>
                    <th className="py-2 pr-3 font-medium text-right">ครั้ง/คน</th>
                    <th className="py-2 pr-3 font-medium text-center">NCD</th>
                    <th className="py-2 pr-3 font-medium text-center">Refer</th>
                    <th className="py-2 pr-3 font-medium text-center">Alert</th>
                    <th className="py-2 font-medium text-center">สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  {data.opd.hospitals.map((h, i) => (
                    <tr key={h.hospcode} className={`border-b border-white/5 hover:bg-white/5 ${i === 0 ? "bg-emerald-500/5" : ""}`}>
                      <td className="py-2 pr-3 font-mono text-gray-500">{h.hospcode}</td>
                      <td className="py-2 pr-3">
                        {h.name}
                        {i === 0 && (
                          <span className="ml-1 text-[10px] bg-emerald-500/20 text-emerald-300 px-1 py-0.5 rounded">หลัก</span>
                        )}
                      </td>
                      <td className="py-2 pr-3 text-right tabular-nums text-gray-300">{h.persons.toLocaleString("th-TH")}</td>
                      <td className="py-2 pr-3 text-right tabular-nums text-gray-300">{h.visits.toLocaleString("th-TH")}</td>
                      <td className="py-2 pr-3 text-right tabular-nums text-emerald-300 font-medium">{h.ratio.toFixed(1)}</td>
                      <td className="py-2 pr-3 text-center text-gray-600">—</td>
                      <td className="py-2 pr-3 text-center text-gray-600">—</td>
                      <td className="py-2 pr-3 text-center">
                        <span className="text-emerald-400 text-[10px]">✓ 0</span>
                      </td>
                      <td className="py-2 text-center">
                        <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full">ปกติ</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ======== ROW 5: TREND + REFER ======== */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* 7-Day Trend Placeholder */}
          <div className="bg-white/5 rounded-xl border border-white/5 p-5">
            <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <TrendingUp size={15} className="text-emerald-400" />
              7-Day OPD / NCD Trend
            </h3>
            <div className="h-40 bg-[#060b14] rounded-lg border border-white/5 flex items-center justify-center">
              <div className="text-center">
                <TrendingUp size={24} className="text-gray-600 mx-auto mb-1" />
                <p className="text-xs text-gray-500">กราฟแนวโน้ม 7 วัน</p>
                <p className="text-[10px] text-gray-600">รอข้อมูลจาก JHCIS</p>
              </div>
            </div>
          </div>

          {/* Refer Out Causes Placeholder */}
          <div className="bg-white/5 rounded-xl border border-white/5 p-5">
            <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <Ambulance size={15} className="text-amber-400" />
              Refer Out Causes — 30 วัน
            </h3>
            <div className="h-40 bg-[#060b14] rounded-lg border border-white/5 flex items-center justify-center">
              <div className="text-center">
                <p className="text-xs text-gray-500">Donut Chart — สัดส่วนสาเหตุส่งต่อ</p>
                <p className="text-[10px] text-gray-600 mt-1">referout.refercause</p>
                <div className="flex gap-3 justify-center mt-2 text-[10px] text-gray-600">
                  <span>🔵 อุบัติเหตุ</span>
                  <span>🟠 NCD ซับซ้อน</span>
                  <span>🟢 ส่งต่อปกติ</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======== ROW 6: API STATUS + DATA NOTES ======== */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* API Status Table */}
          <div className="bg-white/5 rounded-xl border border-white/5 p-5">
            <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <Link2 size={15} className="text-emerald-400" />
              API Status — MOPH Open Data
            </h3>
            <div className="overflow-x-auto max-h-60 overflow-y-auto">
              <table className="w-full text-xs">
                <thead className="sticky top-0 bg-[#0a0f1a]">
                  <tr className="border-b border-white/10 text-gray-500 text-left">
                    <th className="py-1.5 pr-2 font-medium">#</th>
                    <th className="py-1.5 pr-2 font-medium">Table</th>
                    <th className="py-1.5 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tables.map((t, i) => (
                    <tr key={t.name} className="border-b border-white/5">
                      <td className="py-1 pr-2 text-gray-600">{i + 1}</td>
                      <td className="py-1 pr-2 font-mono text-[11px] text-gray-400">{t.name}</td>
                      <td className="py-1">
                        {t.status === "working" ? (
                          <span className="text-emerald-400 text-[10px]">✓</span>
                        ) : (
                          <span className="text-red-400 text-[10px]">✗</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[10px] text-gray-600 mt-2">
              {workingCount}/{totalTables} tables available · Public API (no auth)
            </p>
          </div>

          {/* Data Notes */}
          <div className="bg-white/5 rounded-xl border border-white/5 p-5">
            <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <Stethoscope size={15} className="text-emerald-400" />
              Data Notes — JHCIS Mapping
            </h3>
            <div className="space-y-2 text-xs text-gray-500">
              <NoteItem label="Total OPD" detail="MOPH s_op_instype_all → 9 PCU (リアルタイム)" icon="✅" />
              <NoteItem label="IPD" detail="MOPH s_ip_instype_all → รพ.นาจะหลวย" icon="✅" />
              <NoteItem label="NCD Clinic" detail="visitdiag ICD-10 E10-E14, I10-I15" icon="⏳" />
              <NoteItem label="Telemedicine" detail="visit.visittype codes (เป้าหมาย ≥ 30%)" icon="⏳" />
              <NoteItem label="Health Promo" detail="visitanc, visitepi, flagservice PP" icon="⏳" />
              <NoteItem label="Refer Out" detail="referout table → รพ.แม่ข่าย" icon="⏳" />
              <NoteItem label="Critical Alerts" detail="visitdiag + lab results (BP, DTX, O₂)" icon="⏳" />
            </div>
            <p className="text-[10px] text-gray-600 mt-3 border-t border-white/5 pt-2">
              ✅ = ทำงาน · ⏳ = รอเชื่อมต่อ JHCIS Database
            </p>
          </div>
        </section>

        {/* ======== FOOTER ======== */}
        <footer className="text-center pt-4 border-t border-white/5">
          <p className="text-[10px] text-gray-600">
            JHCIS Provincial Command Center v1.0 · Ubon Ratchathani Primary Care ·
            ข้อมูลจาก MOPH Open Data API · opendata.moph.go.th ·
            ประมวลผล {data.opd.dateCom}
          </p>
        </footer>
      </main>
    </div>
  );
}

// ============================================================================
// Sub-components
// ============================================================================

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full mx-auto mb-3" />
        <p className="text-gray-400 text-sm">กำลังโหลด JHCIS Command Center...</p>
      </div>
    </div>
  );
}

function ErrorScreen({ error }: { error: string }) {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white flex items-center justify-center">
      <div className="text-center p-8">
        <AlertTriangle size={32} className="text-red-400 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-red-400 mb-2">⚠️ Connection Error</h2>
        <p className="text-gray-500 text-sm">{error}</p>
        <Link href="/" className="mt-4 inline-block text-emerald-400 hover:text-emerald-300 text-sm">← กลับหน้าแรก</Link>
      </div>
    </div>
  );
}

function KpiCard({
  icon, label, value, sub, color, detail, warning,
}: {
  icon: React.ReactNode; label: string; value: string; sub: string;
  color: string; detail: string; warning?: boolean;
}) {
  const colors: Record<string, string> = {
    emerald: "from-emerald-500/10 to-emerald-600/5 border-emerald-500/20",
    cyan: "from-cyan-500/10 to-cyan-600/5 border-cyan-500/20",
    amber: "from-amber-500/10 to-amber-600/5 border-amber-500/20",
    purple: "from-purple-500/10 to-purple-600/5 border-purple-500/20",
    pink: "from-pink-500/10 to-pink-600/5 border-pink-500/20",
    red: "from-red-500/10 to-red-600/5 border-red-500/20",
  };
  const textColors: Record<string, string> = {
    emerald: "text-emerald-400", cyan: "text-cyan-400", amber: "text-amber-400",
    purple: "text-purple-400", pink: "text-pink-400", red: "text-red-400",
  };
  return (
    <div className={`bg-gradient-to-br ${colors[color] || colors.emerald} rounded-xl border p-4 group hover:border-white/10 transition-colors`}>
      <div className={`${textColors[color] || textColors.emerald} mb-2`}>{icon}</div>
      <div className={`text-2xl font-bold ${warning ? "text-gray-600" : "text-white"}`}>{value}</div>
      <div className="text-[11px] text-gray-400 mt-1 font-medium">{label}</div>
      <div className="text-[10px] text-gray-500 mt-0.5">{sub}</div>
      <div className="text-[10px] text-gray-600 mt-1 border-t border-white/5 pt-1">{detail}</div>
    </div>
  );
}

function AlertItem({ icon, title, desc, count }: { icon: string; title: string; desc: string; count: string }) {
  return (
    <div className="flex items-start gap-2 bg-red-500/5 rounded-lg p-2.5 border border-red-500/10">
      <span className="text-sm">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-300 font-medium">{title}</p>
        <p className="text-[10px] text-gray-600">{desc}</p>
      </div>
      <span className="text-lg font-bold text-red-400/50">{count}</span>
    </div>
  );
}

function SimpleBar({ label, value, max, color, label2 }: { label: string; value: number; max: number; color: string; label2?: string }) {
  const pct = max > 0 ? ((value / max) * 100).toFixed(0) : "0";
  const barColors: Record<string, string> = { emerald: "bg-emerald-500", cyan: "bg-cyan-500", purple: "bg-purple-500", amber: "bg-amber-500" };
  return (
    <div>
      <div className="flex justify-between text-[10px] mb-0.5">
        <span className="text-gray-500">{label}</span>
        <span className="text-gray-400">{value.toLocaleString("th-TH")} {label2 || ""}</span>
      </div>
      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div className={`h-1.5 rounded-full ${barColors[color] || "bg-emerald-500"}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function NoteItem({ label, detail, icon }: { label: string; detail: string; icon: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-[11px]">{icon}</span>
      <div>
        <span className="text-gray-400 font-medium">{label}</span>
        <span className="text-gray-600 ml-2">{detail}</span>
      </div>
    </div>
  );
}
