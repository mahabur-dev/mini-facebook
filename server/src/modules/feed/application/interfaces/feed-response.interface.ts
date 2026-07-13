import { FeedPostEntity } from "../../domain/entities/feed-post.entity";

export interface FeedResponse {
  posts: FeedPostEntity[];
  nextCursor: string | null;
}
