import "./SubitemIcons.css";

export type SubitemIconsType = "disk" | "mini-disk" | "expandable" | "expanded";

export type SubitemIconsProps = {
  type?: SubitemIconsType;
  className?: string;
};

export function SubitemIcons(props: SubitemIconsProps) {
  const { type = "disk", className } = props;
  const classes = ["tt-subitem-icon", className].filter(Boolean).join(" ");

  return (
    <span className={classes} aria-hidden="true">
      {type === "disk" && <span className="tt-subitem-icon__disk" />}
      {type === "mini-disk" && <span className="tt-subitem-icon__mini-disk" />}
      {type === "expandable" && (
        <span className="tt-subitem-icon__chevron">
          <ChevronRight />
        </span>
      )}
      {type === "expanded" && (
        <span className="tt-subitem-icon__chevron tt-subitem-icon__chevron--expanded">
          <ChevronRight />
        </span>
      )}
    </span>
  );
}

function ChevronRight() {
  return (
    <svg width="5" height="9" viewBox="0 0 5 9" fill="none" aria-hidden="true">
      <path
        d="M0.5 0.5L4 4.5L0.5 8.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
