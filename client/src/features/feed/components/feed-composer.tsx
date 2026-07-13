"use client";

import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCreatePost } from "@/features/posts/hooks/use-create-post";
import { PostComposer } from "@/features/posts/components/post-composer";
import { PostComposerModal, type ComposerMediaSelection } from "@/features/posts/components/post-composer-modal";
import { uploadMedia } from "@/features/media/api/upload-media.api";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { queryKeys } from "@/constants/query-keys";
import { usePostComposerStore } from "@/store/post-composer.store";

export function FeedComposer() {
  const queryClient = useQueryClient();
  const createPost = useCreatePost();
  const currentUser = useCurrentUser();
  const { text, visibility, setText, setVisibility, reset } = usePostComposerStore();
  const [composerOpen, setComposerOpen] = useState(false);
  const [media, setMedia] = useState<ComposerMediaSelection>(null);
  const [uploading, setUploading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const user = currentUser.data?.user;
  const authorName = user ? `${user.firstName} ${user.lastName}`.trim() : "Current user";
  const authorAvatar = user?.profileImageUrl ?? "/assets/images/txt_img.png";

  useEffect(() => {
    return () => {
      if (media?.file) {
        URL.revokeObjectURL(media.previewUrl);
      }
    };
  }, [media]);

  const handleMediaSelect = (file: File) => {
    setSubmitError(null);
    setMedia((current) => {
      if (current?.file) {
        URL.revokeObjectURL(current.previewUrl);
      }

      return {
        file,
        previewUrl: URL.createObjectURL(file),
        mimeType: file.type,
        name: file.name,
      };
    });
  };

  const handleMediaRemove = () => {
    setMedia((current) => {
      if (current?.file) {
        URL.revokeObjectURL(current.previewUrl);
      }

      return null;
    });
  };

  const closeComposer = () => {
    if (!createPost.isPending && !uploading) {
      setComposerOpen(false);
      setSubmitError(null);
    }
  };

  const handleSubmit = async () => {
    if (!text.trim() && !media) {
      return;
    }

    setSubmitError(null);

    try {
      setUploading(true);
      const uploaded = media?.file ? await uploadMedia(media.file) : null;

      await createPost.mutateAsync({
        text: text.trim(),
        visibility,
        mediaId: uploaded?.id ?? null,
      });

      handleMediaRemove();
      reset();
      setComposerOpen(false);
      await queryClient.invalidateQueries({ queryKey: queryKeys.feed.list });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Failed to create post");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <PostComposer
        value={text}
        onOpen={() => setComposerOpen(true)}
        submitting={createPost.isPending || uploading}
        error={submitError}
        authorName={authorName}
        authorAvatar={authorAvatar}
      />
      <PostComposerModal
        open={composerOpen}
        onClose={closeComposer}
        authorName={authorName}
        authorAvatar={authorAvatar}
        value={text}
        visibility={visibility}
        media={media}
        onChange={(value) => {
          setSubmitError(null);
          setText(value);
        }}
        onVisibilityChange={(value) => {
          setSubmitError(null);
          setVisibility(value);
        }}
        onMediaSelect={handleMediaSelect}
        onMediaRemove={handleMediaRemove}
        onSubmit={handleSubmit}
        submitting={createPost.isPending || uploading}
        submittingLabel={uploading ? "Uploading..." : "Posting..."}
        error={submitError}
      />
    </>
  );
}
