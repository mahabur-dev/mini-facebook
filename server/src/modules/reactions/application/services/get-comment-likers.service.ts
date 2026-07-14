import { Injectable, Inject } from "@nestjs/common";
import { PrismaService } from "../../../../infrastructure/database/prisma.service";
import { COMMENTS_REPOSITORY, CommentsRepository } from "../../../comments/domain/repository-contracts/comments.repository";
import { LikerListPolicy } from "../../domain/policies/liker-list.policy";
import { decodeCursor, encodeCursor } from "../../../../common/pagination/cursor.pagination";
import { presentUser } from "../../../../common/presenters/user.presenter";

@Injectable()
export class GetCommentLikersService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(COMMENTS_REPOSITORY) private readonly commentsRepository: CommentsRepository,
    private readonly likerListPolicy: LikerListPolicy,
  ) {}

  async execute(viewerId: string, commentId: string, input: { limit: number; cursor?: string | null }) {
    const comment = await this.commentsRepository.findById(commentId);
    await this.likerListPolicy.canViewCommentLikers(viewerId, comment);

    const cursor = decodeCursor(input.cursor);
    const cursorFilter = cursor
      ? {
          OR: [{ createdAt: { lt: cursor.createdAt } }, { createdAt: cursor.createdAt, id: { lt: cursor.id } }],
        }
      : undefined;

    const likers = await this.prisma.commentLike.findMany({
      where: {
        commentId,
        ...(cursorFilter ? { AND: [cursorFilter] } : {}),
      },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      take: input.limit + 1,
      include: { user: true },
    });

    const hasNextPage = likers.length > input.limit;
    const trimmed = hasNextPage ? likers.slice(0, input.limit) : likers;
    const last = trimmed[trimmed.length - 1];

    return {
      users: trimmed.map((item: any) => presentUser(item.user)),
      nextCursor: hasNextPage && last ? encodeCursor({ createdAt: last.createdAt, id: last.id }) : null,
    };
  }
}
