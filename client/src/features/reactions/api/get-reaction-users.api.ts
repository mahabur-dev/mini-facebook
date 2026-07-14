import { apiClient } from "@/lib/api/api-client";
import type { Reaction, ReactionTargetType } from "../types/reaction.types";

type BackendReactionUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImageUrl?: string | null;
};

export async function getReactionUsers(targetId: string, targetType: ReactionTargetType): Promise<Reaction[]> {
  const endpoint = targetType === "post" ? `/posts/${targetId}/likes?limit=50` : `/comments/${targetId}/likes?limit=50`;
  const response = await apiClient<{ users: BackendReactionUser[]; nextCursor: string | null }>(endpoint);

  return response.users.map((user) => ({
    id: user.id,
    name: `${user.firstName} ${user.lastName}`.trim(),
    email: user.email,
    profileImageUrl: user.profileImageUrl ?? null,
  }));
}
