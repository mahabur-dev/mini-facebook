import { CommentForm } from "./comment-form";

type ReplyFormProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void | Promise<void>;
  submitting?: boolean;
  avatarSrc?: string;
};

export function ReplyForm({ value, onChange, onSubmit, submitting, avatarSrc = "/assets/images/comment_img.png" }: ReplyFormProps) {
  return (
    <CommentForm
      value={value}
      onChange={onChange}
      onSubmit={onSubmit}
      submitting={submitting}
      placeholder="Write a reply"
      textareaId="replyTextarea"
      avatarSrc={avatarSrc}
      containerClassName="_reply_form"
    />
  );
}
