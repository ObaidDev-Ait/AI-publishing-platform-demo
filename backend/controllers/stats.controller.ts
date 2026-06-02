import * as statsService from "@backend/services/stats.service";
import { requireAuth } from "@backend/middleware/auth.middleware";
import { jsonError, jsonSuccess } from "@backend/utils/response";

export async function getDashboardStats() {
  try {
    const auth = await requireAuth();
    if (!auth) return jsonError("Unauthorized", 401);

    const stats = await statsService.getDashboardStats(auth.userId);
    return jsonSuccess(stats);
  } catch (error) {
    console.error("[stats.controller] Error fetching stats:", error);
    return jsonError("Failed to fetch stats", 500);
  }
}
