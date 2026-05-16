"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

interface SubCatalog {
  id: string;
  name: string;
  parentName: string;
  reportCount: number;
  url: string;
}

interface ReportResult {
  id: string;
  name: string;
  order: number;
  subCatalogName?: string;
  parentName?: string;
}

export default function HdcCatalogPage() {
  const [catalogs, setCatalogs] = useState<SubCatalog[]>([]);
  const [searchResults, setSearchResults] = useState<ReportResult[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeParent, setActiveParent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  // Parent categories
  const parents = ["ข้อมูลทั่วไป", "สถานะสุขภาพ", "การเข้าถึงบริการ", "ส่งเสริมป้องกัน", "Service Plan"];

  useEffect(() => {
    fetch("/api/hdc/catalog")
      .then((r) => r.json())
      .then((data) => {
        if (data.ok) setCatalogs(data.subcatalogs);
      })
      .finally(() => setLoading(false));
  }, []);

  // Search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(() => {
      fetch(`/api/hdc/catalog?search=${encodeURIComponent(searchQuery)}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.ok) setSearchResults(data.results);
        });
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter by parent
  const filteredCatalogs = useMemo(() => {
    if (!activeParent) return catalogs;
    return catalogs.filter((c) => c.parentName === activeParent);
  }, [catalogs, activeParent]);

  // Stats
  const totalReports = catalogs.reduce((sum, c) => sum + c.reportCount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">📊 HDC Catalog</h1>
          <p className="text-lg text-blue-200 mb-4">
            ระบบคลังข้อมูลด้านการแพทย์และสุขภาพ — จังหวัดอุบลราชธานี
          </p>
          <div className="flex justify-center gap-4 text-sm">
            <div className="bg-white/10 rounded-lg px-4 py-2">
              <span className="text-2xl font-bold">{catalogs.length}</span>
              <span className="text-blue-200 ml-1">หมวดหมู่</span>
            </div>
            <div className="bg-white/10 rounded-lg px-4 py-2">
              <span className="text-2xl font-bold">{totalReports}</span>
              <span className="text-blue-200 ml-1">รายงาน</span>
            </div>
            <div className="bg-white/10 rounded-lg px-4 py-2">
              <span className="text-2xl font-bold">🏥</span>
              <span className="text-blue-200 ml-1">5 หมวดหลัก</span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 ค้นหารายงาน... (เช่น เบาหวาน, OPD, วัคซีน, ฝากครรภ์)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">
              ผลการค้นหา: {searchResults.length} รายการ
            </h2>
            <div className="space-y-2">
              {searchResults.map((r, i) => (
                <Link
                  key={`${r.id}-${i}`}
                  href={r.id ? `/hdc-reports/${r.id}` : "#"}
                  className="block bg-white/5 hover:bg-white/10 rounded-lg p-3 transition-colors border border-white/10"
                >
                  <div className="font-medium">{r.name}</div>
                  {r.subCatalogName && (
                    <div className="text-xs text-blue-300 mt-1">
                      {r.parentName} › {r.subCatalogName}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Parent Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveParent("")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              !activeParent
                ? "bg-blue-500 text-white"
                : "bg-white/10 text-blue-200 hover:bg-white/20"
            }`}
          >
            ทั้งหมด
          </button>
          {parents.map((p) => (
            <button
              key={p}
              onClick={() => setActiveParent(p)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeParent === p
                  ? "bg-blue-500 text-white"
                  : "bg-white/10 text-blue-200 hover:bg-white/20"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Catalog List */}
        {loading ? (
          <div className="text-center py-20 text-blue-200">กำลังโหลดข้อมูล...</div>
        ) : (
          <div className="space-y-4">
            {filteredCatalogs.map((cat) => (
              <div
                key={cat.id}
                className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-blue-400/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{cat.name}</h3>
                    <p className="text-sm text-blue-300 mt-1">
                      {cat.parentName} · {cat.reportCount} รายงาน
                    </p>
                  </div>
                  <Link
                    href={`/hdc-reports?subcatalog=${cat.id}`}
                    className="px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 rounded-lg text-sm transition-colors"
                  >
                    ดูรายงาน →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredCatalogs.length === 0 && (
          <div className="text-center py-10 text-blue-300">
            ไม่พบหมวดหมู่ในกลุ่มนี้
          </div>
        )}
      </div>
    </div>
  );
}
