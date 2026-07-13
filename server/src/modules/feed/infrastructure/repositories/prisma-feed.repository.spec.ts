import { PrismaFeedRepository } from "./prisma-feed.repository";
import { PostVisibility } from "../../../posts/domain/enums/post-visibility.enum";

describe("PrismaFeedRepository", () => {
  it("builds a feed query with visibility filtering and cursor pagination", async () => {
    const prisma = {
      post: {
        findMany: jest.fn().mockResolvedValue([]),
      },
    };
    const repository = new PrismaFeedRepository(prisma as any);
    const cursor = {
      createdAt: new Date("2026-07-12T10:00:00.000Z"),
      id: "post-100",
    };

    await repository.findFeed({
      viewerId: "user-1",
      limit: 10,
      cursor,
    });

    expect(prisma.post.findMany).toHaveBeenCalledWith({
      where: {
        deletedAt: null,
        AND: [
          {
            OR: [{ visibility: PostVisibility.PUBLIC }, { authorId: "user-1" }],
          },
          {
            OR: [
              { createdAt: { lt: cursor.createdAt } },
              { createdAt: cursor.createdAt, id: { lt: cursor.id } },
            ],
          },
        ],
      },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      take: 11,
      include: {
        author: true,
        media: true,
        statistics: true,
        likes: {
          where: { userId: "user-1" },
          select: { id: true },
        },
      },
    });
  });

  it("returns the next cursor from the final item when more rows exist", async () => {
    const prisma = {
      post: {
        findMany: jest.fn().mockResolvedValue([
          {
            id: "post-2",
            authorId: "user-1",
            content: "second",
            visibility: PostVisibility.PUBLIC,
            createdAt: new Date("2026-07-12T10:00:00.000Z"),
            updatedAt: new Date("2026-07-12T10:00:00.000Z"),
            deletedAt: null,
            author: {
              id: "user-1",
              firstName: "A",
              lastName: "B",
              email: "a@example.com",
              status: "ACTIVE",
              lastLoginAt: null,
              createdAt: new Date("2026-07-12T09:00:00.000Z"),
              updatedAt: new Date("2026-07-12T09:00:00.000Z"),
              deletedAt: null,
            },
            media: null,
            statistics: null,
            likes: [],
          },
          {
            id: "post-1",
            authorId: "user-2",
            content: "first",
            visibility: PostVisibility.PUBLIC,
            createdAt: new Date("2026-07-12T09:00:00.000Z"),
            updatedAt: new Date("2026-07-12T09:00:00.000Z"),
            deletedAt: null,
            author: {
              id: "user-2",
              firstName: "C",
              lastName: "D",
              email: "c@example.com",
              status: "ACTIVE",
              lastLoginAt: null,
              createdAt: new Date("2026-07-12T08:00:00.000Z"),
              updatedAt: new Date("2026-07-12T08:00:00.000Z"),
              deletedAt: null,
            },
            media: null,
            statistics: null,
            likes: [{ id: "like-1" }],
          },
        ]),
      },
    };
    const repository = new PrismaFeedRepository(prisma as any);

    const result = await repository.findFeed({
      viewerId: "user-1",
      limit: 1,
      cursor: null,
    });

    expect(result.items).toHaveLength(1);
    expect(result.items[0]).toMatchObject({
      id: "post-2",
      isOwner: true,
      isLikedByCurrentUser: false,
    });
    expect(result.nextCursor).toEqual({
      createdAt: new Date("2026-07-12T10:00:00.000Z"),
      id: "post-2",
    });
  });
});
