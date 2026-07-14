import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { queryKeys } from "@/constants/query-keys";
import { useToggleReaction } from "@/features/reactions/hooks/use-toggle-reaction";
import { ReactionUsersModal } from "@/features/reactions/components/reaction-users-modal";
import type { Comment } from "../types/comment.types";
import { CommentActions } from "./comment-actions";
import { CommentContent } from "./comment-content";
import { ReplyForm } from "./reply-form";
import { ReplyList } from "./reply-list";
import { useReplies } from "../hooks/use-replies";

type CommentItemProps = {
  comment: Comment;
  onReplySubmit: (commentId: string, content: string) => void;
  onUpdateComment: (comment: Comment, content: string) => void;
  onDeleteComment: (comment: Comment) => void;
  replying?: boolean;
};

export function CommentItem({ comment, onReplySubmit, onUpdateComment, onDeleteComment, replying }: CommentItemProps) {
  const currentUser = useCurrentUser();
  const queryClient = useQueryClient();
  const toggleReaction = useToggleReaction();
  const [replyOpen, setReplyOpen] = useState(false);
  const [repliesOpen, setRepliesOpen] = useState(comment.replyCount > 0);
  const [replyText, setReplyText] = useState("");
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(comment.content);
  const [liked, setLiked] = useState(comment.liked);
  const [likeCount, setLikeCount] = useState(comment.likeCount);
  const [reactionUsersOpen, setReactionUsersOpen] = useState(false);
  const repliesQuery = useReplies(comment.id, repliesOpen);
  const canManage = currentUser.data?.user.id === comment.authorId;

  const handleSaveEdit = () => {
    const nextContent = editText.trim();
    if (!nextContent) {
      return;
    }
    onUpdateComment(comment, nextContent);
    setEditing(false);
  };

  const handleToggleLike = async () => {
    const nextLiked = !liked;
    setLiked(nextLiked);
    setLikeCount((value) => Math.max(0, value + (nextLiked ? 1 : -1)));

    await toggleReaction.mutateAsync({
      targetId: comment.id,
      targetType: "comment",
      liked,
    });
    await queryClient.invalidateQueries({ queryKey: queryKeys.feed.comments(comment.postId) });
  };

  return (
    <div className="_comment_main">
      <div className="_comment_image">
        <a href="/profile.html" className="_comment_image_link">
          <img src={comment.authorAvatar ?? "/assets/images/txt_img.png"} alt="" className="_comment_img1" />
        </a>
      </div>
      <div className="_comment_area">
        <div className="_comment_details">
          <div className="_comment_details_top">
            <div className="_comment_name">
              <a href="/profile.html">
                <h4 className="_comment_name_title">{comment.authorName}</h4>
              </a>
            </div>
          </div>
          {editing ? (
            <div className="_comment_edit_box">
              <textarea className="form-control _comment_textarea" value={editText} onChange={(event) => setEditText(event.target.value)} />
              <div className="d-flex gap-2 mt-2">
                <button type="button" className="btn btn-primary btn-sm" onClick={handleSaveEdit}>
                  Save
                </button>
                <button type="button" className="btn btn-light btn-sm" onClick={() => setEditing(false)}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <CommentContent content={comment.content} />
          )}
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
            <button type="button" className="_total _reaction_count_btn" onClick={() => setReactionUsersOpen(true)}>
              {likeCount}
            </button>
          </div>
          <CommentActions
            liked={liked}
            canManage={canManage}
            onToggleLike={handleToggleLike}
            onReply={() => setReplyOpen((value) => !value)}
            onEdit={() => {
              setEditText(comment.content);
              setEditing(true);
            }}
            onDelete={() => onDeleteComment(comment)}
          />
        </div>
        {comment.replyCount > 0 ? (
          <button type="button" className="btn btn-link btn-sm p-0 mt-2" onClick={() => setRepliesOpen((value) => !value)}>
            {repliesOpen ? "Hide replies" : `View ${comment.replyCount} replies`}
          </button>
        ) : null}
        {replyOpen ? (
          <ReplyForm
            value={replyText}
            onChange={setReplyText}
            onSubmit={() => {
              onReplySubmit(comment.id, replyText);
              setReplyText("");
              setReplyOpen(false);
              setRepliesOpen(true);
            }}
            submitting={replying}
          />
        ) : null}
        {repliesOpen ? (
          <ReplyList
            replies={repliesQuery.data ?? []}
            onUpdateComment={onUpdateComment}
            onDeleteComment={onDeleteComment}
          />
        ) : null}
      </div>
      <ReactionUsersModal open={reactionUsersOpen} onClose={() => setReactionUsersOpen(false)} targetId={comment.id} targetType="comment" />
    </div>
  );
}
