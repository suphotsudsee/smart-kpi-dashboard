import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const adapter = new PrismaLibSql({ url: 'file:./prisma/dev.db' })
const prisma = new PrismaClient({ adapter })

async function main() {
  // Clear existing data
  await prisma.hospKpiScore.deleteMany();
  await prisma.hospital.deleteMany();
  await prisma.kpiScore.deleteMany();
  await prisma.kpi.deleteMany();
  await prisma.cluster.deleteMany();
  await prisma.dimension.deleteMany();
  await prisma.strategy.deleteMany();
  await prisma.user.deleteMany();

  // Create admin user
  await prisma.user.create({
    data: {
      username: 'admin',
      password: 'admin123',
      fullName: 'ผู้ดูแลระบบ',
      role: 'admin',
    },
  });

  // Create strategies
  const strategies = [
    { code: '1', name: 'ระบบบริการดี', description: 'เพิ่มประสิทธิภาพระบบบริการเชิงพื้นที่ลดความเหลื่อมล้ำ', order: 1 },
    { code: '2', name: 'ระบบส่งเสริมสุขภาพดี', description: 'ส่งเสริมสุขภาพและป้องกันโรคเชิงรุก', order: 2 },
    { code: '3', name: 'ระบบบริหารจัดการดี', description: 'เพิ่มประสิทธิภาพการบริหารจัดการระบบสุขภาพ', order: 3 },
    { code: '4', name: 'ระบบกำลังคนดี', description: 'พัฒนากำลังคนด้านสุขภาพให้มีคุณภาพ', order: 4 },
    { code: '5', name: 'ระบบข้อมูลดี', description: 'พัฒนาระบบข้อมูลสุขภาพและการใช้เทคโนโลยีดิจิทัล', order: 5 },
    { code: '6', name: 'ระบบการเงินดี', description: 'เพิ่มประสิทธิภาพการบริหารการเงินการคลังสุขภาพ', order: 6 },
  ];

  for (const s of strategies) {
    await prisma.strategy.create({ data: s });
  }

  // Create clusters for strategy 1
  const strategy1 = await prisma.strategy.findUnique({ where: { code: '1' } });
  const clusters = [
    { code: '1.1', name: 'โครงการ 30 บาทรักษาทุกที่ ฟอกไตฟรีได้ทุกแห่ง', order: 1 },
    { code: '1.2', name: 'One Province One Hospital', order: 2 },
    { code: '1.3', name: 'เพิ่มประสิทธิภาพการบริการปฐมภูมิ', order: 3 },
    { code: '1.4', name: 'Service Excellence', order: 4 },
    { code: '1.5', name: 'Maternal & Child Health', order: 5 },
  ];

  for (const c of clusters) {
    await prisma.cluster.create({ data: { ...c, strategyId: strategy1!.id } });
  }

  // Create clusters for other strategies
  for (let si = 2; si <= 6; si++) {
    const strat = await prisma.strategy.findUnique({ where: { code: String(si) } });
    for (let ci = 1; ci <= 3; ci++) {
      const names = [
        'กลุ่มงานพัฒนาคุณภาพ', 'กลุ่มงานเฝ้าระวังโรค', 'กลุ่มงานเทคโนโลยี',
        'กลุ่มงานพัฒนาบุคลากร', 'กลุ่มงานวิจัย', 'กลุ่มงานแผนยุทธศาสตร์',
        'กลุ่มงานการเงิน', 'กลุ่มงานพัสดุ', 'กลุ่มงานนิติกรรม',
        'กลุ่มงานเวชปฏิบัติ', 'กลุ่มงานทันตกรรม', 'กลุ่มงานเภสัชกรรม',
        'กลุ่มงานกายภาพบำบัด', 'กลุ่มงานแพทย์แผนไทย', 'กลุ่มงานจิตเวช',
      ];
      await prisma.cluster.create({
        data: {
          code: `${si}.${ci}`,
          name: names[(si - 2) * 3 + ci - 1] || `กลุ่มงานที่ ${ci}`,
          strategyId: strat!.id,
          order: ci,
        },
      });
    }
  }

  // Create dimensions
  const dims = [
    'Service Plan', 'ส่งเสริมสุขภาพ', 'บริหารจัดการ',
    'กำลังคน', 'ข้อมูลสุขภาพ', 'การเงินการคลัง',
  ];
  for (let i = 0; i < dims.length; i++) {
    await prisma.dimension.create({ data: { name: dims[i], order: i + 1 } });
  }

  // KPI data from the website (strategy 1)
  const strategy1Kpis = [
    { order: 1, name: 'ระดับความสำเร็จในการบริหารจัดการให้ประชาชนเข้าถึงบริการฟอกไตฟรี', clusterCode: '1.1', dataSource: 'Manual', dim: 1, target: 100, score: 5 },
    { order: 2, name: 'ระดับความสำเร็จการพัฒนาศักยภาพโรงพยาบาล ตามนโยบาย SAP', clusterCode: '1.2', dataSource: 'Manual', dim: 1, target: 100, score: 5 },
    { order: 3, name: 'ร้อยละของหญิงตั้งครรภ์ได้รับบริการฝากครรภ์คุณภาพ', clusterCode: '1.5', dataSource: 'HDC', dim: 1, target: 60, score: 3 },
    { order: 4, name: 'ร้อยละหญิงตั้งครรภ์ได้รับการฝากครรภ์ครั้งแรกก่อนหรือเท่ากับ 12 สัปดาห์', clusterCode: '1.5', dataSource: 'HDC', dim: 1, target: 75, score: 4 },
    { order: 5, name: 'ร้อยละหญิงตั้งครรภ์ที่ได้รับการดูแลก่อนคลอด 5 ครั้ง ตามเกณฑ์', clusterCode: '1.5', dataSource: 'HDC', dim: 1, target: 75, score: 3 },
    { order: 6, name: 'การลงข้อมูลในโปรแกรม Smart LR/Refer', clusterCode: '1.5', dataSource: 'HDC', dim: 1, target: 100, score: 1 },
    { order: 7, name: 'การตายมารดาไทย', clusterCode: '1.5', dataSource: 'Other', dim: 1, target: 16, score: 1 },
    { order: 8, name: 'หน่วยบริการ PCU/NPCU ได้รับการประเมินคุณภาพมาตรฐาน ตาม พรบ. ระบบสุขภาพปฐมภูมิ พ.ศ. 2562', clusterCode: '1.3', dataSource: 'Other', dim: 1, target: 100, score: 5 },
    { order: 9, name: 'ระดับความสำเร็จการพัฒนาแพทย์เวชศาสตร์ครอบครัว', clusterCode: '1.3', dataSource: 'Manual', dim: 1, target: 100, score: 1 },
    { order: 10, name: 'ระดับความสำเร็จการพัฒนาโรงพยาบาลให้ผ่านมาตรฐาน HA', clusterCode: '1.4', dataSource: 'Manual', dim: 1, target: 100, score: 5 },
    { order: 11, name: 'ระดับความสำเร็จการป้องกันการตายด้วยโรคหลอดเลือดสมอง (Stroke)', clusterCode: '1.4', dataSource: 'Manual', dim: 1, target: 50, score: 4 },
    { order: 12, name: 'ระดับความสำเร็จการป้องกันการตายโรคกล้ามเนื้อหัวใจตายเฉียบพลัน (STEMI)', clusterCode: '1.4', dataSource: 'Other', dim: 1, target: 9, score: 4 },
    { order: 13, name: 'ระดับความสำเร็จการขึ้นทะเบียนผู้ป่วยวัณโรค และอัตราสำเร็จการรักษาผู้ป่วยวัณโรคปอดรายใหม่', clusterCode: '1.4', dataSource: 'Other', dim: 1, target: 85, score: 4 },
    { order: 14, name: 'อัตราความสำเร็จการรักษาผู้ป่วยวัณโรค', clusterCode: '1.4', dataSource: 'Other', dim: 1, target: 88, score: 1 },
    { order: 15, name: 'ระดับความสำเร็จการป้องกันและเฝ้าระวังการฆ่าตัวตายสำเร็จ', clusterCode: '1.4', dataSource: 'Other', dim: 1, target: 70, score: 1 },
    { order: 16, name: 'ร้อยละผู้ป่วยยาเสพติดที่บำบัดรักษาได้รับการดูแลต่อเนื่อง (Retention Rate)', clusterCode: '1.4', dataSource: 'Other', dim: 1, target: 70, score: 1 },
    { order: 17, name: 'ระดับความสำเร็จของ รพ. ผ่านเกณฑ์ RLU Plus', clusterCode: '1.4', dataSource: 'Other', dim: 1, target: 0, score: 1 },
    { order: 18, name: 'ระดับความสำเร็จการควบคุมป้องกันโรค OVCCA', clusterCode: '1.4', dataSource: 'Other', dim: 1, target: 100, score: 1 },
    { order: 19, name: 'ร้อยละกลุ่มผู้เสี่ยง CCA ได้รับการคัดกรองมะเร็งท่อน้ำดีด้วยอัลตร้าซาวน์', clusterCode: '1.4', dataSource: 'Other', dim: 1, target: 100, score: 1 },
    { order: 20, name: 'ผลการคัดกรองมะเร็งลำไส้ใหญ่และลำไส้ตรงด้วยวิธี FIT test', clusterCode: '1.4', dataSource: 'HDC', dim: 1, target: 100, score: 2 },
    { order: 21, name: 'การควบคุมป้องกันโรคมะเร็งปากมดลูก (หญิงไทย อายุ 30-60 ปี)', clusterCode: '1.4', dataSource: 'HDC', dim: 1, target: 40, score: 5 },
    { order: 22, name: 'ระดับความสำเร็จการควบคุมป้องกันและรักษาโรคมะเร็งลำไส้ใหญ่และปากมดลูก', clusterCode: '1.4', dataSource: 'Other', dim: 1, target: 0, score: 1 },
    { order: 23, name: 'ร้อยละความครอบคลุมวัคซีน MMR 2 ในเด็กอายุ 2 ปี', clusterCode: '1.5', dataSource: 'HDC', dim: 1, target: 95, score: 2 },
    { order: 24, name: 'ร้อยละผู้ป่วย Common Diseases ได้รับยาสมุนไพรเพิ่มขึ้น', clusterCode: '1.4', dataSource: 'HDC', dim: 1, target: 0, score: 3 },
  ];

  const allClusters = await prisma.cluster.findMany();

  for (const kpiData of strategy1Kpis) {
    const cluster = allClusters.find(c => c.code === kpiData.clusterCode);
    const dimension = await prisma.dimension.findFirst({ where: { order: kpiData.dim } });
    
    await prisma.kpi.create({
      data: {
        order: kpiData.order,
        name: kpiData.name,
        strategyId: strategy1!.id,
        clusterId: cluster?.id ?? null,
        dimensionId: dimension?.id ?? null,
        dataSource: kpiData.dataSource,
        targetPercent: kpiData.target,
      },
    });
  }

  // Generate additional KPIs for other strategies
  const allStrats = await prisma.strategy.findMany();
  const allDims = await prisma.dimension.findMany();

  let globalOrder = 25;
  for (const strat of allStrats) {
    const existingCount = await prisma.kpi.count({ where: { strategyId: strat.id } });
    if (existingCount > 0) continue;

    const numKpis = [8, 10, 8, 7, 9][strat.order - 2] || 7;
    for (let i = 1; i <= numKpis; i++) {
      const kpiNames: Record<string, string[]> = {
        '2': ['อัตราการเกิดโรคไม่ติดต่อเรื้อรังรายใหม่', 'ร้อยละผู้ป่วย DM ควบคุมน้ำตาลได้ดี', 'ร้อยละผู้เป็นโรคความดันโลหิตสูงควบคุมได้', 'อัตราการเสียชีวิตจากอุบัติเหตุจราจร', 'ร้อยละการคัดกรองภาวะซึมเศร้า', 'อัตราการคลอดมีชีพในวัยรุ่นอายุ 15-19 ปี', 'ร้อยละเด็ก 0-5 ปีมีพัฒนาการสมวัย', 'ร้อยละผู้สูงอายุได้รับการคัดกรองสมองเสื่อม'],
        '3': ['ร้อยละการเบิกจ่ายงบประมาณตามแผน', 'ระดับความสำเร็จการจัดทำแผนยุทธศาสตร์', 'อัตราการครองเตียง', 'ระยะเวลารอคอยเฉลี่ย OPD', 'ร้อยละความพึงพอใจผู้รับบริการ', 'จำนวนข้อร้องเรียนที่ได้รับการแก้ไข', 'ระดับความสำเร็จการจัดการสิ่งแวดล้อมใน รพ.', 'อัตรากำลังเจ้าหน้าที่ต่อประชากร'],
        '4': ['อัตราคงอยู่ของบุคลากร', 'ร้อยละบุคลากรผ่าน competency', 'จำนวนบุคลากรที่ได้รับการอบรมเฉพาะทาง', 'อัตราความสุขของบุคลากร', 'จำนวนแพทย์ต่อประชากร', 'จำนวนพยาบาลต่อประชากร', 'ร้อยละบุคลากรสหวิชาชีพ'],
        '5': ['ระดับความสำเร็จการใช้ระบบ HIS', 'จำนวนข้อมูลที่เชื่อมโยง HDC ครบถ้วน', 'ร้อยละเวชระเบียนอิเล็กทรอนิกส์', 'ความเร็วอินเทอร์เน็ตของหน่วยบริการ', 'จำนวนระบบ Telemedicine', 'ระดับความสำเร็จ Digital Transformation'],
        '6': ['อัตราการจัดเก็บรายได้ค่ารักษาพยาบาล', 'ต้นทุนต่อหน่วยบริการ', 'ระดับวิกฤตทางการเงินของหน่วยบริการ', 'ร้อยละการเบิกจ่ายตามแผน', 'อัตราหนี้สินต่อรายได้', 'รายได้ต่อหัวประชากร', 'ประสิทธิภาพการบริหารเวชภัณฑ์', 'มูลค่าคงคลังเวชภัณฑ์'],
      };

      const names = kpiNames[strat.code] || [];
      const name = names[i - 1] || `ตัวชี้วัดที่ ${globalOrder}`;
      const cluster = allClusters.find(c => c.strategyId === strat.id && c.order === Math.ceil(i / 3));
      const dim = allDims[i % allDims.length];

      await prisma.kpi.create({
        data: {
          order: globalOrder,
          name: name,
          strategyId: strat.id,
          clusterId: cluster?.id ?? null,
          dimensionId: dim.id,
          dataSource: i % 3 === 0 ? 'Other' : i % 3 === 1 ? 'HDC' : 'Manual',
          targetPercent: [60, 75, 80, 85, 90, 95, 100][i % 7],
        },
      });
      globalOrder++;
    }
  }

  // Create KPI Scores for fiscal year 2569
  const allKpis = await prisma.kpi.findMany({ orderBy: { id: 'asc' } });
  const year = 2569;

  const scorePatterns = [
    { a: 5, b: 5, pct: 100, score: 5, status: 'pass' },
    { a: 5, b: 5, pct: 100, score: 5, status: 'pass' },
    { a: 78, b: 223, pct: 34.98, score: 3, status: 'fail' },
    { a: 185, b: 224, pct: 82.59, score: 4, status: 'pass' },
    { a: 166, b: 223, pct: 74.44, score: 3, status: 'fail' },
    { a: 0, b: 0, pct: 0, score: 1, status: 'no_data' },
    { a: 1, b: 20, pct: 5, score: 1, status: 'fail' },
    { a: 17, b: 17, pct: 100, score: 5, status: 'pass' },
    { a: 0, b: 0, pct: 0, score: 1, status: 'no_data' },
    { a: 5, b: 5, pct: 100, score: 5, status: 'pass' },
    { a: 4, b: 5, pct: 80, score: 4, status: 'pass' },
    { a: 4, b: 5, pct: 80, score: 4, status: 'pass' },
    { a: 244, b: 260, pct: 93.85, score: 4, status: 'pass' },
    { a: 0, b: 0, pct: 0, score: 1, status: 'no_data' },
    { a: 0, b: 0, pct: 0, score: 1, status: 'no_data' },
    { a: 0, b: 0, pct: 0, score: 1, status: 'no_data' },
    { a: 0, b: 0, pct: 0, score: 1, status: 'no_data' },
    { a: 0, b: 0, pct: 0, score: 1, status: 'no_data' },
    { a: 0, b: 0, pct: 0, score: 1, status: 'no_data' },
    { a: 181, b: 1435, pct: 12.61, score: 2, status: 'fail' },
    { a: 1700, b: 110, pct: 1545.45, score: 5, status: 'pass' },
    { a: 0, b: 0, pct: 0, score: 1, status: 'no_data' },
    { a: 677, b: 759, pct: 89.2, score: 2, status: 'fail' },
    { a: 450, b: 600, pct: 75, score: 3, status: 'fail' },
  ];

  for (let i = 0; i < allKpis.length; i++) {
    const pattern = i < scorePatterns.length 
      ? scorePatterns[i] 
      : { 
          a: Math.floor(Math.random() * 500), 
          b: Math.floor(Math.random() * 500 + 100), 
          pct: Math.floor(Math.random() * 100), 
          score: Math.floor(Math.random() * 5) + 1,
          status: ['pass', 'fail', 'no_data'][Math.floor(Math.random() * 3)],
        };

    await prisma.kpiScore.create({
      data: {
        kpiId: allKpis[i].id,
        fiscalYear: year,
        valueA: pattern.a,
        valueB: pattern.b,
        percent: pattern.pct,
        score: pattern.score,
        status: pattern.status,
      },
    });
  }

  // Create hospitals
  const hospitalNames = [
    'โรงพยาบาลวารินชำราบ', 'รพ.สต.คำขวาง', 'รพ.สต.คำน้ำแซบ',
    'รพ.สต.คูเมือง', 'รพ.สต.ท่าลาด', 'รพ.สต.ธาตุ',
    'รพ.สต.โนนโหนน', 'รพ.สต.บุ่งหวาย', 'รพ.สต.บ้านแขม',
    'รพ.สต.โคกสว่าง', 'รพ.สต.เมืองศรีไค', 'รพ.สต.สระสมิง',
    'รพ.สต.หนองกินเพล', 'รพ.สต.ห้วยขะยุง', 'รพ.สต.ทุ่งขุนน้อย',
    'รพ.สต.นาโพธิ์', 'รพ.สต.แสนสุข',
  ];

  for (let i = 0; i < hospitalNames.length; i++) {
    await prisma.hospital.create({
      data: {
        code: `H${String(i + 1).padStart(3, '0')}`,
        name: hospitalNames[i],
        type: i === 0 ? 'รพ.ชุมชน' : 'รพ.สต.',
      },
    });
  }

  const hospitals = await prisma.hospital.findMany();
  for (const hosp of hospitals) {
    for (let ki = 0; ki < Math.min(15, allKpis.length); ki++) {
      const scoreVal = Math.floor(Math.random() * 5) + 1;
      const pct = scoreVal === 5 ? 100 : scoreVal === 4 ? 80 + Math.floor(Math.random() * 20) : 
                  scoreVal === 3 ? 60 + Math.floor(Math.random() * 20) : 
                  scoreVal === 2 ? 30 + Math.floor(Math.random() * 30) : Math.floor(Math.random() * 30);
      const a = Math.floor(pct * 2 + Math.random() * 100);
      const b = Math.floor(150 + Math.random() * 300);

      await prisma.hospKpiScore.create({
        data: {
          hospitalId: hosp.id,
          kpiId: allKpis[ki].id,
          fiscalYear: year,
          valueA: scoreVal >= 1 ? a : 0,
          valueB: b,
          percent: scoreVal >= 1 ? pct : 0,
          score: scoreVal,
          status: scoreVal >= 4 ? 'pass' : scoreVal >= 2 ? 'fail' : 'no_data',
        },
      });
    }
  }

  console.log('✅ Seed completed!');
  console.log(`  - ${allStrats.length} strategies`);
  console.log(`  - ${allClusters.length} clusters`);
  console.log(`  - ${allKpis.length} KPIs`);
  console.log(`  - ${hospitals.length} hospitals`);
  console.log(`  - ${await prisma.kpiScore.count()} KPI scores`);
  console.log(`  - ${await prisma.hospKpiScore.count()} hospital KPI scores`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
