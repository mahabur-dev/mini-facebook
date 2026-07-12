import { mockDb } from "@/lib/mock/mock-db";

export async function removeReaction(targetId: string, targetType: "post" | "comment" | "reply") {
  await new Promise((resolve) => setTimeout(resolve, 60));
  if (targetType === "post") {
    mockDb.updatePostLikes(targetId, -1);
  }
  return {
    targetId,
    targetType,
    removed: true,
  };
}
