import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeProps = {
  children?: ReactNode;
  tone?: "neutral" | "success" | "danger" | "info";
};

export function Badge({ children, tone = "neutral" }: BadgeProps) {
  return <span className={cn("_badge", tone !== "neutral" && `_badge_${tone}`)}>{children}</span>;
}
