"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useCreatePost } from "@/features/posts/hooks/use-create-post";
import { PostComposer } from "@/features/posts/components/post-composer";
import { queryKeys } from "@/constants/query-keys";
import { usePostComposerStore } from "@/store/post-composer.store";

export function FeedComposer() {
  const queryClient = useQueryClient();
  const createPost = useCreatePost();
  const { text, visibility, setText, reset } = usePostComposerStore();

  const handleSubmit = async () => {
    if (!text.trim()) {
      return;
    }

    await createPost.mutateAsync({
      text: text.trim(),
      visibility,
    });

    reset();
    await queryClient.invalidateQueries({ queryKey: queryKeys.feed.list });
  };

  return (
    <PostComposer value={text} onChange={setText} onSubmit={handleSubmit} submitting={createPost.isPending} />
  );
}
