import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../infrastructure/database/prisma.service";
import { POSTS_REPOSITORY, PostsRepository } from "../../domain/repository-contracts/posts.repository";
import { PostDeletionPolicy } from "../../domain/policies/post-deletion.policy";

@Injectable()
export class DeletePostService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(POSTS_REPOSITORY) private readonly postsRepository: PostsRepository,
    private readonly postDeletionPolicy: PostDeletionPolicy,
  ) {}

  async execute(userId: string, postId: string) {
    return this.prisma.$transaction(async (tx: any) => {
      const post = await this.postsRepository.findById(postId, tx);
      this.postDeletionPolicy.canDelete(userId, post);
      await this.postsRepository.delete(postId, new Date(), tx);
      return { success: true };
    });
  }
}
