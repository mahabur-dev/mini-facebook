import type { ReactNode } from "react";
import { ProtectedRoute } from "@/features/auth/components/protected-route";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
