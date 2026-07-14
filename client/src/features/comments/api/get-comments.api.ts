import { apiClient } from "@/lib/api/api-client";
import type { BackendComment } from "../types/comment.types";
import { mapComment } from "./comment.mapper";

export async function getComments(postId: string) {
  const response = await apiClient<{ comments: BackendComment[]; nextCursor: string | null }>(`/posts/${postId}/comments?limit=50`);
  return response.comments.map(mapComment);
}
