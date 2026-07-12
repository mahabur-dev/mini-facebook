import { mockDb } from "@/lib/mock/mock-db";

export async function getReactionUsers(_targetId: string, _targetType: "post" | "comment" | "reply") {
  await new Promise((resolve) => setTimeout(resolve, 60));
  return mockDb.reactions;
}
