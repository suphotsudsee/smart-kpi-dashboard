import { NextRequest, NextResponse } from "next/server";
import { ALL_SUB_CATALOGS, searchReports, getCatalogStats } from "@/lib/hdc-spider";

/**
 * GET /api/hdc/catalog
 * Returns the full HDC catalog or search results
 * 
 * Query params:
 *   ?search=keyword — search reports
 *   ?parent=name — filter by parent catalog
 *   ?subcatalog=id — filter by subcatalog ID
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const parent = searchParams.get("parent");
  const subcatalog = searchParams.get("subcatalog");

  try {
    // Search mode
    if (search) {
      const results = searchReports(search);
      return NextResponse.json({
        ok: true,
        query: search,
        count: results.length,
        results,
      });
    }

    // Filter by parent
    if (parent) {
      const filtered = ALL_SUB_CATALOGS.filter((c) => c.parentName === parent);
      return NextResponse.json({
        ok: true,
        parent,
        count: filtered.length,
        subcatalogs: filtered,
      });
    }

    // Single subcatalog
    if (subcatalog) {
      const found = ALL_SUB_CATALOGS.find((c) => c.id === subcatalog);
      if (!found) {
        return NextResponse.json({ ok: false, error: "Subcatalog not found" }, { status: 404 });
      }
      return NextResponse.json({ ok: true, subcatalog: found });
    }

    // Full catalog
    const stats = getCatalogStats();
    return NextResponse.json({
      ok: true,
      ...stats,
      subcatalogs: ALL_SUB_CATALOGS.map((c) => ({
        id: c.id,
        name: c.name,
        parentName: c.parentName,
        reportCount: c.reports.length,
        url: c.url,
      })),
    });
  } catch (error) {
    console.error("HDC Catalog API error:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
