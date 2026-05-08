import { prisma } from './db';

export type KpiWithScore = Awaited<ReturnType<typeof getKpisWithScores>>[number];

export async function getKpisWithScores(year: number = 2569) {
  return prisma.kpi.findMany({
    include: {
      strategy: true,
      cluster: true,
      dimension: true,
      scores: {
        where: { fiscalYear: year },
        take: 1,
      },
    },
    orderBy: { order: 'asc' },
  });
}

export async function getKpiDetail(id: number, year: number = 2569) {
  return prisma.kpi.findUnique({
    where: { id },
    include: {
      strategy: true,
      cluster: true,
      dimension: true,
      scores: {
        where: { fiscalYear: year },
        take: 1,
      },
    },
  });
}

export async function getHospitalsWithScores(year: number = 2569) {
  return prisma.hospital.findMany({
    include: {
      scores: {
        where: { fiscalYear: year },
        include: { kpi: true },
      },
    },
    orderBy: { name: 'asc' },
  });
}

export async function getHospitalDetail(id: number, year: number = 2569) {
  return prisma.hospital.findUnique({
    where: { id },
    include: {
      scores: {
        where: { fiscalYear: year },
        include: {
          kpi: {
            include: { strategy: true },
          },
        },
      },
    },
  });
}

export async function getDashboardStats(year: number = 2569) {
  const scores = await prisma.kpiScore.findMany({
    where: { fiscalYear: year },
  });

  const total = scores.length;
  const pass = scores.filter((s) => s.status === 'pass').length;
  const fail = scores.filter((s) => s.status === 'fail').length;
  const noData = scores.filter((s) => s.status === 'no_data').length;

  return { total, pass, fail, noData };
}

export async function getDimensionScores(year: number = 2569) {
  const dims = await prisma.dimension.findMany({ orderBy: { order: 'asc' } });
  const result = [];
  for (const dim of dims) {
    const kpis = await prisma.kpi.findMany({
      where: { dimensionId: dim.id },
      include: {
        scores: {
          where: { fiscalYear: year },
          take: 1,
        },
      },
    });
    const total = kpis.length;
    const pass = kpis.filter((k) => k.scores[0]?.status === 'pass').length;
    const avgScore = kpis.length > 0
      ? kpis.reduce((sum, k) => sum + (k.scores[0]?.score || 0), 0) / kpis.length
      : 0;
    result.push({ name: dim.name, total, pass, avgScore: Math.round(avgScore * 10) / 10 });
  }
  return result;
}

export async function getHospitals() {
  return prisma.hospital.findMany({ orderBy: { name: 'asc' } });
}

export async function getHospitalKpiComparison(kpiId: number, year: number = 2569) {
  return prisma.hospKpiScore.findMany({
    where: { kpiId, fiscalYear: year },
    include: { hospital: true },
    orderBy: { percent: 'desc' },
  });
}
