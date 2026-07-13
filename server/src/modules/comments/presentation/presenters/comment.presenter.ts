import { CommentEntity } from "../../domain/entities/comment.entity";
import { presentUser } from "../../../../common/presenters/user.presenter";

export function presentComment(comment: CommentEntity) {
  return {
    ...comment,
    author: comment.author ? presentUser(comment.author) : undefined,
  };
}
