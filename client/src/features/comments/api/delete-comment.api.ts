import { apiClient } from "@/lib/api/api-client";

export async function deleteComment(id: string) {
  const response = await apiClient<{ success: boolean; deletedCommentCount?: number; deletedReplyCount?: number }>(`/comments/${id}`, {
    method: "DELETE",
  });
  return {
    id,
    deleted: response.success,
    deletedCommentCount: response.deletedCommentCount ?? 0,
    deletedReplyCount: response.deletedReplyCount ?? 0,
  };
}
