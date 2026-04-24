import React from "react";
import { InfoIcon, WarningIcon, AlertTriangleIcon } from "./Icons";
import "./InputGroup.css";

export type InputGroupVariant = "default" | "info" | "warning" | "error";

export type InputGroupProps = {
  label: React.ReactNode;
  required?: boolean;
  variant?: InputGroupVariant;
  helperText?: React.ReactNode;
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
};

export function InputGroup({
  label,
  required,
  variant = "default",
  helperText,
  htmlFor,
  children,
  className,
}: InputGroupProps) {
  const classes = [
    "tt-input-group",
    `tt-input-group--variant-${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const helperIcon =
    variant === "info" ? <InfoIcon />
    : variant === "warning" ? <WarningIcon />
    : variant === "error" ? <AlertTriangleIcon />
    : null;

  return (
    <div className={classes}>
      <label className="tt-input-group__label" htmlFor={htmlFor}>
        <span>{label}</span>
        {required && <span className="tt-input-group__required" aria-hidden="true">*</span>}
      </label>
      <div className="tt-input-group__control">{children}</div>
      {helperText && (
        <div className="tt-input-group__helper">
          {helperIcon && (
            <span className="tt-input-group__helper-icon" aria-hidden="true">
              {helperIcon}
            </span>
          )}
          <span className="tt-input-group__helper-text">{helperText}</span>
        </div>
      )}
    </div>
  );
}

