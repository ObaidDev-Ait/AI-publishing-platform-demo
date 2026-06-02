import { NextRequest } from "next/server";
import * as profileController from "@backend/controllers/profile.controller";

export async function GET() {
  try {
    return await profileController.getProfile();
  } catch (error) {
    console.error("[API /api/profile GET] Unhandled error:", error);
    return Response.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    return await profileController.updateProfile(body);
  } catch (error) {
    console.error("[API /api/profile PUT] Unhandled error:", error);
    return Response.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}
