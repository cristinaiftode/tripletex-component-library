import React, { useId } from "react";
import "./Toggle.css";

export type ToggleProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  label?: React.ReactNode;
  onChange?: (checked: boolean) => void;
  id?: string;
  name?: string;
  value?: string;
  "aria-label"?: string;
  className?: string;
};

export function Toggle({
  checked,
  defaultChecked,
  disabled,
  label,
  onChange,
  id,
  name,
  value,
  "aria-label": ariaLabel,
  className,
}: ToggleProps) {
  const reactId = useId();
  const inputId = id ?? reactId;

  const wrapperClasses = [
    "tt-toggle",
    disabled && "tt-toggle--disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label className={wrapperClasses} htmlFor={inputId}>
      <span className="tt-toggle__control">
        <input
          id={inputId}
          type="checkbox"
          role="switch"
          className="tt-toggle__input"
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          name={name}
          value={value}
          aria-label={ariaLabel}
          onChange={(e) => onChange?.(e.target.checked)}
        />
        <span className="tt-toggle__pill" aria-hidden="true">
          <span className="tt-toggle__handle">
            <svg className="tt-toggle__handle-icon" viewBox="0 0 12 12" fill="none">
              <path d="M3 6.5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </span>
      </span>
      {label != null && <span className="tt-toggle__label">{label}</span>}
    </label>
  );
}
