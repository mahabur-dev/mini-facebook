import { Injectable } from "@nestjs/common";
import { PostEntity } from "../entities/post.entity";
import { PostVisibilityPolicy } from "./post-visibility.policy";

@Injectable()
export class PostInteractionPolicy {
  constructor(private readonly postVisibilityPolicy: PostVisibilityPolicy) {}

  canInteract(viewerId: string, post: PostEntity | null) {
    this.postVisibilityPolicy.canView(viewerId, post);
  }
}
