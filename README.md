# Tripletex Atlas Component Library

> **An AI-readable mirror of the Tripletex Atlas design system.**
> Generate accurate Tripletex prototypes by describing what you want — no Figma, no engineer, no design review.

🔗 **Live showcase:** [cristinaiftode.github.io/tripletex-component-library](https://cristinaiftode.github.io/tripletex-component-library/)

---

## What this is

Atlas — Tripletex's design system — has 67 components, 110 icons, 12 illustrations, and a full token system. AI tools (Claude, ChatGPT, Cursor, v0, Bolt, Figma Make…) don't know any of that out of the box, so they generate generic Bootstrap-looking output.

This repo packages Atlas as **5 plain-text files** any AI tool can read:

- `manifest.json` — every component with props, color mapping, sizing, icons, illustrations
- `prompt-rules.md` — full styling rulebook (colors, typography, per-component CSS patterns)
- `claude-project-prompt.md` — system prompt with HTML boilerplate + mandatory dropdown/modal JS
- `tokens/*.css` — semantic + global color tokens, spacing, typography
- `icons-reference.html` — 50 most-used icons with real SVG path data + 12 illustrations

The result: prototypes that look indistinguishable from the real Tripletex product.

---

## ⭐ Two rules above all others

These apply in every context — extraction, prototyping, fixing a bug, anything.

### Rule 1 — Read first, generate second

Always read `manifest.json`, the relevant `tokens/*.css` files, and `prompt-rules.md` **before generating any code**. Sounds obvious — make it explicit anyway. The difference between AI using *our* design system and AI reaching for what it remembers from training is whether you actually opened the spec first.

### Rule 2 — Ask before inventing

If a component, pattern, color, icon, or illustration **isn't in the manifest, stop and ask** before inventing one. When the user agrees that something new is needed, build it using the same styles, spacing, language, and class naming as the components that already exist.

This single rule prevents the vast majority of off-brand output. It also turns AI from a *generator* into a *collaborator* — AI asks, you decide, the new piece fits in with the rest.

---

## Quick start (pick one)

### Option A — Claude Code (recommended)

In the Claude desktop app's **Code** tab:

> Clone https://github.com/cristinaiftode/tripletex-component-library and open it

Then describe what you want — *"Build me an invoice list page with a PageHeader, a TableFilter with two FilterButtons, and a Table3 with 6 rows."* Claude reads the manifest, tokens, and rules from the repo automatically and writes files directly.

### Option B — Claude Projects on claude.ai

Create a new project, upload these 5 files to **Project Knowledge**:

- `manifest.json`
- `prompt-rules.md`
- `tokens/colors.css` · `tokens/spacing.css` · `tokens/typography.css`
- `icons-reference.html`

Paste the contents of `claude-project-prompt.md` into **Project Instructions**. Then prototype in chat.

### Option C — Other tools (Cursor, ChatGPT, v0, Bolt, Figma Make, Windsurf…)

- **Tools that clone repos** (Cursor, Windsurf): just clone — that's it
- **Tools that take file uploads** (ChatGPT projects, v0, Bolt): upload the 5 files listed above

The spec is plain text — markdown, JSON, CSS, SVG. Any AI that can read text can use it.

📖 **Full step-by-step instructions:** [`USAGE.md`](./USAGE.md)

---

## What's inside

| File | Purpose |
| --- | --- |
| [`manifest.json`](./manifest.json) | Component catalog — every component with props, color mapping (CSS variable + resolved hex), sizing, radii, icons, illustrations |
| [`prompt-rules.md`](./prompt-rules.md) | Full styling rulebook — colors, typography, spacing, per-component patterns. Use when **building prototypes** |
| [`claude-project-prompt.md`](./claude-project-prompt.md) | System prompt — HTML boilerplate, mandatory dropdown JS, page-building workflow. Use when **building prototypes** |
| [`tokens/colors.css`](./tokens/colors.css) | Source-of-truth color CSS variables (semantic + global palette) |
| [`tokens/spacing.css`](./tokens/spacing.css) | Element heights, radii, icon sizes |
| [`tokens/typography.css`](./tokens/typography.css) | Rubik font, weights, sizes |
| [`icons-reference.html`](./icons-reference.html) | 50 most-used icons (real SVG paths) + 12 illustrations |
| [`components/`](./components) | 67 React components (each `.tsx` paired with `.css`) |
| [`assets/illustrations/`](./assets/illustrations) | 12 SVG illustrations |
| [`USAGE.md`](./USAGE.md) | How to share this library with teams (Claude Code / claude.ai / other tools) |
| [`WORKSHOP.md`](./WORKSHOP.md) | 13-slide PM workshop deck |
| [`CLAUDE.md`](./CLAUDE.md) | Index for AI tools — routes between prototyping and extraction contexts |

---

## Component coverage (67 components)

| Category | Components |
| --- | --- |
| **Buttons** | Button, IconButton, ToggleButton, FilterButton, TableFilterIconButton |
| **Inputs** | Input, Textarea, Select, Combobox, Checkbox, RadioGroup, Switch, Slider, DatePicker |
| **Display** | Tag, Label, Tooltip, MultilineTooltip, Badge, Avatar, AvatarGroup, StatusMarker, Shortcut |
| **Navigation** | Tabs, Breadcrumb, Pagination, TablePagination, SidebarHeader, SidebarItem, SubitemIcons |
| **Feedback** | Modal, Dialog, Banner, Toast, InlineSpinner, Spinner, ProgressBar, Skeleton, SuccessIllustration |
| **Overlays** | Popover, PopoverOpener, PopupMenu, PopupMenuItem, PopupGroupHeader |
| **Tables** | Table3 (standard), DashboardTable, TableFilter, SavedFilterItem |
| **Layout** | PageHeader, Card, Divider, Autosave |
| **Icons & illustrations** | 110 icons + 12 illustrations |

---

## Local development

For engineers who want to run the showcase app locally:

```bash
git clone https://github.com/cristinaiftode/tripletex-component-library
cd tripletex-component-library
npm install
npm run dev
```

The showcase has 8 pages: Colors, Icons, Illustrations, Dashboard, Form, List/Table, Detail+Modal, States.

To build for production: `npm run build` (output in `dist/`). The live showcase auto-deploys from `main` via GitHub Actions.

---

## Extending the library

Adding a new component from Figma? Read [`CLAUDE.md`](./CLAUDE.md) — it describes the strict-extraction rules (no extra elements, props match Figma exactly, CSS variables only, ask before inventing).

Figma source: file key `4WZWeGkM9pNR8Y0c3X8z3H` · Atlas Library.

---

## Workshop

A 13-slide PM-friendly deck with speaker notes lives at [`WORKSHOP.md`](./WORKSHOP.md) — covers the problem, the mental model, what was built, the two rules, and how to get started Monday morning.

---

## Contact

**Cristina Iftode** — Design Systems Lead
- GitHub: [@cristinaiftode](https://github.com/cristinaiftode)
- Slack: `#design-systems`

For questions, ideas, or "this didn't work for my prototype" feedback — Slack is the fastest path. Bugs and requests can also go to [GitHub Issues](https://github.com/cristinaiftode/tripletex-component-library/issues).
