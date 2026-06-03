import { NextResponse, NextRequest } from "next/server";
import { notificationsService } from "@backend/services/notifications.service";
import { requireAuth } from "@backend/middleware/auth.middleware";

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireAuth();
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const notification = await notificationsService.markAsRead(id, auth.userId);
    return NextResponse.json(notification);
  } catch (error) {
    return NextResponse.json({ error: "Failed to mark notification as read" }, { status: 500 });
  }
}
