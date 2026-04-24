import type { ReactNode } from "react";
import "./Tooltip.css";

export type TooltipArrow =
  | "top"
  | "top-left"
  | "top-right"
  | "bottom"
  | "bottom-left"
  | "bottom-right";

export type TooltipProps = {
  label: ReactNode;
  shortcut?: ReactNode;
  arrow?: TooltipArrow;
  className?: string;
  id?: string;
};

export function Tooltip(props: TooltipProps) {
  const { label, shortcut, arrow = "bottom", className, id } = props;
  const classes = [
    "tt-tooltip",
    `tt-tooltip--arrow-${arrow}`,
    shortcut && "tt-tooltip--with-shortcut",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} role="tooltip" id={id}>
      <span className="tt-tooltip__label">{label}</span>
      {shortcut && <span className="tt-tooltip__shortcut">{shortcut}</span>}
      <TooltipArrowEl arrow={arrow} />
    </div>
  );
}

export type MultilineTooltipProps = {
  title: ReactNode;
  description: ReactNode;
  shortcut?: ReactNode;
  arrow?: TooltipArrow;
  maxWidth?: number;
  className?: string;
  id?: string;
};

export function MultilineTooltip(props: MultilineTooltipProps) {
  const {
    title,
    description,
    shortcut,
    arrow = "bottom",
    maxWidth = 600,
    className,
    id,
  } = props;
  const classes = [
    "tt-tooltip",
    "tt-tooltip--multiline",
    `tt-tooltip--arrow-${arrow}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={classes}
      role="tooltip"
      id={id}
      style={{ maxWidth }}
    >
      <div className="tt-tooltip__title-row">
        <span className="tt-tooltip__title">{title}</span>
        {shortcut && <span className="tt-tooltip__shortcut">{shortcut}</span>}
      </div>
      <p className="tt-tooltip__description">{description}</p>
      <TooltipArrowEl arrow={arrow} />
    </div>
  );
}

function TooltipArrowEl({ arrow }: { arrow: TooltipArrow }) {
  return (
    <span
      className={`tt-tooltip__arrow tt-tooltip__arrow--${arrow}`}
      aria-hidden="true"
    >
      <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
        <path d="M0 0 L7 8 L14 0 Z" fill="currentColor" />
      </svg>
    </span>
  );
}
