import { NextRequest } from "next/server";
import * as authController from "@backend/controllers/auth.controller";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    return await authController.register(body);
  } catch (error) {
    console.error("[API /api/auth/register] Unhandled error:", error);
    return Response.json({ error: String(error) }, { status: 500 });
  }
}
