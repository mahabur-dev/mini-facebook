import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../infrastructure/database/prisma.service";

@Injectable()
export class PostUnlikeService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(userId: string, postId: string) {
    return this.prisma.$transaction(async (tx: any) => {
      const existing = await tx.postLike.findUnique({
        where: { postId_userId: { postId, userId } },
      });

      if (!existing) {
        return { liked: false };
      }

      await tx.postLike.delete({
        where: { postId_userId: { postId, userId } },
      });
      await tx.postStatistics.update({
        where: { postId },
        data: { likeCount: { decrement: 1 } },
      });
      return { liked: false };
    });
  }
}
