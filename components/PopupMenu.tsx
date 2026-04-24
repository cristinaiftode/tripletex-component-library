import React from "react";
import "./PopupMenu.css";

export type PopupMenuProps = {
  children: React.ReactNode;
  width?: number | string;
  className?: string;
  "aria-label"?: string;
};

export function PopupMenu({
  children,
  width,
  className,
  "aria-label": ariaLabel,
}: PopupMenuProps) {
  const classes = ["tt-popup-menu", className].filter(Boolean).join(" ");
  const style = width !== undefined ? { width } : undefined;
  return (
    <div className={classes} role="menu" aria-label={ariaLabel} style={style}>
      {children}
    </div>
  );
}

export type PopupMenuItemProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  selected?: boolean;
  focused?: boolean;
  className?: string;
};

export function PopupMenuItem(props: PopupMenuItemProps) {
  const { children, icon, onClick, disabled, selected, focused, className } = props;
  const classes = [
    "tt-popup-menu__item",
    selected && "tt-popup-menu__item--selected",
    focused && "tt-popup-menu__item--focused",
    disabled && "tt-popup-menu__item--disabled",
    className,
  ].filter(Boolean).join(" ");
  return (
    <button
      type="button"
      role="menuitem"
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="tt-popup-menu__item-icon" aria-hidden="true">{icon}</span>}
      <span className="tt-popup-menu__item-label">{children}</span>
    </button>
  );
}

export type PopupGroupHeaderProps = {
  label?: string;
  divider?: boolean;
  className?: string;
};

export function PopupGroupHeader({ label, divider = false, className }: PopupGroupHeaderProps) {
  const classes = [
    "tt-popup-group-header",
    label && "tt-popup-group-header--with-label",
    className,
  ].filter(Boolean).join(" ");
  return (
    <div className={classes} role="presentation">
      {divider && <div className="tt-popup-group-header__divider" />}
      {label && <div className="tt-popup-group-header__label">{label}</div>}
    </div>
  );
}
