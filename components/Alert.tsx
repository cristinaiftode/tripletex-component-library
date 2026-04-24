import React from "react";
import {
  CloseIcon,
  InfoIcon,
  CheckCircleIcon,
  WarningIcon,
  AlertTriangleIcon,
  SparkleIcon,
} from "./Icons";
import "./Alert.css";

export type AlertVariant = "info" | "success" | "warning" | "error" | "automation";
export type AlertSize = "desktop" | "mobile";

export type AlertProps = {
  variant?: AlertVariant;
  size?: AlertSize;
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
  role?: "status" | "alert";
};

export function Alert({
  variant = "info",
  size = "desktop",
  onClose,
  children,
  className,
  role,
}: AlertProps) {
  const classes = [
    "tt-alert",
    `tt-alert--variant-${variant}`,
    `tt-alert--size-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const resolvedRole = role ?? (variant === "error" || variant === "warning" ? "alert" : "status");

  return (
    <div className={classes} role={resolvedRole}>
      <span className="tt-alert__icon" aria-hidden="true">
        {renderVariantIcon(variant)}
      </span>
      <div className="tt-alert__body">{children}</div>
      {onClose && (
        <button
          type="button"
          className="tt-alert__close"
          onClick={onClose}
          aria-label="Dismiss"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
}

function renderVariantIcon(variant: AlertVariant): React.ReactNode {
  switch (variant) {
    case "success":
      return <CheckCircleIcon size={24} />;
    case "warning":
      return <WarningIcon size={24} />;
    case "error":
      return <AlertTriangleIcon size={24} />;
    case "automation":
      return <SparkleIcon size={24} />;
    case "info":
    default:
      return <InfoIcon size={24} />;
  }
}
