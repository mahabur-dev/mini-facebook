"use client";

import { useMutation } from "@tanstack/react-query";
import { createPost } from "../api/create-post.api";

export function useCreatePost() {
  return useMutation({
    mutationFn: createPost,
  });
}
