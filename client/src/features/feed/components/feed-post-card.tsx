import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useComments } from "@/features/comments/hooks/use-comments";
import { CommentSection } from "@/features/comments/components/comment-section";
import { useToggleReaction } from "@/features/reactions/hooks/use-toggle-reaction";
import { queryKeys } from "@/constants/query-keys";
import type { FeedPostMock } from "../data/feed-mocks";
import { PostActions } from "@/features/posts/components/post-actions";
import { PostContent } from "@/features/posts/components/post-content";
import { PostHeader } from "@/features/posts/components/post-header";
import { PostMedia } from "@/features/posts/components/post-media";
import { PostMenu } from "@/features/posts/components/post-menu";

type FeedPostCardProps = {
  post: FeedPostMock;
};

export function FeedPostCard({ post }: FeedPostCardProps) {
  const queryClient = useQueryClient();
  const commentsQuery = useComments(post.id);
  const toggleReaction = useToggleReaction();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [menuOpen, setMenuOpen] = useState(false);
  const comments = commentsQuery.data ?? [];

  const commentCount = useMemo(() => comments.filter((comment) => !comment.parentCommentId).length, [comments]);

  const handleToggleLike = async () => {
    const nextLiked = !liked;
    setLiked(nextLiked);
    setLikes((value) => Math.max(0, value + (nextLiked ? 1 : -1)));
    await toggleReaction.mutateAsync({
      targetId: post.id,
      targetType: "post",
      liked,
    });
    await queryClient.invalidateQueries({ queryKey: queryKeys.feed.list });
  };

  return (
    <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
      <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
        <PostHeader
          author={post.author}
          avatar={post.avatar}
          timeLabel={post.timeLabel}
          visibility={post.visibility}
          onMenuToggle={() => setMenuOpen((value) => !value)}
          menuOpen={menuOpen}
          menu={<PostMenu open={menuOpen} />}
        />
        <PostContent text={post.text} />
        <PostMedia src={post.media} alt={`${post.author} post media`} />
        <PostActions liked={liked} likes={likes} comments={commentCount} shares={post.shares} onToggleLike={handleToggleLike} />
        <CommentSection postId={post.id} />
      </div>
    </div>
  );
}
