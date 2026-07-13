"use client";

import { useMutation } from "@tanstack/react-query";
import { updatePost, type UpdatePostInput } from "../api/update-post.api";

export function useUpdatePost() {
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdatePostInput }) => updatePost(id, input),
  });
}
