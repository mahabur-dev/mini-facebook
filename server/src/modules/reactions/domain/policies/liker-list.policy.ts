import { Injectable } from "@nestjs/common";
import { CommentEntity } from "../../../comments/domain/entities/comment.entity";
import { CommentVisibilityPolicy } from "../../../comments/domain/policies/comment-visibility.policy";
import { PostEntity } from "../../../posts/domain/entities/post.entity";
import { PostVisibilityPolicy } from "../../../posts/domain/policies/post-visibility.policy";

@Injectable()
export class LikerListPolicy {
  constructor(
    private readonly postVisibilityPolicy: PostVisibilityPolicy,
    private readonly commentVisibilityPolicy: CommentVisibilityPolicy,
  ) {}

  canViewPostLikers(viewerId: string, post: PostEntity | null) {
    this.postVisibilityPolicy.canView(viewerId, post);
  }

  async canViewCommentLikers(viewerId: string, comment: CommentEntity | null) {
    await this.commentVisibilityPolicy.canView(viewerId, comment);
  }
}
