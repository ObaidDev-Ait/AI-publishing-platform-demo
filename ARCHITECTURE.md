# AI Publishing Platform — SaaS Architecture

## Overview

The platform is split into two independent layers:

| Layer | Responsibility | Location |
|-------|----------------|----------|
| **Frontend** | UI, forms, loading/error states, API consumption | `frontend/`, `src/app/`, `src/components/` |
| **Backend** | Business logic, auth, database, REST APIs | `backend/` |

## Directory Structure

```
ai-publishing-platform/
├── frontend/
│   ├── services/       # API client layer (fetch wrappers)
│   ├── hooks/          # useApi and shared React hooks
│   ├── types/          # TypeScript DTOs for API responses
│   └── layouts/        # Layout documentation
├── backend/
│   ├── routes/         # API route registry
│   ├── controllers/    # Request handlers (auth, validation, responses)
│   ├── services/       # Business logic
│   ├── middleware/     # Auth (session cookies)
│   ├── database/       # Prisma client
│   ├── prisma/         # Schema, migrations, seed
│   ├── models/         # Shared types
│   └── utils/          # JWT helpers, AI generators, prompts
└── src/app/
    ├── api/            # Thin Next.js route adapters → backend controllers
    └── (routes)/       # Page components (UI only)
```

## Data Flow

```
Frontend Page/Component
        ↓
frontend/services/*.service.ts  (apiFetch)
        ↓
HTTP Request → /api/*
        ↓
src/app/api/*/route.ts  (thin adapter)
        ↓
backend/controllers/*
        ↓
backend/services/*
        ↓
backend/database (Prisma)
        ↓
SQLite (backend/prisma/dev.db)
        ↓
JSON Response → Frontend
```

## API Endpoints

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/auth/login` | POST | No | Login, set session cookie |
| `/api/auth/register` | POST | No | Register publisher |
| `/api/auth/logout` | POST | Yes | Clear session |
| `/api/articles` | GET | Publisher | List user articles |
| `/api/articles?id=` | DELETE | Publisher | Delete article |
| `/api/articles/[id]` | GET | Publisher | Get article |
| `/api/generate-article` | POST | Publisher | AI content generation |
| `/api/stats` | GET | Publisher | Dashboard metrics |
| `/api/profile` | GET/PUT | Publisher | Profile CRUD |
| `/api/analytics` | GET | Publisher | Charts data |
| `/api/notifications` | GET | Publisher | Notifications |
| `/api/payouts` | GET | Publisher | Payout history |
| `/api/landing` | GET | No | Marketing content |
| `/api/config/languages` | GET | No | Supported languages |
| `/api/admin/*` | GET/PATCH | Admin | Admin operations |

## Authentication

- Session-based auth via `session_id` httpOnly cookie (user UUID)
- `backend/middleware/auth.middleware.ts` validates sessions
- Admin routes require `role === "admin"`
- JWT utilities in `backend/utils/jwt.ts` (extensible)

## Database Setup

```bash
npm run db:push      # Apply schema
npm run db:seed      # Seed demo data
npm run dev          # Start Next.js
```

### Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Publisher | hamza@example.com | password123 |
| Admin | admin@example.com | admin123 |

## Frontend Conventions

- **No business logic** in page components
- **No hardcoded** dynamic data — use `frontend/services`
- Use `useApi` hook for loading/error states
- UI components in `src/components/`

## Backend Conventions

- Controllers handle HTTP only (parse request, call service, return response)
- Services contain all business rules
- Prisma access only in services via `database/client`
- Mock AI generation in `backend/utils/mock-data-generator.ts`

## Removed from Frontend

- `src/lib/mock-data.ts` — replaced by API endpoints
- Direct Prisma usage in pages
- Inline fetch logic (centralized in services)
