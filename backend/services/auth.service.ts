import { prisma } from "@backend/database/client";
import { createSessionToken } from "@backend/utils/jwt";
import bcrypt from "bcryptjs";

/** Ensures the demo accounts exist in the database */
async function ensureDemoAccounts() {
  const accounts = [
    {
      email: "admin@contentflow.ai",
      name: "Admin",
      password: "admin123", // Will be hashed below
      role: "admin",
      rank: "Administrator",
    },
    {
      email: "publisher@contentflow.ai",
      name: "Hamza",
      password: "publisher123", // Will be hashed below
      role: "publisher",
      rank: "Gold Publisher",
      earnings: 1200.0,
      articles: 3,
    },
  ];

  for (const account of accounts) {
    const existing = await prisma.user.findUnique({ where: { email: account.email } });
    if (!existing) {
      console.log(`[auth.service] Demo account not found — creating ${account.email}...`);
      const hashedPassword = await bcrypt.hash(account.password, 10);
      await prisma.user.create({ data: { ...account, password: hashedPassword } });
    }
  }
}

export async function loginUser(email: string, password: string) {
  if (!email || !password) {
    return { error: "Email and password are required", status: 400 as const };
  }

  console.log("[auth.service] Attempting login for:", email);

  // Auto-create demo accounts if needed
  const demoEmails = ["admin@contentflow.ai", "publisher@contentflow.ai"];
  if (demoEmails.includes(email)) {
    try {
      await ensureDemoAccounts();
    } catch (err) {
      console.error("[auth.service] Failed to ensure demo accounts:", err);
    }
  }

  let user;
  try {
    user = await prisma.user.findUnique({ where: { email } });
  } catch (err) {
    console.error("[auth.service] Database error during login:", err);
    // Vercel Fallback for Demo Accounts
    if (email === "admin@contentflow.ai" && password === "admin123") {
      const token = await createSessionToken("demo-admin-id");
      return {
        token,
        user: { id: "demo-admin-id", name: "Admin", email, role: "admin", rank: "Administrator" },
      };
    }
    if (email === "publisher@contentflow.ai" && password === "publisher123") {
      const token = await createSessionToken("demo-user-id");
      return {
        token,
        user: { id: "demo-user-id", name: "Hamza", email, role: "publisher", rank: "Gold Publisher" },
      };
    }
    return { error: "Database error", status: 500 as const };
  }

  if (!user) {
    // Vercel Fallback if DB is empty
    if (email === "admin@contentflow.ai" && password === "admin123") {
      const token = await createSessionToken("demo-admin-id");
      return {
        token,
        user: { id: "demo-admin-id", name: "Admin", email, role: "admin", rank: "Administrator" },
      };
    }
    if (email === "publisher@contentflow.ai" && password === "publisher123") {
      const token = await createSessionToken("demo-user-id");
      return {
        token,
        user: { id: "demo-user-id", name: "Hamza", email, role: "publisher", rank: "Gold Publisher" },
      };
    }
    return { error: "Invalid email or password", status: 401 as const };
  }

  // Handle auto-migration for legacy plain-text passwords
  let isValid = false;
  if (user.password && !user.password.startsWith("$2")) {
    // Plain text check
    if (user.password === password) {
      isValid = true;
      // Upgrade password to hash asynchronously
      const hashed = await bcrypt.hash(password, 10);
      await prisma.user.update({ where: { id: user.id }, data: { password: hashed } }).catch(() => {});
    }
  } else if (user.password) {
    // Bcrypt check
    isValid = await bcrypt.compare(password, user.password);
  }

  if (!isValid) {
    return { error: "Invalid email or password", status: 401 as const };
  }

  const token = await createSessionToken(user.id);
  console.log("[auth.service] Login SUCCESS — token created for user:", user.id, "role:", user.role);

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
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

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role: "publisher" },
    });
    console.log("[auth.service] Registration SUCCESS — user created:", user.id);

    const token = await createSessionToken(user.id);
    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        rank: user.rank,
      },
    };
  } catch (err) {
    console.error("[auth.service] Registration DB error. Using Vercel Fallback.");
    // Vercel Read-Only Fallback
    const fallbackId = `new-user-${Date.now()}`;
    const token = await createSessionToken(fallbackId);
    return {
      token,
      user: {
        id: fallbackId,
        name,
        email,
        role: "publisher",
        rank: "New Publisher",
      },
    };
  }
}
