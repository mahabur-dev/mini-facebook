"use client";

import { useQuery } from "@tanstack/react-query";
import { getReactionUsers } from "../api/get-reaction-users.api";
import { queryKeys } from "@/constants/query-keys";

export function useReactionUsers(targetId: string, targetType: "post" | "comment" | "reply") {
  return useQuery({
    queryKey: [...queryKeys.feed.list, "reaction-users", targetId, targetType],
    queryFn: () => getReactionUsers(targetId, targetType),
  });
}
