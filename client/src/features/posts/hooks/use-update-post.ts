"use client";

import { useMutation } from "@tanstack/react-query";
import { updatePost } from "../api/update-post.api";

export function useUpdatePost() {
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: { text?: string; visibility?: "Public" | "Private" } }) =>
      updatePost(id, input),
  });
}
