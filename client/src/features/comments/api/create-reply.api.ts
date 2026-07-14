import { apiClient } from "@/lib/api/api-client";
import type { BackendComment } from "../types/comment.types";
import { mapComment } from "./comment.mapper";

export async function createReply(input: { commentId: string; content: string }) {
  const response = await apiClient<{ comment: BackendComment }>(`/comments/${input.commentId}/replies`, {
    method: "POST",
    body: JSON.stringify({ content: input.content }),
  });
  return mapComment(response.comment);
}
