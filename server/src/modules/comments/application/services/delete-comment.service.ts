import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../infrastructure/database/prisma.service";
import { COMMENTS_REPOSITORY, CommentsRepository } from "../../domain/repository-contracts/comments.repository";
import { CommentDeletionPolicy } from "../../domain/policies/comment-deletion.policy";
import { CommentNotFoundException } from "../../domain/exceptions/comment-not-found.exception";

@Injectable()
export class DeleteCommentService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(COMMENTS_REPOSITORY) private readonly commentsRepository: CommentsRepository,
    private readonly commentDeletionPolicy: CommentDeletionPolicy,
  ) {}

  async execute(userId: string, commentId: string) {
    return this.prisma.$transaction(async (tx: any) => {
      const current = await this.commentsRepository.findById(commentId, tx);
      if (!current) {
        throw new CommentNotFoundException();
      }
      this.commentDeletionPolicy.canDelete(userId, current);

      const deletedAt = new Date();
      if (current.parentCommentId) {
        await this.commentsRepository.delete(commentId, deletedAt, tx);
        await tx.commentStatistics.update({
          where: { commentId: current.parentCommentId },
          data: { replyCount: { decrement: 1 } },
        });
        await tx.postStatistics.update({
          where: { postId: current.postId },
          data: { replyCount: { decrement: 1 } },
        });
        return { success: true, deletedCommentCount: 0, deletedReplyCount: 1 };
      } else {
        const { replyCount } = await this.commentsRepository.deleteThread(commentId, deletedAt, tx);
        await tx.postStatistics.update({
          where: { postId: current.postId },
          data: {
            commentCount: { decrement: 1 },
            ...(replyCount > 0 ? { replyCount: { decrement: replyCount } } : {}),
          },
        });
        return { success: true, deletedCommentCount: 1, deletedReplyCount: replyCount };
      }
    });
  }
}
