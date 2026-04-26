# Tripletex Atlas Design System — AI Prompt Rules

You are building UI for the Tripletex accounting platform using the **Atlas** design system. Every prototype must look indistinguishable from the real product.

This document is the consumption rulebook: what to use, what to never invent, exact tokens and patterns. For starting boilerplate and workflow, see `claude-project-prompt.md`. For component definitions, see `manifest.json`.

---

## 0. Hard rules — read first

### ⭐ The two rules above all others

**Rule 1 — Read first, generate second.** Always read `manifest.json`, the relevant `tokens/*.css` files, and the rest of this rulebook **before generating any code**. The difference between AI using the Atlas system and AI reaching for what it remembers from training is whether you actually opened the spec first.

**Rule 2 — Ask before inventing.** If a component, pattern, color, icon, or illustration isn't in the manifest, **stop and ask** before inventing one. When the user agrees that something new is needed, build it using the same styles, spacing, language, and class naming as the components that already exist (`tt-` BEM, CSS variables, Rubik, 4px radius, 0.15s transitions). This single rule prevents the vast majority of off-brand output — it turns Claude from a generator into a collaborator.

### Other hard rules

- **NO Tailwind.** Tripletex does not use Tailwind. Use plain CSS, CSS variables, and the `tt-` BEM class system.
- **NO inline hex values for tokens.** Always reference the CSS variable: `color: var(--text-primary)`, not `color: #2e384d`. (Hex values are listed in this file only as a reference for tools that can't read `tokens/colors.css`.)
- **NO new colors, no new components, no new icons** — if it isn't in `manifest.json` or `tokens/`, ask the user before inventing it (see Rule 2 above).
- **Font is Rubik** — never Helvetica, never Arial, never Inter. Load from Google Fonts.
- **Border radius is `var(--radius-default)` (4px)** for almost everything — buttons, inputs, cards, dropdowns. The only exceptions: pills (Tag/Label/Chip use `var(--radius-full)` = 99999px), and mobile modals (16px top corners).

---

## 1. Always use components from the library

Import from the local barrel export when prototyping in React:

```tsx
import {
  Button, Input, Select, Combobox, Checkbox, Radio, Toggle,
  Modal, Popover, PopoverOpener, PopupMenu, PopupMenuItem,
  Tag, Label, Tooltip, Banner, Alert,
  Table, TablePagination, TableFilter,
  PageHeader, Breadcrumb, Sidebar, SidebarItem, Topbar,
  Avatar, Badge, Spinner, ProgressStepper,
  Icons,
} from "./components";
```

When prototyping as standalone HTML (no React build), reproduce the component markup using the `tt-` class system shown in this file. Either way, **never substitute a custom-built button/input/dropdown** for one in the library.

See `manifest.json` for the full inventory (67 components) and exact prop names.

---

## 2. Color palette

All colors live as CSS variables in `tokens/colors.css`. Always use the variable, never the hex.

### Semantic tokens (use these in 95% of cases)

| Token | Hex | Usage |
| --- | --- | --- |
| `var(--text-primary)` | `#2E384D` | Default body text |
| `var(--text-muted)` | `#6B7280` | Secondary text, helper text |
| `var(--text-disabled)` | `#51596A` | Disabled labels |
| `var(--text-placeholder)` | `#ABAFB7` | Input placeholders |
| `var(--text-link)` / `--text-action)` | `#0A41FA` | Links, active text, primary action labels |
| `var(--text-on-action)` | `#FFFFFF` | Text on a primary blue button |
| `var(--surface-background)` | `#F7F8FC` | Page background |
| `var(--surface-default)` | `#FFFFFF` | Cards, modals, dropdowns |
| `var(--surface-disabled)` | `#E9EAED` | Disabled inputs, disabled buttons |
| `var(--surface-tooltip)` | `#2E384D` | Tooltip background |
| `var(--surface-modal)` | `#2E384D4D` | Modal overlay (30% black) |
| `var(--border-primary)` | `#818794` | Default input border |
| `var(--border-muted)` | `#D5D7DB` | Table rows, light dividers |
| `var(--border-faint)` | `#E9EAED` | Chip borders, very light dividers |
| `var(--border-active)` / `--border-focus` | `#0A41FA` / `#6C8DFC` | Focus ring, selected state |
| `var(--action-primary-rest)` | `#0A41FA` | Primary button background |
| `var(--action-primary-hover)` | `#0834C7` | Primary button hover |
| `var(--action-primary-active)` | `#002992` | Primary button active/pressed |
| `var(--action-secondary-rest)` | `#E6EBFF` | Secondary button background |
| `var(--action-secondary-hover)` | `#CED9FE` | Secondary button hover |
| `var(--action-tertiary-rest)` | `#FFFFFF00` | Tertiary (transparent) button |
| `var(--action-tertiary-hover)` | `#CED9FE` | Tertiary button hover |

### Surface families (use the `--surface-{intent}-{state}` pattern)

Each intent has 4 states: `rest` / `hover` / `highlight` / `active`. Use them for Banner, Alert, Tag, Label backgrounds and Table row tones.

| Intent | rest | highlight | active |
| --- | --- | --- | --- |
| `info` | `#F2F5FF` | `#CED9FE` | `#0A41FA` |
| `warning` | `#FFFCF5` | `#FEF3D7` | `#F7C137` |
| `error` | `#FEF4F5` | `#FBD6DA` | `#E83645` |
| `success` | `#F4FBF4` | `#D6EED5` | `#33AC2E` |
| `automation` | `#F9F6FF` | `#E8DDFF` | `#7043CC` |

Matching border tokens follow the same pattern: `var(--border-info)` `#6C8DFC`, `var(--border-warning)` `#F7C137`, `var(--border-error)` `#EC5E6A`, `var(--border-success)` `#5BBC57`, `var(--border-automation)` `#A376FF`.

### Global palette (raw scales — only when a semantic token doesn't fit)

Each hue ranges 05–120. Lower numbers are lighter.

| Hue | 05 | 10 | 20 | 40 | 60 | 80 | 100 | 120 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Grey | `#F4F5F6` | `#E9EAED` | `#D5D7DB` | `#ABAFB7` | `#818794` | `#51596A` | `#2E384D` | `#0F131A` |
| Blue | `#F2F5FF` | `#E6EBFF` | `#CED9FE` | `#9DB3FD` | `#6C8DFC` | `#3B67FB` | `#0A41FA` | `#0834C7` |
| Turquoise | `#F4FAFA` | `#E8F5F5` | `#D4EBEB` | `#ABD6D6` | `#80C1C2` | `#57ADAE` | `#30999B` | `#206768` |
| Green | `#F4FBF4` | `#EAF7E9` | `#D6EED5` | `#ADDEAB` | `#84CD81` | `#5BBC57` | `#33AC2E` | `#247820` |
| Red | `#FEF4F5` | `#FDEAEC` | `#FBD6DA` | `#F6AEB4` | `#F1868F` | `#EC5E6A` | `#E83645` | `#B52A36` |
| Yellow | `#FFFCF5` | `#FFF9EA` | `#FEF3D7` | `#FCE6AF` | `#FADA87` | `#F8CD5F` | `#F7C137` | `#C4992C` |
| Purple | `#F9F6FF` | `#F3EEFF` | `#E8DDFF` | `#D1BBFF` | `#BA98FF` | `#A376FF` | `#8C54FF` | `#7043CC` |

### Brand & illustration colors

| Token | Hex | Usage |
| --- | --- | --- |
| `var(--logo-navy)` | `#010A59` | Logo + footer background |
| `var(--logo-teal)` | `#5BB3C0` | Logo accent |
| `var(--logo-green)` | `#1AB960` | Logo accent, illustration green |
| `var(--surface-nav)` | `#D4EBEB` | Sidebar background |
| `var(--surface-footer)` | `#010A59` | Footer background |

---

## 3. Typography

- **Font family**: `var(--font-family-base)` → `"Rubik", sans-serif`. Loaded from Google Fonts: weights 400 + 500.
- **Default body**: 14px / 1.4 line-height / weight 400 (`var(--font-size-base)`, `var(--font-weight-regular)`, `var(--line-height-base)`)
- **Letter spacing**: 0 (`var(--letter-spacing-base)`)
- **Headings**: weight 500, sizes 16px (h3), 18px (h2), larger as needed. Atlas uses 500 for emphasis, **never 700** — there is no bold weight loaded.
- **Buttons**: 14px / weight 400 — buttons are NOT bold.
- **Helper / muted text**: `color: var(--text-muted)`, size unchanged from body.

```css
body {
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  font-weight: var(--font-weight-regular);
  color: var(--text-primary);
  background: var(--surface-background);
}
```

---

## 4. Sizing & radius

| Token | Value | Where it's used |
| --- | --- | --- |
| `var(--element-height-tiny)` | 20px | Small inline indicators |
| `var(--element-height-small)` | 24px | Small chips, Tag, Label |
| `var(--element-height-medium)` | 32px | Small button, icon button (small), table action buttons |
| `var(--element-height-large)` | 40px | Default Button height, Input height, Select height |
| `var(--icon-size-small)` | 20px | Small icons (inside Tag, Label, small button, input affix) |
| `var(--icon-size-medium)` | 24px | Default icons (inside default button, table actions) |
| `var(--radius-default)` | 4px | Buttons, inputs, modals, dropdowns, cards, tables |
| `var(--radius-full)` | 99999px | Tag, Label, Chip pills |

Mobile modals use `border-radius: 16px 16px 0 0` (top sheet) — hardcoded, no token.

---

## 5. Class naming convention (BEM with `tt-` prefix)

All Atlas components follow this exact pattern. Use it when prototyping in plain HTML.

```
tt-[component]                       block
tt-[component]--[variant|size|state] modifier
tt-[component]__[part]               element
```

Real examples from the library:

```css
.tt-button { ... }
.tt-button--variant-primary { ... }
.tt-button--size-small { ... }
.tt-button__icon { ... }

.tt-input { ... }
.tt-input--variant-error { ... }
.tt-input--disabled { ... }
.tt-input__field { ... }

.tt-modal { ... }
.tt-modal--mobile { ... }
.tt-modal__header { ... }
.tt-modal__close { ... }
```

Components include: `tt-button`, `tt-input`, `tt-select`, `tt-checkbox`, `tt-radio`, `tt-toggle`, `tt-modal`, `tt-popover`, `tt-popup-menu`, `tt-tag`, `tt-label`, `tt-chip`, `tt-tooltip`, `tt-banner`, `tt-alert`, `tt-table`, `tt-pagination`, `tt-page-header`, `tt-sidebar`, `tt-sidebar-header`, `tt-sidebar-item`, `tt-topbar`, `tt-avatar`, `tt-badge`, `tt-spinner`, `tt-progress-stepper`, `tt-action-button`, `tt-comment-button`, `tt-message-button`, `tt-content-switcher`, `tt-decorative-icon`, `tt-dropdown`, `tt-filter-dialog`, `tt-input-group`, `tt-modifier-key`, `tt-multi-content-switcher`, `tt-number-stepper`, `tt-period`, `tt-status`, `tt-subitem-icons`, `tt-table-filter`, `tt-textarea`, `tt-calendar`.

---

## 6. Component patterns

### 6.1 Button

**Variants**: `primary` · `secondary` · `tertiary` · `icon`. **Sizes**: `medium` (default, 40px) · `small` (32px). All buttons use `var(--radius-default)`.

```css
.tt-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: var(--element-height-large);
  padding: 0 12px;
  border: 0;
  border-radius: var(--radius-default);
  font-family: inherit;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  position: relative;
  transition: background 0.15s ease;
}
.tt-button--size-small { height: var(--element-height-medium); }

.tt-button--variant-primary {
  background: var(--action-primary-rest);
  color: var(--text-on-action);
}
.tt-button--variant-primary:hover { background: var(--action-primary-hover); }
.tt-button--variant-primary:active { background: var(--action-primary-active); }

.tt-button--variant-secondary {
  background: var(--action-secondary-rest);
  color: var(--text-action);
}
.tt-button--variant-secondary:hover { background: var(--action-secondary-hover); }
.tt-button--variant-secondary:active { background: var(--action-secondary-active); }

.tt-button--variant-tertiary {
  background: var(--action-tertiary-rest);
  color: var(--text-action);
}
.tt-button--variant-tertiary:hover { background: var(--action-tertiary-hover); }
.tt-button--variant-tertiary:active { background: var(--action-tertiary-active); }

.tt-button:disabled {
  background: var(--surface-disabled);
  color: var(--text-disabled);
  cursor: not-allowed;
}

/* Focus ring (uses ::after, NOT outline) */
.tt-button:focus { outline: none; }
.tt-button:focus-visible::after {
  content: "";
  position: absolute;
  inset: -4px;
  border: 2px solid var(--border-focus);
  border-radius: var(--radius-default);
}

/* Icon-only button (square) */
.tt-button--variant-icon {
  width: var(--element-height-large);
  padding: 10px;
  background: var(--action-tertiary-rest);
  color: var(--text-action);
}
.tt-button--variant-icon.tt-button--size-small {
  width: var(--element-height-medium);
  padding: 6px;
}
```

### 6.2 Input

**Variants**: `default` · `info` · `automation` · `warning` · `error`. Single size: 40px tall.

```css
.tt-input {
  display: inline-flex;
  align-items: center;
  height: var(--element-height-large);
  width: 160px;
  padding: 10px 16px;
  background: var(--surface-background);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-default);
  color: var(--text-primary);
  font-family: inherit;
  font-size: 14px;
  transition: border-color 0.15s ease;
}
.tt-input::placeholder { color: var(--text-placeholder); }
.tt-input:hover { border-color: var(--border-hover); }
.tt-input:focus { border-color: var(--border-active); outline: none; }

.tt-input--variant-error {
  background: var(--surface-error-rest);
  border-color: var(--border-error);
}
.tt-input--variant-error:hover { border-color: var(--border-error-hover); }
.tt-input--variant-error:focus { border-color: var(--border-error-focus); }

.tt-input--variant-warning {
  background: var(--surface-warning-rest);
  border-color: var(--border-warning);
}
.tt-input--variant-automation {
  background: var(--surface-automation-rest);
  border-color: var(--border-automation);
}

.tt-input:disabled {
  background: var(--surface-disabled);
  border-color: var(--border-disabled);
  color: var(--text-disabled);
  cursor: not-allowed;
}
```

Variant trailing icon is 20×20px, positioned 16px from right. Leading icon (search) sits 16px from the left — increase left padding to ~44px to make room. Affixes (currency / %) inherit color.

### 6.3 Select / Combobox

Use a native `<select>` styled with `appearance: none` and a chevron-down icon positioned absolutely.

```css
.tt-select {
  appearance: none;
  -webkit-appearance: none;
  height: var(--element-height-large);
  padding: 10px 38px 10px 16px; /* extra right padding for chevron */
  background: var(--surface-background);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-default);
  font: inherit;
  color: var(--text-primary);
  cursor: pointer;
}
.tt-select:hover { border-color: var(--border-hover); }
.tt-select:focus { border-color: var(--border-active); outline: none; }
/* same variant colors as Input */
```

### 6.4 Modal

Backdrop covers the whole viewport at `var(--surface-modal)` (`#2E384D4D` ≈ 30% navy). Modal panel is centered (or bottom-sheet on mobile). Close on backdrop click and on Escape key.

```css
.tt-modal__backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: var(--surface-modal);
  display: flex;
  align-items: center;
  justify-content: center;
}
.tt-modal {
  width: 520px;
  max-width: 100%;
  padding: 32px;
  background: var(--surface-default);
  border-radius: var(--radius-default);
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.tt-modal--mobile {
  align-self: end;
  padding: 24px;
  border-radius: 16px 16px 0 0;
}
.tt-modal__close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  padding: 6px;
  background: var(--action-tertiary-rest);
  border: 0;
  border-radius: var(--radius-default);
  cursor: pointer;
}
.tt-modal__close:hover { background: var(--action-tertiary-hover); }
```

Action buttons inside a Modal: 40px tall on desktop, 48px on mobile. Primary button on the right, secondary on the left.

### 6.5 Popover

```css
.tt-popover {
  background: var(--surface-default);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-default);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  /* No shadow on desktop */
}
.tt-popover--mobile {
  width: 320px;
  max-height: 400px;
  border-radius: 16px;
  padding: 24px;
  gap: 16px;
  box-shadow: 0 8px 24px rgba(46, 56, 77, 0.16);
}
.tt-popover__arrow {
  width: 14px;
  height: 8px;
  /* SVG triangle, fill matches popover background, stroke matches border */
}
```

### 6.6 Tag / Label / Chip

All three are pills (`border-radius: var(--radius-full)`).

**Label** — informational, fixed 24px tall. 9 categories: `info`, `help`, `tips`, `news`, `get-started`, `automated`, `done`, `attention`, `error`. Each uses the matching `--surface-{intent}-highlight` background.

```css
.tt-label {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 24px;
  padding: 0 8px 0 4px;
  border-radius: var(--radius-full);
  font-size: 14px;
  font-weight: 400;
}
.tt-label--info,
.tt-label--help,
.tt-label--tips,
.tt-label--news,
.tt-label--get-started { background: var(--surface-info-highlight); }
.tt-label--automated { background: var(--surface-automation-highlight); }
.tt-label--done { background: var(--surface-success-highlight); }
.tt-label--attention { background: var(--surface-warning-highlight); }
.tt-label--error { background: var(--surface-error-highlight); }
.tt-label__icon { width: 20px; height: 20px; }
```

**Chip** (interactive variant) — 24/32/40px sizes. Border `1px solid var(--border-faint)`, background `var(--surface-background)`. Hover: `background: var(--action-neutral-hover)`, `border-color: var(--border-info)`.

### 6.7 Tooltip

Dark navy background, white text, **8px padding**, **4px radius**, 14×8px SVG arrow.

```css
.tt-tooltip {
  position: absolute;
  background: var(--surface-tooltip); /* #2E384D */
  color: var(--text-on-action);       /* #FFFFFF */
  padding: 8px;
  border-radius: 4px;
  font-size: 14px;
  z-index: 100;
}
.tt-tooltip--multiline {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 240px;
}
.tt-tooltip--multiline .tt-tooltip__title { font-weight: 400; }
.tt-tooltip--multiline .tt-tooltip__description { color: var(--text-placeholder); }
```

### 6.8 Banner

Fixed widths: `small` 368px · `medium` 520px · `large` 1200px. Border-left accent + tinted background.

| Variant | Background | Border | Highlight chip |
| --- | --- | --- | --- |
| `info`, `help`, `tips`, `news`, `get-started` | `--surface-info-rest` | `--border-info` | `--surface-info-highlight` |
| `automation` | `--surface-automation-rest` | `--border-automation` | `--surface-automation-highlight` |
| `success` | `--surface-success-rest` | `--border-success` | `--surface-success-highlight` |
| `warning` | `--surface-warning-rest` | `--border-warning` | `--surface-warning-highlight` |
| `error` | `--surface-error-rest` | `--border-error` | `--surface-error-highlight` |

```css
.tt-banner {
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  border: 1px solid var(--border-info);
  border-left-width: 4px;
  border-radius: var(--radius-default);
  background: var(--surface-info-rest);
}
```

### 6.9 Alert

Same 5-color system as Banner, but compact and inline. Desktop: horizontal flex, `padding: 12px 24px 12px 12px`, gap 12px. Mobile: grid (icon/close on top, body below), `padding: 8px 8px 12px 12px`. Close button is 32×32px tertiary.

### 6.10 Table (Table3)

**Use Table3 for any data table.** `DashboardTable` only inside dashboard cards.

Layout pattern:
- Page background: `var(--surface-background)` (light) or `var(--surface-default)` (white)
- Section title and toolbar sit **outside** the table border
- Only the table itself gets the border + radius
- Headers: weight 500, background `var(--surface-info-rest)`
- Row dividers: `border-bottom: 1px solid var(--border-muted)`
- Row hover: lightened tone background, transition 0.15s ease
- Selected row: `background: var(--action-secondary-rest)`, with a 2px-wide left accent bar in `var(--border-active)`
- Sort indicator: `chevron-up-solid` / `chevron-down-solid` icon at 24×24px
- Row action buttons (edit, copy, delete): 32×32px buttons with 24×24px icons, visible on row hover
- Toolbar icon buttons: 32×32px, tertiary variant
- Row expansion chevron: 32×32px button with 24×24px `chevron-right` (collapsed) / `chevron-down` (expanded)
- Expand-all button: 32×32px with `chevron-down-double` / `chevron-up-double`

```css
.tt-table {
  width: 100%;
  background: var(--surface-default);
  border: 1px solid var(--border-muted);
  border-radius: var(--radius-default);
  border-collapse: collapse;
  overflow: hidden;
}
.tt-table thead th {
  padding: 18px 12px;
  background: var(--surface-info-rest);
  border-bottom: 1px solid var(--border-muted);
  font-weight: 500;
  text-align: left;
}
.tt-table tbody td {
  padding: 18px 12px;
  border-bottom: 1px solid var(--border-muted);
  transition: background-color 0.15s ease;
}
.tt-table tbody tr:hover { background: var(--surface-info-rest); }
.tt-table tbody tr.tt-table__row--selected {
  background: var(--action-secondary-rest);
  position: relative;
}
.tt-table tbody tr.tt-table__row--selected::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--border-active);
  border-radius: 0 2px 2px 0;
}
```

### 6.11 Checkbox

```css
.tt-checkbox {
  width: 20px;
  height: 20px;
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-default);
  background: var(--surface-default);
  position: relative;
  cursor: pointer;
  transition: border-color 0.15s ease;
}
.tt-checkbox:hover { border-color: var(--border-active); }
.tt-checkbox:focus-visible {
  outline: 2px solid var(--border-active);
  outline-offset: 2px;
}
.tt-checkbox--checked { background: var(--border-active); border-color: var(--border-active); }
.tt-checkbox--checked::after {
  content: "";
  position: absolute;
  inset: 4px;
  border: 2px solid #fff;
  border-top: 0;
  border-left: 0;
  transform: rotate(45deg) translate(-1px, -2px);
}
```

### 6.12 Toggle, Radio, Spinner, Pagination, Sidebar, Topbar, PageHeader

For these, follow the structure in `manifest.json` → each entry has `colorMapping` and `styling` blocks with both CSS-variable references and resolved hex/px values. Replicate the exact dimensions, radii, and color tokens shown there.

---

## 7. State patterns (apply uniformly)

### Focus
- Interactive elements show a **2px ring** in `var(--border-focus)` (`#6C8DFC`) on `:focus-visible`
- Implementation: `::after` with `inset: -4px; border: 2px solid var(--border-focus); border-radius: var(--radius-default);`
- For Inputs and Selects, focus instead changes the border to `var(--border-active)` (`#0A41FA`)
- Always pair with `outline: none` on the host element (the ring is custom)

### Disabled
- `background: var(--surface-disabled)` (`#E9EAED`)
- `color: var(--text-disabled)` (`#51596A`)
- `cursor: not-allowed`
- `pointer-events: none` if you also want to block events
- **Never** change to a tinted brand color for disabled — only reduce contrast

### Hover
- Use the variant-specific `--*-hover` token (e.g. `--action-primary-hover`, `--border-hover`)
- Transition: `background 0.15s ease` or `border-color 0.15s ease`

---

## 8. Dropdown interactivity — MANDATORY

Every Select, Combobox, PopupMenu, and dropdown-style component MUST be fully interactive. Without working JavaScript these don't feel real.

- **Select**: click trigger → toggle dropdown · click option → update value + close · click outside → close. Chevron rotates 180° when open.
- **Combobox**: focus input → open dropdown · type → filter options live · click option → fill input + close · click outside → close.
- **Popover**: open on click of the `PopoverOpener` · close on outside click · close on Escape.
- **Modal**: close on Escape · close on backdrop click · trap focus inside while open.
- **Topbar / Sidebar dropdowns**: same outside-click + Escape close pattern.

Dropdown panel styling:

```css
.tt-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  background: var(--surface-default);
  border: 1px solid var(--border-muted);
  border-radius: var(--radius-default);
  box-shadow: 0 4px 16px rgba(46, 56, 77, 0.08);
  padding: 4px 0;
  z-index: 50;
  min-width: 200px;
}
.tt-dropdown__option {
  padding: 8px 12px;
  cursor: pointer;
}
.tt-dropdown__option:hover { background: var(--surface-info-rest); }
.tt-dropdown__option--selected { background: var(--action-secondary-rest); color: var(--text-action); }
```

---

## 9. Shadows / elevation

Tripletex uses **subtle, navy-tinted shadows** — never pure black. Most surfaces have **no shadow at all** (Atlas favours borders over elevation).

| Use | Shadow |
| --- | --- |
| Dropdowns, popup menus, popovers (mobile) | `box-shadow: 0 4px 16px rgba(46, 56, 77, 0.08);` |
| Floating panel / popover (mobile elevated) | `box-shadow: 0 8px 24px rgba(46, 56, 77, 0.16);` |
| Toast | `box-shadow: 0 4px 16px rgba(46, 56, 77, 0.08);` |

Modals and Banners have **no shadow** — the backdrop / border carries the visual weight.

---

## 10. Spacing

Atlas uses literal pixel values in flex/grid `gap` and `padding`. Common values: `4px`, `8px`, `12px`, `16px`, `20px`, `24px`, `32px`, `40px`. There is no spacing-scale variable.

Conventions:
- Gap between form fields: 16px
- Gap between sections of a page: 24px
- Card / section padding: 24px
- Modal padding: 32px desktop, 24px mobile
- Button gap (icon + label): 8px

---

## 11. Layout conventions

- Page background: `var(--surface-background)` (`#F7F8FC`)
- Card / section: `background: var(--surface-default)`, `border: 1px solid var(--border-faint)`, `border-radius: 8px`, `padding: 24px`
- App shell: `display: grid; grid-template-columns: 220px 1fr;` for Sidebar + main content
- Sidebar: `background: var(--surface-nav)` (`#D4EBEB`) — yes, the green tint, this is correct
- Topbar: `background: var(--surface-default)`, `border-bottom: 1px solid var(--border-faint)`
- Footer: `background: var(--surface-footer)` (`#010A59`), `color: var(--text-footer-primary)`
- Primary CTA on the right of a button group, secondary on the left

---

## 12. Icons

- 110 icons live in `components/Icons.tsx`
- Names are **kebab-case** in `manifest.json`: `chevron-down`, `arrow-left`, `circle-tick`, `magnifying-glass-bold`, etc.
- React component names are **PascalCase + `Icon` suffix**: `ChevronDownIcon`, `ArrowLeftIcon`, `CircleTickIcon`
- Default sizes: `var(--icon-size-small)` (20px), `var(--icon-size-medium)` (24px). Some illustrations also expose 48px.
- Default fill: `var(--text-primary)` — the icon inherits `currentColor`. Set `color` on the icon's parent to change fill.
- Status colors (use the global palette): info `#0A41FA`, success `#33AC2E`, warning `#F7C137`, error `#E83645`

If you need an icon and can't find it in `manifest.json` → `icons.names`, **ask the user**. Don't invent SVG path data.

---

## 13. Illustrations

- 12 illustrations in `assets/illustrations/`: `celebration`, `cloud-check`, `coins`, `error`, `ghost`, `ghost-sad`, `reject`, `rocket`, `send`, `success`, `trash`, `user`
- Use for empty states, onboarding, success / error pages, modal headers
- Reference: `<img src="assets/illustrations/[name].svg" alt="" />`
- See `manifest.json` → `illustrations.items` for the full list with usage descriptions

---

## 14. Match prop names exactly

Use the prop names from `manifest.json`. Atlas uses `variant` (not `appearance`) and `size` for most components.

```tsx
// ✓ Correct
<Button variant="primary" size="medium">Save</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="icon" size="small" aria-label="Edit"><EditIcon /></Button>
<Input variant="error" />

// ✗ Wrong
<Button appearance="primary">Save</Button>
<Button type="primary">Save</Button>
<Button kind="primary">Save</Button>
```

---

## 15. Accessibility

- Every icon-only Button MUST have `aria-label`
- Form fields need a visible label (or `aria-label` if visually hidden by design)
- Use semantic HTML: `<button>` for actions, `<a>` for links, `<input>` for fields, `<label>` for labels
- Keep contrast: `var(--text-primary)` on `var(--surface-default)` is the safe default
- All interactive elements must be keyboard accessible — Tab to focus, Space/Enter to activate
- Modal must trap focus and return focus to the opener on close

---

## 16. Do NOT

- Do not use Tailwind classes (`bg-blue-500`, `p-4`, `rounded-lg`, etc.) — this is plain CSS
- Do not use Tailwind arbitrary values (`bg-[#0A41FA]`) — use `var(--action-primary-rest)`
- Do not invent colors — only use the token palette in `tokens/colors.css`
- Do not change Atlas component dimensions (height, padding) — use the tokens
- Do not use `rounded-full` / `border-radius: 50%` on buttons — only Tag/Label/Chip use the pill shape
- Do not use Helvetica, Arial, Inter, or any font other than Rubik
- Do not use `font-weight: 700` — Atlas only loads 400 and 500
- Do not add gradients — Atlas is flat
- Do not add hover/focus animations beyond a 0.15s ease background/border transition
- Do not invent new components — if the manifest doesn't have it, ask
- Do not invent icon SVGs — use names from `manifest.json` → `icons.names`
- Do not render a Select / Combobox / dropdown without working JavaScript
