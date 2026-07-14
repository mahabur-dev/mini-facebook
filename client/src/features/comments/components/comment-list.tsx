import type { Comment } from "../types/comment.types";
import { CommentItem } from "./comment-item";

type CommentListProps = {
  comments: Comment[];
  onReplySubmit: (commentId: string, content: string) => void | Promise<void>;
  onUpdateComment: (comment: Comment, content: string) => void | Promise<void>;
  onDeleteComment: (comment: Comment) => void | Promise<void>;
  replyingCommentId?: string | null;
};

export function CommentList({ comments, onReplySubmit, onUpdateComment, onDeleteComment, replyingCommentId }: CommentListProps) {
  const topLevelComments = comments.filter((comment) => !comment.parentCommentId);

  if (!topLevelComments.length) {
    return null;
  }

  return (
    <div className="_timline_comment_main">
      {topLevelComments.length > 4 ? <div className="_previous_comment">
        <button type="button" className="_previous_comment_txt">
          View previous comments
        </button>
      </div> : null}
      {topLevelComments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onReplySubmit={onReplySubmit}
          onUpdateComment={onUpdateComment}
          onDeleteComment={onDeleteComment}
          replying={replyingCommentId === comment.id}
        />
      ))}
    </div>
  );
}
