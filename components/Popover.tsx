import type { ReactNode } from "react";
import { CloseIcon, InfoIcon } from "./Icons";
import "./Popover.css";

export type PopoverArrow =
  | "none"
  | "top"
  | "top-left"
  | "top-right"
  | "bottom"
  | "bottom-left"
  | "bottom-right";

export type PopoverVariant = "desktop" | "mobile";

export type PopoverLabel = {
  icon?: ReactNode;
  text: string;
};

export type PopoverLink = {
  label: string;
  href?: string;
  onClick?: () => void;
};

export type PopoverProps = {
  title?: string;
  body?: ReactNode;
  link?: PopoverLink;
  label?: PopoverLabel;
  arrow?: PopoverArrow;
  variant?: PopoverVariant;
  onClose?: () => void;
  children?: ReactNode;
  className?: string;
  role?: "dialog" | "tooltip";
  "aria-label"?: string;
};

export function Popover(props: PopoverProps) {
  const {
    title,
    body,
    link,
    label,
    arrow = "bottom",
    variant = "desktop",
    onClose,
    children,
    className,
    role = "dialog",
    "aria-label": ariaLabel,
  } = props;

  const effectiveArrow: PopoverArrow = variant === "mobile" ? "none" : arrow;

  const classes = [
    "tt-popover",
    `tt-popover--variant-${variant}`,
    `tt-popover--arrow-${effectiveArrow}`,
    className,
  ].filter(Boolean).join(" ");

  return (
    <div className={classes} role={role} aria-label={ariaLabel}>
      {label && (
        <span className="tt-popover__label">
          {label.icon && (
            <span className="tt-popover__label-icon" aria-hidden="true">{label.icon}</span>
          )}
          <span className="tt-popover__label-text">{label.text}</span>
        </span>
      )}
      {onClose && (
        <button
          type="button"
          className="tt-popover__close"
          onClick={onClose}
          aria-label="Close"
        >
          <CloseIcon />
        </button>
      )}
      <div className="tt-popover__content">
        {children ?? (
          <>
            {title && <div className="tt-popover__title">{title}</div>}
            {body && <div className="tt-popover__body">{body}</div>}
            {link && (
              <a
                className="tt-popover__link"
                href={link.href ?? "#"}
                onClick={(e) => {
                  if (link.onClick) {
                    e.preventDefault();
                    link.onClick();
                  }
                }}
              >
                {link.label}
              </a>
            )}
          </>
        )}
      </div>
      {effectiveArrow !== "none" && (
        <span className={`tt-popover__arrow tt-popover__arrow--${effectiveArrow}`} aria-hidden="true" />
      )}
    </div>
  );
}

export type PopoverOpenerSize = "base" | "lg" | "xl" | "2xl";
export type PopoverOpenerWeight = "regular" | "medium";

export type PopoverOpenerProps = {
  children: ReactNode;
  size?: PopoverOpenerSize;
  weight?: PopoverOpenerWeight;
  onClick?: () => void;
  className?: string;
  "aria-label"?: string;
};

export function PopoverOpener(props: PopoverOpenerProps) {
  const {
    children,
    size = "base",
    weight = "regular",
    onClick,
    className,
    "aria-label": ariaLabel,
  } = props;

  const classes = [
    "tt-popover-opener",
    `tt-popover-opener--size-${size}`,
    `tt-popover-opener--weight-${weight}`,
    onClick && "tt-popover-opener--interactive",
    className,
  ].filter(Boolean).join(" ");

  const Tag = onClick ? "button" : "span";

  return (
    <Tag
      className={classes}
      onClick={onClick}
      type={onClick ? "button" : undefined}
      aria-label={ariaLabel}
    >
      <span className="tt-popover-opener__label">{children}</span>
      <InfoIcon className="tt-popover-opener__icon" />
    </Tag>
  );
}
