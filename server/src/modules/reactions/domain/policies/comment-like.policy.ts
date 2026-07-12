import { Injectable } from "@nestjs/common";
import { CommentEntity } from "../../../comments/domain/entities/comment.entity";
import { CommentVisibilityPolicy } from "../../../comments/domain/policies/comment-visibility.policy";

@Injectable()
export class CommentLikePolicy {
  constructor(private readonly commentVisibilityPolicy: CommentVisibilityPolicy) {}

  async canLike(viewerId: string, comment: CommentEntity | null) {
    await this.commentVisibilityPolicy.canView(viewerId, comment);
  }
}
