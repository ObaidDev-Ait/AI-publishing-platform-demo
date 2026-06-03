import { NextResponse } from "next/server";
import { settingsService } from "@backend/services/settings.service";
import { requireAuth } from "@backend/middleware/auth.middleware";

export async function GET(req: Request) {
  try {
    const auth = await requireAuth();
    if (!auth || auth.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const settings = await settingsService.getSettings();
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const auth = await requireAuth();
    if (!auth || auth.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const settings = await settingsService.updateSettings({
      siteName: body.siteName,
      defaultLanguage: body.defaultLanguage,
      aiProvider: body.aiProvider,
      aiModel: body.aiModel,
      payoutThreshold: body.payoutThreshold ? Number(body.payoutThreshold) : undefined,
      maintenanceMode: body.maintenanceMode,
      smtpEnabled: body.smtpEnabled,
    });

    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
