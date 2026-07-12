import type { ReactNode } from "react";

type PostComposerProps = {
  value: string;
  visibility: "Public" | "Private";
  onChange: (value: string) => void;
  onVisibilityChange: (value: "Public" | "Private") => void;
  onSubmit: () => void;
  submitting?: boolean;
  authorAvatar?: string;
  children?: ReactNode;
};

export function PostComposer({
  value,
  visibility,
  onChange,
  onVisibilityChange,
  onSubmit,
  submitting,
  authorAvatar = "/assets/images/txt_img.png",
  children,
}: PostComposerProps) {
  return (
    <div id="composer" className="_feed_inner_text_area _b_radious6 _padd_b24 _padd_t24 _padd_r24 _padd_l24 _mar_b16">
      <div className="_feed_inner_text_area_box">
        <div className="_feed_inner_text_area_box_image">
          <img src={authorAvatar} alt="Create post" className="_txt_img" />
        </div>
        <div className="form-floating _feed_inner_text_area_box_form">
          <textarea className="form-control _textarea" placeholder="Leave a comment here" id="floatingTextarea" value={value} onChange={(event) => onChange(event.target.value)} />
          <label className="_feed_textarea_label" htmlFor="floatingTextarea">
            Write something ...
          </label>
        </div>
      </div>
      <div className="_feed_inner_text_area_bottom">
        {children}
        <div className="_feed_inner_text_area_btn">
          <button type="button" className="_feed_inner_text_area_btn_link" onClick={onSubmit} disabled={submitting || !value.trim()}>
            <span>{submitting ? "Posting..." : `Post ${visibility}`}</span>
          </button>
          <div className="mt-2 d-flex gap-2">
            <button type="button" className="_feed_inner_story_btn_link" onClick={() => onVisibilityChange("Public")}>
              Public
            </button>
            <button type="button" className="_feed_inner_story_btn_link" onClick={() => onVisibilityChange("Private")}>
              Private
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
