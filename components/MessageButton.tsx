import React from "react";
import "./MessageButton.css";

export type MessageButtonProps = {
  count?: number;
  onClick?: () => void;
  "aria-label"?: string;
  className?: string;
};

export function MessageButton({
  count = 0,
  onClick,
  "aria-label": ariaLabel = "Messages",
  className,
}: MessageButtonProps) {
  const hasBadge = count > 0;
  const hasText = count > 1;
  const displayCount = count > 9 ? "9+" : String(count);

  const classes = ["tt-message-button", className].filter(Boolean).join(" ");

  return (
    <button type="button" className={classes} onClick={onClick} aria-label={ariaLabel}>
      <span className="tt-message-button__icon" aria-hidden="true">
        <ChatBubbleIcon />
      </span>
      {hasBadge && (
        <span
          className={`tt-message-button__badge${hasText ? " tt-message-button__badge--text" : ""}`}
        >
          {hasText && <span className="tt-message-button__badge-text">{displayCount}</span>}
        </span>
      )}
    </button>
  );
}

function ChatBubbleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 5.5a1.5 1.5 0 011.5-1.5h13A1.5 1.5 0 0120 5.5v10a1.5 1.5 0 01-1.5 1.5H10l-4 3v-3H5.5A1.5 1.5 0 014 15.5v-10z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8 9.5h8M8 12.5h5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
