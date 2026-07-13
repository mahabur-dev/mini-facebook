import { FeedPostEntity } from "../../domain/entities/feed-post.entity";
import { presentUser } from "../../../../common/presenters/user.presenter";
import { presentMedia } from "../../../media/presentation/presenters/media.presenter";

export function presentFeedPost(post: FeedPostEntity) {
  return {
    ...post,
    author: presentUser(post.author),
    media: post.media ? presentMedia(post.media) : null,
  };
}
