import { apiClient } from "@/lib/api/api-client";
import type { ReactionTargetType } from "../types/reaction.types";

export async function removeReaction(targetId: string, targetType: ReactionTargetType) {
  const endpoint = targetType === "post" ? `/posts/${targetId}/like` : `/comments/${targetId}/like`;
  const response = await apiClient<{ liked: boolean }>(endpoint, {
    method: "DELETE",
  });
  return { targetId, targetType, liked: response.liked };
}
