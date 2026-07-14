import { apiClient } from "@/lib/api/api-client";
import type { BackendComment } from "../types/comment.types";
import { mapComment } from "./comment.mapper";
import { COMMENT_PAGE_SIZE } from "../constants/comment.constants";

export async function getReplies(commentId: string) {
  const response = await apiClient<{ replies: BackendComment[]; nextCursor: string | null }>(`/comments/${commentId}/replies?limit=${COMMENT_PAGE_SIZE}`);
  return response.replies.map(mapComment);
}
