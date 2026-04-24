import React from "react";
import "./DecorativeIcon.css";

export type DecorativeIconSize = "small" | "medium" | "large";

export type DecorativeIconProps = {
  icon: React.ReactNode;
  size?: DecorativeIconSize;
  "aria-label"?: string;
  className?: string;
};

export function DecorativeIcon({
  icon,
  size = "small",
  "aria-label": ariaLabel,
  className,
}: DecorativeIconProps) {
  const classes = [
    "tt-decorative-icon",
    `tt-decorative-icon--size-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className={classes}
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
    >
      <span className="tt-decorative-icon__inner">{icon}</span>
    </span>
  );
}
