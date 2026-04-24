import React, { useMemo, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons";
import "./Calendar.css";

export type CalendarValue = Date | null;

export type CalendarProps = {
  value?: CalendarValue;
  defaultValue?: CalendarValue;
  month?: Date;
  defaultMonth?: Date;
  onChange?: (date: Date) => void;
  onMonthChange?: (date: Date) => void;
  showWeekNumbers?: boolean;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  /** Used internally by DateRangePicker to highlight a range. */
  rangeStart?: Date | null;
  rangeEnd?: Date | null;
};

const MONTHS_NO = [
  "januar", "februar", "mars", "april", "mai", "juni",
  "juli", "august", "september", "oktober", "november", "desember",
];
const WEEKDAYS_NO = ["man", "tir", "ons", "tor", "fre", "lør", "søn"];

function isoWeek(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate();
}

function startOfMonth(d: Date) { return new Date(d.getFullYear(), d.getMonth(), 1); }
function addMonths(d: Date, n: number) { return new Date(d.getFullYear(), d.getMonth() + n, 1); }
function startOfWeekMon(d: Date) {
  const x = new Date(d);
  const day = (x.getDay() + 6) % 7;
  x.setDate(x.getDate() - day);
  return x;
}

function buildWeeks(viewMonth: Date): Date[][] {
  const first = startOfMonth(viewMonth);
  const gridStart = startOfWeekMon(first);
  const weeks: Date[][] = [];
  for (let w = 0; w < 6; w++) {
    const row: Date[] = [];
    for (let d = 0; d < 7; d++) {
      row.push(new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + w * 7 + d));
    }
    weeks.push(row);
  }
  return weeks;
}

export function Calendar(props: CalendarProps) {
  const {
    value,
    defaultValue,
    month,
    defaultMonth,
    onChange,
    onMonthChange,
    showWeekNumbers = true,
    minDate,
    maxDate,
    className,
    rangeStart,
    rangeEnd,
  } = props;

  const isControlledValue = value !== undefined;
  const isControlledMonth = month !== undefined;

  const [internalValue, setInternalValue] = useState<CalendarValue>(defaultValue ?? null);
  const selected = isControlledValue ? value : internalValue;

  const initialMonth = defaultMonth ?? (selected ? startOfMonth(selected) : startOfMonth(new Date()));
  const [internalMonth, setInternalMonth] = useState<Date>(initialMonth);
  const viewMonth = isControlledMonth ? month! : internalMonth;

  const weeks = useMemo(() => buildWeeks(viewMonth), [viewMonth]);
  const today = new Date();

  const setMonth = (m: Date) => {
    if (!isControlledMonth) setInternalMonth(m);
    onMonthChange?.(m);
  };

  const pick = (d: Date) => {
    if (!isControlledValue) setInternalValue(d);
    onChange?.(d);
  };

  const isDisabled = (d: Date) => {
    if (minDate && d < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) return true;
    if (maxDate && d > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())) return true;
    return false;
  };

  const title = `${MONTHS_NO[viewMonth.getMonth()]} ${viewMonth.getFullYear()}`;

  return (
    <div className={["tt-calendar", className].filter(Boolean).join(" ")}>
      <div className="tt-calendar__header">
        <button
          type="button"
          className="tt-calendar__nav"
          aria-label="Previous month"
          onClick={() => setMonth(addMonths(viewMonth, -1))}
        >
          <ChevronLeftIcon />
        </button>
        <div className="tt-calendar__title">{title}</div>
        <button
          type="button"
          className="tt-calendar__nav"
          aria-label="Next month"
          onClick={() => setMonth(addMonths(viewMonth, 1))}
        >
          <ChevronRightIcon />
        </button>
      </div>

      <div className={`tt-calendar__grid${showWeekNumbers ? "" : " tt-calendar__grid--no-week"}`} role="grid">
        {showWeekNumbers ? (
          <span className="tt-calendar__weekday tt-calendar__weekday--wk">Uke</span>
        ) : null}
        {WEEKDAYS_NO.map((d) => (
          <span key={d} className="tt-calendar__weekday">{d}</span>
        ))}

        {weeks.map((row, wi) => (
          <React.Fragment key={wi}>
            {showWeekNumbers && (
              <span className="tt-calendar__week">
                <span className="tt-calendar__week-inner">{isoWeek(row[0])}</span>
              </span>
            )}
            {row.map((day) => {
              const outside = day.getMonth() !== viewMonth.getMonth();
              const isSunday = day.getDay() === 0;
              const isToday = sameDay(day, today);
              const isSelected = selected ? sameDay(day, selected) : false;
              const disabled = isDisabled(day);

              let inRange = false;
              let rStart = false;
              let rEnd = false;
              if (rangeStart && rangeEnd) {
                const a = rangeStart < rangeEnd ? rangeStart : rangeEnd;
                const b = rangeStart < rangeEnd ? rangeEnd : rangeStart;
                if (day >= new Date(a.getFullYear(), a.getMonth(), a.getDate())
                  && day <= new Date(b.getFullYear(), b.getMonth(), b.getDate())) {
                  inRange = true;
                  rStart = sameDay(day, a);
                  rEnd = sameDay(day, b);
                }
              } else if (rangeStart) {
                rStart = sameDay(day, rangeStart);
              }

              const classes = [
                "tt-calendar__day",
                outside && "tt-calendar__day--outside",
                isSunday && !isSelected && !inRange && "tt-calendar__day--sunday",
                isToday && !isSelected && "tt-calendar__day--today",
                (isSelected || rStart || rEnd) && "tt-calendar__day--selected",
                inRange && !rStart && !rEnd && "tt-calendar__day--in-range",
                rStart && inRange && !rEnd && "tt-calendar__day--range-start",
                rEnd && inRange && !rStart && "tt-calendar__day--range-end",
              ].filter(Boolean).join(" ");

              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  className={classes}
                  disabled={disabled}
                  onClick={() => !disabled && pick(day)}
                  aria-label={day.toDateString()}
                  aria-selected={isSelected}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

