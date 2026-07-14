import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../infrastructure/database/prisma.service";
import { POSTS_REPOSITORY, PostsRepository } from "../../../posts/domain/repository-contracts/posts.repository";
import { PostVisibilityPolicy } from "../../../posts/domain/policies/post-visibility.policy";
import { COMMENTS_REPOSITORY, CommentsRepository } from "../../domain/repository-contracts/comments.repository";
import { CommentCreationPolicy } from "../../domain/policies/comment-creation.policy";
import { ReplyCreationPolicy } from "../../domain/policies/reply-creation.policy";
import { CommentVisibilityPolicy } from "../../domain/policies/comment-visibility.policy";
import { CommentResponse } from "../interfaces/comment-response.interface";
import { CommentNotFoundException } from "../../domain/exceptions/comment-not-found.exception";
import { CommentEntity } from "../../domain/entities/comment.entity";

@Injectable()
export class CreateCommentService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(POSTS_REPOSITORY) private readonly postsRepository: PostsRepository,
    @Inject(COMMENTS_REPOSITORY) private readonly commentsRepository: CommentsRepository,
    private readonly postVisibilityPolicy: PostVisibilityPolicy,
    private readonly commentCreationPolicy: CommentCreationPolicy,
    private readonly replyCreationPolicy: ReplyCreationPolicy,
    private readonly commentVisibilityPolicy: CommentVisibilityPolicy,
  ) {}

  async execute(input: { postId?: string; authorId: string; content: string; parentCommentId?: string | null }): Promise<CommentResponse> {
    this.commentCreationPolicy.canCreate(input.content);

    return this.prisma.$transaction(async (tx: any) => {
      let postId = input.postId?.trim() || null;
      let parentCommentId: string | null = input.parentCommentId?.trim() || null;
      let parentComment: CommentEntity | null = null;

      if (parentCommentId) {
        const replyTarget = await this.commentsRepository.findById(parentCommentId, tx);
        if (!replyTarget) {
          throw new CommentNotFoundException();
        }
        this.replyCreationPolicy.canReply(replyTarget);
        parentCommentId = replyTarget.parentCommentId ?? replyTarget.id;
        parentComment = replyTarget.parentCommentId ? await this.commentsRepository.findById(parentCommentId, tx) : replyTarget;
        if (!parentComment) {
          throw new CommentNotFoundException();
        }
        postId = parentComment.postId;
      }

      if (!postId) {
        throw new CommentNotFoundException();
      }

      const post = await this.postsRepository.findById(postId, tx);
      this.postVisibilityPolicy.canView(input.authorId, post);

      const comment = await this.commentsRepository.create(
        {
          postId,
          authorId: input.authorId,
          parentCommentId,
          content: input.content.trim(),
        },
        tx,
      );

      await tx.commentStatistics.create({
        data: {
          commentId: comment.id,
          likeCount: 0,
          replyCount: 0,
        },
      });

      if (parentCommentId) {
        await tx.commentStatistics.update({
          where: { commentId: parentCommentId },
          data: { replyCount: { increment: 1 } },
        });
        await tx.postStatistics.update({
          where: { postId },
          data: { replyCount: { increment: 1 } },
        });
      } else {
        await tx.postStatistics.update({
          where: { postId },
          data: { commentCount: { increment: 1 } },
        });
      }

      const created = await this.commentsRepository.findById(comment.id, tx);
      return { comment: created as any };
    });
  }
}
