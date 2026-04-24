import React from "react";
import "./ContentSwitcher.css";

export type ContentSwitcherOption = {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
};

export type ContentSwitcherProps = {
  options: ContentSwitcherOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  "aria-label"?: string;
  className?: string;
};

export function ContentSwitcher({
  options,
  value,
  defaultValue,
  onChange,
  "aria-label": ariaLabel = "Content switcher",
  className,
}: ContentSwitcherProps) {
  const [internal, setInternal] = React.useState<string | undefined>(
    defaultValue ?? options[0]?.value,
  );
  const isControlled = value !== undefined;
  const selected = isControlled ? value : internal;

  const handleSelect = (next: string) => {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  const classes = ["tt-content-switcher", className].filter(Boolean).join(" ");
  const lastIndex = options.length - 1;

  return (
    <div className={classes} role="tablist" aria-label={ariaLabel}>
      {options.map((option, index) => {
        const position =
          index === 0 ? "left" : index === lastIndex ? "right" : "middle";
        const isSelected = option.value === selected;
        const segmentClass = [
          "tt-content-switcher__segment",
          `tt-content-switcher__segment--${position}`,
          isSelected && "tt-content-switcher__segment--selected",
          option.disabled && "tt-content-switcher__segment--disabled",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isSelected}
            disabled={option.disabled}
            className={segmentClass}
            onClick={() => handleSelect(option.value)}
          >
            <span className="tt-content-switcher__label">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
