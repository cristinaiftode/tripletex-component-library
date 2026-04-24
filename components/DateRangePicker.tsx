import { useState } from "react";
import { Calendar } from "./Calendar";
import "./Calendar.css";

export type DateRange = { start: Date | null; end: Date | null };

export type DateRangePickerProps = {
  value?: DateRange;
  defaultValue?: DateRange;
  onChange?: (range: DateRange) => void;
  defaultMonth?: Date;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
};

function startOfMonth(d: Date) { return new Date(d.getFullYear(), d.getMonth(), 1); }
function addMonths(d: Date, n: number) { return new Date(d.getFullYear(), d.getMonth() + n, 1); }

export function DateRangePicker(props: DateRangePickerProps) {
  const {
    value,
    defaultValue,
    onChange,
    defaultMonth,
    minDate,
    maxDate,
    className,
  } = props;

  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<DateRange>(
    defaultValue ?? { start: null, end: null },
  );
  const range = isControlled ? value! : internal;

  const baseMonth = defaultMonth ?? startOfMonth(range.start ?? new Date());
  const [leftMonth, setLeftMonth] = useState<Date>(baseMonth);

  const apply = (next: DateRange) => {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  const handlePick = (d: Date) => {
    if (!range.start || (range.start && range.end)) {
      apply({ start: d, end: null });
    } else if (d < range.start) {
      apply({ start: d, end: range.start });
    } else {
      apply({ start: range.start, end: d });
    }
  };

  const rightMonth = addMonths(leftMonth, 1);

  return (
    <div className={["tt-date-range", className].filter(Boolean).join(" ")}>
      <div className="tt-date-range__months">
        <Calendar
          value={null}
          month={leftMonth}
          onMonthChange={setLeftMonth}
          onChange={handlePick}
          rangeStart={range.start}
          rangeEnd={range.end}
          minDate={minDate}
          maxDate={maxDate}
        />
        <Calendar
          value={null}
          month={rightMonth}
          onMonthChange={(m) => setLeftMonth(addMonths(m, -1))}
          onChange={handlePick}
          rangeStart={range.start}
          rangeEnd={range.end}
          minDate={minDate}
          maxDate={maxDate}
        />
      </div>
    </div>
  );
}
