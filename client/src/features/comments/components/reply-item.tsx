import { useState } from "react";
import type { Comment } from "../types/comment.types";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { ReactionUsersModal } from "@/features/reactions/components/reaction-users-modal";
import { CommentActions } from "./comment-actions";
import { CommentReactionSummary } from "./comment-reaction-summary";
import { ReplyForm } from "./reply-form";
import { useCommentReaction } from "../hooks/use-comment-reaction";
import { canManageComment } from "../utils/comment-permissions";

type ReplyItemProps = {
  reply: Comment;
  onReplySubmit: (commentId: string, content: string) => void | Promise<void>;
  onUpdateComment: (comment: Comment, content: string) => void | Promise<void>;
  onDeleteComment: (comment: Comment) => void | Promise<void>;
  replying?: boolean;
};

export function ReplyItem({ reply, onReplySubmit, onUpdateComment, onDeleteComment, replying }: ReplyItemProps) {
  const currentUser = useCurrentUser();
  const canManage = canManageComment(reply, currentUser.data?.user.id);
  const replyThreadId = reply.parentCommentId ?? reply.id;
  const replyAvatar = currentUser.data?.user.profileImageUrl ?? "/assets/images/comment_img.png";
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(reply.content);
  const [reactionUsersOpen, setReactionUsersOpen] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [replyError, setReplyError] = useState<string | null>(null);
  const replyReaction = useCommentReaction({ comment: reply, targetType: "reply" });

  const handleSave = async () => {
    const nextContent = editText.trim();
    if (!nextContent) {
      return;
    }

    setActionError(null);
    try {
      await onUpdateComment(reply, nextContent);
      setEditing(false);
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Failed to update reply");
    }
  };

  const handleDeleteReply = async () => {
    setActionError(null);
    try {
      await onDeleteComment(reply);
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Failed to delete reply");
    }
  };

  const handleReplySubmit = async () => {
    const nextReply = replyText.trim();
    if (!nextReply) {
      return;
    }

    setReplyError(null);
    try {
      await onReplySubmit(replyThreadId, nextReply);
      setReplyText("");
      setReplyOpen(false);
    } catch (error) {
      setReplyError(error instanceof Error ? error.message : "Failed to reply");
    }
  };

  return (
    <div className="_reply_item">
      <div className="_comment_image _reply_item_image">
        <a href="/profile.html" className="_comment_image_link">
          <img src={reply.authorAvatar ?? "/assets/images/txt_img.png"} alt={reply.authorName} className="_comment_img1" />
        </a>
      </div>
      <div className="_comment_area">
        <div className="_comment_details _reply_details">
          <div className="_comment_details_top">
            <div className="_comment_name">
              <a href="/profile.html">
                <h4 className="_comment_name_title">{reply.authorName}</h4>
              </a>
            </div>
          </div>
          {editing ? (
            <div className="_comment_edit_box">
              <textarea className="form-control _comment_textarea" value={editText} onChange={(event) => setEditText(event.target.value)} />
              <div className="_comment_edit_actions">
                <button type="button" className="_comment_edit_btn _comment_edit_btn_primary" onClick={handleSave}>
                  Save
                </button>
                <button type="button" className="_comment_edit_btn" onClick={() => setEditing(false)}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="_comment_status_text">
              <span>{reply.content}</span>
            </p>
          )}
          <CommentReactionSummary count={replyReaction.likeCount} onOpen={() => setReactionUsersOpen(true)} />
          <CommentActions
            liked={replyReaction.liked}
            canManage={canManage}
            showReply
            className="_reply_comment_actions"
            createdAt={reply.createdAt}
            onToggleLike={replyReaction.toggle}
            onReply={() => setReplyOpen((value) => !value)}
            onEdit={() => {
              setEditText(reply.content);
              setEditing(true);
            }}
            onDelete={handleDeleteReply}
          />
        </div>
        {replyOpen ? (
          <ReplyForm
            value={replyText}
            onChange={(value) => {
              setReplyError(null);
              setReplyText(value);
            }}
            onSubmit={handleReplySubmit}
            submitting={replying}
            avatarSrc={replyAvatar}
          />
        ) : null}
        {replyReaction.error ? <p className="_comment_fetch_state _comment_fetch_state_error _reply_action_error">{replyReaction.error}</p> : null}
        {replyError ? <p className="_comment_fetch_state _comment_fetch_state_error _reply_action_error">{replyError}</p> : null}
        {actionError ? <p className="_comment_fetch_state _comment_fetch_state_error _reply_action_error">{actionError}</p> : null}
      </div>
      <ReactionUsersModal open={reactionUsersOpen} onClose={() => setReactionUsersOpen(false)} targetId={reply.id} targetType="reply" />
    </div>
  );
}
