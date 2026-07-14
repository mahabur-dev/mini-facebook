import { apiClient } from "@/lib/api/api-client";
import { mapFeedPost, type BackendFeedPost } from "@/features/feed/api/get-feed.api";

export async function getPost(id: string) {
  const response = await apiClient<{ post: BackendFeedPost }>(`/posts/${id}`);
  return mapFeedPost(response.post);
}
