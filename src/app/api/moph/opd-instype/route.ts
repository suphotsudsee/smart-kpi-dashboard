import { NextRequest, NextResponse } from "next/server";
import { fetchMophReport } from "@/lib/moph-api";

/**
 * GET /api/moph/opd-instype
 * 
 * Query params:
 *   ?b_year=2569          — ปีงบประมาณ (default 2569)
 *   ?hospcode=11060115    — กรองเฉพาะ รพ. (optional)
 *   ?limit=100            — max rows (default 500)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const b_year = parseInt(searchParams.get("year") || "2569", 10);
    const hospcode = searchParams.get("hospcode") || undefined;
    const limit = parseInt(searchParams.get("limit") || "500", 10);

    const result = await fetchMophReport({
      tableName: "s_op_instype_all",
      year: b_year,
      hospcode,
    });

    return NextResponse.json(result, {
      status: result.success ? 200 : 502,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
