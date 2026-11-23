# IPOBazar — System Overview (detailed)

Companion to `docs/architecture.md`. This file zooms into the internal structure created
in Phase 3.

---

## 1. Backend internal structure

```
server/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app: middleware, router registration
│   ├── core/
│   │   ├── __init__.py
│   │   └── config.py        # Settings (pydantic-settings) + get_settings()
│   ├── api/
│   │   ├── __init__.py
│   │   └── v1/
│   │       ├── __init__.py
│   │       └── health.py    # /health, /health/db
│   ├── db/
│   │   ├── __init__.py
│   │   ├── base.py          # Declarative Base for all models
│   │   └── session.py       # engine, SessionLocal, get_db()
│   ├── models/              # SQLAlchemy models (later phases)
│   ├── schemas/             # Pydantic schemas (later phases)
│   └── services/            # Business logic + data adapters (later phases)
├── alembic/                 # Migration environment
├── tests/
│   └── test_health.py
├── requirements.txt
├── .env / .env.example
└── alembic.ini
```

### Why each folder exists

- **`core/`** — anything shared across the app: configuration, and later security helpers.
- **`api/v1/`** — the HTTP surface. Versioning in the path means we can ship `/v2` later
  without breaking existing clients.
- **`db/`** — everything about talking to the database engine lives here.
- **`models/`** — one class per database table.
- **`schemas/`** — one class per request/response shape (keeps DB and API shapes decoupled).
- **`services/`** — business rules, and the **IPO data adapters** (ADR-0009).

---

## 2. Frontend internal structure

```
client/
├── app/                     # Expo Router screens (file == route)
│   ├── _layout.tsx          # Root layout + providers (Query, theme)
│   └── index.tsx            # Home screen (incl. health-check demo)
├── components/              # Reusable UI (Phase 4)
├── constants/
│   └── theme.ts             # Light/dark color tokens
├── hooks/                   # Custom hooks (later)
├── services/
│   └── api.ts               # Fetch wrapper + base URL
├── store/                   # Zustand stores (later)
├── types/                   # Shared TS types
├── utils/                   # Formatters/validators
└── assets/                  # Fonts, icons, images
```

### Client ↔ server communication

- `services/api.ts` holds the base URL (from `EXPO_PUBLIC_API_BASE_URL`) and a small
  `fetch` wrapper.
- Screens/hooks call functions in `services/`; **never** call `fetch` inline in a
  component. This keeps the network layer testable and swappable.

---

## 3. Data flow (health check example)

```
client/app/index.tsx  →  services/api.ts (GET /health)  →  FastAPI /health
                                                              │
                        TanStack Query caches result  ◄───────┘
                                                              │
                              UI renders "Backend: connected"
```

For a database-backed check, `/api/v1/health/db` additionally runs `select 1` against
PostgreSQL through SQLAlchemy.

---

## 4. Configuration precedence

1. Real environment variables (highest).
2. `server/.env` file.
3. Defaults in `app/core/config.py` (lowest, safe placeholders).

---

## 5. Planned additions per phase

| Phase | Backend | Frontend |
|-------|---------|----------|
| 4 | — | Theme provider, UI components, state providers |
| 5 | Models, Alembic migration, schemas | API client types |
| 6 | Auth router, JWT, password hashing | Login/register screens, token store |
| 7 | IPO model + data adapter + routes | Discover + detail screens |
| 8 | Applications + allotment routes | Applications screens |
| 9 | Watchlist + notification services | Watchlist + notifications screens |
| 10 | Analytics + admin routes | Analytics + admin screens |
| 11 | Hardening, CI | E2E tests, release build |
