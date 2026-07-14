"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/query-keys";
import { getReplies } from "../api/get-replies.api";

export function useReplies(commentId: string, enabled: boolean) {
  return useQuery({
    queryKey: queryKeys.feed.replies(commentId),
    queryFn: () => getReplies(commentId),
    enabled,
  });
}
