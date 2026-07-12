type LikeButtonProps = {
  liked: boolean;
  count: number;
  onToggle?: () => void;
};

export function LikeButton({ liked, count, onToggle }: LikeButtonProps) {
  return (
    <button type="button" className="_feed_inner_timeline_reaction_link" onClick={onToggle}>
      {liked ? "Unlike" : "Like"} {count}
    </button>
  );
}
