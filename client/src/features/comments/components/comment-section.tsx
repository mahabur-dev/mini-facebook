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
};

export function CommentSection({ postId }: CommentSectionProps) {
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

    await createComment.mutateAsync({
      postId,
      author: currentUser.data?.user.firstName && currentUser.data?.user.lastName ? `${currentUser.data.user.firstName} ${currentUser.data.user.lastName}` : mockDb.currentUser.firstName + " " + mockDb.currentUser.lastName,
      content: commentText.trim(),
    });

    setCommentText("");
    await queryClient.invalidateQueries({ queryKey: queryKeys.feed.comments(postId) });
  };

  const handleReplySubmit = async (commentId: string, content: string) => {
    if (!content.trim()) {
      return;
    }

    await createReply.mutateAsync({
      commentId,
      author: currentUser.data?.user.firstName && currentUser.data?.user.lastName ? `${currentUser.data.user.firstName} ${currentUser.data.user.lastName}` : mockDb.currentUser.firstName + " " + mockDb.currentUser.lastName,
      content: content.trim(),
    });

    setReplyingCommentId(null);
    await queryClient.invalidateQueries({ queryKey: queryKeys.feed.comments(postId) });
  };

  return (
    <div className="_feed_inner_timeline_comment_area mt-4">
      <div className="_feed_inner_timeline_comment_box">
        <CommentForm value={commentText} onChange={setCommentText} onSubmit={handleCommentSubmit} submitting={createComment.isPending} />
      </div>
      <CommentList comments={comments} onReplySubmit={handleReplySubmit} replyingCommentId={replyingCommentId} />
    </div>
  );
}
