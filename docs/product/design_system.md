# IPOBazar — Design System

**Version:** 0.1 (Phase 2)
**Status:** Draft for review
**Direction:** Mobile-first fintech. **Light theme is the default; dark theme is a
first-class parallel mode** designed from day one.

---

## 1. Brand & tone

IPOBazar should feel **trustworthy, precise and modern** — a professional financial tool,
not a trading game. Visual language: clean surfaces, strong typographic hierarchy, and a
single confident brand accent. Data provenance (Official / Estimated / Sample) is always
visually explicit.

**Design principles**

1. **Clarity over decoration.** Numbers and dates are the hero.
2. **Trust is visible.** Every figure shows where it came from.
3. **Calm by default.** Colour encodes meaning (status), not mood.
4. **Fast.** Content appears immediately; motion is short and purposeful.
5. **Consistent.** Same tokens, same components, everywhere.

---

## 2. Color tokens

Colours are referenced by **semantic token name** in code, never raw hex. Both themes
expose the same token names so components never need theme-specific logic.

### 2.1 Light theme (default)

| Token | Hex | Usage |
|-------|-----|-------|
| `background` | `#F8FAFC` | App background |
| `surface` | `#FFFFFF` | Cards, sheets |
| `surfaceAlt` | `#F1F5F9` | Secondary surface / inputs |
| `border` | `#E2E8F0` | Dividers, outlines |
| `textPrimary` | `#0F172A` | Primary text |
| `textSecondary` | `#475569` | Secondary text |
| `textMuted` | `#94A3B8` | Hints, captions |
| `primary` | `#1D4ED8` | Brand / primary actions |
| `primaryPressed` | `#1E40AF` | Primary pressed state |
| `accent` | `#0891B2` | Highlights, links, focus |
| `success` | `#16A34A` | Gains, OPEN, ALLOTTED |
| `warning` | `#D97706` | Closing soon, ESTIMATED |
| `danger` | `#DC2626` | Losses, CLOSED, errors |
| `info` | `#0891B2` | Informational |
| `overlay` | `rgba(15,23,42,0.45)` | Modal scrim |

### 2.2 Dark theme

| Token | Hex | Usage |
|-------|-----|-------|
| `background` | `#0B1220` | App background |
| `surface` | `#131C2E` | Cards, sheets |
| `surfaceAlt` | `#1B2740` | Secondary surface / inputs |
| `border` | `#263449` | Dividers, outlines |
| `textPrimary` | `#E7EDF6` | Primary text |
| `textSecondary` | `#9FB0C7` | Secondary text |
| `textMuted` | `#64748B` | Hints, captions |
| `primary` | `#3B82F6` | Brand / primary actions |
| `primaryPressed` | `#2563EB` | Primary pressed state |
| `accent` | `#22D3EE` | Highlights, links, focus |
| `success` | `#22C55E` | Gains, OPEN, ALLOTTED |
| `warning` | `#F59E0B` | Closing soon, ESTIMATED |
| `danger` | `#EF4444` | Losses, CLOSED, errors |
| `info` | `#22D3EE` | Informational |
| `overlay` | `rgba(0,0,0,0.6)` | Modal scrim |

> **Accessibility:** all text/background pairings are checked to meet **WCAG AA**
> (≥ 4.5:1 for body text, ≥ 3:1 for large text and UI borders).

---

## 3. Typography

Two families:

- **Inter** — UI text, labels, body. Neutral, highly legible.
- **Space Grotesk** — headings and **financial figures**. Tabular numerals matter for
  aligned prices, dates and share counts.

### 3.1 Type scale

| Token | Family | Size | Line height | Weight | Usage |
|-------|--------|------|-------------|--------|-------|
| `display` | Space Grotesk | 34 | 40 | 700 | Hero numbers |
| `h1` | Space Grotesk | 28 | 34 | 700 | Screen titles |
| `h2` | Space Grotesk | 22 | 28 | 600 | Section titles |
| `h3` | Inter | 18 | 24 | 600 | Card titles |
| `body` | Inter | 16 | 24 | 400 | Default body |
| `bodyStrong` | Inter | 16 | 24 | 600 | Emphasis |
| `bodySm` | Inter | 14 | 20 | 400 | Secondary body |
| `caption` | Inter | 12 | 16 | 500 | Labels, badges |
| `mono/number` | Space Grotesk | 16 | 22 | 600 | Prices, dates, quantities (tabular) |

Rules:
- Headings use `textPrimary`; captions/labels use `textSecondary`/`textMuted`.
- Financial numbers always use the numeric style (tabular figures).
- Never below 12px for readable content.

---

## 4. Spacing (4-pt base scale)

| Token | px |
|-------|----|
| `xxs` | 4 |
| `xs` | 8 |
| `sm` | 12 |
| `md` | 16 |
| `lg` | 24 |
| `xl` | 32 |
| `xxl` | 40 |
| `xxxl` | 48 |

Screen edge padding: `md` (16). Card inner padding: `md` (16). Section gap: `lg` (24).

---

## 5. Radius, border, elevation

| Token | Value | Usage |
|-------|-------|-------|
| `radiusSm` | 6 | Chips, small inputs |
| `radiusMd` | 10 | Inputs, buttons |
| `radiusLg` | 16 | Cards, sheets |
| `radiusPill` | 999 | Pills, tags |
| `borderWidth` | 1 | Default hairline |
| `shadowCard` | subtle, low-opacity | Cards (light theme mainly) |

---

## 6. Iconography

- Line icons, 1.5–2px stroke, 24px default (16 / 20 / 24 sizes).
- Each status has a paired icon + colour:
  - OPEN → green circle-plus
  - CLOSED → red circle-minus
  - UPCOMING → accent clock
  - ALLOTTED → green check
  - NOT ALLOTTED → red x
  - ESTIMATED → amber dashed circle
  - OFFICIAL → solid shield-check
  - SAMPLE → grey flask/beaker

---

## 7. Data-provenance badges (mandatory component)

| Badge | Light bg / text | Style | Label |
|-------|-----------------|-------|-------|
| OFFICIAL | `success` tint / `success` | solid | `OFFICIAL` + source tooltip |
| ESTIMATED | `warning` tint / `warning` | dashed border | `ESTIMATED` |
| SAMPLE | `surfaceAlt` / `textSecondary` | solid, grey | `SAMPLE DATA` |

Rules: a badge is attached to every financial value's container; official values also
show a **last-updated** timestamp.

---

## 8. Status colours

| Status | Colour token |
|--------|--------------|
| Upcoming | `accent` |
| Open | `success` |
| Closing soon | `warning` |
| Closed | `danger` |
| Listed | `textSecondary` |
| Allotted | `success` |
| Not allotted | `danger` |

---

## 9. Component inventory (built in Phase 4 — not yet)

| Component | Notes |
|-----------|-------|
| `Text` | Typography token wrapper |
| `Button` | variants: primary / secondary / ghost; sizes; loading state |
| `Card` | surface container with radius/shadow |
| `Input` | label, error, helper, focus states |
| `Badge` | status & provenance pills |
| `StatusPill` | IPO status with icon |
| `Divider` | hairline |
| `Chip` | filters, tags |
| `Avatar` | profile |
| `Skeleton` | loading placeholder |
| `EmptyState` | illustration + message + action |
| `ErrorState` | message + retry |
| `SectionHeader` | title + optional action |

> Per the approved scope, these are **designed and specified here but implemented in Phase 4**
> after your review.

---

## 10. Screen composition rules

- One clear primary action per screen.
- Persistent **safe-area** respect (notch/gesture bar).
- Every data screen defines four states: **Loading / Empty / Error / Success**.
- Lists use virtualisation and pull-to-refresh.
- Detail screens show provenance badges next to every figure.

---

## 11. Motion

- Durations: 150–200 ms for state changes; 250 ms max for sheets.
- Easing: standard `ease-out`.
- No staggered/decorative delays that hold back content — snappy and immediate.
- Respect OS "reduce motion" setting.

---

## 12. Accessibility

- WCAG AA contrast in both themes.
- Minimum touch target 44×44.
- Dynamic type supported (text scales without layout breakage).
- Meaningful accessibility labels on interactive elements and status icons.
