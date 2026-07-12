type CommentContentProps = {
  content: string;
};

export function CommentContent({ content }: CommentContentProps) {
  return <p className="mb-2">{content}</p>;
}
