type CommentFormProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  submitting?: boolean;
  placeholder?: string;
};

export function CommentForm({ value, onChange, onSubmit, submitting, placeholder = "Write a comment..." }: CommentFormProps) {
  return (
    <div className="d-flex gap-2 align-items-start">
      <textarea className="form-control _textarea" rows={2} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
      <button type="button" className="_feed_inner_text_area_btn_link" onClick={onSubmit} disabled={submitting || !value.trim()}>
        {submitting ? "Sending..." : "Send"}
      </button>
    </div>
  );
}
