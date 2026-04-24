import { useState } from "react";
import { Button } from "../components/Button";
import { AvatarWithName } from "../components/AvatarWithName";
import { Avatar, AvatarGroup } from "../components/Avatar";
import { Chip } from "../components/Chip";
import { Pagination, TablePagination } from "../components/Pagination";
import { PopupMenu, PopupMenuItem, PopupGroupHeader } from "../components/PopupMenu";
import { TableView, type TableViewColumn } from "../components/TableView";
import { Input } from "../components/Input";
import { Period } from "../components/Period";
import { Dropdown } from "../components/Dropdown";
import { ContentSwitcher } from "../components/ContentSwitcher";
import { TableFilter, FilterButton, TableFilterIconButton } from "../components/TableFilter";
import { FilterDialog, type SavedFilter } from "../components/FilterDialog";
import { Table, type TableColumn, type TableSort, type TableRowTone } from "../components/Table";

const collaborators = [
  { src: "https://i.pravatar.cc/80?img=5", alt: "Alex" },
  { src: "https://i.pravatar.cc/80?img=12", alt: "Priya" },
  { src: "https://i.pravatar.cc/80?img=47", alt: "Sam" },
  { src: "https://i.pravatar.cc/80?img=32", alt: "Jo" },
  { src: "https://i.pravatar.cc/80?img=8", alt: "Lin" },
];

const initialColumns: TableViewColumn[] = [
  { id: "number", label: "Number", visible: true },
  { id: "customer", label: "Customer", visible: true },
  { id: "due", label: "Due date", visible: true },
  { id: "amount", label: "Amount", visible: true },
];

const savedFilters: SavedFilter[] = [
  { id: "f1", name: "Filter name", onMenuClick: () => {} },
  { id: "f2", name: "Filter name", onMenuClick: () => {} },
];

const stockOptions = [
  { value: "all", label: "All" },
  { value: "in", label: "In stock" },
  { value: "out", label: "Out of stock" },
];

const priceRangeOptions = [
  { value: "0-100", label: "0 – 100 kr" },
  { value: "100-500", label: "100 – 500 kr" },
  { value: "500+", label: "500 kr and above" },
];

type InvoiceRow = {
  id: string;
  number: string;
  customer: string;
  due: string;
  amount: number;
};

const invoiceRows: InvoiceRow[] = [
  { id: "1", number: "INV-2045", customer: "Kaffekjelleren AS", due: "16. jan. 2025", amount: 2450 },
  { id: "2", number: "INV-2046", customer: "Nordlys Design", due: "17. jan. 2025", amount: 850 },
  { id: "3", number: "INV-2047", customer: "Fjord & Co", due: "20. jan. 2025", amount: 12800 },
  { id: "4", number: "INV-2048", customer: "Bergen Byggfirma", due: "22. jan. 2025", amount: 560 },
  { id: "5", number: "INV-2049", customer: "Tromsø Teknikk", due: "25. jan. 2025", amount: 7300 },
  { id: "6", number: "INV-2050", customer: "Sør Frukt AS", due: "28. jan. 2025", amount: 1990 },
];

const invoiceColumns: TableColumn<InvoiceRow>[] = [
  { id: "number", label: "Number", sortable: true },
  { id: "customer", label: "Customer", sortable: true },
  { id: "due", label: "Due date", sortable: true },
  {
    id: "amount",
    label: "Amount",
    align: "right",
    sortable: true,
    render: (row) =>
      row.amount.toLocaleString("nb-NO", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
  },
];

export function ListPage() {
  const [columns, setColumns] = useState<TableViewColumn[]>(initialColumns);
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeSaved, setActiveSaved] = useState<string | null>(null);
  const [activeStock, setActiveStock] = useState("all");
  const [filterCount, setFilterCount] = useState(0);
  const [sort, setSort] = useState<TableSort | null>({ columnId: "number", direction: "asc" });
  const [activeRowId, setActiveRowId] = useState<string | null>("2");
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>(["2", "4"]);
  const [expandedRowIds, setExpandedRowIds] = useState<string[]>(["3"]);
  const sortedInvoices = [...invoiceRows].sort((a, b) => {
    if (!sort) return 0;
    const av = (a as Record<string, unknown>)[sort.columnId];
    const bv = (b as Record<string, unknown>)[sort.columnId];
    const cmp =
      typeof av === "number" && typeof bv === "number"
        ? av - bv
        : String(av).localeCompare(String(bv));
    return sort.direction === "asc" ? cmp : -cmp;
  });
  return (
    <>
      <section className="page-section">
        <h2>List / Table — Invoices</h2>
        <p style={{ color: "#51596a", marginTop: 0 }}>
          Components on this page: TableFilter, FilterDialog, TableView, Chip, AvatarWithName,
          AvatarGroup, PopupMenu, Pagination, Button.
        </p>
      </section>

      <section className="page-section">
        <h3>PageHeader (placeholder)</h3>
        <div className="placeholder" style={{ justifyContent: "space-between" }}>
          <span>PageHeader — title + breadcrumbs</span>
          <Button variant="primary" size="small">New invoice</Button>
        </div>
      </section>

      <section className="page-section">
        <h3>Owner / Collaborators cells</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <AvatarWithName name="Alex Rivera" src="https://i.pravatar.cc/80?img=5" />
          <AvatarWithName name="Priya Nair" src="https://i.pravatar.cc/80?img=12" online />
          <AvatarWithName name="Jordan Smith" initials="JS" />
          <AvatarWithName name="Maria Kowalski" initials="MK" online />
        </div>

        <h4 style={{ fontSize: 13, fontWeight: 500, color: "#51596a", margin: "16px 0 8px" }}>
          Collaborators (stacked, +N overflow)
        </h4>
        <AvatarGroup users={collaborators} max={3} />
      </section>

      <section className="page-section">
        <h3>Chip — variants × sizes</h3>
        <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
          Static, Interactive, Removable, Interactive + Removable × Small / Medium / Large.
          Content options: label only, icon, or avatar.
        </p>

        {(["small", "medium", "large"] as const).map((size) => (
          <div key={size} style={{ marginTop: 16 }}>
            <h4 style={{ fontSize: 13, fontWeight: 500, color: "#51596a", margin: "8px 0" }}>
              {size[0].toUpperCase() + size.slice(1)}
            </h4>
            <div className="demo-row" style={{ alignItems: "center", flexWrap: "wrap", gap: 8 }}>
              <Chip label="Component" size={size} variant="static" />
              <Chip label="Component" size={size} variant="static" icon={<InfoChipIcon />} />
              <Chip
                label="Component"
                size={size}
                variant="static"
                avatar={
                  <Avatar
                    size={size === "small" ? "tiny" : size === "medium" ? "small" : "medium"}
                    src="https://i.pravatar.cc/80?img=12"
                    alt="Priya"
                  />
                }
              />
              <Chip label="Component" size={size} variant="removable" onRemove={() => {}} />
              <Chip
                label="Component"
                size={size}
                variant="removable"
                icon={<InfoChipIcon />}
                onRemove={() => {}}
              />
              <Chip label="Component" size={size} variant="interactive" onClick={() => {}} />
              <Chip
                label="Component"
                size={size}
                variant="interactive"
                icon={<InfoChipIcon />}
                onClick={() => {}}
              />
              <Chip
                label="Component"
                size={size}
                variant="interactive-removable"
                onClick={() => {}}
                onRemove={() => {}}
              />
              <Chip
                label="Component"
                size={size}
                variant="interactive-removable"
                icon={<InfoChipIcon />}
                onClick={() => {}}
                onRemove={() => {}}
              />
            </div>
          </div>
        ))}

        <h4 style={{ fontSize: 13, fontWeight: 500, color: "#51596a", margin: "16px 0 8px" }}>
          Disabled
        </h4>
        <div className="demo-row" style={{ alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <Chip label="Component" variant="interactive" disabled />
          <Chip label="Component" variant="removable" disabled />
          <Chip label="Component" variant="interactive-removable" disabled />
        </div>
      </section>

      <section className="page-section">
        <h3>TablePagination — range + chevrons</h3>
        <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
          Right-aligned; range text opens a page-size menu (wire up onRangeClick).
        </p>
        <TablePagination defaultPage={1} pageSize={250} total={1500} />
      </section>

      <section className="page-section">
        <h3>Pagination — Previous / page / Next</h3>
        <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
          Centered 182px block; tabular-nums counter.
        </p>
        <Pagination defaultPage={1} totalPages={5} />
      </section>

      <section className="page-section">
        <h3>PopupMenu — simple</h3>
        <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
          Menu container with menu items. Items support default, hover, focused, selected (active),
          and disabled states.
        </p>
        <div className="demo-row" style={{ alignItems: "flex-start", gap: 24 }}>
          <PopupMenu width={187} aria-label="Row actions">
            <PopupMenuItem icon={<InfoChipIcon />}>Action 1</PopupMenuItem>
            <PopupMenuItem icon={<InfoChipIcon />}>Action 2</PopupMenuItem>
            <PopupMenuItem icon={<InfoChipIcon />}>Action 3</PopupMenuItem>
          </PopupMenu>

          <PopupMenu width={187} aria-label="Select action">
            <PopupMenuItem>Action 1</PopupMenuItem>
            <PopupMenuItem selected>Action 2</PopupMenuItem>
            <PopupMenuItem>Action 3</PopupMenuItem>
          </PopupMenu>

          <PopupMenu width={187} aria-label="State preview">
            <PopupMenuItem icon={<InfoChipIcon />}>Default</PopupMenuItem>
            <PopupMenuItem icon={<InfoChipIcon />} focused>Focused</PopupMenuItem>
            <PopupMenuItem icon={<InfoChipIcon />} disabled>Disabled</PopupMenuItem>
          </PopupMenu>
        </div>
      </section>

      <section className="page-section">
        <h3>PopupMenu — grouped with headers</h3>
        <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
          Group headers separate sections; subsequent headers add a divider.
        </p>
        <PopupMenu width={273} aria-label="Order actions">
          <PopupGroupHeader label="Neste steg" />
          <PopupMenuItem icon={<ArrowIcon />} selected>Fakturering</PopupMenuItem>
          <PopupMenuItem icon={<ArrowIcon />}>Sending av ordrebekreftelse</PopupMenuItem>
          <PopupMenuItem icon={<ArrowIcon />}>Sending av tilbud</PopupMenuItem>
          <PopupGroupHeader divider />
          <PopupMenuItem icon={<ArrowIcon />}>Sending av plukkliste</PopupMenuItem>
          <PopupMenuItem icon={<ArrowIcon />}>Sending av plukkliste (varehus)</PopupMenuItem>
          <PopupMenuItem icon={<InfoChipIcon />}>Lagre som ordre</PopupMenuItem>
          <PopupGroupHeader label="Annet" divider />
          <PopupMenuItem icon={<InfoChipIcon />}>Hva er nytt?</PopupMenuItem>
          <PopupMenuItem icon={<InfoChipIcon />}>Gi tilbakemelding</PopupMenuItem>
          <PopupMenuItem icon={<InfoChipIcon />}>Visningsvalg</PopupMenuItem>
        </PopupMenu>
      </section>

      <section className="page-section">
        <h3>TableFilter — top filter toolbar</h3>
        <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
          Filter button + search + quick filters (Period, ContentSwitcher, Dropdown) + actions.
          Click Filter to toggle active state and reveal the FilterDialog below.
        </p>
        <TableFilter
          filterButton={
            <FilterButton
              active={filterOpen}
              count={filterOpen ? filterCount : undefined}
              onClick={() => setFilterOpen((v) => !v)}
            />
          }
          search={<Input type="search" placeholder="Search" aria-label="Search" />}
          actions={
            <TableFilterIconButton
              icon={<GearIcon />}
              aria-label="View settings"
            />
          }
        >
          <Period value="2024 – 2025" onPrev={() => {}} onNext={() => {}} />
          <ContentSwitcher
            options={stockOptions}
            value={activeStock}
            onChange={setActiveStock}
            aria-label="Stock filter"
          />
          <Dropdown
            placeholder="Price range"
            options={priceRangeOptions}
            width={160}
          />
        </TableFilter>
      </section>

      <section className="page-section">
        <h3>Table — header + rows + cells</h3>
        <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
          Sortable columns (click header), right-aligned numeric column with tabular nums,
          clickable rows with active indicator bar.
        </p>
        <Table
          columns={invoiceColumns}
          rows={sortedInvoices}
          getRowId={(r) => r.id}
          sort={sort}
          onSortChange={setSort}
          activeRowId={activeRowId}
          onRowClick={(r) => setActiveRowId(r.id)}
          aria-label="Invoices"
        />
      </section>

      <section className="page-section">
        <h3>Table — empty state</h3>
        <Table
          columns={invoiceColumns}
          rows={[]}
          emptyMessage="No invoices match your filters."
          aria-label="Empty invoices"
        />
      </section>

      <section className="page-section">
        <h3>Table — selectable rows</h3>
        <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
          Checkbox column with select-all in the header (indeterminate state when some rows are selected).
        </p>
        <Table
          columns={invoiceColumns}
          rows={sortedInvoices}
          getRowId={(r) => r.id}
          selectable
          selectedRowIds={selectedRowIds}
          onSelectionChange={setSelectedRowIds}
          aria-label="Selectable invoices"
        />
      </section>

      <section className="page-section">
        <h3>Table — expandable rows</h3>
        <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
          Chevron column toggles a details panel beneath each row.
        </p>
        <Table
          columns={invoiceColumns}
          rows={sortedInvoices.slice(0, 4)}
          getRowId={(r) => r.id}
          expandable
          expandedRowIds={expandedRowIds}
          onExpandedChange={setExpandedRowIds}
          renderExpanded={(r) => (
            <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 13, color: "#51596a" }}>
              <strong style={{ color: "#2e384d" }}>{r.number} — {r.customer}</strong>
              <span>Invoice details, line items and notes would appear here.</span>
              <span>Due {r.due}. Total {r.amount.toLocaleString("nb-NO", { minimumFractionDigits: 2 })} NOK.</span>
            </div>
          )}
          aria-label="Expandable invoices"
        />
      </section>

      <section className="page-section">
        <h3>Table — row tones (status)</h3>
        <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
          Default, info, success, warning, error and automation backgrounds for row-level status.
        </p>
        <Table
          columns={invoiceColumns}
          rows={sortedInvoices}
          getRowId={(r) => r.id}
          getRowTone={(_, i): TableRowTone => {
            const tones: TableRowTone[] = ["default", "info", "success", "warning", "error", "automation"];
            return tones[i % tones.length];
          }}
          aria-label="Tinted invoices"
        />
      </section>

      <section className="page-section">
        <h3>Table — full featured (select + expand + sort + active)</h3>
        <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
          All row features combined: select-all header, sortable columns, row-level selection,
          expandable details and an active row.
        </p>
        <Table
          columns={invoiceColumns}
          rows={sortedInvoices}
          getRowId={(r) => r.id}
          sort={sort}
          onSortChange={setSort}
          activeRowId={activeRowId}
          onRowClick={(r) => setActiveRowId(r.id)}
          selectable
          selectedRowIds={selectedRowIds}
          onSelectionChange={setSelectedRowIds}
          expandable
          expandedRowIds={expandedRowIds}
          onExpandedChange={setExpandedRowIds}
          renderExpanded={(r) => (
            <div style={{ fontSize: 13, color: "#51596a" }}>
              Details for {r.number} — {r.customer}.
            </div>
          )}
          aria-label="Full-featured invoices"
        />
      </section>

      <section className="page-section">
        <h3>FilterDialog — default (no active filter)</h3>
        <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
          Saved filters (collapsible) + Filter options (Save / Reset) + custom filter body.
        </p>
        <FilterDialog
          savedFilters={savedFilters.map((f) => ({
            ...f,
            active: activeSaved === f.id,
            onSelect: () => setActiveSaved(f.id),
          }))}
          onSaveFilter={() => setFilterCount((c) => c + 1)}
          onResetFilters={() => {
            setActiveSaved(null);
            setFilterCount(0);
          }}
        >
          <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: "#2e384d" }}>
              Select a date range
            </span>
            <div style={{ display: "flex", gap: 8 }}>
              <Input type="date" placeholder="From date" aria-label="From date" />
              <Input type="date" placeholder="To date" aria-label="To date" />
            </div>
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: "#2e384d" }}>Project</span>
            <Dropdown
              placeholder="Value"
              options={[
                { value: "a", label: "Project A" },
                { value: "b", label: "Project B" },
              ]}
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: "#2e384d" }}>Options</span>
            <Dropdown
              placeholder="Placeholder"
              multiple
              options={[
                { value: "o1", label: "Option 1" },
                { value: "o2", label: "Option 2" },
                { value: "o3", label: "Option 3" },
                { value: "o4", label: "Option 4" },
                { value: "o5", label: "Option 5" },
              ]}
            />
          </label>
        </FilterDialog>
      </section>

      <section className="page-section">
        <h3>FilterDialog — with active selections</h3>
        <FilterDialog
          savedFilters={[
            { id: "a1", name: "Filter name", active: true, onSelect: () => {}, onMenuClick: () => {} },
            { id: "a2", name: "Filter name", onSelect: () => {}, onMenuClick: () => {} },
          ]}
          onSaveFilter={() => {}}
          onResetFilters={() => {}}
        >
          <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: "#2e384d" }}>
              Select a date range
            </span>
            <div style={{ display: "flex", gap: 8 }}>
              <Input type="date" placeholder="From date" aria-label="From date" />
              <Input type="date" placeholder="To date" aria-label="To date" />
            </div>
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: "#2e384d" }}>Project</span>
            <Dropdown
              defaultValue="a"
              options={[
                { value: "a", label: "Project A" },
                { value: "b", label: "Project B" },
              ]}
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: "#2e384d" }}>Options</span>
            <Dropdown
              multiple
              placeholder="5 options selected"
              defaultValue={["o1", "o2", "o3", "o4", "o5"]}
              options={[
                { value: "o1", label: "Option 1" },
                { value: "o2", label: "Option 2" },
                { value: "o3", label: "Option 3" },
                { value: "o4", label: "Option 4" },
                { value: "o5", label: "Option 5" },
              ]}
            />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 4 }}>
              <Chip label="Option 1" size="small" variant="removable" onRemove={() => {}} />
              <Chip label="Option 2" size="small" variant="removable" onRemove={() => {}} />
              <Chip label="Option 3" size="small" variant="removable" onRemove={() => {}} />
              <Chip label="Option 4" size="small" variant="removable" onRemove={() => {}} />
              <Chip label="Option 5" size="small" variant="removable" onRemove={() => {}} />
            </div>
          </label>
        </FilterDialog>
      </section>

      <section className="page-section">
        <h3>TableView — view settings panel</h3>
        <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
          Density radios + column toggles. Opened from the table's view-settings button.
        </p>
        <TableView
          defaultDensity="standard"
          columns={columns}
          onColumnToggle={(id, visible) =>
            setColumns((cs) => cs.map((c) => (c.id === id ? { ...c, visible } : c)))
          }
          onReset={() => setColumns(initialColumns)}
        />
      </section>

      <section className="page-section">
        <h3>Row actions — Button / Tooltip</h3>
        <div className="demo-row">
          <Button variant="tertiary" size="small">Edit</Button>
          <Button variant="tertiary" size="small">Duplicate</Button>
          <div className="placeholder" style={{ padding: "8px 12px" }}>Tooltip</div>
        </div>
      </section>
    </>
  );
}

function GearIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M15.9 11.5a6.1 6.1 0 0 0 0-3l1.6-1.1-1.5-2.6-1.8.7a6.1 6.1 0 0 0-2.6-1.5L11.3 2h-2.6l-.3 2a6.1 6.1 0 0 0-2.6 1.5l-1.8-.7-1.5 2.6 1.6 1.1a6.1 6.1 0 0 0 0 3l-1.6 1.1 1.5 2.6 1.8-.7a6.1 6.1 0 0 0 2.6 1.5l.3 2h2.6l.3-2a6.1 6.1 0 0 0 2.6-1.5l1.8.7 1.5-2.6-1.6-1.1Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InfoChipIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="10" cy="6.8" r="0.9" fill="currentColor" />
      <path d="M10 9.3v4.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M6 5l6 5-6 5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
