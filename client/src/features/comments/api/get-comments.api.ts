import { apiClient } from "@/lib/api/api-client";
import type { BackendComment } from "../types/comment.types";
import { mapComment } from "./comment.mapper";
import { COMMENT_PAGE_SIZE } from "../constants/comment.constants";

export async function getComments(postId: string) {
  const response = await apiClient<{ comments: BackendComment[]; nextCursor: string | null }>(`/posts/${postId}/comments?limit=${COMMENT_PAGE_SIZE}`);
  return response.comments.map(mapComment);
}
