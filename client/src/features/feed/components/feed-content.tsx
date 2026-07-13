import { FeedComposer } from "./feed-composer";
import { FeedEmptyState } from "./feed-empty-state";
import { FeedPostCard } from "./feed-post-card";
import { FeedStoryRail } from "./feed-story-rail";
import type { FeedPostMock } from "../data/feed-mocks";

type FeedContentProps = {
  posts: FeedPostMock[];
};

export function FeedContent({ posts }: FeedContentProps) {
  return (
    <div className="_layout_middle_wrap">
      <div className="_layout_middle_inner">
        <FeedStoryRail />
        <FeedComposer />
        {posts.length === 0 ? <FeedEmptyState /> : null}
        {posts.map((post) => (
          <FeedPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
