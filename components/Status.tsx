import "./Status.css";

export type StatusVariant = "success" | "warning" | "error" | "neutral" | "new";

export type StatusProps = {
  variant?: StatusVariant;
  label: string;
  count?: number;
  showMarker?: boolean;
  className?: string;
};

export function Status(props: StatusProps) {
  const {
    variant = "success",
    label,
    count,
    showMarker = true,
    className,
  } = props;

  const isMulti = typeof count === "number";

  const classes = [
    "tt-status",
    `tt-status--${variant}`,
    isMulti && "tt-status--multi",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      {showMarker && !isMulti && <span className="tt-status__dot" aria-hidden="true" />}
      {showMarker && isMulti && (
        <span className="tt-status__count" aria-hidden="true">
          {count}
        </span>
      )}
      <span className="tt-status__label">{label}</span>
    </div>
  );
}
