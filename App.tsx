import { useState } from "react";
import { DashboardPage } from "./examples/DashboardPage";
import { FormPage } from "./examples/FormPage";
import { ListPage } from "./examples/ListPage";
import { DetailPage } from "./examples/DetailPage";
import { StatesPage } from "./examples/StatesPage";
import { ColorsPage } from "./examples/ColorsPage";
import { IconsPage } from "./examples/IconsPage";
import { IllustrationsPage } from "./examples/IllustrationsPage";

const pages = [
  { id: "colors", label: "Colors", render: () => <ColorsPage /> },
  { id: "icons", label: "Icons", render: () => <IconsPage /> },
  { id: "illustrations", label: "Illustrations", render: () => <IllustrationsPage /> },
  { id: "dashboard", label: "Dashboard", render: () => <DashboardPage /> },
  { id: "form", label: "Form", render: () => <FormPage /> },
  { id: "list", label: "List / Table", render: () => <ListPage /> },
  { id: "detail", label: "Detail + Modal", render: () => <DetailPage /> },
  { id: "states", label: "States", render: () => <StatesPage /> },
] as const;

type PageId = (typeof pages)[number]["id"];

export function App() {
  const [active, setActive] = useState<PageId>("colors");
  const current = pages.find((p) => p.id === active)!;

  return (
    <div className="app-shell">
      <nav className="app-nav">
        <h1 className="app-nav__title">Tripletex Library</h1>
        <ul className="app-nav__list">
          {pages.map((p) => (
            <li key={p.id}>
              <button
                className={
                  "app-nav__item" + (p.id === active ? " app-nav__item--active" : "")
                }
                onClick={() => setActive(p.id)}
              >
                {p.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <main className="app-main">{current.render()}</main>
    </div>
  );
}
