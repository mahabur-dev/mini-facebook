import { Injectable } from "@nestjs/common";
import { CommentEntity } from "../entities/comment.entity";
import { CommentNotOwnedException } from "../exceptions/comment-not-owned.exception";

@Injectable()
export class CommentOwnershipPolicy {
  canManage(userId: string, comment: CommentEntity | null) {
    if (!comment || comment.deletedAt || comment.authorId !== userId) {
      throw new CommentNotOwnedException();
    }
  }
}
