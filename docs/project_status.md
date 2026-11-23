# IPOBazar — Project Status

**Last updated:** 2026-11-23
**Current phase:** Phase 3 — Project setup ✅ **complete** (stopped for review before Phase 4)

---

## Snapshot

| Area | Status |
|------|--------|
| Phase 1 — Planning | ✅ Complete |
| Phase 2 — Design system & requirements | ✅ Complete |
| Phase 3 — Project setup | ✅ Complete |
| Phase 4 — Frontend foundation | ⏳ Not started (awaiting your go-ahead) |

---

## Phase 3 progress

| Item | Status | Notes |
|------|--------|-------|
| Toolchain verified | ✅ | git 2.55, node 24.13, npm 11.6, python 3.11/3.13 OK; **Docker absent** |
| Database | ✅ | Native PostgreSQL 18.1, DB `IPOBazar`, `/health/db` → `connected` |
| Repo skeleton + docs | ✅ | README, .gitignore, full docs set |
| Backend code | ✅ | FastAPI app + `/health`, `/api/v1/health`, `/api/v1/health/db` |
| Backend deps installed | ✅ | Installed into `server/.venv` (after network-timeout retry) |
| Backend verified running | ✅ | All 3 endpoints return correct JSON on `:8000` |
| Backend tests | ✅ | `pytest` → **3 passed** |
| Alembic initialised | ✅ | Wired to app settings + `Base.metadata`; connects OK |
| Frontend scaffold | ✅ | Expo SDK 58 + TS + Expo Router (`client/src/app/`) |
| Frontend verified running | ✅ | Metro `:8081`, bundle HTTP **200**, 5,721,829 bytes |
| Client → server handshake | ✅ | `fetchHealth()` → `{"status":"ok","service":"ipobazar-api"}` |
| Lint / typecheck | ✅ | `npx tsc --noEmit` clean; `npx expo lint` clean (0 problems) |
| Git repo | ✅ | Initialised at root; nested `client/.git` removed; pushed to `origin/main` |
| Reusable UI components | ⏭️ | **Deferred to Phase 4 by request** |

---

## Environment facts (this machine)

- PostgreSQL **18.1**, Windows service `postgresql-x64-18`, database `IPOBazar`.
- Backend runs on port **8000**.
- Expo dev server default port **8081**.
- Secrets live in `server/.env` (git-ignored).

---

## Known issues

1. **Docker not installed** → using native PostgreSQL (ADR-0005). No code impact.
2. **Slow/unstable network** during `pip install` caused read timeouts; retried with
   `--timeout 180 --retries 10`. `npm install` (ESLint) was similarly slow but completed.
3. **Ambient `DATABASE_URL` collision** on this machine silently redirected the app to
   SQLite during tests. Fixed by namespacing all backend env vars with `IPOBAZAR_`
   (**ADR-0010**). `.env` keys must keep this prefix.
4. **Peer-dependency conflict on `npm install`** (`react-dom@19.3.1` vs pinned `react@19.3.0`
   from Expo Router's web support). Mitigated with `client/.npmrc` → `legacy-peer-deps=true`.

---

## Next steps (after this stop-point)

1. ~~Finish Phase 3 verification~~ ✅ Done — backend, DB, tests, Alembic, frontend bundle and
   handshake all verified (see table above).
2. **You review this Phase 2 + Phase 3 delivery** (backend, frontend, database, docs).
3. On approval, begin **Phase 4** — frontend foundation: theme provider (light/dark applied
   across screens) and the reusable UI component set (Button, Card, Input, Badge, provenance
   badge, loading/empty/error states), following `docs/product/design_system.md`.
