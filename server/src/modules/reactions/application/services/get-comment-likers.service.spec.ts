import { GetCommentLikersService } from "./get-comment-likers.service";

describe("GetCommentLikersService", () => {
  const prisma = {
    commentLike: {
      findMany: jest.fn(),
    },
  };
  const commentsRepository = {
    findById: jest.fn(),
  };
  const likerListPolicy = {
    canViewCommentLikers: jest.fn(),
  };

  const service = new GetCommentLikersService(prisma as any, commentsRepository as any, likerListPolicy as any);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns paginated comment likers", async () => {
    commentsRepository.findById.mockResolvedValue({
      id: "comment-1",
      postId: "post-1",
      authorId: "user-1",
      parentCommentId: null,
      content: "hello",
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });
    prisma.commentLike.findMany.mockResolvedValue([
      {
        id: "like-2",
        createdAt: new Date("2026-07-12T11:00:00.000Z"),
        user: {
          id: "user-2",
          firstName: "A",
          lastName: "B",
          email: "a@example.com",
          status: "ACTIVE",
          lastLoginAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      },
      {
        id: "like-1",
        createdAt: new Date("2026-07-12T10:00:00.000Z"),
        user: {
          id: "user-3",
          firstName: "C",
          lastName: "D",
          email: "c@example.com",
          status: "ACTIVE",
          lastLoginAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      },
    ]);

    const result = await service.execute("viewer-1", "comment-1", {
      limit: 1,
      cursor: null,
    });

    expect(commentsRepository.findById).toHaveBeenCalledWith("comment-1");
    expect(likerListPolicy.canViewCommentLikers).toHaveBeenCalledWith(
      "viewer-1",
      expect.objectContaining({ id: "comment-1" }),
    );
    expect(prisma.commentLike.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ commentId: "comment-1" }),
        take: 2,
      }),
    );
    expect(result.users).toHaveLength(1);
    expect(result.nextCursor).toBe(
      Buffer.from(
        JSON.stringify({
          createdAt: "2026-07-12T11:00:00.000Z",
          id: "like-2",
        }),
      ).toString("base64url"),
    );
  });
});
