"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface SubCatalog {
  id: string;
  name: string;
  parentName: string;
  reportCount: number;
  url: string;
}

interface ReportMeta {
  id: string;
  name: string;
  order: number;
  tableName?: string;
}

function HdcReportsContent() {
  const searchParams = useSearchParams();
  const [catalogs, setCatalogs] = useState<SubCatalog[]>([]);
  const [selectedCat, setSelectedCat] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/hdc/catalog")
      .then(r => r.json())
      .then(data => {
        if (data.ok) setCatalogs(data.subcatalogs);
      })
      .catch(e => setError(String(e)))
      .finally(() => setLoading(false));
  }, []);

  // Handle ?subcatalog=id from catalog page links
  useEffect(() => {
    const subId = searchParams.get("subcatalog");
    if (subId) {
      fetch(`/api/hdc/catalog?subcatalog=${subId}`)
        .then(r => r.json())
        .then(data => {
          if (data.ok) setSelectedCat(data.subcatalog);
        });
    }
  }, [searchParams]);

  const parents = ["ข้อมูลทั่วไป", "สถานะสุขภาพ", "การเข้าถึงบริการ", "ส่งเสริมป้องกัน", "Service Plan"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">📊 HDC Reports</h1>
          <p className="text-blue-200">จังหวัดอุบลราชธานี — {catalogs.length} หมวดย่อย, {catalogs.reduce((s,c)=>s+c.reportCount,0)} รายงาน</p>
          <Link href="/hdc-reports/catalog" className="inline-block mt-3 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/40 rounded-lg text-sm transition-colors">
            📋 ดู Catalog ทั้งหมด
          </Link>
        </div>

        {/* Search */}
        <input
          placeholder="🔍 ค้นหารายงาน... (เช่น เบาหวาน, OPD, ฝากครรภ์, วัคซีน)"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 mb-6 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400"
        />

        {selectedCat ? (
          /* Single subcatalog view */
          <div>
            <button onClick={() => setSelectedCat(null)} className="text-blue-300 hover:text-blue-100 mb-4">← กลับ</button>
            <h2 className="text-2xl font-bold mb-2">{selectedCat.name}</h2>
            <p className="text-blue-300 mb-4">{selectedCat.parentName} · {selectedCat.reports.length} รายงาน</p>
            <div className="space-y-2">
              {selectedCat.reports.map((r: ReportMeta) => (
                <Link
                  key={`${r.id}-${r.order}`}
                  href={r.id ? `/hdc-reports/${r.id}` : "#"}
                  className={`block rounded-lg p-3 transition-colors border border-white/10 ${r.id ? 'bg-white/5 hover:bg-white/10' : 'bg-white/5 text-gray-400'}`}
                >
                  <span className="text-xs text-blue-400 mr-2">{r.order}.</span>
                  {r.name}
                  {r.tableName && <span className="ml-2 text-xs text-green-400">✓ API</span>}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          /* All subcatalogs grouped by parent */
          parents.map(parent => {
            const items = catalogs.filter(c => c.parentName === parent);
            const filtered = searchQuery
              ? items.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
              : items;
            if (!filtered.length) return null;
            
            return (
              <div key={parent} className="mb-8">
                <h2 className="text-xl font-semibold mb-3 text-blue-200">{parent}</h2>
                <div className="space-y-2">
                  {filtered.map(cat => (
                    <div key={cat.id} className="bg-white/5 rounded-lg p-4 border border-white/10 flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{cat.name}</h3>
                        <p className="text-sm text-blue-300">{cat.reportCount} รายงาน</p>
                      </div>
                      <button
                        onClick={() => {
                          fetch(`/api/hdc/catalog?subcatalog=${cat.id}`)
                            .then(r => r.json())
                            .then(data => { if (data.ok) setSelectedCat(data.subcatalog); });
                        }}
                        className="px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/40 rounded-lg text-sm transition-colors"
                      >
                        ดูรายงาน →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default function HdcReportsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">กำลังโหลด...</div>}>
      <HdcReportsContent />
    </Suspense>
  );
}
