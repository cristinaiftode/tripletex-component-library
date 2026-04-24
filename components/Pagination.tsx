import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons";
import "./Pagination.css";

export type PaginationProps = {
  page?: number;
  defaultPage?: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  className?: string;
};

export function Pagination(props: PaginationProps) {
  const { page, defaultPage = 1, totalPages, onPageChange, className } = props;

  const isControlled = page !== undefined;
  const [internal, setInternal] = useState(defaultPage);
  const current = isControlled ? page! : internal;

  const go = (p: number) => {
    const clamped = Math.max(1, Math.min(totalPages, p));
    if (!isControlled) setInternal(clamped);
    onPageChange?.(clamped);
  };

  return (
    <div className={["tt-pagination", className].filter(Boolean).join(" ")}>
      <button
        type="button"
        className="tt-pagination__button"
        disabled={current <= 1}
        onClick={() => go(current - 1)}
      >
        Previous
      </button>
      <span className="tt-pagination__status">{current} of {totalPages}</span>
      <button
        type="button"
        className="tt-pagination__button"
        disabled={current >= totalPages}
        onClick={() => go(current + 1)}
      >
        Next
      </button>
    </div>
  );
}

export type TablePaginationProps = {
  page?: number;
  defaultPage?: number;
  pageSize: number;
  total: number;
  onPageChange?: (page: number) => void;
  onRangeClick?: () => void;
  className?: string;
};

export function TablePagination(props: TablePaginationProps) {
  const {
    page,
    defaultPage = 1,
    pageSize,
    total,
    onPageChange,
    onRangeClick,
    className,
  } = props;

  const isControlled = page !== undefined;
  const [internal, setInternal] = useState(defaultPage);
  const current = isControlled ? page! : internal;

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = total === 0 ? 0 : (current - 1) * pageSize + 1;
  const end = Math.min(current * pageSize, total);

  const go = (p: number) => {
    const clamped = Math.max(1, Math.min(totalPages, p));
    if (!isControlled) setInternal(clamped);
    onPageChange?.(clamped);
  };

  return (
    <div className={["tt-table-pagination", className].filter(Boolean).join(" ")}>
      <button
        type="button"
        className="tt-table-pagination__button tt-table-pagination__range"
        onClick={onRangeClick}
      >
        {start}-{end} of {total}
      </button>
      <button
        type="button"
        className="tt-table-pagination__button tt-table-pagination__icon-btn"
        aria-label="Previous page"
        disabled={current <= 1}
        onClick={() => go(current - 1)}
      >
        <ChevronLeftIcon />
      </button>
      <button
        type="button"
        className="tt-table-pagination__button tt-table-pagination__icon-btn"
        aria-label="Next page"
        disabled={current >= totalPages}
        onClick={() => go(current + 1)}
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
}

