import { useState } from "react";
import { Button } from "../components/Button";
import { ActionButton, type ActionButtonStatus } from "../components/ActionButton";
import { Alert } from "../components/Alert";
import { Input } from "../components/Input";
import { NumberStepper } from "../components/NumberStepper";
import { Textarea } from "../components/Textarea";
import { Select } from "../components/Select";
import { Period } from "../components/Period";
import { InputGroup } from "../components/InputGroup";
import { Checkbox } from "../components/Checkbox";
import { CheckboxGroup } from "../components/CheckboxGroup";
import { Radio } from "../components/Radio";
import { RadioGroup } from "../components/RadioGroup";
import { Toggle } from "../components/Toggle";
import { ToggleGroup } from "../components/ToggleGroup";
import { Dropdown } from "../components/Dropdown";
import { Calendar } from "../components/Calendar";
import { DateRangePicker } from "../components/DateRangePicker";
import { MonthYearPicker } from "../components/MonthYearPicker";
import { PeriodSelector } from "../components/PeriodSelector";
import { Label } from "../components/Label";

export function FormPage() {
  const [saveStatus, setSaveStatus] = useState<ActionButtonStatus>("default");

  const simulateSave = () => {
    setSaveStatus("loading");
    setTimeout(() => setSaveStatus(Math.random() > 0.3 ? "success" : "error"), 1200);
    setTimeout(() => setSaveStatus("default"), 3000);
  };
  return (
    <>
      <section className="page-section">
        <h2>Form — Create invoice</h2>
        <p style={{ color: "#51596a", marginTop: 0 }}>
          Components on this page: InputField, DateInputField, ComboBox, Checkbox, CheckboxGroup,
          Button, Alert.
        </p>
      </section>

      <section className="page-section">
        <h3>Input — all types</h3>
        <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
          Text, Number, Currency, Percentage, Date, Search, Password — each 160×40 with optional leading/trailing icons.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, 160px)", gap: 12 }}>
          <Input type="text" placeholder="Text" />
          <Input type="number" placeholder="Number" />
          <Input type="currency" placeholder="Currency" />
          <Input type="percentage" placeholder="Percentage" />
          <Input type="date" />
          <Input type="search" placeholder="Search" />
          <Input type="password" placeholder="Password" defaultValue="secret123" />
        </div>

        <h4 style={{ fontSize: 13, fontWeight: 500, color: "#51596a", margin: "16px 0 8px" }}>
          Semantic variants
        </h4>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, 160px)", gap: 12 }}>
          <Input variant="info" defaultValue="Value" />
          <Input variant="automation" defaultValue="Value" />
          <Input variant="warning" defaultValue="Value" />
          <Input variant="error" defaultValue="Value" />
          <Input disabled placeholder="Disabled" />
        </div>
      </section>

      <section className="page-section">
        <h3>NumberStepper</h3>
        <div className="demo-row" style={{ alignItems: "center", flexWrap: "wrap" }}>
          <NumberStepper defaultValue={1} />
          <NumberStepper defaultValue={1} variant="automation" />
          <NumberStepper defaultValue={1} disabled />
        </div>
      </section>

      <section className="page-section">
        <h3>Textarea</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, 240px)", gap: 12 }}>
          <Textarea placeholder="Placeholder" />
          <Textarea defaultValue="Value" />
          <Textarea variant="info" defaultValue="Value" />
          <Textarea variant="automation" defaultValue="Value" />
          <Textarea variant="warning" defaultValue="Value" />
          <Textarea variant="error" defaultValue="Value" />
          <Textarea disabled placeholder="Disabled" />
        </div>
      </section>

      <section className="page-section">
        <h3>Select</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, 160px)", gap: 12 }}>
          <Select
            placeholder="Placeholder"
            options={[
              { value: "a", label: "Option A" },
              { value: "b", label: "Option B" },
            ]}
          />
          <Select
            defaultValue="a"
            options={[
              { value: "a", label: "Value" },
              { value: "b", label: "Other" },
            ]}
          />
          <Select
            variant="info"
            defaultValue="a"
            options={[{ value: "a", label: "Value" }]}
          />
          <Select
            variant="automation"
            defaultValue="a"
            options={[{ value: "a", label: "Value" }]}
          />
          <Select
            variant="warning"
            defaultValue="a"
            options={[{ value: "a", label: "Value" }]}
          />
          <Select
            variant="error"
            defaultValue="a"
            options={[{ value: "a", label: "Value" }]}
          />
          <Select
            disabled
            placeholder="Disabled"
            options={[{ value: "a", label: "A" }]}
          />
        </div>
      </section>

      <section className="page-section">
        <h3>Period — date range navigator</h3>
        <div className="demo-row" style={{ flexWrap: "wrap" }}>
          <Period value="Jan 2025" />
          <Period value="Jan 2025" variant="info" />
          <Period value="Jan 2025" variant="automation" />
          <Period value="Jan 2025" variant="warning" />
          <Period value="Jan 2025" variant="error" />
          <Period value="Jan 2025" disabled />
        </div>
      </section>

      <section className="page-section">
        <h3>InputGroup — Label + field + helper text</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, 240px)", gap: 20 }}>
          {/* Row 1 — Default */}
          <InputGroup label="Label" required>
            <Input placeholder="Placeholder" />
          </InputGroup>
          <InputGroup label="Label" required>
            <Select
              placeholder="Placeholder"
              options={[{ value: "a", label: "Option A" }]}
            />
          </InputGroup>
          <InputGroup label="Label" required>
            <Textarea placeholder="Placeholder" />
          </InputGroup>

          {/* Row 2 — Info */}
          <InputGroup label="Label" required variant="info" helperText="Info message">
            <Input variant="info" defaultValue="Value" />
          </InputGroup>
          <InputGroup label="Label" required variant="info" helperText="Info message">
            <Select
              variant="info"
              defaultValue="a"
              options={[{ value: "a", label: "Value" }]}
            />
          </InputGroup>
          <InputGroup label="Label" required variant="info" helperText="Info message">
            <Textarea variant="info" defaultValue="Value" />
          </InputGroup>

          {/* Row 3 — Warning */}
          <InputGroup label="Label" required variant="warning" helperText="Warning message">
            <Input variant="warning" defaultValue="Value" />
          </InputGroup>
          <InputGroup label="Label" required variant="warning" helperText="Warning message">
            <Select
              variant="warning"
              defaultValue="a"
              options={[{ value: "a", label: "Value" }]}
            />
          </InputGroup>
          <InputGroup label="Label" required variant="warning" helperText="Warning message">
            <Textarea variant="warning" defaultValue="Value" />
          </InputGroup>

          {/* Row 4 — Error */}
          <InputGroup label="Label" required variant="error" helperText="Error message">
            <Input variant="error" defaultValue="Value" />
          </InputGroup>
          <InputGroup label="Label" required variant="error" helperText="Error message">
            <Select
              variant="error"
              defaultValue="a"
              options={[{ value: "a", label: "Value" }]}
            />
          </InputGroup>
          <InputGroup label="Label" required variant="error" helperText="Error message">
            <Textarea variant="error" defaultValue="Value" />
          </InputGroup>
        </div>
      </section>

      <section className="page-section">
        <h3>Checkbox</h3>
        <div className="demo-row" style={{ alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <Checkbox label="Unchecked" />
          <Checkbox label="Checked" defaultChecked />
          <Checkbox label="Indeterminate" indeterminate />
          <Checkbox label="Disabled" disabled />
          <Checkbox label="Checked disabled" defaultChecked disabled />
          <Checkbox label="Indeterminate disabled" indeterminate disabled />
        </div>

        <h4 style={{ fontSize: 13, fontWeight: 500, color: "#51596a", margin: "16px 0 8px" }}>
          CheckboxGroup
        </h4>
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
          <CheckboxGroup label="Vertical">
            <Checkbox label="Option A" defaultChecked />
            <Checkbox label="Option B" />
            <Checkbox label="Option C" />
          </CheckboxGroup>
          <CheckboxGroup label="Horizontal" layoutDirection="horizontal">
            <Checkbox label="Option A" />
            <Checkbox label="Option B" defaultChecked />
            <Checkbox label="Option C" />
          </CheckboxGroup>
        </div>
      </section>

      <section className="page-section">
        <h3>Radio</h3>
        <div className="demo-row" style={{ alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <Radio name="radio-demo-1" label="Unchecked" />
          <Radio name="radio-demo-2" label="Checked" defaultChecked />
          <Radio name="radio-demo-3" label="Disabled" disabled />
          <Radio name="radio-demo-4" label="Checked disabled" defaultChecked disabled />
        </div>

        <h4 style={{ fontSize: 13, fontWeight: 500, color: "#51596a", margin: "16px 0 8px" }}>
          RadioGroup
        </h4>
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
          <RadioGroup
            name="plan-v"
            label="Vertical"
            defaultValue="pro"
            options={[
              { value: "starter", label: "Starter" },
              { value: "pro", label: "Pro" },
              { value: "enterprise", label: "Enterprise" },
            ]}
          />
          <RadioGroup
            name="plan-h"
            label="Horizontal"
            layoutDirection="horizontal"
            defaultValue="starter"
            options={[
              { value: "starter", label: "Starter" },
              { value: "pro", label: "Pro" },
              { value: "enterprise", label: "Enterprise" },
            ]}
          />
        </div>
      </section>

      <section className="page-section">
        <h3>Toggle</h3>
        <div className="demo-row" style={{ alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <Toggle label="Unchecked" />
          <Toggle label="Checked" defaultChecked />
          <Toggle label="Disabled" disabled />
          <Toggle label="Checked disabled" defaultChecked disabled />
        </div>

        <h4 style={{ fontSize: 13, fontWeight: 500, color: "#51596a", margin: "16px 0 8px" }}>
          ToggleGroup
        </h4>
        <ToggleGroup label="Notification preferences">
          <Toggle label="Email updates" defaultChecked />
          <Toggle label="SMS alerts" />
          <Toggle label="Weekly digest" defaultChecked />
        </ToggleGroup>
      </section>

      <section className="page-section">
        <h3>Dropdown — searchable single &amp; multi-select</h3>
        <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
          Click to open. Supports search filtering, multi-select with chips, and an empty-state illustration.
        </p>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>
          <Dropdown
            label="Single select"
            placeholder="Value"
            defaultValue="b"
            options={[
              { value: "a", label: "Option A" },
              { value: "b", label: "Option B" },
              { value: "c", label: "Option C" },
              { value: "d", label: "Option D" },
            ]}
          />
          <Dropdown
            label="Searchable"
            placeholder="Value"
            searchable
            options={[
              { value: "no", label: "Norway" },
              { value: "se", label: "Sweden" },
              { value: "dk", label: "Denmark" },
              { value: "fi", label: "Finland" },
              { value: "is", label: "Iceland" },
            ]}
          />
          <Dropdown
            label="Multi-select"
            placeholder="Value"
            multiple
            defaultValue={["a", "b"]}
            options={[
              { value: "a", label: "Option A" },
              { value: "b", label: "Option B" },
              { value: "c", label: "Option C" },
              { value: "d", label: "Option D" },
            ]}
          />
          <Dropdown
            label="Multi + search"
            placeholder="Value"
            multiple
            searchable
            defaultValue={["a"]}
            options={[
              { value: "a", label: "Option A" },
              { value: "b", label: "Option B" },
              { value: "c", label: "Option C" },
              { value: "d", label: "Option D" },
              { value: "e", label: "Option E" },
            ]}
          />
        </div>
      </section>

      <section className="page-section">
        <h3>Calendar — single date picker</h3>
        <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
          Norwegian weekday labels, ISO week numbers, Sundays highlighted. Today has a border ring; selected is filled.
        </p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Calendar defaultValue={new Date(2024, 4, 15)} defaultMonth={new Date(2024, 4, 1)} />
          <Calendar defaultMonth={new Date(2024, 4, 1)} showWeekNumbers={false} />
        </div>
      </section>

      <section className="page-section">
        <h3>DateRangePicker — two-month range</h3>
        <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
          Click a start date, then an end date. Range fills with secondary action color.
        </p>
        <DateRangePicker
          defaultValue={{ start: new Date(2024, 4, 14), end: new Date(2024, 5, 3) }}
          defaultMonth={new Date(2024, 4, 1)}
        />
      </section>

      <section className="page-section">
        <h3>MonthYearPicker — year + month grid</h3>
        <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
          Default (outlined selection) and large (filled selection) variants.
        </p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-start" }}>
          <MonthYearPicker defaultValue={{ year: 2020, month: 4 }} />
          <MonthYearPicker defaultValue={{ year: 2020, month: 4 }} size="large" filledSelection />
        </div>
      </section>

      <section className="page-section">
        <h3>PeriodSelector — horizontal timeline</h3>
        <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
          Rows for year / tax-term / quarter / month / week. Markers show range edges; quick buttons set common periods.
        </p>
        <PeriodSelector year={2024} />
      </section>

      <section className="page-section">
        <h3>Label — semantic category pills</h3>
        <p style={{ color: "#51596a", marginTop: 0, fontSize: 13 }}>
          24px rounded pill with icon + text. Nine fixed categories.
        </p>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8 }}>
          <Label category="info" />
          <Label category="help" />
          <Label category="tips" />
          <Label category="news" />
          <Label category="get-started" />
          <Label category="automated" />
          <Label category="done" />
          <Label category="attention" />
          <Label category="error" />
        </div>
      </section>

      <section className="page-section">
        <h3>Alert — inline form validation</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Alert variant="warning">
            Invoice number is already in use. <a href="#" className="tt-alert__link">Choose another</a>
          </Alert>
          <Alert variant="info" onClose={() => {}}>
            Tax options will be applied to all line items.
          </Alert>
          <Alert variant="success" onClose={() => {}}>
            Draft saved automatically.
          </Alert>
        </div>
      </section>

      <section className="page-section">
        <h3>Form actions — Button</h3>
        <div className="demo-row">
          <Button variant="primary" htmlType="submit">Save invoice</Button>
          <Button variant="secondary">Save as draft</Button>
          <Button variant="tertiary">Cancel</Button>
        </div>
      </section>

      <section className="page-section">
        <h3>ActionButton — async save flow</h3>
        <p style={{ color: "#51596a", marginTop: 0 }}>
          Click to simulate save: default → loading → success/error → default.
        </p>
        <div className="demo-row">
          <ActionButton variant="primary" status={saveStatus} onClick={simulateSave}>
            Save invoice
          </ActionButton>
        </div>
      </section>
    </>
  );
}
