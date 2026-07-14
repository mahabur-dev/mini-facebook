import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../infrastructure/database/prisma.service";
import { FeedQueryInput, FeedRepository } from "../../domain/repository-contracts/feed.repository";
import { FeedPostEntity } from "../../domain/entities/feed-post.entity";
import { PostVisibility } from "../../../posts/domain/enums/post-visibility.enum";

function mapFeedPost(post: any, viewerId: string): FeedPostEntity {
  return {
    ...post,
    visibility: post.visibility as PostVisibility,
    author: {
      id: post.author.id,
      firstName: post.author.firstName,
      lastName: post.author.lastName,
      email: post.author.email,
      profileImageUrl: post.author.profileImageUrl,
      profileImageStorageKey: post.author.profileImageStorageKey,
      status: post.author.status,
      lastLoginAt: post.author.lastLoginAt,
      createdAt: post.author.createdAt,
      updatedAt: post.author.updatedAt,
      deletedAt: post.author.deletedAt,
    },
    media: post.media
      ? {
          ...post.media,
          fileUrl: post.media.imageUrl,
          fileSize: post.media.fileSize,
        }
      : null,
    statistics: post.statistics
      ? {
          ...post.statistics,
        }
      : null,
    isLikedByCurrentUser: post.likes?.length > 0,
    isOwner: post.authorId === viewerId,
  };
}

@Injectable()
export class PrismaFeedRepository implements FeedRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findFeed(input: FeedQueryInput) {
    const cursorFilter = input.cursor
      ? {
          OR: [
            { createdAt: { lt: input.cursor.createdAt } },
            { createdAt: input.cursor.createdAt, id: { lt: input.cursor.id } },
          ],
        }
      : undefined;

    const posts = await this.prisma.post.findMany({
      where: {
        deletedAt: null,
        AND: [
          {
            OR: [{ visibility: PostVisibility.PUBLIC }, { authorId: input.viewerId }],
          },
          ...(cursorFilter ? [cursorFilter] : []),
        ],
      },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      take: input.limit + 1,
      include: {
        author: true,
        media: true,
        statistics: true,
        likes: {
          where: { userId: input.viewerId },
          select: { id: true },
        },
      },
    });

    const hasNextPage = posts.length > input.limit;
    const trimmed = hasNextPage ? posts.slice(0, input.limit) : posts;
    const items = trimmed.map((post: any) => mapFeedPost(post, input.viewerId));
    const last = trimmed[trimmed.length - 1];
    const nextCursor = hasNextPage && last ? { createdAt: last.createdAt, id: last.id } : null;

    return { items, nextCursor };
  }
}
