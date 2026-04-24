import { SubitemIcons } from "./SubitemIcons";
import "./SidebarItem.css";

export type SidebarItemProps = {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
};

export function SidebarItem(props: SidebarItemProps) {
  const { label, selected = false, onClick, className } = props;
  const classes = [
    "tt-sidebar-item",
    selected && "tt-sidebar-item--selected",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      aria-current={selected ? "page" : undefined}
    >
      <span className="tt-sidebar-item__container">
        <SubitemIcons type={selected ? "disk" : "mini-disk"} />
        <span className="tt-sidebar-item__label">{label}</span>
      </span>
    </button>
  );
}
