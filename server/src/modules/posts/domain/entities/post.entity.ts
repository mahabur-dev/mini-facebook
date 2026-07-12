import { PostVisibility } from "../enums/post-visibility.enum";
import { SafeUser } from "../../../authentication/domain/entities/user.entity";
import { MediaEntity } from "../../../media/domain/entities/media.entity";

export type PostStatisticsEntity = {
  postId: string;
  likeCount: number;
  commentCount: number;
  replyCount: number;
  updatedAt: Date;
};

export type PostEntity = {
  id: string;
  authorId: string;
  content: string | null;
  visibility: PostVisibility;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  author?: SafeUser;
  media?: MediaEntity | null;
  statistics?: PostStatisticsEntity | null;
};
