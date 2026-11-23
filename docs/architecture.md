# IPOBazar — Architecture

**Version:** 0.1 (Phase 3)

---

## 1. High-level shape

IPOBazar is a classic **client–server** application. The mobile app talks to a REST API,
which talks to a relational database.

```
┌────────────────────────┐        HTTPS / JSON        ┌────────────────────────┐
│   client/ (Expo app)   │  ────────────────────────► │   server/ (FastAPI)    │
│  React Native + TS     │  ◄──────────────────────── │  Python + SQLAlchemy   │
│  Expo Router, TanStack │        REST API v1         │  Alembic migrations    │
│  Query, Zustand        │                            └───────────┬────────────┘
└────────────────────────┘                                        │  SQL
                                                                   ▼
                                                       ┌────────────────────────┐
                                                       │      PostgreSQL        │
                                                       │  database: IPOBazar    │
                                                       └────────────────────────┘
```

Key boundary: **the client never touches the database**. All access goes through the API.

---

## 2. Component responsibilities

### 2.1 Client (`client/`)

| Folder | Responsibility |
|--------|----------------|
| `app/` | Screens and routing (Expo Router, file-based) |
| `components/` | Reusable UI components (built in Phase 4) |
| `constants/` | Theme tokens: colors, typography, spacing |
| `hooks/` | Custom React hooks |
| `services/` | API client + data-access functions |
| `store/` | Global client state (Zustand) |
| `types/` | Shared TypeScript types |
| `utils/` | Formatters/validators |
| `assets/` | Fonts, icons, images |

### 2.2 Server (`server/`)

| Folder | Responsibility |
|--------|----------------|
| `app/main.py` | FastAPI app creation, middleware, router wiring |
| `app/core/` | Configuration (`config.py`), security utilities |
| `app/api/v1/` | Versioned HTTP routers (endpoints) |
| `app/models/` | SQLAlchemy ORM tables |
| `app/schemas/` | Pydantic request/response schemas |
| `app/services/` | Business logic (e.g. IPO data adapters) |
| `app/db/` | Engine, session factory, declarative base |
| `alembic/` | Database migration scripts |
| `tests/` | Unit/integration tests (pytest) |

---

## 3. Request lifecycle (example: fetch IPO list)

1. User opens a screen in the app.
2. A TanStack Query hook calls a function in `services/`.
3. `services/` issues `GET /api/v1/ipos` via the shared API client (base URL from env).
4. FastAPI routes the request to a router in `app/api/v1/`.
5. The router calls a service in `app/services/`, which uses SQLAlchemy models via a DB
   session from `app/db/session.py`.
6. PostgreSQL returns rows; the service maps them to Pydantic response schemas.
7. JSON returns to the app; TanStack Query caches it and the UI renders.

---

## 4. Configuration & secrets

- Backend settings come from environment variables / `server/.env`
  (see `server/.env.example`), loaded by `app/core/config.py`.
- The real `.env` is **git-ignored** and must never be committed.
- Frontend uses Expo public env vars (prefixed `EXPO_PUBLIC_`) for the API base URL.

---

## 5. Data provenance (cross-cutting)

Every financial value carries a provenance class: **SAMPLE / OFFICIAL / ESTIMATED**
(see `docs/product/PRD.md` §4 and ADR-0006). This is enforced at the data layer (a field on
the model) and rendered via a badge component (Phase 4/7).

---

## 6. Security posture (foundation)

- Passwords hashed; JWT-based auth (Phase 6).
- Input validation via Pydantic at the API boundary.
- CORS restricted via configuration.
- **Never** collect PINs, OTPs or broker passwords.
- Secrets only in environment variables.

---

## 7. Environments

| Environment | Database | Notes |
|-------------|----------|-------|
| Development | Local PostgreSQL 18 (`IPOBazar` DB) | Current |
| Testing | Postgres test schema / SQLite (decided in Phase 5) | Planned |
| Production | Managed Postgres | Planned (Phase 11) |
