import { apiClient } from "@/lib/api/api-client";

export async function deletePost(id: string) {
  await apiClient<{ success: boolean }>(`/posts/${id}`, {
    method: "DELETE",
  });
  return { id, deleted: true };
}
