import { Injectable } from "@nestjs/common";
import { PostEntity } from "../entities/post.entity";
import { PostNotVisibleException } from "../exceptions/post-not-visible.exception";
import { PostVisibility } from "../enums/post-visibility.enum";

@Injectable()
export class PostVisibilityPolicy {
  canView(viewerId: string, post: PostEntity | null) {
    if (!post || post.deletedAt) {
      throw new PostNotVisibleException();
    }

    if (post.visibility === PostVisibility.PRIVATE && post.authorId !== viewerId) {
      throw new PostNotVisibleException();
    }
  }
}
