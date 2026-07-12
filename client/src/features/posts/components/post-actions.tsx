import type { ReactNode } from "react";
import { LikeButton } from "@/features/reactions/components/like-button";
import { ReactionSummary } from "@/features/reactions/components/reaction-summary";

type PostActionsProps = {
  liked: boolean;
  likes: number;
  comments: number;
  shares: number;
  onToggleLike?: () => void;
  children?: ReactNode;
};

export function PostActions({ liked, likes, comments, shares, onToggleLike, children }: PostActionsProps) {
  return (
    <div className="_feed_inner_timeline_reaction">
      <div className="_feed_inner_timeline_reaction_top">
        <LikeButton liked={liked} count={likes} onToggle={onToggleLike} />
        <button type="button" className="_feed_inner_timeline_reaction_link">
          Comments {comments}
        </button>
        <button type="button" className="_feed_inner_timeline_reaction_link">
          Shares {shares}
        </button>
      </div>
      <div className="_feed_inner_timeline_reaction_bottom">
        <div className="_feed_inner_timeline_reaction_bottom_image">
          <img src="/assets/images/react_img1.png" alt="Liked by" className="_reaction_user_img" />
          <img src="/assets/images/react_img2.png" alt="Liked by" className="_reaction_user_img" />
          <img src="/assets/images/react_img3.png" alt="Liked by" className="_reaction_user_img" />
        </div>
        <ReactionSummary text={`Liked by Ryan Roslansky and ${Math.max(likes - 1, 0)} others`} />
      </div>
      {children}
    </div>
  );
}
