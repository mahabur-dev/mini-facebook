type CommentActionsProps = {
  onReply?: () => void;
};

export function CommentActions({ onReply }: CommentActionsProps) {
  return (
    <div className="d-flex gap-3">
      <button type="button" className="btn btn-link p-0 text-decoration-none" onClick={onReply}>
        Reply
      </button>
    </div>
  );
}
