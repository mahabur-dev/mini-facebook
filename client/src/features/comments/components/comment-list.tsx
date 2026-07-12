import type { Comment } from "../types/comment.types";
import { CommentItem } from "./comment-item";

type CommentListProps = {
  comments: Comment[];
  onReplySubmit: (commentId: string, content: string) => void;
  replyingCommentId?: string | null;
};

export function CommentList({ comments, onReplySubmit, replyingCommentId }: CommentListProps) {
  if (!comments.length) {
    return <p className="mb-0 text-muted">No comments yet.</p>;
  }

  return (
    <div className="mt-3">
      {comments.map((comment) => {
        const replies = comments.filter((candidate) => candidate.parentCommentId === comment.id);
        if (comment.parentCommentId) {
          return null;
        }

        return <CommentItem key={comment.id} comment={comment} replies={replies} onReplySubmit={onReplySubmit} replying={replyingCommentId === comment.id} />;
      })}
    </div>
  );
}
