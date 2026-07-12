"use client";

import { useMutation } from "@tanstack/react-query";
import { deleteComment } from "../api/delete-comment.api";

export function useDeleteComment() {
  return useMutation({
    mutationFn: deleteComment,
  });
}
