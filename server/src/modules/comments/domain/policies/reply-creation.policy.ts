import { Injectable } from "@nestjs/common";
import { ReplyDepthExceededException } from "../exceptions/reply-depth-exceeded.exception";
import { CommentEntity } from "../entities/comment.entity";

@Injectable()
export class ReplyCreationPolicy {
  canReply(parentComment: CommentEntity | null) {
    if (!parentComment || parentComment.parentCommentId) {
      throw new ReplyDepthExceededException();
    }
  }
}
