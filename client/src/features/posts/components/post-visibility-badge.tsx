type PostVisibilityBadgeProps = {
  visibility: "Public" | "Private";
};

export function PostVisibilityBadge({ visibility }: PostVisibilityBadgeProps) {
  return <a href="#0">{visibility}</a>;
}
