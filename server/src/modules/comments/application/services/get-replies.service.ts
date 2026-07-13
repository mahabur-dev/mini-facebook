import { Inject, Injectable } from "@nestjs/common";
import { COMMENTS_REPOSITORY, CommentsRepository } from "../../domain/repository-contracts/comments.repository";
import { CommentVisibilityPolicy } from "../../domain/policies/comment-visibility.policy";
import { decodeCursor, encodeCursor } from "../../../../common/pagination/cursor.pagination";
import { presentComment } from "../../presentation/presenters/comment.presenter";

@Injectable()
export class GetRepliesService {
  constructor(
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

    return {
      replies,
      nextCursor: result.nextCursor ? encodeCursor(result.nextCursor) : null,
    };
  }
}
