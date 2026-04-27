import React from "react";
import "./MediaPlaceholder.css";

export type MediaPlaceholderProps = {
  /** Optional fixed width (px). Defaults to fluid 100% so it stretches to its parent. */
  width?: number | string;
  /** Optional fixed height (px). Defaults to 180px (Figma node 223:1231). */
  height?: number | string;
  /** Override placeholder text. Defaults to "Optional illustration or image". */
  label?: string;
  className?: string;
};

/**
 * Dashed-border placeholder block used in `Banner` (Tips / Upsell widget) and
 * other empty-image slots. Mirrors Figma node 223:1231 — `f7f8fc` surface,
 * dashed `d5d7db` 1px border, centered Rubik 14 muted label.
 */
export function MediaPlaceholder({
  width,
  height = 180,
  label = "Optional illustration or image",
  className,
}: MediaPlaceholderProps) {
  const style: React.CSSProperties = {};
  if (width !== undefined)
    style.width = typeof width === "number" ? `${width}px` : width;
  if (height !== undefined)
    style.height = typeof height === "number" ? `${height}px` : height;

  const classes = ["tt-media-placeholder", className].filter(Boolean).join(" ");

  return (
    <div className={classes} style={style} role="img" aria-label={label}>
      <span className="tt-media-placeholder__label">{label}</span>
    </div>
  );
}
