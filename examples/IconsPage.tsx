import { useMemo, useState } from "react";
import {
  FavouriteIcon,
  FlagIcon,
  LogoutIcon,
  NotificationIcon,
  ProfileIcon,
  TwoFaIcon,
  AirplaneIcon,
  AlarmIcon,
  AppsIcon,
  BlockIcon,
  CalendarIcon,
  CardIcon,
  CheckIcon,
  ClipboardIcon,
  ClockIcon,
  CloseIcon,
  CopyIcon,
  DashboardIcon,
  DownloadIcon,
  EditIcon,
  ExternalLinkIcon,
  EyeIcon,
  EyeOffIcon,
  HierarchyIcon,
  HistoryIcon,
  LayoutIcon,
  LinkIcon,
  LinkOffIcon,
  ListIcon,
  LockIcon,
  MagicWandIcon,
  MinusIcon,
  PlusIcon,
  RefreshIcon,
  RestoreIcon,
  SearchIcon,
  SettingsIcon,
  SortIcon,
  TrashIcon,
  UnlockIcon,
  UserMinusIcon,
  UserPlusIcon,
  UsersIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronsOutIcon,
  MailIcon,
  ChatIcon,
  NoteIcon,
  SendIcon,
  EditSquareIcon,
  PhoneIcon,
  FeedbackIcon,
  AlertTriangleIcon,
  InfoIcon,
  WarningIcon,
  HelpIcon,
  CheckCircleIcon,
  ErrorIcon,
  TrendUpIcon,
  TrendDownIcon,
  TipIcon,
  MegaphoneIcon,
  RocketIcon,
  SparkleIcon,
  GaugeHighIcon,
  GaugeMidIcon,
  GaugeLowIcon,
  ZoomInIcon,
  ZoomOutIcon,
  PrintIcon,
  SyncIcon,
  ColumnsIcon,
  PageLayoutIcon,
  PdfIcon,
  ChevronsCollapseYIcon,
  MoveIcon,
  ChevronsExpandYIcon,
  DragHandleIcon,
  CheckboxIcon,
  SortCaretIcon,
  CaretDownIcon,
  CaretUpIcon,
  CloseSquareIcon,
  RowsIcon,
  Table2RowsIcon,
  FrameIcon,
  MoreVerticalIcon,
  InsightsIcon,
  FilterIcon,
  MinimizeIcon,
  HomeIcon,
  TagIcon,
  OrderIcon,
  InvoiceIcon,
  FileIcon,
  DocumentIcon,
  EqualsIcon,
  CreditCardIcon,
  EditDocumentIcon,
  BankIcon,
  BuildingIcon,
  ActivityLogIcon,
  ArchiveIcon,
  PhoneSyncIcon,
  CloudUploadIcon,
  CloudCheckIcon,
  CloudIcon,
  FolderOpenIcon,
  FolderIcon,
  CloudOffIcon,
  AttachmentIcon,
  type IconProps,
  type IconSize,
} from "../components/Icons";

type IconEntry = {
  name: string;
  Icon: (props: IconProps) => JSX.Element;
};

const ALL_ICONS: IconEntry[] = [
  // Brand / user icons
  { name: "favourite", Icon: FavouriteIcon },
  { name: "flag", Icon: FlagIcon },
  { name: "logout", Icon: LogoutIcon },
  { name: "notification", Icon: NotificationIcon },
  { name: "profile", Icon: ProfileIcon },
  { name: "2fa", Icon: TwoFaIcon },
  // Library set
  { name: "airplane", Icon: AirplaneIcon },
  { name: "alarm", Icon: AlarmIcon },
  { name: "apps", Icon: AppsIcon },
  { name: "block", Icon: BlockIcon },
  { name: "calendar", Icon: CalendarIcon },
  { name: "card", Icon: CardIcon },
  { name: "check", Icon: CheckIcon },
  { name: "clipboard", Icon: ClipboardIcon },
  { name: "clock", Icon: ClockIcon },
  { name: "close", Icon: CloseIcon },
  { name: "copy", Icon: CopyIcon },
  { name: "dashboard", Icon: DashboardIcon },
  { name: "download", Icon: DownloadIcon },
  { name: "edit", Icon: EditIcon },
  { name: "external-link", Icon: ExternalLinkIcon },
  { name: "eye", Icon: EyeIcon },
  { name: "eye-off", Icon: EyeOffIcon },
  { name: "hierarchy", Icon: HierarchyIcon },
  { name: "history", Icon: HistoryIcon },
  { name: "layout", Icon: LayoutIcon },
  { name: "link", Icon: LinkIcon },
  { name: "link-off", Icon: LinkOffIcon },
  { name: "list", Icon: ListIcon },
  { name: "lock", Icon: LockIcon },
  { name: "magic-wand", Icon: MagicWandIcon },
  { name: "minus", Icon: MinusIcon },
  { name: "plus", Icon: PlusIcon },
  { name: "refresh", Icon: RefreshIcon },
  { name: "restore", Icon: RestoreIcon },
  { name: "search", Icon: SearchIcon },
  { name: "settings", Icon: SettingsIcon },
  { name: "sort", Icon: SortIcon },
  { name: "trash", Icon: TrashIcon },
  { name: "unlock", Icon: UnlockIcon },
  { name: "user-minus", Icon: UserMinusIcon },
  { name: "user-plus", Icon: UserPlusIcon },
  { name: "users", Icon: UsersIcon },
  // Navigation / arrows
  { name: "arrow-left", Icon: ArrowLeftIcon },
  { name: "arrow-right", Icon: ArrowRightIcon },
  { name: "chevron-left", Icon: ChevronLeftIcon },
  { name: "chevron-right", Icon: ChevronRightIcon },
  { name: "chevron-up", Icon: ChevronUpIcon },
  { name: "chevron-down", Icon: ChevronDownIcon },
  { name: "chevrons-out", Icon: ChevronsOutIcon },
  // Communication
  { name: "mail", Icon: MailIcon },
  { name: "chat", Icon: ChatIcon },
  { name: "note", Icon: NoteIcon },
  { name: "send", Icon: SendIcon },
  { name: "edit-square", Icon: EditSquareIcon },
  { name: "phone", Icon: PhoneIcon },
  { name: "feedback", Icon: FeedbackIcon },
  // Feedback / status
  { name: "alert-triangle", Icon: AlertTriangleIcon },
  { name: "info", Icon: InfoIcon },
  { name: "warning", Icon: WarningIcon },
  { name: "help", Icon: HelpIcon },
  { name: "check-circle", Icon: CheckCircleIcon },
  { name: "error", Icon: ErrorIcon },
  // Data / marketing
  { name: "trend-up", Icon: TrendUpIcon },
  { name: "trend-down", Icon: TrendDownIcon },
  { name: "tip", Icon: TipIcon },
  { name: "megaphone", Icon: MegaphoneIcon },
  { name: "rocket", Icon: RocketIcon },
  { name: "sparkle", Icon: SparkleIcon },
  { name: "gauge-high", Icon: GaugeHighIcon },
  { name: "gauge-mid", Icon: GaugeMidIcon },
  { name: "gauge-low", Icon: GaugeLowIcon },
  // Tools / controls
  { name: "zoom-in", Icon: ZoomInIcon },
  { name: "zoom-out", Icon: ZoomOutIcon },
  { name: "print", Icon: PrintIcon },
  { name: "sync", Icon: SyncIcon },
  { name: "columns", Icon: ColumnsIcon },
  { name: "page-layout", Icon: PageLayoutIcon },
  { name: "pdf", Icon: PdfIcon },
  { name: "move", Icon: MoveIcon },
  { name: "drag-handle", Icon: DragHandleIcon },
  { name: "checkbox", Icon: CheckboxIcon },
  { name: "sort-caret", Icon: SortCaretIcon },
  { name: "caret-down", Icon: CaretDownIcon },
  { name: "caret-up", Icon: CaretUpIcon },
  { name: "chevrons-collapse-y", Icon: ChevronsCollapseYIcon },
  { name: "chevrons-expand-y", Icon: ChevronsExpandYIcon },
  { name: "close-square", Icon: CloseSquareIcon },
  { name: "more-vertical", Icon: MoreVerticalIcon },
  { name: "minimize", Icon: MinimizeIcon },
  // Layout
  { name: "rows", Icon: RowsIcon },
  { name: "table-2-rows", Icon: Table2RowsIcon },
  { name: "frame", Icon: FrameIcon },
  // Data / filtering
  { name: "filter", Icon: FilterIcon },
  { name: "insights", Icon: InsightsIcon },
  { name: "activity-log", Icon: ActivityLogIcon },
  { name: "equals", Icon: EqualsIcon },
  // Places / business
  { name: "home", Icon: HomeIcon },
  { name: "bank", Icon: BankIcon },
  { name: "building", Icon: BuildingIcon },
  // Documents / files
  { name: "tag", Icon: TagIcon },
  { name: "order", Icon: OrderIcon },
  { name: "invoice", Icon: InvoiceIcon },
  { name: "file", Icon: FileIcon },
  { name: "document", Icon: DocumentIcon },
  { name: "edit-document", Icon: EditDocumentIcon },
  { name: "credit-card", Icon: CreditCardIcon },
  { name: "archive", Icon: ArchiveIcon },
  { name: "attachment", Icon: AttachmentIcon },
  // Cloud / folders
  { name: "cloud", Icon: CloudIcon },
  { name: "cloud-upload", Icon: CloudUploadIcon },
  { name: "cloud-check", Icon: CloudCheckIcon },
  { name: "cloud-off", Icon: CloudOffIcon },
  { name: "folder", Icon: FolderIcon },
  { name: "folder-open", Icon: FolderOpenIcon },
  // Communication
  { name: "phone-sync", Icon: PhoneSyncIcon },
];

const SIZE_OPTIONS: IconSize[] = [20, 24, 48];

const COLOR_OPTIONS: Array<{ label: string; value: string }> = [
  { label: "Default (#2E384D)", value: "#2E384D" },
  { label: "Brand blue", value: "#0A41FA" },
  { label: "Muted", value: "#51596A" },
  { label: "Success", value: "#0F8555" },
  { label: "Warning", value: "#C77300" },
  { label: "Danger", value: "#D93854" },
];

export function IconsPage() {
  const [size, setSize] = useState<IconSize>(24);
  const [color, setColor] = useState(COLOR_OPTIONS[0].value);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_ICONS;
    return ALL_ICONS.filter((i) => i.name.includes(q));
  }, [query]);

  return (
    <>
      <section className="page-section">
        <h2>Icons</h2>
        <p style={{ color: "#51596A", marginTop: 0 }}>
          {ALL_ICONS.length} icons available across 3 sizes (20, 24, 48). All paths use{" "}
          <code>currentColor</code> — set <code>color</code> on the parent to recolor them. Each
          icon is a React component from <code>components/Icons.tsx</code>.
        </p>
      </section>

      <section className="page-section">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
            padding: 16,
            background: "#f7f8fc",
            border: "1px solid #d5d7db",
            borderRadius: 6,
            fontFamily: "Rubik, sans-serif",
          }}
        >
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
            <span style={{ color: "#51596A" }}>Search</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. user, arrow, clock"
              style={{
                fontFamily: "inherit",
                fontSize: 13,
                padding: "6px 10px",
                border: "1px solid #d5d7db",
                borderRadius: 4,
                background: "#ffffff",
                minWidth: 220,
              }}
            />
          </label>

          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
            <span style={{ color: "#51596A" }}>Size</span>
            <div
              style={{
                display: "inline-flex",
                border: "1px solid #d5d7db",
                borderRadius: 4,
                overflow: "hidden",
                background: "#ffffff",
              }}
            >
              {SIZE_OPTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  style={{
                    padding: "6px 12px",
                    border: "none",
                    borderLeft: s === SIZE_OPTIONS[0] ? "none" : "1px solid #d5d7db",
                    background: s === size ? "#2E384D" : "transparent",
                    color: s === size ? "#ffffff" : "#2E384D",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: 13,
                    fontWeight: s === size ? 500 : 400,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
            <span style={{ color: "#51596A" }}>Color</span>
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{
                fontFamily: "inherit",
                fontSize: 13,
                padding: "6px 10px",
                border: "1px solid #d5d7db",
                borderRadius: 4,
                background: "#ffffff",
              }}
            >
              {COLOR_OPTIONS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>

          <span style={{ color: "#51596A", fontSize: 13, marginLeft: "auto" }}>
            Showing {filtered.length} of {ALL_ICONS.length}
          </span>
        </div>
      </section>

      <section className="page-section">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: 12,
            color,
          }}
        >
          {filtered.map(({ name, Icon }) => (
            <IconTile key={name} name={name} Icon={Icon} size={size} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div
            style={{
              padding: 32,
              textAlign: "center",
              color: "#51596A",
              fontFamily: "Rubik, sans-serif",
              fontSize: 14,
              border: "1px dashed #d5d7db",
              borderRadius: 6,
            }}
          >
            No icons match “{query}”.
          </div>
        )}
      </section>
    </>
  );
}

function IconTile({
  name,
  Icon,
  size,
}: {
  name: string;
  Icon: (props: IconProps) => JSX.Element;
  size: IconSize;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        padding: "16px 12px",
        background: "#ffffff",
        border: "1px solid #d5d7db",
        borderRadius: 6,
        minHeight: 112,
      }}
      title={name}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: "1 0 auto",
        }}
      >
        <Icon size={size} aria-label={name} />
      </div>
      <span
        style={{
          fontSize: 11,
          color: "#51596A",
          fontFamily: "Rubik, sans-serif",
          textAlign: "center",
          wordBreak: "break-word",
          lineHeight: 1.3,
        }}
      >
        {name}
      </span>
    </div>
  );
}
