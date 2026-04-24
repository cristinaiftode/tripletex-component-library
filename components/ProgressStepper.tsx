import type { ReactNode } from "react";
import "./ProgressStepper.css";

export type ProgressStepperDirection = "vertical" | "horizontal";
export type ProgressStepperType = "bullet" | "number" | "icon";
export type ProgressStepStatus = "completed" | "current" | "upcoming";

export type ProgressStep = {
  label: string;
  description?: string;
  icon?: ReactNode;
};

export type ProgressStepperProps = {
  steps: ProgressStep[];
  currentStep: number;
  direction?: ProgressStepperDirection;
  type?: ProgressStepperType;
  className?: string;
};

function CheckIcon({ size }: { size: number }) {
  return (
    <svg
      className="tt-progress-stepper__check"
      width={size}
      height={size}
      viewBox="0 0 12 9"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 4.5L4 7.5L11 1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getStatus(index: number, currentStep: number): ProgressStepStatus {
  if (index < currentStep) return "completed";
  if (index === currentStep) return "current";
  return "upcoming";
}

function connectorVariant(
  currentStatus: ProgressStepStatus
): "active" | "inactive" {
  return currentStatus === "completed" ? "active" : "inactive";
}

export function ProgressStepper(props: ProgressStepperProps) {
  const {
    steps,
    currentStep,
    direction = "vertical",
    type = "bullet",
    className,
  } = props;

  const rootClasses = [
    "tt-progress-stepper",
    `tt-progress-stepper--${direction}`,
    `tt-progress-stepper--${type}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <ol className={rootClasses}>
      {steps.map((step, i) => {
        const status = getStatus(i, currentStep);
        const isLast = i === steps.length - 1;
        const stepClasses = [
          "tt-progress-stepper__step",
          `tt-progress-stepper__step--${status}`,
          !isLast && `tt-progress-stepper__step--has-connector`,
          !isLast && `tt-progress-stepper__step--connector-${connectorVariant(status)}`,
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <li
            key={i}
            className={stepClasses}
            aria-current={status === "current" ? "step" : undefined}
          >
            <span className="tt-progress-stepper__indicator-col" aria-hidden="true">
              <span className="tt-progress-stepper__indicator">
                {type === "bullet" && status === "completed" && (
                  <CheckIcon size={10} />
                )}
                {type === "number" && (
                  <span className="tt-progress-stepper__number">
                    {status === "completed" ? <CheckIcon size={12} /> : i + 1}
                  </span>
                )}
                {type === "icon" && (
                  <span className="tt-progress-stepper__icon">{step.icon}</span>
                )}
              </span>
              {!isLast && <span className="tt-progress-stepper__connector" />}
            </span>
            <div className="tt-progress-stepper__content">
              <span className="tt-progress-stepper__label">{step.label}</span>
              {step.description && (
                <span className="tt-progress-stepper__description">
                  {step.description}
                </span>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
