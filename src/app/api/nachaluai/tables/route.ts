import { NextResponse } from "next/server";

/**
 * GET /api/nachaluai/tables
 * API discovery — lists all known MOPH tables and their status
 */

const ALL_TABLES = [
  "s_op_instype_all", "s_ip_instype_all", "s_op_all_month", "s_ip_all_month",
  "s_op_thai", "s_ip_thai", "s_refer", "s_refer_out",
  "s_accident", "s_accident_place", "s_accident_vehicle", "s_accident_risk",
  "s_er_triage", "s_smoking_alcohol", "s_resp_daily", "s_resp_hosp_daily",
  "s_hand_mask", "s_telemedicine",
];

/** Tables that return 200 + data from MOPH API (tested 2026-05-22) */
const WORKING = new Set(["s_op_instype_all", "s_ip_instype_all"]);

/** Error message for broken tables */
const BROKEN_REASON: Record<string, string> = {
  "s_op_all_month": "รองรับเฉพาะ instype_all (ไม่ใช่ month)",
  "s_ip_all_month": "รองรับเฉพาะ instype_all (ไม่ใช่ month)",
  "s_op_thai": "รองรับเฉพาะ instype_all (ไม่ใช่ thai)",
  "s_ip_thai": "รองรับเฉพาะ instype_all (ไม่ใช่ thai)",
  "s_refer": "ต้อง login HDC",
  "s_refer_out": "ต้อง login HDC",
  "s_accident": "ต้อง login HDC",
  "s_accident_place": "ต้อง login HDC",
  "s_accident_vehicle": "ต้อง login HDC",
  "s_accident_risk": "ต้อง login HDC",
  "s_er_triage": "ต้อง login HDC",
  "s_smoking_alcohol": "ต้อง login HDC",
  "s_resp_daily": "ต้อง login HDC",
  "s_resp_hosp_daily": "ต้อง login HDC",
  "s_hand_mask": "ต้อง login HDC",
  "s_telemedicine": "ต้อง login HDC",
};

export async function GET() {
  const results = ALL_TABLES.map((name) => ({
    name,
    status: WORKING.has(name) ? ("working" as const) : ("broken" as const),
    reason: WORKING.has(name) ? undefined : (BROKEN_REASON[name] || "Parameter Invalid"),
  }));

  return NextResponse.json({
    ok: true,
    total: ALL_TABLES.length,
    working: results.filter((r) => r.status === "working"),
    broken: results.filter((r) => r.status === "broken"),
    summary: `${results.filter((r) => r.status === "working").length}/${ALL_TABLES.length} tables accessible via MOPH public API`,
  });
}
