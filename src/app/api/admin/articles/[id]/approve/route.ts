import { NextResponse, NextRequest } from "next/server";
import { adminArticlesService } from "@backend/services/admin-articles.service";
import { requireAuth } from "@backend/middleware/auth.middleware";

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireAuth();
    if (!auth || auth.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const article = await adminArticlesService.approveArticle(id, auth.userId);
    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json({ error: "Failed to approve article" }, { status: 500 });
  }
}
