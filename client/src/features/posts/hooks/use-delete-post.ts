"use client";

import { useMutation } from "@tanstack/react-query";
import { deletePost } from "../api/delete-post.api";

export function useDeletePost() {
  return useMutation({
    mutationFn: deletePost,
  });
}
