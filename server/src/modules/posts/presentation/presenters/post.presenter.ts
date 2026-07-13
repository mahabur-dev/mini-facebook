import { PostEntity } from "../../domain/entities/post.entity";
import { presentUser } from "../../../../common/presenters/user.presenter";
import { presentMedia } from "../../../media/presentation/presenters/media.presenter";

export function presentPost(post: PostEntity) {
  return {
    ...post,
    author: post.author ? presentUser(post.author) : undefined,
    media: post.media ? presentMedia(post.media) : null,
  };
}
