import { Injectable, Inject } from "@nestjs/common";
import { PrismaService } from "../../../../infrastructure/database/prisma.service";
import { COMMENTS_REPOSITORY, CommentsRepository } from "../../../comments/domain/repository-contracts/comments.repository";
import { LikerListPolicy } from "../../domain/policies/liker-list.policy";

@Injectable()
export class GetCommentLikersService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(COMMENTS_REPOSITORY) private readonly commentsRepository: CommentsRepository,
    private readonly likerListPolicy: LikerListPolicy,
  ) {}

  async execute(viewerId: string, commentId: string) {
    const comment = await this.commentsRepository.findById(commentId);
    await this.likerListPolicy.canViewCommentLikers(viewerId, comment);

    const likers = await this.prisma.commentLike.findMany({
      where: { commentId },
      orderBy: { createdAt: "desc" },
      include: { user: true },
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
