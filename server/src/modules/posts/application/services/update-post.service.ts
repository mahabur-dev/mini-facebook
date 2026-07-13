import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../infrastructure/database/prisma.service";
import { POSTS_REPOSITORY, PostsRepository } from "../../domain/repository-contracts/posts.repository";
import { PostOwnershipPolicy } from "../../domain/policies/post-ownership.policy";
import { PostVisibility } from "../../domain/enums/post-visibility.enum";
import { PostEntity } from "../../domain/entities/post.entity";
import { PostNotFoundException } from "../../domain/exceptions/post-not-found.exception";

@Injectable()
export class UpdatePostService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(POSTS_REPOSITORY) private readonly postsRepository: PostsRepository,
    private readonly postOwnershipPolicy: PostOwnershipPolicy,
  ) {}

  async execute(
    userId: string,
    postId: string,
    input: { content?: string | null; visibility?: PostVisibility },
  ): Promise<{ post: PostEntity }> {
    return this.prisma.$transaction(async (tx) => {
      const current = await this.postsRepository.findById(postId, tx);
      this.postOwnershipPolicy.canManage(userId, current);

      await this.postsRepository.update(
        postId,
        {
          content: input.content?.trim() || undefined,
          visibility: input.visibility,
        },
        tx,
      );

      const updated = await this.postsRepository.findById(postId, tx);
      if (!updated) {
        throw new PostNotFoundException();
      }

      return { post: updated };
    });
  }
}
