import "./Spinner.css";

export type SpinnerSize = "tiny" | "small" | "medium" | "large";
export type SpinnerSpeed = "slow" | "normal" | "fast";

export type SpinnerProps = {
  size?: SpinnerSize;
  speed?: SpinnerSpeed;
  paused?: boolean;
  label?: string;
  className?: string;
  "aria-label"?: string;
};

const STROKE_BY_SIZE: Record<SpinnerSize, number> = {
  tiny: 6,
  small: 5,
  medium: 4,
  large: 3.5,
};

export function Spinner(props: SpinnerProps) {
  const {
    size = "medium",
    speed = "normal",
    paused = false,
    label,
    className,
    "aria-label": ariaLabel,
  } = props;

  const classes = [
    "tt-spinner",
    `tt-spinner--${size}`,
    `tt-spinner--speed-${speed}`,
    paused && "tt-spinner--paused",
    label && "tt-spinner--inline",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const stroke = STROKE_BY_SIZE[size];

  return (
    <div
      className={classes}
      role="status"
      aria-live="polite"
      aria-label={ariaLabel ?? label ?? "Loading"}
    >
      <svg
        className="tt-spinner__svg"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g className="tt-spinner__rotate">
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            pathLength={100}
            stroke="var(--tt-spinner-primary)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray="70 100"
            transform="rotate(-90 24 24)"
          />
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            pathLength={100}
            stroke="var(--tt-spinner-success)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray="10 100"
            transform="rotate(170 24 24)"
          />
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            pathLength={100}
            stroke="var(--tt-spinner-info)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray="10 100"
            transform="rotate(218 24 24)"
          />
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            pathLength={100}
            stroke="var(--tt-spinner-warning)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray="3 100"
            transform="rotate(260 24 24)"
          />
        </g>
      </svg>
      {label && <span className="tt-spinner__label">{label}</span>}
    </div>
  );
}

export type InlineSpinnerProps = Omit<SpinnerProps, "label"> & {
  label?: string;
};

export function InlineSpinner(props: InlineSpinnerProps) {
  const { label = "Loading", size = "tiny", ...rest } = props;
  return <Spinner {...rest} size={size} label={label} />;
}
