"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { routes } from "@/constants/routes";
import { clearClientSession, getStoredAccessToken } from "@/lib/auth/session";
import { useCurrentUser } from "../hooks/use-current-user";

type ProtectedRouteProps = {
  children: ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const currentUser = useCurrentUser();

  useEffect(() => {
    setAccessToken(getStoredAccessToken());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    if (!accessToken || currentUser.isError) {
      clearClientSession();
      router.replace(routes.login);
    }
  }, [accessToken, currentUser.isError, mounted, router]);

  if (!mounted || !accessToken || currentUser.isLoading || currentUser.isError) {
    return null;
  }

  return <>{children}</>;
}
