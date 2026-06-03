import * as profileService from "@backend/services/profile.service";
import { requireAuth } from "@backend/middleware/auth.middleware";
import { jsonError, jsonSuccess } from "@backend/utils/response";

/** Demo user fallback when the database has no data */
const DEMO_PROFILE = {
  id: "demo-user",
  name: "Hamza",
  email: "hamza@example.com",
  role: "publisher",
  rank: "Gold Publisher",
  earnings: 1200,
  articles: 25,
  clicks: 4820,
  approvalRate: 96.0,
  avatarUrl: null,
  bio: "Tech blogger and digital content creator.",
  website: "https://hamzachen.blog",
  joinDate: new Date().toISOString(),
};

export async function getProfile() {
  try {
    const auth = await requireAuth();
    if (!auth) {
      console.log("[profile.controller] requireAuth() returned null — user not authenticated");
      return jsonSuccess({ authenticated: false, error: "Unauthorized" });
    }

    console.log("[profile.controller] Authenticated user:", auth.userId);

    const profile = await profileService.getProfile(auth.userId);
    if (!profile) {
      console.warn("[profile.controller] User not found in DB, returning demo profile");
      return jsonSuccess(DEMO_PROFILE);
    }

    return jsonSuccess(profile);
  } catch (error) {
    console.error("[profile.controller] getProfile() crashed:", error);
    // Return demo profile instead of crashing
    return jsonSuccess(DEMO_PROFILE);
  }
}

export async function updateProfile(body: { name?: string; bio?: string; website?: string; avatarUrl?: string | null; bannerUrl?: string | null; socialLinks?: string | null; profileVisibility?: boolean }) {
  try {
    const auth = await requireAuth();
    if (!auth) {
      console.log("[profile.controller] updateProfile — user not authenticated");
      return jsonError("Unauthorized", 401);
    }

    const user = await profileService.updateProfile(auth.userId, body);
    return jsonSuccess({ success: true, user });
  } catch (error) {
    console.error("[profile.controller] updateProfile() crashed:", error);
    return jsonError("Failed to update profile: " + String(error), 500);
  }
}
