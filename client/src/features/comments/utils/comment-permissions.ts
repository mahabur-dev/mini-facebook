import type { Comment } from "../types/comment.types";

export function canManageComment(comment: Comment, currentUserId?: string | null) {
  return Boolean(currentUserId && comment.authorId === currentUserId);
}
