import {
  InfoIcon,
  HelpIcon,
  TipIcon,
  RocketIcon,
  SparkleIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  ErrorIcon,
} from "./Icons";
import "./Label.css";

export type LabelCategory =
  | "info"
  | "help"
  | "tips"
  | "news"
  | "get-started"
  | "automated"
  | "done"
  | "attention"
  | "error";

export type LabelProps = {
  category?: LabelCategory;
  className?: string;
};

const CATEGORY_TEXT: Record<LabelCategory, string> = {
  info: "Info",
  help: "Help",
  tips: "Tips",
  news: "News",
  "get-started": "Get started",
  automated: "Automated",
  done: "Done",
  attention: "Attention",
  error: "Error",
};

export function Label({ category = "info", className }: LabelProps) {
  const classes = ["tt-label", `tt-label--${category}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes}>
      <span className="tt-label__icon" aria-hidden="true">
        {iconFor(category)}
      </span>
      <span className="tt-label__text">{CATEGORY_TEXT[category]}</span>
    </span>
  );
}

function iconFor(category: LabelCategory) {
  switch (category) {
    case "info":     return <InfoIcon />;
    case "help":     return <HelpIcon />;
    case "tips":     return <TipIcon />;
    case "news":     return <NewsIcon />;
    case "get-started": return <RocketIcon />;
    case "automated":   return <SparkleIcon />;
    case "done":        return <CheckCircleIcon />;
    case "attention":   return <AlertTriangleIcon />;
    case "error":       return <ErrorIcon />;
  }
}

function NewsIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none">
      <path
        d="M3 7.5v3L14 14V4L3 7.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M14 6.5h2M14 9h2.5M14 11.5h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5.5 10.5L6.5 15h2l-1-4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
