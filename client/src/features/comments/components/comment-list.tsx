import type { Comment } from "../types/comment.types";
import { CommentItem } from "./comment-item";

type CommentListProps = {
  comments: Comment[];
  onReplySubmit: (commentId: string, content: string) => void;
  replyingCommentId?: string | null;
};

export function CommentList({ comments, onReplySubmit, replyingCommentId }: CommentListProps) {
  const topLevelComments = comments.filter((comment) => !comment.parentCommentId);

  if (!topLevelComments.length) {
    return null;
  }

  return (
    <div className="_timline_comment_main">
      <div className="_previous_comment">
        <button type="button" className="_previous_comment_txt">
          View 4 previous comments
        </button>
      </div>
      {topLevelComments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} onReplySubmit={onReplySubmit} replying={replyingCommentId === comment.id} />
      ))}
    </div>
  );
}
