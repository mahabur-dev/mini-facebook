import { Controller, Delete, Get, Param, Put, UseGuards } from "@nestjs/common";
import { CurrentUser } from "../../../../common/decorators/current-user.decorator";
import { JwtAuthGuard } from "../../../../common/guards/jwt-auth.guard";
import { PostLikeService } from "../../application/services/post-like.service";
import { PostUnlikeService } from "../../application/services/post-unlike.service";
import { GetPostLikersService } from "../../application/services/get-post-likers.service";
import { CommentLikeService } from "../../application/services/comment-like.service";
import { CommentUnlikeService } from "../../application/services/comment-unlike.service";
import { GetCommentLikersService } from "../../application/services/get-comment-likers.service";

@Controller()
@UseGuards(JwtAuthGuard)
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
  likePost(@CurrentUser() user: { sub: string }, @Param("postId") postId: string) {
    return this.postLikeService.execute(user.sub, postId);
  }

  @Delete("posts/:postId/like")
  unlikePost(@CurrentUser() user: { sub: string }, @Param("postId") postId: string) {
    return this.postUnlikeService.execute(user.sub, postId);
  }

  @Get("posts/:postId/likes")
  getPostLikers(@CurrentUser() user: { sub: string }, @Param("postId") postId: string) {
    return this.getPostLikersService.execute(user.sub, postId);
  }

  @Put("comments/:commentId/like")
  likeComment(@CurrentUser() user: { sub: string }, @Param("commentId") commentId: string) {
    return this.commentLikeService.execute(user.sub, commentId);
  }

  @Delete("comments/:commentId/like")
  unlikeComment(@CurrentUser() user: { sub: string }, @Param("commentId") commentId: string) {
    return this.commentUnlikeService.execute(user.sub, commentId);
  }

  @Get("comments/:commentId/likes")
  getCommentLikers(@CurrentUser() user: { sub: string }, @Param("commentId") commentId: string) {
    return this.getCommentLikersService.execute(user.sub, commentId);
  }
}
