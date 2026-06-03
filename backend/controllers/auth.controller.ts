import { cookies } from "next/headers";
import * as authService from "@backend/services/auth.service";
import { jsonError, jsonSuccess } from "@backend/utils/response";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
};

export async function login(body: { email: string; password: string }) {
  try {
    console.log("[auth.controller] Login attempt for:", body.email);
    const result = await authService.loginUser(body.email, body.password);

    if ("error" in result) {
      console.log("[auth.controller] Login failed:", result.error);
      return jsonError(String(result.error), result.status || 500);
    }

    const cookieStore = await cookies();
    cookieStore.set("session_id", result.token, COOKIE_OPTIONS);
    console.log("[auth.controller] Login SUCCESS — session cookie set for user:", result.user.id);

    return jsonSuccess({ success: true, user: result.user });
  } catch (error) {
    console.error("[auth.controller] login() crashed:", error);
    return jsonError("Login failed: " + String(error), 500);
  }
}

export async function register(body: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    console.log("[auth.controller] Register attempt for:", body.email);
    const result = await authService.registerUser(body.name, body.email, body.password);

    if ("error" in result) {
      console.log("[auth.controller] Registration failed:", result.error);
      return jsonError(String(result.error), result.status || 500);
    }

    const cookieStore = await cookies();
    cookieStore.set("session_id", result.token, COOKIE_OPTIONS);
    console.log("[auth.controller] Registration SUCCESS — session cookie set for user:", result.user.id);

    return jsonSuccess({ success: true, user: result.user });
  } catch (error) {
    console.error("[auth.controller] register() crashed:", error);
    return jsonError("Registration failed: " + String(error), 500);
  }
}

export async function logout() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("session_id");
    console.log("[auth.controller] Logout — session cookie deleted");
    return jsonSuccess({ success: true });
  } catch (error) {
    console.error("[auth.controller] logout() crashed:", error);
    return jsonError("Logout failed: " + String(error), 500);
  }
}
