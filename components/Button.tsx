import React from "react";
import "./Button.css";

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "icon";
export type ButtonSize = "medium" | "small";

export type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  htmlType?: "button" | "submit" | "reset";
};

export function Button({
  variant = "primary",
  size = "medium",
  icon,
  children,
  htmlType = "button",
  className,
  ...rest
}: ButtonProps) {
  const classes = [
    "tt-button",
    `tt-button--variant-${variant}`,
    `tt-button--size-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={htmlType} className={classes} {...rest}>
      {variant !== "icon" && children != null && <span>{children}</span>}
      {icon && <span className="tt-button__icon">{icon}</span>}
    </button>
  );
}
