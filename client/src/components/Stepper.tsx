import { ReactNode, Children, isValidElement, cloneElement } from "react";
import "./Stepper.css";

interface StepProps {
  title: string;
  children: ReactNode;
  stepNumber?: number;
  isLast?: boolean;
}

export function Step({ title, children, stepNumber = 1, isLast = false }: StepProps) {
  return (
    <div className="step" data-testid={`step-${stepNumber}`}>
      <div className="step-indicator">
        <div className="step-number" data-testid={`step-number-${stepNumber}`}>
          {stepNumber}
        </div>
        {!isLast && <div className="step-connector" />}
      </div>
      <div className="step-content">
        <h3 className="step-title" data-testid={`step-title-${stepNumber}`}>
          {title}
        </h3>
        <p className="step-text" data-testid={`step-text-${stepNumber}`}>
          {children}
        </p>
      </div>
    </div>
  );
}

interface StepperProps {
  children: ReactNode;
}

export function Stepper({ children }: StepperProps) {
  const steps = Children.toArray(children).filter(isValidElement);
  const totalSteps = steps.length;

  return (
    <div className="stepper" data-testid="stepper">
      {steps.map((step, index) => {
        if (isValidElement<StepProps>(step)) {
          return cloneElement(step, {
            stepNumber: index + 1,
            isLast: index === totalSteps - 1,
          });
        }
        return step;
      })}
    </div>
  );
}
