import { SafeUser } from "../../../authentication/domain/entities/user.entity";

export type CommentStatisticsEntity = {
  commentId: string;
  likeCount: number;
  replyCount: number;
  updatedAt: Date;
};

export type CommentEntity = {
  id: string;
  postId: string;
  authorId: string;
  parentCommentId: string | null;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  author?: SafeUser;
  statistics?: CommentStatisticsEntity | null;
};
