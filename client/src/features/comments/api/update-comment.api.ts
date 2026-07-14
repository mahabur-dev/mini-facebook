import { apiClient } from "@/lib/api/api-client";
import type { BackendComment } from "../types/comment.types";
import { mapComment } from "./comment.mapper";

export async function updateComment(id: string, content: string) {
  const response = await apiClient<{ comment: BackendComment }>(`/comments/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ content }),
  });
  return mapComment(response.comment);
}
