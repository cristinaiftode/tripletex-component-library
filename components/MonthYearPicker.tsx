import { useState } from "react";
import "./Calendar.css";
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons";

export type MonthYearValue = { year: number; month: number | null };

export type MonthYearPickerProps = {
  value?: MonthYearValue;
  defaultValue?: MonthYearValue;
  onChange?: (value: MonthYearValue) => void;
  size?: "default" | "large";
  /** Use filled (info-active) style for the selected month instead of outlined. */
  filledSelection?: boolean;
  className?: string;
};

const MONTHS_SHORT_NO = [
  "jan", "feb", "mar", "apr", "mai", "jun",
  "jul", "aug", "sep", "okt", "nov", "des",
];

export function MonthYearPicker(props: MonthYearPickerProps) {
  const {
    value,
    defaultValue,
    onChange,
    size = "default",
    filledSelection = false,
    className,
  } = props;

  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<MonthYearValue>(
    defaultValue ?? { year: new Date().getFullYear(), month: null },
  );
  const v = isControlled ? value! : internal;

  const set = (next: MonthYearValue) => {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  const classes = [
    "tt-my-picker",
    size === "large" && "tt-my-picker--large",
    className,
  ].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      <div className="tt-my-picker__header">
        <button
          type="button"
          className="tt-my-picker__nav"
          aria-label="Previous year"
          onClick={() => set({ ...v, year: v.year - 1 })}
        >
          <ChevronLeftIcon />
        </button>
        <button type="button" className="tt-my-picker__year-select">
          Select "{v.year}"
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          className="tt-my-picker__nav"
          aria-label="Next year"
          onClick={() => set({ ...v, year: v.year + 1 })}
        >
          <ChevronRightIcon />
        </button>
      </div>
      <div className="tt-my-picker__grid">
        {MONTHS_SHORT_NO.map((label, idx) => {
          const selected = v.month === idx;
          const cls = [
            "tt-my-picker__month",
            selected && (filledSelection ? "tt-my-picker__month--selected-filled" : "tt-my-picker__month--selected"),
          ].filter(Boolean).join(" ");
          return (
            <button
              key={label}
              type="button"
              className={cls}
              onClick={() => set({ year: v.year, month: idx })}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
