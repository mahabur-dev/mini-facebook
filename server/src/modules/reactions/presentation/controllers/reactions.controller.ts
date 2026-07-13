import { Controller, Delete, Get, Param, Put, Query, UseGuards } from "@nestjs/common";
import { CurrentUser } from "../../../../common/decorators/current-user.decorator";
import { JwtAuthGuard } from "../../../../common/guards/jwt-auth.guard";
import { PostLikeService } from "../../application/services/post-like.service";
import { PostUnlikeService } from "../../application/services/post-unlike.service";
import { GetPostLikersService } from "../../application/services/get-post-likers.service";
import { CommentLikeService } from "../../application/services/comment-like.service";
import { CommentUnlikeService } from "../../application/services/comment-unlike.service";
import { GetCommentLikersService } from "../../application/services/get-comment-likers.service";
import { ListLikersQueryDto } from "../dto/list-likers-query.dto";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller()
@UseGuards(JwtAuthGuard)
@ApiTags("Reactions")
@ApiBearerAuth()
export class ReactionsController {
  constructor(
    private readonly postLikeService: PostLikeService,
    private readonly postUnlikeService: PostUnlikeService,
    private readonly getPostLikersService: GetPostLikersService,
    private readonly commentLikeService: CommentLikeService,
    private readonly commentUnlikeService: CommentUnlikeService,
    private readonly getCommentLikersService: GetCommentLikersService,
  ) {}

  @Put("posts/:postId/like")
  @ApiOperation({ summary: "Like a post" })
  likePost(@CurrentUser() user: { sub: string }, @Param("postId") postId: string) {
    return this.postLikeService.execute(user.sub, postId);
  }

  @Delete("posts/:postId/like")
  @ApiOperation({ summary: "Unlike a post" })
  unlikePost(@CurrentUser() user: { sub: string }, @Param("postId") postId: string) {
    return this.postUnlikeService.execute(user.sub, postId);
  }

  @Get("posts/:postId/likes")
  @ApiOperation({ summary: "List post likers" })
  getPostLikers(@CurrentUser() user: { sub: string }, @Param("postId") postId: string, @Query() query: ListLikersQueryDto) {
    return this.getPostLikersService.execute(user.sub, postId, {
      limit: query.limit ?? 20,
      cursor: query.cursor,
    });
  }

  @Put("comments/:commentId/like")
  @ApiOperation({ summary: "Like a comment" })
  likeComment(@CurrentUser() user: { sub: string }, @Param("commentId") commentId: string) {
    return this.commentLikeService.execute(user.sub, commentId);
  }

  @Delete("comments/:commentId/like")
  @ApiOperation({ summary: "Unlike a comment" })
  unlikeComment(@CurrentUser() user: { sub: string }, @Param("commentId") commentId: string) {
    return this.commentUnlikeService.execute(user.sub, commentId);
  }

  @Get("comments/:commentId/likes")
  @ApiOperation({ summary: "List comment likers" })
  getCommentLikers(
    @CurrentUser() user: { sub: string },
    @Param("commentId") commentId: string,
    @Query() query: ListLikersQueryDto,
  ) {
    return this.getCommentLikersService.execute(user.sub, commentId, {
      limit: query.limit ?? 20,
      cursor: query.cursor,
    });
  }
}
