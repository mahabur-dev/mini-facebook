type ReplyFormProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  submitting?: boolean;
};

export function ReplyForm({ value, onChange, onSubmit, submitting }: ReplyFormProps) {
  return (
    <div className="d-flex gap-2 align-items-start mt-2">
      <textarea className="form-control _textarea" rows={2} value={value} onChange={(event) => onChange(event.target.value)} placeholder="Write a reply..." />
      <button type="button" className="_feed_inner_text_area_btn_link" onClick={onSubmit} disabled={submitting || !value.trim()}>
        {submitting ? "Sending..." : "Reply"}
      </button>
    </div>
  );
}
