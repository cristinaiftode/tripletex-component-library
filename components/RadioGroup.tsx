import React from "react";
import "./Radio.css";

export type RadioGroupOption = {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
};

export type RadioGroupProps = {
  name: string;
  label?: React.ReactNode;
  options?: RadioGroupOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  layoutDirection?: "vertical" | "horizontal";
  children?: React.ReactNode;
  className?: string;
};

export function RadioGroup({
  name,
  label,
  options,
  value,
  defaultValue,
  onChange,
  layoutDirection = "vertical",
  children,
  className,
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = React.useState<string | undefined>(defaultValue);
  const current = value ?? internalValue;

  const classes = [
    "tt-radio-group",
    `tt-radio-group--${layoutDirection}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleChange = (v: string) => {
    if (value === undefined) setInternalValue(v);
    onChange?.(v);
  };

  return (
    <div className={classes} role="radiogroup" aria-label={typeof label === "string" ? label : undefined}>
      {label != null && <div className="tt-radio-group__label">{label}</div>}
      <div className="tt-radio-group__items">
        {options
          ? options.map((opt) => (
              <RadioGroupItem
                key={opt.value}
                name={name}
                value={opt.value}
                label={opt.label}
                disabled={opt.disabled}
                checked={current === opt.value}
                onChange={() => handleChange(opt.value)}
              />
            ))
          : children}
      </div>
    </div>
  );
}

function RadioGroupItem({
  name,
  value,
  label,
  disabled,
  checked,
  onChange,
}: {
  name: string;
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  checked: boolean;
  onChange: () => void;
}) {
  const wrapperClasses = ["tt-radio", disabled && "tt-radio--disabled"].filter(Boolean).join(" ");
  return (
    <label className={wrapperClasses}>
      <span className="tt-radio__control">
        <input
          type="radio"
          className="tt-radio__input"
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
        />
        <span className="tt-radio__circle" aria-hidden="true">
          <span className="tt-radio__dot" />
        </span>
      </span>
      <span className="tt-radio__label">{label}</span>
    </label>
  );
}
