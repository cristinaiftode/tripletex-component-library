import React from "react";
import { MinusIcon, PlusIcon } from "./Icons";
import "./NumberStepper.css";

export type NumberStepperVariant = "default" | "automation";

export type NumberStepperProps = {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  variant?: NumberStepperVariant;
  disabled?: boolean;
  "aria-label"?: string;
  className?: string;
};

export function NumberStepper({
  value,
  defaultValue = 1,
  onChange,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
  variant = "default",
  disabled,
  "aria-label": ariaLabel = "Number stepper",
  className,
}: NumberStepperProps) {
  const [internal, setInternal] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? (value as number) : internal;

  const setNext = (next: number) => {
    const clamped = Math.min(max, Math.max(min, next));
    if (!isControlled) setInternal(clamped);
    onChange?.(clamped);
  };

  const classes = [
    "tt-stepper",
    `tt-stepper--variant-${variant}`,
    disabled && "tt-stepper--disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} role="group" aria-label={ariaLabel}>
      <button
        type="button"
        className="tt-stepper__btn"
        aria-label="Decrement"
        disabled={disabled || current <= min}
        onClick={() => setNext(current - step)}
      >
        <MinusIcon />
      </button>
      <input
        className="tt-stepper__value"
        type="number"
        value={current}
        disabled={disabled}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (!Number.isNaN(n)) setNext(n);
        }}
        aria-live="polite"
      />
      <button
        type="button"
        className="tt-stepper__btn"
        aria-label="Increment"
        disabled={disabled || current >= max}
        onClick={() => setNext(current + step)}
      >
        <PlusIcon />
      </button>
    </div>
  );
}

