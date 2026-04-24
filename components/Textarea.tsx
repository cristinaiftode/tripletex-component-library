import React from "react";
import { InfoIcon, SparkleIcon, WarningIcon, AlertTriangleIcon } from "./Icons";
import "./Textarea.css";

export type TextareaVariant = "default" | "info" | "automation" | "warning" | "error";

export type TextareaProps = {
  variant?: TextareaVariant;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  resizable?: boolean;
  rows?: number;
  id?: string;
  name?: string;
  "aria-label"?: string;
  className?: string;
};

export function Textarea({
  variant = "default",
  value,
  defaultValue,
  onChange,
  placeholder,
  disabled,
  resizable = true,
  rows,
  id,
  name,
  "aria-label": ariaLabel,
  className,
}: TextareaProps) {
  const classes = [
    "tt-textarea",
    `tt-textarea--variant-${variant}`,
    disabled && "tt-textarea--disabled",
    !resizable && "tt-textarea--fixed",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const variantIcon =
    variant === "info" ? <InfoIcon />
    : variant === "automation" ? <SparkleIcon />
    : variant === "warning" ? <WarningIcon />
    : variant === "error" ? <AlertTriangleIcon />
    : null;

  return (
    <div className={classes}>
      <textarea
        className="tt-textarea__field"
        value={value}
        defaultValue={defaultValue}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        id={id}
        name={name}
        aria-label={ariaLabel}
      />
      {variantIcon && (
        <span className="tt-textarea__icon" aria-hidden="true">
          {variantIcon}
        </span>
      )}
    </div>
  );
}

