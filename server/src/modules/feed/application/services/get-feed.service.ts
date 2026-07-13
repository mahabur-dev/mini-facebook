import { Inject, Injectable } from "@nestjs/common";
import { FEED_REPOSITORY, FeedRepository, FeedCursor } from "../../domain/repository-contracts/feed.repository";
import { FeedResponse } from "../interfaces/feed-response.interface";

@Injectable()
export class GetFeedService {
  constructor(@Inject(FEED_REPOSITORY) private readonly feedRepository: FeedRepository) {}

  async execute(input: { viewerId: string; limit: number; cursor?: FeedCursor | null }): Promise<FeedResponse> {
    const result = await this.feedRepository.findFeed(input);
    return {
      posts: result.items as FeedResponse["posts"],
      nextCursor: result.nextCursor ? this.serializeCursor(result.nextCursor) : null,
    };
  }

  private serializeCursor(cursor: FeedCursor) {
    return Buffer.from(JSON.stringify({ createdAt: cursor.createdAt.toISOString(), id: cursor.id })).toString("base64url");
  }
}
