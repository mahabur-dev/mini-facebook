import type { Comment } from "../types/comment.types";
import { ReplyItem } from "./reply-item";

type ReplyListProps = {
  replies: Comment[];
  onReplySubmit: (commentId: string, content: string) => void | Promise<void>;
  onUpdateComment: (comment: Comment, content: string) => void | Promise<void>;
  onDeleteComment: (comment: Comment) => void | Promise<void>;
  replyingCommentId?: string | null;
};

export function ReplyList({ replies, onReplySubmit, onUpdateComment, onDeleteComment, replyingCommentId }: ReplyListProps) {
  if (!replies.length) {
    return null;
  }

  return (
    <div className="_reply_list">
      {replies.map((reply) => (
        <ReplyItem
          key={reply.id}
          reply={reply}
          onReplySubmit={onReplySubmit}
          onUpdateComment={onUpdateComment}
          onDeleteComment={onDeleteComment}
          replying={replyingCommentId === reply.parentCommentId}
        />
      ))}
    </div>
  );
}
