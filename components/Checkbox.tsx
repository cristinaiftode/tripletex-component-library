import React, { useId } from "react";
import "./Checkbox.css";

export type CheckboxProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  label?: React.ReactNode;
  onChange?: (checked: boolean) => void;
  id?: string;
  name?: string;
  value?: string;
  "aria-label"?: string;
  className?: string;
};

export function Checkbox({
  checked,
  defaultChecked,
  indeterminate,
  disabled,
  label,
  onChange,
  id,
  name,
  value,
  "aria-label": ariaLabel,
  className,
}: CheckboxProps) {
  const reactId = useId();
  const inputId = id ?? reactId;

  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (ref.current) ref.current.indeterminate = !!indeterminate;
  }, [indeterminate]);

  const wrapperClasses = [
    "tt-checkbox",
    disabled && "tt-checkbox--disabled",
    indeterminate && "tt-checkbox--indeterminate",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label className={wrapperClasses} htmlFor={inputId}>
      <span className="tt-checkbox__control">
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          className="tt-checkbox__input"
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          name={name}
          value={value}
          aria-label={ariaLabel}
          onChange={(e) => onChange?.(e.target.checked)}
        />
        <span className="tt-checkbox__box" aria-hidden="true">
          {indeterminate ? (
            <svg viewBox="0 0 20 20" fill="none">
              <path d="M5 10h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 20 20" fill="none">
              <path d="M5 10.5l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
      </span>
      {label != null && <span className="tt-checkbox__label">{label}</span>}
    </label>
  );
}
