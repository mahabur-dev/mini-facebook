import type { ReactNode } from "react";

type TooltipProps = {
  label: string;
  children?: ReactNode;
};

export function Tooltip({ label, children }: TooltipProps) {
  return (
    <span title={label} aria-label={label}>
      {children}
    </span>
  );
}
