import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../infrastructure/database/prisma.service";

@Injectable()
export class CommentUnlikeService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(userId: string, commentId: string) {
    return this.prisma.$transaction(async (tx: any) => {
      const existing = await tx.commentLike.findUnique({
        where: { commentId_userId: { commentId, userId } },
      });

      if (!existing) {
        return { liked: false };
      }

      await tx.commentLike.delete({
        where: { commentId_userId: { commentId, userId } },
      });
      await tx.commentStatistics.update({
        where: { commentId },
        data: { likeCount: { decrement: 1 } },
      });
      return { liked: false };
    });
  }
}
