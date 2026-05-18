# The Designer's Playbook: Build an AI-Ready Component Library from Figma

A practical, beginner-friendly walkthrough of how to take your existing Figma component library and your existing product code, and turn them into a Claude-readable design system — so AI tools (Claude Code, Claude.ai, Figma Make, v0, Lovable) build prototypes that look exactly like your product, and the prototype code is structured so engineers can re-use it in production.

This is the same recipe behind the Tripletex Atlas library in this repo. You can use Atlas as a live reference at every step.

---

## Who this is for

You are a designer (or design systems lead). You have:

- A Figma file with components and variants
- A real product, with real production code you can read
- Curiosity about AI but not necessarily a coding background

You don't need to be a developer. You do need to be a little patient on Day 1 — once the foundation is in place, every component after the first builds in minutes.

---

## What you'll end up with

```
your-component-library/
├── tokens/              ← colors, spacing, typography as CSS variables
├── components/          ← one folder/file per component (Button, Input, etc.)
├── prototypes/          ← Claude-built HTML/React prototypes that use the library
├── manifest.json        ← the AI-readable inventory of every component
├── prompt-rules.md      ← the rulebook Claude reads before writing any code
├── CLAUDE.md            ← project-specific instructions for Claude Code
└── README.md            ← human-readable overview
```

The end result: when someone (designer, PM, engineer) says to Claude *"build me a settings page using our design system"*, Claude reads `manifest.json` + `prompt-rules.md` + `tokens/`, then builds a page that looks like it came out of your real product.

---

## Time estimate (be honest)

- **Phase 1 (Figma prep):** half a day to one day. This is the most important phase and the only one you can't speed up by talking to Claude.
- **Phase 2–4 (repo + 3 magic files):** half a day with Claude's help.
- **Phase 5 (first component end-to-end):** 1–2 hours, mostly learning the loop.
- **Each subsequent component:** 10–30 minutes.
- **First usable prototype:** end of Day 2.

---

## Phase 1 — Prep your Figma file

> **Why this matters most.** Claude can read your Figma via an MCP plugin, but what Claude sees is exactly what your file says. Sloppy naming → sloppy code. Variants without rhyme or reason → broken components. Half of a great component library is great Figma hygiene. Spend the time here.

### 1.1 Convert every color, spacing, and font to a Figma Variable

Figma Variables are tokens with names. Instead of `#0A41FA` floating in a fill, you have a variable called `action/primary/rest` that holds `#0A41FA`. The variable name becomes the CSS variable name later — that's the entire bridge between design and code.

**Do this for:**

- **Colors** — every fill, stroke, and text color. Group them semantically (`surface/background`, `surface/default`, `text/primary`, `border/muted`, `action/primary/rest`, etc.). Don't just dump them as `blue-100`, `blue-200`. Semantic names like `text/primary` survive rebrands; raw color names don't.
- **Spacing** — your 4 / 8 / 12 / 16 / 24 / 32 / 48 scale. Use one variable per step (`spacing/4`, `spacing/8`, etc.).
- **Typography** — font family, sizes, weights, line heights. At minimum: heading XL/L/M/S, body L/M/S, caption.
- **Radius** — `radius/default` (probably 4px), `radius/full` (for pills), plus any one-offs.
- **Border widths** — usually just 1px and 2px.

**The naming rule that saves you later:** use slashes for hierarchy, hyphens for compound words, all lowercase. So `surface/info/rest`, `action/secondary/hover-state`, `text/on-action`. These exact names will become `--surface-info-rest`, `--action-secondary-hover-state`, `--text-on-action` in CSS — a literal 1:1 conversion.

**The semantic-vs-global split.** Have two layers:

- **Global tokens** — raw palette. `blue/100 = #0A41FA`, `grey/40 = #ABAFB7`. These are the "ingredients."
- **Semantic tokens** — what those ingredients *mean*. `action/primary/rest = blue/100`, `text/primary = grey/100`. These are the "recipes."

Components use semantic tokens. Semantic tokens point to global. If you rebrand, you swap the global palette and every component updates. Atlas does this in `tokens/colors.css` — open it for a reference.

### 1.2 Name your components like a developer would

Claude reads component names literally. `Button/Primary/Large` becomes a `<Button variant="primary" size="large">` in code. Be deliberate.

**Naming rules:**

- One component per "thing." Button is one component with variants, not 12 separate "PrimaryButton", "SecondaryButton" components.
- Use Figma's `/` to express variants and sizes. `Button/Primary/Medium`, `Input/Default/Error`, `Tag/Filter/Removable`.
- Properties first, sizes second. The order matters because Claude reads it as `variant="primary" size="medium"`.
- Avoid suffixes like `-copy`, `-v2`, `-final`. Delete or merge them.

### 1.3 Use Component Properties (not separate components) for variants

If you have ButtonPrimary, ButtonSecondary, ButtonTertiary as three separate Figma components, fix this first. Make ONE Button component with a variant property called `variant` whose values are `primary | secondary | tertiary`.

**Good Figma structure for a Button:**

```
Button (component set)
├── Variant property:  primary | secondary | tertiary | ghost
├── Size property:     small | medium | large
├── State property:    rest | hover | active | disabled
├── Icon-left:         boolean
├── Icon-right:        boolean
└── Loading:           boolean
```

Why this matters: each property becomes a React prop. Claude will generate `<Button variant="primary" size="medium" iconLeft={<PlusIcon />} />` and the engineer reading it will know exactly what every prop does, because every prop matches a Figma property the designer chose.

### 1.4 Auto-layout everywhere

Every component must use Figma auto-layout. No "manually positioned" rectangles. Auto-layout maps directly to CSS flexbox — Claude reads spacing, padding, gap, alignment from auto-layout and writes the matching CSS. If your component is a free-form drawing, Claude has to guess, and guesses go badly.

Inside a Button: horizontal auto-layout, gap matches your spacing token, padding matches your spacing token, vertical-center alignment.

### 1.5 Name layers like code

Inside a component, name the layers as if you were a developer:

- The wrapper layer: `button` (not `Frame 12`)
- Icon slot: `icon-left`, `icon-right`
- Text layer: `label`

Claude will use these as CSS class names (`tt-button`, `tt-button__icon-left`, `tt-button__label`). Junk Figma names like `Frame 12` produce junk class names like `frame12`.

### 1.6 Document edge cases visually

Add a separate page in Figma called something like "Component states & rules" where you draw out:

- Disabled looks like this
- Loading looks like this
- With error message looks like this
- The longest possible text wraps like this
- Empty state looks like this

Claude will see these and build the matching component states. If you don't show them, Claude has to imagine them — and imagined states are wrong half the time.

### 1.7 The Figma readiness checklist

Before you move on to Phase 2, every component should pass this check:

- [ ] Uses Figma Variables for every color, spacing value, font, and radius
- [ ] Has a clear, hierarchical name (`Button/Primary/Medium`)
- [ ] Uses Component Properties for variants (not separate components)
- [ ] Uses auto-layout from top to bottom
- [ ] Has named layers (`button`, `icon-left`, `label`)
- [ ] Shows all relevant states (rest, hover, disabled, error, loading)
- [ ] Has a one-line description in Figma's component description field

If even half your components fail this check, fix the most-used ones first (Button, Input, Card, Modal, Tag/Chip). Pareto rules: 20% of your components carry 80% of usage.

---

## Phase 2 — Read your production code (the secret sauce)

> **Why this matters.** If you want your prototypes to be re-usable in production, the component library has to use the same code shape your engineers already use. Otherwise you build something pretty but throwaway.

### 2.1 Open 3 representative components from production

Pick three:

- A simple one (Button or Tag)
- A medium one (Input or Dropdown)
- A complex one (Modal or Table)

Save them somewhere you can find them — in your project folder, a Slack saved-items, anywhere. These are gold for Claude later.

### 2.2 Write down (or copy) the answers to these 8 questions

This becomes your "code conventions cheat sheet." Spend 30 minutes on it.

1. **What framework?** React + TypeScript? Vue? Svelte? Vanilla JS?
2. **How is styling done?** Plain CSS files? CSS Modules? Styled-components? Tailwind? CSS-in-JS?
3. **What's the class naming convention?** BEM (`btn btn--primary`), camelCase modules (`styles.button`), utility classes (`px-4 py-2`), something custom?
4. **Where do files live?** `src/components/Button/Button.tsx + Button.css`? One file? In an `atoms/` folder?
5. **How are types written?** Inline `type ButtonProps = {...}`? Separate `.types.ts` file? PropTypes?
6. **How are components imported?** Default exports (`import Button from "./Button"`) or named (`import { Button } from "./Button"`)?
7. **Are icons inline SVGs, imports, or an icon font?**
8. **Are there any "do not use" lists?** Banned libraries, banned patterns, banned colors. (Tripletex bans Tailwind, for example.)

The answers go into your `prompt-rules.md` later. Without this, Claude will use whatever Claude is used to (usually Tailwind + styled-components + camelCase), which won't match your product.

### 2.3 Look for an existing internal docs folder

Many engineering teams already have a `STYLE_GUIDE.md`, `CONTRIBUTING.md`, or `architecture/` folder. If yours does, that's a head start. Read it, then ask the lead engineer "what's missing?"

---

## Phase 3 — Set up your repo

You can do every step here by asking Claude, but here's what it'll look like.

### 3.1 Folder structure to aim for

```
your-component-library/
├── tokens/
│   ├── colors.css
│   ├── spacing.css
│   ├── typography.css
│   └── index.css       (imports the above)
├── components/
│   ├── Button.tsx
│   ├── Button.css
│   ├── Input.tsx
│   ├── Input.css
│   └── index.ts        (exports every component)
├── prototypes/         (Claude builds prototypes here)
├── manifest.json
├── prompt-rules.md
├── CLAUDE.md
├── README.md
└── package.json
```

### 3.2 The prompt to scaffold this

Open Claude Code in an empty folder and paste:

> *"I want to build an AI-readable component library based on my Figma file and my product's code. I'm a designer, not a developer — explain what you're doing as you go. Start by scaffolding the folder structure: a Vite + React + TypeScript project with folders for `tokens/`, `components/`, `prototypes/`, plus empty placeholder files for `manifest.json`, `prompt-rules.md`, `CLAUDE.md`, and `README.md`. Don't add any components yet. After scaffolding, list every file you created and what it's for."*

Claude will create the structure, explain each piece, and you'll have a clean starting point.

---

## Phase 4 — Build the three files that make Claude smart

These three files are why Atlas works. They are the entire reason Claude doesn't reach for Tailwind every time it generates a button.

### 4.1 `tokens/colors.css` (and `spacing.css`, `typography.css`)

This is your Figma Variables, written as CSS. The format:

```css
:root {
  /* Surfaces */
  --surface-default: #ffffff;
  --surface-background: #f7f8fc;
  --surface-info-rest: #f2f5ff;

  /* Text */
  --text-primary: #2e384d;
  --text-muted: #6b7280;
  --text-action: #0a41fa;

  /* Borders */
  --border-muted: #d5d7db;
  --border-info: #6c8dfc;

  /* Actions */
  --action-primary-rest: #0a41fa;
  --action-primary-hover: #0834c7;
}
```

**The prompt to generate it from your Figma file:**

Connect the Figma MCP first (see Phase 5.1). Then:

> *"Open this Figma file `[paste your file URL]` and read all the color variables. Write them into `tokens/colors.css` as CSS custom properties. Use the exact naming from Figma — `surface/info/rest` becomes `--surface-info-rest`. Group them with comment headers (Surfaces, Text, Borders, Actions, etc.). Do not invent any colors that aren't already in the Figma file. Do the same for spacing into `tokens/spacing.css` and typography into `tokens/typography.css`."*

The first time, double-check the output against your Figma file by eye. After that, trust the process.

### 4.2 `manifest.json` — the AI-readable inventory

This is the most important file in the whole library. It's a JSON document that lists every component, every prop, every variant, every color mapping. When Claude is asked to "build a settings page using our design system," it opens this file FIRST and learns the entire system in one read.

**The shape of one entry** (this is what Atlas's Banner looks like — open `manifest.json` to see real examples):

```json
"Button": {
  "description": "Standard action button with primary, secondary, tertiary, and ghost variants.",
  "import": "import { Button } from \"./components\";",
  "props": {
    "variant": { "type": "enum", "values": ["primary", "secondary", "tertiary", "ghost"], "default": "primary" },
    "size": { "type": "enum", "values": ["small", "medium", "large"], "default": "medium" },
    "iconLeft": { "type": "ReactNode" },
    "iconRight": { "type": "ReactNode" },
    "loading": { "type": "boolean", "default": false },
    "disabled": { "type": "boolean", "default": false },
    "onClick": { "type": "function" },
    "children": { "type": "ReactNode", "description": "Button label" }
  },
  "colorMapping": {
    "primary":   { "bg": "#0A41FA", "text": "#FFFFFF" },
    "secondary": { "bg": "#E6EBFF", "text": "#0A41FA" }
  },
  "styling": {
    "height":  { "small": "24px", "medium": "32px", "large": "40px" },
    "padding": "9.5px 12px",
    "radius":  "4px",
    "font":    { "family": "Rubik", "size": "14px", "weight": 400 }
  },
  "usage": "<Button variant=\"primary\" onClick={handleSave}>Save</Button>"
}
```

**Why this format works for AI.** Every prop lists exact values. Every variant lists exact hex codes. The `usage` field shows a worked example. Claude doesn't have to guess what your Button looks like — it can just read.

**The prompt to start the manifest:**

> *"Read `tokens/colors.css`, `tokens/spacing.css`, and `tokens/typography.css`. Then create `manifest.json` with this top-level structure: a `library` block describing my product, a `tokens` block summarizing what's in the token files, and an empty `components` block I'll fill in component by component. Look at `manifest.json` in `[link to Atlas repo]` as a reference for shape and detail level."*

Then, every time you build a component, you add its entry.

### 4.3 `prompt-rules.md` — the rulebook

This is a human + AI readable document that says **"here is the way we build UI."** Claude reads it before writing any code. The rules from Atlas's `prompt-rules.md` that you should adapt:

1. **Two rules above all others.** "Read first, generate second" (always open the manifest and tokens) and "Ask before inventing" (don't make up new components/colors/icons).
2. **Hard rules.** "No Tailwind." "No inline hex values — use tokens." "Font is Rubik, never Inter or Arial." "Border radius is 4px almost always." Make YOUR version of this list — what your engineering team actually allows and forbids. This is where Phase 2.2 (the 8 questions) lives.
3. **Color tables.** A markdown table with every semantic token, its hex, and what it's used for. Even though tokens are in CSS, having them in markdown lets Claude reason about them without opening another file.
4. **Component sections.** One section per component with the exact class names, CSS skeleton, and "when to use this vs that." Open the Atlas `prompt-rules.md` Section 6 to see what "good" looks like.
5. **Examples table.** A few worked snippets — what a form looks like, what a modal looks like, what an empty state looks like.

**The prompt to scaffold it:**

> *"Create `prompt-rules.md`. Structure it like this: (1) Hard rules — list the framework, the styling approach, the font, the border-radius default, and any banned patterns from my product's code. I'll paste those in. (2) Color palette section with semantic tokens. (3) Typography section. (4) Spacing section. (5) Per-component sections — leave these blank for now, I'll fill them in as we build components. Use the Atlas prompt-rules.md at `[Atlas repo URL]` as a structural reference but don't copy the content — the rules are different for my product."*

### 4.4 `CLAUDE.md` — project-specific instructions

This is a file Claude Code automatically reads when you open the project. Put the short version of your rules here:

```markdown
# CLAUDE.md — Project rules for our component library

Before writing any code:
1. Read `manifest.json` to learn what components exist
2. Read `prompt-rules.md` for styling rules
3. Read `tokens/colors.css`, `tokens/spacing.css`, `tokens/typography.css`

Never:
- Use Tailwind (we use plain CSS + CSS variables)
- Invent new colors (everything must come from the tokens)
- Build a custom button/input/modal when one exists in the library
- Use Inter, Arial, or any font other than [YOUR FONT]
```

Keep it short — it's the elevator pitch. The full details live in `prompt-rules.md`.

---

## Phase 5 — Build your first component with Claude

This is where it gets fun. You'll build one Button end-to-end, and you'll see the loop.

### 5.1 Install the Figma MCP plugin

The Figma MCP (Model Context Protocol) lets Claude read directly from your Figma file. Without it, you'd be copy-pasting designs as screenshots.

Install steps:

1. In Claude Code, open Settings → MCP Servers.
2. Add the Figma MCP server (Figma's official one, search "Figma MCP" in their docs for the latest install command).
3. Authenticate with your Figma account.
4. Verify it works: ask Claude *"can you read Figma file [paste URL]"* — Claude should respond with metadata about the file.

Once connected, Claude can call `get_screenshot` and `get_design_context` on any node in your Figma file. This is the bridge that makes "1:1 to Figma" possible.

### 5.2 The "build me a component" prompt

Here's the prompt template. Copy it, fill in the slots in **[brackets]**, and paste into Claude Code:

> *"Build the Button component from our design system. Steps to follow:*
>
> *1. Read `manifest.json`, `prompt-rules.md`, and `tokens/colors.css` first.*
> *2. Open this Figma node `[paste Figma URL to the Button component]` and fetch its design context.*
> *3. Look at this production reference file: `[paste path to a real component from your production code, e.g. ./reference/ProductionButton.tsx]`. Match its file structure, class naming convention, import style, and TypeScript typing approach.*
> *4. Create `components/Button.tsx` and `components/Button.css` using:*
>    - *The exact CSS variables from `tokens/colors.css` — no hex codes*
>    - *The class naming convention from the production reference file*
>    - *Every variant, size, and state shown in Figma*
>    - *TypeScript types matching the production reference*
> *5. Add a barrel export to `components/index.ts`.*
> *6. Add a full entry for Button to `manifest.json` using the same shape as the other entries.*
> *7. Add a `### Button` section to `prompt-rules.md` with the CSS skeleton and a usage example.*
>
> *Stop after each step and show me what you did so I can verify before you move on."*

**Why this prompt works.**

- It tells Claude what to read first (so it doesn't invent things)
- It points to Figma (1:1 visual match)
- It points to your production code (1:1 code shape)
- It asks for the manifest and rules updates (so the library stays consistent)
- It asks Claude to pause between steps (so you catch problems early)

### 5.3 The verification checklist after Claude builds it

For every component, before you accept it, check:

- [ ] **Visual match.** Open the prototype, screenshot it, compare side-by-side with Figma. Spot the differences.
- [ ] **Tokens, not hex.** Open the CSS file and grep for `#`. The only `#` should be in comments. Every color should be a `var(--...)`.
- [ ] **No Tailwind.** Grep for `className="px-` or `flex-row` — if you see them, Claude slipped.
- [ ] **Class names match your convention.** If your product uses BEM (`btn btn--primary`), Claude's output must too.
- [ ] **Manifest updated.** Open `manifest.json` and check the new entry is there with props, colorMapping, styling, usage.
- [ ] **Prompt-rules updated.** Open `prompt-rules.md` and check the new section was added.
- [ ] **Barrel export updated.** Open `components/index.ts` and check the new line.

If any of those fail, tell Claude: *"You missed step 5/6/7 — please complete it."* Don't accept partial work; it compounds.

---

## Phase 6 — Make Claude use your product's code patterns

This is the trick that makes prototypes engineer-friendly: when Claude generates a Button, it should look like a Button your engineers would write, not like a Button from a Claude-trained tutorial.

### 6.1 Build a "reference" folder

Inside your repo, create `reference/`. Drop in:

- 2–3 real production component files (anonymize sensitive parts if needed)
- Your team's `STYLE_GUIDE.md` if you have one
- A `README.md` that says "these are the patterns Claude should mirror"

### 6.2 Point Claude at it explicitly

In every "build a component" prompt, add:

> *"Look at `reference/ProductionButton.tsx` and `reference/ProductionInput.tsx`. Match these exactly: file structure, import order, type declarations, class naming, comment style, and any patterns you see (forwardRef, default props, error handling, etc.). If you see a pattern in the references, follow it. If you're tempted to use a pattern that isn't in the references, stop and ask me."*

This single paragraph is worth more than every other instruction combined. It anchors Claude to your real code.

### 6.3 The "do not use" list

In `prompt-rules.md`, add a section called **"Banned in this project"** with everything your engineering team doesn't allow:

```markdown
## Banned in this project
- No Tailwind
- No styled-components / Emotion / CSS-in-JS
- No utility-first class systems
- No Material UI / Chakra / Radix (we have our own)
- No `useState` for form state — use react-hook-form
- No `any` types in TypeScript
- No inline styles in JSX (`style={{...}}`)
- No icon libraries other than our internal icon set
```

Adapt this to YOUR team. Show it to your tech lead and ask "what's missing?"

---

## Phase 7 — Build your first prototype

Once you've built 5–10 core components (Button, Input, Tag, Modal, Dropdown, Table, PageHeader, Sidebar, Topbar), you can build real prototypes.

### 7.1 The prototype prompt template

> *"Build a prototype HTML file at `prototypes/[descriptive-name].html` for [describe what the page should do — e.g., "a settings page where users can change their name, email, and notification preferences"].*
>
> *Use only the components in `manifest.json`. Use only the tokens in `tokens/colors.css`. Follow `prompt-rules.md` strictly — no Tailwind, no invented colors, no custom buttons.*
>
> *If the design needs something that isn't in the library, stop and tell me what's missing before building anything. Don't invent."*

The "stop and tell me what's missing" clause is gold. It turns Claude from a generator into a collaborator. Half the time, what's missing is just a misunderstanding ("oh, you mean Tag, not Chip"). The other half, it's a real gap and you've identified your next component to build.

### 7.2 Inspect the prototype side-by-side with the live product

Run it locally (`npm run dev` if you scaffolded with Vite), open the prototype in one browser window, your real product in the other. They should be visually indistinguishable. If they're not, identify why and either:

- Update the relevant component
- Update the relevant token
- Update `prompt-rules.md` to prevent the drift next time

---

## Phase 8 — Share with your team

Once you have ~15 components + a few prototypes, your library is consumable by your team. Here's how to onboard people.

### 8.1 The README that engineers will actually read

Three sections:

1. **What this is** — one paragraph: "This is our AI-readable component library. Designers use it to prototype. Engineers use the same components in production. Claude/v0/Figma Make all know about it because of `manifest.json` + `prompt-rules.md`."
2. **Quick start** — three commands: install, run, view.
3. **How to add a component** — link them to your "build a component" prompt template.

### 8.2 The PM/designer one-pager

A separate doc — `USAGE.md` — written for non-engineers:

- "Here's how to ask Claude for a prototype using our system"
- "Here are 5 starter prompts you can copy-paste"
- "Here's what to do if Claude builds something off-brand"

### 8.3 Demo it

Book a 30-minute session with your team. Live-prototype something. Watching it happen converts skeptics faster than any doc.

---

## A realistic Day 1 / Week 1 / Month 1 plan

### Day 1
- Read this whole playbook (1 hour)
- Phase 1: pick 5 of your most-used components and clean up their Figma (Button, Input, Modal, Tag, Dropdown). Don't do all of them yet — just these 5. (3 hours)
- Phase 2: write down the 8 answers, save the 3 reference files. (1 hour)
- Phase 3: scaffold the repo with Claude. (30 min)

### Week 1
- Phase 4: build the 3 magic files (`tokens/`, `manifest.json`, `prompt-rules.md`). (1 day)
- Phase 5: build your first 3 components (Button, Input, Tag) end-to-end. (2 days)
- First prototype attempt — try to build a simple form. See what breaks. (1 day)

### Month 1
- Get to 15–20 components covering the most common patterns (forms, navigation, feedback, layout).
- Build 3–5 prototypes covering your most common user flows.
- Demo to your team. Onboard 1–2 early adopters.
- Iterate on `prompt-rules.md` every time Claude does something off-brand.

By Month 3 you should have ~40 components and your team should be using Claude+the library for first-pass prototyping by default.

---

## Common problems & fixes

| Problem | Cause | Fix |
| --- | --- | --- |
| Claude uses Tailwind even though I said not to | Rule isn't loud enough | Add "No Tailwind" to BOTH `CLAUDE.md` AND `prompt-rules.md` and put it at the very top. |
| Generated code uses `#0A41FA` instead of `var(--action-primary-rest)` | Token rule isn't enforced | Add "No inline hex values" as a hard rule in `prompt-rules.md`. Tell Claude to grep its own output for `#` before finishing. |
| Component looks like Figma but doesn't match production code style | No reference files provided | Drop production files into `reference/` and point to them in every prompt. |
| Claude invented a new color/component I didn't ask for | The "ask before inventing" rule isn't there | Add it as Rule 2 in `prompt-rules.md`. Atlas's wording: *"Ask before inventing. If a component, pattern, color, icon, or illustration isn't in the manifest, stop and ask before inventing one."* |
| The first 5 components took forever | Normal | The system is loading. Component #1 takes 2 hours. Component #20 takes 10 minutes. You're paying down a one-time cost. |
| Figma MCP can't find my file | Permissions or wrong URL | Make sure the file is shared with the email associated with your Figma MCP auth. The URL must be the design URL, not a prototype URL. |
| Components drift over time as different people add them | No reviewer | Treat `manifest.json` updates as PRs. One person (you) reviews every new entry. |

---

## Reference: how Tripletex Atlas is organized

You can clone or browse this repo to see a working example:

- **`tokens/colors.css`** — the full color system as CSS variables. Open this to see naming convention examples.
- **`tokens/spacing.css`, `tokens/typography.css`** — the rest of the design system.
- **`manifest.json`** — 67 components, every prop, every variant, every color mapping. This is the gold standard for "what an AI-readable manifest looks like."
- **`prompt-rules.md`** — 700+ lines of rules. Long, but every section pays off. Read sections 0 (hard rules), 2 (color palette), and 6 (per-component rules) first.
- **`CLAUDE.md`** — the short version for Claude Code.
- **`components/Button.tsx` + `Button.css`** — what a "good" component looks like in this library. Open both files side by side.
- **`prototypes/tips-widget.html`** — a worked example of a Claude-built prototype that follows every rule.

Don't copy Atlas verbatim. Your product is different, your conventions are different, your team's vocabulary is different. Use it as inspiration for the *shape* of each file, then fill it with your content.

---

## One last thing

The single biggest mistake at the start is **trying to do everything at once.** Don't.

Pick 5 components from Figma. Build them really well. Show the result to one engineer. Get one piece of feedback. Iterate.

The library grows in months, not days. But Day 1 you can already make Claude build prototypes that look like your product — and that alone is worth the effort.

Good luck. You've got this.
