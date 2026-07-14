"use client";

import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants/query-keys";
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
  const commentsQuery = useComments(postId);
  const createComment = useCreateComment();
  const createReply = useCreateReply();
  const updateComment = useUpdateComment();
  const deleteComment = useDeleteComment();
  const [commentText, setCommentText] = useState("");
  const [replyingCommentId, setReplyingCommentId] = useState<string | null>(null);

  const comments = useMemo(() => commentsQuery.data ?? [], [commentsQuery.data]);

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) {
      return;
    }

    await createComment.mutateAsync({
      postId,
      content: commentText.trim(),
    });

    setCommentText("");
    incrementFeedCommentCount(1);
    await queryClient.invalidateQueries({ queryKey: queryKeys.feed.comments(postId) });
    await queryClient.invalidateQueries({ queryKey: queryKeys.feed.list });
    onCommentCreated?.();
  };

  const handleReplySubmit = async (commentId: string, content: string) => {
    if (!content.trim()) {
      return;
    }

    await createReply.mutateAsync({
      commentId,
      content: content.trim(),
    });

    setReplyingCommentId(null);
    await queryClient.invalidateQueries({ queryKey: queryKeys.feed.comments(postId) });
    await queryClient.invalidateQueries({ queryKey: queryKeys.feed.replies(commentId) });
    await queryClient.invalidateQueries({ queryKey: queryKeys.feed.list });
  };

  const handleUpdateComment = async (comment: Comment, content: string) => {
    await updateComment.mutateAsync({ id: comment.id, content });
    await queryClient.invalidateQueries({ queryKey: queryKeys.feed.comments(postId) });
    if (comment.parentCommentId) {
      await queryClient.invalidateQueries({ queryKey: queryKeys.feed.replies(comment.parentCommentId) });
    }
  };

  const handleDeleteComment = async (comment: Comment) => {
    await deleteComment.mutateAsync(comment.id);
    if (!comment.parentCommentId) {
      incrementFeedCommentCount(-1);
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
      <CommentForm value={commentText} onChange={setCommentText} onSubmit={handleCommentSubmit} submitting={createComment.isPending} />
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
