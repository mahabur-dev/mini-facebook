export type FeedCursor = {
  createdAt: Date;
  id: string;
};

export interface FeedQueryInput {
  viewerId: string;
  limit: number;
  cursor?: FeedCursor | null;
}

export interface FeedRepository {
  findFeed(input: FeedQueryInput): Promise<{
    items: unknown[];
    nextCursor: FeedCursor | null;
  }>;
}

export const FEED_REPOSITORY = Symbol("FEED_REPOSITORY");
