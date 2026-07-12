import type { ReactNode } from "react";
import { PostVisibilityBadge } from "./post-visibility-badge";

type PostHeaderProps = {
  author: string;
  avatar: string;
  timeLabel: string;
  visibility: "Public" | "Private";
  onMenuToggle?: () => void;
  menuOpen?: boolean;
  menu?: ReactNode;
};

export function PostHeader({ author, avatar, timeLabel, visibility, onMenuToggle, menuOpen, menu }: PostHeaderProps) {
  return (
    <div className="_feed_inner_timeline_post_top">
      <div className="_feed_inner_timeline_post_box">
        <div className="_feed_inner_timeline_post_box_image">
          <img src={avatar} alt={author} className="_post_img" />
        </div>
        <div className="_feed_inner_timeline_post_box_txt">
          <h4 className="_feed_inner_timeline_post_box_title">{author}</h4>
          <p className="_feed_inner_timeline_post_box_para">
            {timeLabel} . <PostVisibilityBadge visibility={visibility} />
          </p>
        </div>
      </div>
      <div className="_feed_inner_timeline_post_box_dropdown">
        <div className="_feed_timeline_post_dropdown">
          <button type="button" id="_timeline_show_drop_btn" className="_feed_timeline_post_dropdown_link" aria-label="Open post menu" aria-expanded={menuOpen} onClick={onMenuToggle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="4" height="17" fill="none" viewBox="0 0 4 17">
              <circle cx="2" cy="2" r="2" fill="#C4C4C4" />
              <circle cx="2" cy="8" r="2" fill="#C4C4C4" />
              <circle cx="2" cy="15" r="2" fill="#C4C4C4" />
            </svg>
          </button>
        </div>
        {menu}
      </div>
    </div>
  );
}
