# How to Prototype with the Tripletex Atlas Component Library

This is an AI-readable mirror of the Tripletex **Atlas** design system. It contains every component with its props, variants, colors, spacing, typography, icons, and illustrations — packaged so AI tools can generate accurate Tripletex prototypes.

You can use it to generate prototypes by describing what you want in plain language. No coding required.

Below are **2 options** — pick whichever feels best for you: one in the Claude desktop app, and one on claude.ai.

---

## Option A: Claude Code in the Desktop App (recommended)

Claude reads the full component library from the repo and writes files directly — no copy-pasting.

### What you need
- The **Claude desktop app** (with Chat, Cowork, and Code tabs)
- A Claude Max subscription

### Setup (one-time, ~3 minutes)

1. **Clone the repo.** Open the Claude desktop app, click the **Code** tab, and type:

   > Clone https://github.com/cristinaiftode/tripletex-component-library and open it

2. **That's it.** Claude automatically reads `manifest.json`, `tokens/*.css`, and `CLAUDE.md` from the repo. No file uploads needed.

### How to prototype

With the repo open in the **Code** tab, just describe what you want:

> "Build me an invoice list page with a PageHeader, a TableFilter with two FilterButtons, and a Table3 with checkboxes, sortable headers, and TablePagination at the bottom"

> "Design a customer detail screen with a SidebarHeader on the left, a Tabs row, a Form with Inputs and a Combobox, and Save / Cancel Buttons in the footer"

> "Create a confirmation Modal that asks the user to delete an entry, with a danger Button and a secondary Cancel Button"

Claude will:
1. Read the manifest, tokens, and rules from the repo automatically
2. Generate the prototype as React/HTML
3. Launch a local preview so you can see it in your browser
4. Let you iterate — "make the form two columns", "add a primary CTA", "switch the tag to red"

---

## Option B: Claude Projects on claude.ai

If you prefer the web interface, this works well for quick one-off prototypes.

### What you need
- A Claude Pro or Team account at [claude.ai](https://claude.ai)

### Setup (one-time, ~5 minutes)

1. Go to [claude.ai](https://claude.ai) and click **"Create Project"**
2. Name it: `Tripletex Prototyping`
3. In the **Project Knowledge** section, upload these files from the repo:
   - `manifest.json` — every component with props, colors, sizing, icons, illustrations
   - `prompt-rules.md` — full styling rulebook (colors, typography, per-component CSS patterns)
   - `tokens/colors.css` — semantic + global color tokens
   - `tokens/spacing.css` — element heights, radii, icon sizes
   - `tokens/typography.css` — font, weights, sizes
   - `icons-reference.html` — 50 most-used icons (with real SVG path data) + 12 illustrations
4. In the **Project Instructions** box, paste the contents of `claude-project-prompt.md` from the repo
5. Start a new conversation inside the project.

### How to prototype

Same as Option A — describe what you want, and Claude generates a complete HTML/React file in the chat. Copy and save it as a file, then open in your browser.

---

## Which option should I pick?

|                    | Option A (Claude Code)        | Option B (claude.ai)              |
| ------------------ | ----------------------------- | --------------------------------- |
| **Interface**      | Desktop app → Code tab        | Web browser → claude.ai           |
| **Setup**          | Clone repo once               | Upload 5 files to a project       |
| **Output**         | Writes files directly         | Code in chat (you copy-paste)     |
| **Preview**        | Automatic, in-browser         | You save the file and open it     |
| **Iteration**      | Edits files in place          | New code block each time          |
| **Multi-page**     | Yes, creates linked files     | One file at a time                |
| **Best for**       | Serious prototyping           | Quick one-off mockups             |

**Recommendation:** Try Option A first. It's a better experience once the repo is cloned.

---

## A note on other tools (Lovable, v0, Bolt, Cursor, etc.)

The spec is plain text, so any AI tool that reads text can in principle use it. In practice, the experience varies:

- **Tools that clone repos** (Cursor, Windsurf, Claude Code) — drop-in. Same as Option A.
- **Tools with strong opinionated defaults** — chiefly **Lovable**, but also v0 and Bolt to a lesser degree — generate React + Tailwind + shadcn/ui by default. Tripletex uses none of those. They *can* be steered to your spec, but you have to be explicit in the opening prompt:

  > *"Do NOT use Tailwind, shadcn, or any UI library. Use plain CSS with the `tt-` BEM class prefix. Read the attached `manifest.json`, `tokens/colors.css`, and `prompt-rules.md` and use ONLY values defined there."*

  Even with that framing, expect to course-correct more than in Claude Code or claude.ai. For quick PM mockups, Options A and B are smoother.

If you want to compare, build the same screen in two tools and judge which output you'd actually take to a stakeholder.

---

## What's in the library?

### Components (67 entries in `manifest.json`)

| Category        | Components                                                                                              |
| --------------- | ------------------------------------------------------------------------------------------------------- |
| **Buttons**     | Button, IconButton, ToggleButton, FilterButton, TableFilterIconButton                                   |
| **Inputs**      | Input, Textarea, Select, Combobox, Checkbox, RadioGroup, Switch, Slider, DatePicker                     |
| **Display**     | Tag, Label, Tooltip, MultilineTooltip, Badge, Avatar, AvatarGroup, StatusMarker, Shortcut               |
| **Navigation**  | Tabs, Breadcrumb, Pagination, TablePagination, SidebarHeader, SidebarItem, SubitemIcons                 |
| **Feedback**    | Modal, Dialog, Banner, Toast, InlineSpinner, Spinner, ProgressBar, Skeleton, SuccessIllustration        |
| **Overlays**    | Popover, PopoverOpener, PopupMenu, PopupMenuItem, PopupGroupHeader                                      |
| **Tables**      | Table3 (standard), DashboardTable, TableFilter, SavedFilterItem                                         |
| **Layout**      | PageHeader, Card, Divider, Autosave                                                                     |
| **Icons**       | Icon (110 names) + the IconName / Icons map                                                             |
| **Illustrations** | 12 SVGs: celebration, cloud-check, coins, error, ghost, ghost-sad, reject, rocket, send, success, trash, user |

### Design tokens

- **Colors** — full Atlas palette (grey/blue/turquoise/green/red/yellow/purple in 05–120 scale) plus the complete semantic mapping (`--text-*`, `--surface-*`, `--border-*`, `--action-*`)
- **Spacing** — element heights (tiny 20 / small 24 / medium 32 / large 40 px), radii (4 / full), icon sizes (20 / 24 / 48 px)
- **Typography** — Rubik 14/1.4, weight 400 default

Every value in `manifest.json` is given as both the CSS variable name (`var(--action-primary-rest)`) and the resolved hex/px (`#0A41FA`) — so prototyping tools without access to `tokens/*.css` still get the actual values.

---

## Tips for better results

- **Be specific:** "a primary Button with the rocket icon" beats "a button"
- **Use component names from the manifest:** "use a Combobox for country selection" instead of "add a dropdown"
- **Reference Table3 for any data table** — it's the standard Atlas table; use `DashboardTable` only inside dashboard cards
- **Describe layout:** "two columns: left side has the Form, right side has a Card with totals"
- **Iterate:** "make the buttons smaller", "switch the Tag to attention red", "add a TablePagination"
- **For complex prototypes, build the shell first** (PageHeader + Tabs + Sidebar), then add content sections one by one
