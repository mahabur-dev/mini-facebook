"use client";

import { useQuery } from "@tanstack/react-query";
import { getPost } from "../api/get-post.api";
import { queryKeys } from "@/constants/query-keys";

export function usePost(id: string) {
  return useQuery({
    queryKey: [...queryKeys.feed.list, "post", id],
    queryFn: () => getPost(id),
  });
}
