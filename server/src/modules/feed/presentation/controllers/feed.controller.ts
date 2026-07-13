import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../../../common/guards/jwt-auth.guard";
import { CurrentUser } from "../../../../common/decorators/current-user.decorator";
import { GetFeedDto } from "../dto/get-feed.dto";
import { GetFeedService } from "../../application/services/get-feed.service";
import { presentFeedPost } from "../presenters/feed.presenter";
import { decodeCursor } from "../../../../common/pagination/cursor.pagination";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@Controller("feed")
@UseGuards(JwtAuthGuard)
@ApiTags("Feed")
@ApiBearerAuth()
export class FeedController {
  constructor(private readonly getFeedService: GetFeedService) {}

  @Get()
  async getFeed(@CurrentUser() user: { sub: string }, @Query() query: GetFeedDto) {
    const cursor = this.parseCursor(query.cursor);
    const result = await this.getFeedService.execute({
      viewerId: user.sub,
      limit: query.limit ?? 10,
      cursor,
    });

    return {
      posts: result.posts.map((post) => presentFeedPost(post)),
      nextCursor: result.nextCursor,
    };
  }

  private parseCursor(cursor?: string) {
    return decodeCursor(cursor);
  }
}
