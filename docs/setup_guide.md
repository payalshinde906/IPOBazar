# IPOBazar — Setup Guide

How to get IPOBazar running locally. Written for a beginner, with the *why* behind each step.

---

## 1. Prerequisites

| Tool | Version used | Check with |
|------|--------------|------------|
| Git | 2.55 | `git --version` |
| Node.js | 24.13 | `node --version` |
| npm | 11.6 | `npm --version` |
| Python | 3.11 | `python --version` |
| PostgreSQL | 18.1 (native service) | `psql --version` |

> **Docker is not used** in Phase 3. See `docs/decisions.md` → ADR-0005.

---

## 2. Database (PostgreSQL — already installed)

The PostgreSQL Windows service `postgresql-x64-18` should be **Running**
(check: `Get-Service *postgres*`).

A database named **`IPOBazar`** has been created. Verify you can connect:

```powershell
$env:PGPASSWORD='<your-postgres-password>'
psql -U postgres -h localhost -p 5432 -d IPOBazar -c "select current_database();"
```

If the database does not exist, create it:

```powershell
$env:PGPASSWORD='<your-postgres-password>'
psql -U postgres -h localhost -c "create database \"IPOBazar\";"
```

---

## 3. Backend (`server/`)

```powershell
cd server

# 1. Create an isolated virtual environment (keeps project deps out of the global Python)
python -m venv .venv

# 2. Install dependencies into it
.\.venv\Scripts\python.exe -m pip install -r requirements.txt

# 3. Configure environment (copy the example and fill in your DB password)
Copy-Item .env.example .env
# then edit .env so DATABASE_URL has your real password

# 4. Run the API
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000
```

Open http://localhost:8000/docs for the interactive API documentation.

**Why a virtual environment?** It gives this project its own isolated set of Python
packages, so installing something for IPOBazar can never break another project.

**Verify:**

```powershell
# API liveness (no database)
curl http://localhost:8000/health

# API + database readiness
curl http://localhost:8000/api/v1/health/db

# Run the backend test suite
.\.venv\Scripts\python.exe -m pytest -q
```

---

## 4. Frontend (`client/`)

```powershell
cd client

# 1. Install dependencies (first time only)
npm install

# 2. Start the Expo dev server
npx expo start
```

Then press `a` (Android), `i` (iOS simulator), or scan the QR code with **Expo Go**.

**API base URL:** the app reads the backend URL from an Expo public env var. Create
`client/.env` with:

```
EXPO_PUBLIC_API_BASE_URL=http://localhost:8000
```

> Note: on a **physical device**, `localhost` refers to the phone — use your computer's
> LAN IP (e.g. `http://192.168.1.10:8000`) so the phone can reach the API.

---

## 5. Full verification checklist

| # | Check | Command / action | Expected |
|---|-------|------------------|----------|
| 1 | PostgreSQL running | `Get-Service *postgres*` | `Running` |
| 2 | DB reachable | `psql ... -d IPOBazar -c "select 1"` | returns `1` |
| 3 | Backend liveness | `curl :8000/health` | `{"status":"ok"}` |
| 4 | Backend + DB | `curl :8000/api/v1/health/db` | `{"status":"ok","database":"connected"}` |
| 5 | Backend tests | `pytest -q` | all pass |
| 6 | Expo starts | `npx expo start` | dev server + QR code |
| 7 | Handshake | open app, observe status text | "Backend: connected" |

---

## 6. Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `no password supplied` from psql | Auth requires a password | Set `PGPASSWORD` env var or put it in `.env` |
| `Read timed out` during `pip install` | Slow/unstable network | Re-run the install command; pip resumes the missing packages |
| `connection refused` from the app | Backend not running | Start uvicorn; check the port (8000) |
| App can't reach API on a real phone | `localhost` means the phone | Use your computer's LAN IP in `EXPO_PUBLIC_API_BASE_URL` |
