import { Inject, Injectable } from "@nestjs/common";
import { COMMENTS_REPOSITORY, CommentsRepository } from "../../domain/repository-contracts/comments.repository";
import { CommentVisibilityPolicy } from "../../domain/policies/comment-visibility.policy";

@Injectable()
export class GetRepliesService {
  constructor(
    @Inject(COMMENTS_REPOSITORY) private readonly commentsRepository: CommentsRepository,
    private readonly commentVisibilityPolicy: CommentVisibilityPolicy,
  ) {}

  async execute(viewerId: string, commentId: string) {
    const replies = await this.commentsRepository.findReplies(commentId);
    const visible = [];
    for (const reply of replies) {
      await this.commentVisibilityPolicy.canView(viewerId, reply);
      visible.push(reply);
    }
    return { replies: visible };
  }
}
