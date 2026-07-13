import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { CommentSection } from "@/features/comments/components/comment-section";
import { useToggleReaction } from "@/features/reactions/hooks/use-toggle-reaction";
import { queryKeys } from "@/constants/query-keys";
import type { FeedPostMock } from "../data/feed-mocks";
import { PostActions } from "@/features/posts/components/post-actions";
import { PostContent } from "@/features/posts/components/post-content";
import { PostHeader } from "@/features/posts/components/post-header";
import { PostMedia } from "@/features/posts/components/post-media";
import { PostMenu } from "@/features/posts/components/post-menu";
import { PostComposerModal } from "@/features/posts/components/post-composer-modal";
import { useUpdatePost } from "@/features/posts/hooks/use-update-post";

type FeedPostCardProps = {
  post: FeedPostMock;
};

export function FeedPostCard({ post }: FeedPostCardProps) {
  const queryClient = useQueryClient();
  const toggleReaction = useToggleReaction();
  const updatePost = useUpdatePost();
  const [liked, setLiked] = useState(Boolean(post.liked));
  const [likes, setLikes] = useState(post.likes);
  const [commentCount, setCommentCount] = useState(post.comments);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editText, setEditText] = useState(post.text);
  const [editVisibility, setEditVisibility] = useState(post.visibility);
  const [editError, setEditError] = useState<string | null>(null);

  const handleToggleLike = async () => {
    const nextLiked = !liked;
    setLiked(nextLiked);
    setLikes((value) => Math.max(0, value + (nextLiked ? 1 : -1)));
    queryClient.setQueryData(queryKeys.feed.list, (existing: unknown) => {
      if (!existing || typeof existing !== "object" || !("pages" in existing)) {
        return existing;
      }

      return {
        ...(existing as { pages: Array<{ items: Array<{ id: string; likes: number }> }> }),
        pages: (existing as { pages: Array<{ items: Array<{ id: string; likes: number }> }> }).pages.map((page) => ({
          ...page,
          items: page.items.map((item) => (item.id === post.id ? { ...item, likes: Math.max(0, item.likes + (nextLiked ? 1 : -1)) } : item)),
        })),
      };
    });
    await toggleReaction.mutateAsync({
      targetId: post.id,
      targetType: "post",
      liked,
    });
    await queryClient.invalidateQueries({ queryKey: queryKeys.feed.list });
  };

  const handleOpenEdit = () => {
    setEditText(post.text);
    setEditVisibility(post.visibility);
    setEditError(null);
    setMenuOpen(false);
    setEditOpen(true);
  };

  const handleUpdatePost = async () => {
    if (!editText.trim() && !post.media) {
      return;
    }

    setEditError(null);

    try {
      await updatePost.mutateAsync({
        id: post.id,
        input: {
          text: editText.trim(),
          visibility: editVisibility,
        },
      });
      setEditOpen(false);
      await queryClient.invalidateQueries({ queryKey: queryKeys.feed.list });
    } catch (error) {
      setEditError(error instanceof Error ? error.message : "Failed to update post");
    }
  };

  return (
    <>
      <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
        <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
          <PostHeader
            author={post.author}
            avatar={post.avatar}
            timeLabel={post.timeLabel}
            visibility={post.visibility}
            onMenuToggle={() => setMenuOpen((value) => !value)}
            menuOpen={menuOpen}
            menu={<PostMenu open={menuOpen} canEdit={post.isOwner} onEdit={handleOpenEdit} />}
          />
          <PostContent text={post.text} />
          <PostMedia src={post.media} alt={`${post.author} post media`} mimeType={post.mediaType} />
          <PostActions liked={liked} likes={likes} comments={commentCount} shares={post.shares} onToggleLike={handleToggleLike} />
          <CommentSection postId={post.id} onCommentCreated={() => setCommentCount((value) => value + 1)} />
        </div>
      </div>
      <PostComposerModal
        open={editOpen}
        title="Edit post"
        submitLabel="Save"
        submittingLabel="Saving..."
        onClose={() => {
          if (!updatePost.isPending) {
            setEditOpen(false);
          }
        }}
        authorName={post.author}
        authorAvatar={post.avatar}
        value={editText}
        visibility={editVisibility}
        media={post.media ? { previewUrl: post.media, mimeType: post.mediaType ?? "image/jpeg", name: `${post.author} post media` } : null}
        onChange={(value) => {
          setEditError(null);
          setEditText(value);
        }}
        onVisibilityChange={(value) => {
          setEditError(null);
          setEditVisibility(value);
        }}
        onSubmit={handleUpdatePost}
        submitting={updatePost.isPending}
        error={editError}
      />
    </>
  );
}
