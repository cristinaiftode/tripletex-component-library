import { Fragment, type ReactNode } from "react";
import "./Table.css";

export type TableSortDirection = "asc" | "desc";

export type TableSort = {
  columnId: string;
  direction: TableSortDirection;
};

export type TableRowTone =
  | "default"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "automation";

export type TableColumn<T> = {
  id: string;
  label: string;
  align?: "left" | "right";
  sortable?: boolean;
  width?: number | string;
  render?: (row: T, rowIndex: number) => ReactNode;
};

export type TableProps<T> = {
  columns: TableColumn<T>[];
  rows: T[];
  getRowId?: (row: T, index: number) => string;
  sort?: TableSort | null;
  onSortChange?: (sort: TableSort | null) => void;
  activeRowId?: string | null;
  onRowClick?: (row: T, index: number) => void;
  getRowTone?: (row: T, index: number) => TableRowTone | undefined;
  selectable?: boolean;
  selectedRowIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  expandable?: boolean;
  expandedRowIds?: string[];
  onExpandedChange?: (ids: string[]) => void;
  renderExpanded?: (row: T, rowIndex: number) => ReactNode;
  emptyMessage?: string;
  className?: string;
  "aria-label"?: string;
};

export function Table<T>(props: TableProps<T>) {
  const {
    columns,
    rows,
    getRowId,
    sort,
    onSortChange,
    activeRowId,
    onRowClick,
    getRowTone,
    selectable = false,
    selectedRowIds,
    onSelectionChange,
    expandable = false,
    expandedRowIds,
    onExpandedChange,
    renderExpanded,
    emptyMessage = "No data",
    className,
    "aria-label": ariaLabel,
  } = props;

  const classes = ["tt-table", className].filter(Boolean).join(" ");
  const selectedSet = new Set(selectedRowIds ?? []);
  const expandedSet = new Set(expandedRowIds ?? []);

  const rowIds = rows
    .map((row, i) => getRowId?.(row, i))
    .filter((id): id is string => id != null);
  const allSelected = rowIds.length > 0 && rowIds.every((id) => selectedSet.has(id));
  const someSelected = rowIds.some((id) => selectedSet.has(id)) && !allSelected;

  const handleSortClick = (column: TableColumn<T>) => {
    if (!column.sortable || !onSortChange) return;
    if (sort?.columnId === column.id) {
      if (sort.direction === "asc") {
        onSortChange({ columnId: column.id, direction: "desc" });
      } else {
        onSortChange(null);
      }
    } else {
      onSortChange({ columnId: column.id, direction: "asc" });
    }
  };

  const handleSelectAll = () => {
    if (!onSelectionChange) return;
    onSelectionChange(allSelected ? [] : rowIds);
  };

  const toggleSelected = (id: string) => {
    if (!onSelectionChange) return;
    const next = new Set(selectedSet);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onSelectionChange(Array.from(next));
  };

  const toggleExpanded = (id: string) => {
    if (!onExpandedChange) return;
    const next = new Set(expandedSet);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onExpandedChange(Array.from(next));
  };

  const totalCols = columns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0);

  return (
    <table className={classes} aria-label={ariaLabel}>
      <thead className="tt-table__head">
        <tr className="tt-table__head-row">
          {selectable && (
            <th
              className="tt-table__head-cell tt-table__head-cell--control"
              scope="col"
              aria-label="Select all rows"
            >
              <label className="tt-table__checkbox-wrap">
                <input
                  type="checkbox"
                  className="tt-table__checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected;
                  }}
                  onChange={handleSelectAll}
                  aria-label="Select all rows"
                />
              </label>
            </th>
          )}
          {expandable && (
            <th
              className="tt-table__head-cell tt-table__head-cell--control"
              scope="col"
              aria-hidden="true"
            />
          )}
          {columns.map((col) => {
            const align = col.align ?? "left";
            const isSorted = sort?.columnId === col.id;
            const cellClasses = [
              "tt-table__head-cell",
              `tt-table__head-cell--align-${align}`,
              col.sortable && "tt-table__head-cell--sortable",
              isSorted && "tt-table__head-cell--sorted",
            ]
              .filter(Boolean)
              .join(" ");
            return (
              <th
                key={col.id}
                className={cellClasses}
                style={col.width ? { width: col.width } : undefined}
                scope="col"
                aria-sort={
                  isSorted
                    ? sort!.direction === "asc"
                      ? "ascending"
                      : "descending"
                    : col.sortable
                      ? "none"
                      : undefined
                }
              >
                {col.sortable ? (
                  <button
                    type="button"
                    className="tt-table__sort-btn"
                    onClick={() => handleSortClick(col)}
                  >
                    {align === "right" && (
                      <SortIcon direction={isSorted ? sort!.direction : "none"} />
                    )}
                    <span className="tt-table__head-label">{col.label}</span>
                    {align !== "right" && (
                      <SortIcon direction={isSorted ? sort!.direction : "none"} />
                    )}
                  </button>
                ) : (
                  <span className="tt-table__head-label">{col.label}</span>
                )}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className="tt-table__body">
        {rows.length === 0 ? (
          <tr className="tt-table__row tt-table__row--empty">
            <td className="tt-table__cell" colSpan={totalCols}>
              {emptyMessage}
            </td>
          </tr>
        ) : (
          rows.map((row, rowIndex) => {
            const rowId = getRowId?.(row, rowIndex);
            const isActive = rowId != null && rowId === activeRowId;
            const isSelected = rowId != null && selectedSet.has(rowId);
            const isExpanded = rowId != null && expandedSet.has(rowId);
            const tone = getRowTone?.(row, rowIndex) ?? "default";
            const rowClasses = [
              "tt-table__row",
              `tt-table__row--tone-${tone}`,
              isActive && "tt-table__row--active",
              isSelected && "tt-table__row--selected",
              onRowClick && "tt-table__row--interactive",
            ]
              .filter(Boolean)
              .join(" ");

            const stopRowClick = (e: React.MouseEvent | React.ChangeEvent) => {
              e.stopPropagation();
            };

            return (
              <Fragment key={rowId ?? rowIndex}>
                <tr
                  className={rowClasses}
                  onClick={onRowClick ? () => onRowClick(row, rowIndex) : undefined}
                  aria-current={isActive ? "true" : undefined}
                  aria-selected={selectable ? isSelected : undefined}
                >
                  {selectable && (
                    <td className="tt-table__cell tt-table__cell--control tt-table__cell--first">
                      {isActive && (
                        <span className="tt-table__active-bar" aria-hidden="true" />
                      )}
                      <label
                        className="tt-table__checkbox-wrap"
                        onClick={stopRowClick}
                      >
                        <input
                          type="checkbox"
                          className="tt-table__checkbox"
                          checked={isSelected}
                          onChange={(e) => {
                            stopRowClick(e);
                            if (rowId != null) toggleSelected(rowId);
                          }}
                          aria-label={`Select row ${rowIndex + 1}`}
                        />
                      </label>
                    </td>
                  )}
                  {expandable && (
                    <td
                      className={[
                        "tt-table__cell",
                        "tt-table__cell--control",
                        !selectable && "tt-table__cell--first",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {!selectable && isActive && (
                        <span className="tt-table__active-bar" aria-hidden="true" />
                      )}
                      <button
                        type="button"
                        className={[
                          "tt-table__expand-btn",
                          isExpanded && "tt-table__expand-btn--open",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        onClick={(e) => {
                          stopRowClick(e);
                          if (rowId != null) toggleExpanded(rowId);
                        }}
                        aria-expanded={isExpanded}
                        aria-label={isExpanded ? "Collapse row" : "Expand row"}
                      >
                        <ChevronIcon />
                      </button>
                    </td>
                  )}
                  {columns.map((col, colIndex) => {
                    const align = col.align ?? "left";
                    const isFirstDataCol =
                      colIndex === 0 && !selectable && !expandable;
                    const cellClasses = [
                      "tt-table__cell",
                      `tt-table__cell--align-${align}`,
                      isFirstDataCol && "tt-table__cell--first",
                    ]
                      .filter(Boolean)
                      .join(" ");
                    const value = col.render
                      ? col.render(row, rowIndex)
                      : ((row as Record<string, unknown>)[col.id] as ReactNode);
                    return (
                      <td key={col.id} className={cellClasses}>
                        {isFirstDataCol && isActive && (
                          <span className="tt-table__active-bar" aria-hidden="true" />
                        )}
                        {value as ReactNode}
                      </td>
                    );
                  })}
                </tr>
                {expandable && isExpanded && renderExpanded && (
                  <tr
                    className={`tt-table__row tt-table__row--expanded tt-table__row--tone-${tone}`}
                  >
                    <td
                      className="tt-table__cell tt-table__cell--expanded"
                      colSpan={totalCols}
                    >
                      {renderExpanded(row, rowIndex)}
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })
        )}
      </tbody>
    </table>
  );
}

function SortIcon({ direction }: { direction: TableSortDirection | "none" }) {
  return (
    <span className="tt-table__sort-icon" aria-hidden="true">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M7 8l3-3 3 3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={direction === "desc" ? 0.3 : 1}
        />
        <path
          d="M7 12l3 3 3-3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={direction === "asc" ? 0.3 : 1}
        />
      </svg>
    </span>
  );
}

function ChevronIcon() {
  return (
    <svg
      className="tt-table__expand-icon"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 8l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
