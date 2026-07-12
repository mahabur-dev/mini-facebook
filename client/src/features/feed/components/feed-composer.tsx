"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { useCreatePost } from "@/features/posts/hooks/use-create-post";
import { PostComposer } from "@/features/posts/components/post-composer";
import { queryKeys } from "@/constants/query-keys";
import { mockDb } from "@/lib/mock/mock-db";
import { usePostComposerStore } from "@/store/post-composer.store";

export function FeedComposer() {
  const queryClient = useQueryClient();
  const currentUser = useCurrentUser();
  const createPost = useCreatePost();
  const { text, visibility, setText, setVisibility, reset } = usePostComposerStore();

  const handleSubmit = async () => {
    if (!text.trim()) {
      return;
    }

    await createPost.mutateAsync({
      author: currentUser.data?.user.firstName && currentUser.data?.user.lastName ? `${currentUser.data.user.firstName} ${currentUser.data.user.lastName}` : `${mockDb.currentUser.firstName} ${mockDb.currentUser.lastName}`,
      text: text.trim(),
      media: "/assets/images/feed_event1.png",
      visibility,
    });

    reset();
    await queryClient.invalidateQueries({ queryKey: queryKeys.feed.list });
  };

  return (
    <PostComposer value={text} visibility={visibility} onChange={setText} onVisibilityChange={setVisibility} onSubmit={handleSubmit} submitting={createPost.isPending}>
        <div className="_feed_inner_text_area_item">
          <div className="_feed_inner_text_area_bottom_photo _feed_common">
            <button type="button" className="_feed_inner_text_area_bottom_photo_link">
              <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">Photo</span>
            </button>
          </div>
          <div className="_feed_inner_text_area_bottom_video _feed_common">
            <button type="button" className="_feed_inner_text_area_bottom_photo_link">
              <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">Video</span>
            </button>
          </div>
          <div className="_feed_inner_text_area_bottom_event _feed_common">
            <button type="button" className="_feed_inner_text_area_bottom_photo_link">
              <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">Event</span>
            </button>
          </div>
          <div className="_feed_inner_text_area_bottom_article _feed_common">
            <button type="button" className="_feed_inner_text_area_bottom_photo_link">
              <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">Article</span>
            </button>
          </div>
        </div>
    </PostComposer>
  );
}
