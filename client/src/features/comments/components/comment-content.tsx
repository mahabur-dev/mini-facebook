type CommentContentProps = {
  content: string;
};

export function CommentContent({ content }: CommentContentProps) {
  return (
    <div className="_comment_status">
      <p className="_comment_status_text">
        <span>{content}</span>
      </p>
    </div>
  );
}
