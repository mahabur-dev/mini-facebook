import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../infrastructure/database/prisma.service";
import { COMMENTS_REPOSITORY, CommentsRepository } from "../../domain/repository-contracts/comments.repository";
import { CommentOwnershipPolicy } from "../../domain/policies/comment-ownership.policy";
import { CommentNotFoundException } from "../../domain/exceptions/comment-not-found.exception";

@Injectable()
export class UpdateCommentService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(COMMENTS_REPOSITORY) private readonly commentsRepository: CommentsRepository,
    private readonly commentOwnershipPolicy: CommentOwnershipPolicy,
  ) {}

  async execute(userId: string, commentId: string, input: { content: string }) {
    return this.prisma.$transaction(async (tx: any) => {
      const current = await this.commentsRepository.findById(commentId, tx);
      if (!current) {
        throw new CommentNotFoundException();
      }
      this.commentOwnershipPolicy.canManage(userId, current);

      await this.commentsRepository.update(commentId, { content: input.content.trim() }, tx);
      const updated = await this.commentsRepository.findById(commentId, tx);
      if (!updated) {
        throw new CommentNotFoundException();
      }
      return { comment: updated };
    });
  }
}
