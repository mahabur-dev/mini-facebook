"use client";

import { useQuery } from "@tanstack/react-query";
import { sessionApi } from "../api/session.api";
import { queryKeys } from "@/constants/query-keys";

export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.auth.currentUser,
    queryFn: sessionApi,
  });
}
