"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { sessionApi } from "../api/session.api";
import { queryKeys } from "@/constants/query-keys";
import { getStoredAccessToken, getStoredUser } from "@/lib/auth/session";

export function useCurrentUser() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [initialUser, setInitialUser] = useState<ReturnType<typeof getStoredUser>>(null);

  useEffect(() => {
    setAccessToken(getStoredAccessToken());
    setInitialUser(getStoredUser());
  }, []);

  return useQuery({
    queryKey: queryKeys.auth.currentUser,
    queryFn: sessionApi,
    enabled: Boolean(accessToken),
    initialData: initialUser
      ? {
          user: initialUser,
        }
      : undefined,
  });
}
