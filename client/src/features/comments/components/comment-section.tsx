"use client";

import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants/query-keys";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import type { Comment } from "../types/comment.types";
import { useComments } from "../hooks/use-comments";
import { useCreateComment } from "../hooks/use-create-comment";
import { useCreateReply } from "../hooks/use-create-reply";
import { useUpdateComment } from "../hooks/use-update-comment";
import { useDeleteComment } from "../hooks/use-delete-comment";
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
  const updateComment = useUpdateComment();
  const deleteComment = useDeleteComment();
  const [commentText, setCommentText] = useState("");
  const [replyingCommentId, setReplyingCommentId] = useState<string | null>(null);

  const comments = useMemo(() => commentsQuery.data ?? [], [commentsQuery.data]);
  const user = currentUser.data?.user;
  const currentUserAvatar = user?.profileImageUrl ?? "/assets/images/comment_img.png";

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) {
      return;
    }

    const createdComment = await createComment.mutateAsync({
      postId,
      content: commentText.trim(),
    });

    setCommentText("");
    queryClient.setQueryData<Comment[]>(queryKeys.feed.comments(postId), (existing = []) => {
      if (existing.some((comment) => comment.id === createdComment.id)) {
        return existing;
      }

      return [createdComment, ...existing];
    });
    incrementFeedCommentCount(1);
    await queryClient.invalidateQueries({ queryKey: queryKeys.feed.comments(postId) });
    await queryClient.invalidateQueries({ queryKey: queryKeys.feed.list });
    onCommentCreated?.();
  };

  const handleReplySubmit = async (commentId: string, content: string) => {
    if (!content.trim()) {
      return;
    }

    setReplyingCommentId(commentId);

    try {
      const createdReply = await createReply.mutateAsync({
        commentId,
        content: content.trim(),
      });

      queryClient.setQueryData<Comment[]>(queryKeys.feed.replies(commentId), (existing = []) => {
        if (existing.some((reply) => reply.id === createdReply.id)) {
          return existing;
        }

        return [...existing, createdReply];
      });
      queryClient.setQueryData<Comment[]>(queryKeys.feed.comments(postId), (existing = []) =>
        existing.map((comment) => (comment.id === commentId ? { ...comment, replyCount: comment.replyCount + 1 } : comment)),
      );
      incrementFeedCommentCount(1);
      await queryClient.invalidateQueries({ queryKey: queryKeys.feed.comments(postId) });
      await queryClient.invalidateQueries({ queryKey: queryKeys.feed.replies(commentId) });
      await queryClient.invalidateQueries({ queryKey: queryKeys.feed.list });
      onCommentCreated?.();
    } finally {
      setReplyingCommentId(null);
    }
  };

  const handleUpdateComment = async (comment: Comment, content: string) => {
    await updateComment.mutateAsync({ id: comment.id, content });
    await queryClient.invalidateQueries({ queryKey: queryKeys.feed.comments(postId) });
    if (comment.parentCommentId) {
      await queryClient.invalidateQueries({ queryKey: queryKeys.feed.replies(comment.parentCommentId) });
    }
  };

  const handleDeleteComment = async (comment: Comment) => {
    const result = await deleteComment.mutateAsync(comment.id);
    const deletedTotal = (result.deletedCommentCount ?? 0) + (result.deletedReplyCount ?? 0);
    incrementFeedCommentCount(deletedTotal > 0 ? -deletedTotal : -1);
    if (comment.parentCommentId) {
      queryClient.setQueryData<Comment[]>(queryKeys.feed.replies(comment.parentCommentId), (existing = []) =>
        existing.filter((reply) => reply.id !== comment.id),
      );
      queryClient.setQueryData<Comment[]>(queryKeys.feed.comments(postId), (existing = []) =>
        existing.map((item) => (item.id === comment.parentCommentId ? { ...item, replyCount: Math.max(0, item.replyCount - 1) } : item)),
      );
    } else {
      queryClient.setQueryData<Comment[]>(queryKeys.feed.comments(postId), (existing = []) =>
        existing.filter((item) => item.id !== comment.id),
      );
      queryClient.removeQueries({ queryKey: queryKeys.feed.replies(comment.id) });
    }
    await queryClient.invalidateQueries({ queryKey: queryKeys.feed.comments(postId) });
    if (comment.parentCommentId) {
      await queryClient.invalidateQueries({ queryKey: queryKeys.feed.replies(comment.parentCommentId) });
    }
    await queryClient.invalidateQueries({ queryKey: queryKeys.feed.list });
  };

  const incrementFeedCommentCount = (delta: number) => {
    queryClient.setQueryData(queryKeys.feed.list, (existing: unknown) => {
      if (!existing || typeof existing !== "object" || !("pages" in existing)) {
        return existing;
      }

      return {
        ...(existing as { pages: Array<{ items: Array<{ id: string; comments: number }> }> }),
        pages: (existing as { pages: Array<{ items: Array<{ id: string; comments: number }> }> }).pages.map((page) => ({
          ...page,
          items: page.items.map((item) => (item.id === postId ? { ...item, comments: Math.max(0, item.comments + delta) } : item)),
        })),
      };
    });
  };

  return (
    <div className="_feed_inner_timeline_cooment_area">
      <CommentForm
        value={commentText}
        onChange={setCommentText}
        onSubmit={handleCommentSubmit}
        submitting={createComment.isPending}
        avatarSrc={currentUserAvatar}
      />
      {commentsQuery.isLoading ? <p className="_comment_fetch_state">Loading comments...</p> : null}
      {commentsQuery.isError ? <p className="_comment_fetch_state _comment_fetch_state_error">Could not load comments. Please refresh and try again.</p> : null}
      <CommentList
        comments={comments}
        onReplySubmit={handleReplySubmit}
        onUpdateComment={handleUpdateComment}
        onDeleteComment={handleDeleteComment}
        replyingCommentId={replyingCommentId}
      />
    </div>
  );
}
