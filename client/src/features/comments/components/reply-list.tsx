import type { Comment } from "../types/comment.types";
import { ReplyItem } from "./reply-item";

type ReplyListProps = {
  replies: Comment[];
};

export function ReplyList({ replies }: ReplyListProps) {
  if (!replies.length) {
    return null;
  }

  return (
    <div className="mt-2">
      {replies.map((reply) => (
        <ReplyItem key={reply.id} reply={reply} />
      ))}
    </div>
  );
}
