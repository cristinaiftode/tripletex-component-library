# CLAUDE.md — Tripletex Atlas Component Library

This repository serves two distinct workflows. Read the section that matches what you're doing.

## 📚 Reference files

| File | Purpose |
| --- | --- |
| `manifest.json` | Component catalog — every component with props, color mapping (CSS variable + resolved hex), sizing, radii, icons, illustrations |
| `prompt-rules.md` | Full styling rulebook — colors, typography, spacing, per-component patterns. Use when **building prototypes** |
| `claude-project-prompt.md` | System prompt — HTML boilerplate, mandatory dropdown JS, page-building workflow. Use when **building prototypes** |
| `tokens/colors.css` | Source-of-truth color CSS variables (semantic + global palette) |
| `tokens/spacing.css` | Element heights, radii, icon sizes |
| `tokens/typography.css` | Rubik font, weights, sizes |
| `components/index.ts` | Barrel export listing all 67 React components |
| `assets/illustrations/` | 12 SVG illustrations |
| `USAGE.md` | How to share this library with teams (Claude Code / claude.ai / other tools) |

---

## ⚠️ Two contexts, two rule sets

This library is used in two very different ways. The rules differ.

### A. Prototyping context — "I'm using this library to build a UI"

Use this when the user asks for a settings page, an invoice list, a customer detail screen, etc.

**Read `prompt-rules.md` and `claude-project-prompt.md`.** They cover:

- Plain CSS + CSS variables (NO Tailwind — Tripletex does not use Tailwind)
- Color palette resolved from `tokens/colors.css`
- Rubik typography
- Per-component styling (Button, Input, Modal, Popover, Tag, Banner, Table, etc.)
- Mandatory dropdown / modal / popover JS interactivity
- HTML boilerplate to start every prototype
- Table3 layout pattern for data tables

The goal in this context is **prototypes that look indistinguishable from the real Tripletex product**.

### B. Extraction context — "I'm growing this library from Figma"

Use this when the user asks to add a new component to the library by reading from Figma MCP.

**Follow the strict-extraction rules below.** They are deliberately conservative — the library mirrors Atlas exactly, so no creativity in this mode.

---

## Component generation rules (Extraction context only)

### STRICT: Do NOT add extra elements
When generating components from Figma MCP:
- Generate ONLY the elements visible in the Figma screenshot
- Do NOT add placeholder content, demo data, or example usage beyond what Figma shows
- Do NOT add wrapper divs unless they exist in the Figma design
- Do NOT add icons, images, or decorative elements not in the original design
- If something is unclear, ASK instead of assuming

### Component structure
- React components live in `components/` (each `Component.tsx` paired with `Component.css`)
- Each component is a single, focused file
- Export only the component itself, not demo/example code
- Props match EXACTLY what Figma variants show
- Do not invent additional props or variants beyond what exists in Figma
- Update the barrel export in `components/index.ts` when adding a new component
- Update `manifest.json` with the new component's entry

### Naming conventions
- React component files: PascalCase (`Button.tsx`, `IconButton.tsx`)
- CSS files: PascalCase to match the component (`Button.css`)
- CSS class names: `tt-` BEM (`tt-button`, `tt-button--variant-primary`, `tt-button__icon`)
- Match Figma component names whenever possible

### Token usage
```tsx
// ✗ WRONG — hardcoded hex
<button style={{ backgroundColor: "#0A41FA" }}>

// ✓ CORRECT — CSS variable
<button style={{ backgroundColor: "var(--action-primary-rest)" }}>
```

```css
/* ✗ WRONG — hardcoded hex in component CSS */
.tt-button--variant-primary { background: #0A41FA; }

/* ✓ CORRECT — semantic token */
.tt-button--variant-primary { background: var(--action-primary-rest); }
```

If the design uses a color you can't find in `tokens/colors.css`, **ask first** — don't add a new token without confirmation.

### Icons
- 110 icons live in `components/Icons.tsx`
- Names are kebab-case (`chevron-down`); React export names are PascalCase + `Icon` suffix (`ChevronDownIcon`)
- Sizes: `var(--icon-size-small)` (20px), `var(--icon-size-medium)` (24px), some illustrations also expose 48px
- If the design needs an icon that isn't in the library, ASK before creating a new SVG

### When using Figma MCP
1. Call `search_design_system` first to locate the component
2. Call `get_design_context` (or `get_screenshot`) with the node ID — never guess
3. Extract ONLY what the screenshot shows
4. Use CSS variables from `tokens/` for every color, sizing, and radius value
5. If text content shows "Text" or "Title" placeholders, keep them as shown (they're slot defaults)
6. Do NOT add hover, focus, or animation states unless they are explicit Figma variants OR the user requests them
7. Do NOT add interactive behavior unless requested
8. Ask for clarification if the design is ambiguous

### Figma source
- File key: `4WZWeGkM9pNR8Y0c3X8z3H`
- Library key: `lk-7c7e58e347fc69a0e6119bc6175e28d8a30a1a6f84acaf098fd9627b3af1c5631355e19621e577ed7259c6ccab4284e2936dc4c1ace7da2316045749b7d881bf`
- Primary library: **Atlas Library**

---

## Quick rules that apply to both contexts

- **Font**: Rubik, weights 400 + 500 only — never Helvetica, Arial, Inter, or weight 700
- **Radius**: `var(--radius-default)` (4px) for buttons/inputs/cards; `var(--radius-full)` for Tag/Label/Chip pills
- **Class prefix**: every component class starts with `tt-`
- **No Tailwind**: not in CSS files, not in JSX `className` strings, not in HTML prototypes
- **No invented colors / icons / components** — if it isn't in the manifest or tokens, ask
