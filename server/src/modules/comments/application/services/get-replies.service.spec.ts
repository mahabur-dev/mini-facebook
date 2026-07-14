import { GetRepliesService } from "./get-replies.service";

describe("GetRepliesService", () => {
  const commentsRepository = {
    findRepliesPaginated: jest.fn(),
  };
  const prisma = {
    commentLike: {
      findMany: jest.fn().mockResolvedValue([]),
    },
  };
  const commentVisibilityPolicy = {
    canView: jest.fn(),
  };

  const service = new GetRepliesService(prisma as any, commentsRepository as any, commentVisibilityPolicy as any);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("decodes the cursor and returns paginated replies", async () => {
    commentsRepository.findRepliesPaginated.mockResolvedValue({
      items: [
        {
          id: "reply-1",
          postId: "post-1",
          authorId: "user-2",
          parentCommentId: "comment-1",
          content: "reply",
          createdAt: new Date("2026-07-12T10:00:00.000Z"),
          updatedAt: new Date("2026-07-12T10:00:00.000Z"),
          deletedAt: null,
          author: {
            id: "user-2",
            firstName: "A",
            lastName: "B",
            email: "a@example.com",
            status: "ACTIVE",
            lastLoginAt: null,
            createdAt: new Date("2026-07-12T09:00:00.000Z"),
            updatedAt: new Date("2026-07-12T09:00:00.000Z"),
            deletedAt: null,
          },
          statistics: null,
        },
      ],
      nextCursor: {
        createdAt: new Date("2026-07-12T10:00:00.000Z"),
        id: "reply-1",
      },
    });
    commentVisibilityPolicy.canView.mockResolvedValue(undefined);

    const result = await service.execute("viewer-1", "comment-1", {
      limit: 5,
      cursor: null,
    });

    expect(commentsRepository.findRepliesPaginated).toHaveBeenCalledWith("comment-1", {
      limit: 5,
      cursor: null,
    });
    expect(result.replies).toHaveLength(1);
    expect(result.nextCursor).toBe(
      Buffer.from(
        JSON.stringify({
          createdAt: "2026-07-12T10:00:00.000Z",
          id: "reply-1",
        }),
      ).toString("base64url"),
    );
  });
});
