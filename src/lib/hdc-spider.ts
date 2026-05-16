/**
 * HDC Spider — Crawl HDC catalog pages and extract report metadata
 * HDC (Health Data Center) เป็นระบบรายงานของ สป.สธ.
 * Crawled from: api-center-hdc.moph.go.th
 * Total: 40 subcatalogs, 373 reports across 5 main categories
 */

export interface HdcCatalog { id: string; name: string; url: string; }
export interface HdcSubCatalog {
  id: string; name: string; parentCatalogId: string; parentName: string;
  url: string; reports: HdcReportMeta[];
}
export interface HdcReportMeta {
  id: string; name: string; order: number; tableName?: string;
  apiUrl?: string; subCatalogName?: string; parentName?: string;
}

export const PARENT_CATALOGS: Record<string, { id: string; name: string }> = {
  "ข้อมูลทั่วไป": { id: "ab1a986e53c42a71d7c42b2646e6e844", name: "ข้อมูลทั่วไป" },
  "สถานะสุขภาพ": { id: "3e9b22afedc152096c7caf484c7d9629", name: "สถานะสุขภาพ" },
  "การเข้าถึงบริการ": { id: "9e99968996aa2b415260d14be393bd67", name: "การเข้าถึงบริการ" },
  "ส่งเสริมป้องกัน": { id: "73daf277928bc32a1b3c8e772192543c", name: "ส่งเสริมป้องกัน" },
  "Service Plan": { id: "02e752187c7282ebc9315123aa1cabbe", name: "ข้อมูลตอบสนอง Service Plan" },
};

export const KNOWN_TABLE_MAP: Record<string, string> = {
  "4b35d96e225bf34a16774b13705250f4": "s_op_instype_all",
  "aebf36f508889ee1ecba12cd56159956": "s_ip_instype_all",
  "92a705c26f22754d7462e9f742436b6f": "s_op_all_month",
  "39afb27f0e1256396e6a972716d20e2e": "s_ip_all_month",
  "c8a139305c94a90d7b4a65cef5c8d8e7": "s_op_thai",
  "be74f26c4e773f13f6076d7e901324b3": "s_ip_thai",
  "38e40477e601acfba24653ceb9021cd3": "s_refer",
  "38e40477e601acfba24653ceb9021cd4": "s_refer_out",
  "e4a6299a408fe53ba1ce003e22240d7b": "s_accident",
  "3f97a68cfb9dd74428d94a08ceb59c0e": "s_accident_place",
  "fa7fcf7f29cb374f6c4ee6e86b114200": "s_accident_vehicle",
  "45055c550ef5587953ff9d7924034cd0": "s_accident_risk",
  "4709220e55ae6c91c872e08b4ac2498c": "s_er_triage",
  "36203bcbf14fbe8f1906497ae8f5c0a5": "s_smoking_alcohol",
  "76e909d7af59d6ddc3fe11ebe25dad4d": "s_resp_daily",
  "d8cd1ecb3a780f9b3d8d767eeb58002d": "s_resp_hosp_daily",
  "e8b647ca3960f0fda1e64be0d4f0a684": "s_hand_mask",
  "2d85d6ec39840f8051854b028fa13073": "s_telemedicine",
};

function _parentId(name: string): string {
  return PARENT_CATALOGS[name]?.id || "";
}

// ============================================================================
// AUTO-GENERATED: 40 Sub-Catalogs, 373 Reports
// ============================================================================

const _C00_จำนวนหน่วยงานสาธารณสุข: HdcSubCatalog = {
  id: "b415510618e13273b2f2918587f86e5d",
  name: "จำนวนหน่วยงานสาธารณสุข",
  parentCatalogId: _parentId("\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25\u0e17\u0e31\u0e48\u0e27\u0e44\u0e1b"),
  parentName: "\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25\u0e17\u0e31\u0e48\u0e27\u0e44\u0e1b",
  url: "https://hdc.moph.go.th/ubn/public/standard-subcatalog/b415510618e13273b2f2918587f86e5d",
  reports: [
    { id: "67c3037f24c14781b03159583f5b7a58", order: 1, name: "จำนวนหน่วยบริการสังกัดสำนักงานปลัดกระทรวงสาธารณสุข จำแนกตามระดับของสถานพยาบาล", tableName: KNOWN_TABLE_MAP["67c3037f24c14781b03159583f5b7a58"] || undefined },
    { id: "6fd3d41f3f0321dd5394bee0cbace615", order: 2, name: "จำนวนหน่วยบริการ จำแนกตามระดับ Service Plan", tableName: KNOWN_TABLE_MAP["6fd3d41f3f0321dd5394bee0cbace615"] || undefined },
  ],
};

const _C01_การป่วยด้วยโรคไม่ติดต่อที่สำคัญ: HdcSubCatalog = {
  id: "6a1fdf282fd28180eed7d1cfe0155e11",
  name: "การป่วยด้วยโรคไม่ติดต่อที่สำคัญ",
  parentCatalogId: _parentId("\u0e2a\u0e16\u0e32\u0e19\u0e30\u0e2a\u0e38\u0e02\u0e20\u0e32\u0e1e"),
  parentName: "\u0e2a\u0e16\u0e32\u0e19\u0e30\u0e2a\u0e38\u0e02\u0e20\u0e32\u0e1e",
  url: "https://hdc.moph.go.th/ubn/public/standard-subcatalog/6a1fdf282fd28180eed7d1cfe0155e11",
  reports: [
    { id: "f346e9d449b04c07cc80edeefc0cc360", order: 1, name: "อัตราป่วยรายใหม่ของผู้ป่วยโรคหัวใจและหลอดเลือด (Cardiovascular disease)", tableName: KNOWN_TABLE_MAP["f346e9d449b04c07cc80edeefc0cc360"] || undefined },
    { id: "14f43de323e8ba70da1cb724cf64a98c", order: 2, name: "อัตราป่วยด้วยโรคหัวใจและหลอดเลือดต่อประชากร (Cardiovascular disease)", tableName: KNOWN_TABLE_MAP["14f43de323e8ba70da1cb724cf64a98c"] || undefined },
    { id: "e2a5a66dd74fa1252fcf786674f05f02", order: 3, name: "จำนวนผู้ป่วยตายโรคหัวใจและหลอดเลือด (Cardiovascular disease)", tableName: KNOWN_TABLE_MAP["e2a5a66dd74fa1252fcf786674f05f02"] || undefined },
    { id: "29eec762c9591d1f8092da14c7462361", order: 4, name: "อัตราป่วยรายใหม่ของโรคความดันโลหิตสูงต่อแสนประชากรในปีงบประมาณ", tableName: KNOWN_TABLE_MAP["29eec762c9591d1f8092da14c7462361"] || undefined },
    { id: "6b9af46d0cc1830d3bd34589c1081c68", order: 5, name: "อัตราป่วยด้วยโรคความดันโลหิตสูงต่อประชากร", tableName: KNOWN_TABLE_MAP["6b9af46d0cc1830d3bd34589c1081c68"] || undefined },
    { id: "e46c73b57c9eeb2f07759a9e9bc50fb3", order: 6, name: "อัตราการป่วยตายด้วยโรคความดันโลหิตสูง", tableName: KNOWN_TABLE_MAP["e46c73b57c9eeb2f07759a9e9bc50fb3"] || undefined },
    { id: "3092c3c3250ae67155f7e134680c4152", order: 7, name: "อัตราการป่วยด้วยโรคหลอดเลือดสมอง", tableName: KNOWN_TABLE_MAP["3092c3c3250ae67155f7e134680c4152"] || undefined },
    { id: "eeeab22e386d32e7f5f5ecefebce0001", order: 8, name: "อัตราป่วยรายใหม่ของโรคเบาหวานต่อแสนประชากรในปีงบประมาณ", tableName: KNOWN_TABLE_MAP["eeeab22e386d32e7f5f5ecefebce0001"] || undefined },
    { id: "cefa42b9223ec4d1969c5ce18d762bdd", order: 9, name: "อัตราการป่วยด้วยโรคเบาหวาน", tableName: KNOWN_TABLE_MAP["cefa42b9223ec4d1969c5ce18d762bdd"] || undefined },
    { id: "589248f2516fbb85d4a4a5605c3ca1c4", order: 10, name: "อัตราการป่วยตายด้วยโรคเบาหวาน", tableName: KNOWN_TABLE_MAP["589248f2516fbb85d4a4a5605c3ca1c4"] || undefined },
    { id: "62cdb786f231afbaaaaaac1d5ff844b0", order: 11, name: "อัตราป่วยรายใหม่ของโรคปอดอุดกั้นเรื้อรัง", tableName: KNOWN_TABLE_MAP["62cdb786f231afbaaaaaac1d5ff844b0"] || undefined },
    { id: "33b1c30a4652927ac32fee24e8906170", order: 12, name: "อัตราการป่วยด้วยโรคปอดอุดกั้นเรื้อรัง", tableName: KNOWN_TABLE_MAP["33b1c30a4652927ac32fee24e8906170"] || undefined },
    { id: "3bcec2a91eb03924f0b2714a85ee5b95", order: 13, name: "อัตราการป่วยตายด้วยโรคปอดอุดกั้นเรื้อรัง", tableName: KNOWN_TABLE_MAP["3bcec2a91eb03924f0b2714a85ee5b95"] || undefined },
    { id: "265ac83b975fa7dbb13e6e3375314623", order: 14, name: "อัตราผู้ป่วยโรคถุงลมโป่งพองต่อประชากร", tableName: KNOWN_TABLE_MAP["265ac83b975fa7dbb13e6e3375314623"] || undefined },
    { id: "825c7fbfdbde936cf821a9b16dc4189b", order: 15, name: "อัตราป่วยโรคมะเร็งเต้านมต่อประชากร", tableName: KNOWN_TABLE_MAP["825c7fbfdbde936cf821a9b16dc4189b"] || undefined },
    { id: "cc87b3c4d8148e441447a387c3e070af", order: 16, name: "อัตราป่วยโรคมะเร็งปอดต่อประชากร", tableName: KNOWN_TABLE_MAP["cc87b3c4d8148e441447a387c3e070af"] || undefined },
    { id: "f3a9cabcd1b83af2ad8d8db6d9b6735c", order: 17, name: "อัตราป่วยโรคมะเร็งปากมดลูกต่อประชากร", tableName: KNOWN_TABLE_MAP["f3a9cabcd1b83af2ad8d8db6d9b6735c"] || undefined },
    { id: "672d5ed26be10f6862593da30364201d", order: 18, name: "อัตราผู้ป่วยรายใหม่จากโรคหลอดเลือดหัวใจลดลง", tableName: KNOWN_TABLE_MAP["672d5ed26be10f6862593da30364201d"] || undefined },
    { id: "a7dfd5a2bb045c08129446ca192091bd", order: 19, name: "อัตราป่วยรายใหม่ของโรคหืด", tableName: KNOWN_TABLE_MAP["a7dfd5a2bb045c08129446ca192091bd"] || undefined },
  ],
};

const _C02_ประชากร: HdcSubCatalog = {
  id: "ac4eed1bddb23d6130746d62d2538fd0",
  name: "ประชากร",
  parentCatalogId: _parentId("\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25\u0e17\u0e31\u0e48\u0e27\u0e44\u0e1b"),
  parentName: "\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25\u0e17\u0e31\u0e48\u0e27\u0e44\u0e1b",
  url: "https://hdc.moph.go.th/ubn/public/standard-subcatalog/ac4eed1bddb23d6130746d62d2538fd0",
  reports: [
    { id: "db4e8d42e1234a75bd03d430c31feb2f", order: 1, name: "ปิรามิดประชากรจำแนกเพศ กลุ่มอายุ", tableName: KNOWN_TABLE_MAP["db4e8d42e1234a75bd03d430c31feb2f"] || undefined },
    { id: "710884bc8d16f755073cf194970b064a", order: 2, name: "ประชากรจำแนกเพศ กลุ่มอายุรายปี", tableName: KNOWN_TABLE_MAP["710884bc8d16f755073cf194970b064a"] || undefined },
    { id: "71d636a9831a5265111e3216ae8b2d1e", order: 3, name: "ประชากรต่างด้าว จำแนกเพศ กลุ่มอายุรายปี", tableName: KNOWN_TABLE_MAP["71d636a9831a5265111e3216ae8b2d1e"] || undefined },
    { id: "09cf07164c9b7cfbfe724bee8c6b20c3", order: 4, name: "ประชากรทะเบียนราษฏร์ ย้อนหลัง 3 ปี", tableName: KNOWN_TABLE_MAP["09cf07164c9b7cfbfe724bee8c6b20c3"] || undefined },
    { id: "f83d0cd8b830706dab4cd3cb09afa584", order: 5, name: "ประชากรทะเบียนราษฎร์ จำแนกรายอายุและเพศ", tableName: KNOWN_TABLE_MAP["f83d0cd8b830706dab4cd3cb09afa584"] || undefined },
    { id: "b79d2503134f09e13681be97491753cf", order: 6, name: "ประชากรสัญชาติไทย PERSON เทียบกับฐานทะเบียนราษฏร์", tableName: KNOWN_TABLE_MAP["b79d2503134f09e13681be97491753cf"] || undefined },
    { id: "cb4e5a2990d327d0789a7301e4259b95", order: 7, name: "ประชากรแยกตามหน่วยบริการและชนิดการอยู่อาศัย TYPEAREA", tableName: KNOWN_TABLE_MAP["cb4e5a2990d327d0789a7301e4259b95"] || undefined },
  ],
};

const _C03_โรงเรียนและนักเรียน: HdcSubCatalog = {
  id: "dc6012062b7e25f464da5f82f756e4ce",
  name: "โรงเรียนและนักเรียน",
  parentCatalogId: _parentId("\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25\u0e17\u0e31\u0e48\u0e27\u0e44\u0e1b"),
  parentName: "\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25\u0e17\u0e31\u0e48\u0e27\u0e44\u0e1b",
  url: "https://hdc.moph.go.th/ubn/public/standard-subcatalog/dc6012062b7e25f464da5f82f756e4ce",
  reports: [
    { id: "e65455dd6a4186d4a31e896e5b747436", order: 1, name: "จำนวนโรงเรียน/สถานศึกษา จำแนกตามสังกัด", tableName: KNOWN_TABLE_MAP["e65455dd6a4186d4a31e896e5b747436"] || undefined },
    { id: "3b7ed7f476af9f437f3aa9a581f5fe92", order: 2, name: "จำนวนนักเรียน จำแนกตามโรงเรียน/สถานศึกษา ประเภท และสังกัด", tableName: KNOWN_TABLE_MAP["3b7ed7f476af9f437f3aa9a581f5fe92"] || undefined },
    { id: "66b37209a9a606f8aaaf8f05bf59e1ad", order: 3, name: "จำนวนนักเรียนสำหรับงานอนามัยโรงเรียน รายชั้นปี จำแนก ชาย/หญิง", tableName: KNOWN_TABLE_MAP["66b37209a9a606f8aaaf8f05bf59e1ad"] || undefined },
    { id: "a67e3b25eb4c286985b5a7898f4290ea", order: 4, name: "ร้อยละของโรงเรียน/สถานศึกษาตามงานอนามัยโรงเรียน ที่เชื่อมโยงข้อมูลหน่วยบริการสาธารณสุขเรียบร้อยแล้ว", tableName: KNOWN_TABLE_MAP["a67e3b25eb4c286985b5a7898f4290ea"] || undefined },
  ],
};

const _C04_สาเหตุการป่วย_ตาย: HdcSubCatalog = {
  id: "491672679818600345dc1833920051b2",
  name: "สาเหตุการป่วย/ตาย",
  parentCatalogId: _parentId("\u0e2a\u0e16\u0e32\u0e19\u0e30\u0e2a\u0e38\u0e02\u0e20\u0e32\u0e1e"),
  parentName: "\u0e2a\u0e16\u0e32\u0e19\u0e30\u0e2a\u0e38\u0e02\u0e20\u0e32\u0e1e",
  url: "https://hdc.moph.go.th/ubn/public/standard-subcatalog/491672679818600345dc1833920051b2",
  reports: [
    { id: "65fdb98bca9c344737fcb1fd4b64e9e5", order: 1, name: "สาเหตุการป่วยของผู้ป่วยนอกตามกลุ่มโรค10 อันดับแรก", tableName: KNOWN_TABLE_MAP["65fdb98bca9c344737fcb1fd4b64e9e5"] || undefined },
    { id: "958df49d2e1975eafa7f0a8d9bb7663f", order: 2, name: "สาเหตุการป่วยของผู้ป่วยนอกตามกลุ่มโรค10 อันดับแรก ในกลุ่มอายุน้อยกว่าเท่ากับ 15 ปี", tableName: KNOWN_TABLE_MAP["958df49d2e1975eafa7f0a8d9bb7663f"] || undefined },
    { id: "87af734bc7575ecba528b7c9dba063bb", order: 3, name: "สาเหตุการป่วยของผู้ป่วยในตามกลุ่มโรค10 อันดับแรก", tableName: KNOWN_TABLE_MAP["87af734bc7575ecba528b7c9dba063bb"] || undefined },
    { id: "e9203cf0744a3056e5852697e40de86e", order: 4, name: "สาเหตุการป่วยของผู้ป่วยในตามกลุ่มโรค10 อันดับแรก ในกลุ่มอายุน้อยกว่าเท่ากับ 15 ปี", tableName: KNOWN_TABLE_MAP["e9203cf0744a3056e5852697e40de86e"] || undefined },
    { id: "8881445af732eb166fa2470ba5046956", order: 5, name: "สาเหตุการตาย 10 อันดับแรก", tableName: KNOWN_TABLE_MAP["8881445af732eb166fa2470ba5046956"] || undefined },
    { id: "14cf673fd923e1add94091612c61cfd5", order: 6, name: "สาเหตุการตาย 10 อันดับแรก ในกลุ่มอายุน้อยกว่าเท่ากับ 15 ปี", tableName: KNOWN_TABLE_MAP["14cf673fd923e1add94091612c61cfd5"] || undefined },
    { id: "b4ea22252bb533f3f9225dfcab83d43a", order: 7, name: "รายงานการตายตาม 298 กลุ่มโรค(hospital base)", tableName: KNOWN_TABLE_MAP["b4ea22252bb533f3f9225dfcab83d43a"] || undefined },
    { id: "456bd894231700173a89544c1de3c9bf", order: 8, name: "อัตราการเสียชีวิตจากการจมน้ำของเด็กอายุต่ากว่า 15 ปี", tableName: KNOWN_TABLE_MAP["456bd894231700173a89544c1de3c9bf"] || undefined },
    { id: "0acbbb84a5c774c129dfc849a742d766", order: 9, name: "อัตราตายทารกแรกเกิด อายุน้อยกว่าหรือเท่ากับ 28 วัน", tableName: KNOWN_TABLE_MAP["0acbbb84a5c774c129dfc849a742d766"] || undefined },
    { id: "6f43c3e9d6dc13a7b685e5af88923c4a", order: 10, name: "อัตราทารกที่เป็นโรคโลหิตจางธาลัสซีเมียต่อประชากร 1,000 คน", tableName: KNOWN_TABLE_MAP["6f43c3e9d6dc13a7b685e5af88923c4a"] || undefined },
    { id: "cannabis-psych-disorder", order: 11, name: "ความผิดปกติทางจิตและพฤติกรรมที่เกิดจากการใช้กัญชา (Cannabinoid)", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "cannabis-poisoning", order: 12, name: "ผู้ป่วยที่มีความผิดปกติจากการใช้กัญชา Poisoning:Cannabis (derivatives)", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "Twfd175Rp8TCPca8n5GTK", order: 13, name: "อัตราตายด้วยกลุ่มโรคที่เกิดจากน้ำ การสุขาภิบาลและสุขลักษณะที่ไม่ปลอดภัย", tableName: KNOWN_TABLE_MAP["Twfd175Rp8TCPca8n5GTK"] || undefined },
    { id: "MZ1y0MFDMQZdaGXIJ", order: 14, name: "อัตราป่วยด้วยกลุ่มโรคที่เกิดจากน้ำ การสุขาภิบาลและสุขลักษณะที่ไม่ปลอดภัย", tableName: KNOWN_TABLE_MAP["MZ1y0MFDMQZdaGXIJ"] || undefined },
  ],
};

const _C05_การใช้บริการสาธารณสุข: HdcSubCatalog = {
  id: "9d8c311d6336373d40437c4423508cad",
  name: "การใช้บริการสาธารณสุข",
  parentCatalogId: _parentId("\u0e01\u0e32\u0e23\u0e40\u0e02\u0e49\u0e32\u0e16\u0e36\u0e07\u0e1a\u0e23\u0e34\u0e01\u0e32\u0e23"),
  parentName: "\u0e01\u0e32\u0e23\u0e40\u0e02\u0e49\u0e32\u0e16\u0e36\u0e07\u0e1a\u0e23\u0e34\u0e01\u0e32\u0e23",
  url: "https://hdc.moph.go.th/ubn/public/standard-subcatalog/9d8c311d6336373d40437c4423508cad",
  reports: [
    { id: "4b35d96e225bf34a16774b13705250f4", order: 1, name: "อัตราการใช้บริการผู้ป่วยนอก จำแนกกลุ่มสิทธิ (ครั้งต่อคนต่อปี)", tableName: KNOWN_TABLE_MAP["4b35d96e225bf34a16774b13705250f4"] || undefined },
    { id: "aebf36f508889ee1ecba12cd56159956", order: 2, name: "อัตราการใช้บริการผู้ป่วยใน จำแนกกลุ่มสิทธิ (วันต่อคน)", tableName: KNOWN_TABLE_MAP["aebf36f508889ee1ecba12cd56159956"] || undefined },
    { id: "92a705c26f22754d7462e9f742436b6f", order: 3, name: "อัตราการใช้บริการผู้ป่วยนอก ทุกสิทธิ (ครั้งต่อคนต่อปี) รายเดือน", tableName: KNOWN_TABLE_MAP["92a705c26f22754d7462e9f742436b6f"] || undefined },
    { id: "39afb27f0e1256396e6a972716d20e2e", order: 4, name: "อัตราการใช้บริการผู้ป่วยใน ทุกสิทธิ รายเดือน (วันต่อคนและอัตราครองเตียง)", tableName: KNOWN_TABLE_MAP["39afb27f0e1256396e6a972716d20e2e"] || undefined },
    { id: "c8a139305c94a90d7b4a65cef5c8d8e7", order: 5, name: "อัตราการใช้บริการผู้ป่วยนอกของประชากรไทย (ครั้งต่อคนต่อปี)", tableName: KNOWN_TABLE_MAP["c8a139305c94a90d7b4a65cef5c8d8e7"] || undefined },
    { id: "be74f26c4e773f13f6076d7e901324b3", order: 6, name: "อัตราการใช้บริการผู้ป่วยในของประชากรไทย (วันต่อคน)", tableName: KNOWN_TABLE_MAP["be74f26c4e773f13f6076d7e901324b3"] || undefined },
    { id: "38e40477e601acfba24653ceb9021cd3", order: 7, name: "รายงานการส่งต่อระหว่างสถานพยาบาล", tableName: KNOWN_TABLE_MAP["38e40477e601acfba24653ceb9021cd3"] || undefined },
    { id: "38e40477e601acfba24653ceb9021cd4", order: 8, name: "ร้อยละการส่งต่อผู้ป่วยนอกเขตสุขภาพลดลง", tableName: KNOWN_TABLE_MAP["38e40477e601acfba24653ceb9021cd4"] || undefined },
    { id: "e4a6299a408fe53ba1ce003e22240d7b", order: 9, name: "รายงานอุบัติเหตุทางถนน", tableName: KNOWN_TABLE_MAP["e4a6299a408fe53ba1ce003e22240d7b"] || undefined },
    { id: "3f97a68cfb9dd74428d94a08ceb59c0e", order: 10, name: "รายงานอุบัติเหตุทางถนน จำแนกตามสถานที่เกิดเหตุและประเภทผู้บาดเจ็บ", tableName: KNOWN_TABLE_MAP["3f97a68cfb9dd74428d94a08ceb59c0e"] || undefined },
    { id: "fa7fcf7f29cb374f6c4ee6e86b114200", order: 11, name: "รายงานอุบัติเหตุทางถนน จำแนกตามประเภทยานพาหนะที่เกิดเหตุ", tableName: KNOWN_TABLE_MAP["fa7fcf7f29cb374f6c4ee6e86b114200"] || undefined },
    { id: "45055c550ef5587953ff9d7924034cd0", order: 12, name: "รายงานอุบัติเหตุทางถนน จำแนกตามปัจจัยเสี่ยง", tableName: KNOWN_TABLE_MAP["45055c550ef5587953ff9d7924034cd0"] || undefined },
    { id: "4709220e55ae6c91c872e08b4ac2498c", order: 13, name: "อัตราการเสียชีวิตของผู้ป่วยวิกฤตฉุกเฉิน (triage level 1) ภายใน 24 ชั่วโมง ในโรงพยาบาลระดับ A, S, M1 (ทั้งที่ ER และ Admit) น้อยกว่าร้อยละ 12", tableName: KNOWN_TABLE_MAP["4709220e55ae6c91c872e08b4ac2498c"] || undefined },
    { id: "36203bcbf14fbe8f1906497ae8f5c0a5", order: 14, name: "รายงานจำนวนผู้เข้ารับการบำบัดบุหรี่/ผู้ดื่มเครื่องดื่มแอลกอฮอล์ ในสถานบริการ", tableName: KNOWN_TABLE_MAP["36203bcbf14fbe8f1906497ae8f5c0a5"] || undefined },
    { id: "76e909d7af59d6ddc3fe11ebe25dad4d", order: 15, name: "โรคติดเชื้อระบบทางเดินหายใจที่สำคัญ (รายวัน)", tableName: KNOWN_TABLE_MAP["76e909d7af59d6ddc3fe11ebe25dad4d"] || undefined },
    { id: "d8cd1ecb3a780f9b3d8d767eeb58002d", order: 16, name: "โรคติดเชื้อระบบทางเดินหายใจ J&B,U (รพ.รายวัน)", tableName: KNOWN_TABLE_MAP["d8cd1ecb3a780f9b3d8d767eeb58002d"] || undefined },
    { id: "e8b647ca3960f0fda1e64be0d4f0a684", order: 17, name: "ข้อมูลรายโรคที่มีความสัมพันธ์กับพฤติกรรม การล้างมือ การสวมหน้ากากอนามัย/หน้ากากผ้า จำแนกรายเดือน เปรียบเทียบ 3 ปีย้อนหลัง", tableName: KNOWN_TABLE_MAP["e8b647ca3960f0fda1e64be0d4f0a684"] || undefined },
    { id: "2d85d6ec39840f8051854b028fa13073", order: 18, name: "หน่วยบริการที่มีบริการการแพทย์ทางไกล", tableName: KNOWN_TABLE_MAP["2d85d6ec39840f8051854b028fa13073"] || undefined },
    { id: "6mun4l1edmmc4329x5xwh", order: 19, name: "ร้อยละของผู้ป่วยโรคเบาหวาน ได้รับการตรวจ HbA1c ซ้ำภายใน 90 วัน", tableName: KNOWN_TABLE_MAP["6mun4l1edmmc4329x5xwh"] || undefined },
    { id: "m7rdkm3qgyxgae02cqgif", order: 20, name: "ร้อยละของผู้ป่วยโรคเบาหวาน ได้รับการตรวจ LDL-Cholesterol ซ้ำภายใน 90 วัน", tableName: KNOWN_TABLE_MAP["m7rdkm3qgyxgae02cqgif"] || undefined },
    { id: "0eqewut9py61nmma8i2ax", order: 21, name: "ร้อยละของผู้มารับบริการได้รับการตรวจ Total Cholesterol ซ้ำภายใน 90 วัน", tableName: KNOWN_TABLE_MAP["0eqewut9py61nmma8i2ax"] || undefined },
    { id: "igizblqvh46narmlmvcs5", order: 22, name: "ร้อยละของผู้มารับบริการได้รับการตรวจ Triglycerides ซ้ำภายใน 90 วัน", tableName: KNOWN_TABLE_MAP["igizblqvh46narmlmvcs5"] || undefined },
    { id: "a6an5mcvq4ndo8m0djmc5", order: 23, name: "ร้อยละผู้ป่วยโรคเบาหวาน ได้รับการตรวจ HbA1c อย่างน้อยปีละ 1 ครั้ง", tableName: KNOWN_TABLE_MAP["a6an5mcvq4ndo8m0djmc5"] || undefined },
    { id: "66js79dih7inc40q2d3s8", order: 24, name: "ร้อยละของผู้ป่วยโรคเบาหวานได้รับการตรวจ LDL-Cholesterol อย่างน้อยปีละ 1 ครั้ง", tableName: KNOWN_TABLE_MAP["66js79dih7inc40q2d3s8"] || undefined },
    { id: "avxi1awp5a4wwjel5pd5t", order: 25, name: "ร้อยละของผู้ป่วยโรคเบาหวาน ได้รับการตรวจ Creatinine อย่างน้อยปีละ 1 ครั้ง", tableName: KNOWN_TABLE_MAP["avxi1awp5a4wwjel5pd5t"] || undefined },
  ],
};

const _C06_การป่วยด้วยโรคจากมลพิษทางอากาศ: HdcSubCatalog = {
  id: "9c647c1f31ac73f4396c2cf987e7448a",
  name: "การป่วยด้วยโรคจากมลพิษทางอากาศ",
  parentCatalogId: _parentId("\u0e2a\u0e16\u0e32\u0e19\u0e30\u0e2a\u0e38\u0e02\u0e20\u0e32\u0e1e"),
  parentName: "\u0e2a\u0e16\u0e32\u0e19\u0e30\u0e2a\u0e38\u0e02\u0e20\u0e32\u0e1e",
  url: "https://hdc.moph.go.th/ubn/public/standard-subcatalog/9c647c1f31ac73f4396c2cf987e7448a",
  reports: [
    { id: "", order: 1, name: "การป่วยด้วยโรคจากมลพิษทางอากาศ", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 2, name: "โรคที่เกี่ยวข้องกับการรับสัมผัสฝุ่นละอองขนาดไม่เกิน 2.5 ไมครอน (PM2.5) ตามประกาศกระทรวงสาธารณสุขฯ ภายใต้ พ.ร.บ.ควบคุมโรคจากการประกอบอาชีพและโรคจากสิ่งแวดล้อม พ.ศ.2562)", tableName: KNOWN_TABLE_MAP["None"] || undefined },
  ],
};

const _C07_การเข้าถึงระบบบริการสุขภาพจิต: HdcSubCatalog = {
  id: "ea11bc4bbf333b78e6f53a26f7ab6c89",
  name: "การเข้าถึงระบบบริการสุขภาพจิต",
  parentCatalogId: _parentId("\u0e01\u0e32\u0e23\u0e40\u0e02\u0e49\u0e32\u0e16\u0e36\u0e07\u0e1a\u0e23\u0e34\u0e01\u0e32\u0e23"),
  parentName: "\u0e01\u0e32\u0e23\u0e40\u0e02\u0e49\u0e32\u0e16\u0e36\u0e07\u0e1a\u0e23\u0e34\u0e01\u0e32\u0e23",
  url: "https://hdc.moph.go.th/ubn/public/standard-subcatalog/ea11bc4bbf333b78e6f53a26f7ab6c89",
  reports: [
    { id: "", order: 1, name: "กลุ่มเด็ก", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 2, name: "กลุ่มผู้ใหญ่", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 3, name: "กลุ่มผู้ป่วยโรคทางจิตเวช", tableName: KNOWN_TABLE_MAP["None"] || undefined },
  ],
};

const _C08_โรคจากการประกอบอาชีพและสิ่งแวดล้อม: HdcSubCatalog = {
  id: "f16421e617aed29602f9f09d951cce68",
  name: "โรคจากการประกอบอาชีพและสิ่งแวดล้อม",
  parentCatalogId: _parentId("\u0e2a\u0e16\u0e32\u0e19\u0e30\u0e2a\u0e38\u0e02\u0e20\u0e32\u0e1e"),
  parentName: "\u0e2a\u0e16\u0e32\u0e19\u0e30\u0e2a\u0e38\u0e02\u0e20\u0e32\u0e1e",
  url: "https://hdc.moph.go.th/ubn/public/standard-subcatalog/f16421e617aed29602f9f09d951cce68",
  reports: [
    { id: "", order: 1, name: "โรคจากพิษสารกำจัดศัตรูพืช", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 2, name: "โรคจากพิษโลหะหนัก", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 3, name: "โรคจากพิษสารตะกั่ว", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 4, name: "โรคจากพิษปรอทและสารประกอบ", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 5, name: "โรคระบบทางเดินหายใจ", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "9eeb99bcea8aa161d0b32131605553ac", order: 6, name: "อัตราป่วยโรคระบบทางเดินหายใจที่ระบุว่าเกิดจากมลพิษสิ่งแวดล้อม Y97", tableName: KNOWN_TABLE_MAP["9eeb99bcea8aa161d0b32131605553ac"] || undefined },
    { id: "", order: 7, name: "โรคเรื้อรังของทางเดินหายใจส่วนล่าง", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "cd6e8f475b0ab7756404d12dd8bb2aed", order: 8, name: "อัตราป่วยโรคเรื้อรังของทางเดินหายใจส่วนล่างที่ระบุว่าเกิดจากมลพิษสิ่งแวดล้อม Y97", tableName: KNOWN_TABLE_MAP["cd6e8f475b0ab7756404d12dd8bb2aed"] || undefined },
    { id: "", order: 9, name: "โรคหัวใจขาดเลือด", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "90896cde087b4969e5f7216894288515", order: 10, name: "อัตราป่วยโรคหัวใจขาดเลือดที่ระบุว่าเกิดจากมลพิษสิ่งแวดล้อม Y97", tableName: KNOWN_TABLE_MAP["90896cde087b4969e5f7216894288515"] || undefined },
    { id: "", order: 11, name: "การบาดเจ็บจากการทำงาน", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 12, name: "โรคปอดฝุ่นหิน (Silicosis)", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 13, name: "โรคระบบทางเดินหายใจที่เกิดจากแอสเบสตอส", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 14, name: "โรคมะเร็งเยื่อหุ้มปอดมีโซทิลิโอมา (Mesothelioma)", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 15, name: "โรคประสาทหูเสื่อมจากเสียงดัง", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 16, name: "โรคจากพิษสารตัวทำละลายอินทรีย์", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 17, name: "โรคกระดูกและกล้ามเนื้อจากการทำงาน", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 18, name: "โรคจากความร้อน(กลุ่ม Heat stroke)", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 19, name: "โรคหอบหืด", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 20, name: "โรคผิวหนัง", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 21, name: "การตรวจคัดกรองสมรรถภาพการมองเห็น ในประชากรไทย อายุ 15-65 ปี", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 22, name: "การตรวจคัดกรองสมรรถภาพทางปอด ในประชากรไทย อายุ 15-65 ปี", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 23, name: "การตรวจเอ็กซเรย์ปอดฟิล์มใหญ่ในวัยทำงาน ในประชากรไทย อายุ 15 - 65 ปี", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 24, name: "การตรวจคัดกรองเพื่อหาความเสี่ยงจากสารกำจัดศัตรูพืช ในประชากรไทย อายุ 15 ปีขึ้นไป", tableName: KNOWN_TABLE_MAP["None"] || undefined },
  ],
};

const _C09_แพทย์แผนไทย: HdcSubCatalog = {
  id: "30bc6364fc06a33a7802e16bc596ac3b",
  name: "แพทย์แผนไทย",
  parentCatalogId: _parentId("\u0e01\u0e32\u0e23\u0e40\u0e02\u0e49\u0e32\u0e16\u0e36\u0e07\u0e1a\u0e23\u0e34\u0e01\u0e32\u0e23"),
  parentName: "\u0e01\u0e32\u0e23\u0e40\u0e02\u0e49\u0e32\u0e16\u0e36\u0e07\u0e1a\u0e23\u0e34\u0e01\u0e32\u0e23",
  url: "https://hdc.moph.go.th/ubn/public/standard-subcatalog/30bc6364fc06a33a7802e16bc596ac3b",
  reports: [
    { id: "", order: 1, name: "ผู้ป่วยนอก OPD Case", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 2, name: "ผู้ป่วยใน IPD Case", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 3, name: "ผู้ป่วยเฉพาะกลุ่มโรค กลุ่มอาการ", tableName: KNOWN_TABLE_MAP["None"] || undefined },
  ],
};

const _C10_สุขภาพประชากรข้ามชาติ: HdcSubCatalog = {
  id: "6e6b8a42012f37ae32459cd806d9aed8",
  name: "สุขภาพประชากรข้ามชาติ",
  parentCatalogId: _parentId("\u0e01\u0e32\u0e23\u0e40\u0e02\u0e49\u0e32\u0e16\u0e36\u0e07\u0e1a\u0e23\u0e34\u0e01\u0e32\u0e23"),
  parentName: "\u0e01\u0e32\u0e23\u0e40\u0e02\u0e49\u0e32\u0e16\u0e36\u0e07\u0e1a\u0e23\u0e34\u0e01\u0e32\u0e23",
  url: "https://hdc.moph.go.th/ubn/public/standard-subcatalog/6e6b8a42012f37ae32459cd806d9aed8",
  reports: [
    { id: "PoyA9dlvDgeWcWQjGHZ", order: 1, name: "สาเหตุการเจ็บป่วยผู้ป่วยนอกของประชากรข้ามชาติ 5 อันดับแรก", tableName: KNOWN_TABLE_MAP["PoyA9dlvDgeWcWQjGHZ"] || undefined },
    { id: "4qbEvy6OafHsg017cQfp", order: 2, name: "โรคที่ต้องเฝ้าระวังที่มารับบริการของประชากรข้ามชาติ 5 อันดับแรก", tableName: KNOWN_TABLE_MAP["4qbEvy6OafHsg017cQfp"] || undefined },
    { id: "Yl4DUMBaD4NOIpzj", order: 3, name: "จำนวนครั้งของผู้มารับบริการที่เป็นประชากรข้ามชาติ จำแนกตามสิทธิการรักษา", tableName: KNOWN_TABLE_MAP["Yl4DUMBaD4NOIpzj"] || undefined },
    { id: "aqaUc0rc89cvObs", order: 4, name: "สัดส่วนผู้มารับบริการ ที่เป็นประชากรข้ามชาติ", tableName: KNOWN_TABLE_MAP["aqaUc0rc89cvObs"] || undefined },
  ],
};

const _C11_โรคจากการประกอบอาชีพและสิ่งแวดล้อมแรงงานต่างด้าว: HdcSubCatalog = {
  id: "6e6b8a42012f37ae32459cd806d9aed7",
  name: "โรคจากการประกอบอาชีพและสิ่งแวดล้อมแรงงานต่างด้าว",
  parentCatalogId: _parentId("\u0e01\u0e32\u0e23\u0e40\u0e02\u0e49\u0e32\u0e16\u0e36\u0e07\u0e1a\u0e23\u0e34\u0e01\u0e32\u0e23"),
  parentName: "\u0e01\u0e32\u0e23\u0e40\u0e02\u0e49\u0e32\u0e16\u0e36\u0e07\u0e1a\u0e23\u0e34\u0e01\u0e32\u0e23",
  url: "https://hdc.moph.go.th/ubn/public/standard-subcatalog/6e6b8a42012f37ae32459cd806d9aed7",
  reports: [
    { id: "f5664caea1ac7f5c5f0e0a14944ab779", order: 1, name: "ประชากรแรงงานต่างด้าวเจ็บป่วยด้วยโรคจากการประกอบอาชีพ (14 กลุ่มโรค)", tableName: KNOWN_TABLE_MAP["f5664caea1ac7f5c5f0e0a14944ab779"] || undefined },
    { id: "c781cf62ed1fb6834470b341a3cc3c3d", order: 2, name: "ประชากรแรงงานต่างด้าวเจ็บป่วยด้วยโรคจากการประกอบอาชีพ (14 กลุ่มโรค) จำแนกรายอาชีพ", tableName: KNOWN_TABLE_MAP["c781cf62ed1fb6834470b341a3cc3c3d"] || undefined },
  ],
};

const _C12_CMI: HdcSubCatalog = {
  id: "833e9779725ef96bc06926d8ba4e4c04",
  name: "CMI",
  parentCatalogId: _parentId("\u0e01\u0e32\u0e23\u0e40\u0e02\u0e49\u0e32\u0e16\u0e36\u0e07\u0e1a\u0e23\u0e34\u0e01\u0e32\u0e23"),
  parentName: "\u0e01\u0e32\u0e23\u0e40\u0e02\u0e49\u0e32\u0e16\u0e36\u0e07\u0e1a\u0e23\u0e34\u0e01\u0e32\u0e23",
  url: "https://hdc.moph.go.th/ubn/public/standard-subcatalog/833e9779725ef96bc06926d8ba4e4c04",
  reports: [
    { id: "ce331927a984726e907d00396cacda4d", order: 1, name: "รายงานสรุป CMI (ปิดรายงาน) (ใช้ข้อมูลได้ที่ กบรส. https://cmi.moph.go.th)", tableName: KNOWN_TABLE_MAP["ce331927a984726e907d00396cacda4d"] || undefined },
    { id: "a18e310aa1ceba87288c946572b6885f", order: 2, name: "รายงานสรุป CMI ตามกลุ่มวินิจฉัยโรคใหญ่ (MDC) (ปิดรายงาน) (ใช้ข้อมูลได้ที่ กบรส. https://cmi.moph.go.th)", tableName: KNOWN_TABLE_MAP["a18e310aa1ceba87288c946572b6885f"] || undefined },
    { id: "10a8c089ff1ff900442dab8477cf21ab", order: 3, name: "รายงานสรุป CMI ตามกลุ่มวินิจฉัยโรคร่วม (DRG) (ปิดรายงาน) (ใช้ข้อมูลได้ที่ กบรส. https://cmi.moph.go.th)", tableName: KNOWN_TABLE_MAP["10a8c089ff1ff900442dab8477cf21ab"] || undefined },
    { id: "fc5da685b7544a1e9bc3f76fabc388b8", order: 4, name: "รายงานสรุป CMI กรณีผู้ป่วยเสียชีวิต (ปิดรายงาน) (ใช้ข้อมูลได้ที่ กบรส. https://cmi.moph.go.th)", tableName: KNOWN_TABLE_MAP["fc5da685b7544a1e9bc3f76fabc388b8"] || undefined },
    { id: "345088f8536bf5cad8518590c7da9afb", order: 5, name: "รายงานสรุป CMI กรณีผู้ป่วยเสียชีวิต แยกตาม MDC (ปิดรายงาน) (ใช้ข้อมูลได้ที่ กบรส. https://cmi.moph.go.th)", tableName: KNOWN_TABLE_MAP["345088f8536bf5cad8518590c7da9afb"] || undefined },
    { id: "cdfd4d8373260641ae67b5bdaed2136f", order: 6, name: "รายงานสรุป CMI กรณีผู้ป่วยเสียชีวิต แยกตาม DRG (ปิดรายงาน) (ใช้ข้อมูลได้ที่ กบรส. https://cmi.moph.go.th)", tableName: KNOWN_TABLE_MAP["cdfd4d8373260641ae67b5bdaed2136f"] || undefined },
    { id: "4cb064f94f66b3ab7d216c6ad3957991", order: 7, name: "รายงานสรุป CMI จำแนกตามพื้นที่การรับ Refer (ปิดรายงาน) (ใช้ข้อมูลได้ที่ กบรส. https://cmi.moph.go.th)", tableName: KNOWN_TABLE_MAP["4cb064f94f66b3ab7d216c6ad3957991"] || undefined },
  ],
};

const _C13_แพทย์แผนจีน: HdcSubCatalog = {
  id: "e67da2428ef09faaa68d7e92d1becb51",
  name: "แพทย์แผนจีน",
  parentCatalogId: _parentId("\u0e01\u0e32\u0e23\u0e40\u0e02\u0e49\u0e32\u0e16\u0e36\u0e07\u0e1a\u0e23\u0e34\u0e01\u0e32\u0e23"),
  parentName: "\u0e01\u0e32\u0e23\u0e40\u0e02\u0e49\u0e32\u0e16\u0e36\u0e07\u0e1a\u0e23\u0e34\u0e01\u0e32\u0e23",
  url: "https://hdc.moph.go.th/ubn/public/standard-subcatalog/e67da2428ef09faaa68d7e92d1becb51",
  reports: [
    { id: "4ca582c18cbff487e79fc213690d2e8c", order: 1, name: "OPD-จำนวนการวินิจฉัยโรคแพทย์แผนจีน ตามกลุ่มโรคที่รักษาด้วยการแพทย์แผนจีน", tableName: KNOWN_TABLE_MAP["4ca582c18cbff487e79fc213690d2e8c"] || undefined },
    { id: "050d854ebd7c8f86b3f6cd584d6f1df6", order: 2, name: "OPD-รายงานหัตถการด้านการแพทย์แผนจีน", tableName: KNOWN_TABLE_MAP["050d854ebd7c8f86b3f6cd584d6f1df6"] || undefined },
    { id: "18a142232fd2eaf3d595e190b5b3e76c", order: 3, name: "OPD-ลำดับการวินิจฉัยโรคแพทย์แผนจีน ตามกลุ่มโรคที่รักษาด้วยการแพทย์แผนจีน", tableName: KNOWN_TABLE_MAP["18a142232fd2eaf3d595e190b5b3e76c"] || undefined },
    { id: "69f14e55fab1b653c0975404876067f2", order: 4, name: "IPD-จำนวนการวินิจฉัยโรคแพทย์แผนจีน ตามกลุ่มโรคที่รักษาด้วยการแพทย์แผนจีน", tableName: KNOWN_TABLE_MAP["69f14e55fab1b653c0975404876067f2"] || undefined },
    { id: "518cedb77b2c0e87e3044c53d6377dc2", order: 5, name: "IPD-รายงานหัตถการด้านการแพทย์แผนจีน", tableName: KNOWN_TABLE_MAP["518cedb77b2c0e87e3044c53d6377dc2"] || undefined },
    { id: "fe9b60048bd604dcc46a9365f62c3fe2", order: 6, name: "IPD-ลำดับการวินิจฉัยโรคแพทย์แผนจีน ตามกลุ่มโรคที่รักษาด้วยการแพทย์แผนจีน", tableName: KNOWN_TABLE_MAP["fe9b60048bd604dcc46a9365f62c3fe2"] || undefined },
  ],
};

const _C14_ทันตกรรม_บริการ: HdcSubCatalog = {
  id: "fc73b811eb6d9206e7e5baf8ad20d7b9",
  name: "ทันตกรรม(บริการ)",
  parentCatalogId: _parentId("\u0e01\u0e32\u0e23\u0e40\u0e02\u0e49\u0e32\u0e16\u0e36\u0e07\u0e1a\u0e23\u0e34\u0e01\u0e32\u0e23"),
  parentName: "\u0e01\u0e32\u0e23\u0e40\u0e02\u0e49\u0e32\u0e16\u0e36\u0e07\u0e1a\u0e23\u0e34\u0e01\u0e32\u0e23",
  url: "https://hdc.moph.go.th/ubn/public/standard-subcatalog/fc73b811eb6d9206e7e5baf8ad20d7b9",
  reports: [
    { id: "cba4cc41872398d244dde8e2604c1fda", order: 1, name: "ผู้ป่วยนอกที่รับบริการทางทันตกรรม รวมทุกสิทธิ์ (คนต่อสถานบริการ)", tableName: KNOWN_TABLE_MAP["cba4cc41872398d244dde8e2604c1fda"] || undefined },
    { id: "1b7a1fcbcd6cc2abae4c26d17d2b7045", order: 2, name: "ผู้ป่วยนอกที่รับบริการทางทันตกรรม รวมทุกสิทธิ์ (ครั้ง)", tableName: KNOWN_TABLE_MAP["1b7a1fcbcd6cc2abae4c26d17d2b7045"] || undefined },
    { id: "43b53d1950da4739e9a7f8ee4b0d25d2", order: 3, name: "ผู้ป่วยนอกที่รับบริการทางทันตกรรม รวมทุกสิทธิ์ (ครั้ง) โดยทันตบุคลากร", tableName: KNOWN_TABLE_MAP["43b53d1950da4739e9a7f8ee4b0d25d2"] || undefined },
    { id: "960aa7aeaa407980c00b16f99d47fe80", order: 4, name: "รายงานผู้ป่วยนอกที่รับบริการทางทันตกรรม (ครั้งต่อคนต่อปี) แยก 4 สิทธิ", tableName: KNOWN_TABLE_MAP["960aa7aeaa407980c00b16f99d47fe80"] || undefined },
    { id: "3d89d7b2e236d60d2e02ad969db4f6ea", order: 5, name: "รายงานผู้ป่วยนอกที่รับบริการทางทันตกรรม ในผู้มีอายุ 15-59 ปี แยกรายสิทธิ", tableName: KNOWN_TABLE_MAP["3d89d7b2e236d60d2e02ad969db4f6ea"] || undefined },
    { id: "2db90b3f093514c004d529873cfe7311", order: 6, name: "ผู้ป่วยในที่รับบบริการทางทันตกรรม รวมทุกสิทธิ์ (visit)", tableName: KNOWN_TABLE_MAP["2db90b3f093514c004d529873cfe7311"] || undefined },
    { id: "", order: 7, name: "กลุ่มหญิงตั้งครรภ์", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 8, name: "กลุ่มเด็ก 0-2 ปี", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 9, name: "กลุ่ม 3-5 ปี", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 10, name: "กลุ่ม 6-12 ปี", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 11, name: "กลุ่มก่อนวัยสูงอายุ (40-59 ปี)", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 12, name: "กลุ่มผู้สูงอายุ (60 ปีขึ้นไป)", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 13, name: "งานบริการทันตกรรม", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 14, name: "งาน P&P สุขภาพช่องปาก ที่มุ่งเน้นการเข้าถึงบริการบางกลุ่มวัยเป็นการจำเพาะ", tableName: KNOWN_TABLE_MAP["None"] || undefined },
  ],
};

const _C15_การสร้างเสริมภูมิคุ้มกันโรค: HdcSubCatalog = {
  id: "4df360514655f79f13901ef1181ca1c7",
  name: "การสร้างเสริมภูมิคุ้มกันโรค",
  parentCatalogId: _parentId("\u0e2a\u0e48\u0e07\u0e40\u0e2a\u0e23\u0e34\u0e21\u0e1b\u0e49\u0e2d\u0e07\u0e01\u0e31\u0e19"),
  parentName: "\u0e2a\u0e48\u0e07\u0e40\u0e2a\u0e23\u0e34\u0e21\u0e1b\u0e49\u0e2d\u0e07\u0e01\u0e31\u0e19",
  url: "https://hdc.moph.go.th/ubn/public/standard-subcatalog/4df360514655f79f13901ef1181ca1c7",
  reports: [
    { id: "", order: 1, name: "กลุ่มอายุ 1 ปี", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 2, name: "กลุ่มอายุ 2 ปี", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 3, name: "กลุ่มอายุ 3 ปี", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 4, name: "กลุ่มอายุ 5 ปี", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 5, name: "กลุ่มวัยเรียน", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 6, name: "กลุ่มผู้ใหญ่", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 7, name: "กลุ่มหญิงตั้งครรภ์", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 8, name: "กลุ่มวัคซีนรณรงค์", tableName: KNOWN_TABLE_MAP["None"] || undefined },
  ],
};

const _C16_การเฝ้าระวัง: HdcSubCatalog = {
  id: "cf7d9da207c0f9a7ee6c4fe3f09f67dd",
  name: "การเฝ้าระวัง",
  parentCatalogId: _parentId("\u0e2a\u0e48\u0e07\u0e40\u0e2a\u0e23\u0e34\u0e21\u0e1b\u0e49\u0e2d\u0e07\u0e01\u0e31\u0e19"),
  parentName: "\u0e2a\u0e48\u0e07\u0e40\u0e2a\u0e23\u0e34\u0e21\u0e1b\u0e49\u0e2d\u0e07\u0e01\u0e31\u0e19",
  url: "https://hdc.moph.go.th/ubn/public/standard-subcatalog/cf7d9da207c0f9a7ee6c4fe3f09f67dd",
  reports: [
    { id: "137a726340e4dfde7bbbc5d8aeee3ac3", order: 1, name: "ร้อยละผู้ป่วยโรคเบาหวานที่ควบคุมระดับน้ำตาลได้ดี", tableName: KNOWN_TABLE_MAP["137a726340e4dfde7bbbc5d8aeee3ac3"] || undefined },
    { id: "2e3813337b6b5377c2f68affe247d5f9", order: 2, name: "ร้อยละผู้ป่วยโรคความดันโลหิตสูงที่ควบคุมความดันโลหิตได้ดี", tableName: KNOWN_TABLE_MAP["2e3813337b6b5377c2f68affe247d5f9"] || undefined },
    { id: "9f650a39de3038adcfc9ae5f15c02ba5", order: 3, name: "สัดส่วนผู้ป่วยนอกโรคความดันโลหิตสูง มารับบริการในศสม.และรพ.สต.เทียบกับโรงพยาบาลแม่ข่าย", tableName: KNOWN_TABLE_MAP["9f650a39de3038adcfc9ae5f15c02ba5"] || undefined },
    { id: "3b0f5194bbc864b6f26adfe08da8a981", order: 4, name: "สัดส่วนผู้ป่วยนอกโรคเบาหวาน มารับบริการในศสม.และรพ.สต.เทียบกับโรงพยาบาลแม่ข่าย", tableName: KNOWN_TABLE_MAP["3b0f5194bbc864b6f26adfe08da8a981"] || undefined },
    { id: "848b5045eab655b7be0069efcc445dd9", order: 5, name: "ร้อยละผู้ป่วยนอกโรคเบาหวาน ที่มารับบริการในศสม.และรพ.สต.มีผลการควบคุมโรคเบาหวาน ตามเกณฑ์", tableName: KNOWN_TABLE_MAP["848b5045eab655b7be0069efcc445dd9"] || undefined },
    { id: "82a12029ec7f57eb2e286e830f90b039", order: 6, name: "ร้อยละผู้ป่วยนอกโรคความดันโลหิตสูง ที่มารับบริการในศสม.และรพ.สต.มีผลการควบคุมความดันโลหิต ตามเกณฑ์", tableName: KNOWN_TABLE_MAP["82a12029ec7f57eb2e286e830f90b039"] || undefined },
    { id: "df9a12ff1c86ab1b29b3e47118bcd535", order: 7, name: "ร้อยละของผู้ป่วยโรคเบาหวานและโรคความดันโลหิตสูงที่ควบคุมได้", tableName: KNOWN_TABLE_MAP["df9a12ff1c86ab1b29b3e47118bcd535"] || undefined },
    { id: "f140502196c78b4a5c6a379f0d2a769f", order: 8, name: "ความชุกของผู้สูบบุหรี่ของประชากรไทย อายุ 15 ปีขึ้นไป", tableName: KNOWN_TABLE_MAP["f140502196c78b4a5c6a379f0d2a769f"] || undefined },
    { id: "df9f540b5d9e30948ffa2d0f4fd88a82", order: 9, name: "การเฝ้าระวังอัตราการคลอดมีชีพในหญิงอายุ 10-14 ปี", tableName: KNOWN_TABLE_MAP["df9f540b5d9e30948ffa2d0f4fd88a82"] || undefined },
    { id: "1336d766d29c4a739ed33ff9f4e79d83", order: 10, name: "การเฝ้าระวังอัตราการคลอดมีชีพในหญิงอายุ 15-19 ปี", tableName: KNOWN_TABLE_MAP["1336d766d29c4a739ed33ff9f4e79d83"] || undefined },
  ],
};

const _C17_อนามัยแม่และเด็ก: HdcSubCatalog = {
  id: "1ed90bc32310b503b7ca9b32af425ae5",
  name: "อนามัยแม่และเด็ก",
  parentCatalogId: _parentId("\u0e2a\u0e48\u0e07\u0e40\u0e2a\u0e23\u0e34\u0e21\u0e1b\u0e49\u0e2d\u0e07\u0e01\u0e31\u0e19"),
  parentName: "\u0e2a\u0e48\u0e07\u0e40\u0e2a\u0e23\u0e34\u0e21\u0e1b\u0e49\u0e2d\u0e07\u0e01\u0e31\u0e19",
  url: "https://hdc.moph.go.th/ubn/public/standard-subcatalog/1ed90bc32310b503b7ca9b32af425ae5",
  reports: [
    { id: "", order: 1, name: "หญิงตั้งครรภ์ทั้งหมด", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 2, name: "หญิงตั้งครรภ์ >> แม่วัยรุ่น", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 3, name: "หญิงตั้งครรภ์ >> เสี่ยงคลอดก่อนกำหนด (Preterm)", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 4, name: "เด็กแรกเกิด - 12 เดือน", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 5, name: "พัฒนาการเด็ก >> DSPM", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 6, name: "พัฒนาการเด็ก >>TEDA4I หรือเครื่องมือมาตรฐานอื่น", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 7, name: "ข้อมูลเชื่อมโยง >>เด็กที่ได้รับเงินอุดหนุนเพื่อการเลี้ยงดูเด็กแรกเกิด (กรมกิจการเด็กและเยาวชน)", tableName: KNOWN_TABLE_MAP["None"] || undefined },
  ],
};

const _C18_การคัดกรอง: HdcSubCatalog = {
  id: "6966b0664b89805a484d7ac96c6edc48",
  name: "การคัดกรอง",
  parentCatalogId: _parentId("\u0e2a\u0e48\u0e07\u0e40\u0e2a\u0e23\u0e34\u0e21\u0e1b\u0e49\u0e2d\u0e07\u0e01\u0e31\u0e19"),
  parentName: "\u0e2a\u0e48\u0e07\u0e40\u0e2a\u0e23\u0e34\u0e21\u0e1b\u0e49\u0e2d\u0e07\u0e01\u0e31\u0e19",
  url: "https://hdc.moph.go.th/ubn/public/standard-subcatalog/6966b0664b89805a484d7ac96c6edc48",
  reports: [
    { id: "68e401815a64e624c286d97ef3582aa3", order: 1, name: "การคัดกรองความดันโลหิตสูง ในประชากรไทย จำแนกกลุ่มอายุ", tableName: KNOWN_TABLE_MAP["68e401815a64e624c286d97ef3582aa3"] || undefined },
    { id: "6833128a5d76a6afcae3e4a6af0e718c", order: 2, name: "ประชากร 35 ปีขึ้นไปได้รับการคัดกรอง และเสี่ยงต่อโรคความดันโลหิตสูง", tableName: KNOWN_TABLE_MAP["6833128a5d76a6afcae3e4a6af0e718c"] || undefined },
    { id: "726942e401ef74754a45cd15f30ed02e", order: 3, name: "การเข้าถึงบริการและการคัดกรองโรคความดันโลหิตสูง", tableName: KNOWN_TABLE_MAP["726942e401ef74754a45cd15f30ed02e"] || undefined },
    { id: "150edaa99ecbe538378b8150e0776763", order: 4, name: "การคัดกรองเบาหวานในประชากรไทย จำแนกกลุ่มอายุ", tableName: KNOWN_TABLE_MAP["150edaa99ecbe538378b8150e0776763"] || undefined },
    { id: "323a75335033c5976566d99f5ad53b33", order: 5, name: "ประชากร 35 ปีขึ้นไปได้รับการคัดกรอง และเสี่ยงต่อโรคเบาหวาน", tableName: KNOWN_TABLE_MAP["323a75335033c5976566d99f5ad53b33"] || undefined },
    { id: "d7e91cec5aca74419bd84b1da4dc266f", order: 6, name: "การเข้าถึงบริการและการคัดกรองโรคเบาหวาน", tableName: KNOWN_TABLE_MAP["d7e91cec5aca74419bd84b1da4dc266f"] || undefined },
    { id: "c0cb85481f434d563be6ec98a01cbb92", order: 7, name: "อัตราการคัดกรองมะเร็งปากมดลูกในสตรีไทย อายุ 30-60 ปี", tableName: KNOWN_TABLE_MAP["c0cb85481f434d563be6ec98a01cbb92"] || undefined },
    { id: "308526013808e90ce8f30d66e3b5ad82", order: 8, name: "อัตราการคัดกรองมะเร็งเต้านมในสตรีอายุ 30 – 70 ปี", tableName: KNOWN_TABLE_MAP["308526013808e90ce8f30d66e3b5ad82"] || undefined },
    { id: "68345e9bd757bdbf07d0d7fc71bee68f", order: 9, name: "ความชุกผู้บริโภคเครื่องดื่มแอลกอฮอล์ในประชากรอายุ 15 - 19 ปี", tableName: KNOWN_TABLE_MAP["68345e9bd757bdbf07d0d7fc71bee68f"] || undefined },
    { id: "bbcb40adb960e0564efba686c316c009", order: 10, name: "ร้อยละของ Healthy Ageing", tableName: KNOWN_TABLE_MAP["bbcb40adb960e0564efba686c316c009"] || undefined },
    { id: "953a2fc648be8ce76a8115fbb955bb51", order: 11, name: "จำนวนผู้สูงอายุในเขตพื้นที่รับผิดชอบ จำแนกตามความสามารถในการทำกิจวัตรประจำวัน", tableName: KNOWN_TABLE_MAP["953a2fc648be8ce76a8115fbb955bb51"] || undefined },
    { id: "aa86b13e8cb60cae6c3216b7e3e5f151", order: 12, name: "การคัดกรองผู้สูงอายุ 9 ด้าน (Basic/Community Screen STEP1)", tableName: KNOWN_TABLE_MAP["aa86b13e8cb60cae6c3216b7e3e5f151"] || undefined },
    { id: "3ed685f555bc1579c821ecc548fc0ee2", order: 13, name: "การคัดกรองผู้สูงอายุ 9 ด้าน จาก API", tableName: KNOWN_TABLE_MAP["3ed685f555bc1579c821ecc548fc0ee2"] || undefined },
  ],
};

const _C19_อนามัยโรงเรียน: HdcSubCatalog = {
  id: "67f8b1657bc8c796274fb9b6ad5a701d",
  name: "อนามัยโรงเรียน",
  parentCatalogId: _parentId("\u0e2a\u0e48\u0e07\u0e40\u0e2a\u0e23\u0e34\u0e21\u0e1b\u0e49\u0e2d\u0e07\u0e01\u0e31\u0e19"),
  parentName: "\u0e2a\u0e48\u0e07\u0e40\u0e2a\u0e23\u0e34\u0e21\u0e1b\u0e49\u0e2d\u0e07\u0e01\u0e31\u0e19",
  url: "https://hdc.moph.go.th/ubn/public/standard-subcatalog/67f8b1657bc8c796274fb9b6ad5a701d",
  reports: [
    { id: "", order: 1, name: "ภาวะโภชนาการ", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 2, name: "สุขภาพช่องปาก", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 3, name: "สุขภาพร่างกาย (หู ตา เหา ภาวะโลหิตจาง)", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 4, name: "อนามัยการเจริญพันธุ์", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 5, name: "โรงเรียนส่งเสริมสุขภาพ", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 6, name: "วัคซีนสำหรับเด็กวัยเรียน", tableName: KNOWN_TABLE_MAP["None"] || undefined },
  ],
};

const _C20_ส่งเสริมและป้องกันปัญหาสุขภาพจิต: HdcSubCatalog = {
  id: "574437c29aff8d1709da55677abc4b03",
  name: "ส่งเสริมและป้องกันปัญหาสุขภาพจิต",
  parentCatalogId: _parentId("\u0e2a\u0e48\u0e07\u0e40\u0e2a\u0e23\u0e34\u0e21\u0e1b\u0e49\u0e2d\u0e07\u0e01\u0e31\u0e19"),
  parentName: "\u0e2a\u0e48\u0e07\u0e40\u0e2a\u0e23\u0e34\u0e21\u0e1b\u0e49\u0e2d\u0e07\u0e01\u0e31\u0e19",
  url: "https://hdc.moph.go.th/ubn/public/standard-subcatalog/574437c29aff8d1709da55677abc4b03",
  reports: [
    { id: "795a4a9ce9dc5906f7a3c866ec363913", order: 1, name: "การคัดกรองความเครียด(ST-5)ในผู้ป่วยโรคเรื้อรัง", tableName: KNOWN_TABLE_MAP["795a4a9ce9dc5906f7a3c866ec363913"] || undefined },
    { id: "7f4ebb6d63d2e3568f12c20e9a55b27a", order: 2, name: "การคัดกรองความเครียด(ST-5)ในหญิงตั้งครรภ์", tableName: KNOWN_TABLE_MAP["7f4ebb6d63d2e3568f12c20e9a55b27a"] || undefined },
    { id: "7bd56fb9f20abea2eb72dfca24155e6a", order: 3, name: "การคัดกรองความเครียด(ST-5)ในกลุ่มผู้สูงอายุ", tableName: KNOWN_TABLE_MAP["7bd56fb9f20abea2eb72dfca24155e6a"] || undefined },
    { id: "234d24523894e656f33260494dddd968", order: 4, name: "การคัดกรองโรคซึมเศร้า (2Q) ในผู้ป่วยโรคเรื้อรัง", tableName: KNOWN_TABLE_MAP["234d24523894e656f33260494dddd968"] || undefined },
    { id: "a1178e45c0788dd30dc9361569b6a5cd", order: 5, name: "การคัดกรองโรคซึมเศร้า (2Q) ในหญิงตั้งครรภ์", tableName: KNOWN_TABLE_MAP["a1178e45c0788dd30dc9361569b6a5cd"] || undefined },
    { id: "8f104b5d2848b8a05a487205f0287991", order: 6, name: "การคัดกรองโรคซึมเศร้า (2Q) ในกลุ่มผู้สูงอายุ", tableName: KNOWN_TABLE_MAP["8f104b5d2848b8a05a487205f0287991"] || undefined },
    { id: "46a3841a0ccaca9ac890bd891e30848f", order: 7, name: "การประเมินโรคซึมเศร้า (9Q) ในผู้ป่วยโรคเรื้อรัง", tableName: KNOWN_TABLE_MAP["46a3841a0ccaca9ac890bd891e30848f"] || undefined },
    { id: "94b8a5d737d96ce04ea82f6aca6a7068", order: 8, name: "การประเมินโรคซึมเศร้า (9Q) ในหญิงตั้งครรภ์", tableName: KNOWN_TABLE_MAP["94b8a5d737d96ce04ea82f6aca6a7068"] || undefined },
    { id: "1cabe82729905e268bb97fed7cb117dd", order: 9, name: "การประเมินโรคซึมเศร้า (9Q) ในกลุ่มผู้สูงอายุ", tableName: KNOWN_TABLE_MAP["1cabe82729905e268bb97fed7cb117dd"] || undefined },
    { id: "49e6c2e9fb9ee2deb0639680325cfbcd", order: 10, name: "การประเมินการฆ่าตัวตาย (8Q) ในผู้ป่วยโรคเรื้อรัง", tableName: KNOWN_TABLE_MAP["49e6c2e9fb9ee2deb0639680325cfbcd"] || undefined },
    { id: "3d14b2605c124a5013c1fb508a26c915", order: 11, name: "การประเมินการฆ่าตัวตาย (8Q) ในหญิงตั้งครรภ์", tableName: KNOWN_TABLE_MAP["3d14b2605c124a5013c1fb508a26c915"] || undefined },
    { id: "ba59f01298b420b859a93124cc250d41", order: 12, name: "การประเมินการฆ่าตัวตาย (8Q) ในกลุ่มผู้สูงอายุ", tableName: KNOWN_TABLE_MAP["ba59f01298b420b859a93124cc250d41"] || undefined },
    { id: "eb89da75dadb58d78484b3b54bf58de4", order: 13, name: "การประเมินการฆ่าตัวตาย (8Q) ในกลุ่มผู้สูงอายุจาก 2Q Plus เสี่ยงต่อการฆ่าตัวตาย", tableName: KNOWN_TABLE_MAP["eb89da75dadb58d78484b3b54bf58de4"] || undefined },
    { id: "", order: 14, name: "การได้รับวัคซีนป้องกัน COVID-19", tableName: KNOWN_TABLE_MAP["None"] || undefined },
  ],
};

const _C21_การเฝ้าระวังด้านส่งเสริมสุขภาพและอนามัยสิ่งแวดล้อม: HdcSubCatalog = {
  id: "bebf866fceaef84c4078965eaf619565",
  name: "การเฝ้าระวังด้านส่งเสริมสุขภาพและอนามัยสิ่งแวดล้อม",
  parentCatalogId: _parentId("\u0e2a\u0e48\u0e07\u0e40\u0e2a\u0e23\u0e34\u0e21\u0e1b\u0e49\u0e2d\u0e07\u0e01\u0e31\u0e19"),
  parentName: "\u0e2a\u0e48\u0e07\u0e40\u0e2a\u0e23\u0e34\u0e21\u0e1b\u0e49\u0e2d\u0e07\u0e01\u0e31\u0e19",
  url: "https://hdc.moph.go.th/ubn/public/standard-subcatalog/bebf866fceaef84c4078965eaf619565",
  reports: [
    { id: "4164a7c49fcb2b8c3ccca67dcdf28bd0", order: 1, name: "ร้อยละของเด็กแรกเกิด - ต่ำกว่า 6 เดือน กินนมแม่อย่างเดียว", tableName: KNOWN_TABLE_MAP["4164a7c49fcb2b8c3ccca67dcdf28bd0"] || undefined },
    { id: "422edc9d4d81d5c943a8ca9029f20e78", order: 2, name: "ร้อยละหญิงตั้งครรภ์ ที่มารับบริการในหน่วยบริการ ได้รับยาเม็ดที่มีส่วนประกอบของไอโอดีน (Workload)", tableName: KNOWN_TABLE_MAP["422edc9d4d81d5c943a8ca9029f20e78"] || undefined },
    { id: "67e41dbb1ce5d844d49f6b7b10e30d01", order: 3, name: "ร้อยละของเด็กอายุ 0 - 5 ปี สูงดีสมส่วน และส่วนสูงเฉลี่ยที่อายุ 5 ปี", tableName: KNOWN_TABLE_MAP["67e41dbb1ce5d844d49f6b7b10e30d01"] || undefined },
    { id: "e28682b2718e6cc82b8dbb3e00f2e28e", order: 4, name: "ร้อยละของเด็กอายุ 6 - 14 ปี สูงดีสมส่วน และส่วนสูงเฉลี่ยที่อายุ 12 ปี", tableName: KNOWN_TABLE_MAP["e28682b2718e6cc82b8dbb3e00f2e28e"] || undefined },
    { id: "9b019d9cc12576000e6e84acfb9ad7f0", order: 5, name: "ร้อยละวัยรุ่น 15-18 ปี สูงดีสมส่วน และส่วนสูงเฉลี่ยที่อายุ 18 ปี", tableName: KNOWN_TABLE_MAP["9b019d9cc12576000e6e84acfb9ad7f0"] || undefined },
    { id: "4f7d8042fb0a064b25f29a48f6ccd23f", order: 6, name: "ร้อยละของการตั้งครรภ์ซ้ำในหญิงอายุน้อยกว่า 20 ปี", tableName: KNOWN_TABLE_MAP["4f7d8042fb0a064b25f29a48f6ccd23f"] || undefined },
    { id: "e2d0b1a802a956529b7d1d0f9516313f", order: 7, name: "ร้อยละของประชากรวัยทำงานอายุ 30-44 ปี มีค่าดัชนีมวลกายปกติ", tableName: KNOWN_TABLE_MAP["e2d0b1a802a956529b7d1d0f9516313f"] || undefined },
    { id: "0317b7abf99b89c45555e97e19c4cb21", order: 8, name: "OHSP ร้อยละของผู้สูงอายุ ที่มีฟันแท้ใช้งานได้ไม่น้อยกว่า 20 ซี่", tableName: KNOWN_TABLE_MAP["0317b7abf99b89c45555e97e19c4cb21"] || undefined },
  ],
};

const _C22_Service_Plan_สาขามะเร็ง: HdcSubCatalog = {
  id: "59acae7a68f02c8e2c0cb88dfc6df3b3",
  name: "Service Plan สาขามะเร็ง",
  parentCatalogId: _parentId("Service Plan"),
  parentName: "Service Plan",
  url: "https://hdc.moph.go.th/ubn/public/standard-subcatalog/59acae7a68f02c8e2c0cb88dfc6df3b3",
  reports: [
    { id: "308526013808e90ce8f30d66e3b5ad82", order: 1, name: "อัตราการคัดกรองมะเร็งเต้านมในสตรีอายุ 30 – 70 ปี", tableName: KNOWN_TABLE_MAP["308526013808e90ce8f30d66e3b5ad82"] || undefined },
    { id: "c0cb85481f434d563be6ec98a01cbb92", order: 2, name: "อัตราการคัดกรองมะเร็งปากมดลูกในสตรีไทย อายุ 30-60 ปี", tableName: KNOWN_TABLE_MAP["c0cb85481f434d563be6ec98a01cbb92"] || undefined },
    { id: "825c7fbfdbde936cf821a9b16dc4189b", order: 3, name: "อัตราป่วยโรคมะเร็งเต้านมต่อประชากร", tableName: KNOWN_TABLE_MAP["825c7fbfdbde936cf821a9b16dc4189b"] || undefined },
    { id: "f3a9cabcd1b83af2ad8d8db6d9b6735c", order: 4, name: "อัตราป่วยโรคมะเร็งปากมดลูกต่อประชากร", tableName: KNOWN_TABLE_MAP["f3a9cabcd1b83af2ad8d8db6d9b6735c"] || undefined },
    { id: "cc87b3c4d8148e441447a387c3e070af", order: 5, name: "อัตราป่วยโรคมะเร็งปอดต่อประชากร", tableName: KNOWN_TABLE_MAP["cc87b3c4d8148e441447a387c3e070af"] || undefined },
    { id: "c9368ec68b5aae4446b802ef018796c7", order: 6, name: "ร้อยละของประชากรกลุ่มเป้าหมายได้รับการคัดกรองมะเร็งลำไส้ใหญ่และลำไส้ตรง", tableName: KNOWN_TABLE_MAP["c9368ec68b5aae4446b802ef018796c7"] || undefined },
    { id: "9844395374ca85817d6a4633c46e1381", order: 7, name: "ผลการคัดกรองมะเร็งลำไส้ใหญ่และลำไส้ตรงด้วยวิธี FIT test (workload)", tableName: KNOWN_TABLE_MAP["9844395374ca85817d6a4633c46e1381"] || undefined },
    { id: "418f57ddbe3ed52648ffb3a34a91eb66", order: 8, name: "จำนวนการรับบริการส่องกล้องเพื่อตรวจหามะเร็งลำไส้ใหญ่และลำไส้ตรง (work load)", tableName: KNOWN_TABLE_MAP["418f57ddbe3ed52648ffb3a34a91eb66"] || undefined },
    { id: "7e1e06b69c142d489ef8155eb291b5ed", order: 9, name: "รายงานผลการคัดกรองมะเร็งปากมดลูก ด้วยวิธี HPV DNA Test", tableName: KNOWN_TABLE_MAP["7e1e06b69c142d489ef8155eb291b5ed"] || undefined },
    { id: "de7pcg6hzuf308pq25gko", order: 10, name: "จํานวนผู้ที่ได้รับการตรวจคัดกรองโรคไวรัสตับอักเสบ ซี", tableName: KNOWN_TABLE_MAP["de7pcg6hzuf308pq25gko"] || undefined },
    { id: "vXun66qwB9MRZyQ2OPFsv", order: 11, name: "จำนวนผู้ป่วยโรคไวรัสตับอักเสบ บี รายใหม่ (วินิจฉัยใหม่)", tableName: KNOWN_TABLE_MAP["vXun66qwB9MRZyQ2OPFsv"] || undefined },
    { id: "bc55c6d92dc54143b14351d4db6af201", order: 12, name: "ร้อยละของผู้ป่วยโรคไวรัสตับอักเสบ บี เรื้อรังที่ได้รับยา", tableName: KNOWN_TABLE_MAP["bc55c6d92dc54143b14351d4db6af201"] || undefined },
    { id: "hs10awwvd4c7b3gfvnqyj", order: 13, name: "จำนวนผู้ที่ได้รับการตรวจคัดกรองโรคไวรัส ตับอักเสบ บี", tableName: KNOWN_TABLE_MAP["hs10awwvd4c7b3gfvnqyj"] || undefined },
    { id: "9d18697edf96471e846a2b72e7c59f3c", order: 14, name: "จำนวนผู้ป่วยด้วยโรคไวรัสตับอักเสบ บี เรื้อรัง ที่เสียชีวิตจากโรคตับแข็งหรือโรคมะเร็งตับ", tableName: KNOWN_TABLE_MAP["9d18697edf96471e846a2b72e7c59f3c"] || undefined },
    { id: "5JMfoOawtLctWMz", order: 15, name: "จำนวนผู้ป่วยโรคไวรัสตับอักเสบ บีเรื้อรัง ที่ได้รับกํารวินิจฉัยว่าเป็น ตับแข็งรายใหม่", tableName: KNOWN_TABLE_MAP["5JMfoOawtLctWMz"] || undefined },
    { id: "meinh9z4u4Z1cJp", order: 16, name: "จำนวนผู้ป่วยโรคไวรัสตับอักเสบ บีเรื้อรัง ที่ได้รับกํารวินิจฉัยว่าเป็น มะเร็งตับรายใหม่", tableName: KNOWN_TABLE_MAP["meinh9z4u4Z1cJp"] || undefined },
    { id: "018e8300951e79cfb7ddfc094cce8238", order: 17, name: "จำนวนผู้ป่วยที่ติดเชื้อไวรัสตับอักเสบซีเรื้อรังรายใหม่ในผู้ใช้สารเสพติดชนิดฉีด", tableName: KNOWN_TABLE_MAP["018e8300951e79cfb7ddfc094cce8238"] || undefined },
    { id: "5c24968b81ff4eafb5c65b0f5ffc8f39", order: 18, name: "จำนวนผู้ป่วยด้วยโรคไวรัสตับอักเสบ ซี เรื้อรัง ที่เสียชีวิตจากโรคตับแข็งหรือโรคมะเร็งตับ", tableName: KNOWN_TABLE_MAP["5c24968b81ff4eafb5c65b0f5ffc8f39"] || undefined },
    { id: "YfG056gNiNqTmNu", order: 19, name: "จำนวนผู้ป่วยโรคไวรัสตับอักเสบ ซีเรื้อรัง ที่ได้รับการวินิจฉัยว่าเป็น ตับแข็งรายใหม่", tableName: KNOWN_TABLE_MAP["YfG056gNiNqTmNu"] || undefined },
    { id: "YfG056gNiNqTmNu", order: 20, name: "จำนวนผู้ป่วยโรคไวรัสตับอักเสบ ซีเรื้อรัง ที่ได้รับการวินิจฉัยว่าเป็น ตับแข็งรายใหม่", tableName: KNOWN_TABLE_MAP["YfG056gNiNqTmNu"] || undefined },
    { id: "d66c39bdcb0743569d12eb95ac400867", order: 21, name: "จำนวนผู้ป่วยโรคไวรัสตับอักเสบ ซีเรื้อรัง ที่ได้รับการวินิจฉัยว่าเป็นมะเร็งตับรายใหม่", tableName: KNOWN_TABLE_MAP["d66c39bdcb0743569d12eb95ac400867"] || undefined },
    { id: "vTlnrKLLUnaNadx", order: 22, name: "จํานวนผู้ป่วยโรคไวรัสตับอักเสบ ซี รายใหม่", tableName: KNOWN_TABLE_MAP["vTlnrKLLUnaNadx"] || undefined },
    { id: "cef2a37336604ee3b85a6ac5412b995", order: 23, name: "ร้อยละของผู้ป่วยโรคไวรัสตับอักเสบซี เรื้อรัง ที่ได้รับการรักษาจนหาย", tableName: KNOWN_TABLE_MAP["cef2a37336604ee3b85a6ac5412b995"] || undefined },
  ],
};

const _C23_งานโภชนาการ: HdcSubCatalog = {
  id: "46522b5bd1e06d24a5bd81917257a93c",
  name: "งานโภชนาการ",
  parentCatalogId: _parentId("\u0e2a\u0e48\u0e07\u0e40\u0e2a\u0e23\u0e34\u0e21\u0e1b\u0e49\u0e2d\u0e07\u0e01\u0e31\u0e19"),
  parentName: "\u0e2a\u0e48\u0e07\u0e40\u0e2a\u0e23\u0e34\u0e21\u0e1b\u0e49\u0e2d\u0e07\u0e01\u0e31\u0e19",
  url: "https://hdc.moph.go.th/ubn/public/standard-subcatalog/46522b5bd1e06d24a5bd81917257a93c",
  reports: [
    { id: "", order: 1, name: "หญิงตั้งครรภ์", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 2, name: "เด็กอายุ 0-2 ปี", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 3, name: "เด็กอายุ 3-5 ปี", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 4, name: "เด็กอายุน้อยกว่า 6 ปี", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 5, name: "เด็กอายุ 6-14 ปี", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 6, name: "วัยรุ่น", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 7, name: "วัยทำงาน อายุ 19-59 ปี", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 8, name: "วัยผู้สูงอายุ", tableName: KNOWN_TABLE_MAP["None"] || undefined },
  ],
};

const _C24_Service_Plan_สาขาโรคหัวใจและหลอดเลือด: HdcSubCatalog = {
  id: "39fd60c25235db479930db85a0e97dd3",
  name: "Service Plan สาขาโรคหัวใจและหลอดเลือด",
  parentCatalogId: _parentId("Service Plan"),
  parentName: "Service Plan",
  url: "https://hdc.moph.go.th/ubn/public/standard-subcatalog/39fd60c25235db479930db85a0e97dd3",
  reports: [
    { id: "", order: 1, name: "กลุ่มผู้ป่วยโรคหลอดเลือดหัวใจ", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 2, name: "กลุ่มผู้ป่วยโรคหลอดเลือดสมอง", tableName: KNOWN_TABLE_MAP["None"] || undefined },
  ],
};

const _C25_Service_Plan_สาขาตา: HdcSubCatalog = {
  id: "3f32171e7f7b8dc7f36949985cdf3d30",
  name: "Service Plan สาขาตา",
  parentCatalogId: _parentId("Service Plan"),
  parentName: "Service Plan",
  url: "https://hdc.moph.go.th/ubn/public/standard-subcatalog/3f32171e7f7b8dc7f36949985cdf3d30",
  reports: [
    { id: "6105c19c6d63fcd8efffe55215eeb2e5", order: 1, name: "จำนวนทารกที่เกิดก่อนกำหนดแยกตามอายุครรภ์ (ROP)", tableName: KNOWN_TABLE_MAP["6105c19c6d63fcd8efffe55215eeb2e5"] || undefined },
    { id: "3d15c699c3bed0f1d2778afb98e25bfe", order: 2, name: "จำนวนทารกแรกเกิดแยกตามน้ำหนัก(ROP)", tableName: KNOWN_TABLE_MAP["3d15c699c3bed0f1d2778afb98e25bfe"] || undefined },
    { id: "852d670531d8827732d1945e587262d9", order: 3, name: "จำนวนผู้ป่วยเป็นโรคจอตาผิดปกติจากการเกิดก่อนกำหนด (ROP) จำแนกตามเขตพื้นที่ เพศ และสัญชาติ", tableName: KNOWN_TABLE_MAP["852d670531d8827732d1945e587262d9"] || undefined },
    { id: "842d10410ca25f33a0cafd51c7815325", order: 4, name: "จำนวนผู้ป่วยเป็นโรคจอตาผิดปกติจากการเกิดก่อนกำหนด (ROP) จำแนกตามช่วงเวลาที่ได้รับหัตถการ", tableName: KNOWN_TABLE_MAP["842d10410ca25f33a0cafd51c7815325"] || undefined },
    { id: "7bf4381172d5c4e05885f4bf4339e43d", order: 5, name: "จำนวนหัตถการในผู้ป่วยเป็นโรคจอตาผิดปกติจากการเกิดก่อนกำหนด (ROP)", tableName: KNOWN_TABLE_MAP["7bf4381172d5c4e05885f4bf4339e43d"] || undefined },
  ],
};

const _C26_Service_Plan_สาขาทารกแรกเกิด: HdcSubCatalog = {
  id: "58b45d24cc1ba2a288d0f9bb1f7d3f71",
  name: "Service Plan สาขาทารกแรกเกิด",
  parentCatalogId: _parentId("Service Plan"),
  parentName: "Service Plan",
  url: "https://hdc.moph.go.th/ubn/public/standard-subcatalog/58b45d24cc1ba2a288d0f9bb1f7d3f71",
  reports: [
    { id: "0acbbb84a5c774c129dfc849a742d766", order: 1, name: "อัตราตายทารกแรกเกิด อายุน้อยกว่าหรือเท่ากับ 28 วัน", tableName: KNOWN_TABLE_MAP["0acbbb84a5c774c129dfc849a742d766"] || undefined },
    { id: "50617527edfd34fe8e3fc9fabac0429a", order: 2, name: "อัตราตายทารกไทยแรกเกิด อายุน้อยกว่าหรือเท่ากับ 28 วัน", tableName: KNOWN_TABLE_MAP["50617527edfd34fe8e3fc9fabac0429a"] || undefined },
    { id: "677a456215365fb2ccf43dc5dc8c66ad", order: 3, name: "ร้อยละความครอบคลุมการคัดกรองได้ยินของทารกแรกเกิด", tableName: KNOWN_TABLE_MAP["677a456215365fb2ccf43dc5dc8c66ad"] || undefined },
  ],
};

const _C27_Service_Plan_สาขาสุขภาพช่องปาก: HdcSubCatalog = {
  id: "db30e434e30565c12fbac44958e338d5",
  name: "Service Plan สาขาสุขภาพช่องปาก",
  parentCatalogId: _parentId("Service Plan"),
  parentName: "Service Plan",
  url: "https://hdc.moph.go.th/ubn/public/standard-subcatalog/db30e434e30565c12fbac44958e338d5",
  reports: [
    { id: "99ccd1e29a5cdb81256fb3fa587698ef", order: 1, name: "OHSP อัตรา (ร้อยละ) การใช้บริการทันตกรรมรวมทุกสิทธิ เฉพาะเขตรับผิดชอบ (คน) (ใช้แบบความครอบคลุม)", tableName: KNOWN_TABLE_MAP["99ccd1e29a5cdb81256fb3fa587698ef"] || undefined },
    { id: "00af52a6f2efcb52b48a2d51433cdaaa", order: 2, name: "OHSP อัตรา (ร้อยละ) การใช้บริการทันตกรรมสิทธิ UC เฉพาะเขตรับผิดชอบ (คน) (ใช้แบบความครอบคลุม)", tableName: KNOWN_TABLE_MAP["00af52a6f2efcb52b48a2d51433cdaaa"] || undefined },
    { id: "bafe62ee021cc53306415b0fa0a2c049", order: 3, name: "OHSP อัตรา (ร้อยละ) การการใช้บริการ P&P เฉพาะเขตรับผิดชอบ (คน) (ใช้แบบความครอบคลุม)", tableName: KNOWN_TABLE_MAP["bafe62ee021cc53306415b0fa0a2c049"] || undefined },
    { id: "defb23a746850f247916f086644af5c0", order: 4, name: "OHSP อัตรา (ร้อยละ) การใช้บริการทันตกรรมพื้นฐาน เฉพาะเขตรับผิดชอบ (คน) (ใช้แบบความครอบคลุม)", tableName: KNOWN_TABLE_MAP["defb23a746850f247916f086644af5c0"] || undefined },
    { id: "6c57c609054cf9a4111c2704fd2bbce1", order: 5, name: "OHSP อัตรา (ร้อยละ) การใช้บริการทันตกรรมเฉพาะทาง เฉพาะเขตรับผิดชอบ (คน) (ใช้แบบความครอบคลุม)", tableName: KNOWN_TABLE_MAP["6c57c609054cf9a4111c2704fd2bbce1"] || undefined },
    { id: "1a888956dda87264ae6fd1e290d17d68", order: 6, name: "OHSP อัตรา (ร้อยละ) การใช้บริการ P&P ในกลุ่มหญิงตั้งครรภ์ เฉพาะเขตรับผิดชอบ (คน) (ใช้แบบความครอบคลุม)", tableName: KNOWN_TABLE_MAP["1a888956dda87264ae6fd1e290d17d68"] || undefined },
    { id: "261d0c53638bf4c6cf2af32b677f6c35", order: 7, name: "OHSP อัตรา (ร้อยละ) การใช้บริการ P&P ในกลุ่มเด็กอายุ 0-2 ปี เฉพาะเขตรับผิดชอบ (คน) (ใช้แบบความครอบคลุม)", tableName: KNOWN_TABLE_MAP["261d0c53638bf4c6cf2af32b677f6c35"] || undefined },
    { id: "743694135b213c08d3916bf14503aa70", order: 8, name: "OHSP อัตรา (ร้อยละ) การใช้บริการ P&P ในกลุ่มเด็กอายุ 3-5 ปี เฉพาะเขตรับผิดชอบ (คน) (ใช้แบบความครอบคลุม)", tableName: KNOWN_TABLE_MAP["743694135b213c08d3916bf14503aa70"] || undefined },
    { id: "51b65857707cb843a0a2a97b5310a373", order: 9, name: "OHSP อัตรา (ร้อยละ) การใช้บริการ P&P ในกลุ่มเด็กอายุ 6-12 ปี เฉพาะเขตรับผิดชอบ (คน) (ใช้แบบความครอบคลุม)", tableName: KNOWN_TABLE_MAP["51b65857707cb843a0a2a97b5310a373"] || undefined },
    { id: "0282aaa7ea31ae081a80990adbd8ca1e", order: 10, name: "OHSP อัตรา (ร้อยละ) การใช้บริการ P&P ในกลุ่มผู้สูงอายุ เฉพาะเขตรับผิดชอบ (คน) (ใช้แบบความครอบคลุม)", tableName: KNOWN_TABLE_MAP["0282aaa7ea31ae081a80990adbd8ca1e"] || undefined },
    { id: "53f0ff606ac8a9c99409f9ad0918dff1", order: 11, name: "OHSP ร้อยละ visit ตรวจฟันอย่างเดียว ต่อ visit ทั้งหมด", tableName: KNOWN_TABLE_MAP["53f0ff606ac8a9c99409f9ad0918dff1"] || undefined },
    { id: "4c3d9eebfc5ead04511f945f9025c518", order: 12, name: "OHSP ร้อยละ visit ตรวจฟันอย่างเดียวโดยทันตบุคลากร ต่อ visit ทั้งหมด", tableName: KNOWN_TABLE_MAP["4c3d9eebfc5ead04511f945f9025c518"] || undefined },
    { id: "1a26b9eb98385cdece32f6a7bcce1e2c", order: 13, name: "OHSP ร้อยละจำนวนรายบริการส่งเสริมป้องกันต่อบริการทั้งหมด", tableName: KNOWN_TABLE_MAP["1a26b9eb98385cdece32f6a7bcce1e2c"] || undefined },
    { id: "9f3ca952aa7e77eb7e790c418a5ccb9c", order: 14, name: "OHSP ร้อยละจำนวนรายบริการทันตกรรมพื้นฐานต่อบริการทั้งหมด", tableName: KNOWN_TABLE_MAP["9f3ca952aa7e77eb7e790c418a5ccb9c"] || undefined },
    { id: "c533163ee460b95c16a63c1db970a387", order: 15, name: "OHSP ร้อยละจำนวนรายบริการทันตกรรมเฉพาะทางต่อบริการทั้งหมด", tableName: KNOWN_TABLE_MAP["c533163ee460b95c16a63c1db970a387"] || undefined },
    { id: "d585aa059fa2c91549854e9ed76412aa", order: 16, name: "OHSP จำนวนคนไข้ (ครั้ง) เฉลี่ย ต่อทันตบุคลากรต่อปี", tableName: KNOWN_TABLE_MAP["d585aa059fa2c91549854e9ed76412aa"] || undefined },
    { id: "", order: 17, name: "ผลการจัดบริการสุขภาพช่องปากตามกลุ่มเป้าหมาย", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 18, name: "ข้อมูลสภาวะสุขภาพช่องปาก", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 19, name: "งาน P&P สุขภาพช่องปาก ที่มุ่งเน้นการเข้าถึงบริการบางกลุ่มวัยเป็นการจำเพาะ", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "abt2t2k4z4xeqzytwbave", order: 20, name: "ร้อยละของเด็กอายุ0-5 ปี ฟันดีไม่มีผุ (Cavity Free) (คน)", tableName: KNOWN_TABLE_MAP["abt2t2k4z4xeqzytwbave"] || undefined },
  ],
};

const _C28_Service_Plan_สาขาสุขภาพจิตและจิตเวช: HdcSubCatalog = {
  id: "22710ed5db1ed6b12aab540a7b0753b3",
  name: "Service Plan สาขาสุขภาพจิตและจิตเวช",
  parentCatalogId: _parentId("Service Plan"),
  parentName: "Service Plan",
  url: "https://hdc.moph.go.th/ubn/public/standard-subcatalog/22710ed5db1ed6b12aab540a7b0753b3",
  reports: [
    { id: "706b605192b49d385ba044350af9c46a", order: 1, name: "ร้อยละของผู้ป่วยโรคซึมเศร้าเข้าถึงบริการ", tableName: KNOWN_TABLE_MAP["706b605192b49d385ba044350af9c46a"] || undefined },
    { id: "7b13c6fcfb0be636fc5cce071e49a71a", order: 2, name: "ร้อยละของผู้ป่วยโรคจิตเภทเข้าถึงบริการ", tableName: KNOWN_TABLE_MAP["7b13c6fcfb0be636fc5cce071e49a71a"] || undefined },
    { id: "e0678b73197151b3f181edcb0ee76b97", order: 3, name: "ร้อยละของผู้ป่วยโรคสมาธิสั้นเข้าถึงบริการสุขภาพจิตที่ได้มาตรฐาน", tableName: KNOWN_TABLE_MAP["e0678b73197151b3f181edcb0ee76b97"] || undefined },
    { id: "e959959205e37be069751dbbe9937802", order: 4, name: "ร้อยละของผู้ป่วยโรคออทิสติกเข้าถึงบริการสุขภาพจิตที่ได้มาตรฐาน", tableName: KNOWN_TABLE_MAP["e959959205e37be069751dbbe9937802"] || undefined },
    { id: "61a59cc4548076dfa9efdc0ecb86f91b", order: 5, name: "ผู้ป่วยโรคซึมเศร้าเข้าถึงบริการ(workload)", tableName: KNOWN_TABLE_MAP["61a59cc4548076dfa9efdc0ecb86f91b"] || undefined },
    { id: "31ad3425df7840afe354735d7d2ba957", order: 6, name: "ผู้ป่วยโรคจิตเภทเข้าถึงบริการ(workload)", tableName: KNOWN_TABLE_MAP["31ad3425df7840afe354735d7d2ba957"] || undefined },
    { id: "90ccfbfd92f7d1bdd89d0cfd8b4e46ec", order: 7, name: "ผู้ป่วยโรคสมาธิสั้นเข้าถึงบริการ(workload)", tableName: KNOWN_TABLE_MAP["90ccfbfd92f7d1bdd89d0cfd8b4e46ec"] || undefined },
    { id: "c3cbb49f45fb12d02ff0eb813e9e6279", order: 8, name: "ผู้ป่วยโรคออทิสติกเข้าถึงบริการ(workload)", tableName: KNOWN_TABLE_MAP["c3cbb49f45fb12d02ff0eb813e9e6279"] || undefined },
    { id: "67ce3cd10f4ed5d2b3517f1373ef273d", order: 9, name: "จำนวนผู้ป่วยนอกจิตเวชที่มารับบริการจำแนกรายกลุ่มโรคและสิทธิ", tableName: KNOWN_TABLE_MAP["67ce3cd10f4ed5d2b3517f1373ef273d"] || undefined },
    { id: "8a173a9de38de5c0172953d4ebcdcb09", order: 10, name: "จำนวนผู้ป่วยในจิตเวชที่มารับบริการจำแนกรายกลุ่มโรคและสิทธิ", tableName: KNOWN_TABLE_MAP["8a173a9de38de5c0172953d4ebcdcb09"] || undefined },
    { id: "c053cbe922cb2b0b8aa5ab139c5c7494", order: 11, name: "ร้อยละของผู้ป่วยโรคติดสุราในพื้นที่เข้าถึงบริการ ตามมาตรฐานเพิ่มขึ้น", tableName: KNOWN_TABLE_MAP["c053cbe922cb2b0b8aa5ab139c5c7494"] || undefined },
    { id: "009b430cc231e1b1635963a899eca673", order: 12, name: "ร้อยละของผู้ทำร้ายตนเองเข้าถึงบริการ 15 ปีขึ้นไป", tableName: KNOWN_TABLE_MAP["009b430cc231e1b1635963a899eca673"] || undefined },
    { id: "f98aa818686df571817c33e0168966a2", order: 13, name: "อัตราการฆ่าตัวตายสำเร็จ", tableName: KNOWN_TABLE_MAP["f98aa818686df571817c33e0168966a2"] || undefined },
    { id: "e8e6d6e5a088228680d4be573d712de0", order: 14, name: "ร้อยละของผู้ป่วยโรคจิตเภทได้รับการรักษาต่อเนื่องภายใน 6 เดือน", tableName: KNOWN_TABLE_MAP["e8e6d6e5a088228680d4be573d712de0"] || undefined },
    { id: "ceea5aba6208937d4d44f3141271fc0d", order: 15, name: "ร้อยละของผู้ป่วยจิตเภทที่เข้าถึงบริการสะสมได้รับการดูแลต่อเนื่อง", tableName: KNOWN_TABLE_MAP["ceea5aba6208937d4d44f3141271fc0d"] || undefined },
    { id: "70404ef102ed96de4e2914e2facb67a2", order: 16, name: "ร้อยละของผู้ป่วยโรคจิตเภทได้รับการรักษาต่อเนื่องภายใน 6 เดือน(Reverse )", tableName: KNOWN_TABLE_MAP["70404ef102ed96de4e2914e2facb67a2"] || undefined },
    { id: "", order: 17, name: "ผู้ป่วยจิตเวชที่มีความเสี่ยงสูงต่อการก่อความรุนแรง (SMI-V) ไม่ก่อความรุนแรงซ้ำ", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "4c421f7f8b8294dcb47404b028fa05f9", order: 18, name: "ร้อยละผู้ป่วยจิตเวชที่มีความเสี่ยงสูงต่อการก่อความรุนแรง (SMI-V) ก่อความรุนแรง ลดลงเมื่อเปรียบเทียบระหว่างปีก่อนหน้าและปีปัจจุบัน (เฉพาะหน่วยงานกรมสุขภาพจิต)", tableName: KNOWN_TABLE_MAP["4c421f7f8b8294dcb47404b028fa05f9"] || undefined },
    { id: "", order: 19, name: "ผู้ป่วยจิตเวชที่มีความเสี่ยงสูงต่อการก่อความรุนแรง (SMI-V) ได้รับการติดตาม ดูแล เฝ้าระวัง ตามแนวทางที่กำหนด", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "342c01cf6fd12450b7271740642df5a3", order: 20, name: "จำนวนผู้ป่วยจิตเวชที่มีความเสี่ยงต่อการก่อความรุนแรง (SMI-V)ที่มารับบริการในปีงบประมาณ(คนต่อสถานพยาบาล) จำแนกตามการวินิจฉัย", tableName: KNOWN_TABLE_MAP["342c01cf6fd12450b7271740642df5a3"] || undefined },
    { id: "", order: 21, name: "ผู้ป่วยที่มีความผิดปกติทางจิตและพฤติกรรมที่เกิดจากการใช้สารออกกฤทธิ์ต่อจิตประสาท", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 22, name: "ภาพรวมความผิดปกติทางจิตและพฤติกรรม (F00.xx-F99) ตั้งใจทำร้ายตนเอง (X60.xx-X84.xx) และถูกทำร้าย (X85.xx-X99, Y00-Y09)", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 23, name: "อัตราป่วยรายใหม่และความชุกโรคจิตเวชและปัญหาสุขภาพจิต", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 24, name: "มีโรคอื่นร่วมด้วยโรคจิตเวชและปัญหาสุขภาพจิต", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 25, name: "การจัดบริการผู้ป่วยในจิตเวชและสารเสพติด", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 26, name: "บริการทางจิตเวช", tableName: KNOWN_TABLE_MAP["None"] || undefined },
  ],
};

const _C29_Service_Plan_สาขาไต: HdcSubCatalog = {
  id: "e71a73a77b1474e63b71bccf727009ce",
  name: "Service Plan สาขาไต",
  parentCatalogId: _parentId("Service Plan"),
  parentName: "Service Plan",
  url: "https://hdc.moph.go.th/ubn/public/standard-subcatalog/e71a73a77b1474e63b71bccf727009ce",
  reports: [
    { id: "", order: 1, name: "คัดกรอง/ค้นหาเสี่ยงป่วยรายใหม่ (Coverage)", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 2, name: "การชะลอความเสื่อมของไต (Work Load)", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "47a33f6886e36962dec4bb578819ba64", order: 3, name: "จำนวนผู้ป่วยโรคไตเรื้อรังที่มารับบริการที่โรงพยาบาล จำแนกตาม Stage (Work Load)", tableName: KNOWN_TABLE_MAP["47a33f6886e36962dec4bb578819ba64"] || undefined },
    { id: "e69c7fae93eda2222aa210d5db512290", order: 4, name: "Stage Change ผู้ป่วยโรคไตเรื้อรัง จำแนกตามโรงพยาบาลที่รักษา (Work Load)", tableName: KNOWN_TABLE_MAP["e69c7fae93eda2222aa210d5db512290"] || undefined },
    { id: "5d523ced4c9569123109fa6f4071d35f", order: 5, name: "จำนวนผู้ป่วยโรคไตเรื้อรังในเขตรับผิดชอบ จำแนกตาม Stage (Coverage)", tableName: KNOWN_TABLE_MAP["5d523ced4c9569123109fa6f4071d35f"] || undefined },
    { id: "WaTHdmG7w7OXmbC2MzH2h", order: 6, name: "ร้อยละผู้ป่วยไตเรื้อรัง stage 5 รายใหม่ ที่ลดลงจากปีงบประมาณก่อนหน้า", tableName: KNOWN_TABLE_MAP["WaTHdmG7w7OXmbC2MzH2h"] || undefined },
  ],
};

const _C30_Service_Plan_ยาเสพติด: HdcSubCatalog = {
  id: "06b9ffbd9fa83f29fef3a7e7ba8119d6",
  name: "Service Plan ยาเสพติด",
  parentCatalogId: _parentId("Service Plan"),
  parentName: "Service Plan",
  url: "https://hdc.moph.go.th/ubn/public/standard-subcatalog/06b9ffbd9fa83f29fef3a7e7ba8119d6",
  reports: [
    { id: "d2ad3dd7b3696ffd557fb93d7ac2822b", order: 1, name: "การให้ความรู้เกี่ยวกับโทษพิษภัย ยาเสพติด การป้องกันการติดเชื้อ เอชไอวี โรคติดต่อทางเพศสัมพันธ์ วัณโรคและไวรัสตับอักเสบบีและซี", tableName: KNOWN_TABLE_MAP["d2ad3dd7b3696ffd557fb93d7ac2822b"] || undefined },
    { id: "f34aee531520139d61763862b5f57744", order: 2, name: "การบำบัดรักษายาเสพติดโดยใช้สารทดแทนระยะยาว MMT/การจัดให้มีบริการป้องกันและดูแลรักษาอาการจากการใช้ยาเสพติดเกินขนาดในพื้นที่ เช่น การให้บริการ Naloxone", tableName: KNOWN_TABLE_MAP["f34aee531520139d61763862b5f57744"] || undefined },
    { id: "ad41cbaddb1556e87f6e2d1d5ddb5f10", order: 3, name: "การให้คำปรึกษา และ/หรือ ตรวจการติดเชื้อเอชไอวีโดยสมัครใจ และ/หรือ ส่งต่อเข้ารับบริการดูแลรักษาด้วยยาต้านไวรัส", tableName: KNOWN_TABLE_MAP["ad41cbaddb1556e87f6e2d1d5ddb5f10"] || undefined },
    { id: "518133f4702c4e98d93f5b0f985d36dd", order: 4, name: "การให้คำปรึกษา ตรวจหา และส่งต่อเข้ารับบริการดูแลรักษาการติดเชื้อไวรัสตับอักเสบบีและซี", tableName: KNOWN_TABLE_MAP["518133f4702c4e98d93f5b0f985d36dd"] || undefined },
    { id: "0e76b27fb709311b89a0d4830986d0f4", order: 5, name: "การสนับสนุนให้ใช้ถุงยางอนามัย อย่างถูกวิธี", tableName: KNOWN_TABLE_MAP["0e76b27fb709311b89a0d4830986d0f4"] || undefined },
    { id: "9de484913d38566668e6980a8787da3d", order: 6, name: "การคัดกรอง ตรวจวินิจฉัย และ/หรือ รักษาโรคติดต่อทางเพศสัมพันธ์", tableName: KNOWN_TABLE_MAP["9de484913d38566668e6980a8787da3d"] || undefined },
    { id: "996e393560567088a0d3c2c360a11d1e", order: 7, name: "การคัดกรอง ตรวจวินิจฉัย และรักษาวัณโรค", tableName: KNOWN_TABLE_MAP["996e393560567088a0d3c2c360a11d1e"] || undefined },
    { id: "53d658f4782c9d559e92b7e8af0b1ff8", order: 8, name: "การคัดกรอง ตรวจวินิจฉัย และ/หรือ รักษาโรคทางจิตเวช", tableName: KNOWN_TABLE_MAP["53d658f4782c9d559e92b7e8af0b1ff8"] || undefined },
    { id: "", order: 9, name: "รายงานเกี่ยวกับการบริโภคยาสูบ", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 10, name: "รายงานเกี่ยวกับการบริโภคแอลกอฮอล์", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "bb76fda7ca38c8a542bfd9ab99d2ccd7", order: 11, name: "การเข้าถึงบริการและการได้รับความรู้ ความเข้าใจอันตรายที่เกิดจากยาเสพติด เพื่อลดอันตรายในกลุ่มผู้ใช้ยาเสพติด จำแนกกลุ่มหลักรอง", tableName: KNOWN_TABLE_MAP["bb76fda7ca38c8a542bfd9ab99d2ccd7"] || undefined },
    { id: "7f723739a6efd1f4532ec620ca386a72", order: 12, name: "การได้รับบริการด้านการลดอันตรายจากยาเสพติด จำแนกตามกลุ่มหลักรอง", tableName: KNOWN_TABLE_MAP["7f723739a6efd1f4532ec620ca386a72"] || undefined },
  ],
};

const _C31_Service_Plan_RDU: HdcSubCatalog = {
  id: "03b912ab9ccb4c07280a89bf05e5900e",
  name: "Service Plan RDU",
  parentCatalogId: _parentId("Service Plan"),
  parentName: "Service Plan",
  url: "https://hdc.moph.go.th/ubn/public/standard-subcatalog/03b912ab9ccb4c07280a89bf05e5900e",
  reports: [
    { id: "d8fa7339c10c7eccd02529be81ebb8a5", order: 1, name: "ร้อยละการใช้ยาปฏิชีวนะในโรคติดเชื้อที่ระบบการหายใจช่วงบนและหลอดลมอักเสบเฉียบพลันในผู้ป่วยนอก ระดับโรงพยาบาล (RI)", tableName: KNOWN_TABLE_MAP["d8fa7339c10c7eccd02529be81ebb8a5"] || undefined },
    { id: "b307f1d136925d2c20940e5cc9c49ec7", order: 2, name: "ร้อยละการใช้ยาปฏิชีวนะในโรคอุจจาระร่วงเฉียบพลันในผู้ป่วยนอก ระดับโรงพยาบาล (AD)", tableName: KNOWN_TABLE_MAP["b307f1d136925d2c20940e5cc9c49ec7"] || undefined },
    { id: "1fa1fd876237284f018ec8356cad29b1", order: 3, name: "ร้อยละการใช้ยาปฏิชีวนะในบาดแผลสดจากอุบัติเหตุ ระดับโรงพยาบาล (FTW)", tableName: KNOWN_TABLE_MAP["1fa1fd876237284f018ec8356cad29b1"] || undefined },
    { id: "bafab2dfb51f4042a3af4297a7a9fc8d", order: 4, name: "ร้อยละการใช้ยาปฏิชีวนะในหญิงคลอดปกติครบกำหนดทางช่องคลอด ระดับโรงพยาบาล (APL)", tableName: KNOWN_TABLE_MAP["bafab2dfb51f4042a3af4297a7a9fc8d"] || undefined },
    { id: "b4f7ec19819d99dc5bd04ae1815befdf", order: 5, name: "ร้อยละของผู้ป่วยความดันสูง (Essential hypertension) ที่ใช้ RAS blockade (ACEI/ ARB/ Renin inhibitor) 2 ชนิดร่วมกันในการรักษาภาวะความดันเลือดสูง", tableName: KNOWN_TABLE_MAP["b4f7ec19819d99dc5bd04ae1815befdf"] || undefined },
    { id: "b122a679459b573dcc7cd08875ba1702", order: 6, name: "ร้อยละของผู้ป่วยนอกโรคเบาหวานที่ใช้ยา metformin เป็นยาชนิดเดียวหรือร่วมกับยาอื่นเพื่อควบคุมระดับน้ำตาล โดยไม่มีข้อห้ามใช้", tableName: KNOWN_TABLE_MAP["b122a679459b573dcc7cd08875ba1702"] || undefined },
    { id: "3214dc5ebe2f388fbbcda2d773808425", order: 7, name: "ร้อยละของผู้ป่วยที่มีการใช้ยากลุ่ม NSAIDs ซ้ำซ้อน", tableName: KNOWN_TABLE_MAP["3214dc5ebe2f388fbbcda2d773808425"] || undefined },
    { id: "b06c7547eb3aa2cb735999bfee7e0eee", order: 8, name: "ร้อยละของผู้ป่วยนอกโรคไตเรื้อรังระดับ 3 ขึ้นไปที่ได้รับยา NSAIDs", tableName: KNOWN_TABLE_MAP["b06c7547eb3aa2cb735999bfee7e0eee"] || undefined },
    { id: "", order: 9, name: "ร้อยละของผู้ป่วยนอกโรคหืดที่ได้รับยา inhaled corticosteroid", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "e135d389fb049056ceb26d85668358ab", order: 10, name: "ร้อยละผู้ป่วยนอกสูงอายุที่ใช้ยากลุ่ม long-acting benzodiazepine ได้แก่ chlordiazepoxide, diazepam, dipotassium chlorazepate", tableName: KNOWN_TABLE_MAP["e135d389fb049056ceb26d85668358ab"] || undefined },
    { id: "c38867aa715186862bbd55b35de4082b", order: 11, name: "จำนวนสตรีตั้งครรภ์ที่ได้รับยาที่ห้ามใช้ ได้แก่ยา Warfarin หรือ Statins หรือ Ergots เมื่อรู้ว่าตั้งครรภ์แล้ว", tableName: KNOWN_TABLE_MAP["c38867aa715186862bbd55b35de4082b"] || undefined },
    { id: "79b7ac5f1354e27ae9f5a71af99189b9", order: 12, name: "ร้อยละครั้งบริการ (visit) ผู้ป่วยเด็ก ที่ได้รับการวินิจฉัยเป็นโรคติดเชื้อของทางเดินหายใจ และได้รับยาต้านฮิสตามีนชนิด non-sedating", tableName: KNOWN_TABLE_MAP["79b7ac5f1354e27ae9f5a71af99189b9"] || undefined },
    { id: "0c4225465bf3b70c7359af42b8775ef6", order: 13, name: "ร้อยละของโรงพยาบาล ส่งเสริมการใช้ยาอย่างสมเหตุผล", tableName: KNOWN_TABLE_MAP["0c4225465bf3b70c7359af42b8775ef6"] || undefined },
    { id: "d1ccec314e92875acb5142769eb479a2", order: 14, name: "ร้อยละการใช้ยาปฏิชีวนะในโรคติดเชื้อที่ระบบการหายใจช่วงบนและหลอดลมอักเสบเฉียบพลันในผู้ป่วยนอก ระดับ รพ.สต.(RI - PCU)", tableName: KNOWN_TABLE_MAP["d1ccec314e92875acb5142769eb479a2"] || undefined },
    { id: "2103caa0f068d4575720600d78d5ad65", order: 15, name: "ร้อยละการใช้ยาปฏิชีวนะในโรคอุจจาระร่วงเฉียบพลันในผู้ป่วยนอก ระดับ รพ.สต. (AD - PCU)", tableName: KNOWN_TABLE_MAP["2103caa0f068d4575720600d78d5ad65"] || undefined },
    { id: "3328a9e3fe40877c45860265035e2412", order: 16, name: "ร้อยละของรพ.สต.ที่มีอัตราการใช้ยาปฏิชีวนะในโรค Respiratory Infection และ Acute Diarrhea <= ร้อยละ20 ทั้ง 2 โรค (RUA PCU)", tableName: KNOWN_TABLE_MAP["3328a9e3fe40877c45860265035e2412"] || undefined },
    { id: "ecb7af2dc881088d964f827317a563f4", order: 17, name: "ค่า Defined Daily Dose (DDD) ของยาปฏิชีวนะชนิดรับประทานต่อ 1000 OP Visit แยกตามชื่อสามัญทางยา (Generic name)", tableName: KNOWN_TABLE_MAP["ecb7af2dc881088d964f827317a563f4"] || undefined },
    { id: "63c6046a389a3cd9c69a432cf0ae783b", order: 18, name: "ค่า Defined Daily Dose (DDD) ของยาปฏิชีวนะชนิดรับประทานต่อ 1000 OP Visit แยกตามกลุ่มยา (Class)", tableName: KNOWN_TABLE_MAP["63c6046a389a3cd9c69a432cf0ae783b"] || undefined },
    { id: "d8703771dee4e2f956ca7ba53abaae61", order: 19, name: "ค่า Defined Daily Dose (DDD) รวมของยาปฏิชีวนะชนิดรับประทานทุกรายการต่อ 1000 OP Visit", tableName: KNOWN_TABLE_MAP["d8703771dee4e2f956ca7ba53abaae61"] || undefined },
    { id: "343b3670ccb93a18bcc1951a41d239f5", order: 20, name: "ค่า Defined Daily Dose (DDD) ของยาปฏิชีวนะชนิดฉีดที่ใช้ในผู้ป่วยที่รับไว้รักษาในโรงพยาบาล (Admit) ต่อ 100 วันนอน แยกตามชื่อสามัญทางยา (Generic name)", tableName: KNOWN_TABLE_MAP["343b3670ccb93a18bcc1951a41d239f5"] || undefined },
    { id: "d58534279f78467bea5e48ae9cbd28ef", order: 21, name: "ค่า Defined Daily Dose (DDD) ของยาปฏิชีวนะชนิดฉีดที่ใช้ในผู้ป่วยที่รับไว้รักษาในโรงพยาบาล (Admit) ต่อ 100 วันนอน แยกตามกลุ่มยา (Class)", tableName: KNOWN_TABLE_MAP["d58534279f78467bea5e48ae9cbd28ef"] || undefined },
    { id: "36908f9f21f62f1acef7b2ea9fdefa5f", order: 22, name: "ค่า Defined Daily Dose (DDD) รวมของยาปฏิชีวนะชนิดฉีดทุกรายการที่ใช้ในผู้ป่วยที่รับไว้รักษาในโรงพยาบาล (Admit) ต่อ 100 วันนอน", tableName: KNOWN_TABLE_MAP["36908f9f21f62f1acef7b2ea9fdefa5f"] || undefined },
  ],
};

const _C32_Service_Plan_COPD: HdcSubCatalog = {
  id: "67473ea582306d345ce1bb44b06ba2e9",
  name: "Service Plan COPD",
  parentCatalogId: _parentId("Service Plan"),
  parentName: "Service Plan",
  url: "https://hdc.moph.go.th/ubn/public/standard-subcatalog/67473ea582306d345ce1bb44b06ba2e9",
  reports: [
    { id: "62cdb786f231afbaaaaaac1d5ff844b0", order: 1, name: "อัตราป่วยรายใหม่ของโรคปอดอุดกั้นเรื้อรัง", tableName: KNOWN_TABLE_MAP["62cdb786f231afbaaaaaac1d5ff844b0"] || undefined },
    { id: "33b1c30a4652927ac32fee24e8906170", order: 2, name: "อัตราการป่วยด้วยโรคปอดอุดกั้นเรื้อรัง", tableName: KNOWN_TABLE_MAP["33b1c30a4652927ac32fee24e8906170"] || undefined },
    { id: "3bcec2a91eb03924f0b2714a85ee5b95", order: 3, name: "อัตราการป่วยตายด้วยโรคปอดอุดกั้นเรื้อรัง", tableName: KNOWN_TABLE_MAP["3bcec2a91eb03924f0b2714a85ee5b95"] || undefined },
    { id: "8dc31d2079e509de188a3b0117459379", order: 4, name: "อัตราการเกิดการกำเริบเฉียบพลันในผู้ป่วยโรคปอดอุดกั้นเรื้อรังต่อประชากรอายุ 15 ปีขึ้นไป", tableName: KNOWN_TABLE_MAP["8dc31d2079e509de188a3b0117459379"] || undefined },
    { id: "2ad3fe5a63502901dfb2a8fc231c27dc", order: 5, name: "อัตราการเกิดการกำเริบเฉียบพลันในผู้ป่วยโรคปอดอุดกั้นเรื้อรัง(ผู้ป่วยอายุ 40 ปีขึ้นไป)", tableName: KNOWN_TABLE_MAP["2ad3fe5a63502901dfb2a8fc231c27dc"] || undefined },
    { id: "a7dfd5a2bb045c08129446ca192091bd", order: 6, name: "อัตราป่วยรายใหม่ของโรคหืด", tableName: KNOWN_TABLE_MAP["a7dfd5a2bb045c08129446ca192091bd"] || undefined },
    { id: "7e7d15e75bfd9abce62d54c938ecfadd", order: 7, name: "อัตราการกำเริบเฉียบพลันในผู้ป่วยโรคหืด ที่ต้องได้รับการรักษาในโรงพยาบาล", tableName: KNOWN_TABLE_MAP["7e7d15e75bfd9abce62d54c938ecfadd"] || undefined },
    { id: "7e8a02faa481c5dd4e0406f1965c910a", order: 8, name: "อัตราการกำเริบเฉียบพลันในผู้ป่วยโรคหืด ที่ได้รับการรักษาในภาวะฉุกเฉิน", tableName: KNOWN_TABLE_MAP["7e8a02faa481c5dd4e0406f1965c910a"] || undefined },
    { id: "679gf1rmhjczfo82khkk9", order: 9, name: "อัตราการกำเริบเฉียบพลันที่ได้รับการรักษาในห้องฉุกเฉินหรือ ผู้ป่วยนอก หรือต้องนอนรักษาในโรงพยาบาลในผู้ป่วยโรคหืด อายุน้อยกว่า 15 ปี (ครั้งต่อ 100 ผู้ป่วยโรคหืด)", tableName: KNOWN_TABLE_MAP["679gf1rmhjczfo82khkk9"] || undefined },
    { id: "qkx435pwp0c2l44qtaubk", order: 10, name: "อัตราการกำเริบเฉียบพลันที่ได้รับการรักษาในห้องฉุกเฉินหรือ ผู้ป่วยนอก หรือต้องนอนรักษาในโรงพยาบาลในผู้ป่วยโรคหืด อายุ 15 ปีขึ้นไป (ครั้งต่อ 100 ผู้ป่วยโรคหืด)", tableName: KNOWN_TABLE_MAP["qkx435pwp0c2l44qtaubk"] || undefined },
  ],
};

const _C33_Service_Plan_Intermediate_Palliative: HdcSubCatalog = {
  id: "b08560518ca0ebcaf2016dab69fb38b5",
  name: "Service Plan Intermediate & Palliative",
  parentCatalogId: _parentId("Service Plan"),
  parentName: "Service Plan",
  url: "https://hdc.moph.go.th/ubn/public/standard-subcatalog/b08560518ca0ebcaf2016dab69fb38b5",
  reports: [
    { id: "28e3ca2ae78a73a2b3d37a7d16f02d7d", order: 1, name: "ร้อยละการบรรเทาอาการปวดและจัดการอาการต่างๆด้วย Strong Opioid ในผู้ป่วยประคับประคองอย่างมีคุณภาพ", tableName: KNOWN_TABLE_MAP["28e3ca2ae78a73a2b3d37a7d16f02d7d"] || undefined },
    { id: "9cf44cb8bfb8c2a9f78846705758cf47", order: 2, name: "ร้อยละการบรรเทาอาการปวดและจัดการอาการต่างๆด้วย Strong Opioid ในผู้ป่วยประคับประคอง และได้รับการเยี่ยมบ้าน", tableName: KNOWN_TABLE_MAP["9cf44cb8bfb8c2a9f78846705758cf47"] || undefined },
    { id: "203af802132eb248d8bf1dac725113bf", order: 3, name: "ร้อยละการบรรเทาอาการปวดและจัดการอาการต่างๆด้วย Strong Opioid ในผู้ป่วยประคับประคองอย่างมีคุณภาพในโรงพยาบาล(Work Load)", tableName: KNOWN_TABLE_MAP["203af802132eb248d8bf1dac725113bf"] || undefined },
    { id: "a67ee74a4c0ff3c775b591be4ec80086", order: 4, name: "ร้อยละการดูแลผู้ป่วยระยะท้ายแบบประคับประคอง มีกิจกรรม Family Meeting และมีการทำ Advance Care Planning (ACP) ร่วมกับผู้ป่วยและครอบครัว", tableName: KNOWN_TABLE_MAP["a67ee74a4c0ff3c775b591be4ec80086"] || undefined },
    { id: "8eb4ec8a40c080aadfdbb895be74e771", order: 5, name: "ร้อยละของผู้ป่วยประคับประคองที่ได้รับการดูแลต่อเนื่องที่บ้าน", tableName: KNOWN_TABLE_MAP["8eb4ec8a40c080aadfdbb895be74e771"] || undefined },
  ],
};

const _C34_Service_Plan_NCD_DM_HT_CVD: HdcSubCatalog = {
  id: "b2b59e64c4e6c92d4b1ec16a599d882b",
  name: "Service Plan NCD DM,HT,CVD",
  parentCatalogId: _parentId("Service Plan"),
  parentName: "Service Plan",
  url: "https://hdc.moph.go.th/ubn/public/standard-subcatalog/b2b59e64c4e6c92d4b1ec16a599d882b",
  reports: [
    { id: "", order: 1, name: "โรคเบาหวาน(DM)", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 2, name: "โรคความดันโลหิตสูง(HT)", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 3, name: "โรคระบบหัวใจหลอดเลือด(CVD)", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "418ae93a872547ebe2fbf0ff4f73e65e", order: 4, name: "อัตราผู้ป่วยความดันโลหิตสูงและเบาหวานรายใหม่", tableName: KNOWN_TABLE_MAP["418ae93a872547ebe2fbf0ff4f73e65e"] || undefined },
    { id: "df9a12ff1c86ab1b29b3e47118bcd535", order: 5, name: "ร้อยละของผู้ป่วยโรคเบาหวานและโรคความดันโลหิตสูงที่ควบคุมได้", tableName: KNOWN_TABLE_MAP["df9a12ff1c86ab1b29b3e47118bcd535"] || undefined },
    { id: "926d358e3527fba253d306f18bac1b16", order: 6, name: "ร้อยละของผู้ป่วยเบาหวาน และ/หรือ ความดันโลหิตสูงที่ปัจจุบันยังสูบบุหรี่ลดลงจากปีงบประมาณที่ผ่านมา", tableName: KNOWN_TABLE_MAP["926d358e3527fba253d306f18bac1b16"] || undefined },
    { id: "752f4de6e90d3e41b3cb8f8104b2e8bd", order: 7, name: "ร้อยละของผู้ป่วยเบาหวาน และ/หรือ ความดันโลหิตสูง ที่เป็น CKD 3-4 ชะลอการลดลงของ eGFR ได้ตามเป้าหมาย", tableName: KNOWN_TABLE_MAP["752f4de6e90d3e41b3cb8f8104b2e8bd"] || undefined },
    { id: "d5d8c4ae88e070d81b15dd4ed51294f3", order: 8, name: "ร้อยละของผู้ป่วยเบาหวาน และ/หรือ ความดันโลหิตสูงที่เป็น CKD 1-4 และได้รับยา ACEi/ARB", tableName: KNOWN_TABLE_MAP["d5d8c4ae88e070d81b15dd4ed51294f3"] || undefined },
    { id: "", order: 9, name: "HOSP BP กลุ่มผู้ป่วยนอกที่มีค่าความดันโลหิตสูง SBP ≥ 180 mmHg และ/หรือ DBP ≥ 110 mmHg", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 10, name: "NCDs Remission", tableName: KNOWN_TABLE_MAP["None"] || undefined },
  ],
};

const _C35_Service_Plan_4_สาขาหลัก: HdcSubCatalog = {
  id: "4b7d1f9bc16e8fdae6d1cf6d92922cbe",
  name: "Service Plan 4 สาขาหลัก",
  parentCatalogId: _parentId("Service Plan"),
  parentName: "Service Plan",
  url: "https://hdc.moph.go.th/ubn/public/standard-subcatalog/4b7d1f9bc16e8fdae6d1cf6d92922cbe",
  reports: [
    { id: "891c209d7617c9ce7871dc69f72f2ea5", order: 1, name: "การส่งต่อผู้ป่วยออกนอกเขตสุขภาพลดลง 4 สาขา", tableName: KNOWN_TABLE_MAP["891c209d7617c9ce7871dc69f72f2ea5"] || undefined },
    { id: "f2e8b615b21f791361bc95a888ca486e", order: 2, name: "การส่งต่อผู้ป่วยออกนอกเขตสุขภาพลดลง 4 สาขา จำแนกรายสาขา", tableName: KNOWN_TABLE_MAP["f2e8b615b21f791361bc95a888ca486e"] || undefined },
  ],
};

const _C36_Service_Plan_ออร์โธปิดิกส์: HdcSubCatalog = {
  id: "6ab575a8e5fc6df2a182936531fe99e6",
  name: "Service Plan ออร์โธปิดิกส์",
  parentCatalogId: _parentId("Service Plan"),
  parentName: "Service Plan",
  url: "https://hdc.moph.go.th/ubn/public/standard-subcatalog/6ab575a8e5fc6df2a182936531fe99e6",
  reports: [
    { id: "6677dd630bb98586dda5c30240540bbe", order: 1, name: "ร้อยละของการดูแลรักษาผู้ป่วยที่มีกระดูกหักไม่ซับซ้อนในโรงพยาบาลระดับ M2 ลงไป", tableName: KNOWN_TABLE_MAP["6677dd630bb98586dda5c30240540bbe"] || undefined },
    { id: "da16d469ee44ab4ffb28d581353e4ffd", order: 2, name: "การส่งต่อผู้ป่วย สาขาออโธปิดิกส์ จากรพช.แม่ข่าย (M2)Refer out ไป รพศ. /รพท. ลดลง", tableName: KNOWN_TABLE_MAP["da16d469ee44ab4ffb28d581353e4ffd"] || undefined },
  ],
};

const _C37_Service_Plan_แม่และเด็ก: HdcSubCatalog = {
  id: "3dc2d92087cdc5b585eb8c0904691399",
  name: "Service Plan แม่และเด็ก",
  parentCatalogId: _parentId("Service Plan"),
  parentName: "Service Plan",
  url: "https://hdc.moph.go.th/ubn/public/standard-subcatalog/3dc2d92087cdc5b585eb8c0904691399",
  reports: [
    { id: "", order: 1, name: "มารดา(สูติกรรม)", tableName: KNOWN_TABLE_MAP["None"] || undefined },
    { id: "", order: 2, name: "บุตร(กุมารเวชกรรม)", tableName: KNOWN_TABLE_MAP["None"] || undefined },
  ],
};

const _C38_Service_Plan_กัญชา: HdcSubCatalog = {
  id: "2908c586a168578a2c4aee3ab13963c9",
  name: "Service Plan กัญชา",
  parentCatalogId: _parentId("Service Plan"),
  parentName: "Service Plan",
  url: "https://hdc.moph.go.th/ubn/public/standard-subcatalog/2908c586a168578a2c4aee3ab13963c9",
  reports: [
    { id: "1c34690d32569e7aff5b6512bac53b00", order: 1, name: "ร้อยละของจำนวนผู้ป่วยที่มีการวินิจฉัยระยะประคับประคอง (Palliative care) ที่ได้รับการรักษาด้วยยากัญชาทางการแพทย์", tableName: KNOWN_TABLE_MAP["1c34690d32569e7aff5b6512bac53b00"] || undefined },
    { id: "c9e990ad99d1d30b6bb2ea3b1428fc4e", order: 2, name: "ร้อยละของจำนวนผู้ป่วยที่มีการวินิจฉัยระยะประคับประคอง (Palliative care) ที่ได้รับการรักษาด้วยยากัญชาทางการแพทย์ Workload", tableName: KNOWN_TABLE_MAP["c9e990ad99d1d30b6bb2ea3b1428fc4e"] || undefined },
    { id: "049fad3d7504ff9dabe4598f0b19683a", order: 3, name: "ร้อยละของจำนวนผู้ป่วยมะเร็งที่ได้รับการรักษาด้วยยากัญชาทางการแพทย์", tableName: KNOWN_TABLE_MAP["049fad3d7504ff9dabe4598f0b19683a"] || undefined },
    { id: "af55086b69a60b4f8814baf6f9501760", order: 4, name: "ผู้ป่วยทั้งหมดที่ได้รับการรักษาด้วยยากัญชาทางการแพทย์แผนปัจจุบัน", tableName: KNOWN_TABLE_MAP["af55086b69a60b4f8814baf6f9501760"] || undefined },
    { id: "61c1e6a35fe0520dd214947166b96aa3", order: 5, name: "ร้อยละของจำนวนผู้ป่วยที่ได้รับยากัญชาทางการแพทย์แผนไทย", tableName: KNOWN_TABLE_MAP["61c1e6a35fe0520dd214947166b96aa3"] || undefined },
    { id: "9c2482db02457a65737bfd2aff933f2e", order: 6, name: "ปริมาณการใช้กัญชาทางการแพทย์(แผนปัจจุบัน)", tableName: KNOWN_TABLE_MAP["9c2482db02457a65737bfd2aff933f2e"] || undefined },
    { id: "f80995ad823ea7a959acf5f72a1678ee", order: 7, name: "ปริมาณการใช้กัญชาทางการแพทย์(แผนไทย)", tableName: KNOWN_TABLE_MAP["f80995ad823ea7a959acf5f72a1678ee"] || undefined },
    { id: "fcd684032c7218d76edb3317604d14ac", order: 8, name: "ผู้ป่วยทั้งหมดที่ได้รับการรักษาด้วยยากัญชาทางการแพทย์", tableName: KNOWN_TABLE_MAP["fcd684032c7218d76edb3317604d14ac"] || undefined },
  ],
};

const _C39_Service_Plan_อายุรกรรม: HdcSubCatalog = {
  id: "144fdf97a756b3f82dce197287e06316",
  name: "Service Plan อายุรกรรม",
  parentCatalogId: _parentId("Service Plan"),
  parentName: "Service Plan",
  url: "https://hdc.moph.go.th/ubn/public/standard-subcatalog/144fdf97a756b3f82dce197287e06316",
  reports: [
    { id: "00366a85bd3c2b6932a228df29137252", order: 1, name: "อัตราตายผู้ป่วยติดเชื้อในกระแสเลือดแบบรุนแรงชนิด community-acquired", tableName: KNOWN_TABLE_MAP["00366a85bd3c2b6932a228df29137252"] || undefined },
    { id: "e131624eb3e5ed3f522262e055df1b2c", order: 2, name: "อัตราตายผู้ป่วยติดเชื้อในกระแสเลือดแบบรุนแรงชนิด hospital-acquired", tableName: KNOWN_TABLE_MAP["e131624eb3e5ed3f522262e055df1b2c"] || undefined },
    { id: "c335e748195ac0f508168cde7ae50edd", order: 3, name: "อัตราตายผู้ป่วยติดเชื้อในกระแสเลือดแบบรุนแรงชนิด community-acquired (รวม A40.0-A41.9)", tableName: KNOWN_TABLE_MAP["c335e748195ac0f508168cde7ae50edd"] || undefined },
    { id: "ef46e61fb2a5c37e7b13d703b2109383", order: 4, name: "อัตราตายผู้ป่วยติดเชื้อในกระแสเลือดแบบรุนแรงชนิด hospital-acquired(รวม A40.0-A41.9)", tableName: KNOWN_TABLE_MAP["ef46e61fb2a5c37e7b13d703b2109383"] || undefined },
    { id: "8s4ilkkui4pc5hzp1pql4", order: 5, name: "ร้อยละของผู้ป่วยไวรัสตับอักเสบบีได้รับการรักษา", tableName: KNOWN_TABLE_MAP["8s4ilkkui4pc5hzp1pql4"] || undefined },
  ],
};

export const ALL_SUB_CATALOGS: HdcSubCatalog[] = [
  _C00_จำนวนหน่วยงานสาธารณสุข,
  _C01_การป่วยด้วยโรคไม่ติดต่อที่สำคัญ,
  _C02_ประชากร,
  _C03_โรงเรียนและนักเรียน,
  _C04_สาเหตุการป่วย_ตาย,
  _C05_การใช้บริการสาธารณสุข,
  _C06_การป่วยด้วยโรคจากมลพิษทางอากาศ,
  _C07_การเข้าถึงระบบบริการสุขภาพจิต,
  _C08_โรคจากการประกอบอาชีพและสิ่งแวดล้อม,
  _C09_แพทย์แผนไทย,
  _C10_สุขภาพประชากรข้ามชาติ,
  _C11_โรคจากการประกอบอาชีพและสิ่งแวดล้อมแรงงานต่างด้าว,
  _C12_CMI,
  _C13_แพทย์แผนจีน,
  _C14_ทันตกรรม_บริการ,
  _C15_การสร้างเสริมภูมิคุ้มกันโรค,
  _C16_การเฝ้าระวัง,
  _C17_อนามัยแม่และเด็ก,
  _C18_การคัดกรอง,
  _C19_อนามัยโรงเรียน,
  _C20_ส่งเสริมและป้องกันปัญหาสุขภาพจิต,
  _C21_การเฝ้าระวังด้านส่งเสริมสุขภาพและอนามัยสิ่งแวดล้อม,
  _C22_Service_Plan_สาขามะเร็ง,
  _C23_งานโภชนาการ,
  _C24_Service_Plan_สาขาโรคหัวใจและหลอดเลือด,
  _C25_Service_Plan_สาขาตา,
  _C26_Service_Plan_สาขาทารกแรกเกิด,
  _C27_Service_Plan_สาขาสุขภาพช่องปาก,
  _C28_Service_Plan_สาขาสุขภาพจิตและจิตเวช,
  _C29_Service_Plan_สาขาไต,
  _C30_Service_Plan_ยาเสพติด,
  _C31_Service_Plan_RDU,
  _C32_Service_Plan_COPD,
  _C33_Service_Plan_Intermediate_Palliative,
  _C34_Service_Plan_NCD_DM_HT_CVD,
  _C35_Service_Plan_4_สาขาหลัก,
  _C36_Service_Plan_ออร์โธปิดิกส์,
  _C37_Service_Plan_แม่และเด็ก,
  _C38_Service_Plan_กัญชา,
  _C39_Service_Plan_อายุรกรรม,
];


export function getReportById(id: string): HdcReportMeta | undefined {
  for (const sub of ALL_SUB_CATALOGS) {
    const found = sub.reports.find((r) => r.id === id);
    if (found) return found;
  }
}
export function getReportByTable(tableName: string): HdcReportMeta | undefined {
  for (const sub of ALL_SUB_CATALOGS) {
    const found = sub.reports.find((r) => r.tableName === tableName);
    if (found) return found;
  }
}
export function getAllTableNames(): string[] {
  const names = new Set<string>();
  for (const sub of ALL_SUB_CATALOGS) for (const r of sub.reports) if (r.tableName) names.add(r.tableName);
  return Array.from(names);
}
export function searchReports(query: string): HdcReportMeta[] {
  const q = query.toLowerCase();
  const results: HdcReportMeta[] = [];
  for (const sub of ALL_SUB_CATALOGS) {
    for (const r of sub.reports) {
      if (r.name.toLowerCase().includes(q)) results.push({ ...r, subCatalogName: sub.name, parentName: sub.parentName });
    }
  }
  return results;
}
export function getCatalogStats(): { subcatalogs: number; reports: number } {
  let totalReports = 0;
  for (const sub of ALL_SUB_CATALOGS) totalReports += sub.reports.length;
  return { subcatalogs: ALL_SUB_CATALOGS.length, reports: totalReports };
}
