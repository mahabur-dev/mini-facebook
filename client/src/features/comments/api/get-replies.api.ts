import { apiClient } from "@/lib/api/api-client";
import type { BackendComment } from "../types/comment.types";
import { mapComment } from "./comment.mapper";

export async function getReplies(commentId: string) {
  const response = await apiClient<{ replies: BackendComment[]; nextCursor: string | null }>(`/comments/${commentId}/replies?limit=50`);
  return response.replies.map(mapComment);
}
