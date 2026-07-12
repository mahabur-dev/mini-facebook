"use client";

import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants/query-keys";
import { mockDb } from "@/lib/mock/mock-db";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { useComments } from "../hooks/use-comments";
import { useCreateComment } from "../hooks/use-create-comment";
import { useCreateReply } from "../hooks/use-create-reply";
import { CommentForm } from "./comment-form";
import { CommentList } from "./comment-list";

type CommentSectionProps = {
  postId: string;
  onCommentCreated?: () => void;
};

export function CommentSection({ postId, onCommentCreated }: CommentSectionProps) {
  const queryClient = useQueryClient();
  const currentUser = useCurrentUser();
  const commentsQuery = useComments(postId);
  const createComment = useCreateComment();
  const createReply = useCreateReply();
  const [commentText, setCommentText] = useState("");
  const [replyingCommentId, setReplyingCommentId] = useState<string | null>(null);

  const comments = useMemo(() => commentsQuery.data ?? [], [commentsQuery.data]);

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) {
      return;
    }

    const optimisticComment = {
      id: `comment-optimistic-${Date.now()}`,
      postId,
      parentCommentId: null,
      author: currentUser.data?.user.firstName && currentUser.data?.user.lastName ? `${currentUser.data.user.firstName} ${currentUser.data.user.lastName}` : `${mockDb.currentUser.firstName} ${mockDb.currentUser.lastName}`,
      content: commentText.trim(),
    };

    queryClient.setQueryData(queryKeys.feed.comments(postId), (existing: Array<typeof optimisticComment> | undefined) => [optimisticComment, ...(existing ?? [])]);
    queryClient.setQueryData(queryKeys.feed.list, (existing: unknown) => {
      if (!existing || typeof existing !== "object" || !("pages" in existing)) {
        return existing;
      }

      return {
        ...(existing as { pages: Array<{ items: Array<{ id: string; comments: number }> }> }),
        pages: (existing as { pages: Array<{ items: Array<{ id: string; comments: number }> }> }).pages.map((page) => ({
          ...page,
          items: page.items.map((item) => (item.id === postId ? { ...item, comments: item.comments + 1 } : item)),
        })),
      };
    });

    await createComment.mutateAsync({
      postId,
      author: currentUser.data?.user.firstName && currentUser.data?.user.lastName ? `${currentUser.data.user.firstName} ${currentUser.data.user.lastName}` : `${mockDb.currentUser.firstName} ${mockDb.currentUser.lastName}`,
      content: commentText.trim(),
    });

    setCommentText("");
    await queryClient.invalidateQueries({ queryKey: queryKeys.feed.comments(postId) });
    await queryClient.invalidateQueries({ queryKey: queryKeys.feed.list });
    onCommentCreated?.();
  };

  const handleReplySubmit = async (commentId: string, content: string) => {
    if (!content.trim()) {
      return;
    }

    const optimisticReply = {
      id: `reply-optimistic-${Date.now()}`,
      postId,
      parentCommentId: commentId,
      author: currentUser.data?.user.firstName && currentUser.data?.user.lastName ? `${currentUser.data.user.firstName} ${currentUser.data.user.lastName}` : `${mockDb.currentUser.firstName} ${mockDb.currentUser.lastName}`,
      content: content.trim(),
    };

    queryClient.setQueryData(queryKeys.feed.comments(postId), (existing: Array<typeof optimisticReply> | undefined) => [optimisticReply, ...(existing ?? [])]);

    await createReply.mutateAsync({
      commentId,
      author: currentUser.data?.user.firstName && currentUser.data?.user.lastName ? `${currentUser.data.user.firstName} ${currentUser.data.user.lastName}` : `${mockDb.currentUser.firstName} ${mockDb.currentUser.lastName}`,
      content: content.trim(),
    });

    setReplyingCommentId(null);
    await queryClient.invalidateQueries({ queryKey: queryKeys.feed.comments(postId) });
  };

  return (
    <div className="_feed_inner_timeline_cooment_area">
      <CommentForm value={commentText} onChange={setCommentText} onSubmit={handleCommentSubmit} submitting={createComment.isPending} />
      <CommentList comments={comments} onReplySubmit={handleReplySubmit} replyingCommentId={replyingCommentId} />
    </div>
  );
}
