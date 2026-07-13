import { UpdatePostService } from "./update-post.service";
import { PostVisibility } from "../../domain/enums/post-visibility.enum";
import { PostNotOwnedException } from "../../domain/exceptions/post-not-owned.exception";

describe("UpdatePostService", () => {
  const prisma = {
    $transaction: jest.fn(),
  };
  const postsRepository = {
    findById: jest.fn(),
    update: jest.fn(),
  };
  const postOwnershipPolicy = {
    canManage: jest.fn(),
  };

  const service = new UpdatePostService(prisma as any, postsRepository as any, postOwnershipPolicy as any);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("rejects updates when the post is missing or owned by another user", async () => {
    const tx = {};
    prisma.$transaction.mockImplementation(async (callback: any) => callback(tx));
    postsRepository.findById.mockResolvedValue(null);
    postOwnershipPolicy.canManage.mockImplementation(() => {
      throw new PostNotOwnedException();
    });

    await expect(
      service.execute("user-1", "post-1", {
        content: "updated",
      }),
    ).rejects.toBeInstanceOf(PostNotOwnedException);
  });

  it("trims content and updates visibility inside the transaction", async () => {
    const tx = {};
    prisma.$transaction.mockImplementation(async (callback: any) => callback(tx));
    postsRepository.findById.mockResolvedValueOnce({
      id: "post-1",
      authorId: "user-1",
      content: "hello",
      visibility: PostVisibility.PUBLIC,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });
    postOwnershipPolicy.canManage.mockReturnValue(undefined);
    postsRepository.update.mockResolvedValue(undefined);
    postsRepository.findById.mockResolvedValueOnce({
      id: "post-1",
      authorId: "user-1",
      content: "updated",
      visibility: PostVisibility.PRIVATE,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

    await expect(
      service.execute("user-1", "post-1", {
        content: "  updated  ",
        visibility: PostVisibility.PRIVATE,
      }),
    ).resolves.toEqual({
      post: expect.objectContaining({
        id: "post-1",
        visibility: PostVisibility.PRIVATE,
      }),
    });

    expect(postsRepository.update).toHaveBeenCalledWith(
      "post-1",
      {
        content: "updated",
        visibility: PostVisibility.PRIVATE,
      },
      tx,
    );
  });
});
