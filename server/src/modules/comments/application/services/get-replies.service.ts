import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../infrastructure/database/prisma.service";
import { COMMENTS_REPOSITORY, CommentsRepository } from "../../domain/repository-contracts/comments.repository";
import { CommentVisibilityPolicy } from "../../domain/policies/comment-visibility.policy";
import { decodeCursor, encodeCursor } from "../../../../common/pagination/cursor.pagination";
import { presentComment } from "../../presentation/presenters/comment.presenter";

@Injectable()
export class GetRepliesService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(COMMENTS_REPOSITORY) private readonly commentsRepository: CommentsRepository,
    private readonly commentVisibilityPolicy: CommentVisibilityPolicy,
  ) {}

  async execute(viewerId: string, commentId: string, input: { limit: number; cursor?: string | null }) {
    const result = await this.commentsRepository.findRepliesPaginated(commentId, {
      limit: input.limit,
      cursor: decodeCursor(input.cursor),
    });

    const replies = [];
    for (const reply of result.items) {
      await this.commentVisibilityPolicy.canView(viewerId, reply);
      replies.push(presentComment(reply));
    }
    const likedReplyIds = await this.getLikedCommentIds(viewerId, replies.map((reply) => reply.id));

    return {
      replies: replies.map((reply) => ({
        ...reply,
        isLikedByCurrentUser: likedReplyIds.has(reply.id),
      })),
      nextCursor: result.nextCursor ? encodeCursor(result.nextCursor) : null,
    };
  }

  private async getLikedCommentIds(viewerId: string, commentIds: string[]) {
    if (!commentIds.length) {
      return new Set<string>();
    }

    const likes = await this.prisma.commentLike.findMany({
      where: {
        userId: viewerId,
        commentId: { in: commentIds },
      },
      select: { commentId: true },
    });

    return new Set(likes.map((like: { commentId: string }) => like.commentId));
  }
}
