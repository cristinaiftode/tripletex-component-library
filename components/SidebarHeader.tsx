import type { ReactNode } from "react";
import { SidebarItem } from "./SidebarItem";
import "./SidebarHeader.css";

export type SidebarHeaderSubItem = {
  label: string;
  selected?: boolean;
  onClick?: () => void;
};

export type SidebarHeaderProps = {
  label: string;
  icon?: ReactNode;
  selected?: boolean;
  collapsed?: boolean;
  subItems?: SidebarHeaderSubItem[];
  showSubmenu?: boolean;
  onClick?: () => void;
  className?: string;
};

export function SidebarHeader(props: SidebarHeaderProps) {
  const {
    label,
    icon,
    selected = false,
    collapsed = false,
    subItems,
    showSubmenu = false,
    onClick,
    className,
  } = props;

  const shouldShowSubmenu =
    !collapsed && showSubmenu && subItems && subItems.length > 0;

  const classes = [
    "tt-sidebar-header",
    selected && "tt-sidebar-header--selected",
    collapsed && "tt-sidebar-header--collapsed",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <button
        type="button"
        className="tt-sidebar-header__row"
        onClick={onClick}
        aria-current={selected ? "page" : undefined}
        aria-label={collapsed ? label : undefined}
        aria-expanded={subItems && subItems.length > 0 ? shouldShowSubmenu : undefined}
      >
        <span className="tt-sidebar-header__icon">{icon}</span>
        {!collapsed && <span className="tt-sidebar-header__label">{label}</span>}
      </button>

      {shouldShowSubmenu && (
        <div className="tt-sidebar-header__submenu" role="list">
          {subItems!.map((item, index) => (
            <SidebarItem
              key={`${item.label}-${index}`}
              label={item.label}
              selected={item.selected}
              onClick={item.onClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}
