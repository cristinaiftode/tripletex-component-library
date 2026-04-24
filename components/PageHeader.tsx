import type { ReactNode } from "react";
import "./PageHeader.css";

export type PageHeaderVariant = "default" | "compact";

export type BreadcrumbProps = {
  parent: string;
  current: string;
  onParentClick?: () => void;
};

export function Breadcrumb({ parent, current, onParentClick }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="tt-breadcrumb">
      <button
        type="button"
        className="tt-breadcrumb__parent"
        onClick={onParentClick}
      >
        {parent}
      </button>
      <span className="tt-breadcrumb__separator" aria-hidden="true">/</span>
      <span className="tt-breadcrumb__current" aria-current="page">{current}</span>
    </nav>
  );
}

export type AutosaveState = "saved" | "saving";
export type AutosaveProps = {
  state?: AutosaveState;
  label?: string;
  className?: string;
};

export function Autosave({ state = "saved", label, className }: AutosaveProps) {
  const text = label ?? (state === "saving" ? "Saving..." : "Saved");
  const classes = ["tt-autosave", className].filter(Boolean).join(" ");
  return (
    <span className={classes}>
      <CloudSavedIcon />
      <span className="tt-autosave__label">{text}</span>
    </span>
  );
}

export type StatusMarkerVariant = "warning" | "success";
export type StatusMarkerProps = {
  variant: StatusMarkerVariant;
  label: string;
  className?: string;
};

export function StatusMarker({ variant, label, className }: StatusMarkerProps) {
  const classes = [
    "tt-status-marker",
    `tt-status-marker--${variant}`,
    className,
  ].filter(Boolean).join(" ");
  return (
    <span className={classes}>
      <span className="tt-status-marker__dot" aria-hidden="true" />
      <span className="tt-status-marker__label">{label}</span>
    </span>
  );
}

export type PageHeaderAction = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
};

export type PageHeaderProps = {
  title: string;
  variant?: PageHeaderVariant;
  breadcrumb?: BreadcrumbProps;
  autosave?: boolean | AutosaveState;
  subheading?: ReactNode;
  alert?: ReactNode;
  primaryAction?: PageHeaderAction;
  secondaryAction?: PageHeaderAction;
  onMenuClick?: () => void;
  menuLabel?: string;
  className?: string;
};

export function PageHeader(props: PageHeaderProps) {
  const {
    title,
    variant = "default",
    breadcrumb,
    autosave,
    subheading,
    alert,
    primaryAction,
    secondaryAction,
    onMenuClick,
    menuLabel = "More actions",
    className,
  } = props;

  const classes = [
    "tt-page-header",
    `tt-page-header--variant-${variant}`,
    className,
  ].filter(Boolean).join(" ");

  const autosaveState: AutosaveState | undefined =
    autosave === true ? "saved" : autosave === false ? undefined : autosave;

  const hasActions = primaryAction || secondaryAction || onMenuClick;

  return (
    <header className={classes}>
      {breadcrumb && variant === "default" && <Breadcrumb {...breadcrumb} />}
      <div className="tt-page-header__title-row">
        <div className="tt-page-header__title-group">
          <h1 className="tt-page-header__title">{title}</h1>
          {autosaveState && <Autosave state={autosaveState} />}
        </div>
        {hasActions && (
          <div className="tt-page-header__actions">
            {secondaryAction && (
              <button
                type="button"
                className="tt-page-header__btn tt-page-header__btn--secondary"
                onClick={secondaryAction.onClick}
                disabled={secondaryAction.disabled}
              >
                {secondaryAction.label}
              </button>
            )}
            {primaryAction && (
              <button
                type="button"
                className="tt-page-header__btn tt-page-header__btn--primary"
                onClick={primaryAction.onClick}
                disabled={primaryAction.disabled}
              >
                {primaryAction.label}
              </button>
            )}
            {onMenuClick && (
              <button
                type="button"
                className="tt-page-header__icon-btn"
                onClick={onMenuClick}
                aria-label={menuLabel}
              >
                <MoreHorizontalIcon />
              </button>
            )}
          </div>
        )}
      </div>
      {subheading && variant === "default" && (
        <div className="tt-page-header__subheading">{subheading}</div>
      )}
      {alert && <div className="tt-page-header__alert">{alert}</div>}
    </header>
  );
}

function CloudSavedIcon() {
  return (
    <svg
      className="tt-autosave__icon"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5.5 15h9a3.5 3.5 0 0 0 .5-6.96 5 5 0 0 0-9.6-1.3A3.5 3.5 0 0 0 5.5 15Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M7.8 10.6 9.4 12.2l3-3.4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MoreHorizontalIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="4.5" cy="10" r="1.5" fill="currentColor" />
      <circle cx="10" cy="10" r="1.5" fill="currentColor" />
      <circle cx="15.5" cy="10" r="1.5" fill="currentColor" />
    </svg>
  );
}
