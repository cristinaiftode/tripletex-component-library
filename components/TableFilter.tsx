import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./TableFilter.css";

export type TableFilterProps = {
  filterButton?: ReactNode;
  search?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export function TableFilter({
  filterButton,
  search,
  actions,
  children,
  className,
}: TableFilterProps) {
  const classes = ["tt-table-filter", className].filter(Boolean).join(" ");
  return (
    <div className={classes} role="toolbar" aria-label="Table filter">
      <div className="tt-table-filter__main">
        {filterButton && (
          <div className="tt-table-filter__filter">{filterButton}</div>
        )}
        {search && <div className="tt-table-filter__search">{search}</div>}
        {children && <div className="tt-table-filter__slot">{children}</div>}
      </div>
      {actions && <div className="tt-table-filter__actions">{actions}</div>}
    </div>
  );
}

export type FilterButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "children"
> & {
  label?: string;
  active?: boolean;
  count?: number;
};

export function FilterButton({
  label = "Filter",
  active = false,
  count,
  className,
  ...rest
}: FilterButtonProps) {
  const classes = [
    "tt-filter-button",
    active && "tt-filter-button--active",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <button type="button" className={classes} {...rest}>
      <span className="tt-filter-button__label">{label}</span>
      <FunnelIcon active={active} />
      {typeof count === "number" && count > 0 && (
        <span className="tt-filter-button__count" aria-label={`${count} active filters`}>
          {count}
        </span>
      )}
    </button>
  );
}

export type TableFilterIconButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "children"
> & {
  icon: ReactNode;
  "aria-label": string;
  active?: boolean;
};

export function TableFilterIconButton({
  icon,
  active = false,
  className,
  ...rest
}: TableFilterIconButtonProps) {
  const classes = [
    "tt-table-filter__icon-btn",
    active && "tt-table-filter__icon-btn--active",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <button type="button" className={classes} {...rest}>
      {icon}
    </button>
  );
}

function FunnelIcon({ active }: { active: boolean }) {
  return (
    <svg
      className="tt-filter-button__icon"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 4.5h13l-5 6v4.5l-3 1.5v-6l-5-6Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill={active ? "currentColor" : "none"}
      />
    </svg>
  );
}
