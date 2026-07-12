import { mockDb } from "@/lib/mock/mock-db";

export async function createComment(input: { postId: string; author: string; content: string }) {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockDb.addComment({
    id: mockDb.nextCommentId(),
    parentCommentId: null,
    ...input,
  });
}
