import { Injectable, Inject } from "@nestjs/common";
import { PrismaService } from "../../../../infrastructure/database/prisma.service";
import { POSTS_REPOSITORY, PostsRepository } from "../../../posts/domain/repository-contracts/posts.repository";
import { PostLikePolicy } from "../../domain/policies/post-like.policy";
import { UnlikePolicy } from "../../domain/policies/unlike.policy";

@Injectable()
export class PostLikeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly postLikePolicy: PostLikePolicy,
    private readonly unlikePolicy: UnlikePolicy,
    @Inject(POSTS_REPOSITORY) private readonly postsRepository: PostsRepository,
  ) {}

  async execute(userId: string, postId: string) {
    return this.prisma.$transaction(async (tx: any) => {
      const post = await this.postsRepository.findById(postId, tx);
      this.postLikePolicy.canLike(userId, post);

      const existing = await tx.postLike.findUnique({
        where: { postId_userId: { postId, userId } },
      });
      if (existing) {
        return { liked: true };
      }

      await tx.postLike.create({
        data: { postId, userId },
      });
      await tx.postStatistics.update({
        where: { postId },
        data: { likeCount: { increment: 1 } },
      });
      return { liked: true };
    });
  }
}
