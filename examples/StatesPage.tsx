import { useState } from "react";
import { Button } from "../components/Button";
import { ActionButton } from "../components/ActionButton";
import { Alert, type AlertVariant } from "../components/Alert";
import {
  Spinner,
  InlineSpinner,
  type SpinnerSize,
  type SpinnerSpeed,
} from "../components/Spinner";
import { Radio } from "../components/Radio";
import { Toggle } from "../components/Toggle";
import { Status, type StatusVariant } from "../components/Status";
import {
  ProgressStepper,
  type ProgressStepperType,
  type ProgressStepperDirection,
} from "../components/ProgressStepper";
import {
  ModifierKey,
  Shortcut,
  type ModifierKeyName,
  type ModifierKeyOS,
} from "../components/ModifierKey";
import { Tooltip, MultilineTooltip, type TooltipArrow } from "../components/Tooltip";

export function StatesPage() {
  const [dismissed, setDismissed] = useState<Record<string, boolean>>({});
  const dismiss = (key: string) => setDismissed((d) => ({ ...d, [key]: true }));
  const visible = (key: string) => !dismissed[key];
  const variants: AlertVariant[] = ["info", "success", "warning", "error", "automation"];

  return (
    <>
      <section className="page-section">
        <h2>States — loading, empty, error</h2>
        <p style={{ color: "#51596a", marginTop: 0 }}>
          Components on this page: Skeleton, Spinner, Alert, PageHeader, Button.
        </p>
      </section>

      <SpinnerShowcase />

      <section className="page-section">
        <h3>Empty state — Button CTA</h3>
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <div className="placeholder" style={{ display: "inline-flex", marginBottom: 16 }}>
            Empty-state illustration
          </div>
          <h3 style={{ margin: 0 }}>No invoices yet</h3>
          <p style={{ color: "#51596a" }}>Create your first invoice to get started.</p>
          <Button variant="primary">Create invoice</Button>
        </div>
      </section>

      <section className="page-section">
        <h3>Alert — all variants (desktop)</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {variants.map((v) =>
            visible(`desktop-${v}`) ? (
              <Alert
                key={v}
                variant={v}
                size="desktop"
                onClose={() => dismiss(`desktop-${v}`)}
              >
                Some message. <a href="#" className="tt-alert__link">Read more</a>
              </Alert>
            ) : null
          )}
        </div>

        <h3 style={{ marginTop: 24 }}>Alert — all variants (mobile)</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 12,
            maxWidth: 640,
          }}
        >
          {variants.map((v) =>
            visible(`mobile-${v}`) ? (
              <Alert
                key={v}
                variant={v}
                size="mobile"
                onClose={() => dismiss(`mobile-${v}`)}
              >
                Some message. <a href="#" className="tt-alert__link">Read more</a>
              </Alert>
            ) : null
          )}
        </div>

        <h3 style={{ marginTop: 24 }}>Alert — without close button</h3>
        <Alert variant="error">
          Failed to load invoices. <a href="#" className="tt-alert__link">Retry</a>
        </Alert>

        <h3 style={{ marginTop: 24 }}>Error recovery — Alert + Retry Button</h3>
        <Alert variant="error" onClose={() => {}}>
          Connection lost. We couldn't reach the server.
        </Alert>
        <div style={{ height: 8 }} />
        <div className="demo-row">
          <Button variant="secondary">Retry</Button>
        </div>
      </section>

      <section className="page-section">
        <h3>ActionButton — all statuses</h3>
        <h4 style={{ fontSize: 13, fontWeight: 500, color: "#51596a", margin: "8px 0" }}>Medium</h4>
        <div className="demo-row">
          <ActionButton status="default">Save</ActionButton>
          <ActionButton status="loading">Saving</ActionButton>
          <ActionButton status="success">Saved</ActionButton>
          <ActionButton status="error">Failed</ActionButton>
        </div>

        <h4 style={{ fontSize: 13, fontWeight: 500, color: "#51596a", margin: "16px 0 8px" }}>Small</h4>
        <div className="demo-row">
          <ActionButton size="small" status="default">Save</ActionButton>
          <ActionButton size="small" status="loading">Saving</ActionButton>
          <ActionButton size="small" status="success">Saved</ActionButton>
          <ActionButton size="small" status="error">Failed</ActionButton>
        </div>

        <h4 style={{ fontSize: 13, fontWeight: 500, color: "#51596a", margin: "16px 0 8px" }}>Secondary + Tertiary variants</h4>
        <div className="demo-row">
          <ActionButton variant="secondary" status="loading">Saving</ActionButton>
          <ActionButton variant="tertiary" status="loading">Saving</ActionButton>
          <ActionButton variant="secondary" status="success">Saved</ActionButton>
          <ActionButton variant="tertiary" status="error">Failed</ActionButton>
        </div>
      </section>

      <StatusSection />

      <ProgressStepperSection />

      <ModifierKeysSection />

      <TooltipSection />
    </>
  );
}

const STATUS_VARIANTS: StatusVariant[] = ["success", "warning", "error", "neutral", "new"];

function StatusSection() {
  return (
    <section className="page-section">
      <h3>Status — dot + label</h3>
      <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
        5 variants: success, warning, error, neutral, new. 8px dot + 14px label.
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          padding: "8px 0",
        }}
      >
        {STATUS_VARIANTS.map((v) => (
          <Status key={v} variant={v} label={capitalize(v)} />
        ))}
      </div>

      <h3 style={{ marginTop: 24 }}>Status — count pill + label</h3>
      <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
        Pass a <code>count</code> to switch from dot to a rounded pill badge.
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          padding: "8px 0",
        }}
      >
        {STATUS_VARIANTS.map((v) => (
          <Status key={v} variant={v} count={3} label={capitalize(v)} />
        ))}
      </div>

      <h3 style={{ marginTop: 24 }}>Status — without marker</h3>
      <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
        <code>showMarker={"{false}"}</code> renders just the label.
      </p>
      <div className="demo-row" style={{ gap: 16 }}>
        <Status variant="success" showMarker={false} label="Success" />
        <Status variant="error" showMarker={false} label="Error" />
      </div>
    </section>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const STEPPER_TYPES: ProgressStepperType[] = ["bullet", "number", "icon"];
const STEPPER_DIRS: ProgressStepperDirection[] = ["vertical", "horizontal"];

const CREDIT_CARD_ICON = (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect
      x="1.5"
      y="3.5"
      width="13"
      height="9"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path d="M1.5 6.5H14.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const STEPS = [
  {
    label: "Step",
    description: "Additional information about this step.",
    icon: CREDIT_CARD_ICON,
  },
  {
    label: "Step",
    description: "Additional information about this step.",
    icon: CREDIT_CARD_ICON,
  },
  {
    label: "Step",
    description: "Additional information about this step.",
    icon: CREDIT_CARD_ICON,
  },
];

function ProgressStepperSection() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <section className="page-section">
      <h3>ProgressStepper — 3 types × 2 directions</h3>
      <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
        Types: bullet (16px dot), number (24px numbered circle), icon (24px with custom icon).
        Status derived from <code>currentStep</code>. Try the buttons below.
      </p>

      <div className="demo-row" style={{ gap: 8, marginTop: 8 }}>
        <Button
          variant="secondary"
          disabled={currentStep === 0}
          onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
        >
          Back
        </Button>
        <Button
          variant="primary"
          disabled={currentStep === STEPS.length - 1}
          onClick={() =>
            setCurrentStep((s) => Math.min(STEPS.length - 1, s + 1))
          }
        >
          Next
        </Button>
        <span style={{ fontSize: 13, color: "#51596a", alignSelf: "center" }}>
          Current: step {currentStep + 1} of {STEPS.length}
        </span>
      </div>

      {STEPPER_DIRS.map((dir) => (
        <div key={dir} style={{ marginTop: 24 }}>
          <h4
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "#51596a",
              margin: "8px 0",
            }}
          >
            {capitalize(dir)}
          </h4>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                dir === "horizontal" ? "1fr" : "repeat(3, minmax(0, 240px))",
              gap: dir === "horizontal" ? 32 : 24,
              maxWidth: dir === "horizontal" ? 744 : undefined,
            }}
          >
            {STEPPER_TYPES.map((t) => (
              <div key={t}>
                <div
                  style={{
                    fontSize: 12,
                    color: "#51596a",
                    marginBottom: 8,
                  }}
                >
                  {t}
                </div>
                <ProgressStepper
                  steps={STEPS}
                  currentStep={currentStep}
                  direction={dir}
                  type={t}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

const SIZES: SpinnerSize[] = ["tiny", "small", "medium", "large"];
const SPEEDS: SpinnerSpeed[] = ["slow", "normal", "fast"];

function SpinnerShowcase() {
  const [size, setSize] = useState<SpinnerSize>("medium");
  const [speed, setSpeed] = useState<SpinnerSpeed>("normal");
  const [paused, setPaused] = useState(false);
  const [label, setLabel] = useState("Loading");

  return (
    <section className="page-section">
      <h3>Spinner — all sizes</h3>
      <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
        Four-arc ring with a continuous rotation. Sizes: tiny (12px), small (16px), medium (32px), large (64px).
      </p>
      <div
        className="demo-row"
        style={{ alignItems: "center", gap: 32, padding: "16px 0" }}
      >
        {SIZES.map((s) => (
          <div
            key={s}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Spinner size={s} />
            <span style={{ fontSize: 12, color: "#51596a" }}>{s}</span>
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: 24 }}>Spinner — interactive playground</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(220px, 280px) 1fr",
          gap: 24,
          padding: "16px 0",
          alignItems: "start",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "#51596a",
                marginBottom: 8,
              }}
            >
              Size
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {SIZES.map((s) => (
                <Radio
                  key={s}
                  name="spinner-size"
                  value={s}
                  checked={size === s}
                  onChange={(c) => c && setSize(s)}
                  label={s}
                />
              ))}
            </div>
          </div>

          <div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "#51596a",
                marginBottom: 8,
              }}
            >
              Speed
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {SPEEDS.map((s) => (
                <Radio
                  key={s}
                  name="spinner-speed"
                  value={s}
                  checked={speed === s}
                  onChange={(c) => c && setSpeed(s)}
                  label={s}
                />
              ))}
            </div>
          </div>

          <Toggle
            checked={paused}
            onChange={setPaused}
            label="Paused"
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 120,
            background: "var(--surface-muted, #f5f6f8)",
            borderRadius: 8,
            padding: 24,
          }}
        >
          <Spinner size={size} speed={speed} paused={paused} />
        </div>
      </div>

      <h3 style={{ marginTop: 24 }}>InlineSpinner — spinner + label</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          padding: "8px 0",
        }}
      >
        <div className="demo-row" style={{ alignItems: "center", gap: 24 }}>
          <InlineSpinner />
          <InlineSpinner label="Saving…" />
          <InlineSpinner label="Fetching results" size="small" />
        </div>
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, color: "#51596a" }}>Custom label:</span>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            style={{
              padding: "4px 8px",
              border: "1px solid var(--border-primary, #818794)",
              borderRadius: 4,
              fontFamily: "Rubik, sans-serif",
              fontSize: 13,
            }}
          />
          <InlineSpinner label={label} />
        </label>
      </div>
    </section>
  );
}

const ALL_KEYS: ModifierKeyName[] = [
  "primary",
  "secondary",
  "shift",
  "control",
  "enter",
  "tab",
  "backspace",
  "delete",
  "space",
  "arrow-up",
  "arrow-down",
  "arrow-left",
  "arrow-right",
  "home",
  "end",
  "escape",
];

function ModifierKeysSection() {
  return (
    <section className="page-section">
      <h3>ModifierKey — all keys × Mac / Windows</h3>
      <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
        16 keys with Mac and Windows variants. Inherits currentColor from parent.
      </p>

      {(["mac", "win"] as ModifierKeyOS[]).map((os) => (
        <div key={os} style={{ marginTop: 16 }}>
          <h4
            style={{ fontSize: 13, fontWeight: 500, color: "#51596a", margin: "8px 0" }}
          >
            {os === "mac" ? "Mac" : "Windows"}
          </h4>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
              gap: 8,
              maxWidth: 720,
            }}
          >
            {ALL_KEYS.map((k) => (
              <div
                key={k}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "4px 8px",
                  border: "1px solid var(--border-primary, #818794)",
                  borderRadius: 4,
                  background: "var(--surface-default, #fff)",
                }}
              >
                <ModifierKey name={k} os={os} />
                <span style={{ fontSize: 12, color: "#51596a" }}>{k}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <h3 style={{ marginTop: 24 }}>Shortcut — composed key combos</h3>
      <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
        Flex row of modifier keys with an optional letter. Letter uses placeholder text color.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <ShortcutRow
          label="Command palette (Mac)"
          keys={["primary"]}
          letter="K"
          os="mac"
        />
        <ShortcutRow
          label="Command palette (Windows)"
          keys={["primary"]}
          letter="K"
          os="win"
        />
        <ShortcutRow
          label="Find in page"
          keys={["control", "secondary", "shift", "primary"]}
          letter="K"
          os="mac"
        />
        <ShortcutRow label="Save" keys={["primary"]} letter="S" os="mac" />
        <ShortcutRow label="Undo (Windows)" keys={["primary"]} letter="Z" os="win" />
        <ShortcutRow label="Tab forward" keys={["tab"]} os="mac" />
        <ShortcutRow label="Submit" keys={["shift", "enter"]} os="mac" />
        <ShortcutRow label="Escape" keys={["escape"]} os="mac" />
        <ShortcutRow label="Arrow left (Win)" keys={["arrow-left"]} os="win" />
      </div>
    </section>
  );
}

function ShortcutRow(props: {
  label: string;
  keys: ModifierKeyName[];
  letter?: string;
  os: ModifierKeyOS;
}) {
  const { label, keys, letter, os } = props;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <span style={{ fontSize: 13, color: "#51596a", minWidth: 220 }}>{label}</span>
      <Shortcut keys={keys} letter={letter} os={os} />
    </div>
  );
}

const TOOLTIP_ARROWS: TooltipArrow[] = [
  "top-left",
  "top",
  "top-right",
  "bottom-left",
  "bottom",
  "bottom-right",
];

function TooltipSection() {
  return (
    <section className="page-section">
      <h3>Tooltip — single line</h3>
      <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
        Six arrow positions (top/bottom × left/center/right), with or without a keyboard shortcut.
      </p>

      <h4 style={{ fontSize: 13, fontWeight: 500, color: "#51596a", margin: "16px 0 8px" }}>
        Label only
      </h4>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, max-content)",
          gap: "32px 48px",
          padding: "24px 32px",
        }}
      >
        {TOOLTIP_ARROWS.map((arrow) => (
          <Tooltip key={arrow} label="Tooltip label" arrow={arrow} />
        ))}
      </div>

      <h4 style={{ fontSize: 13, fontWeight: 500, color: "#51596a", margin: "16px 0 8px" }}>
        Label with shortcut
      </h4>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, max-content)",
          gap: "32px 48px",
          padding: "24px 32px",
        }}
      >
        {TOOLTIP_ARROWS.map((arrow) => (
          <Tooltip
            key={arrow}
            label="Tooltip label"
            arrow={arrow}
            shortcut={<Shortcut keys={["primary"]} letter="E" os="mac" />}
          />
        ))}
      </div>

      <h3 style={{ marginTop: 32 }}>MultilineTooltip — title + description</h3>
      <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
        Adds a secondary line of context beneath the title, up to 600px wide. Supports the same
        six arrow positions and optional shortcut.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(200px, max-content))",
          gap: "32px 48px",
          padding: "24px 32px",
        }}
      >
        {TOOLTIP_ARROWS.map((arrow) => (
          <MultilineTooltip
            key={arrow}
            title="Tooltip label"
            description="A short explanation that supports the main title."
            arrow={arrow}
            maxWidth={220}
          />
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(200px, max-content))",
          gap: "32px 48px",
          padding: "24px 32px",
        }}
      >
        {TOOLTIP_ARROWS.map((arrow) => (
          <MultilineTooltip
            key={arrow}
            title="Tooltip label"
            description="A short explanation that supports the main title."
            arrow={arrow}
            maxWidth={240}
            shortcut={<Shortcut keys={["primary"]} letter="E" os="mac" />}
          />
        ))}
      </div>
    </section>
  );
}
