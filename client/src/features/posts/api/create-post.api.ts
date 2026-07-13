import { apiClient } from "@/lib/api/api-client";
import type { FeedPostMock } from "@/features/feed/data/feed-mocks";

export async function createPost(input: Pick<FeedPostMock, "text" | "visibility"> & { mediaId?: string | null }) {
  const result = await apiClient<{
    post: {
      id: string;
      authorId: string;
      content: string | null;
      visibility: "PUBLIC" | "PRIVATE";
      createdAt: string;
      updatedAt: string;
      deletedAt: string | null;
      author: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        status: string;
        lastLoginAt: string | null;
        createdAt: string;
        updatedAt: string;
        deletedAt: string | null;
      };
      media: null;
      statistics: {
        postId: string;
        likeCount: number;
        commentCount: number;
        replyCount: number;
        updatedAt: string;
      } | null;
      isLikedByCurrentUser: boolean;
      isOwner: boolean;
    };
  }>("/posts", {
    method: "POST",
    body: JSON.stringify({
      content: input.text,
      visibility: input.visibility.toUpperCase(),
      mediaId: input.mediaId ?? undefined,
    }),
  });

  return result.post;
}
