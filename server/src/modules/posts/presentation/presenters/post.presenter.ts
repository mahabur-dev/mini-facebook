import { PostEntity } from "../../domain/entities/post.entity";

export function presentPost(post: PostEntity) {
  return {
    ...post,
    media: post.media
      ? {
          ...post.media,
          fileSize: post.media.fileSize.toString(),
        }
      : null,
  };
}
