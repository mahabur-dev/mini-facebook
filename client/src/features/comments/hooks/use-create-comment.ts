"use client";

import { useMutation } from "@tanstack/react-query";
import { createComment } from "../api/create-comment.api";

export function useCreateComment() {
  return useMutation({
    mutationFn: createComment,
  });
}
