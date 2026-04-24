import React from "react";
import "./Toggle.css";

export type ToggleGroupProps = {
  label?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function ToggleGroup({ label, children, className }: ToggleGroupProps) {
  const classes = ["tt-toggle-group", className].filter(Boolean).join(" ");
  return (
    <div className={classes} role="group">
      {label != null && <div className="tt-toggle-group__label">{label}</div>}
      <div className="tt-toggle-group__items">{children}</div>
    </div>
  );
}
