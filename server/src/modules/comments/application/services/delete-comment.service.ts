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
    return this.prisma.$transaction(async (tx) => {
      const current = await this.commentsRepository.findById(commentId, tx);
      if (!current) {
        throw new CommentNotFoundException();
      }
      this.commentDeletionPolicy.canDelete(userId, current);

      await this.commentsRepository.delete(commentId, new Date(), tx);
      return { success: true };
    });
  }
}
