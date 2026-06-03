import { cookies } from "next/headers";
import { prisma } from "@backend/database/client";
import { validateSessionToken } from "@backend/utils/jwt";

export type AuthContext = {
  userId: string;
};

export async function requireAuth(): Promise<AuthContext | null> {
  try {
    const cookieStore = await cookies();
    const rawToken = cookieStore.get("session_id")?.value;
    console.log("[auth.middleware] Cookie 'session_id':", rawToken ? `present (${rawToken.substring(0, 8)}...)` : "MISSING");

    const sessionId = validateSessionToken(rawToken);
    if (!sessionId) {
      console.log("[auth.middleware] Session token validation failed — no valid session");
      return null;
    }

    if (sessionId === "demo-user-id" || sessionId.startsWith("new-user-")) {
      console.log("[auth.middleware] Fast-pathing Vercel fallback session for:", sessionId);
      return { userId: sessionId };
    }

    console.log("[auth.middleware] Looking up user with id:", sessionId);
    const user = await prisma.user.findUnique({
      where: { id: sessionId },
      select: { id: true },
    });

    if (!user) {
      console.log("[auth.middleware] No user found for session id:", sessionId);
      return null;
    }

    console.log("[auth.middleware] Auth SUCCESS — userId:", user.id);
    return { userId: user.id };
  } catch (error) {
    console.error("[auth.middleware] requireAuth() threw an error:", error);
    return null;
  }
}
