import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CurrentUser } from "../../../../common/decorators/current-user.decorator";
import { JwtAuthGuard } from "../../../../common/guards/jwt-auth.guard";
import { CreateCommentDto } from "../dto/create-comment.dto";
import { UpdateCommentDto } from "../dto/update-comment.dto";
import { CreateCommentService } from "../../application/services/create-comment.service";
import { GetCommentsService } from "../../application/services/get-comments.service";
import { GetRepliesService } from "../../application/services/get-replies.service";
import { UpdateCommentService } from "../../application/services/update-comment.service";
import { DeleteCommentService } from "../../application/services/delete-comment.service";

@Controller()
@UseGuards(JwtAuthGuard)
export class CommentsController {
  constructor(
    private readonly createCommentService: CreateCommentService,
    private readonly getCommentsService: GetCommentsService,
    private readonly getRepliesService: GetRepliesService,
    private readonly updateCommentService: UpdateCommentService,
    private readonly deleteCommentService: DeleteCommentService,
  ) {}

  @Post("posts/:postId/comments")
  async createComment(
    @CurrentUser() user: { sub: string },
    @Param("postId") postId: string,
    @Body() dto: CreateCommentDto,
  ) {
    return this.createCommentService.execute({
      postId,
      authorId: user.sub,
      content: dto.content,
      parentCommentId: dto.parentCommentId,
    });
  }

  @Get("posts/:postId/comments")
  async getComments(@CurrentUser() user: { sub: string }, @Param("postId") postId: string) {
    return this.getCommentsService.execute(user.sub, postId);
  }

  @Post("comments/:commentId/replies")
  async createReply(
    @CurrentUser() user: { sub: string },
    @Param("commentId") commentId: string,
    @Body() dto: CreateCommentDto,
  ) {
    return this.createCommentService.execute({
      authorId: user.sub,
      content: dto.content,
      parentCommentId: commentId,
    });
  }

  @Get("comments/:commentId/replies")
  async getReplies(@CurrentUser() user: { sub: string }, @Param("commentId") commentId: string) {
    return this.getRepliesService.execute(user.sub, commentId);
  }

  @Patch("comments/:commentId")
  async updateComment(
    @CurrentUser() user: { sub: string },
    @Param("commentId") commentId: string,
    @Body() dto: UpdateCommentDto,
  ) {
    return this.updateCommentService.execute(user.sub, commentId, dto);
  }

  @Delete("comments/:commentId")
  async deleteComment(@CurrentUser() user: { sub: string }, @Param("commentId") commentId: string) {
    return this.deleteCommentService.execute(user.sub, commentId);
  }
}
