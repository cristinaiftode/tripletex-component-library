import { Button } from "../components/Button";
import { Avatar, AvatarGroup } from "../components/Avatar";
import { DecorativeIcon } from "../components/DecorativeIcon";
import { Banner } from "../components/Banner";
import { Alert } from "../components/Alert";
import { PageHeader, Breadcrumb, Autosave, StatusMarker } from "../components/PageHeader";
import { Topbar } from "../components/Topbar";
import { Sidebar, DEFAULT_SIDEBAR_ITEMS } from "../components/Sidebar";
import { AppShell } from "../components/AppShell";
import { SidebarHeader } from "../components/SidebarHeader";
import { SidebarItem } from "../components/SidebarItem";
import { SubitemIcons } from "../components/SubitemIcons";
import {
  FavouriteIcon,
  FlagIcon,
  LogoutIcon,
  NotificationIcon,
  ProfileIcon,
  TwoFaIcon,
  type IconSize,
} from "../components/Icons";

const peopleWithImages = [
  { src: "https://i.pravatar.cc/80?img=5", alt: "Alex" },
  { src: "https://i.pravatar.cc/80?img=12", alt: "Priya" },
  { src: "https://i.pravatar.cc/80?img=47", alt: "Sam" },
  { src: "https://i.pravatar.cc/80?img=32", alt: "Jo" },
  { src: "https://i.pravatar.cc/80?img=8", alt: "Lin" },
];

export function DashboardPage() {
  return (
    <>
      <section className="page-section">
        <h2>Dashboard</h2>
        <p style={{ color: "#51596a", marginTop: 0 }}>
          Components on this page: AppShell, Topbar, Sidebar, SidebarHeader, SidebarItem,
          SubitemIcons, PageHeader, Breadcrumb, Autosave, StatusMarker, Alert, Avatar, AvatarGroup,
          DecorativeIcon, Banner, Button.
        </p>
      </section>

      <section className="page-section">
        <h3>Topbar — app chrome</h3>
        <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
          Hamburger menu, logo, company picker on the left; search pill, Assistent button and action
          icon cluster (favourites, download, notifications, messages, warnings, errors, open in new
          window, profile) on the right.
        </p>
        <div
          style={{
            marginLeft: -24,
            marginRight: -24,
            borderTop: "1px solid #d5d7db",
            borderBottom: "1px solid #d5d7db",
          }}
        >
          <Topbar companyName="Tripletex AS" messageCount={3} />
        </div>
      </section>

      <section className="page-section">
        <h3>AppShell — full application frame</h3>
        <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
          Composes Topbar + Sidebar + content slot into a single app chrome. Shows the empty
          placeholder by default; pass any node via <code>children</code> to fill the content area.
        </p>
        <div style={{ marginLeft: -24, marginRight: -24 }}>
          <div style={{ height: 640, padding: 16, background: "#eef0f4" }}>
            <AppShell
              sidebar={
                <Sidebar
                  items={DEFAULT_SIDEBAR_ITEMS.map((it) =>
                    it.label === "Hjem" ? { ...it, selected: true } : it,
                  )}
                />
              }
            />
          </div>
        </div>
      </section>

      <section className="page-section">
        <h3>AppShell — with content</h3>
        <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
          The same shell populated with a PageHeader and a Banner.
        </p>
        <div style={{ marginLeft: -24, marginRight: -24 }}>
          <div style={{ height: 640, padding: 16, background: "#eef0f4" }}>
            <AppShell
              sidebar={
                <Sidebar
                  items={DEFAULT_SIDEBAR_ITEMS.map((it) =>
                    it.label === "Faktura"
                      ? {
                          ...it,
                          selected: true,
                          showSubmenu: true,
                          subItems: [
                            { label: "Alle fakturaer" },
                            { label: "Utkast", selected: true },
                            { label: "Sendt" },
                          ],
                        }
                      : it,
                  )}
                />
              }
            >
              <PageHeader
                breadcrumb={{ parent: "Fakturaer", current: "Ny faktura" }}
                title="Ny faktura"
                autosave
                primaryAction={{ label: "Lagre" }}
                secondaryAction={{ label: "Avbryt" }}
                onMenuClick={() => {}}
              />
              <div style={{ marginTop: 24 }}>
                <Banner
                  size="medium"
                  title="Velkommen til Tripletex"
                  primaryAction={{ label: "Kom i gang" }}
                  onClose={() => {}}
                >
                  Start med å opprette din første faktura.
                </Banner>
              </div>
            </AppShell>
          </div>
        </div>
      </section>

      <section className="page-section">
        <h3>Sidebar — primary navigation</h3>
        <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
          Full-height nav with 19 top-level areas. Each item has a branded icon and label; selected
          state paints the icon tile blue with a white glyph and bolds the label. Supports an
          expanded submenu (sub-items marked with a dot / filled disk) and a collapsed icons-only
          mode (65px).
        </p>
      </section>

      <section className="page-section">
        <h3>Sidebar — three variations</h3>
        <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
          Default (nothing selected), a selected item with icon tile highlighted, and collapsed
          icons-only mode.
        </p>
        <div
          style={{
            display: "flex",
            gap: 16,
            alignItems: "flex-start",
            background: "#f2f4f7",
            padding: 16,
            borderRadius: 6,
            flexWrap: "wrap",
          }}
        >
          <div style={{ background: "#ffffff", borderRadius: 6, border: "1px solid #d5d7db" }}>
            <div style={{ padding: "8px 12px", fontSize: 12, color: "#51596a", borderBottom: "1px solid #d5d7db" }}>
              Default (expanded)
            </div>
            <Sidebar />
          </div>

          <div style={{ background: "#ffffff", borderRadius: 6, border: "1px solid #d5d7db" }}>
            <div style={{ padding: "8px 12px", fontSize: 12, color: "#51596a", borderBottom: "1px solid #d5d7db" }}>
              Faktura selected + submenu open
            </div>
            <SidebarSelectedShowcase />
          </div>

          <div style={{ background: "#ffffff", borderRadius: 6, border: "1px solid #d5d7db" }}>
            <div style={{ padding: "8px 12px", fontSize: 12, color: "#51596a", borderBottom: "1px solid #d5d7db" }}>
              Collapsed (icons only)
            </div>
            <Sidebar collapsed />
          </div>
        </div>
      </section>

      <section className="page-section">
        <h3>SidebarHeader — top-level row variants</h3>
        <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
          A single top-level row. Default, hover (via mouse), selected (blue icon tile + medium
          label) and selected with open submenu.
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            width: 240,
            background: "#ffffff",
            padding: 12,
            borderRadius: 6,
            border: "1px solid #d5d7db",
          }}
        >
          <SidebarHeader label="Favoritter" icon={<span>★</span>} />
          <SidebarHeader label="Favoritter" icon={<span style={{ color: "#fff" }}>★</span>} selected />
          <SidebarHeader
            label="Favoritter"
            icon={<span style={{ color: "#fff" }}>★</span>}
            selected
            showSubmenu
            subItems={[
              { label: "Mine favoritter" },
              { label: "Delte favoritter", selected: true },
              { label: "Arkiverte" },
            ]}
          />
        </div>
      </section>

      <section className="page-section">
        <h3>SidebarItem — sub-item rows</h3>
        <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
          Nested under an expanded top-level item. Unselected uses a 3px mini-disk marker; selected
          uses a 6px disk and medium weight label.
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            width: 224,
            background: "#ffffff",
            padding: 12,
            borderRadius: 6,
            border: "1px solid #d5d7db",
          }}
        >
          <SidebarItem label="Alle fakturaer" />
          <SidebarItem label="Utkast" selected />
          <SidebarItem label="Sendt" />
          <SidebarItem label="Betalte" />
          <SidebarItem label="Kreditnotaer" />
        </div>
      </section>

      <section className="page-section">
        <h3>SubitemIcons — marker atoms</h3>
        <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
          32×32 marker tile used to anchor sub-items. Four types: disk (selected sub-item), mini
          disk (default sub-item), expandable (collapsed chevron), expanded (open chevron).
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, auto)",
            gap: 24,
            alignItems: "center",
            justifyContent: "start",
            background: "#ffffff",
            padding: 16,
            borderRadius: 6,
            border: "1px solid #d5d7db",
          }}
        >
          <SubitemIconLabeled label="disk" />
          <SubitemIconLabeled label="mini-disk" />
          <SubitemIconLabeled label="expandable" />
          <SubitemIconLabeled label="expanded" />
        </div>
      </section>

      <section className="page-section">
        <h3>Icons — library</h3>
        <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
          Six icons (Favourite, Flag, Logout, Notification, Profile, 2FA) each at 3 sizes (20, 24,
          48). Fill inherits <code>currentColor</code>, so the icon recolors with its surrounding
          text.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(200px, 1fr))",
            gap: 16,
          }}
        >
          <IconShowcaseCard name="Favourite" Icon={FavouriteIcon} />
          <IconShowcaseCard name="Flag" Icon={FlagIcon} />
          <IconShowcaseCard name="Logout" Icon={LogoutIcon} />
          <IconShowcaseCard name="Notification" Icon={NotificationIcon} />
          <IconShowcaseCard name="Profile" Icon={ProfileIcon} />
          <IconShowcaseCard name="2FA" Icon={TwoFaIcon} />
        </div>
      </section>

      <section className="page-section">
        <h3>Icons — color via currentColor</h3>
        <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
          Same icon components themed by setting <code>color</code> on the parent.
        </p>
        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            alignItems: "center",
            background: "#ffffff",
            padding: 16,
            borderRadius: 6,
            border: "1px solid #d5d7db",
          }}
        >
          <div style={{ color: "#0a41fa", display: "flex", alignItems: "center", gap: 8 }}>
            <FavouriteIcon size={24} aria-label="Favourite" />
            <FlagIcon size={24} aria-label="Flag" />
            <NotificationIcon size={24} aria-label="Notification" />
          </div>
          <div style={{ color: "#2e384d", display: "flex", alignItems: "center", gap: 8 }}>
            <ProfileIcon size={24} aria-label="Profile" />
            <LogoutIcon size={24} aria-label="Logout" />
            <TwoFaIcon size={24} aria-label="Two-factor" />
          </div>
          <div style={{ color: "#d93854", display: "flex", alignItems: "center", gap: 8 }}>
            <FavouriteIcon size={24} aria-label="Favourite red" />
            <FlagIcon size={24} aria-label="Flag red" />
          </div>
        </div>
      </section>

      <section className="page-section">
        <h3>PageHeader — expanded (all slots)</h3>
        <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
          Breadcrumb + title + autosave + actions + subheading (status markers) + alert.
        </p>
        <PageHeader
          breadcrumb={{ parent: "Fakturaer", current: "Ny faktura" }}
          title="Ny faktura"
          autosave
          subheading={
            <>
              <span>Utkast #2045</span>
              <StatusMarker variant="warning" label="Utkast" />
              <span>Sist endret 16. jan. 2025</span>
            </>
          }
          primaryAction={{ label: "Lagre" }}
          secondaryAction={{ label: "Avbryt" }}
          onMenuClick={() => {}}
        />
      </section>

      <section className="page-section">
        <h3>PageHeader — expanded with warning alert</h3>
        <PageHeader
          breadcrumb={{ parent: "Lønn", current: "Lønnsutbetaling" }}
          title="Lønnsutbetaling"
          subheading={
            <>
              <span>Mai 2025</span>
              <StatusMarker variant="warning" label="Under bearbeiding" />
            </>
          }
          primaryAction={{ label: "Godkjenn" }}
          secondaryAction={{ label: "Rediger" }}
          onMenuClick={() => {}}
          alert={
            <Alert variant="warning">
              Kontroller opplysningene før du godkjenner.{" "}
              <a href="#" style={{ color: "inherit" }}>Les mer</a>
            </Alert>
          }
        />
      </section>

      <section className="page-section">
        <h3>PageHeader — compact</h3>
        <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
          20px title, no breadcrumb/subheading — use when scrolled or on dense pages.
        </p>
        <PageHeader
          variant="compact"
          title="Reiseregning"
          primaryAction={{ label: "Send inn" }}
          secondaryAction={{ label: "Avbryt" }}
          onMenuClick={() => {}}
        />
      </section>

      <section className="page-section">
        <h3>PageHeader — success status</h3>
        <PageHeader
          breadcrumb={{ parent: "Ordre", current: "Ny ordre" }}
          title="Ny ordre"
          subheading={
            <>
              <span>Ordre #4421</span>
              <StatusMarker variant="success" label="Bokført" />
              <StatusMarker variant="success" label="Betalt" />
            </>
          }
          primaryAction={{ label: "Skriv ut" }}
          secondaryAction={{ label: "Send" }}
          onMenuClick={() => {}}
        />
      </section>

      <section className="page-section">
        <h3>PageHeader — title only</h3>
        <PageHeader title="Ola Norman" />
      </section>

      <section className="page-section">
        <h3>Breadcrumb — parent / current</h3>
        <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
          Used inside PageHeader; also usable standalone.
        </p>
        <div className="demo-row">
          <Breadcrumb parent="Fakturaer" current="Ny faktura" />
        </div>
      </section>

      <section className="page-section">
        <h3>Autosave — saved / saving states</h3>
        <div className="demo-row" style={{ alignItems: "center", gap: 24 }}>
          <Autosave state="saved" />
          <Autosave state="saving" />
          <Autosave state="saved" label="Lagret for 2 min siden" />
        </div>
      </section>

      <section className="page-section">
        <h3>StatusMarker — warning / success</h3>
        <div className="demo-row" style={{ alignItems: "center", gap: 16 }}>
          <StatusMarker variant="warning" label="Utkast" />
          <StatusMarker variant="warning" label="Under bearbeiding" />
          <StatusMarker variant="success" label="Bokført" />
          <StatusMarker variant="success" label="Betalt" />
        </div>
      </section>

      <section className="page-section">
        <h3>Button — all variants × sizes</h3>
        <h4 style={{ fontSize: 13, fontWeight: 500, color: "#51596a", margin: "8px 0" }}>Medium</h4>
        <div className="demo-row">
          <Button variant="primary">Button</Button>
          <Button variant="secondary">Button</Button>
          <Button variant="tertiary">Button</Button>
          <Button variant="primary" disabled>Button</Button>
          <Button variant="primary" icon={<PlusIcon />}>Button</Button>
          <Button variant="secondary" icon={<PlusIcon />}>Button</Button>
          <Button variant="icon" icon={<PlusIcon />} aria-label="Add" />
        </div>

        <h4 style={{ fontSize: 13, fontWeight: 500, color: "#51596a", margin: "16px 0 8px" }}>Small</h4>
        <div className="demo-row">
          <Button variant="primary" size="small">Button</Button>
          <Button variant="secondary" size="small">Button</Button>
          <Button variant="tertiary" size="small">Button</Button>
          <Button variant="primary" size="small" disabled>Button</Button>
          <Button variant="primary" size="small" icon={<PlusIcon />}>Button</Button>
          <Button variant="icon" size="small" icon={<PlusIcon />} aria-label="Add" />
        </div>
      </section>

      <section className="page-section">
        <h3>Avatar — all sizes</h3>
        <h4 style={{ fontSize: 13, fontWeight: 500, color: "#51596a", margin: "8px 0" }}>Image</h4>
        <div className="demo-row">
          <Avatar size="tiny" src="https://i.pravatar.cc/80?img=5" alt="Alex" />
          <Avatar size="small" src="https://i.pravatar.cc/80?img=5" alt="Alex" />
          <Avatar size="medium" src="https://i.pravatar.cc/80?img=5" alt="Alex" />
          <Avatar size="large" src="https://i.pravatar.cc/80?img=5" alt="Alex" />
          <Avatar size="tiny" src="https://i.pravatar.cc/80?img=5" alt="Alex" online />
          <Avatar size="small" src="https://i.pravatar.cc/80?img=5" alt="Alex" online />
          <Avatar size="medium" src="https://i.pravatar.cc/80?img=5" alt="Alex" online />
          <Avatar size="large" src="https://i.pravatar.cc/80?img=5" alt="Alex" online />
        </div>

        <h4 style={{ fontSize: 13, fontWeight: 500, color: "#51596a", margin: "16px 0 8px" }}>Initials</h4>
        <div className="demo-row">
          <Avatar size="tiny" initials="JS" />
          <Avatar size="small" initials="JS" />
          <Avatar size="medium" initials="JS" />
          <Avatar size="large" initials="JS" />
          <Avatar size="tiny" initials="JS" online />
          <Avatar size="small" initials="JS" online />
          <Avatar size="medium" initials="JS" online />
          <Avatar size="large" initials="JS" online />
        </div>
      </section>

      <section className="page-section">
        <h3>AvatarGroup — stacked / spaced</h3>
        <h4 style={{ fontSize: 13, fontWeight: 500, color: "#51596a", margin: "8px 0" }}>
          Stacked (no status)
        </h4>
        <div className="demo-row">
          <AvatarGroup users={peopleWithImages} max={3} />
        </div>

        <h4 style={{ fontSize: 13, fontWeight: 500, color: "#51596a", margin: "16px 0 8px" }}>
          Spaced (with status)
        </h4>
        <div className="demo-row">
          <AvatarGroup
            users={peopleWithImages.map((p) => ({ ...p, online: true }))}
            max={3}
            showStatus
          />
        </div>
      </section>

      <section className="page-section">
        <h3>DecorativeIcon — 3 sizes</h3>
        <div className="demo-row" style={{ alignItems: "center" }}>
          <DecorativeIcon size="small" icon={<CalendarIcon />} aria-label="Calendar" />
          <DecorativeIcon size="medium" icon={<CalendarIcon />} aria-label="Calendar" />
          <DecorativeIcon size="large" icon={<CalendarIcon />} aria-label="Calendar" />
        </div>
      </section>

      <section className="page-section">
        <h3>Banner — chip variants</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Banner
            variant="info"
            title="Heading"
            primaryAction={{ label: "Primary" }}
            secondaryAction={{ label: "Secondary" }}
            onClose={() => {}}
          >
            Body text.
          </Banner>
          <Banner
            variant="help"
            title="Heading"
            primaryAction={{ label: "Primary" }}
            secondaryAction={{ label: "Secondary" }}
            onClose={() => {}}
          >
            Body text.
          </Banner>
          <Banner
            variant="tips"
            title="Heading"
            primaryAction={{ label: "Primary" }}
            secondaryAction={{ label: "Secondary" }}
            onClose={() => {}}
          >
            Body text.
          </Banner>
          <Banner
            variant="news"
            title="Heading"
            primaryAction={{ label: "Primary" }}
            onClose={() => {}}
          >
            Body text.
          </Banner>
          <Banner
            variant="get-started"
            title="Heading"
            primaryAction={{ label: "Primary" }}
            onClose={() => {}}
          >
            Body text.
          </Banner>
          <Banner
            variant="automation"
            title="Heading"
            primaryAction={{ label: "Primary" }}
            secondaryAction={{ label: "Secondary" }}
            onClose={() => {}}
          >
            Body text.
          </Banner>
          <Banner
            variant="success"
            title="Heading"
            primaryAction={{ label: "Primary" }}
            onClose={() => {}}
          >
            Body text.
          </Banner>
          <Banner
            variant="warning"
            title="Heading"
            primaryAction={{ label: "Primary" }}
            onClose={() => {}}
          >
            Body text.
          </Banner>
          <Banner
            variant="error"
            title="Heading"
            primaryAction={{ label: "Primary" }}
            onClose={() => {}}
          >
            Body text.
          </Banner>
        </div>

        <h4 style={{ fontSize: 13, fontWeight: 500, color: "#51596a", margin: "16px 0 8px" }}>
          With illustration
        </h4>
        <Banner
          variant="success"
          title="Nice work!"
          primaryAction={{ label: "View report" }}
          onClose={() => {}}
          illustration={<ConfettiIllustration />}
        >
          Your invoices were sent successfully.
        </Banner>

        <h4 style={{ fontSize: 13, fontWeight: 500, color: "#51596a", margin: "16px 0 8px" }}>
          Product spotlight (decorative background) — 3 sizes
        </h4>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Banner
            variant="tips"
            size="small"
            title="Heading"
            primaryAction={{ label: "Button" }}
            onClose={() => {}}
            decorativeBackground
          >
            Body text.
          </Banner>
          <Banner
            variant="tips"
            size="medium"
            title="Heading"
            primaryAction={{ label: "Button" }}
            onClose={() => {}}
            decorativeBackground
          >
            Body text.
          </Banner>
          <Banner
            variant="tips"
            size="large"
            title="Heading"
            primaryAction={{ label: "Button" }}
            onClose={() => {}}
            decorativeBackground
          >
            Body text.
          </Banner>
        </div>
      </section>
    </>
  );
}

function ConfettiIllustration() {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="50" cy="50" r="36" fill="var(--illustration-green-light)" />
      <path
        d="M34 52l10 10 22-22"
        stroke="var(--illustration-blue)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="18" cy="24" r="3" fill="var(--illustration-pink)" />
      <circle cx="84" cy="20" r="3" fill="var(--illustration-purple-light)" />
      <circle cx="86" cy="78" r="3" fill="var(--illustration-blue-mid)" />
      <circle cx="14" cy="74" r="3" fill="var(--illustration-green)" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 5v10M5 10h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="3" y="5" width="14" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 8h14" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 3v3M13 3v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SidebarSelectedShowcase() {
  const withSelection = DEFAULT_SIDEBAR_ITEMS.map((it) =>
    it.label === "Faktura"
      ? {
          ...it,
          selected: true,
          showSubmenu: true,
          subItems: [
            { label: "Alle fakturaer" },
            { label: "Utkast", selected: true },
            { label: "Sendt" },
            { label: "Betalte" },
            { label: "Kreditnotaer" },
          ],
        }
      : it,
  );
  return <Sidebar items={withSelection} />;
}

function SubitemIconLabeled({ label }: { label: "disk" | "mini-disk" | "expandable" | "expanded" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div
        style={{
          border: "1px dashed #d5d7db",
          borderRadius: 4,
          padding: 2,
        }}
      >
        <SubitemIcons type={label} />
      </div>
      <span style={{ fontSize: 12, color: "#51596a", fontFamily: "Rubik, sans-serif" }}>{label}</span>
    </div>
  );
}

function IconShowcaseCard({
  name,
  Icon,
}: {
  name: string;
  Icon: (props: { size?: IconSize; className?: string; "aria-label"?: string }) => JSX.Element;
}) {
  const sizes: IconSize[] = [20, 24, 48];
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #d5d7db",
        borderRadius: 6,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        color: "#2e384d",
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: 500,
          fontFamily: "Rubik, sans-serif",
          color: "#2e384d",
        }}
      >
        {name}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          gap: 16,
          border: "1px dashed #c9ccd3",
          borderRadius: 4,
          padding: "16px 12px",
          minHeight: 80,
        }}
      >
        {sizes.map((s) => (
          <div
            key={s}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Icon size={s} aria-label={`${name} ${s}`} />
            <span style={{ fontSize: 11, color: "#51596a", fontFamily: "Rubik, sans-serif" }}>
              {s}px
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
