# IPOBazar — Project Status

**Last updated:** 2026-11-23
**Current phase:** Phase 3 — Project setup (in progress)

---

## Snapshot

| Area | Status |
|------|--------|
| Phase 1 — Planning | ✅ Complete |
| Phase 2 — Design system & requirements | ✅ Complete |
| Phase 3 — Project setup | 🔄 In progress |
| Phase 4 — Frontend foundation | ⏳ Not started |

---

## Phase 3 progress

| Item | Status | Notes |
|------|--------|-------|
| Toolchain verified | ✅ | git, node, npm, python OK; **Docker absent** |
| Database | ✅ | Native PostgreSQL 18.1, DB `IPOBazar` reachable |
| Repo skeleton + docs | ✅ | README, .gitignore, docs set |
| Backend code | ✅ | FastAPI app + health endpoints + tests written |
| Backend deps installed | 🔄 | Retrying after a network timeout |
| Backend verified running | ⏳ | Pending dependency install |
| Alembic initialised | ⏳ | Pending |
| Frontend scaffold | 🔄 | `create-expo-app` running |
| Frontend verified running | ⏳ | Pending |
| Client → server handshake | ⏳ | Pending |
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
   `--timeout 180 --retries 10`.

---

## Next steps (after this stop-point)

1. Finish Phase 3 verification (backend up, tests pass, Alembic init, frontend up,
   handshake green).
2. **Stop for review.**
3. Begin **Phase 4** — frontend foundation: theme provider (light/dark) and reusable UI
   components (pending your review).
