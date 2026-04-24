import React, { useId } from "react";
import "./Radio.css";

export type RadioProps = {
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

export function Radio({
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
}: RadioProps) {
  const reactId = useId();
  const inputId = id ?? reactId;

  const wrapperClasses = [
    "tt-radio",
    disabled && "tt-radio--disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label className={wrapperClasses} htmlFor={inputId}>
      <span className="tt-radio__control">
        <input
          id={inputId}
          type="radio"
          className="tt-radio__input"
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          name={name}
          value={value}
          aria-label={ariaLabel}
          onChange={(e) => onChange?.(e.target.checked)}
        />
        <span className="tt-radio__circle" aria-hidden="true">
          <span className="tt-radio__dot" />
        </span>
      </span>
      {label != null && <span className="tt-radio__label">{label}</span>}
    </label>
  );
}
