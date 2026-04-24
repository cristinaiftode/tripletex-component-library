import React, { useEffect, useId, useRef, useState } from "react";
import "./Dropdown.css";
import { Chip } from "./Chip";
import { ChevronDownIcon, SearchIcon, CloseIcon } from "./Icons";

export type DropdownOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type DropdownBaseProps = {
  label?: React.ReactNode;
  placeholder?: string;
  options: DropdownOption[];
  searchable?: boolean;
  disabled?: boolean;
  width?: number | string;
  className?: string;
};

type DropdownSingleProps = DropdownBaseProps & {
  multiple?: false;
  value?: string | null;
  defaultValue?: string;
  onChange?: (value: string) => void;
};

type DropdownMultipleProps = DropdownBaseProps & {
  multiple: true;
  value?: string[];
  defaultValue?: string[];
  onChange?: (values: string[]) => void;
};

export type DropdownProps = DropdownSingleProps | DropdownMultipleProps;

export function Dropdown(props: DropdownProps) {
  const {
    label,
    placeholder = "Select",
    options,
    searchable,
    disabled,
    width = 310,
    className,
  } = props;

  const uid = useId();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const isMulti = props.multiple === true;

  const [internalSingle, setInternalSingle] = useState<string | undefined>(
    isMulti ? undefined : (props as DropdownSingleProps).defaultValue,
  );
  const [internalMulti, setInternalMulti] = useState<string[]>(
    isMulti ? ((props as DropdownMultipleProps).defaultValue ?? []) : [],
  );

  const singleValue = isMulti
    ? undefined
    : ((props as DropdownSingleProps).value !== undefined
        ? (props as DropdownSingleProps).value ?? undefined
        : internalSingle);
  const multiValue = isMulti
    ? ((props as DropdownMultipleProps).value !== undefined
        ? (props as DropdownMultipleProps).value!
        : internalMulti)
    : [];

  const filtered = searchable && query
    ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : options;

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  useEffect(() => {
    if (open && searchable) searchRef.current?.focus();
  }, [open, searchable]);

  const selectSingle = (v: string) => {
    if ((props as DropdownSingleProps).value === undefined) setInternalSingle(v);
    (props as DropdownSingleProps).onChange?.(v);
    setOpen(false);
    setQuery("");
  };

  const toggleMulti = (v: string) => {
    const next = multiValue.includes(v)
      ? multiValue.filter((x) => x !== v)
      : [...multiValue, v];
    if ((props as DropdownMultipleProps).value === undefined) setInternalMulti(next);
    (props as DropdownMultipleProps).onChange?.(next);
  };

  const clearAll = () => {
    if ((props as DropdownMultipleProps).value === undefined) setInternalMulti([]);
    (props as DropdownMultipleProps).onChange?.([]);
  };

  const removeOne = (v: string) => {
    const next = multiValue.filter((x) => x !== v);
    if ((props as DropdownMultipleProps).value === undefined) setInternalMulti(next);
    (props as DropdownMultipleProps).onChange?.(next);
  };

  const selectedOptions = multiValue
    .map((v) => options.find((o) => o.value === v))
    .filter(Boolean) as DropdownOption[];

  const triggerText = isMulti
    ? (placeholder ?? "")
    : (options.find((o) => o.value === singleValue)?.label ?? "");

  const showPlaceholder = isMulti
    ? multiValue.length === 0 && !placeholder
    : !singleValue;

  const wrapperClasses = [
    "tt-dropdown",
    disabled && "tt-dropdown--disabled",
    open && "tt-dropdown--open",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={rootRef}
      className={wrapperClasses}
      style={{ width }}
    >
      {label != null && (
        <label className="tt-dropdown__label" htmlFor={`${uid}-trigger`}>
          {label}
        </label>
      )}
      <button
        id={`${uid}-trigger`}
        type="button"
        className="tt-dropdown__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
      >
        <span
          className={`tt-dropdown__trigger-value${showPlaceholder ? " tt-dropdown__trigger-value--placeholder" : ""}`}
        >
          {showPlaceholder ? placeholder : triggerText || placeholder}
        </span>
        <span className="tt-dropdown__chevron" aria-hidden="true">
          <ChevronDownIcon />
        </span>
      </button>

      {open && (
        <div className="tt-dropdown__drawer" role="listbox">
          {searchable && (
            <div className="tt-dropdown__search-wrap">
              <div className={`tt-dropdown__search${query ? " tt-dropdown__search--active" : ""}`}>
                <input
                  ref={searchRef}
                  className="tt-dropdown__search-input"
                  type="text"
                  placeholder="Search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                  <button
                    type="button"
                    className="tt-dropdown__search-clear"
                    aria-label="Clear search"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setQuery("");
                      searchRef.current?.focus();
                    }}
                  >
                    <CloseIcon />
                  </button>
                )}
                <span className="tt-dropdown__search-icon" aria-hidden="true">
                  <SearchIcon />
                </span>
              </div>
            </div>
          )}

          {isMulti && multiValue.length > 0 && (
            <div className="tt-dropdown__selected">
              <div className="tt-dropdown__selected-header">
                <span className="tt-dropdown__selected-label">Selected</span>
                <button
                  type="button"
                  className="tt-dropdown__clear-all"
                  onClick={clearAll}
                >
                  Clear all
                </button>
              </div>
              <div className="tt-dropdown__chips">
                {selectedOptions.map((opt) => (
                  <Chip
                    key={opt.value}
                    label={opt.label}
                    size="small"
                    variant="removable"
                    onRemove={() => removeOne(opt.value)}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="tt-dropdown__options">
            {filtered.length === 0 ? (
              <div className="tt-dropdown__empty">
                <SearchIllustration />
                <p className="tt-dropdown__empty-text">No results found</p>
              </div>
            ) : (
              <ul className="tt-dropdown__option-list">
                {filtered.map((opt) => {
                  const selected = isMulti
                    ? multiValue.includes(opt.value)
                    : singleValue === opt.value;
                  return (
                    <li
                      key={opt.value}
                      role="option"
                      aria-selected={selected}
                      className={`tt-dropdown__option${selected ? " tt-dropdown__option--selected" : ""}${opt.disabled ? " tt-dropdown__option--disabled" : ""}`}
                      onClick={() => {
                        if (opt.disabled) return;
                        if (isMulti) toggleMulti(opt.value);
                        else selectSingle(opt.value);
                      }}
                    >
                      <span className="tt-dropdown__option-label">{opt.label}</span>
                      {isMulti && (
                        <span
                          className={`tt-dropdown__option-check${selected ? " tt-dropdown__option-check--checked" : ""}`}
                          aria-hidden="true"
                        >
                          {selected && (
                            <svg viewBox="0 0 20 20" fill="none">
                              <path
                                d="M5 10.5l3 3 7-7"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function SearchIllustration() {
  return (
    <svg
      className="tt-dropdown__empty-illustration"
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="42" cy="42" r="26" stroke="#0a41fa" strokeWidth="3" />
      <circle cx="42" cy="42" r="20" fill="#e6ebff" />
      <path d="M62 62l18 18" stroke="#0a41fa" strokeWidth="4" strokeLinecap="round" />
      <path d="M34 40h16M34 46h12" stroke="#0a41fa" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}
