# IPOBazar — Product Requirements Document (PRD)

**Version:** 0.1 (Phase 2)
**Status:** Draft for review
**Owner:** Product / Engineering

---

## 1. Overview

**IPOBazar** is a mobile application that helps Indian retail investors **discover,
evaluate and track Initial Public Offerings (IPOs)**. It brings together IPO discovery,
detailed IPO information, application tracking, allotment status, watchlists,
notifications and analytics into one professional, easy-to-use mobile experience.

### 1.1 Problem statement

Retail investors currently juggle multiple websites (NSE, BSE, registrar portals) to find
IPOs, check dates, and later check allotment status. Information is fragmented, dates are
missed, and "grey market premium"-style numbers are often presented without context or
provenance.

### 1.2 Goals

- Give investors a single, trustworthy place to **discover** current and upcoming IPOs.
- Make **IPO details** (dates, price band, lot size, issue size, sector) easy to read.
- Let users **track their own applications** and later check **allotment status**.
- Let users **watch** IPOs and **notify** them of important events (open/close/allotment).
- Present **statistics and analytics** (e.g. issue trends, sector mix, listing performance).
- Never confuse users about the **provenance** of data (Sample vs Official vs Estimated).

### 1.3 Non-goals (out of scope for now)

- We do **not** act as an intermediary for applying to IPOs (no payment, no ASBA).
- We **never** collect UPI PINs, OTPs, bank credentials or broker passwords.
- We do **not** provide investment advice or "buy/sell" recommendations.
- Grey-market premium is **out of scope** unless from an authorized source and clearly marked.

---

## 2. Target users

| Persona | Description | Primary needs |
|---------|-------------|---------------|
| **Retail investor (primary)** | First-time to intermediate IPO participant | Find open IPOs, know key dates, track applications, see allotment |
| **Active trader** | Tracks many IPOs and listing performance | Analytics, watchlists, notifications, historical trends |
| **Learner** | Curious about how IPOs work | Clear explanations, glossary, structured details |

### 2.1 User environment

Mobile-first (Android + iOS). Expect variable network quality. Users may open the app
specifically on allotment-result day (high traffic, high anxiety).

---

## 3. Domain glossary

| Term | Meaning |
|------|---------|
| **IPO** | Initial Public Offering — first sale of a company's shares to the public |
| **Open / Close date** | Window during which applications are accepted |
| **Price band** | Minimum and maximum price per share |
| **Lot size** | Minimum number of shares one can apply for |
| **Issue size** | Total value/number of shares offered |
| **GMP** | Grey Market Premium (not in scope now) |
| **Registrar** | Agency handling allotment (e.g. registrar/RTA) |
| **Allotment** | Assignment of shares to applicants (often lottery-based for oversubscribed issues) |
| **Listing date** | Date shares begin trading |
| **Anchor investor** | Institutional investor allotted shares before the IPO opens |
| **QIB / HNI / Retail** | Investor categories with different allotment rules |

---

## 4. Data classification (core principle)

Every displayed financial value carries one of these provenance classes. This is a
**hard requirement**, not a nice-to-have:

| Class | Meaning | UI treatment |
|-------|---------|--------------|
| **SAMPLE** | Fake, clearly-labelled data used only in development | Neutral grey badge `SAMPLE DATA` |
| **OFFICIAL** | From a verified, authorized source | Solid badge `OFFICIAL` with source + timestamp |
| **ESTIMATED** | Derived/projected, not authoritative | Dashed amber badge `ESTIMATED` + disclaimer |

Rules:
1. We **never invent** IPO or allotment data.
2. Values we cannot obtain are shown as `Unavailable` — never guessed.
3. Official data shows its **source** and **last-updated timestamp**.

---

## 5. Feature requirements (by development phase)

> Phases follow the master roadmap. Each feature lists its phase so scope stays disciplined.

### Phase 6 — Authentication & investor profiles
- F1. Register with email + password (hashed, never stored in plaintext).
- F2. Log in / log out and obtain a session token (JWT).
- F3. View and edit investor profile (display name, PAN **last 4 only** optional, risk preference).
- F4. Password rules and input validation on both client and server.

### Phase 7 — IPO discovery & details
- F5. Home screen: sections for **Upcoming**, **Open**, **Closed**, **Listed** IPOs.
- F6. Search + filter (status, sector, dates).
- F7. IPO detail screen: dates, price band, lot size, issue size, registrar, sector, status, data provenance.
- F8. Clear **Official vs Estimated vs Sample** labelling on all values.

### Phase 8 — Applications & allotment tracking
- F9. Add an application (IPO, category, quantity, application number; **no payment data**).
- F10. View list of my applications with status.
- F11. Manually record / fetch **allotment status** (from authorized source only).
- F12. Timeline of key events per application.

### Phase 9 — Watchlists & notifications
- F13. Create/edit/delete watchlists and add/remove IPOs.
- F14. Push notifications for: opening soon, closing soon, allotment day, listing day.
- F15. Notification preferences (which events, quiet hours).

### Phase 10 — Analytics & admin
- F16. Analytics: number of IPOs by month/status, sector distribution, issue-size trends.
- F17. Admin: manage IPO data entry / ingestion (role-protected), with source notes.

### Phase 11 — Testing, security & deployment
- F18. Automated tests (backend + frontend), security review, deployment pipeline.

---

## 6. Key user stories (representative)

- *As a retail investor*, I want to see which IPOs are **open right now** so I can apply in time.
- *As a retail investor*, I want to know an IPO's **price band and lot size** at a glance.
- *As an applicant*, I want to **record my application** and later see its **allotment status**.
- *As an active investor*, I want to **watch** IPOs and get **notified** before they close.
- *As any user*, I want to **know whether a number is official or an estimate** so I can trust it.

---

## 7. Screen inventory (high level)

| # | Screen | Phase | Notes |
|---|--------|-------|-------|
| S1 | Splash / App load | 3 | Theme bootstrap, health check |
| S2 | Home / Discover | 7 | Sections by status |
| S3 | IPO Detail | 7 | Full details + provenance badges |
| S4 | Search & Filters | 7 | Query + facet filters |
| S5 | Login | 6 | Email + password |
| S6 | Register | 6 | Validation |
| S7 | Profile | 6 | Edit profile, preferences |
| S8 | My Applications | 8 | List + status |
| S9 | Application Detail | 8 | Timeline, allotment |
| S10 | Watchlists | 9 | List + manage |
| S11 | Notifications | 9 | Feed + preferences |
| S12 | Analytics | 10 | Charts / stats |
| S13 | Admin | 10 | Role-gated data management |

---

## 8. Non-functional requirements

- **Security:** hashed passwords, JWT auth, input validation, secrets in env vars,
  HTTPS in production. Never collect PINs/OTPs/broker passwords.
- **Performance:** first meaningful content quickly; list virtualization; cached API calls.
- **Reliability:** graceful loading / empty / error states on every screen.
- **Accessibility:** sufficient contrast, dynamic type support, screen-reader labels.
- **Internationalization:** English now; structured for future Hindi/locale support.
- **Auditability:** official data carries source + timestamp.

---

## 9. Success metrics (initial)

- Time-to-find an open IPO (goal: seconds, not minutes).
- Percentage of screens with complete loading/empty/error states (goal: 100%).
- Zero instances of unlabelled or fabricated financial data (goal: absolute).

---

## 10. Risks & mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Unofficial data scraping is fragile / ToS-sensitive | Data reliability, legal | Adapter layer (`IpoDataSource`) + caching + rate limiting + never fabricate; upgrade to licensed API later |
| Users mistake estimates for official data | Trust, compliance | Mandatory provenance badges |
| Collecting sensitive financial data | Security/legal | Explicitly forbid PIN/OTP/broker creds; collect minimum |
| Scope creep across phases | Delays | Strict phase gates with review stop-points |

---

## 11. Open questions

1. Which authorized IPO data source will we license for production? (Deferred to Phase 7.)
2. Which push-notification provider (Expo Notifications vs FCM/APNs direct)? (Phase 9.)
3. Admin role model — single admin vs role hierarchy? (Phase 10.)
