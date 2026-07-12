import type { FeedPostMock } from "@/features/feed/data/feed-mocks";
import { mockDb } from "@/lib/mock/mock-db";

export async function createPost(input: Pick<FeedPostMock, "author" | "text" | "media" | "visibility">) {
  await new Promise((resolve) => setTimeout(resolve, 120));
  const post: FeedPostMock = {
    id: mockDb.nextPostId(),
    avatar: "/assets/images/post_img.png",
    timeLabel: "Just now",
    likes: 0,
    comments: 0,
    shares: 0,
    ...input,
  };

  return mockDb.addPost(post);
}
