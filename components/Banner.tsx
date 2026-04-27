import React from "react";
import "./Banner.css";
import { Button } from "./Button";
import {
  InfoIcon,
  TipIcon,
  HelpIcon,
  FlagIcon,
  SparkleIcon,
  CheckCircleIcon,
  WarningIcon,
  AlertTriangleIcon,
  CloseIcon,
} from "./Icons";

export type BannerVariant =
  | "info"
  | "help"
  | "tips"
  | "news"
  | "get-started"
  | "automation"
  | "success"
  | "warning"
  | "error";

export type BannerSize = "small" | "medium" | "large";

export type BannerAction = {
  label: string;
  onClick?: () => void;
};

export type BannerProps = {
  variant?: BannerVariant;
  size?: BannerSize;
  label?: string;
  chipIcon?: React.ReactNode;
  title?: string;
  children?: React.ReactNode;
  primaryAction?: BannerAction;
  secondaryAction?: BannerAction;
  onClose?: () => void;
  /** Small fixed-size illustration (e.g. 100×100) rendered to the right of the text. */
  illustration?: React.ReactNode;
  /**
   * Full-bleed media slot — typically a hero image or `<MediaPlaceholder />`.
   * Stacks ABOVE the text for `small` and `medium` sizes; sits BESIDE the
   * text (right column, 340px wide) for `large`. Mirrors Figma "Tips/Upsell
   * widget" Small/Medium/Banner variants.
   */
  media?: React.ReactNode;
  decorativeBackground?: boolean;
  className?: string;
};

const VARIANT_DEFAULT_LABEL: Record<BannerVariant, string> = {
  info: "Info",
  help: "Help",
  tips: "Tips",
  news: "News",
  "get-started": "Get started",
  automation: "Automation",
  success: "Done",
  warning: "Attention",
  error: "Error",
};

export function Banner({
  variant = "info",
  size = "medium",
  label,
  chipIcon,
  title,
  children,
  primaryAction,
  secondaryAction,
  onClose,
  illustration,
  media,
  decorativeBackground = false,
  className,
}: BannerProps) {
  // For sizes small/medium the media block stacks above the text;
  // for size large it sits beside the text in a row.
  const mediaSide = !!media && size === "large";
  const mediaStack = !!media && size !== "large";

  const classes = [
    "tt-banner",
    `tt-banner--variant-${variant}`,
    `tt-banner--size-${size}`,
    decorativeBackground && "tt-banner--has-decoration",
    illustration && "tt-banner--has-illustration",
    mediaSide && "tt-banner--has-media-side",
    mediaStack && "tt-banner--has-media-stack",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const chipLabel = label ?? VARIANT_DEFAULT_LABEL[variant];
  const chipIconResolved = chipIcon ?? <DefaultChipIcon variant={variant} />;

  return (
    <div className={classes}>
      {decorativeBackground && (
        <div className="tt-banner__decoration" aria-hidden="true">
          <span className="tt-banner__deco-circle tt-banner__deco-circle--a" />
          <span className="tt-banner__deco-circle tt-banner__deco-circle--b" />
        </div>
      )}
      <div className="tt-banner__content">
        <div className="tt-banner__body-wrap">
          <span className="tt-banner__chip">
            <span className="tt-banner__chip-icon" aria-hidden="true">
              {chipIconResolved}
            </span>
            <span className="tt-banner__chip-label">{chipLabel}</span>
          </span>
          {mediaStack && <div className="tt-banner__media">{media}</div>}
          {mediaSide ? (
            <div className="tt-banner__split">
              <div className="tt-banner__split-text">
                {(title || children) && (
                  <div className="tt-banner__text">
                    {title && <p className="tt-banner__title">{title}</p>}
                    {children && <div className="tt-banner__body">{children}</div>}
                  </div>
                )}
                {(primaryAction || secondaryAction) && (
                  <div className="tt-banner__actions">
                    {primaryAction && (
                      <Button variant="primary" onClick={primaryAction.onClick}>
                        {primaryAction.label}
                      </Button>
                    )}
                    {secondaryAction && (
                      <Button variant="secondary" onClick={secondaryAction.onClick}>
                        {secondaryAction.label}
                      </Button>
                    )}
                  </div>
                )}
              </div>
              <div className="tt-banner__media tt-banner__media--side">{media}</div>
            </div>
          ) : (
            <>
              {(title || children) && (
                <div className="tt-banner__text">
                  {title && <p className="tt-banner__title">{title}</p>}
                  {children && <div className="tt-banner__body">{children}</div>}
                </div>
              )}
              {(primaryAction || secondaryAction) && (
                <div className="tt-banner__actions">
                  {primaryAction && (
                    <Button variant="primary" onClick={primaryAction.onClick}>
                      {primaryAction.label}
                    </Button>
                  )}
                  {secondaryAction && (
                    <Button variant="secondary" onClick={secondaryAction.onClick}>
                      {secondaryAction.label}
                    </Button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
        {illustration && <div className="tt-banner__illustration">{illustration}</div>}
      </div>
      {onClose && (
        <button
          type="button"
          className="tt-banner__close"
          onClick={onClose}
          aria-label="Dismiss"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
}

function DefaultChipIcon({ variant }: { variant: BannerVariant }) {
  switch (variant) {
    case "tips":
      return <TipIcon />;
    case "help":
      return <HelpIcon />;
    case "news":
      return <NewspaperIcon />;
    case "get-started":
      return <FlagIcon />;
    case "automation":
      return <SparkleIcon />;
    case "success":
      return <CheckCircleIcon />;
    case "warning":
      return <WarningIcon />;
    case "error":
      return <AlertTriangleIcon />;
    case "info":
    default:
      return <InfoIcon />;
  }
}

function NewspaperIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="14" height="12" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M6 7.5h8M6 10.5h8M6 13.5h5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
