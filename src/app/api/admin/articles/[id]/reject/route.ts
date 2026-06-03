import { NextResponse, NextRequest } from "next/server";
import { adminArticlesService } from "@backend/services/admin-articles.service";
import { requireAuth } from "@backend/middleware/auth.middleware";

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireAuth();
    if (!auth || auth.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const reason = body.reason || "Does not meet quality guidelines.";

    const { id } = await context.params;
    const article = await adminArticlesService.rejectArticle(id, auth.userId, reason);
    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json({ error: "Failed to reject article" }, { status: 500 });
  }
}
