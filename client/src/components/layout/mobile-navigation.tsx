import type { ReactNode } from "react";

type MobileNavigationProps = {
  children?: ReactNode;
};

export function MobileNavigation({ children }: MobileNavigationProps) {
  return <nav>{children}</nav>;
}
