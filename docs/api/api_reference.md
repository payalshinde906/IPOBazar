# IPOBazar — API Reference

**Base URL (dev):** `http://localhost:8000`
**Interactive docs:** `/docs` (Swagger UI) and `/redoc`
**Version prefix:** `/api/v1`

> This reference grows as phases are implemented. Phase 3 covers health endpoints only.

---

## Health

### `GET /`
Basic service information.

**Response 200**
```json
{
  "app": "IPOBazar API",
  "status": "running",
  "docs": "/docs",
  "health": "/health"
}
```

### `GET /health`
Liveness probe — confirms the API process is up. No database access.

**Response 200**
```json
{ "status": "ok", "service": "ipobazar-api" }
```

### `GET /api/v1/health`
Versioned liveness probe (identical to `/health`).

**Response 200**
```json
{ "status": "ok", "service": "ipobazar-api" }
```

### `GET /api/v1/health/db`
Readiness probe — confirms the API can reach PostgreSQL.

**Response 200**
```json
{ "status": "ok", "database": "connected" }
```

**Response 503** (database unreachable)
```json
{ "detail": "database unavailable: <reason>" }
```

---

## Planned (later phases)

| Phase | Endpoint group | Purpose |
|-------|----------------|---------|
| 6 | `/api/v1/auth/*`, `/api/v1/users/me` | Register, login, profile |
| 7 | `/api/v1/ipos`, `/api/v1/ipos/{id}` | IPO discovery + details |
| 8 | `/api/v1/applications`, `/api/v1/applications/{id}/allotment` | Applications & allotment |
| 9 | `/api/v1/watchlists`, `/api/v1/notifications` | Watchlists & notifications |
| 10 | `/api/v1/analytics/*`, `/api/v1/admin/*` | Analytics & admin |
