import { Inject, Injectable } from "@nestjs/common";
import { POSTS_REPOSITORY, PostsRepository } from "../../domain/repository-contracts/posts.repository";
import { PostVisibilityPolicy } from "../../domain/policies/post-visibility.policy";
import { PostResponse } from "../interfaces/post-response.interface";
import { PostEntity } from "../../domain/entities/post.entity";

@Injectable()
export class GetPostService {
  constructor(
    @Inject(POSTS_REPOSITORY) private readonly postsRepository: PostsRepository,
    private readonly postVisibilityPolicy: PostVisibilityPolicy,
  ) {}

  async execute(viewerId: string, postId: string): Promise<PostResponse> {
    const post = await this.postsRepository.findById(postId);
    this.postVisibilityPolicy.canView(viewerId, post);
    return { post: post as PostEntity };
  }
}
