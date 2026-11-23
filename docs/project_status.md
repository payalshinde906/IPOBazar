# IPOBazar — Project Status

**Last updated:** 2026-11-23
**Current phase:** Phase 4 — Design-system implementation ✅ **complete** (stopped for review before Phase 5)

---

## Snapshot

| Area | Status |
|------|--------|
| Phase 1 — Planning | ✅ Complete |
| Phase 2 — Design system & requirements | ✅ Complete |
| Phase 3 — Project setup | ✅ Complete |
| Phase 4 — Design-system implementation | ✅ Complete (stopped for review) |
| Phase 5 — Backend foundation & database | ⏳ Not started (awaiting your go-ahead) |

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
| Reusable UI components | ✅ | Delivered in Phase 4 |

---

## Phase 4 progress

| Item | Status | Notes |
|------|--------|-------|
| Theme provider | ✅ | `src/theme/ThemeProvider.tsx` — `system`/`light`/`dark`, `toggle`, context hook |
| Root layout wired | ✅ | `_layout.tsx` wraps `Stack` in `ThemeProvider`; status bar + background themed |
| Reusable components | ✅ | `Button`, `Card`, `Input`, `Badge` (+ `index.ts` barrel) |
| Provenance badges | ✅ | `ProvenanceBadge` — OFFICIAL / ESTIMATED / SAMPLE DATA |
| Data states | ✅ | `LoadingState`, `EmptyState`, `ErrorState` |
| Home screen | ✅ | Uses `useTheme()` + new components (health check preserved) |
| Accessibility | ✅ | roles/labels/states; min 44pt targets; `accessible` on role containers |
| Component tests | ✅ | `jest.config.js` + `jest-expo`; **7 suites / 22 tests passed** |
| Lint / typecheck | ✅ | `npx tsc --noEmit` exit 0; `npx expo lint` 0 problems |
| Frontend bundle | ✅ | Metro bundle HTTP **200**, ≈ 5.48 MB |

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
5. **`@testing-library/react-native` v14 is async** — `render()` and `fireEvent.*` return
   promises; tests must `await` them. `jest-expo` also now needs the
   `@react-native/jest-preset` peer dependency.
6. **Jest globals in TS** require `"types": ["jest", "node"]` in `client/tsconfig.json`
   (auto-inclusion did not pick `@types/jest` up).

---

## Next steps (after this stop-point)

1. ~~Finish Phase 3 verification~~ ✅ Done.
2. ~~Implement Phase 4 design system~~ ✅ Done — theme provider, components, provenance
   badges, data states, tests; all checks green (see table above).
3. **You review this Phase 4 delivery** (theme, components, tests, docs).
4. On approval, begin **Phase 5** — backend foundation & database (SQLAlchemy models,
   first Alembic migration, seed sample data).
