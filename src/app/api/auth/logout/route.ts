import * as authController from "@backend/controllers/auth.controller";

export async function POST() {
  try {
    return await authController.logout();
  } catch (error) {
    console.error("[API /api/auth/logout] Unhandled error:", error);
    return Response.json({ error: String(error) }, { status: 500 });
  }
}
