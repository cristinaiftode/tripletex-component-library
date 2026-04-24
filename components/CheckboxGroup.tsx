import React from "react";
import "./Checkbox.css";

export type CheckboxGroupProps = {
  label?: React.ReactNode;
  layoutDirection?: "vertical" | "horizontal";
  children: React.ReactNode;
  className?: string;
};

export function CheckboxGroup({
  label,
  layoutDirection = "vertical",
  children,
  className,
}: CheckboxGroupProps) {
  const classes = [
    "tt-checkbox-group",
    `tt-checkbox-group--${layoutDirection}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} role="group">
      {label != null && <div className="tt-checkbox-group__label">{label}</div>}
      <div className="tt-checkbox-group__items">{children}</div>
    </div>
  );
}
