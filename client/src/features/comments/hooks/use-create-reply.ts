"use client";

import { useMutation } from "@tanstack/react-query";
import { createReply } from "../api/create-reply.api";

export function useCreateReply() {
  return useMutation({
    mutationFn: createReply,
  });
}
