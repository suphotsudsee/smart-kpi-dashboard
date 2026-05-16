import { NextRequest, NextResponse } from "next/server";
import { fetchMophReport, type OpdInstypeRow } from "@/lib/moph-api";

const NACHALUAI_CODES = ["10952", "03685", "03686", "03687", "03688", "03689", "03690", "03691", "13875"];

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

const INSTYPE_LABELS: Record<string, string> = {
  "inscl1": "บัตรทอง (UC)",
  "inscl2": "ประกันสังคม",
  "inscl3": "ข้าราชการ/รัฐวิสาหกิจ",
  "inscl4": "ประกันสุขภาพต่างด้าว",
  "inscl5": "อื่นๆ",
};

function isNaChaluai(row: any): boolean {
  return NACHALUAI_CODES.includes(row.hospcode?.toString().trim());
}

function aggregateRows(rows: any[]) {
  let totalPersons = 0, totalVisits = 0;
  const instypeTotals: Record<string, { persons: number; visits: number }> = {};
  const hospitalStats: Record<string, any> = {};

  for (const row of rows) {
    const p = parseInt(row.inscl_all, 10) || 0;
    const v = parseInt(row.visit_all, 10) || 0;
    totalPersons += p;
    totalVisits += v;

    const code = row.hospcode.toString().trim();
    if (!hospitalStats[code]) {
      hospitalStats[code] = { hospcode: code, name: HOSPITAL_NAMES[code] || code, persons: 0, visits: 0, ratio: 0 };
    }
    hospitalStats[code].persons += p;
    hospitalStats[code].visits += v;

    for (let i = 1; i <= 5; i++) {
      const k = `inscl${i}`;
      const vk = `inscl_visit${i}`;
      const ip = parseInt(row[k], 10) || 0;
      const iv = parseInt(row[vk], 10) || 0;
      if (ip || iv) {
        if (!instypeTotals[k]) instypeTotals[k] = { persons: 0, visits: 0 };
        instypeTotals[k].persons += ip;
        instypeTotals[k].visits += iv;
      }
    }
  }

  for (const h of Object.values(hospitalStats)) {
    h.ratio = h.persons > 0 ? h.visits / h.persons : 0;
  }

  return { totalPersons, totalVisits, instypeTotals, hospitalStats };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const year = parseInt(searchParams.get("year") || "2569", 10);

  try {
    // Fetch OPD + IPD in parallel
    const [opdResult, ipdResult] = await Promise.all([
      fetchMophReport({ tableName: "s_op_instype_all", year, province: "34" }),
      fetchMophReport({ tableName: "s_ip_instype_all", year, province: "34" }),
    ]);

    const opd = aggregateRows((opdResult.data || []).filter(isNaChaluai));
    const ipd = aggregateRows((ipdResult.data || []).filter(isNaChaluai));

    return NextResponse.json({
      ok: true,
      year,
      district: "นาจะหลวย",
      opd: {
        totalPersons: opd.totalPersons,
        totalVisits: opd.totalVisits,
        hospitalCount: Object.keys(opd.hospitalStats).length,
        dateCom: opdResult.data?.[0]?.date_com || "—",
        instypes: Object.entries(opd.instypeTotals)
          .sort((a, b) => b[1].visits - a[1].visits)
          .map(([key, val]) => ({ key, label: INSTYPE_LABELS[key] || key, persons: val.persons, visits: val.visits })),
        hospitals: Object.values(opd.hospitalStats).sort((a: any, b: any) => b.visits - a.visits),
      },
      ipd: {
        totalPersons: ipd.totalPersons,
        totalVisits: ipd.totalVisits,
        hospitalCount: Object.keys(ipd.hospitalStats).length,
        dateCom: ipdResult.data?.[0]?.date_com || "—",
        instypes: Object.entries(ipd.instypeTotals)
          .sort((a, b) => b[1].visits - a[1].visits)
          .map(([key, val]) => ({ key, label: INSTYPE_LABELS[key] || key, persons: val.persons, visits: val.visits })),
        hospitals: Object.values(ipd.hospitalStats).sort((a: any, b: any) => b.visits - a.visits),
      },
      unavailable: {
        message: "ตาราง ER, Accident, Refer — ต้อง login HDC (Parameter Invalid บน MOPH API)",
        tables: ["s_er_triage", "s_accident", "s_refer", "s_refer_out", "s_op_all_month", "s_ip_all_month"],
      },
    });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}
