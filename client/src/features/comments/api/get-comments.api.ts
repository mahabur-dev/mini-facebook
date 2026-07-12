import { mockDb } from "@/lib/mock/mock-db";

export async function getComments(postId: string) {
  await new Promise((resolve) => setTimeout(resolve, 80));
  return mockDb.comments.filter((comment) => comment.postId === postId);
}
