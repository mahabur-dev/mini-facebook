export type Comment = {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string | null;
  content: string;
  parentCommentId?: string | null;
  likeCount: number;
  replyCount: number;
  liked: boolean;
  createdAt: string;
  updatedAt: string;
};

export type BackendComment = {
  id: string;
  postId: string;
  authorId: string;
  parentCommentId: string | null;
  content: string;
  createdAt: string;
  updatedAt: string;
  author?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    profileImageUrl?: string | null;
  };
  statistics?: {
    likeCount: number;
    replyCount: number;
  } | null;
  isLikedByCurrentUser?: boolean;
};
