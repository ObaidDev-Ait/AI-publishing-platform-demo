import { NextResponse } from "next/server";
import { notificationsService } from "@backend/services/notifications.service";
import { requireAuth } from "@backend/middleware/auth.middleware";

export async function GET(req: Request) {
  try {
    const auth = await requireAuth();
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const notifications = await notificationsService.getUserNotifications(auth.userId);
    return NextResponse.json(notifications);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 });
  }
}
