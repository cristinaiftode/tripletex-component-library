import type { ReactNode } from "react";
import { SidebarHeader, type SidebarHeaderSubItem } from "./SidebarHeader";
import "./Sidebar.css";

export type SidebarNavItem = {
  label: string;
  icon?: ReactNode;
  selected?: boolean;
  subItems?: SidebarHeaderSubItem[];
  showSubmenu?: boolean;
  onClick?: () => void;
};

export type SidebarProps = {
  items?: SidebarNavItem[];
  collapsed?: boolean;
  className?: string;
};

export function Sidebar(props: SidebarProps) {
  const { items = DEFAULT_SIDEBAR_ITEMS, collapsed = false, className } = props;
  const classes = [
    "tt-sidebar",
    collapsed && "tt-sidebar--collapsed",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <nav className={classes} aria-label="Main navigation">
      <div className="tt-sidebar__wrapper">
        {items.map((item, index) => (
          <SidebarHeader
            key={`${item.label}-${index}`}
            label={item.label}
            icon={item.icon}
            selected={item.selected}
            subItems={item.subItems}
            showSubmenu={item.showSubmenu}
            onClick={item.onClick}
            collapsed={collapsed}
          />
        ))}
      </div>
    </nav>
  );
}

function BrandIcon({ color, children }: { color: string; children: ReactNode }) {
  return (
    <span
      className="tt-sidebar__brand-icon"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        color,
      }}
    >
      {children}
    </span>
  );
}

function StarIcon() {
  return (
    <BrandIcon color="#f5a623">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="M10 2.5l2.3 4.65 5.2.76-3.75 3.65.89 5.16L10 14.24l-4.64 2.48.89-5.16L2.5 7.91l5.2-.76L10 2.5z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </svg>
    </BrandIcon>
  );
}

function HomeIcon() {
  return (
    <BrandIcon color="#2e7d32">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="M3 9l7-5.5L17 9v7.5a.5.5 0 0 1-.5.5h-4v-5h-5v5h-4a.5.5 0 0 1-.5-.5V9z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </BrandIcon>
  );
}

function PersonCheckIcon() {
  return (
    <BrandIcon color="#2e7d32">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="8" cy="6.5" r="2.8" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M3 16c.8-2.5 2.8-4 5-4s4.2 1.5 5 4"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M13 14.5l1.5 1.5L18 12.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </BrandIcon>
  );
}

function TimerIcon() {
  return (
    <BrandIcon color="#137a8b">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="11" r="6" stroke="currentColor" strokeWidth="1.4" />
        <path d="M10 8v3l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M8 3h4M10 3v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </BrandIcon>
  );
}

function AirplaneIcon() {
  return (
    <BrandIcon color="#1a6fd6">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="M2.5 11l3-.5 2.5-2.5L5 3.5l1.5-.5 5 4 3.5-1c.8-.2 1.5.5 1.3 1.3l-1 3.5 4 5-.5 1.5-4.5-3-2.5 2.5.5 3L11 16l-1.5-3L7 10.5l-4 1-.5-.5z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </BrandIcon>
  );
}

function ReceiptIcon() {
  return (
    <BrandIcon color="#1a6fd6">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="M4 2.5h9l3 3v12l-2-1-2 1-2-1-2 1-2-1-2 1V2.5z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M6.5 7.5h7M6.5 10.5h7M6.5 13.5h4"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    </BrandIcon>
  );
}

function BankIcon() {
  return (
    <BrandIcon color="#137a8b">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M2 7L10 3l8 4v1H2V7z" fill="currentColor" stroke="currentColor" strokeWidth="0.5" strokeLinejoin="round" />
        <path d="M4 9v6M8 9v6M12 9v6M16 9v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M2 17h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </BrandIcon>
  );
}

function BookIcon() {
  return (
    <BrandIcon color="#10575f">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="M3 4.5c2-.5 4.5-.5 7 .5v11c-2.5-1-5-1-7-.5v-11z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M17 4.5c-2-.5-4.5-.5-7 .5v11c2.5-1 5-1 7-.5v-11z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </BrandIcon>
  );
}

function GridIcon() {
  return (
    <BrandIcon color="#6b46c1">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <rect x="11" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <rect x="3" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none" />
      </svg>
    </BrandIcon>
  );
}

function BriefcaseIcon() {
  return (
    <BrandIcon color="#6b46c1">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="2.5" y="6" width="15" height="10" rx="1.2" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M7 6V4.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V6" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M2.5 10.5h15" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    </BrandIcon>
  );
}

function DocumentIconRed() {
  return (
    <BrandIcon color="#d14343">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="M5 2.5h7l4 4v11H5v-15z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
          fill="none"
        />
        <path d="M12 2.5v4h4" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
        <path d="M7.5 10h5M7.5 12.5h5M7.5 15h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    </BrandIcon>
  );
}

function PeopleIcon() {
  return (
    <BrandIcon color="#2e7d32">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="14" cy="8" r="2" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M2.5 16c.7-2.2 2.4-3.5 4.5-3.5s3.8 1.3 4.5 3.5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M12 13c1.5-.5 3-.3 4 .3 1 .6 1.5 1.7 1.5 2.7"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </BrandIcon>
  );
}

function CardIcon() {
  return (
    <BrandIcon color="#d14343">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="2.5" y="5" width="15" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M2.5 8.5h15" stroke="currentColor" strokeWidth="1.4" />
        <path d="M5 12h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </BrandIcon>
  );
}

function CheckCircleIcon() {
  return (
    <BrandIcon color="#d14343">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path
          d="M6.5 10.5l2.2 2.2L13.5 8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </BrandIcon>
  );
}

function FolderIcon() {
  return (
    <BrandIcon color="#9c7bd8">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="M2.5 6a1.5 1.5 0 0 1 1.5-1.5h3.5L9 6h7a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 16 17H4a1.5 1.5 0 0 1-1.5-1.5V6z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </BrandIcon>
  );
}

function DocumentIconPink() {
  return (
    <BrandIcon color="#d148a3">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="M5 2.5h7l4 4v11H5v-15z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
          fill="none"
        />
        <path d="M12 2.5v4h4" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
      </svg>
    </BrandIcon>
  );
}

function PuzzleIcon() {
  return (
    <BrandIcon color="#2e384d">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="M8.5 3h3a.5.5 0 0 1 .5.5v1.8a1.2 1.2 0 1 0 2.4 0V3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.8a1.2 1.2 0 1 0-2.4 0V16.5a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-2a1.2 1.2 0 1 0 0-2.4H3.5a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h1.8a1.2 1.2 0 1 0 0-2.4H3.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 3.5 3h3"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </BrandIcon>
  );
}

function SendIcon() {
  return (
    <BrandIcon color="#2e384d">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="M3 3l14 7-14 7 2-7-2-7z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
          fill="none"
        />
        <path d="M5 10h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </BrandIcon>
  );
}

function BuildingIcon() {
  return (
    <BrandIcon color="#2e7d32">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="14" height="14" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M6 6h1M9 6h1M13 6h1M6 9h1M9 9h1M13 9h1M6 12h1M9 12h1M13 12h1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M8.5 17v-3h3v3" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    </BrandIcon>
  );
}

export const DEFAULT_SIDEBAR_ITEMS: SidebarNavItem[] = [
  { label: "Favoritter", icon: <StarIcon /> },
  { label: "Hjem", icon: <HomeIcon /> },
  { label: "Klient", icon: <PersonCheckIcon /> },
  { label: "Timeliste", icon: <TimerIcon /> },
  { label: "Reiser og utlegg", icon: <AirplaneIcon /> },
  { label: "Bilag", icon: <ReceiptIcon /> },
  { label: "Bank", icon: <BankIcon /> },
  { label: "Regnskap", icon: <BookIcon /> },
  { label: "Rapporter", icon: <GridIcon /> },
  { label: "Prosjekt", icon: <BriefcaseIcon /> },
  { label: "Faktura", icon: <DocumentIconRed /> },
  { label: "Kunde", icon: <PeopleIcon /> },
  { label: "Lønn", icon: <CardIcon /> },
  { label: "Oppgave", icon: <CheckCircleIcon /> },
  { label: "Produkt", icon: <FolderIcon /> },
  { label: "Dokument", icon: <DocumentIconPink /> },
  { label: "Integrasjoner", icon: <PuzzleIcon /> },
  { label: "Årsoppgjør", icon: <SendIcon /> },
  { label: "Selskap", icon: <BuildingIcon /> },
];

export const SidebarIcons = {
  Favoritter: StarIcon,
  Hjem: HomeIcon,
  Klient: PersonCheckIcon,
  Timeliste: TimerIcon,
  ReiserOgUtlegg: AirplaneIcon,
  Bilag: ReceiptIcon,
  Bank: BankIcon,
  Regnskap: BookIcon,
  Rapporter: GridIcon,
  Prosjekt: BriefcaseIcon,
  Faktura: DocumentIconRed,
  Kunde: PeopleIcon,
  Lonn: CardIcon,
  Oppgave: CheckCircleIcon,
  Produkt: FolderIcon,
  Dokument: DocumentIconPink,
  Integrasjoner: PuzzleIcon,
  Arsoppgjor: SendIcon,
  Selskap: BuildingIcon,
};
