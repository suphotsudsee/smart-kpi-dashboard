import { NextRequest, NextResponse } from "next/server";
import { getReportById, getReportByTable } from "@/lib/hdc-spider";
import { fetchMophReport } from "@/lib/moph-api";

/**
 * GET /api/hdc/reports
 * List all known reports from HDC spider
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tableName = searchParams.get("table");
  const reportId = searchParams.get("id");
  const year = parseInt(searchParams.get("year") || "2569", 10);

  // If tableName or id specified, fetch actual data
  let reportMeta;
  if (reportId) {
    reportMeta = getReportById(reportId);
  } else if (tableName) {
    reportMeta = getReportByTable(tableName);
  }

  if (reportMeta && reportMeta.tableName) {
    // Fetch real data from MOPH API
    try {
      const result = await fetchMophReport({
        tableName: reportMeta.tableName,
        year,
      });
      return NextResponse.json({
        success: result.success,
        report: reportMeta,
        data: result.data,
        total: result.total,
      });
    } catch (error) {
      return NextResponse.json(
        { success: false, report: reportMeta, error: String(error) },
        { status: 502 }
      );
    }
  }

  // Return full catalog
  const { ALL_SUB_CATALOGS, getAllTableNames } = await import("@/lib/hdc-spider");
  return NextResponse.json({
    catalogs: ALL_SUB_CATALOGS.map((c) => ({
      id: c.id,
      name: c.name,
      reportCount: c.reports.length,
      reports: c.reports.map((r) => ({ id: r.id, order: r.order, name: r.name, tableName: r.tableName })),
    })),
    totalTables: getAllTableNames().length,
  });
}
