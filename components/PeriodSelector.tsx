import { useMemo, useState } from "react";
import "./Calendar.css";

export type PeriodRange = { start: Date; end: Date };
export type QuickRangeKey =
  | "tilNow"
  | "today"
  | "thisWeek"
  | "thisMonth"
  | "thisYear"
  | "next30";

export type PeriodSelectorProps = {
  value?: PeriodRange;
  defaultValue?: PeriodRange;
  onChange?: (range: PeriodRange) => void;
  onConfirm?: (range: PeriodRange) => void;
  /** Year shown in the timeline. Defaults to the current year. */
  year?: number;
  className?: string;
};

const MONTHS_SHORT_NO = [
  "jan", "feb", "mar", "apr", "mai", "jun",
  "jul", "aug", "sep", "okt", "nov", "des",
];

const QUICK_RANGES: Array<{ key: QuickRangeKey; label: string }> = [
  { key: "tilNow",    label: "Hittil i denne uken" },
  { key: "today",     label: "I dag" },
  { key: "thisWeek",  label: "Denne uken" },
  { key: "thisMonth", label: "Hele denne måned" },
  { key: "thisYear",  label: "I år" },
  { key: "next30",    label: "Neste 30 dager" },
];

function startOfWeekMon(d: Date) {
  const x = new Date(d);
  const day = (x.getDay() + 6) % 7;
  x.setDate(x.getDate() - day);
  x.setHours(0, 0, 0, 0);
  return x;
}
function endOfDay(d: Date) { const x = new Date(d); x.setHours(23, 59, 59, 999); return x; }
function startOfDay(d: Date) { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; }

function computeQuickRange(key: QuickRangeKey, now: Date = new Date()): PeriodRange {
  switch (key) {
    case "today": {
      return { start: startOfDay(now), end: endOfDay(now) };
    }
    case "tilNow": {
      const start = startOfWeekMon(now);
      return { start, end: endOfDay(now) };
    }
    case "thisWeek": {
      const start = startOfWeekMon(now);
      const end = new Date(start); end.setDate(end.getDate() + 6); end.setHours(23, 59, 59, 999);
      return { start, end };
    }
    case "thisMonth": {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
      return { start, end };
    }
    case "thisYear": {
      const start = new Date(now.getFullYear(), 0, 1);
      const end = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
      return { start, end };
    }
    case "next30": {
      const start = startOfDay(now);
      const end = new Date(start); end.setDate(end.getDate() + 30); end.setHours(23, 59, 59, 999);
      return { start, end };
    }
  }
}

function dayOfYear(d: Date): number {
  const start = new Date(d.getFullYear(), 0, 1);
  return Math.floor((d.getTime() - start.getTime()) / 86400000);
}
function daysInYear(year: number): number {
  return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) ? 366 : 365;
}

export function PeriodSelector(props: PeriodSelectorProps) {
  const {
    value,
    defaultValue,
    onChange,
    onConfirm,
    year = new Date().getFullYear(),
    className,
  } = props;

  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<PeriodRange>(
    defaultValue ?? computeQuickRange("thisMonth"),
  );
  const range = isControlled ? value! : internal;

  const [activeQuick, setActiveQuick] = useState<QuickRangeKey | null>(null);

  const apply = (next: PeriodRange, quick: QuickRangeKey | null = null) => {
    if (!isControlled) setInternal(next);
    setActiveQuick(quick);
    onChange?.(next);
  };

  const total = daysInYear(year);

  const rangeLeft = useMemo(() => {
    const startDay = Math.max(0, dayOfYear(range.start));
    return (startDay / total) * 100;
  }, [range.start, total]);
  const rangeRight = useMemo(() => {
    const endDay = Math.min(total - 1, dayOfYear(range.end));
    return ((endDay + 1) / total) * 100;
  }, [range.end, total]);

  const mvaTerms = [
    "1. termin", "2. termin", "3. termin", "4. termin", "5. termin", "6. termin",
  ];
  const periods = ["Q1", "Q2", "Q3", "Q4"];
  const weeks = Array.from({ length: 53 }, (_, i) => i + 1);

  return (
    <div className={["tt-period-selector", className].filter(Boolean).join(" ")}>
      <div className="tt-period-selector__timeline">
        <div className="tt-period-selector__labels">
          <span className="tt-period-selector__row-label">År</span>
          <span className="tt-period-selector__row-label">Mva-termin</span>
          <span className="tt-period-selector__row-label">Periode</span>
          <span className="tt-period-selector__row-label">Måned</span>
          <span className="tt-period-selector__row-label">Uke</span>
        </div>
        <div className="tt-period-selector__timeline-track">
          <div className="tt-period-selector__markers">
            <div
              className="tt-period-selector__marker"
              style={{ left: `${rangeLeft}%` }}
              aria-label="Range start"
            >
              <DragIcon />
            </div>
            <div
              className="tt-period-selector__marker"
              style={{ left: `${rangeRight}%` }}
              aria-label="Range end"
            >
              <DragIcon />
            </div>
            <div
              className="tt-period-selector__range-line"
              style={{ left: `${rangeLeft}%`, right: `${100 - rangeRight}%` }}
            />
          </div>

          <div className="tt-period-selector__row" style={{ gridTemplateColumns: "1fr" }}>
            <span className="tt-period-selector__cell">{year}</span>
          </div>

          <div className="tt-period-selector__row" style={{ gridTemplateColumns: "repeat(6, 1fr)" }}>
            {mvaTerms.map((t) => (
              <span key={t} className="tt-period-selector__cell">{t}</span>
            ))}
          </div>

          <div className="tt-period-selector__row" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
            {periods.map((p) => (
              <span key={p} className="tt-period-selector__cell">{p}</span>
            ))}
          </div>

          <div className="tt-period-selector__row" style={{ gridTemplateColumns: "repeat(12, 1fr)" }}>
            {MONTHS_SHORT_NO.map((m, i) => {
              const monthStart = new Date(year, i, 1);
              const monthEnd = new Date(year, i + 1, 0);
              const inRange = monthStart >= startOfDay(range.start) && monthEnd <= endOfDay(range.end);
              return (
                <span
                  key={m}
                  className={`tt-period-selector__cell${inRange ? " tt-period-selector__cell--in-range" : ""}`}
                  onClick={() => {
                    const start = new Date(year, i, 1);
                    const end = new Date(year, i + 1, 0, 23, 59, 59, 999);
                    apply({ start, end });
                  }}
                >
                  {m}
                </span>
              );
            })}
          </div>

          <div className="tt-period-selector__row" style={{ gridTemplateColumns: `repeat(${weeks.length}, 1fr)` }}>
            {weeks.map((w) => (
              <span key={w} className="tt-period-selector__cell" style={{ fontSize: 10 }}>
                {w}
              </span>
            ))}
          </div>
        </div>

      </div>

      <div className="tt-period-selector__footer">
        <div className="tt-period-selector__quick">
          {QUICK_RANGES.map((qr) => (
            <button
              key={qr.key}
              type="button"
              className={`tt-period-selector__quick-btn${activeQuick === qr.key ? " tt-period-selector__quick-btn--active" : ""}`}
              onClick={() => apply(computeQuickRange(qr.key), qr.key)}
            >
              {qr.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="tt-period-selector__ok"
          onClick={() => onConfirm?.(range)}
        >
          Ok
        </button>
      </div>
    </div>
  );
}

function DragIcon() {
  return (
    <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="7" fill="var(--surface-default)" stroke="var(--border-active)" strokeWidth="1.5" />
      <path d="M7 6v6M11 6v6" stroke="var(--border-active)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
