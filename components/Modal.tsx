import React, { useEffect } from "react";
import { CloseIcon } from "./Icons";
import "./Modal.css";

export type ModalAction = {
  label: string;
  onClick?: () => void;
};

export type ModalVariant = "desktop" | "mobile";

export type ModalProps = {
  isOpen: boolean;
  onClose?: () => void;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
  illustration?: React.ReactNode;
  primaryAction?: ModalAction;
  secondaryAction?: ModalAction;
  variant?: ModalVariant;
  showCloseButton?: boolean;
  className?: string;
};

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  illustration,
  primaryAction,
  secondaryAction,
  variant = "desktop",
  showCloseButton = true,
  className,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isMobile = variant === "mobile";
  const hasIllustration = illustration !== undefined;

  const modalClasses = [
    "tt-modal",
    isMobile && "tt-modal--mobile",
    hasIllustration && !isMobile && "tt-modal--with-illustration",
    className,
  ].filter(Boolean).join(" ");

  const backdropClasses = [
    "tt-modal-backdrop",
    isMobile && "tt-modal-backdrop--mobile",
  ].filter(Boolean).join(" ");

  return (
    <div
      className={backdropClasses}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className={modalClasses}>
        {hasIllustration && (
          <div className="tt-modal__illustration">{illustration}</div>
        )}

        <div className="tt-modal__header">
          <h2 className="tt-modal__title">{title}</h2>
          {subtitle != null && <p className="tt-modal__subtitle">{subtitle}</p>}
        </div>

        {children != null && (
          <div className="tt-modal__content">{children}</div>
        )}

        {(primaryAction || secondaryAction) && (
          <div className="tt-modal__footer">
            {primaryAction && (
              <button
                type="button"
                className="tt-modal__action tt-modal__action--primary"
                onClick={primaryAction.onClick}
              >
                {primaryAction.label}
              </button>
            )}
            {secondaryAction && (
              <button
                type="button"
                className="tt-modal__action tt-modal__action--secondary"
                onClick={secondaryAction.onClick}
              >
                {secondaryAction.label}
              </button>
            )}
          </div>
        )}

        {showCloseButton && (
          <button
            type="button"
            className="tt-modal__close"
            aria-label="Close"
            onClick={() => onClose?.()}
          >
            <CloseIcon />
          </button>
        )}
      </div>
    </div>
  );
}

export function SuccessIllustration() {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <path
        d="M20 78 L44 18 L78 52 Z"
        fill="var(--global-misc-white)"
        stroke="var(--illustration-blue)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M44 18 L56 30" stroke="var(--illustration-blue)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M62 20 Q66 16 72 20" stroke="var(--illustration-green)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M74 28 Q82 28 88 22" stroke="var(--illustration-pink)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M80 40 Q90 44 92 52" stroke="var(--illustration-green-light)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="66" cy="12" r="1.6" fill="var(--illustration-green)" />
      <circle cx="84" cy="10" r="1.6" fill="var(--illustration-pink)" />
      <circle cx="92" cy="32" r="1.6" fill="var(--illustration-blue-mid)" />
      <circle cx="52" cy="8" r="1.6" fill="var(--illustration-purple-light)" />
      <circle cx="30" cy="52" r="1.6" fill="var(--illustration-pink)" />
      <circle cx="34" cy="62" r="1.6" fill="var(--illustration-blue-mid)" />
      <path d="M56 46 L60 50 M64 42 L68 46" stroke="var(--illustration-purple-light)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

