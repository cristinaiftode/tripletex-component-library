import { useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import "./FilterDialog.css";

export type SavedFilter = {
  id: string;
  name: string;
  active?: boolean;
  onSelect?: () => void;
  onMenuClick?: () => void;
};

export type FilterDialogProps = {
  savedFilters?: SavedFilter[];
  savedFiltersCollapsible?: boolean;
  savedFiltersDefaultOpen?: boolean;
  children?: ReactNode;
  onSaveFilter?: () => void;
  onResetFilters?: () => void;
  saveFilterDisabled?: boolean;
  resetFiltersDisabled?: boolean;
  onClose?: () => void;
  className?: string;
};

export function FilterDialog(props: FilterDialogProps) {
  const {
    savedFilters,
    savedFiltersCollapsible = true,
    savedFiltersDefaultOpen = true,
    children,
    onSaveFilter,
    onResetFilters,
    saveFilterDisabled,
    resetFiltersDisabled,
    onClose,
    className,
  } = props;

  const [savedOpen, setSavedOpen] = useState(savedFiltersDefaultOpen);

  const classes = ["tt-filter-dialog", className].filter(Boolean).join(" ");
  const hasSaved = savedFilters && savedFilters.length > 0;

  return (
    <div className={classes} role="dialog" aria-label="Filters">
      {hasSaved && (
        <section className="tt-filter-dialog__section">
          <header className="tt-filter-dialog__header">
            <h3 className="tt-filter-dialog__title">Saved filters</h3>
            {savedFiltersCollapsible ? (
              <button
                type="button"
                className="tt-filter-dialog__toggle"
                aria-expanded={savedOpen}
                aria-label={savedOpen ? "Collapse saved filters" : "Expand saved filters"}
                onClick={() => setSavedOpen((v) => !v)}
              >
                <ChevronIcon direction={savedOpen ? "up" : "down"} />
              </button>
            ) : (
              onClose && (
                <button
                  type="button"
                  className="tt-filter-dialog__toggle"
                  aria-label="Close"
                  onClick={onClose}
                >
                  <CloseIcon />
                </button>
              )
            )}
          </header>
          {savedOpen && (
            <ul className="tt-filter-dialog__saved-list">
              {savedFilters.map((f) => (
                <li key={f.id} className="tt-filter-dialog__saved-item">
                  <SavedFilterItem {...f} />
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      <section className="tt-filter-dialog__section tt-filter-dialog__section--options">
        <header className="tt-filter-dialog__header">
          <h3 className="tt-filter-dialog__title">Filter options</h3>
        </header>
        <div className="tt-filter-dialog__actions">
          <button
            type="button"
            className="tt-filter-dialog__link"
            onClick={onSaveFilter}
            disabled={saveFilterDisabled}
          >
            Save filter
          </button>
          <button
            type="button"
            className="tt-filter-dialog__link"
            onClick={onResetFilters}
            disabled={resetFiltersDisabled}
          >
            Reset filters
          </button>
        </div>
      </section>

      {children && <div className="tt-filter-dialog__body">{children}</div>}
    </div>
  );
}

export type SavedFilterItemProps = {
  name: string;
  active?: boolean;
  onSelect?: () => void;
  onMenuClick?: () => void;
  className?: string;
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, "id">;

export function SavedFilterItem({
  name,
  active = false,
  onSelect,
  onMenuClick,
  className,
  id,
}: SavedFilterItemProps) {
  const classes = [
    "tt-saved-filter",
    active && "tt-saved-filter--active",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={classes}>
      <button
        type="button"
        className="tt-saved-filter__main"
        onClick={onSelect}
        aria-pressed={active}
        id={id}
      >
        <FunnelSmallIcon />
        <span className="tt-saved-filter__name">{name}</span>
      </button>
      {onMenuClick && (
        <button
          type="button"
          className="tt-saved-filter__menu"
          onClick={onMenuClick}
          aria-label={`More actions for ${name}`}
        >
          <KebabIcon />
        </button>
      )}
    </div>
  );
}

function FunnelSmallIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="tt-saved-filter__icon"
    >
      <path
        d="M2.5 3.5h11l-4 5v3.5l-3 1.25v-4.75l-4-5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function KebabIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="3.5" r="1.25" fill="currentColor" />
      <circle cx="8" cy="8" r="1.25" fill="currentColor" />
      <circle cx="8" cy="12.5" r="1.25" fill="currentColor" />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: "up" | "down" }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      style={{ transform: direction === "up" ? "rotate(180deg)" : undefined }}
    >
      <path
        d="M5 7.5l5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M5 5l10 10M15 5L5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
