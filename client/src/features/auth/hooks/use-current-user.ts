"use client";

import { useQuery } from "@tanstack/react-query";
import { sessionApi } from "../api/session.api";
import { queryKeys } from "@/constants/query-keys";
import { getStoredAccessToken, getStoredUser } from "@/lib/auth/session";

export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.auth.currentUser,
    queryFn: sessionApi,
    enabled: Boolean(getStoredAccessToken()),
    initialData: getStoredUser()
      ? {
          user: getStoredUser()!,
        }
      : undefined,
  });
}
