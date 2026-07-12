export const cacheKeys = {
  feed: (userId: string, cursor: string) => `feed:user:${userId}:${cursor}`,
  post: (postId: string, viewerId: string) => `post:${postId}:viewer:${viewerId}`,
};
