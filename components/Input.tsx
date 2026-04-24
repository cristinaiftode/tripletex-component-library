import React from "react";
import {
  SearchIcon,
  CalendarIcon,
  InfoIcon,
  SparkleIcon,
  WarningIcon,
  AlertTriangleIcon,
  EyeIcon,
  EyeOffIcon,
} from "./Icons";
import "./Input.css";

export type InputType =
  | "text"
  | "number"
  | "currency"
  | "percentage"
  | "date"
  | "search"
  | "password";

export type InputVariant = "default" | "info" | "automation" | "warning" | "error";

export type InputProps = {
  type?: InputType;
  variant?: InputVariant;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  currencySymbol?: string;
  id?: string;
  name?: string;
  "aria-label"?: string;
  className?: string;
};

export function Input({
  type = "text",
  variant = "default",
  value,
  defaultValue,
  onChange,
  placeholder,
  disabled,
  currencySymbol = "kr",
  id,
  name,
  "aria-label": ariaLabel,
  className,
}: InputProps) {
  const [reveal, setReveal] = React.useState(false);
  const nativeType =
    type === "password" && !reveal
      ? "password"
      : type === "date"
        ? "date"
        : type === "number" || type === "currency" || type === "percentage"
          ? "number"
          : type === "search"
            ? "search"
            : "text";

  const classes = [
    "tt-input",
    `tt-input--variant-${variant}`,
    disabled && "tt-input--disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const leadingIcon = type === "search" ? <SearchIcon /> : null;
  const leadingAffix =
    type === "currency" ? <span className="tt-input__affix">{currencySymbol}</span> : null;

  const trailingAffix =
    type === "percentage" ? <span className="tt-input__affix">%</span> : null;

  const variantIcon =
    variant === "info" ? <InfoIcon />
    : variant === "automation" ? <SparkleIcon />
    : variant === "warning" ? <WarningIcon />
    : variant === "error" ? <AlertTriangleIcon />
    : null;

  const trailingIcon =
    type === "password" ? (
      <button
        type="button"
        className="tt-input__reveal"
        onClick={() => setReveal((v) => !v)}
        aria-label={reveal ? "Hide password" : "Show password"}
        disabled={disabled}
      >
        {reveal ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    ) : type === "date" ? (
      <CalendarIcon />
    ) : null;

  return (
    <div className={classes}>
      {leadingIcon && <span className="tt-input__icon tt-input__icon--leading">{leadingIcon}</span>}
      {leadingAffix}
      <input
        className="tt-input__field"
        type={nativeType}
        value={value}
        defaultValue={defaultValue}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        id={id}
        name={name}
        aria-label={ariaLabel}
      />
      {trailingAffix}
      {variantIcon && (
        <span className="tt-input__icon tt-input__icon--variant" aria-hidden="true">
          {variantIcon}
        </span>
      )}
      {trailingIcon && (
        <span className="tt-input__icon tt-input__icon--trailing">{trailingIcon}</span>
      )}
    </div>
  );
}

