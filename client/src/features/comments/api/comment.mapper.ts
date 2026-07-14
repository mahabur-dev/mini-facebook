import type { BackendComment, Comment } from "../types/comment.types";

export function mapComment(comment: BackendComment): Comment {
  const authorName = comment.author ? `${comment.author.firstName} ${comment.author.lastName}`.trim() : "Unknown user";

  return {
    id: comment.id,
    postId: comment.postId,
    authorId: comment.authorId,
    authorName,
    authorAvatar: comment.author?.profileImageUrl ?? null,
    content: comment.content,
    parentCommentId: comment.parentCommentId,
    likeCount: comment.statistics?.likeCount ?? 0,
    replyCount: comment.statistics?.replyCount ?? 0,
    liked: Boolean(comment.isLikedByCurrentUser),
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
  };
}
