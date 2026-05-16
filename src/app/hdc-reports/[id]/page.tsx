"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function HdcReportViewPage() {
  const { id } = useParams();
  const [reportMeta, setReportMeta] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    
    // Fetch report metadata
    fetch(`/api/hdc/catalog?search=${id}`)
      .then(r => r.json())
      .then(data => {
        if (data.ok && data.results?.length) {
          const meta = data.results[0];
          setReportMeta(meta);
          // If tableName exists, fetch actual data
          if (meta.tableName) {
            fetch(`/api/moph/opd-instype?table=${meta.tableName}&year=2569`)
              .then(r => r.json())
              .then(d => console.log("Data:", d))
              .catch(console.error);
          }
        } else {
          setError("ไม่พบรายงานนี้");
        }
      })
      .catch(e => setError(String(e)))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">กำลังโหลด...</div>;
  if (error) return <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link href="/hdc-reports" className="text-blue-300 hover:text-blue-100 mb-4 inline-block">← กลับ</Link>
        
        <h1 className="text-3xl font-bold mb-2">{reportMeta?.name}</h1>
        <p className="text-blue-300 mb-6">
          {reportMeta?.parentName} › {reportMeta?.subCatalogName}
        </p>

        {reportMeta?.tableName ? (
          <div className="mb-6">
            <div className="bg-green-500/20 text-green-300 px-4 py-2 rounded-lg inline-block text-sm">
              ✓ มี API: {reportMeta.tableName}
            </div>
            {/* Data would be shown here */}
          </div>
        ) : (
          <div className="bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-lg inline-block text-sm mb-6">
            ⚠️ ยังไม่มี API endpoint — ต้อง login HDC เพื่อดูข้อมูล
          </div>
        )}

        <div className="bg-white/5 rounded-lg p-6 border border-white/10">
          <h2 className="text-lg font-semibold mb-3">รายละเอียด</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex gap-2">
              <dt className="text-blue-300 w-24">Report ID:</dt>
              <dd className="font-mono text-xs">{id}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-blue-300 w-24">หมวดหมู่:</dt>
              <dd>{reportMeta?.parentName} › {reportMeta?.subCatalogName}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-blue-300 w-24">API Table:</dt>
              <dd className="font-mono text-xs">{reportMeta?.tableName || "ไม่มี"}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
