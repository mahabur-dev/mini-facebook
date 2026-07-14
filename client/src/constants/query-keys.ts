export const queryKeys = {
  auth: {
    currentUser: ["auth", "currentUser"] as const,
  },
  feed: {
    list: ["feed", "list"] as const,
    comments: (postId: string) => ["feed", "list", "comments", postId] as const,
    replies: (commentId: string) => ["feed", "list", "comments", commentId, "replies"] as const,
  },
} as const;
