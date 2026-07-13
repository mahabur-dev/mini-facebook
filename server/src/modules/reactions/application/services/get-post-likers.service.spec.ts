import { GetPostLikersService } from "./get-post-likers.service";
import { PostVisibility } from "../../../posts/domain/enums/post-visibility.enum";

describe("GetPostLikersService", () => {
  const prisma = {
    postLike: {
      findMany: jest.fn(),
    },
  };
  const postsRepository = {
    findById: jest.fn(),
  };
  const likerListPolicy = {
    canViewPostLikers: jest.fn(),
  };

  const service = new GetPostLikersService(prisma as any, postsRepository as any, likerListPolicy as any);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("decodes the cursor and returns paginated likers", async () => {
    const cursor = Buffer.from(
      JSON.stringify({
        createdAt: "2026-07-12T10:00:00.000Z",
        id: "like-10",
      }),
    ).toString("base64url");

    postsRepository.findById.mockResolvedValue({
      id: "post-1",
      authorId: "user-1",
      content: "hello",
      visibility: PostVisibility.PUBLIC,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });
    prisma.postLike.findMany.mockResolvedValue([
      {
        id: "like-3",
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
        id: "like-2",
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

    const result = await service.execute("viewer-1", "post-1", {
      limit: 1,
      cursor,
    });

    expect(postsRepository.findById).toHaveBeenCalledWith("post-1");
    expect(likerListPolicy.canViewPostLikers).toHaveBeenCalledWith(
      "viewer-1",
      expect.objectContaining({ id: "post-1" }),
    );
    expect(prisma.postLike.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ postId: "post-1" }),
        take: 2,
      }),
    );
    expect(result.users).toHaveLength(1);
    expect(result.nextCursor).toBe(
      Buffer.from(
        JSON.stringify({
          createdAt: "2026-07-12T11:00:00.000Z",
          id: "like-3",
        }),
      ).toString("base64url"),
    );
  });
});
