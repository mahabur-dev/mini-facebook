import { Injectable } from "@nestjs/common";
import { PostEntity } from "../entities/post.entity";
import { PostNotOwnedException } from "../exceptions/post-not-owned.exception";

@Injectable()
export class PostOwnershipPolicy {
  canManage(userId: string, post: PostEntity | null) {
    if (!post || post.deletedAt || post.authorId !== userId) {
      throw new PostNotOwnedException();
    }
  }
}
