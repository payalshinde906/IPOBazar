# IPOBazar

A professional Indian IPO tracking and investment companion application.

IPOBazar helps Indian investors discover upcoming, open and closed IPOs, explore IPO
details, track applications and allotment status, maintain watchlists, receive
notifications, and view IPO statistics and analytics.

> Status: **Phase 1–3 (Planning + Design System + Project Setup)**. Features are built
> phase by phase; see `docs/project_status.md` for the current state.

---

## Repository layout

```
IPOBazar/
├── client/            # React Native + Expo + TypeScript mobile app (Expo Router)
├── server/            # Python + FastAPI REST API (SQLAlchemy, Alembic)
├── docs/              # Product, architecture, development and API documentation
├── infrastructure/    # Local dev & deployment infrastructure
├── README.md
└── .gitignore
```

The **frontend (`client/`)** and **backend (`server/`)** are completely separate
applications. They communicate only over HTTP/JSON through the REST API.

---

## Technology stack

| Layer      | Technology |
|------------|------------|
| Frontend   | React Native, Expo, TypeScript, Expo Router, TanStack Query, Zustand |
| Backend    | Python, FastAPI, SQLAlchemy, Alembic, Pydantic |
| Database   | PostgreSQL (local instance during development) |
| Tooling    | Git, environment variables, pytest, Jest |

---

## Data classification (important)

This project **never invents IPO or allotment data**. Every financial value displayed
to a user is classified as one of:

| Class         | Meaning                                                   |
|---------------|-----------------------------------------------------------|
| **Sample**    | Clearly-labelled fake data used only during development.  |
| **Official**  | Data obtained from a verified, authorized source.          |
| **Estimated** | Derived/projected values, explicitly marked as estimates.  |

During early development, **only Sample data** is used.

---

## Getting started

See [`docs/setup_guide.md`](docs/setup_guide.md) for full local setup instructions.

---

## Documentation

| Document | Purpose |
|----------|---------|
| [`docs/project_status.md`](docs/project_status.md) | Current phase, completed work, next steps |
| [`docs/development_log.md`](docs/development_log.md) | Chronological log of tasks, files, commands, results |
| [`docs/architecture.md`](docs/architecture.md) | System architecture and data flow |
| [`docs/decisions.md`](docs/decisions.md) | Architecture Decision Records (ADRs) |
| [`docs/setup_guide.md`](docs/setup_guide.md) | Setup and run instructions |
| [`docs/product/PRD.md`](docs/product/PRD.md) | Product requirements |
| [`docs/product/design_system.md`](docs/product/design_system.md) | Design tokens and UI standards |
| [`docs/api/api_reference.md`](docs/api/api_reference.md) | REST API reference |
| [`docs/architecture/system_overview.md`](docs/architecture/system_overview.md) | Detailed architecture notes |
| [`docs/development/task_tracker.md`](docs/development/task_tracker.md) | Task tracker |
