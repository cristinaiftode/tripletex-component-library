import { useState } from "react";
import { Button } from "../components/Button";
import { MessageButton } from "../components/MessageButton";
import { CommentButton } from "../components/CommentButton";
import { CommentView } from "../components/CommentView";
import { ContentSwitcher } from "../components/ContentSwitcher";
import { MultiContentSwitcher } from "../components/MultiContentSwitcher";
import { Modal, SuccessIllustration } from "../components/Modal";
import { Input } from "../components/Input";
import { Popover, PopoverOpener } from "../components/Popover";

const sampleComments = [
  {
    id: "c1",
    authorName: "Henning Truslew Gulliksen",
    authorAvatar: { src: "https://i.pravatar.cc/80?img=15" },
    timestamp: "16 Jan. 2025 at 10:15",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "c2",
    authorName: "Kha Nguyen Do",
    authorAvatar: { initials: "KN" },
    timestamp: "07:42",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, sapien ut vulputate posuere.",
  },
  {
    id: "c3",
    authorName: "Henning Truslew Gulliksen",
    authorAvatar: { src: "https://i.pravatar.cc/80?img=15" },
    timestamp: "10:15",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, sapien ut vulputate posuere.",
    unread: true,
  },
];

export function DetailPage() {
  const [tab, setTab] = useState("details");
  const [filters, setFilters] = useState<string[]>(["unpaid"]);
  const [modalForm, setModalForm] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalMobile, setModalMobile] = useState(false);
  const [modalMobileIll, setModalMobileIll] = useState(false);
  return (
    <>
      <section className="page-section">
        <h2>Detail + Modal — Invoice detail</h2>
        <p style={{ color: "#51596a", marginTop: 0 }}>
          Components on this page: Modal, Tabs, MessageButton, CommentButton, CommentView, Button,
          Alert, Popover.
        </p>
      </section>

      <section className="page-section">
        <h3>MessageButton</h3>
        <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
          Notification for unread in-app chat messages.
        </p>
        <div className="demo-row" style={{ alignItems: "center" }}>
          <MessageButton count={0} aria-label="No new messages" />
          <MessageButton count={1} aria-label="1 new message" />
          <MessageButton count={2} aria-label="2 new messages" />
        </div>
      </section>

      <section className="page-section">
        <h3>CommentButton</h3>
        <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
          Number of comments with read/unread state — blue when unread, dark when read.
        </p>
        <h4 style={{ fontSize: 13, fontWeight: 500, color: "#51596a", margin: "8px 0" }}>
          Unread
        </h4>
        <div className="demo-row" style={{ alignItems: "center" }}>
          <CommentButton count={0} />
          <CommentButton count={1} />
          <CommentButton count={2} />
          <CommentButton count={12} />
        </div>
        <h4 style={{ fontSize: 13, fontWeight: 500, color: "#51596a", margin: "16px 0 8px" }}>
          Read
        </h4>
        <div className="demo-row" style={{ alignItems: "center" }}>
          <CommentButton count={1} read />
          <CommentButton count={2} read />
          <CommentButton count={12} read />
        </div>
      </section>

      <section className="page-section">
        <h3>CommentView — all states</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          <CommentView state="empty" onClose={() => {}} />
          <CommentView state="comments" comments={sampleComments} onClose={() => {}} />
          <CommentView state="loading" onClose={() => {}} />
          <CommentView state="locked" comments={sampleComments} onClose={() => {}} />
        </div>
      </section>

      <section className="page-section">
        <h3>ContentSwitcher — segmented single-select</h3>
        <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
          Shared borders between segments; selected segment uses the active blue border.
        </p>

        <h4 style={{ fontSize: 13, fontWeight: 500, color: "#51596a", margin: "8px 0" }}>
          Controlled — detail tabs
        </h4>
        <ContentSwitcher
          value={tab}
          onChange={setTab}
          options={[
            { value: "details", label: "Details" },
            { value: "lines", label: "Lines" },
            { value: "history", label: "History" },
          ]}
          aria-label="Detail tabs"
        />

        <h4 style={{ fontSize: 13, fontWeight: 500, color: "#51596a", margin: "16px 0 8px" }}>
          Option counts — 2, 3, 4, 5
        </h4>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
          <ContentSwitcher
            defaultValue="a"
            options={[
              { value: "a", label: "Label" },
              { value: "b", label: "Label" },
            ]}
          />
          <ContentSwitcher
            defaultValue="a"
            options={[
              { value: "a", label: "Label" },
              { value: "b", label: "Label" },
              { value: "c", label: "Label" },
            ]}
          />
          <ContentSwitcher
            defaultValue="a"
            options={[
              { value: "a", label: "Label" },
              { value: "b", label: "Label" },
              { value: "c", label: "Label" },
              { value: "d", label: "Label" },
            ]}
          />
          <ContentSwitcher
            defaultValue="a"
            options={[
              { value: "a", label: "Label" },
              { value: "b", label: "Label" },
              { value: "c", label: "Label" },
              { value: "d", label: "Label" },
              { value: "e", label: "Label" },
            ]}
          />
        </div>

        <h4 style={{ fontSize: 13, fontWeight: 500, color: "#51596a", margin: "16px 0 8px" }}>
          With disabled segment
        </h4>
        <ContentSwitcher
          defaultValue="a"
          options={[
            { value: "a", label: "Label" },
            { value: "b", label: "Label", disabled: true },
            { value: "c", label: "Label" },
          ]}
        />
      </section>

      <section className="page-section">
        <h3>MultiContentSwitcher — multi-select filters</h3>
        <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
          Independent pills with a 4px gap; any combination can be selected.
        </p>

        <MultiContentSwitcher
          value={filters}
          onChange={setFilters}
          options={[
            { value: "unpaid", label: "Unpaid" },
            { value: "overdue", label: "Overdue" },
            { value: "paid", label: "Paid" },
            { value: "draft", label: "Draft" },
          ]}
          aria-label="Invoice filters"
        />

        <h4 style={{ fontSize: 13, fontWeight: 500, color: "#51596a", margin: "16px 0 8px" }}>
          Option counts — 2, 3, 4, 5
        </h4>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
          <MultiContentSwitcher
            defaultValue={["a"]}
            options={[
              { value: "a", label: "Label" },
              { value: "b", label: "Label" },
            ]}
          />
          <MultiContentSwitcher
            defaultValue={["a", "c"]}
            options={[
              { value: "a", label: "Label" },
              { value: "b", label: "Label" },
              { value: "c", label: "Label" },
            ]}
          />
          <MultiContentSwitcher
            defaultValue={["a", "c"]}
            options={[
              { value: "a", label: "Label" },
              { value: "b", label: "Label" },
              { value: "c", label: "Label" },
              { value: "d", label: "Label" },
            ]}
          />
          <MultiContentSwitcher
            defaultValue={["a", "c"]}
            options={[
              { value: "a", label: "Label" },
              { value: "b", label: "Label" },
              { value: "c", label: "Label" },
              { value: "d", label: "Label" },
              { value: "e", label: "Label" },
            ]}
          />
        </div>
      </section>

      <section className="page-section">
        <h3>Modal — four variants</h3>
        <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
          Desktop form, desktop with illustration, mobile bottom sheet (with + without illustration).
        </p>
        <div className="demo-row">
          <Button variant="primary" onClick={() => setModalForm(true)}>Open form modal</Button>
          <Button variant="secondary" onClick={() => setModalSuccess(true)}>Open success modal</Button>
          <Button variant="secondary" onClick={() => setModalMobile(true)}>Open mobile modal</Button>
          <Button variant="secondary" onClick={() => setModalMobileIll(true)}>Open mobile + illustration</Button>
        </div>
      </section>

      <Modal
        isOpen={modalForm}
        onClose={() => setModalForm(false)}
        title="Automatiseringsnivå"
        subtitle="Vælg et niveau for denne integration"
        primaryAction={{ label: "Lagre", onClick: () => setModalForm(false) }}
        secondaryAction={{ label: "Avbryt", onClick: () => setModalForm(false) }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 420 }}>
          <Input label="Customer name *" defaultValue="Firm ES" />
          <Input label="Organisasjonsnummer *" defaultValue="1000000000" />
          <Input label="Postnummer" defaultValue="1604" />
        </div>
      </Modal>

      <Modal
        isOpen={modalSuccess}
        onClose={() => setModalSuccess(false)}
        illustration={<SuccessIllustration />}
        title="Modal title"
        subtitle="Modal subtitle"
        primaryAction={{ label: "Primary", onClick: () => setModalSuccess(false) }}
        secondaryAction={{ label: "Secondary", onClick: () => setModalSuccess(false) }}
      >
        <div className="placeholder" style={{ minHeight: 120, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#f7f8fc", border: "1px dashed #d5d7db", borderRadius: 4 }}>
          ❖ Content slot — replace me
        </div>
      </Modal>

      <Modal
        isOpen={modalMobile}
        onClose={() => setModalMobile(false)}
        variant="mobile"
        title="Modal Mobile title"
        subtitle="Modal subtitle"
        primaryAction={{ label: "Primary", onClick: () => setModalMobile(false) }}
        secondaryAction={{ label: "Secondary", onClick: () => setModalMobile(false) }}
      >
        <div className="placeholder" style={{ minHeight: 120, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#f7f8fc", border: "1px dashed #d5d7db", borderRadius: 4 }}>
          ❖ Content slot — replace me
        </div>
      </Modal>

      <Modal
        isOpen={modalMobileIll}
        onClose={() => setModalMobileIll(false)}
        variant="mobile"
        illustration={<SuccessIllustration />}
        title="Modal Mobile title"
        subtitle="Modal subtitle"
        primaryAction={{ label: "Primary", onClick: () => setModalMobileIll(false) }}
        secondaryAction={{ label: "Secondary", onClick: () => setModalMobileIll(false) }}
      >
        <div className="placeholder" style={{ minHeight: 120, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#f7f8fc", border: "1px dashed #d5d7db", borderRadius: 4 }}>
          ❖ Content slot — replace me
        </div>
      </Modal>

      <section className="page-section">
        <h3>Popover — arrow positions (desktop)</h3>
        <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
          Seven arrow positions: bottom/top (centered) and bottom-left/bottom-right/top-left/top-right,
          plus none (floating).
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 32,
          padding: "24px 16px",
          alignItems: "start",
        }}>
          <Popover
            arrow="bottom"
            title="Popover"
            body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            link={{ label: "Vis mer" }}
          />
          <Popover
            arrow="top"
            title="Popover"
            body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            link={{ label: "Vis mer" }}
          />
          <Popover
            arrow="bottom-left"
            title="Popover"
            body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            link={{ label: "Vis mer" }}
          />
          <Popover
            arrow="bottom-right"
            title="Popover"
            body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            link={{ label: "Vis mer" }}
          />
          <Popover
            arrow="top-left"
            title="Popover"
            body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            link={{ label: "Vis mer" }}
          />
          <Popover
            arrow="top-right"
            title="Popover"
            body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            link={{ label: "Vis mer" }}
          />
        </div>

        <h4 style={{ fontSize: 13, fontWeight: 500, color: "#51596a", margin: "16px 0 8px" }}>
          With label chip + close button
        </h4>
        <Popover
          arrow="bottom"
          label={{ text: "Info", icon: <InfoIcon /> }}
          title="Popover"
          body="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          link={{ label: "Vis mer" }}
          onClose={() => {}}
        />

        <h4 style={{ fontSize: 13, fontWeight: 500, color: "#51596a", margin: "16px 0 8px" }}>
          Mobile variant (bottom sheet)
        </h4>
        <Popover
          variant="mobile"
          title="Popover"
          body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          link={{ label: "Vis mer" }}
          onClose={() => {}}
        />
      </section>

      <section className="page-section">
        <h3>PopoverOpener — sizes × weights</h3>
        <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
          Inline text + info icon used to trigger a popover. 4 sizes × 2 weights.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
          <PopoverOpener size="base" weight="regular">Popover Opener</PopoverOpener>
          <PopoverOpener size="base" weight="medium">Popover Opener</PopoverOpener>
          <PopoverOpener size="lg" weight="regular">Popover Opener</PopoverOpener>
          <PopoverOpener size="lg" weight="medium">Popover Opener</PopoverOpener>
          <PopoverOpener size="xl" weight="regular">Popover Opener</PopoverOpener>
          <PopoverOpener size="xl" weight="medium">Popover Opener</PopoverOpener>
          <PopoverOpener size="2xl" weight="regular">Popover Opener</PopoverOpener>
          <PopoverOpener size="2xl" weight="medium">Popover Opener</PopoverOpener>
        </div>
      </section>
    </>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="10" cy="6.8" r="0.9" fill="currentColor" />
      <path d="M10 9.3v4.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
