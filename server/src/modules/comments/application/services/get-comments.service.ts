import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../infrastructure/database/prisma.service";
import { COMMENTS_REPOSITORY, CommentsRepository } from "../../domain/repository-contracts/comments.repository";
import { CommentVisibilityPolicy } from "../../domain/policies/comment-visibility.policy";
import { decodeCursor, encodeCursor } from "../../../../common/pagination/cursor.pagination";
import { presentComment } from "../../presentation/presenters/comment.presenter";

@Injectable()
export class GetCommentsService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(COMMENTS_REPOSITORY) private readonly commentsRepository: CommentsRepository,
    private readonly commentVisibilityPolicy: CommentVisibilityPolicy,
  ) {}

  async execute(viewerId: string, postId: string, input: { limit: number; cursor?: string | null }) {
    const result = await this.commentsRepository.findByPostPaginated(postId, {
      limit: input.limit,
      cursor: decodeCursor(input.cursor),
    });

    const comments = [];
    for (const comment of result.items) {
      await this.commentVisibilityPolicy.canView(viewerId, comment);
      comments.push(presentComment(comment));
    }
    const likedCommentIds = await this.getLikedCommentIds(viewerId, comments.map((comment) => comment.id));

    return {
      comments: comments.map((comment) => ({
        ...comment,
        isLikedByCurrentUser: likedCommentIds.has(comment.id),
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
