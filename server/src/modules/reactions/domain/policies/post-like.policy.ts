import { Injectable } from "@nestjs/common";
import { PostEntity } from "../../../posts/domain/entities/post.entity";
import { PostVisibilityPolicy } from "../../../posts/domain/policies/post-visibility.policy";

@Injectable()
export class PostLikePolicy {
  constructor(private readonly postVisibilityPolicy: PostVisibilityPolicy) {}

  canLike(viewerId: string, post: PostEntity | null) {
    this.postVisibilityPolicy.canView(viewerId, post);
  }
}
