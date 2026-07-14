import { Injectable, Inject } from "@nestjs/common";
import { PrismaService } from "../../../../infrastructure/database/prisma.service";
import { COMMENTS_REPOSITORY, CommentsRepository } from "../../../comments/domain/repository-contracts/comments.repository";
import { CommentLikePolicy } from "../../domain/policies/comment-like.policy";

@Injectable()
export class CommentLikeService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(COMMENTS_REPOSITORY) private readonly commentsRepository: CommentsRepository,
    private readonly commentLikePolicy: CommentLikePolicy,
  ) {}

  async execute(userId: string, commentId: string) {
    return this.prisma.$transaction(async (tx: any) => {
      const comment = await this.commentsRepository.findById(commentId, tx);
      await this.commentLikePolicy.canLike(userId, comment);

      const existing = await tx.commentLike.findUnique({
        where: { commentId_userId: { commentId, userId } },
      });
      if (existing) {
        return { liked: true };
      }

      await tx.commentLike.create({
        data: { commentId, userId },
      });
      await tx.commentStatistics.update({
        where: { commentId },
        data: { likeCount: { increment: 1 } },
      });
      return { liked: true };
    });
  }
}
