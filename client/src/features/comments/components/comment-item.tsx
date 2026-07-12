import { useState } from "react";
import type { Comment } from "../types/comment.types";
import { CommentActions } from "./comment-actions";
import { CommentContent } from "./comment-content";
import { ReplyForm } from "./reply-form";
import { ReplyList } from "./reply-list";

type CommentItemProps = {
  comment: Comment;
  replies: Comment[];
  onReplySubmit: (commentId: string, content: string) => void;
  replying?: boolean;
};

export function CommentItem({ comment, replies, onReplySubmit, replying }: CommentItemProps) {
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");

  return (
    <div className="mb-3 p-3 rounded-3 bg-light">
      <strong className="d-block mb-1">{comment.author}</strong>
      <CommentContent content={comment.content} />
      <CommentActions onReply={() => setReplyOpen((value) => !value)} />
      <ReplyList replies={replies} />
      {replyOpen ? (
        <ReplyForm
          value={replyText}
          onChange={setReplyText}
          onSubmit={() => {
            onReplySubmit(comment.id, replyText);
            setReplyText("");
            setReplyOpen(false);
          }}
          submitting={replying}
        />
      ) : null}
    </div>
  );
}
