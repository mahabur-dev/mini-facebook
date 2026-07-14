import type { Comment } from "../types/comment.types";
import { ReplyItem } from "./reply-item";

type ReplyListProps = {
  replies: Comment[];
  onUpdateComment: (comment: Comment, content: string) => void;
  onDeleteComment: (comment: Comment) => void;
};

export function ReplyList({ replies, onUpdateComment, onDeleteComment }: ReplyListProps) {
  if (!replies.length) {
    return null;
  }

  return (
    <div className="mt-2">
      {replies.map((reply) => (
        <ReplyItem key={reply.id} reply={reply} onUpdateComment={onUpdateComment} onDeleteComment={onDeleteComment} />
      ))}
    </div>
  );
}
