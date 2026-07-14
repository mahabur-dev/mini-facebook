import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { Comment } from "../types/comment.types";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { queryKeys } from "@/constants/query-keys";
import { useToggleReaction } from "@/features/reactions/hooks/use-toggle-reaction";
import { ReactionUsersModal } from "@/features/reactions/components/reaction-users-modal";

type ReplyItemProps = {
  reply: Comment;
  onUpdateComment: (comment: Comment, content: string) => void;
  onDeleteComment: (comment: Comment) => void;
};

export function ReplyItem({ reply, onUpdateComment, onDeleteComment }: ReplyItemProps) {
  const currentUser = useCurrentUser();
  const queryClient = useQueryClient();
  const toggleReaction = useToggleReaction();
  const canManage = currentUser.data?.user.id === reply.authorId;
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(reply.content);
  const [liked, setLiked] = useState(reply.liked);
  const [likeCount, setLikeCount] = useState(reply.likeCount);
  const [reactionUsersOpen, setReactionUsersOpen] = useState(false);

  const handleSave = () => {
    const nextContent = editText.trim();
    if (!nextContent) {
      return;
    }

    onUpdateComment(reply, nextContent);
    setEditing(false);
  };

  const handleToggleLike = async () => {
    const nextLiked = !liked;
    setLiked(nextLiked);
    setLikeCount((value) => Math.max(0, value + (nextLiked ? 1 : -1)));

    await toggleReaction.mutateAsync({
      targetId: reply.id,
      targetType: "reply",
      liked,
    });

    if (reply.parentCommentId) {
      await queryClient.invalidateQueries({ queryKey: queryKeys.feed.replies(reply.parentCommentId) });
    }
  };

  return (
    <div className="ms-4 mt-2 p-2 rounded-3 bg-light">
      <strong className="d-block">{reply.authorName}</strong>
      {editing ? (
        <div>
          <textarea className="form-control _comment_textarea" value={editText} onChange={(event) => setEditText(event.target.value)} />
          <div className="d-flex gap-2 mt-1">
            <button type="button" className="btn btn-primary btn-sm" onClick={handleSave}>
              Save
            </button>
            <button type="button" className="btn btn-light btn-sm" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="mb-0">{reply.content}</p>
      )}
      <div className="d-flex gap-2 mt-1">
        <button type="button" className="btn btn-link btn-sm p-0" onClick={handleToggleLike}>
          {liked ? "Unlike" : "Like"}
        </button>
        <button type="button" className="btn btn-link btn-sm p-0 text-muted" onClick={() => setReactionUsersOpen(true)}>
          {likeCount}
        </button>
      </div>
      {canManage ? (
        <div className="d-flex gap-2 mt-1">
          <button type="button" className="btn btn-link btn-sm p-0" onClick={() => setEditing(true)}>
            Edit
          </button>
          <button type="button" className="btn btn-link btn-sm p-0 text-danger" onClick={() => onDeleteComment(reply)}>
            Delete
          </button>
        </div>
      ) : null}
      <ReactionUsersModal open={reactionUsersOpen} onClose={() => setReactionUsersOpen(false)} targetId={reply.id} targetType="reply" />
    </div>
  );
}
