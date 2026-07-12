import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";

export default async function Layout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const session = cookieStore.get("buddy-session")?.value;

  if (!session) {
    redirect("/login");
  }

  return <AppShell>{children}</AppShell>;
}
