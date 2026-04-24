import type { ReactNode } from "react";
import { Topbar } from "./Topbar";
import { Sidebar } from "./Sidebar";
import "./AppShell.css";

export type AppShellProps = {
  topbar?: ReactNode;
  sidebar?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export function AppShell(props: AppShellProps) {
  const { topbar, sidebar, children, className } = props;
  const classes = ["tt-app-shell", className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      <div className="tt-app-shell__topbar">{topbar ?? <Topbar />}</div>
      <div className="tt-app-shell__body">
        <aside className="tt-app-shell__sidebar">{sidebar ?? <Sidebar />}</aside>
        <main className="tt-app-shell__content">
          {children ?? (
            <div className="tt-app-shell__placeholder" role="status">
              <span>❖ Content slot — replace me</span>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
