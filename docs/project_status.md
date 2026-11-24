# IPOBazar — Project Status

**Last updated:** 2026-11-24
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
| Light-theme verification | ✅ | Verified 2026-11-24 — see below |
| Backend connectivity (visual review) | ✅ | Incident investigated & resolved 2026-11-24 — see below |

---

## Phase 4 visual review (2026-11-24)

**Backend connectivity incident — resolved.** The Chrome preview showed
"Backend unreachable — Failed to fetch". Root cause: the FastAPI backend was **not
running** (nothing listening on `:8000`), so the browser `fetch()` was refused at the
TCP layer. The client base URL (`client/.env` → `http://127.0.0.1:8000`), the CORS
config (`IPOBAZAR_CORS_ORIGINS=*`) and the route prefix were all correct — no code
change was required. Resolved operationally by starting
`.\.venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8000`;
`/health`, `/api/v1/health` and `/api/v1/health/db` then all returned **200**. Full
detail in `docs/development_log.md`.

**Light-theme verification — pass.**

| Check | Result |
|-------|--------|
| Provider resolves light | ✅ `initialMode="light"` → `light:light:false` (unit test) |
| Light palette defined | ✅ `palette.light` — 15 semantic tokens in `src/constants/theme.ts` |
| Token-driven components | ✅ every component reads colors via `useTheme()` |
| Hard-coded hex audit | ✅ only 3 literals, all intentional/theme-neutral (Badge solid text, Button `ON_PRIMARY`, Card `shadowColor`) |
| Light→dark toggle | ✅ unit test passes |
| Test suite | ✅ `npx jest --ci` → 7 suites / 22 tests passed |

Light-theme contrast (WCAG AA): textPrimary on background **17.1:1**, textSecondary on
surface **7.6:1**, white on primary **6.7:1**, danger on surface **4.8:1** — all ✅.
Three tokens fall below AA for *normal* text and are logged as future improvements
(see Known issue 7); the approved design tokens were **not** changed.

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
7. **Light-theme contrast — future improvement (non-blocking).** Three approved
   semantic tokens are below WCAG AA **4.5:1** for normal text on the light surface
   (`#FFFFFF`): `success` `#16A34A` (≈3.3:1), `warning` `#D97706` (≈3.2:1) and
   `textMuted` `#94A3B8` (≈2.6:1). They remain valid for large text / non-text UI
   (≥3:1) and `textMuted` is decorative-only. **No token was changed** — revisit as a
   deliberate design-system pass (e.g. darker shades for text usage) when it is safe to
   do so.

---

## Next steps (after this stop-point)

1. ~~Finish Phase 3 verification~~ ✅ Done.
2. ~~Implement Phase 4 design system~~ ✅ Done — theme provider, components, provenance
   badges, data states, tests; all checks green (see table above).
3. **You review this Phase 4 delivery** (theme, components, tests, docs).
4. On approval, begin **Phase 5** — backend foundation & database (SQLAlchemy models,
   first Alembic migration, seed sample data).
