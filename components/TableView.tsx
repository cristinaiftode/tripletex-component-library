import { useState } from "react";
import { Radio } from "./Radio";
import { Toggle } from "./Toggle";
import "./TableView.css";

export type TableDensity = "compact" | "standard" | "detailed";

export type TableViewColumn = {
  id: string;
  label: string;
  visible: boolean;
};

export type TableViewProps = {
  title?: string;
  density?: TableDensity;
  defaultDensity?: TableDensity;
  onDensityChange?: (density: TableDensity) => void;
  columns: TableViewColumn[];
  onColumnToggle?: (id: string, visible: boolean) => void;
  onReset?: () => void;
  resetLabel?: string;
  displaySettingsLabel?: string;
  columnsLabel?: string;
  className?: string;
};

const DENSITY_OPTIONS: { value: TableDensity; label: string; icon: React.ReactNode }[] = [
  { value: "compact", label: "Compact", icon: <DensityCompactIcon /> },
  { value: "standard", label: "Standard", icon: <DensityStandardIcon /> },
  { value: "detailed", label: "Detailed", icon: <DensityDetailedIcon /> },
];

export function TableView(props: TableViewProps) {
  const {
    title = "View",
    density,
    defaultDensity = "standard",
    onDensityChange,
    columns,
    onColumnToggle,
    onReset,
    resetLabel = "Reset all",
    displaySettingsLabel = "Display settings",
    columnsLabel = "Columns",
    className,
  } = props;

  const isControlled = density !== undefined;
  const [internal, setInternal] = useState<TableDensity>(defaultDensity);
  const current = isControlled ? density! : internal;

  const setDensity = (d: TableDensity) => {
    if (!isControlled) setInternal(d);
    onDensityChange?.(d);
  };

  const classes = ["tt-table-view", className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      <div className="tt-table-view__header">
        <span className="tt-table-view__title">{title}</span>
        <button
          type="button"
          className="tt-table-view__reset"
          onClick={onReset}
        >
          {resetLabel}
        </button>
      </div>

      <div className="tt-table-view__group-header">
        <span className="tt-table-view__group-label">{displaySettingsLabel}</span>
      </div>

      <div className="tt-table-view__section">
        {DENSITY_OPTIONS.map((opt) => (
          <label key={opt.value} className="tt-table-view__row">
            <span className="tt-table-view__row-icon" aria-hidden="true">{opt.icon}</span>
            <span className="tt-table-view__row-label">{opt.label}</span>
            <Radio
              name="tt-table-view-density"
              value={opt.value}
              checked={current === opt.value}
              onChange={(c) => { if (c) setDensity(opt.value); }}
              aria-label={opt.label}
            />
          </label>
        ))}
      </div>

      <div className="tt-table-view__group-header tt-table-view__group-header--with-divider">
        <div className="tt-table-view__divider" />
        <span className="tt-table-view__group-label">{columnsLabel}</span>
      </div>

      <div className="tt-table-view__section">
        {columns.map((col) => (
          <div key={col.id} className="tt-table-view__row">
            <span className="tt-table-view__row-icon tt-table-view__row-icon--drag" aria-hidden="true">
              <DragIcon />
            </span>
            <span className="tt-table-view__row-label">{col.label}</span>
            <Toggle
              checked={col.visible}
              onChange={(c) => onColumnToggle?.(col.id, c)}
              aria-label={col.label}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function DensityCompactIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="3" rx="0.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="3" y="10.5" width="18" height="3" rx="0.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="3" y="16" width="18" height="3" rx="0.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
function DensityStandardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="3" y="14" width="18" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
function DensityDetailedIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="18" height="12" rx="0.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
function DragIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="6" r="1.2" fill="currentColor" />
      <circle cx="15" cy="6" r="1.2" fill="currentColor" />
      <circle cx="9" cy="12" r="1.2" fill="currentColor" />
      <circle cx="15" cy="12" r="1.2" fill="currentColor" />
      <circle cx="9" cy="18" r="1.2" fill="currentColor" />
      <circle cx="15" cy="18" r="1.2" fill="currentColor" />
    </svg>
  );
}
