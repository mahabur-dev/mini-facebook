import type { ReactNode } from "react";

type DropdownProps = {
  open: boolean;
  children?: ReactNode;
};

export function Dropdown({ open, children }: DropdownProps) {
  if (!open) {
    return null;
  }

  return <div className="dropdown-menu show">{children}</div>;
}
