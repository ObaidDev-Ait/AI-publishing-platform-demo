/**
 * Session token utilities.
 * Uses opaque session IDs stored in httpOnly cookies (user id).
 * Extend with signed JWT when adding jsonwebtoken/jose dependency.
 */
export function createSessionToken(userId: string): string {
  return userId;
}

export function validateSessionToken(token: string | undefined): string | null {
  if (!token || token.trim().length === 0) return null;
  return token;
}
