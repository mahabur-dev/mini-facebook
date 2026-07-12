"use client";

import { useQuery } from "@tanstack/react-query";
import { getComments } from "../api/get-comments.api";
import { queryKeys } from "@/constants/query-keys";

export function useComments(postId: string) {
  return useQuery({
    queryKey: queryKeys.feed.comments(postId),
    queryFn: () => getComments(postId),
  });
}
