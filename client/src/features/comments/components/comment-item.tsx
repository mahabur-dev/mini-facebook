import { useState } from "react";
import type { Comment } from "../types/comment.types";
import { CommentActions } from "./comment-actions";
import { CommentContent } from "./comment-content";
import { ReplyForm } from "./reply-form";

type CommentItemProps = {
  comment: Comment;
  onReplySubmit: (commentId: string, content: string) => void;
  replying?: boolean;
};

export function CommentItem({ comment, onReplySubmit, replying }: CommentItemProps) {
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");

  return (
    <div className="_comment_main">
      <div className="_comment_image">
        <a href="/profile.html" className="_comment_image_link">
          <img src="/assets/images/txt_img.png" alt="" className="_comment_img1" />
        </a>
      </div>
      <div className="_comment_area">
        <div className="_comment_details">
          <div className="_comment_details_top">
            <div className="_comment_name">
              <a href="/profile.html">
                <h4 className="_comment_name_title">{comment.author}</h4>
              </a>
            </div>
          </div>
          <CommentContent content={comment.content} />
          <div className="_total_reactions">
            <div className="_total_react">
              <span className="_reaction_like">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-thumbs-up">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
              </span>
              <span className="_reaction_heart">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </span>
            </div>
            <span className="_total">198</span>
          </div>
          <CommentActions onReply={() => setReplyOpen((value) => !value)} />
        </div>
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
    </div>
  );
}
