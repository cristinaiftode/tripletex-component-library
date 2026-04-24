import React from "react";
import "./CommentButton.css";

export type CommentButtonProps = {
  count?: number;
  read?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
  className?: string;
};

export function CommentButton({
  count = 0,
  read = false,
  onClick,
  "aria-label": ariaLabel = "Comments",
  className,
}: CommentButtonProps) {
  const hasBadge = count > 0;
  const hasText = count > 1;
  const displayCount = count > 9 ? "9+" : String(count);

  const classes = [
    "tt-comment-button",
    read && "tt-comment-button--read",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type="button" className={classes} onClick={onClick} aria-label={ariaLabel}>
      <span className="tt-comment-button__icon" aria-hidden="true">
        {hasBadge ? <CommentFilledIcon /> : <CommentIcon />}
      </span>
      {hasBadge && (
        <span
          className={`tt-comment-button__badge${
            hasText ? " tt-comment-button__badge--text" : ""
          }${count > 9 ? " tt-comment-button__badge--wide" : ""}`}
        >
          {hasText && <span className="tt-comment-button__badge-text">{displayCount}</span>}
        </span>
      )}
    </button>
  );
}

function CommentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 5.5A1.5 1.5 0 015.5 4h10A1.5 1.5 0 0117 5.5V13l4 4h-4.5a1.5 1.5 0 01-1-.4L13 14.5H5.5A1.5 1.5 0 014 13V5.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CommentFilledIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 5.5A1.5 1.5 0 015.5 4h10A1.5 1.5 0 0117 5.5V13l4 4h-4.5a1.5 1.5 0 01-1-.4L13 14.5H5.5A1.5 1.5 0 014 13V5.5z"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M7.5 8.5h6M7.5 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
