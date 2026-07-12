import { mockDb } from "@/lib/mock/mock-db";

export async function createReply(input: { commentId: string; author: string; content: string }) {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const parentComment = mockDb.comments.find((comment) => comment.id === input.commentId);

  return mockDb.addReply({
    id: mockDb.nextReplyId(),
    postId: parentComment?.postId ?? "",
    parentCommentId: input.commentId,
    author: input.author,
    content: input.content,
  });
}
