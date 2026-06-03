import { prisma } from "@backend/database/client";
import { createSessionToken } from "@backend/utils/jwt";

/** Ensures the demo user account exists in the database */
async function ensureDemoUser() {
  const email = "hamza@example.com";
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return existing;

  console.log("[auth.service] Demo user not found — creating...");
  return prisma.user.create({
    data: {
      name: "Hamza",
      email,
      password: "password123",
      rank: "Gold Publisher",
      earnings: 1200.0,
      articles: 25,
    },
  });
}

export async function loginUser(email: string, password: string) {
  if (!email || !password) {
    return { error: "Email and password are required", status: 400 as const };
  }

  console.log("[auth.service] Attempting login for:", email);

  // Auto-create demo user if it's the demo account
  if (email === "hamza@example.com") {
    try {
      await ensureDemoUser();
    } catch (err) {
      console.error("[auth.service] Failed to ensure demo user:", err);
    }
  }

  let user;
  try {
    user = await prisma.user.findUnique({ where: { email } });
  } catch (err) {
    console.error("[auth.service] Database error during login:", err);
    // Vercel Fallback for Demo Account
    if (email === "hamza@example.com" && password === "password123") {
      const token = createSessionToken("demo-user-id");
      return {
        token,
        user: { id: "demo-user-id", name: "Hamza", email, rank: "Gold Publisher" },
      };
    }
    return { error: "Database error", status: 500 as const };
  }

  if (!user) {
    // Vercel Fallback if DB is empty
    if (email === "hamza@example.com" && password === "password123") {
      const token = createSessionToken("demo-user-id");
      return {
        token,
        user: { id: "demo-user-id", name: "Hamza", email, rank: "Gold Publisher" },
      };
    }
    return { error: "Invalid email or password", status: 401 as const };
  }

  if (user.password !== password) {
    return { error: "Invalid email or password", status: 401 as const };
  }

  const token = createSessionToken(user.id);
  console.log("[auth.service] Login SUCCESS — token created for user:", user.id);

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      rank: user.rank,
    },
  };
}

export async function registerUser(name: string, email: string, password: string) {
  if (!name || !email || !password) {
    return { error: "Name, email, and password are required", status: 400 as const };
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return { error: "User already exists", status: 400 as const };
    }

    const user = await prisma.user.create({
      data: { name, email, password },
    });
    console.log("[auth.service] Registration SUCCESS — user created:", user.id);

    const token = createSessionToken(user.id);
    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        rank: user.rank,
      },
    };
  } catch (err) {
    console.error("[auth.service] Registration DB error. Using Vercel Fallback.");
    // Vercel Read-Only Fallback
    const fallbackId = `new-user-${Date.now()}`;
    const token = createSessionToken(fallbackId);
    return {
      token,
      user: {
        id: fallbackId,
        name,
        email,
        rank: "New Publisher",
      },
    };
  }
}
