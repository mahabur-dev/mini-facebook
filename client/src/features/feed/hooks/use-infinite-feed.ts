"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getFeed } from "../api/get-feed.api";
import { queryKeys } from "@/constants/query-keys";

export function useInfiniteFeed() {
  return useInfiniteQuery({
    queryKey: queryKeys.feed.list,
    queryFn: ({ pageParam }) => getFeed(pageParam as string | null | undefined),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: null as string | null,
  });
}
