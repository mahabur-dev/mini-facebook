import { Injectable, Inject } from "@nestjs/common";
import { PrismaService } from "../../../../infrastructure/database/prisma.service";
import { POSTS_REPOSITORY, PostsRepository } from "../../../posts/domain/repository-contracts/posts.repository";
import { PostLikePolicy } from "../../domain/policies/post-like.policy";
import { LikerListPolicy } from "../../domain/policies/liker-list.policy";

@Injectable()
export class GetPostLikersService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(POSTS_REPOSITORY) private readonly postsRepository: PostsRepository,
    private readonly likerListPolicy: LikerListPolicy,
  ) {}

  async execute(viewerId: string, postId: string) {
    const post = await this.postsRepository.findById(postId);
    this.likerListPolicy.canViewPostLikers(viewerId, post);

    const likers = await this.prisma.postLike.findMany({
      where: { postId },
      orderBy: { createdAt: "desc" },
      include: {
        user: true,
      },
    });

    return {
      users: likers.map((item) => ({
        id: item.user.id,
        firstName: item.user.firstName,
        lastName: item.user.lastName,
        email: item.user.email,
        status: item.user.status,
        lastLoginAt: item.user.lastLoginAt,
        createdAt: item.user.createdAt,
        updatedAt: item.user.updatedAt,
        deletedAt: item.user.deletedAt,
      })),
    };
  }
}
