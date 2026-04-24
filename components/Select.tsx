import React from "react";
import {
  ChevronDownIcon,
  InfoIcon,
  SparkleIcon,
  WarningIcon,
  AlertTriangleIcon,
} from "./Icons";
import "./Select.css";

export type SelectVariant = "default" | "info" | "automation" | "warning" | "error";

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectProps = {
  options: SelectOption[];
  variant?: SelectVariant;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  "aria-label"?: string;
  className?: string;
};

export function Select({
  options,
  variant = "default",
  value,
  defaultValue,
  onChange,
  placeholder = "Placeholder",
  disabled,
  id,
  name,
  "aria-label": ariaLabel,
  className,
}: SelectProps) {
  const classes = [
    "tt-select",
    `tt-select--variant-${variant}`,
    disabled && "tt-select--disabled",
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
      <select
        className="tt-select__field"
        value={value}
        defaultValue={value === undefined ? (defaultValue ?? "") : undefined}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        id={id}
        name={name}
        aria-label={ariaLabel}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value} disabled={o.disabled}>
            {o.label}
          </option>
        ))}
      </select>
      {variantIcon && (
        <span className="tt-select__icon tt-select__icon--variant" aria-hidden="true">
          {variantIcon}
        </span>
      )}
      <span className="tt-select__icon tt-select__icon--chevron" aria-hidden="true">
        <ChevronDownIcon />
      </span>
    </div>
  );
}

