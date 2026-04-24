import "./ColorsPage.css";

type Swatch = { name: string; token: string; value: string };
type Scale = { title: string; swatches: Swatch[] };

const misc: Swatch[] = [
  { name: "Misc/White", token: "--global-misc-white", value: "#FFFFFF" },
  { name: "Misc/Background", token: "--global-misc-background", value: "#F7F8FC" },
  { name: "Misc/Contrast", token: "--global-misc-contrast", value: "#010A59" },
  { name: "Misc/Transparent", token: "--global-misc-transparent", value: "#FFFFFF (0%)" },
];

const grey: Swatch[] = [
  { name: "Grey/05", token: "--global-grey-05", value: "#F4F5F6" },
  { name: "Grey/10", token: "--global-grey-10", value: "#E9EAED" },
  { name: "Grey/20", token: "--global-grey-20", value: "#D5D7DB" },
  { name: "Grey/40", token: "--global-grey-40", value: "#ABAFB7" },
  { name: "Grey/60", token: "--global-grey-60", value: "#818794" },
  { name: "Grey/71", token: "--global-grey-71", value: "#6B7280" },
  { name: "Grey/80", token: "--global-grey-80", value: "#51596A" },
  { name: "Grey/100", token: "--global-grey-100", value: "#2E384D" },
  { name: "Grey/120", token: "--global-grey-120", value: "#0F131A" },
  { name: "Grey/100-30", token: "--global-grey-100-30", value: "#2E384D (30%)" },
];

const blue: Swatch[] = [
  { name: "Blue/05", token: "--global-blue-05", value: "#F2F5FF" },
  { name: "Blue/10", token: "--global-blue-10", value: "#E6EBFF" },
  { name: "Blue/20", token: "--global-blue-20", value: "#CED9FE" },
  { name: "Blue/40", token: "--global-blue-40", value: "#9DB3FD" },
  { name: "Blue/60", token: "--global-blue-60", value: "#6C8DFC" },
  { name: "Blue/80", token: "--global-blue-80", value: "#3B67FB" },
  { name: "Blue/100", token: "--global-blue-100", value: "#0A41FA" },
  { name: "Blue/120", token: "--global-blue-120", value: "#0834C7" },
  { name: "Blue/130", token: "--global-blue-130", value: "#002992" },
];

const turquoise: Swatch[] = [
  { name: "Turquoise/05", token: "--global-turquoise-05", value: "#F4FAFA" },
  { name: "Turquoise/10", token: "--global-turquoise-10", value: "#E8F5F5" },
  { name: "Turquoise/20", token: "--global-turquoise-20", value: "#D4EBEB" },
  { name: "Turquoise/40", token: "--global-turquoise-40", value: "#ABD6D6" },
  { name: "Turquoise/60", token: "--global-turquoise-60", value: "#80C1C2" },
  { name: "Turquoise/80", token: "--global-turquoise-80", value: "#57ADAE" },
  { name: "Turquoise/100", token: "--global-turquoise-100", value: "#30999B" },
  { name: "Turquoise/120", token: "--global-turquoise-120", value: "#206768" },
];

const green: Swatch[] = [
  { name: "Green/05", token: "--global-green-05", value: "#F4FBF4" },
  { name: "Green/10", token: "--global-green-10", value: "#EAF7E9" },
  { name: "Green/20", token: "--global-green-20", value: "#D6EED5" },
  { name: "Green/40", token: "--global-green-40", value: "#ADDEAB" },
  { name: "Green/60", token: "--global-green-60", value: "#84CD81" },
  { name: "Green/80", token: "--global-green-80", value: "#5BBC57" },
  { name: "Green/100", token: "--global-green-100", value: "#33AC2E" },
  { name: "Green/120", token: "--global-green-120", value: "#247820" },
];

const red: Swatch[] = [
  { name: "Red/05", token: "--global-red-05", value: "#FEF4F5" },
  { name: "Red/10", token: "--global-red-10", value: "#FDEAEC" },
  { name: "Red/20", token: "--global-red-20", value: "#FBD6DA" },
  { name: "Red/40", token: "--global-red-40", value: "#F6AEB4" },
  { name: "Red/60", token: "--global-red-60", value: "#F1868F" },
  { name: "Red/80", token: "--global-red-80", value: "#EC5E6A" },
  { name: "Red/100", token: "--global-red-100", value: "#E83645" },
  { name: "Red/120", token: "--global-red-120", value: "#B52A36" },
];

const yellow: Swatch[] = [
  { name: "Yellow/05", token: "--global-yellow-05", value: "#FFFCF5" },
  { name: "Yellow/10", token: "--global-yellow-10", value: "#FFF9EA" },
  { name: "Yellow/20", token: "--global-yellow-20", value: "#FEF3D7" },
  { name: "Yellow/40", token: "--global-yellow-40", value: "#FCE6AF" },
  { name: "Yellow/60", token: "--global-yellow-60", value: "#FADA87" },
  { name: "Yellow/80", token: "--global-yellow-80", value: "#F8CD5F" },
  { name: "Yellow/100", token: "--global-yellow-100", value: "#F7C137" },
  { name: "Yellow/120", token: "--global-yellow-120", value: "#C4992C" },
];

const purple: Swatch[] = [
  { name: "Purple/05", token: "--global-purple-05", value: "#F9F6FF" },
  { name: "Purple/10", token: "--global-purple-10", value: "#F3EEFF" },
  { name: "Purple/20", token: "--global-purple-20", value: "#E8DDFF" },
  { name: "Purple/40", token: "--global-purple-40", value: "#D1BBFF" },
  { name: "Purple/60", token: "--global-purple-60", value: "#BA98FF" },
  { name: "Purple/80", token: "--global-purple-80", value: "#A376FF" },
  { name: "Purple/100", token: "--global-purple-100", value: "#8C54FF" },
  { name: "Purple/120", token: "--global-purple-120", value: "#7043CC" },
];

const globalScales: Scale[] = [
  { title: "Misc", swatches: misc },
  { title: "Grey", swatches: grey },
  { title: "Blue", swatches: blue },
  { title: "Turquoise", swatches: turquoise },
  { title: "Green", swatches: green },
  { title: "Red", swatches: red },
  { title: "Yellow", swatches: yellow },
  { title: "Purple", swatches: purple },
];

const logoSwatches: Swatch[] = [
  { name: "Logo / Navy", token: "--logo-navy", value: "#010A59" },
  { name: "Logo / Teal", token: "--logo-teal", value: "#5BB3C0" },
  { name: "Logo / Green", token: "--logo-green", value: "#1AB960" },
];

const sparcleSwatches: Swatch[] = [
  { name: "Sparcle / Blue", token: "--sparcle-blue", value: "#6CBCE6" },
  { name: "Sparcle / Lavender", token: "--sparcle-lavender", value: "#CBC8FB" },
  { name: "Sparcle / Sky", token: "--sparcle-sky", value: "#CCE9FD" },
  { name: "Sparcle / Mint", token: "--sparcle-mint", value: "#CFF8E6" },
  { name: "Sparcle / Lime", token: "--sparcle-lime", value: "#DDF8D0" },
  { name: "Sparcle / Yellow", token: "--sparcle-yellow", value: "#EFF9D0" },
  { name: "Sparcle / Cream", token: "--sparcle-cream", value: "#F7F1D0" },
  { name: "Sparcle / Peach", token: "--sparcle-peach", value: "#F3DCCE" },
  { name: "Sparcle / Pink", token: "--sparcle-pink", value: "#F0C9CC" },
];

const illustrationSwatches: Swatch[] = [
  { name: "Illustration / Blue", token: "--illustration-blue", value: "#0A41FA" },
  { name: "Illustration / Blue Mid", token: "--illustration-blue-mid", value: "#6C90FC" },
  { name: "Illustration / Blue Light", token: "--illustration-blue-light", value: "#90B3FD" },
  { name: "Illustration / Green", token: "--illustration-green", value: "#1AB960" },
  { name: "Illustration / Green Light", token: "--illustration-green-light", value: "#AAE3C4" },
  { name: "Illustration / Pink", token: "--illustration-pink", value: "#F6AED5" },
  { name: "Illustration / Purple Light", token: "--illustration-purple-light", value: "#CCC7FF" },
];

type TokenRow = { name: string; token: string; value: string; description?: string };
type TokenGroup = { title: string; rows: TokenRow[] };

const tokenGroups: TokenGroup[] = [
  {
    title: "Text",
    rows: [
      { name: "Primary", token: "--text-primary", value: "#2E384D", description: "Default text" },
      { name: "Muted", token: "--text-muted", value: "#6B7280", description: "Secondary text" },
      { name: "Disabled", token: "--text-disabled", value: "#51596A" },
      { name: "Placeholder", token: "--text-placeholder", value: "#ABAFB7" },
      { name: "Link", token: "--text-link", value: "#0A41FA" },
      { name: "Action", token: "--text-action", value: "#0A41FA" },
      { name: "On Action", token: "--text-on-action", value: "#FFFFFF" },
    ],
  },
  {
    title: "Surface",
    rows: [
      { name: "Background", token: "--surface-background", value: "#F7F8FC" },
      { name: "Default", token: "--surface-default", value: "#FFFFFF" },
      { name: "Nav", token: "--surface-nav", value: "#D4EBEB" },
      { name: "Disabled", token: "--surface-disabled", value: "#E9EAED" },
      { name: "Tooltip", token: "--surface-tooltip", value: "#2E384D" },
      { name: "Footer", token: "--surface-footer", value: "#010A59" },
      { name: "Modal", token: "--surface-modal", value: "#2E384D (30%)" },
    ],
  },
  {
    title: "Surface / Info",
    rows: [
      { name: "Rest", token: "--surface-info-rest", value: "#F2F5FF" },
      { name: "Hover", token: "--surface-info-hover", value: "#E6EBFF" },
      { name: "Highlight", token: "--surface-info-highlight", value: "#CED9FE" },
      { name: "Active", token: "--surface-info-active", value: "#0A41FA" },
    ],
  },
  {
    title: "Surface / Warning",
    rows: [
      { name: "Rest", token: "--surface-warning-rest", value: "#FFFCF5" },
      { name: "Hover", token: "--surface-warning-hover", value: "#FFF9EA" },
      { name: "Highlight", token: "--surface-warning-highlight", value: "#FEF3D7" },
      { name: "Active", token: "--surface-warning-active", value: "#F7C137" },
    ],
  },
  {
    title: "Surface / Error",
    rows: [
      { name: "Rest", token: "--surface-error-rest", value: "#FEF4F5" },
      { name: "Hover", token: "--surface-error-hover", value: "#FDEAEC" },
      { name: "Highlight", token: "--surface-error-highlight", value: "#FBD6DA" },
      { name: "Active", token: "--surface-error-active", value: "#E83645" },
    ],
  },
  {
    title: "Surface / Success",
    rows: [
      { name: "Rest", token: "--surface-success-rest", value: "#F4FBF4" },
      { name: "Hover", token: "--surface-success-hover", value: "#EAF7E9" },
      { name: "Highlight", token: "--surface-success-highlight", value: "#D6EED5" },
      { name: "Active", token: "--surface-success-active", value: "#33AC2E" },
    ],
  },
  {
    title: "Surface / Automation",
    rows: [
      { name: "Rest", token: "--surface-automation-rest", value: "#F9F6FF" },
      { name: "Hover", token: "--surface-automation-hover", value: "#F3EEFF" },
      { name: "Highlight", token: "--surface-automation-highlight", value: "#E8DDFF" },
      { name: "Active", token: "--surface-automation-active", value: "#7043CC" },
    ],
  },
  {
    title: "Border",
    rows: [
      { name: "Primary", token: "--border-primary", value: "#818794" },
      { name: "Secondary", token: "--border-secondary", value: "#ABAFB7" },
      { name: "Faint", token: "--border-faint", value: "#E9EAED" },
      { name: "Hover", token: "--border-hover", value: "#9DB3FD" },
      { name: "Active", token: "--border-active", value: "#0A41FA" },
      { name: "Info", token: "--border-info", value: "#6C8DFC" },
      { name: "Warning", token: "--border-warning", value: "#F7C137" },
      { name: "Error", token: "--border-error", value: "#EC5E6A" },
      { name: "Success", token: "--border-success", value: "#5BBC57" },
      { name: "Automation", token: "--border-automation", value: "#A376FF" },
      { name: "Focus", token: "--border-focus", value: "#6C8DFC" },
    ],
  },
  {
    title: "Action / Primary",
    rows: [
      { name: "Rest", token: "--action-primary-rest", value: "#0A41FA" },
      { name: "Hover", token: "--action-primary-hover", value: "#0834C7" },
      { name: "Active", token: "--action-primary-active", value: "#002992" },
    ],
  },
  {
    title: "Action / Secondary",
    rows: [
      { name: "Rest", token: "--action-secondary-rest", value: "#E6EBFF" },
      { name: "Hover", token: "--action-secondary-hover", value: "#CED9FE" },
      { name: "Active", token: "--action-secondary-active", value: "#9DB3FD" },
    ],
  },
  {
    title: "Action / Tertiary",
    rows: [
      { name: "Rest", token: "--action-tertiary-rest", value: "#FFFFFF (0%)" },
      { name: "Hover", token: "--action-tertiary-hover", value: "#CED9FE" },
      { name: "Active", token: "--action-tertiary-active", value: "#9DB3FD" },
    ],
  },
  {
    title: "Action / Neutral",
    rows: [
      { name: "Rest", token: "--action-neutral-rest", value: "#F7F8FC" },
      { name: "Hover", token: "--action-neutral-hover", value: "#CED9FE" },
      { name: "Active", token: "--action-neutral-active", value: "#9DB3FD" },
    ],
  },
];

function SwatchCard({ name, token, value }: Swatch) {
  return (
    <div className="tt-swatch">
      <div className="tt-swatch__chip">
        <div className="tt-swatch__fill" style={{ backgroundColor: `var(${token})` }} />
      </div>
      <div className="tt-swatch__meta">
        <div className="tt-swatch__name">{name}</div>
        <div className="tt-swatch__value">{value}</div>
      </div>
    </div>
  );
}

function ScaleRow({ title, swatches }: Scale) {
  return (
    <div className="tt-scale">
      <h4 className="tt-scale__title">{title}</h4>
      <div className="tt-scale__row">
        {swatches.map((s) => (
          <SwatchCard key={s.token} {...s} />
        ))}
      </div>
    </div>
  );
}

function TokenTable({ title, rows }: TokenGroup) {
  return (
    <div className="tt-token-group">
      <h4 className="tt-token-group__title">{title}</h4>
      <div className="tt-token-group__rows">
        {rows.map((r) => (
          <div key={r.token} className="tt-token-row">
            <div className="tt-token-row__chip">
              <div
                className="tt-token-row__fill"
                style={{ backgroundColor: `var(${r.token})` }}
              />
            </div>
            <div className="tt-token-row__meta">
              <div className="tt-token-row__name">{r.name}</div>
              <code className="tt-token-row__token">{r.token}</code>
            </div>
            <div className="tt-token-row__value">{r.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ColorsPage() {
  return (
    <>
      <section className="page-section">
        <h2>Colors</h2>
        <p style={{ color: "var(--text-muted)", marginTop: 0 }}>
          Full color system from the Atlas Library — raw palette, semantic tokens, brand colors.
        </p>
      </section>

      <section className="page-section">
        <h3>Global (Light Mode)</h3>
        <p style={{ color: "var(--text-muted)", margin: "0 0 16px" }}>
          Raw values are used as the foundation for defining color tokens.
        </p>
        {globalScales.map((scale) => (
          <ScaleRow key={scale.title} {...scale} />
        ))}
      </section>

      <section className="page-section">
        <h3>Tripletex Logo</h3>
        <p style={{ color: "var(--text-muted)", margin: "0 0 16px" }}>
          Tripletex logo color palette.
        </p>
        <div className="tt-scale__row">
          {logoSwatches.map((s) => (
            <SwatchCard key={s.token} {...s} />
          ))}
        </div>
      </section>

      <section className="page-section">
        <h3>Color Tokens</h3>
        <p style={{ color: "var(--text-muted)", margin: "0 0 16px" }}>
          Semantic tokens reference the raw palette. Use these in components — not the raw values.
        </p>
        <div className="tt-token-groups">
          {tokenGroups.map((g) => (
            <TokenTable key={g.title} {...g} />
          ))}
        </div>
      </section>

      <section className="page-section">
        <h3>Sparcle</h3>
        <p style={{ color: "var(--text-muted)", margin: "0 0 16px" }}>
          Brand colors to add personality, joy, unexpectedness.
        </p>
        <div className="tt-scale__row">
          {sparcleSwatches.map((s) => (
            <SwatchCard key={s.token} {...s} />
          ))}
        </div>
      </section>

      <section className="page-section">
        <h3>Illustrations</h3>
        <p style={{ color: "var(--text-muted)", margin: "0 0 16px" }}>
          Color profile for illustrations.
        </p>
        <div className="tt-scale__row">
          {illustrationSwatches.map((s) => (
            <SwatchCard key={s.token} {...s} />
          ))}
        </div>
      </section>
    </>
  );
}
