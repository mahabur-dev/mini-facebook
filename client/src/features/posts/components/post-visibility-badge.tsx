type PostVisibilityBadgeProps = {
  visibility: "Public" | "Private";
};

export function PostVisibilityBadge({ visibility }: PostVisibilityBadgeProps) {
  return <span className="_feed_inner_timeline_post_box_para">{visibility}</span>;
}
