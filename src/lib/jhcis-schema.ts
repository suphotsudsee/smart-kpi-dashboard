/**
 * JHCIS Database Schema Reference
 * 
 * อ้างอิงโครงสร้างฐานข้อมูล JHCIS สำหรับการ Query KPI Dashboard
 * อิงตาม PRD v1.0 — JHCIS Provincial Executive Dashboard
 */

// ============================================================================
// ตารางหลักที่ใช้ใน Dashboard
// ============================================================================

export const JHCIS_SCHEMA = {
  visit: {
    description: "ข้อมูลการรับบริการทั่วไป",
    key_fields: {
      visitno: "รหัสการรับบริการ (PK)",
      visitdate: "วันที่รับบริการ",
      pid: "รหัสบุคคล (FK → person.pid)",
      hospcode: "รหัสหน่วยบริการ",
      visittype: "ประเภทผู้รับบริการ (1=OPD, 2=IPD)",
      visitstatus: "สถานะการรับบริการ",
      flagservice: "Flag งานบริการ (PP=ส่งเสริม, NCD=โรคเรื้อรัง)",
    },
  },
  person: {
    description: "ข้อมูลประชากร/ผู้ป่วย",
    key_fields: {
      pid: "รหัสบุคคล (PK)",
      cid: "เลขบัตรประชาชน",
      fname: "ชื่อ", lname: "นามสกุล",
      birth: "วันเกิด",
      sex: "เพศ",
      houseregid: "รหัสทะเบียนบ้าน",
    },
  },
  visitdiag: {
    description: "รหัสโรค ICD-10",
    key_fields: {
      visitno: "รหัสการรับบริการ (FK)",
      diagcode: "รหัส ICD-10",
      diagtype: "ประเภทการวินิจฉัย (1=หลัก, 2=รอง)",
    },
  },
  referout: {
    description: "ข้อมูลการส่งต่อผู้ป่วย",
    key_fields: {
      referno: "รหัสการส่งต่อ (PK)",
      visitno: "รหัสการรับบริการ (FK)",
      referdate: "วันที่ส่งต่อ",
      referhosp: "รหัสหน่วยบริการปลายทาง",
      refercause: "สาเหตุการส่งต่อ",
      refertype: "ประเภทการส่งต่อ",
    },
  },
  visitanc: {
    description: "ข้อมูลฝากครรภ์ (ANC)",
    key_fields: {
      visitno: "รหัสการรับบริการ (FK)",
      ancno: "ครั้งที่ฝากครรภ์",
      ga: "อายุครรภ์ (สัปดาห์)",
    },
  },
  visitepi: {
    description: "ข้อมูลสร้างเสริมภูมิคุ้มกันโรค (EPI)",
    key_fields: {
      visitno: "รหัสการรับบริการ (FK)",
      vaccinecode: "รหัสวัคซีน",
      vaccineno: "ครั้งที่",
    },
  },
};

// ============================================================================
// KPI Query Definitions
// ============================================================================

export const KPI_QUERIES = {
  total_opd: {
    label: "Total OPD",
    description: "ยอดผู้มารับบริการผู้ป่วยนอกรวมทุกแผนกวันนี้",
    sql: `SELECT COUNT(DISTINCT v.visitno) as total
FROM visit v
WHERE v.visitdate = CURDATE()
  AND v.visittype = '1'
  AND v.hospcode IN (:nachaluai_codes)`,
  },
  
  ncd_clinic: {
    label: "NCD Clinic",
    description: "ผู้ป่วย NCD (DM/HT) ที่มารับบริการวันนี้",
    icd_codes: {
      dm: ["E10", "E11", "E12", "E13", "E14"],
      ht: ["I10", "I11", "I12", "I13", "I14", "I15"],
    },
    sql: `SELECT COUNT(DISTINCT v.visitno) as total
FROM visit v
JOIN visitdiag vd ON v.visitno = vd.visitno
WHERE v.visitdate = CURDATE()
  AND v.hospcode IN (:nachaluai_codes)
  AND (vd.diagcode LIKE 'E1%' OR vd.diagcode LIKE 'I1%')`,
  },
  
  telemedicine_ncd: {
    label: "Telemedicine (NCD)",
    description: "การให้บริการ Telemedicine สำหรับผู้ป่วย NCD",
    visit_type_codes: ["4", "5", "6"], // OPD Visit Type codes for telemedicine
    sql: `SELECT COUNT(DISTINCT v.visitno) as total
FROM visit v
WHERE v.visitdate = CURDATE()
  AND v.hospcode IN (:nachaluai_codes)
  AND v.visittype IN ('4', '5', '6')`,
    target_pct: 30,
  },
  
  health_promotion: {
    label: "Health Promotion",
    description: "งานส่งเสริมสุขภาพ (ANC, วัคซีน, PP)",
    sql: `SELECT 
  COUNT(DISTINCT v.visitno) as pp_total,
  COUNT(DISTINCT va.visitno) as anc_total,
  COUNT(DISTINCT ve.visitno) as epi_total
FROM visit v
LEFT JOIN visitanc va ON v.visitno = va.visitno
LEFT JOIN visitepi ve ON v.visitno = ve.visitno
WHERE v.visitdate = CURDATE()
  AND v.hospcode IN (:nachaluai_codes)`,
  },
  
  refer_out: {
    label: "Refer Out",
    description: "การส่งต่อผู้ป่วยไป รพ.แม่ข่าย",
    sql: `SELECT COUNT(DISTINCT r.referno) as total,
       r.refercause
FROM referout r
JOIN visit v ON r.visitno = v.visitno
WHERE r.referdate = CURDATE()
  AND v.hospcode IN (:nachaluai_codes)
GROUP BY r.refercause`,
  },
  
  critical_alerts: {
    label: "Critical Alerts",
    description: "ผู้ป่วยความเสี่ยงสูงที่ต้องจัดการทันที",
    triggers: [
      "BP ≥ 180/110 mmHg",
      "DTX ≥ 300 mg/dL หรือ ≤ 50 mg/dL",
      "O2 Sat < 90%",
      "Triage Level 1 (Resuscitation)",
    ],
  },
};

// ============================================================================
// Hospital Codes — อ.นาจะหลวย
// ============================================================================

export const NACHALUAI_CODES = [
  "10952", "03685", "03686", "03687", "03688",
  "03689", "03690", "03691", "13875",
];

export const NACHALUAI_HOSPITALS: Record<string, { code: string; name: string; lat: number; lng: number }> = {
  "10952": { code: "10952", name: "โรงพยาบาลนาจะหลวย", lat: 14.5220, lng: 105.2440 },
  "03685": { code: "03685", name: "รพ.สต.โนนสมบูรณ์", lat: 14.5600, lng: 105.2100 },
  "03686": { code: "03686", name: "รพ.สต.โคกสว่าง", lat: 14.4900, lng: 105.2800 },
  "03687": { code: "03687", name: "รพ.สต.นาโพธิ์", lat: 14.5500, lng: 105.2600 },
  "03688": { code: "03688", name: "รพ.สต.บุ่งหวาย", lat: 14.5100, lng: 105.2300 },
  "03689": { code: "03689", name: "รพ.สต.บ้านตูม", lat: 14.5400, lng: 105.1900 },
  "03690": { code: "03690", name: "รพ.สต.ห้วยขะยุง", lat: 14.4800, lng: 105.2200 },
  "03691": { code: "03691", name: "รพ.สต.หนองแสง", lat: 14.5300, lng: 105.3000 },
  "13875": { code: "13875", name: "รพ.สต.ดงสวาง", lat: 14.5000, lng: 105.2500 },
};
