-- =============================================================================
-- ข้อ 1: อัตราการให้บริการผู้ป่วยนอก จากแผนกลุ่มคนพิการ (ครั้งต่อคนต่อปี)
-- สูตร: จำนวนครั้ง OPD ของคนพิการ ÷ จำนวนคนพิการทั้งหมด × 100
-- หน่วย: ครั้งต่อคนต่อปี
-- ที่มา: person + personunable + visit (JHCIS)
-- =============================================================================

SELECT
    -- ตัวส่วน (Denominator): จำนวนคนพิการทั้งหมด
    (SELECT COUNT(DISTINCT CONCAT(pu.pcucodeperson, '-', pu.pid))
     FROM personunable pu
     JOIN person p ON p.pcucodeperson = pu.pcucodeperson 
                   AND p.pid = pu.pid
     WHERE NULLIF(p.idcard, '') IS NOT NULL
    ) AS disabled_population,

    -- ตัวตั้ง (Numerator): จำนวนครั้ง OPD ของคนพิการในปีที่กำหนด
    (SELECT COUNT(DISTINCT CONCAT(v.pcucode, '-', v.visitno))
     FROM visit v
     JOIN personunable pu ON pu.pcucodeperson = v.pcucode
                          AND pu.pid = v.pid
     -- เฉพาะ OPD (ไม่มี admit) ในปีปัจจุบัน
     WHERE v.visitdate >= DATE_FORMAT(NOW(), '%Y-01-01')
       AND v.visitdate <  DATE_FORMAT(NOW(), '%Y-12-31')
       AND NOT EXISTS (
           SELECT 1 FROM an a 
           WHERE a.pcucode = v.pcucode 
             AND a.visitno = v.visitno
       )
    ) AS opd_visits_by_disabled,

    -- ผลลัพธ์: อัตราการใช้บริการ OPD (ครั้งต่อคนต่อปี)
    ROUND(
        (SELECT COUNT(DISTINCT CONCAT(v.pcucode, '-', v.visitno))
         FROM visit v
         JOIN personunable pu ON pu.pcucodeperson = v.pcucode
                              AND pu.pid = v.pid
         WHERE v.visitdate >= DATE_FORMAT(NOW(), '%Y-01-01')
           AND v.visitdate <  DATE_FORMAT(NOW(), '%Y-12-31')
           AND NOT EXISTS (
               SELECT 1 FROM an a 
               WHERE a.pcucode = v.pcucode 
                 AND a.visitno = v.visitno
           )
        ) 
        /
        NULLIF((SELECT COUNT(DISTINCT CONCAT(pu.pcucodeperson, '-', pu.pid))
                FROM personunable pu
                JOIN person p ON p.pcucodeperson = pu.pcucodeperson 
                              AND p.pid = pu.pid
                WHERE NULLIF(p.idcard, '') IS NOT NULL
        ), 0)
    , 2) AS rate_per_person_per_year;


-- =============================================================================
-- Alternative: ใช้ temporary table (อ่านง่ายกว่า)
-- =============================================================================

-- 1) คนพิการทั้งหมด (จาก personunable)
WITH disabled_people AS (
    SELECT DISTINCT pu.pcucodeperson, pu.pid
    FROM personunable pu
    JOIN person p ON p.pcucodeperson = pu.pcucodeperson 
                  AND p.pid = pu.pid
    WHERE NULLIF(p.idcard, '') IS NOT NULL
),

-- 2) OPD visits ของคนพิการ (visit ที่ไม่มี admit record)
disabled_opd_visits AS (
    SELECT DISTINCT v.pcucode, v.visitno
    FROM visit v
    JOIN personunable pu ON pu.pcucodeperson = v.pcucode
                         AND pu.pid = v.pid
    WHERE v.visitdate >= '2025-10-01'   -- ปีงบประมาณ 2569 เริ่ม ต.ค. 2568
      AND v.visitdate <  '2026-10-01'
      AND NOT EXISTS (
          SELECT 1 FROM an a 
          WHERE a.pcucode = v.pcucode 
            AND a.visitno = v.visitno
      )
)

SELECT
    (SELECT COUNT(*) FROM disabled_people)      AS total_disabled,
    (SELECT COUNT(*) FROM disabled_opd_visits)  AS total_opd_visits,
    ROUND(
        (SELECT COUNT(*) FROM disabled_opd_visits) * 1.0 
        / NULLIF((SELECT COUNT(*) FROM disabled_people), 0)
    , 2) AS rate_visits_per_person_per_year;
