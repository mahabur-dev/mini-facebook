import { cn } from "@/lib/cn";
import type { Reaction } from "@/features/reactions/types/reaction.types";

type PostActionsProps = {
  liked: boolean;
  likes: number;
  comments: number;
  shares: number;
  reactionUsersPreview?: Reaction[];
  onToggleLike?: () => void;
  onOpenReactions?: () => void;
};

function getFallbackAvatar(userId: string) {
  const avatars = ["/assets/images/profile.png", "/assets/images/profile-1.png", "/assets/images/txt_img.png", "/assets/images/people1.png"];
  const index = Math.abs(userId.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0)) % avatars.length;
  return avatars[index];
}

export function PostActions({ liked, likes, comments, shares, reactionUsersPreview = [], onToggleLike, onOpenReactions }: PostActionsProps) {
  const reactionCount = likes > 9 ? "9+" : String(likes);
  const previewUsers = reactionUsersPreview.slice(0, 5);

  return (
    <>
      <div className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26">
        <div className="_feed_inner_timeline_total_reacts_image">
          {previewUsers.map((user, index) => (
            <img
              key={user.id}
              src={user.profileImageUrl ?? getFallbackAvatar(user.id)}
              alt={user.name}
              className={cn(index === 0 ? "_react_img1" : "_react_img", index > 1 && "_rect_img_mbl_none")}
            />
          ))}
          <button type="button" className="_feed_inner_timeline_total_reacts_para _reaction_count_btn" onClick={onOpenReactions}>
            {reactionCount}
          </button>
        </div>
        <div className="_feed_inner_timeline_total_reacts_txt">
          <p className="_feed_inner_timeline_total_reacts_para1">
            <a href="#0">
              <span>{comments}</span> Comment
            </a>
          </p>
          <p className="_feed_inner_timeline_total_reacts_para2">
            <span>{shares}</span> Share
          </p>
        </div>
      </div>
      <div className="_feed_inner_timeline_reaction">
        <button
          type="button"
          className={cn("_feed_inner_timeline_reaction_emoji _feed_reaction", liked && "_feed_reaction_active")}
          onClick={onToggleLike}
        >
          <span className="_feed_inner_timeline_reaction_link">
            <span>
              <svg className="_reaction_svg" xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 9V5a3 3 0 0 0-3-3L7 11v11h11.28a2 2 0 0 0 2-1.7l1.38-9A2 2 0 0 0 19.68 9H14Z" />
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
              </svg>
              Like
            </span>
          </span>
        </button>
        <button type="button" className="_feed_inner_timeline_reaction_comment _feed_reaction">
          <span className="_feed_inner_timeline_reaction_link">
            <span>
              <svg className="_reaction_svg" xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none" viewBox="0 0 21 21">
                <path stroke="#000" d="M1 10.5c0-.464 0-.696.009-.893A9 9 0 019.607 1.01C9.804 1 10.036 1 10.5 1v0c.464 0 .696 0 .893.009a9 9 0 018.598 8.598c.009.197.009.429.009.893v6.046c0 1.36 0 2.041-.317 2.535a2 2 0 01-.602.602c-.494.317-1.174.317-2.535.317H10.5c-.464 0-.696 0-.893-.009a9 9 0 01-8.598-8.598C1 11.196 1 10.964 1 10.5v0z" />
                <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" d="M6.938 9.313h7.125M10.5 14.063h3.563" />
              </svg>
              Comment
            </span>
          </span>
        </button>
        <button type="button" className="_feed_inner_timeline_reaction_share _feed_reaction">
          <span className="_feed_inner_timeline_reaction_link">
            <span>
              <svg className="_reaction_svg" xmlns="http://www.w3.org/2000/svg" width="24" height="21" fill="none" viewBox="0 0 24 21">
                <path stroke="#000" strokeLinejoin="round" d="M23 10.5L12.917 1v5.429C3.267 6.429 1 13.258 1 20c2.785-3.52 5.248-5.429 11.917-5.429V20L23 10.5z" />
              </svg>
              Share
            </span>
          </span>
        </button>
      </div>
    </>
  );
}
