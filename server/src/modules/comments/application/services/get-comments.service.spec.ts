import { GetCommentsService } from "./get-comments.service";
import { CommentVisibilityPolicy } from "../../domain/policies/comment-visibility.policy";

describe("GetCommentsService", () => {
  const commentsRepository = {
    findByPostPaginated: jest.fn(),
  };
  const prisma = {
    commentLike: {
      findMany: jest.fn().mockResolvedValue([]),
    },
  };
  const commentVisibilityPolicy = {
    canView: jest.fn(),
  };

  const service = new GetCommentsService(prisma as any, commentsRepository as any, commentVisibilityPolicy as any);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("decodes the cursor, filters visible comments, and re-encodes the next cursor", async () => {
    const cursor = Buffer.from(
      JSON.stringify({
        createdAt: "2026-07-12T09:00:00.000Z",
        id: "comment-10",
      }),
    ).toString("base64url");

    commentsRepository.findByPostPaginated.mockResolvedValue({
      items: [
        {
          id: "comment-2",
          postId: "post-1",
          authorId: "user-2",
          parentCommentId: null,
          content: "second",
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
        id: "comment-2",
      },
    });
    commentVisibilityPolicy.canView.mockResolvedValue(undefined);

    const result = await service.execute("viewer-1", "post-1", {
      limit: 10,
      cursor,
    });

    expect(commentsRepository.findByPostPaginated).toHaveBeenCalledWith("post-1", {
      limit: 10,
      cursor: {
        createdAt: new Date("2026-07-12T09:00:00.000Z"),
        id: "comment-10",
      },
    });
    expect(commentVisibilityPolicy.canView).toHaveBeenCalledWith("viewer-1", expect.any(Object));
    expect(result.comments).toHaveLength(1);
    expect(result.nextCursor).toBe(
      Buffer.from(
        JSON.stringify({
          createdAt: "2026-07-12T10:00:00.000Z",
          id: "comment-2",
        }),
      ).toString("base64url"),
    );
  });
});
