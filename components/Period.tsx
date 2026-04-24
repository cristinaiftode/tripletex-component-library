import React from "react";
import "./Period.css";

export type PeriodVariant = "default" | "info" | "automation" | "warning" | "error";

export type PeriodProps = {
  value: string;
  variant?: PeriodVariant;
  onPrev?: () => void;
  onNext?: () => void;
  disabled?: boolean;
  disablePrev?: boolean;
  disableNext?: boolean;
  "aria-label"?: string;
  className?: string;
};

export function Period({
  value,
  variant = "default",
  onPrev,
  onNext,
  disabled,
  disablePrev,
  disableNext,
  "aria-label": ariaLabel = "Period",
  className,
}: PeriodProps) {
  const classes = [
    "tt-period",
    `tt-period--variant-${variant}`,
    disabled && "tt-period--disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const variantIcon =
    variant === "info" ? <InfoIcon />
    : variant === "automation" ? <AutomationIcon />
    : variant === "warning" ? <WarningIcon />
    : variant === "error" ? <ErrorIcon />
    : null;

  return (
    <div className={classes} role="group" aria-label={ariaLabel}>
      <span className="tt-period__value">{value}</span>
      {variantIcon && (
        <span className="tt-period__icon" aria-hidden="true">
          {variantIcon}
        </span>
      )}
      <div className="tt-period__nav">
        <button
          type="button"
          className="tt-period__btn"
          aria-label="Previous period"
          disabled={disabled || disablePrev}
          onClick={onPrev}
        >
          <ChevronLeftIcon />
        </button>
        <button
          type="button"
          className="tt-period__btn"
          aria-label="Next period"
          disabled={disabled || disableNext}
          onClick={onNext}
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M12 5l-5 5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function InfoIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 9v4.5M10 7v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function AutomationIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 2l1.5 4 4 1.5-4 1.5L10 13l-1.5-4L4.5 7.5l4-1.5L10 2zM15 12l.7 1.8 1.8.7-1.8.7L15 17l-.7-1.8-1.8-.7 1.8-.7L15 12z"
        fill="currentColor"
      />
    </svg>
  );
}
function WarningIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 6v5M10 13v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function ErrorIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 3l8 14H2L10 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 9v3M10 14v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
