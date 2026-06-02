import * as statsController from "@backend/controllers/stats.controller";

export async function GET() {
  try {
    return statsController.getDashboardStats();
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
