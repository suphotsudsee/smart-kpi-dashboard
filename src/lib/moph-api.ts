/**
 * MOPH Open Data API Client
 * 
 * ดึงข้อมูลจาก opendata.moph.go.th — 
 * ตาราง s_op_instype_all: อัตราการใช้บริการผู้ป่วยนอก จำแนกกลุ่มสิทธิ
 *
 * API Endpoint: POST https://opendata.moph.go.th/api/report_data
 * 
 * @see https://opendata.moph.go.th
 */

const API_BASE = "https://opendata.moph.go.th/api/report_data";

// ============================================================================
// Types
// ============================================================================

/** Single row from s_op_instype_all */
export interface OpdInstypeRow {
  id: string;           // hash ID
  hospcode: string;     // รหัสสถานพยาบาล (5-6 หลัก)
  areacode: string;     // รหัสพื้นที่
  date_com: string;     // timestamp ประมวลผล (YYYYMMDDHHMM)
  b_year: string;       // ปีงบประมาณ
  /** จำนวนผู้ป่วย (unique persons) รวมทุกสิทธิ */
  inscl_all: string;
  /** จำนวนครั้งบริการ (visits) รวมทุกสิทธิ */
  visit_all: string;
  /** จำนวนผู้ป่วย แยกตามสิทธิ 1-5 */
  inscl1?: string;
  inscl2?: string;
  inscl3?: string;
  inscl4?: string;
  inscl5?: string;
  /** จำนวนครั้งบริการ แยกตามสิทธิ 1-5 */
  inscl_visit1?: string;
  inscl_visit2?: string;
  inscl_visit3?: string;
  inscl_visit4?: string;
  inscl_visit5?: string;
}

/** Request params for MOPH API */
export interface MophReportParams {
  tableName: string;        // e.g. "s_op_instype_all"
  year: number;             // ปีงบประมาณ (2569)
  province?: string;        // รหัสจังหวัด (default "11" = อุบลราชธานี)
  hospcode?: string;        // กรองเฉพาะ รพ. (optional)
  type?: string;            // "json" (default)
  limit?: number;           // max rows (default 1000)
  offset?: number;          // pagination
}

/** API Response wrapper */
export interface MophApiResponse<T = OpdInstypeRow> {
  success: boolean;
  data: T[];
  total: number;
  error?: string;
}

// ============================================================================
// Inst_ column mapping (สิทธิการรักษา)
// ============================================================================

/**
 * inscl group labels — MOPH right-group codes
 * 1=UC(บัตรทอง), 2=ประกันสังคม, 3=ข้าราชการ, 4=ต่างด้าว, 5=อื่นๆ
 */
export const INSTYPE_LABELS: Record<string, string> = {
  "inscl1": "บัตรทอง (UC)",
  "inscl2": "ประกันสังคม",
  "inscl3": "ข้าราชการ/รัฐวิสาหกิจ",
  "inscl4": "ประกันสุขภาพต่างด้าว",
  "inscl5": "อื่นๆ",
};

// ============================================================================
// Core API Functions
// ============================================================================

/**
 * ดึงข้อมูลจาก MOPH Open Data API
 *
 * @example
 *   const result = await fetchMophReport({
 *     table_name: "s_op_instype_all",
 *     b_year: 2569,
 *     province_code: "11",
 *   });
 */
export async function fetchMophReport<T = OpdInstypeRow>(
  params: MophReportParams
): Promise<MophApiResponse<T>> {
  const body: Record<string, string> = {
    tableName: params.tableName,
    year: String(params.year),
    province: params.province ?? "34", // default
    type: params.type ?? "json",
    ...(params.hospcode && { hospcode: params.hospcode }),
    ...(params.limit && { limit: String(params.limit) }),
    ...(params.offset && { offset: String(params.offset) }),
  };

  const response = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    next: { revalidate: 3600 }, // cache 1 ชม. (Next.js fetch cache)
  });

  if (!response.ok) {
    return {
      success: false,
      data: [],
      total: 0,
      error: `MOPH API error: ${response.status} ${response.statusText}`,
    };
  }

  const json = await response.json();

  // MOPH API returns flat array directly (not {data: [...]})
  const dataArray = Array.isArray(json) ? json : (json.data ?? json.rows ?? []);
  
  return {
    success: true,
    data: dataArray,
    total: json.total ?? json.count ?? dataArray.length,
  };
}

// ============================================================================
// High-level Helper Functions
// ============================================================================

/**
 * Get OPD utilization by instype (กลุ่มสิทธิ)
 * 
 * Returns aggregated totals per institution type for the given budget year
 */
export async function getOpdByInstype(b_year: number = 2569): Promise<{
  success: boolean;
  data: { instype: string; label: string; count: number }[];
  total_visits: number;
}> {
  const result = await fetchMophReport({ tableName: "s_op_instype_all", year: b_year });

  if (!result.success || !result.data.length) {
    return { success: false, data: [], total_visits: 0 };
  }

  // Aggregate sum per Inst_ column across all hospitals
  const instypeTotals: Record<string, number> = {};
  let totalVisits = 0;

  for (const row of result.data) {
    for (const [key, value] of Object.entries(row)) {
      if (key.startsWith("Inst_") && value) {
        const num = parseInt(value, 10);
        if (!isNaN(num)) {
          instypeTotals[key] = (instypeTotals[key] || 0) + num;
          totalVisits += num;
        }
      }
    }
  }

  // Map to labeled data
  const data = Object.entries(instypeTotals)
    .map(([instype, count]) => ({
      instype,
      label: INSTYPE_LABELS[instype] || instype,
      count,
    }))
    .sort((a, b) => b.count - a.count);

  return { success: true, data, total_visits: totalVisits };
}

/**
 * Get OPD data for a specific hospital
 */
export async function getHospitalOpd(hospcode: string, b_year: number = 2569) {
  const result = await fetchMophReport({
    tableName: "s_op_instype_all",
    year: b_year,
    hospcode,
  });

  return result;
}

/**
 * List all available table names (for discovery)
 */
export async function listAvailableTables(): Promise<string[]> {
  // Static list of known MOPH tables for การเข้าถึงบริการ
  return [
    "s_op_instype_all",       // ผู้ป่วยนอก แยกตามสิทธิ
    "s_op_instype_all_month", // รายเดือน
    "s_ip_instype_all",       // ผู้ป่วยใน แยกตามสิทธิ
    "s_er_triage",            // ER Triage
    "s_refer",                // การส่งต่อ
    "s_mental_health",        // สุขภาพจิต
    "s_ttm",                  // แพทย์แผนไทย
    "s_dental",               // ทันตกรรม
  ];
}

// ============================================================================
// Utility: Parse Inst_ columns from a row
// ============================================================================

/**
 * Extract all Inst_ values from a single row
 */
export function parseInstypeRow(row: OpdInstypeRow) {
  const instypes: { code: string; label: string; value: number }[] = [];
  for (const [key, value] of Object.entries(row)) {
    if (key.startsWith("Inst_") && value) {
      instypes.push({
        code: key,
        label: INSTYPE_LABELS[key] || key,
        value: parseInt(value, 10) || 0,
      });
    }
  }
  return instypes;
}
