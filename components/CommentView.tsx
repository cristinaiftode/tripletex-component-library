import React from "react";
import "./CommentView.css";
import { Button } from "./Button";
import { Avatar } from "./Avatar";

export type CommentViewState = "empty" | "loading" | "comments" | "locked";

export type CommentMessage = {
  id?: string;
  authorName: string;
  authorAvatar?: { src?: string; initials?: string };
  timestamp: string;
  body: string;
  unread?: boolean;
};

export type CommentViewProps = {
  state?: CommentViewState;
  comments?: CommentMessage[];
  value?: string;
  onChange?: (value: string) => void;
  onAddComment?: () => void;
  onClose?: () => void;
  maxLength?: number;
  showMaxLength?: boolean;
  className?: string;
};

export function CommentView({
  state = "empty",
  comments = [],
  value = "",
  onChange,
  onAddComment,
  onClose,
  maxLength = 250,
  showMaxLength = true,
  className,
}: CommentViewProps) {
  const isLocked = state === "locked";
  const classes = ["tt-comment-view", `tt-comment-view--state-${state}`, className]
    .filter(Boolean)
    .join(" ");

  const placeholder = isLocked
    ? "Comments are locked for this item. Reopen the element to add new comments."
    : "Type your comment and press \u201CEnter\u201D to post.";

  return (
    <div className={classes} role="dialog" aria-label="Comments">
      <header className="tt-comment-view__header">
        <h2 className="tt-comment-view__title">Comments</h2>
        {isLocked && (
          <span className="tt-comment-view__lock" aria-label="Locked">
            <LockIcon />
          </span>
        )}
      </header>

      <div className="tt-comment-view__body">
        {state === "empty" && <EmptyState />}
        {state === "loading" && (
          <>
            <CommentSkeleton />
            <CommentSkeleton />
            <CommentSkeleton />
          </>
        )}
        {(state === "comments" || state === "locked") &&
          comments.map((c, i) => <CommentMessageRow key={c.id ?? i} message={c} />)}
      </div>

      <footer className="tt-comment-view__footer">
        <div className="tt-comment-view__textarea-wrap">
          <div
            className={`tt-comment-view__textarea${
              isLocked ? " tt-comment-view__textarea--locked" : ""
            }`}
          >
            {value ? (
              <span className="tt-comment-view__textarea-value">{value}</span>
            ) : (
              <span className="tt-comment-view__textarea-placeholder">{placeholder}</span>
            )}
          </div>
          {showMaxLength && (
            <div className="tt-comment-view__counter">
              {value.length}/{maxLength}
            </div>
          )}
        </div>
        <div className="tt-comment-view__actions">
          <Button variant="primary" onClick={onAddComment} disabled={isLocked}>
            Add comment
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </footer>

      {onClose && (
        <button
          type="button"
          className="tt-comment-view__close"
          onClick={onClose}
          aria-label="Dismiss"
        >
          <CloseIcon />
        </button>
      )}
      {onChange /* suppress unused warning when value/onChange pattern is wired up */ && null}
    </div>
  );
}

function CommentMessageRow({ message }: { message: CommentMessage }) {
  const avatar = message.authorAvatar;
  return (
    <div className="tt-comment-message">
      <div className="tt-comment-message__avatar">
        {avatar?.src ? (
          <Avatar src={avatar.src} alt={message.authorName} size="medium" />
        ) : (
          <Avatar initials={avatar?.initials ?? initialsFromName(message.authorName)} size="medium" />
        )}
      </div>
      <div className="tt-comment-message__body">
        <div className="tt-comment-message__header">
          <span className="tt-comment-message__author">{message.authorName}</span>
          <span className="tt-comment-message__status">
            <span className="tt-comment-message__marker-container">
              {message.unread && <span className="tt-comment-message__marker" />}
            </span>
            <span className="tt-comment-message__timestamp">{message.timestamp}</span>
          </span>
        </div>
        <p className="tt-comment-message__excerpt">{message.body}</p>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="tt-comment-view__empty">
      <StickyNoteIllustration />
      <div className="tt-comment-view__empty-text">
        <p className="tt-comment-view__empty-title">There are no comments</p>
        <p className="tt-comment-view__empty-body">
          Add a comment for future reference. All users with access to this element will be able to
          view it.
        </p>
      </div>
    </div>
  );
}

function CommentSkeleton() {
  return (
    <div className="tt-comment-skeleton">
      <div className="tt-comment-skeleton__avatar tt-skeleton" />
      <div className="tt-comment-skeleton__body">
        <div className="tt-comment-skeleton__row">
          <div className="tt-comment-skeleton__bar tt-comment-skeleton__bar--title tt-skeleton" />
          <div className="tt-comment-skeleton__bar tt-comment-skeleton__bar--date tt-skeleton" />
        </div>
        <div className="tt-comment-skeleton__bar tt-comment-skeleton__bar--excerpt tt-skeleton" />
      </div>
    </div>
  );
}

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

function LockIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="4.5" y="9" width="11" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7 9V6.5a3 3 0 016 0V9"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M5 5l10 10M15 5L5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StickyNoteIllustration() {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      aria-hidden="true"
      className="tt-comment-view__sticky"
    >
      <path
        d="M20 22h46a4 4 0 014 4v40l-18 16H24a4 4 0 01-4-4V22z"
        fill="var(--illustration-blue-light)"
        stroke="var(--illustration-blue)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M52 82V68a4 4 0 014-4h14"
        stroke="var(--illustration-blue)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M30 36h26M30 44h26M30 52h18"
        stroke="var(--illustration-blue)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
