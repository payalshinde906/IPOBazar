# IPOBazar — Development Log

Chronological record of tasks: what was done, files touched, commands run, results, and
issues. Newest entries at the bottom.

---

## 2026-11-23 — Phase 1: Planning

**Goal:** Produce the master plan and obtain approval before writing code.

- Reviewed the fresh (empty) project directory.
- Produced the master development plan and obtained approval via structured questions.
- **Decisions locked:** light-default + dark mode; native PostgreSQL (Docker deferred);
  self-hosted JWT auth; NSE/BSE endpoints behind an adapter, starting with sample data;
  TanStack Query + Zustand; Phase 2 + Phase 3 scope.

**Outcome:** Plan approved. No files created.

---

## 2026-11-23 — Phase 2: Design system & requirements

**Goal:** Define the product and the visual system before coding.

**Files created**
- `docs/product/PRD.md` — goals, personas, feature list by phase, screen inventory,
  non-functional requirements, risks.
- `docs/product/design_system.md` — color tokens (light + dark), typography scale
  (Inter + Space Grotesk), spacing, radius/elevation, iconography, data-provenance badges,
  status colors, component inventory (built in Phase 4), motion and accessibility.

**Key principle established:** every financial value is classified **SAMPLE / OFFICIAL /
ESTIMATED** and shown with a badge; data is never fabricated.

**Outcome:** ✅ Complete.

---

## 2026-11-23 — Phase 3: Project setup

**Goal:** Create the fresh structure, connect the database, boot backend and frontend,
verify the health handshake. Do **not** build reusable UI components yet.

### 3.1 Toolchain verification

**Command**
```powershell
git --version; node --version; npm --version; python --version; py --version; docker --version
```
**Result**
- git 2.55.0.windows.2 ✅
- node v24.13.0 ✅
- npm 11.6.2 ✅
- python 3.11.4 ✅ · py 3.13.9 ✅
- docker → **not installed** ❌

**Decision:** use the already-installed **native PostgreSQL 18.1** instead of Docker
(recorded as **ADR-0005**). Service `postgresql-x64-18` confirmed **Running**.

### 3.2 Database connection

**Command**
```powershell
$env:PGPASSWORD='<password>'; psql -U postgres -h localhost -p 5432 -c "select datname from pg_database order by 1;"
```
**Result:** database **`IPOBazar`** present (exact case). ✅

### 3.3 Repository skeleton

**Files created**
- `README.md`, `.gitignore`
- `docs/architecture.md`, `docs/decisions.md` (ADRs 0001–0009), `docs/setup_guide.md`
- `docs/architecture/system_overview.md`, `docs/api/api_reference.md`,
  `docs/development/task_tracker.md`

### 3.4 Backend foundation (`server/`)

**Files created**
- `app/main.py` (FastAPI app, CORS, routers), `app/core/config.py` (pydantic-settings)
- `app/api/v1/health.py` (`/health`, `/health/db`)
- `app/db/session.py` (engine + `SessionLocal` + `get_db`), `app/db/base.py`
- `app/{models,schemas,services}/__init__.py` (placeholders for later phases)
- `tests/test_health.py`, `requirements.txt`, `.env`, `.env.example`

**Command**
```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install --timeout 180 --retries 10 -r requirements.txt
```
**Issue:** the first install attempt failed with `ReadTimeoutError` from
`files.pythonhosted.org` (slow network). Retried with longer timeout/retries.

**Result:** ✅ Dependencies installed into `server/.venv`. Uvicorn serves the app on `:8000`
and every endpoint returns the expected JSON:

| Endpoint | Response |
|----------|----------|
| `GET /health` | `{"status":"ok","service":"ipobazar-api"}` |
| `GET /api/v1/health` | `{"status":"ok","service":"ipobazar-api"}` |
| `GET /api/v1/health/db` | `{"status":"ok","database":"connected"}` |

Test command
```powershell
.\.venv\Scripts\python.exe -m pytest -q
```
**Result:** **3 passed** ✅

**Issue (important):** the first test run failed with `ModuleNotFoundError: No module named
'aiosqlite'`. Cause: an **ambient** `DATABASE_URL` env var on this machine overrode
`server/.env` and pointed the app at SQLite. Fixed by namespacing every backend setting with
the `IPOBAZAR_` prefix (`env_prefix="IPOBAZAR_"`) and renaming the `.env` keys — recorded as
**ADR-0010**.

### 3.5 Alembic initialisation

**Command**
```powershell
.\.venv\Scripts\alembic.exe init alembic
```
**Files modified**
- `alembic/env.py` — imports `get_settings` and `Base`, sets
  `sqlalchemy.url` from settings, and `target_metadata = Base.metadata`.

**Result:** ✅ Alembic connects to `IPOBazar` using the app settings. No revisions yet — the
first migration arrives in Phase 5 alongside the models.

### 3.6 Frontend foundation (`client/`)

**Files created / modified**
- `package.json` — renamed to `ipobazar-client`, entry `expo-router/entry`, Expo SDK 58 deps.
- `app.json` — name/slug/scheme `IPOBazar`/`ipobazar`, plugins `expo-router` +
  `expo-status-bar`, `experiments.typedRoutes`.
- `tsconfig.json` — path alias `@/*` → `./src/*`.
- `src/constants/theme.ts` — semantic light/dark color tokens, spacing/radius/typography.
- `src/services/api.ts` — `API_BASE_URL` + typed `fetchHealth()`.
- `src/app/_layout.tsx` — root layout (`SafeAreaProvider` + `Stack`).
- `src/app/index.tsx` — home screen that shows connection state (idle/loading/connected/
  error) and a SAMPLE DATA banner.
- Removed the template `App.tsx`/`index.ts` (superseded by Expo Router).
- `.env` / `.env.example` — `EXPO_PUBLIC_API_BASE_URL`.

**Commands / result**
```powershell
npx tsc --noEmit            # → clean (exit 0)
npx expo lint               # → clean (0 problems) after fixing 1 error
npx expo start --port 8081  # Metro dev server
```
- Metro bundle `.expo/.virtual-metro-entry.bundle` → **HTTP 200, ~5.72 MB** ✅
- `eslint.config.js` created by `expo lint` (Expo flat config).

**Issue 1:** `tsc` reported `TS2322` on the theme because `as const` produced incompatible
light/dark literal types. Fixed by declaring an explicit `ThemeColors` interface and typing
`palette: Record<ThemeName, ThemeColors>`.

**Issue 2 (peer dependencies):** adding ESLint triggered a full `npm install` which failed
with `ERESOLVE` — a transitive `react-dom@19.3.1` (pulled for Expo Router's web support)
requires `react@^19.3.1`, but the SDK pins `react@19.3.0`. Fixed the ecosystem-standard way
with a `client/.npmrc` setting `legacy-peer-deps=true`.

**Issue 3 (lint rule):** `react-hooks/set-state-in-effect` flagged the home screen for
calling `setState` synchronously inside `useEffect`. Fixed by setting state only inside the
fetch callbacks and driving manual re-checks with a `refreshKey` counter.

### 3.7 Client → server handshake

The home screen calls `fetchHealth()` against `http://127.0.0.1:8000/health`. Verified
independently:
```text
client->server handshake OK: {"status":"ok","service":"ipobazar-api"}
```
**Result:** ✅ Client and server communicate over HTTP/JSON (CORS configured on the server).

### 3.8 Git repository

- `git init` at the **root** (monorepo); the nested `client/.git` created by the scaffold was
  removed.
- `.gitignore` excludes `node_modules/`, `.venv/`, `__pycache__/`, and `.env` (secrets);
  only `.env.example` is tracked.
- Pushed to `origin` → `https://github.com/payalshinde906/IPOBazar.git`, branch `main`
  (initial commit `22e6a77`, 52 files).

**Outcome:** ✅ **Phase 3 complete.** Backend, database, frontend and handshake all verified;
reusable UI components deliberately deferred to Phase 4. Stopped for review.

---

## 2026-11-23 — Phase 4: Design-system implementation

**Goal:** Turn the approved design tokens into an app-wide theme and a reusable,
accessible component set — no IPO business features, no backend changes.

**Reference:** `docs/product/design_system.md` (authoritative tokens + §7 provenance,
§9 component inventory, §10 states, §12 accessibility).

### 4.1 Inspection

- Read `client/AGENTS.md` (Expo SDK guidance), `docs/product/design_system.md`,
  `client/src/constants/theme.ts` (existing tokens), `src/app/_layout.tsx` and
  `src/services/api.ts`.
- Confirmed no `babel.config.js` / `metro.config.js` / `jest.config.js` existed yet.

**Files created (theme)**
- `src/theme/ThemeProvider.tsx` — React Context provider with `mode` (`system`/`light`/`dark`),
  resolved `theme` name, `isDark`, `colors` (from existing tokens) and `setMode`/`toggle`;
  falls back to the OS scheme via `useColorScheme()` when `mode === 'system'`.
- `src/theme/index.ts` — barrel export.
- `src/utils/color.ts` — `withAlpha()` helper to derive tinted badge fills from token hexes
  (no new hard-coded colours).
- Wired `ThemeProvider` into `src/app/_layout.tsx`; `StatusBar` style and `Stack`
  background now follow the active theme.

### 4.2 Reusable components (`src/components/`)

- `Button.tsx` — variants `primary` / `secondary` / `ghost`; sizes `sm`/`md`/`lg`
  (min-height ≥ 44); `loading` / `disabled` / `fullWidth`; `accessibilityRole="button"`,
  `accessibilityState`.
- `Card.tsx` — themed surface container (radius, hairline border, subtle elevation).
- `Input.tsx` — labelled `TextInput` with focus / helper / error states; border colour
  reflects state; label used as the accessible name.
- `Badge.tsx` — tones `neutral|accent|success|warning|danger|info`, variants
  `soft|solid|outline`, optional dashed border.
- `ProvenanceBadge.tsx` — the mandatory **OFFICIAL / ESTIMATED / SAMPLE DATA** classifier;
  OFFICIAL optionally shows an "Updated …" timestamp; source exposed to assistive tech.

### 4.3 States + exports (`src/components/`)

- `LoadingState.tsx` — spinner + message (`accessibilityRole="progressbar"`, `accessible`).
- `EmptyState.tsx` — title / message / optional call-to-action.
- `ErrorState.tsx` — danger title (`accessibilityRole="alert"`) + optional retry.
- `index.ts` — public barrel for all components.
- Home screen (`src/app/index.tsx`) now consumes `useTheme()` + `Card` / `Button` /
  `LoadingState` / `ErrorState` / `ProvenanceBadge` (keeps the Phase 3 health check).

### 4.4 Tests

- Added `jest.config.js` (preset `jest-expo`) and scripts `test` / `typecheck`.
- `src/test-utils/index.tsx` — `render()` that wraps UI in `ThemeProvider`
  (explicit re-exports to avoid clobbering the library `render`).
- 7 suites / **22 tests** covering Button, Card, Input, Badge, ProvenanceBadge,
  Loading/Empty/Error states and ThemeProvider (`__tests__` folders).

**Issue 1 (async API):** `@testing-library/react-native` **v14** made `render` and
`fireEvent.*` **async**. Initial synchronous destructuring of the render result failed
(`getByText is not a function`). Fixed by `await`-ing `render` and every `fireEvent`.

**Issue 2 (role queries):** `getByRole` only matches elements that are accessibility
elements. Added `accessible` to `Badge` / `LoadingState` containers and moved
`accessibilityRole="alert"` onto the title `Text` in `ErrorState`.

**Issue 3 (TS globals):** `tsc` could not see Jest globals despite `@types/jest` being
installed; added `"types": ["jest", "node"]` to `tsconfig.json`.

**Issue 4 (jest-expo peer):** `jest-expo` now requires `@react-native/jest-preset`;
installed it as a dev dependency.

### 4.5 Verification

| Check | Command | Result |
|-------|---------|--------|
| TypeScript | `npx tsc --noEmit` | ✅ exit 0 |
| Lint | `npx expo lint` | ✅ 0 problems |
| Tests | `npx jest --ci` | ✅ **7 suites / 22 tests passed** |
| Bundle | Metro `.expo/.virtual-metro-entry.bundle` (android) | ✅ HTTP **200**, ≈ 5.48 MB |

**Outcome:** ✅ **Phase 4 complete.** App-wide light/dark theming and the reusable
component set (incl. provenance badges and the three data states) are implemented,
typed, accessible and tested. Stopped for review — Phase 5 not started.
