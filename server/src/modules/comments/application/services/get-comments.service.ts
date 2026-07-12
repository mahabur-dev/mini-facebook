import { Inject, Injectable } from "@nestjs/common";
import { COMMENTS_REPOSITORY, CommentsRepository } from "../../domain/repository-contracts/comments.repository";
import { CommentVisibilityPolicy } from "../../domain/policies/comment-visibility.policy";

@Injectable()
export class GetCommentsService {
  constructor(
    @Inject(COMMENTS_REPOSITORY) private readonly commentsRepository: CommentsRepository,
    private readonly commentVisibilityPolicy: CommentVisibilityPolicy,
  ) {}

  async execute(viewerId: string, postId: string) {
    const comments = await this.commentsRepository.findByPost(postId);
    const visible = [];
    for (const comment of comments) {
      await this.commentVisibilityPolicy.canView(viewerId, comment);
      if (!comment.parentCommentId) {
        visible.push(comment);
      }
    }
    return { comments: visible };
  }
}
