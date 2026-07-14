import { formatRelativeTime } from "@/lib/date/relative-time";

type CommentActionsProps = {
  liked?: boolean;
  canManage?: boolean;
  showReply?: boolean;
  className?: string;
  createdAt?: string;
  onToggleLike?: () => void;
  onReply?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export function CommentActions({ liked, canManage, showReply = true, className, createdAt, onToggleLike, onReply, onEdit, onDelete }: CommentActionsProps) {
  const timeLabel = createdAt ? formatRelativeTime(createdAt) : "";

  return (
    <div className={className ? `_comment_reply ${className}` : "_comment_reply"}>
      <div className="_comment_reply_num">
        <ul className="_comment_reply_list">
          <li>
            <span role="button" tabIndex={0} onClick={onToggleLike} onKeyDown={(event) => event.key === "Enter" && onToggleLike?.()}>
              {liked ? "Unlike." : "Like."}
            </span>
          </li>
          {showReply ? (
            <li>
              <span role="button" tabIndex={0} onClick={onReply} onKeyDown={(event) => event.key === "Enter" && onReply?.()}>
                Reply.
              </span>
            </li>
          ) : null}
          {canManage ? (
            <>
              <li>
                <span role="button" tabIndex={0} onClick={onEdit} onKeyDown={(event) => event.key === "Enter" && onEdit?.()}>
                  Edit.
                </span>
              </li>
              <li>
                <span role="button" tabIndex={0} onClick={onDelete} onKeyDown={(event) => event.key === "Enter" && onDelete?.()}>
                  Delete.
                </span>
              </li>
            </>
          ) : null}
          {timeLabel ? (
            <li>
              <span className="_time_link">.{timeLabel}</span>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
}
