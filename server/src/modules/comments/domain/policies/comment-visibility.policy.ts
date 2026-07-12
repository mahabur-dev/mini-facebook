import { Injectable } from "@nestjs/common";
import { CommentEntity } from "../entities/comment.entity";
import { PostVisibilityPolicy } from "../../../posts/domain/policies/post-visibility.policy";
import { POSTS_REPOSITORY, PostsRepository } from "../../../posts/domain/repository-contracts/posts.repository";
import { Inject } from "@nestjs/common";
import { CommentNotFoundException } from "../exceptions/comment-not-found.exception";

@Injectable()
export class CommentVisibilityPolicy {
  constructor(@Inject(POSTS_REPOSITORY) private readonly postsRepository: PostsRepository, private readonly postVisibilityPolicy: PostVisibilityPolicy) {}

  async canView(viewerId: string, comment: CommentEntity | null) {
    if (!comment || comment.deletedAt) {
      throw new CommentNotFoundException();
    }

    const post = await this.postsRepository.findById(comment.postId);
    this.postVisibilityPolicy.canView(viewerId, post);
  }
}
