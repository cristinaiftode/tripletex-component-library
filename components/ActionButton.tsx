import React from "react";
import "./Button.css";
import "./ActionButton.css";
import type { ButtonVariant, ButtonSize } from "./Button";

export type ActionButtonStatus = "default" | "loading" | "success" | "error";

export type ActionButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  status?: ActionButtonStatus;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  htmlType?: "button" | "submit" | "reset";
};

export function ActionButton({
  variant = "primary",
  size = "medium",
  status = "default",
  icon,
  children,
  htmlType = "button",
  className,
  disabled,
  ...rest
}: ActionButtonProps) {
  const classes = [
    "tt-button",
    `tt-button--variant-${variant}`,
    `tt-button--size-${size}`,
    status !== "default" && `tt-action-button--status-${status}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const statusIcon = getStatusIcon(status) ?? icon;
  const isLoading = status === "loading";

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoading) {
      e.preventDefault();
      return;
    }
    rest.onClick?.(e);
  };

  return (
    <button
      type={htmlType}
      className={classes}
      disabled={disabled}
      aria-busy={isLoading || undefined}
      {...rest}
      onClick={handleClick}
    >
      {variant !== "icon" && children != null && <span>{children}</span>}
      {statusIcon && <span className="tt-button__icon">{statusIcon}</span>}
    </button>
  );
}

function getStatusIcon(status: ActionButtonStatus): React.ReactNode | null {
  switch (status) {
    case "loading":
      return <SpinnerIcon />;
    case "success":
      return <CheckIcon />;
    case "error":
      return <WarningIcon />;
    default:
      return null;
  }
}

function SpinnerIcon() {
  return (
    <svg className="tt-action-button__spinner" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2" strokeOpacity="0.25" />
      <path
        d="M17 10a7 7 0 0 1-7 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 10.5l2.5 2.5L14 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 3L2 17h16L10 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 8v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="14.5" r="0.75" fill="currentColor" />
    </svg>
  );
}
