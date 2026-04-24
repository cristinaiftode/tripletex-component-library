import type { ReactNode } from "react";
import { Avatar } from "./Avatar";
import { MessageButton } from "./MessageButton";
import "./Topbar.css";

export type TopbarProps = {
  companyName?: string;
  companyInitial?: string;
  searchPlaceholder?: string;
  messageCount?: number;
  onMenuClick?: () => void;
  onLogoClick?: () => void;
  onCompanyClick?: () => void;
  onSearchClick?: () => void;
  onAssistantClick?: () => void;
  onFavoriteClick?: () => void;
  onDownloadClick?: () => void;
  onNotificationClick?: () => void;
  onMessageClick?: () => void;
  onWarningClick?: () => void;
  onFailClick?: () => void;
  onOpenNewClick?: () => void;
  onProfileClick?: () => void;
  className?: string;
};

export function Topbar(props: TopbarProps) {
  const {
    companyName = "Tripletex AS",
    companyInitial,
    searchPlaceholder = "Søk",
    messageCount = 0,
    onMenuClick,
    onLogoClick,
    onCompanyClick,
    onSearchClick,
    onAssistantClick,
    onFavoriteClick,
    onDownloadClick,
    onNotificationClick,
    onMessageClick,
    onWarningClick,
    onFailClick,
    onOpenNewClick,
    onProfileClick,
    className,
  } = props;

  const initial = (companyInitial ?? companyName.charAt(0) ?? "").toUpperCase();
  const classes = ["tt-topbar", className].filter(Boolean).join(" ");

  return (
    <header className={classes} role="banner">
      <div className="tt-topbar__left">
        <TopbarIconButton aria-label="Menu" onClick={onMenuClick}>
          <MenuIcon />
        </TopbarIconButton>

        <button
          type="button"
          className="tt-topbar__logo"
          onClick={onLogoClick}
          aria-label="Tripletex home"
        >
          <TripletexWordmark />
        </button>

        <button
          type="button"
          className="tt-topbar__company"
          onClick={onCompanyClick}
          aria-label={`Switch company — current: ${companyName}`}
        >
          <span className="tt-topbar__company-avatar">
            <Avatar initials={initial} size="medium" />
          </span>
          <span className="tt-topbar__company-name">{companyName}</span>
        </button>
      </div>

      <div className="tt-topbar__right">
        <button
          type="button"
          className="tt-topbar__search"
          onClick={onSearchClick}
          aria-label={searchPlaceholder}
        >
          <SearchIcon />
          <span className="tt-topbar__search-placeholder">{searchPlaceholder}</span>
        </button>

        <div className="tt-topbar__actions">
          <button
            type="button"
            className="tt-topbar__assistant"
            onClick={onAssistantClick}
          >
            <span className="tt-topbar__assistant-label">Assistent</span>
            <AutomationIcon />
          </button>

          <TopbarIconButton aria-label="Favorites" onClick={onFavoriteClick}>
            <StarIcon />
          </TopbarIconButton>
          <TopbarIconButton aria-label="Download" onClick={onDownloadClick}>
            <DownloadIcon />
          </TopbarIconButton>
          <TopbarIconButton aria-label="Notifications" onClick={onNotificationClick}>
            <BellIcon />
          </TopbarIconButton>

          <MessageButton
            count={messageCount}
            onClick={onMessageClick}
            aria-label="Messages"
          />

          <TopbarIconButton aria-label="Warnings" onClick={onWarningClick}>
            <WarningIcon />
          </TopbarIconButton>
          <TopbarIconButton aria-label="Errors" onClick={onFailClick}>
            <FailIcon />
          </TopbarIconButton>
          <TopbarIconButton aria-label="Open in new window" onClick={onOpenNewClick}>
            <OpenNewIcon />
          </TopbarIconButton>
          <TopbarIconButton aria-label="Profile" onClick={onProfileClick}>
            <ProfileIcon />
          </TopbarIconButton>
        </div>
      </div>
    </header>
  );
}

function TopbarIconButton(props: {
  children: ReactNode;
  onClick?: () => void;
  "aria-label": string;
}) {
  const { children, onClick, "aria-label": ariaLabel } = props;
  return (
    <button
      type="button"
      className="tt-topbar__icon-btn"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

function TripletexWordmark() {
  return (
    <span className="tt-topbar__wordmark" aria-hidden="true">
      <span className="tt-topbar__wordmark-text">tripletex</span>
    </span>
  );
}

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="5.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M13 13l3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AutomationIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 2.5l1.8 3.8 4.2.6-3 3 .7 4.2L10 12.1 6.3 14.1l.7-4.2-3-3 4.2-.6L10 2.5z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M15.5 14.5l.6 1.3 1.4.2-1 1 .3 1.4-1.3-.7-1.3.7.3-1.4-1-1 1.4-.2.6-1.3z"
        fill="currentColor"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.5l2.7 5.5 6.1.9-4.4 4.3 1 6L12 17.3l-5.4 2.9 1-6L3.2 9.9l6.1-.9L12 3.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 4v11m0 0l-4-4m4 4l4-4M5 19h14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15L6 16z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M10 20a2 2 0 0 0 4 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 4l9 16H3L12 4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M12 10v4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="17" r="1" fill="currentColor" />
    </svg>
  );
}

function FailIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M9 9l6 6M15 9l-6 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function OpenNewIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14 4h6v6M20 4l-9 9M19 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5 20c1.2-3.2 4-5 7-5s5.8 1.8 7 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
