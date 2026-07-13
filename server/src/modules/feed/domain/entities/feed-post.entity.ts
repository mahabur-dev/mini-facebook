import { PostVisibility } from "../../../posts/domain/enums/post-visibility.enum";
import { MediaEntity } from "../../../media/domain/entities/media.entity";

export type FeedPostEntity = {
  id: string;
  authorId: string;
  content: string | null;
  visibility: PostVisibility;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  author: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    profileImageUrl: string | null;
    profileImageStorageKey: string | null;
    status: string;
    lastLoginAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  };
  media: MediaEntity | null;
  statistics: {
    postId: string;
    likeCount: number;
    commentCount: number;
    replyCount: number;
    updatedAt: Date;
  } | null;
  isLikedByCurrentUser: boolean;
  isOwner: boolean;
};
