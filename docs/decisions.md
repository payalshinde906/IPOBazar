# IPOBazar — Architecture Decision Records (ADR)

This file records **why** key technical decisions were made. Each entry is immutable once
accepted; superseded decisions are marked as such rather than deleted.

Format: **ID · Title · Status · Date · Context · Decision · Consequences.**

---

## ADR-0001 — Separate client and server applications

- **Status:** Accepted
- **Date:** 2026-11-23
- **Context:** We need a mobile app plus a backend that will later host user accounts,
  IPO data, and analytics. Coupling UI to data logic is hard to test and deploy.
- **Decision:** Keep `client/` (React Native/Expo) and `server/` (FastAPI) as fully
  separate applications. They communicate **only** over HTTP/JSON through the REST API.
- **Consequences:** (+) Independent development, testing and deployment. (+) Clear
  boundary. (−) Requires an API contract and CORS handling.

## ADR-0002 — Frontend stack: React Native + Expo + TypeScript + Expo Router

- **Status:** Accepted
- **Date:** 2026-11-23
- **Context:** We need one codebase targeting both Android and iOS, with strong typing.
- **Decision:** Use **Expo** (React Native) with **TypeScript** and **Expo Router**
  (file-based routing).
- **Consequences:** (+) Fast setup, huge ecosystem, easy device testing via Expo Go.
  (+) File-based routing keeps navigation declarative. (−) Expo occasionally trails raw
  native modules, none of which we need currently.

## ADR-0003 — Backend stack: FastAPI + SQLAlchemy + Alembic

- **Status:** Accepted
- **Date:** 2026-11-23
- **Context:** We need a typed, fast REST API with a relational database and schema
  migrations.
- **Decision:** Use **FastAPI** (async-capable, automatic OpenAPI docs) with **SQLAlchemy
  2.x** ORM and **Alembic** for migrations. Pydantic v2 for validation.
- **Consequences:** (+) Automatic interactive docs at `/docs`. (+) Type-driven
  validation. (+) Versioned migrations. (−) More moving parts for a beginner, mitigated by
  documentation.

## ADR-0004 — PostgreSQL as the database

- **Status:** Accepted
- **Date:** 2026-11-23
- **Context:** Need a robust relational database with strong typing and JSON support.
- **Decision:** Use **PostgreSQL**.
- **Consequences:** (+) Industry standard, excellent concurrency and JSON features.
  (−) Requires a running server (see ADR-0005).

## ADR-0005 — Use the locally installed PostgreSQL instead of Docker (Phase 3)

- **Status:** Accepted (supersedes the earlier "Postgres via Docker" plan)
- **Date:** 2026-11-23
- **Context:** The approved plan assumed Docker Desktop would host PostgreSQL. On this
  machine Docker is **not installed**, but **PostgreSQL 18.1 is already installed and its
  Windows service `postgresql-x64-18` is running**. A database named `IPOBazar` was created
  by the user.
- **Decision:** For Phase 3, connect directly to the **native local PostgreSQL** instance
  instead of Docker. Docker may be introduced later (e.g. Phase 11 deployment) without
  changing application code, because the connection is only a `DATABASE_URL`.
- **Consequences:** (+) Zero extra installs; faster setup. (+) Same database engine, so no
  code differences. (−) The dev environment is machine-specific; documented in
  `setup_guide.md` for reproducibility.

## ADR-0006 — Data provenance model; never fabricate financial data

- **Status:** Accepted
- **Date:** 2026-11-23
- **Context:** IPO/allotment data accuracy is critical to user trust and possibly to
  compliance. Early development has no authorized live data source.
- **Decision:** Every displayed financial value is classified **SAMPLE / OFFICIAL /
  ESTIMATED**, shown via a badge. We **never invent** data; unobtainable values render as
  `Unavailable`. Official values include source + timestamp.
- **Consequences:** (+) Trustworthy, auditable UI. (+) Legal/ethical safety. (−) Requires a
  consistent provenance field in the data model (planned for Phase 7).

## ADR-0007 — Authentication via self-hosted JWT

- **Status:** Accepted
- **Date:** 2026-11-23
- **Context:** Users need accounts; we must not rely on external auth services early.
- **Decision:** Implement authentication in FastAPI: **password hashing** + **JWT** access
  tokens. Never collect PINs/OTPs/broker passwords.
- **Consequences:** (+) Full control and learning. (+) No third-party dependency. (−) We own
  the security responsibility (documented best practices).

## ADR-0008 — Frontend state: TanStack Query + Zustand

- **Status:** Accepted
- **Date:** 2026-11-23
- **Context:** The app needs server-data caching and a little global client state.
- **Decision:** Use **TanStack Query** for server state (fetching/caching/retries) and
  **Zustand** for small client state (e.g. theme, auth token).
- **Consequences:** (+) Clear separation, less boilerplate than Redux. (−) Two libraries to
  learn (documented in Phase 4).

## ADR-0009 — IPO data source behind an adapter interface

- **Status:** Accepted
- **Date:** 2026-11-23
- **Context:** The user chose public NSE/BSE endpoints, which are unofficial, fragile, and
  may violate Terms of Service. Data must never be fabricated.
- **Decision:** Define a single `IpoDataSource` interface in the backend. Phase 3–6 use a
  **`SampleIpoDataSource`** (clearly-labelled sample data). Live NSE/BSE ingestion (or a
  licensed API) is added later as another adapter, with caching, rate limiting, and a
  descriptive User-Agent. Swapping the source must not touch the rest of the app.
- **Consequences:** (+) Compliant and future-proof. (+) Clear separation of ingestion from
  business logic. (−) Some upfront interface design.

---

### Superseded decisions

| ID | Original decision | Superseded by |
|----|-------------------|---------------|
| — | "PostgreSQL via Docker for local dev" | **ADR-0005** (native local PostgreSQL) |
