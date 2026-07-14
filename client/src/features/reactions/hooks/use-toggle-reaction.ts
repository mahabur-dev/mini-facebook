"use client";

import { useMutation } from "@tanstack/react-query";
import { addReaction } from "../api/add-reaction.api";
import { removeReaction } from "../api/remove-reaction.api";
import type { ReactionTargetType } from "../types/reaction.types";

export function useToggleReaction() {
  return useMutation({
    mutationFn: async ({ targetId, targetType, liked }: { targetId: string; targetType: ReactionTargetType; liked: boolean }) =>
      liked ? removeReaction(targetId, targetType) : addReaction(targetId, targetType),
  });
}
