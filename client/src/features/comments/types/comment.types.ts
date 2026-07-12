export type Comment = {
  id: string;
  postId: string;
  author: string;
  content: string;
  parentCommentId?: string | null;
};
