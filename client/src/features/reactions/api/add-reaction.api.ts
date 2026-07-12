import { mockDb } from "@/lib/mock/mock-db";

export async function addReaction(targetId: string, targetType: "post" | "comment" | "reply") {
  await new Promise((resolve) => setTimeout(resolve, 60));
  if (targetType === "post") {
    mockDb.updatePostLikes(targetId, 1);
  }
  return {
    targetId,
    targetType,
    likedBy: mockDb.reactions[0],
  };
}
