"use client";

import { useQuery } from "@tanstack/react-query";
import { getReactionUsers } from "../api/get-reaction-users.api";
import { queryKeys } from "@/constants/query-keys";
import type { ReactionTargetType } from "../types/reaction.types";

export function useReactionUsers(targetId: string, targetType: ReactionTargetType, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: [...queryKeys.feed.list, "reaction-users", targetId, targetType],
    queryFn: () => getReactionUsers(targetId, targetType),
    enabled: options?.enabled ?? true,
  });
}
