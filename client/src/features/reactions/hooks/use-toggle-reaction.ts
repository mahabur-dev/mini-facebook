"use client";

import { useMutation } from "@tanstack/react-query";
import { addReaction } from "../api/add-reaction.api";
import { removeReaction } from "../api/remove-reaction.api";

export function useToggleReaction() {
  return useMutation({
    mutationFn: async ({ targetId, targetType, liked }: { targetId: string; targetType: "post" | "comment" | "reply"; liked: boolean }) =>
      liked ? removeReaction(targetId, targetType) : addReaction(targetId, targetType),
  });
}
