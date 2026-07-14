import { apiClient } from "@/lib/api/api-client";

export async function deleteComment(id: string) {
  await apiClient<{ success: boolean }>(`/comments/${id}`, {
    method: "DELETE",
  });
  return { id, deleted: true };
}
