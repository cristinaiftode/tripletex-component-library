# Workshop deck — AI prototyping with the Atlas design system

**Audience:** PMs · **Length:** ~25–30 min · **Goal:** make them feel "I could try this Monday morning"

This is the slide-by-slide outline with speaker notes. Paste each section into your slide tool of choice (Google Slides, Keynote, PowerPoint).

---

## Slide 1 — Title

**Title:** AI prototyping with the Atlas design system
**Subtitle:** From idea to clickable prototype in 10 minutes
**Footer:** Cristina Iftode · DS Lead · [date]

**Speaker notes:**
> "Today I'll show you what we built so any of you can sketch a real-looking Tripletex prototype using AI — no Figma, no engineer, no design review. And in the second half, [colleague] will show how this plugs into our team's tooling."

---

## Slide 2 — The problem PMs hit every week

**Title:** "Can you just mock this up?"

**Bullets:**
- You have an idea. You can describe it in words.
- Getting from words to a believable prototype takes: a Figma artist, the right components, design review, and a few days.
- ChatGPT / Claude can build something — but it looks like generic Bootstrap, not our product.
- Stakeholders judge prototypes by how *real* they look. Generic = dismissed.

**Speaker notes:**
> "Anyone who's tried to use AI for a quick UI mock has hit this — the AI generates something workable, but it doesn't look like us. Wrong colors, wrong font, wrong button shapes. People stop engaging with it because it doesn't feel like the product they ship."

---

## Slide 3 — Why generic AI output fails

**Title:** AI doesn't know our design system

**Two-column visual:**
- **Left** — what AI gives you: rounded-2xl buttons, Inter font, purple accents, drop-shadows everywhere
- **Right** — what Atlas actually looks like: 4px-radius buttons, Rubik, `#0A41FA` blue, restrained, mostly flat

**Bullets:**
- AI models are trained on the public web → Bootstrap, Material UI, Tailwind defaults
- Atlas isn't on the public web. It's a 67-component, 110-icon system with its own tokens.
- Result: prototypes are believable for Spotify or Stripe — not for Tripletex.

**Speaker notes:**
> "The AI isn't dumb. It just doesn't know us. So we have to teach it — and that's what we built."

---

## Slide 4 — The mental model

**Title:** AI just needs a spec it can read

**Visual:** simple diagram
```
   You ────► AI ────► Prototype
              ▲
              │
        Atlas-as-code
   (manifest + rules + tokens)
```

**Bullets:**
- The AI is a builder. Atlas-as-code is the spec.
- If the spec is precise enough, the output looks like our product.
- If the spec is missing — the AI guesses (and it guesses wrong).

**Speaker notes:**
> "Think of AI tools as a junior contractor. Hand them a one-line brief and they'll do… something. Hand them a real spec and they ship to standard. We just need to write the spec — once."

---

## Slide 5 — What we built

**Title:** Atlas, packaged for AI

**Visual:** screenshot of the GitHub repo file tree

**Bullets:**
- A public repo: `cristinaiftode/tripletex-component-library`
- 5 plain-text files = the entire design system, machine-readable
- Used by any AI tool — Claude Code, claude.ai, Cursor, ChatGPT, v0, Bolt, Figma Make
- Free, open, no setup beyond cloning or uploading 5 files

**Speaker notes:**
> "Everything you need to prototype Tripletex with AI lives in one repo. There's no SDK to install, no API key, no infrastructure. Just text files."

---

## Slide 6 — What's inside the package

**Title:** 5 files, 5 jobs

**Table:**

| File | What it does |
| --- | --- |
| `manifest.json` | Catalogue of all 67 components — props, variants, colors, sizes |
| `prompt-rules.md` | The full styling rulebook — when to use what, how it should look |
| `claude-project-prompt.md` | The "system prompt" — how to start every prototype |
| `tokens/*.css` | The raw color, spacing, and typography values |
| `icons-reference.html` | 50 real icons + 12 illustrations with SVG path data |

**Speaker notes:**
> "Each file plays a specific role. The manifest is the inventory. The rules are the styling bible. The system prompt is the standing instruction. The tokens are the raw values. The icons file is so the AI never invents a chevron — it uses our real one."

---

## Slide 7 — Two rules above all others ⭐

**Title:** The two rules that keep AI on-brand

**Big-text rules (one per box):**

> **1. Read first, generate second.**
> Always read the manifest, tokens, and rules before generating anything. Sounds obvious — make it explicit anyway. It's the difference between AI using *our* system and AI reaching for what it remembers from training.

> **2. Ask before inventing.**
> If a component or pattern isn't in the manifest, stop and ask before inventing one. When you agree it's needed, AI builds it using the same styles, spacing, and language as the components that already exist.

**Sub-line under both rules:**
- These two rules prevent the vast majority of off-brand output.
- They turn AI from a *generator* into a *collaborator* — it asks, you decide, the new piece fits in with the rest.

**Speaker notes:**
> "These two rules are written into every file the AI reads. They sound obvious — but they're the difference between getting a prototype that looks like Tripletex and getting one that looks like a Bootstrap demo. Rule 2 is the magic one: instead of inventing a custom dropdown, the AI stops and asks 'do you want a Combobox or a Select for this?' That's collaboration, not generation."

---

## Slide 8 — How we built it (the process)

**Title:** 4 steps from Atlas → AI-readable spec

**Timeline / flow:**

1. **Survey** — read every component file in the repo + the Figma library
2. **Catalogue** — generate `manifest.json` with each component's props, color mapping (semantic var + resolved hex), sizing, states
3. **Codify the rules** — write the styling rulebook as prose: *"Buttons use `var(--radius-default)` (4px), never `rounded-full`. Tag/Label/Chip are pills."* Plus the two top-level rules (read first; ask before inventing).
4. **Pin the icons** — extract real SVG path data for the 50 most-used icons so the AI uses ours, not Heroicons

**Sub-bullet:**
- Built largely by Claude itself, supervised — the AI helped catalog the AI's own spec. Feedback loop: faster than hand-writing it.

**Speaker notes:**
> "We didn't write all 1,600 lines of manifest by hand. We pointed Claude at the codebase and had it extract structured data, then we reviewed and corrected. The whole package took a couple of focused sessions, not weeks. The rules — including those two top-level ones — were the part where human judgment mattered most."

---

## Slide 9 — Tool-agnostic by design

**Title:** Works wherever AI lives

**Visual:** logo grid — Claude Code · claude.ai · Cursor · Windsurf · ChatGPT · Gemini · v0 · Lovable · Bolt · Figma Make

**Bullets:**
- **If the tool can clone a repo** (Claude Code, Cursor, Windsurf): just clone — nothing else
- **If the tool only takes file uploads** (claude.ai, ChatGPT projects, v0): upload the 5 files
- **No tool lock-in** — if Claude gets worse, switch to GPT. The spec is the same.
- The same approach already works for the e-conomic library (TACO) — it generalizes.

**Speaker notes:**
> "We deliberately didn't build this around one AI tool. The spec is plain text — markdown, JSON, CSS, SVG. Any AI that can read text can use it. If your team likes Cursor, use Cursor. If you live in claude.ai, use claude.ai."

---

## Slide 10 — What this unlocks for you (PM)

**Title:** Concrete things you can do this week

**Four cards:**

1. **🔍 Test an idea before sprint planning**
   *"What would the new payments inbox actually look like?" — 10 minutes, real visuals.*

2. **🎤 Bring a prototype to user research**
   *Stop showing static Figma click-throughs. Bring something that actually responds to clicks.*

3. **📝 Write better requirements**
   *"This is what I mean" beats "imagine a screen with…" — shipping engineers love it.*

4. **⚖️ Pressure-test scope**
   *Before committing to a feature, ask AI to build it. If it stops to ask "do you have a component for X?" — you've found a scope question before sprint.*

**Speaker notes:**
> "These are all things that today take days. With the library + AI, they take 20 minutes. And notice card 4 — when AI asks 'do you have a component for X?' that's actually a scope-discovery tool. The library makes AI surface gaps before you build them."

---

## Slide 11 — Live demo (or recording)

**Title:** 5-minute build

**Slide content:** screenshot of the resulting prototype + the exact prompt used

**Suggested prompt for live demo:**
> *"Build me an invoice list page: Topbar with the Tripletex logo, Sidebar with items 'Dashboard', 'Invoices', 'Customers', 'Reports'. Main content: PageHeader 'Invoices' with a primary 'New invoice' Button. Below: TableFilter with a SearchInput and two FilterButtons ('Status', 'Customer'). Then a Table with columns Number, Customer, Date, Amount, Status (using Label component) — 6 rows. TablePagination at the bottom."*

**Speaker notes:**
> "I'll either run this live or play a 90-second recording. Watch for one moment in particular — the AI will reference the Label component for status badges instead of building a custom one. That's Rule 2 in action."
>
> *(If running live: have a backup recording in case Wi-Fi or the model is slow.)*

---

## Slide 12 — Get started Monday

**Title:** Try it yourself

**Bullets:**
- Repo: `github.com/cristinaiftode/tripletex-component-library`
- `USAGE.md` walks through Claude Code, claude.ai, and other tools
- 5 minutes to set up · works on your laptop · no admin / no install
- Slack #design-systems for questions

**QR code or link:**
- QR to the repo
- Or: bit.ly short link

**Speaker notes:**
> "If you take one thing from this: clone the repo today, try the prompt from the demo. If it works for you, share with your team. If it doesn't, ping me — that's how we improve the spec."

---

## Slide 13 — What's next & handoff

**Title:** From spec to plugin

**Bullets:**
- This is the foundation: a portable, tool-agnostic spec
- Next layer: integrating it into the workflows we already use
- **Over to [colleague name]** — they'll show the plugin we built so this lives inside [tool/IDE/etc.] without the manual upload step

**Speaker notes:**
> "What I showed you is the universal layer. But uploading 5 files every time is friction. My colleague's team built a plugin that handles all of that automatically — same spec, less ceremony. Over to them."

---

## Optional appendix slides (if you have time)

- **What we deliberately left out**: hover animations, dark mode, mobile-only patterns — to keep the spec tight
- **Maintenance**: when Atlas changes, `manifest.json` is regenerated from the source — single source of truth
- **Honest limitations**: charts are still hard, complex Table3 interactions need manual touch-ups, accessibility review still happens with humans
- **The full rulebook**: 16 sections covering color palette, typography, sizing, every component pattern, focus/hover/disabled states, mandatory dropdown JS, layout conventions
