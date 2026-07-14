import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { CurrentUser } from "../../../../common/decorators/current-user.decorator";
import { JwtAuthGuard } from "../../../../common/guards/jwt-auth.guard";
import { CreateCommentDto } from "../dto/create-comment.dto";
import { UpdateCommentDto } from "../dto/update-comment.dto";
import { ListCommentsQueryDto } from "../dto/list-comments-query.dto";
import { CreateCommentService } from "../../application/services/create-comment.service";
import { GetCommentsService } from "../../application/services/get-comments.service";
import { GetRepliesService } from "../../application/services/get-replies.service";
import { UpdateCommentService } from "../../application/services/update-comment.service";
import { DeleteCommentService } from "../../application/services/delete-comment.service";
import { presentComment } from "../presenters/comment.presenter";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller()
@UseGuards(JwtAuthGuard)
@ApiTags("Comments")
@ApiBearerAuth()
export class CommentsController {
  constructor(
    private readonly createCommentService: CreateCommentService,
    private readonly getCommentsService: GetCommentsService,
    private readonly getRepliesService: GetRepliesService,
    private readonly updateCommentService: UpdateCommentService,
    private readonly deleteCommentService: DeleteCommentService,
  ) {}

  @Post("posts/:postId/comments")
  @ApiOperation({ summary: "Add a comment to a post" })
  async createComment(
    @CurrentUser() user: { sub: string },
    @Param("postId") postId: string,
    @Body() dto: CreateCommentDto,
  ) {
    const result = await this.createCommentService.execute({
      postId,
      authorId: user.sub,
      content: dto.content,
      parentCommentId: dto.parentCommentId,
    });
    return { comment: presentComment(result.comment) };
  }

  @Get("posts/:postId/comments")
  @ApiOperation({ summary: "List post comments" })
  async getComments(
    @CurrentUser() user: { sub: string },
    @Param("postId") postId: string,
    @Query() query: ListCommentsQueryDto,
  ) {
    return this.getCommentsService.execute(user.sub, postId, {
      limit: query.limit ?? 10,
      cursor: query.cursor,
    });
  }

  @Post("comments/:commentId/replies")
  @ApiOperation({ summary: "Reply to a comment" })
  async createReply(
    @CurrentUser() user: { sub: string },
    @Param("commentId") commentId: string,
    @Body() dto: CreateCommentDto,
  ) {
    const result = await this.createCommentService.execute({
      authorId: user.sub,
      content: dto.content,
      parentCommentId: commentId,
    });
    return { comment: presentComment(result.comment) };
  }

  @Get("comments/:commentId/replies")
  @ApiOperation({ summary: "List comment replies" })
  async getReplies(
    @CurrentUser() user: { sub: string },
    @Param("commentId") commentId: string,
    @Query() query: ListCommentsQueryDto,
  ) {
    return this.getRepliesService.execute(user.sub, commentId, {
      limit: query.limit ?? 10,
      cursor: query.cursor,
    });
  }

  @Patch("comments/:commentId")
  @ApiOperation({ summary: "Update a comment" })
  async updateComment(
    @CurrentUser() user: { sub: string },
    @Param("commentId") commentId: string,
    @Body() dto: UpdateCommentDto,
  ) {
    const result = await this.updateCommentService.execute(user.sub, commentId, dto);
    return { comment: presentComment(result.comment) };
  }

  @Delete("comments/:commentId")
  @ApiOperation({ summary: "Delete a comment" })
  async deleteComment(@CurrentUser() user: { sub: string }, @Param("commentId") commentId: string) {
    return this.deleteCommentService.execute(user.sub, commentId);
  }
}
