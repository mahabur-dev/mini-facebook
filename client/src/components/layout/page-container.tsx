import type { ReactNode } from "react";

export function PageContainer({ children }: { children?: ReactNode }) {
  return <main className="container _custom_container">{children}</main>;
}
