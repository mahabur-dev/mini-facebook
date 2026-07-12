"use client";

import { useMutation } from "@tanstack/react-query";
import { updateComment } from "../api/update-comment.api";

export function useUpdateComment() {
  return useMutation({
    mutationFn: ({ id, content }: { id: string; content: string }) => updateComment(id, content),
  });
}
