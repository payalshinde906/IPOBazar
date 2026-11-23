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

**Result:** _to be filled after verification._
