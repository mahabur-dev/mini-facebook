"use client";

import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants/query-keys";
import { useToggleReaction } from "@/features/reactions/hooks/use-toggle-reaction";
import type { ReactionTargetType } from "@/features/reactions/types/reaction.types";
import type { Comment } from "../types/comment.types";

type UseCommentReactionInput = {
  comment: Comment;
  targetType: Extract<ReactionTargetType, "comment" | "reply">;
};

export function useCommentReaction({ comment, targetType }: UseCommentReactionInput) {
  const queryClient = useQueryClient();
  const toggleReaction = useToggleReaction();
  const [liked, setLiked] = useState(comment.liked);
  const [likeCount, setLikeCount] = useState(comment.likeCount);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLiked(comment.liked);
    setLikeCount(comment.likeCount);
  }, [comment.id, comment.liked, comment.likeCount]);

  const invalidateReactionOwner = async () => {
    if (targetType === "reply" && comment.parentCommentId) {
      await queryClient.invalidateQueries({ queryKey: queryKeys.feed.replies(comment.parentCommentId) });
      return;
    }

    await queryClient.invalidateQueries({ queryKey: queryKeys.feed.comments(comment.postId) });
  };

  const toggle = async () => {
    const previousLiked = liked;
    const previousCount = likeCount;
    const nextLiked = !previousLiked;

    setError(null);
    setLiked(nextLiked);
    setLikeCount((value) => Math.max(0, value + (nextLiked ? 1 : -1)));

    try {
      await toggleReaction.mutateAsync({
        targetId: comment.id,
        targetType,
        liked: previousLiked,
      });
      await invalidateReactionOwner();
    } catch (mutationError) {
      setLiked(previousLiked);
      setLikeCount(previousCount);
      setError(mutationError instanceof Error ? mutationError.message : "Failed to update reaction");
    }
  };

  return {
    liked,
    likeCount,
    error,
    toggle,
    pending: toggleReaction.isPending,
  };
}
