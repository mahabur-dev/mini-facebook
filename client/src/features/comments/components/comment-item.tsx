import { useState } from "react";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { ReactionUsersModal } from "@/features/reactions/components/reaction-users-modal";
import type { Comment } from "../types/comment.types";
import { CommentActions } from "./comment-actions";
import { CommentContent } from "./comment-content";
import { CommentReactionSummary } from "./comment-reaction-summary";
import { ReplyForm } from "./reply-form";
import { ReplyList } from "./reply-list";
import { useReplies } from "../hooks/use-replies";
import { useCommentReaction } from "../hooks/use-comment-reaction";
import { canManageComment } from "../utils/comment-permissions";

type CommentItemProps = {
  comment: Comment;
  onReplySubmit: (commentId: string, content: string) => void | Promise<void>;
  onUpdateComment: (comment: Comment, content: string) => void | Promise<void>;
  onDeleteComment: (comment: Comment) => void | Promise<void>;
  replying?: boolean;
};

export function CommentItem({ comment, onReplySubmit, onUpdateComment, onDeleteComment, replying }: CommentItemProps) {
  const currentUser = useCurrentUser();
  const [replyOpen, setReplyOpen] = useState(false);
  const [repliesOpen, setRepliesOpen] = useState(comment.replyCount > 0);
  const [replyText, setReplyText] = useState("");
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(comment.content);
  const [reactionUsersOpen, setReactionUsersOpen] = useState(false);
  const [replyError, setReplyError] = useState<string | null>(null);
  const commentReaction = useCommentReaction({ comment, targetType: "comment" });
  const repliesQuery = useReplies(comment.id, repliesOpen);
  const canManage = canManageComment(comment, currentUser.data?.user.id);
  const replyAvatar = currentUser.data?.user.profileImageUrl ?? "/assets/images/comment_img.png";

  const handleSaveEdit = () => {
    const nextContent = editText.trim();
    if (!nextContent) {
      return;
    }
    onUpdateComment(comment, nextContent);
    setEditing(false);
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
              <div className="_comment_edit_actions">
                <button type="button" className="_comment_edit_btn _comment_edit_btn_primary" onClick={handleSaveEdit}>
                  Save
                </button>
                <button type="button" className="_comment_edit_btn" onClick={() => setEditing(false)}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <CommentContent content={comment.content} />
          )}
          <CommentReactionSummary count={commentReaction.likeCount} onOpen={() => setReactionUsersOpen(true)} />
          <CommentActions
            liked={commentReaction.liked}
            canManage={canManage}
            createdAt={comment.createdAt}
            onToggleLike={commentReaction.toggle}
            onReply={() => setReplyOpen((value) => !value)}
            onEdit={() => {
              setEditText(comment.content);
              setEditing(true);
            }}
            onDelete={() => onDeleteComment(comment)}
          />
        </div>
        {commentReaction.error ? <p className="_comment_fetch_state _comment_fetch_state_error _reply_action_error">{commentReaction.error}</p> : null}
        {comment.replyCount > 0 ? (
          <button type="button" className="_comment_replies_toggle" onClick={() => setRepliesOpen((value) => !value)}>
            {repliesOpen ? "Hide replies" : `View ${comment.replyCount} replies`}
          </button>
        ) : null}
        {replyOpen ? (
          <ReplyForm
            value={replyText}
            onChange={(value) => {
              setReplyError(null);
              setReplyText(value);
            }}
            onSubmit={async () => {
              const nextReply = replyText.trim();
              if (!nextReply) {
                return;
              }

              setReplyError(null);
              setRepliesOpen(true);

              try {
                await onReplySubmit(comment.id, nextReply);
                setReplyText("");
                setReplyOpen(false);
              } catch (error) {
                setReplyError(error instanceof Error ? error.message : "Failed to reply");
              }
            }}
            submitting={replying}
            avatarSrc={replyAvatar}
          />
        ) : null}
        {replyError ? <p className="_comment_fetch_state _comment_fetch_state_error _reply_fetch_state">{replyError}</p> : null}
        {repliesOpen ? (
          <>
            {repliesQuery.isLoading ? <p className="_comment_fetch_state _reply_fetch_state">Loading replies...</p> : null}
            {repliesQuery.isError ? <p className="_comment_fetch_state _comment_fetch_state_error _reply_fetch_state">Could not load replies.</p> : null}
            <ReplyList
              replies={repliesQuery.data ?? []}
              onReplySubmit={onReplySubmit}
              onUpdateComment={onUpdateComment}
              onDeleteComment={onDeleteComment}
              replyingCommentId={replying ? comment.id : null}
            />
          </>
        ) : null}
      </div>
      <ReactionUsersModal open={reactionUsersOpen} onClose={() => setReactionUsersOpen(false)} targetId={comment.id} targetType="comment" />
    </div>
  );
}
