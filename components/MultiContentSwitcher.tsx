import React from "react";
import "./MultiContentSwitcher.css";

export type MultiContentSwitcherOption = {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
};

export type MultiContentSwitcherProps = {
  options: MultiContentSwitcherOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  "aria-label"?: string;
  className?: string;
};

export function MultiContentSwitcher({
  options,
  value,
  defaultValue,
  onChange,
  "aria-label": ariaLabel = "Content switcher",
  className,
}: MultiContentSwitcherProps) {
  const [internal, setInternal] = React.useState<string[]>(defaultValue ?? []);
  const isControlled = value !== undefined;
  const selected = isControlled ? value : internal;

  const toggle = (option: string) => {
    const next = selected.includes(option)
      ? selected.filter((v) => v !== option)
      : [...selected, option];
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  const classes = ["tt-multi-content-switcher", className].filter(Boolean).join(" ");

  return (
    <div className={classes} role="group" aria-label={ariaLabel}>
      {options.map((option) => {
        const isSelected = selected.includes(option.value);
        const segmentClass = [
          "tt-multi-content-switcher__segment",
          isSelected && "tt-multi-content-switcher__segment--selected",
          option.disabled && "tt-multi-content-switcher__segment--disabled",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isSelected}
            disabled={option.disabled}
            className={segmentClass}
            onClick={() => toggle(option.value)}
          >
            <span className="tt-multi-content-switcher__label">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
