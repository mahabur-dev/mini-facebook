import type { Comment } from "../types/comment.types";

type ReplyItemProps = {
  reply: Comment;
};

export function ReplyItem({ reply }: ReplyItemProps) {
  return (
    <div className="ms-4 mt-2 p-2 rounded-3 bg-light">
      <strong className="d-block">{reply.author}</strong>
      <p className="mb-0">{reply.content}</p>
    </div>
  );
}
