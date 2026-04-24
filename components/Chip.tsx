import React from "react";
import { CloseIcon } from "./Icons";
import "./Chip.css";

export type ChipSize = "small" | "medium" | "large";
export type ChipVariant =
  | "static"
  | "interactive"
  | "removable"
  | "interactive-removable";

export type ChipProps = {
  label: string;
  size?: ChipSize;
  variant?: ChipVariant;
  icon?: React.ReactNode;
  avatar?: React.ReactNode;
  onClick?: () => void;
  onRemove?: () => void;
  disabled?: boolean;
  className?: string;
};

export function Chip({
  label,
  size = "medium",
  variant = "static",
  icon,
  avatar,
  onClick,
  onRemove,
  disabled = false,
  className,
}: ChipProps) {
  const isInteractive = variant === "interactive" || variant === "interactive-removable";
  const isRemovable = variant === "removable" || variant === "interactive-removable";

  const classes = [
    "tt-chip",
    `tt-chip--size-${size}`,
    `tt-chip--variant-${variant}`,
    disabled && "tt-chip--disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const bodyContent = (
    <>
      {avatar && <span className="tt-chip__avatar">{avatar}</span>}
      {icon && !avatar && (
        <span className="tt-chip__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="tt-chip__label">{label}</span>
    </>
  );

  return (
    <span className={classes}>
      {isInteractive ? (
        <button
          type="button"
          className="tt-chip__body tt-chip__body--button"
          onClick={onClick}
          disabled={disabled}
        >
          {bodyContent}
        </button>
      ) : (
        <span className="tt-chip__body">{bodyContent}</span>
      )}
      {isRemovable && (
        <button
          type="button"
          className="tt-chip__remove"
          onClick={onRemove}
          disabled={disabled}
          aria-label={`Remove ${label}`}
        >
          <CloseIcon />
        </button>
      )}
    </span>
  );
}
