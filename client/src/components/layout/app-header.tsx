import type { ReactNode } from "react";

type AppHeaderProps = {
  children?: ReactNode;
};

export function AppHeader({ children }: AppHeaderProps) {
  return <header className="_header_nav">{children}</header>;
}
