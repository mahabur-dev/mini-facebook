export const queryKeys = {
  auth: {
    currentUser: ["auth", "currentUser"] as const,
  },
  feed: {
    list: ["feed", "list"] as const,
  },
} as const;
