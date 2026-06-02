/**
 * API Route Registry
 * Maps HTTP endpoints to backend controllers.
 *
 * Frontend (src/app/api) → Backend Controller → Service → Database
 */

export const API_ROUTES = {
  auth: {
    login: "POST /api/auth/login",
    logout: "POST /api/auth/logout",
    register: "POST /api/auth/register",
  },
  articles: {
    list: "GET /api/articles",
    get: "GET /api/articles/:id",
    delete: "DELETE /api/articles?id=:id",
    generate: "POST /api/generate-article",
  },
  profile: {
    get: "GET /api/profile",
    update: "PUT /api/profile",
  },
  stats: "GET /api/stats",
  analytics: "GET /api/analytics",
  notifications: "GET /api/notifications",
  payouts: "GET /api/payouts",
  landing: "GET /api/landing",
  config: {
    languages: "GET /api/config/languages",
  },
  admin: {
    stats: "GET /api/admin/stats",
    users: "GET /api/admin/users",
    articles: "GET /api/admin/articles",
    article: "GET /api/admin/articles/:id",
    review: "PATCH /api/admin/articles/:id/review",
    publishers: "GET /api/admin/publishers",
    websites: "GET /api/admin/websites",
    analytics: "GET /api/admin/analytics",
    revenue: "GET /api/admin/revenue",
  },
} as const;
