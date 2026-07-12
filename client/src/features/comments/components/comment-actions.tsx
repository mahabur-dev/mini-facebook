type CommentActionsProps = {
  onReply?: () => void;
};

export function CommentActions({ onReply }: CommentActionsProps) {
  return (
    <div className="_comment_reply">
      <div className="_comment_reply_num">
        <ul className="_comment_reply_list">
          <li>
            <span>Like.</span>
          </li>
          <li>
            <span role="button" tabIndex={0} onClick={onReply} onKeyDown={(event) => event.key === "Enter" && onReply?.()}>
              Reply.
            </span>
          </li>
          <li>
            <span>Share</span>
          </li>
          <li>
            <span className="_time_link">.21m</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
