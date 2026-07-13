import { DeletePostService } from "./delete-post.service";
import { PostNotOwnedException } from "../../domain/exceptions/post-not-owned.exception";

describe("DeletePostService", () => {
  const prisma = {
    $transaction: jest.fn(),
  };
  const postsRepository = {
    findById: jest.fn(),
    delete: jest.fn(),
  };
  const postDeletionPolicy = {
    canDelete: jest.fn(),
  };

  const service = new DeletePostService(prisma as any, postsRepository as any, postDeletionPolicy as any);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("rejects deletion when the post is missing", async () => {
    const tx = {};
    prisma.$transaction.mockImplementation(async (callback: any) => callback(tx));
    postsRepository.findById.mockResolvedValue(null);
    postDeletionPolicy.canDelete.mockImplementation(() => {
      throw new PostNotOwnedException();
    });

    await expect(service.execute("user-1", "post-1")).rejects.toBeInstanceOf(PostNotOwnedException);
    expect(postsRepository.delete).not.toHaveBeenCalled();
  });

  it("soft deletes the post when the owner requests deletion", async () => {
    const tx = {};
    prisma.$transaction.mockImplementation(async (callback: any) => callback(tx));
    postsRepository.findById.mockResolvedValue({
      id: "post-1",
      authorId: "user-1",
      content: "hello",
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });
    postDeletionPolicy.canDelete.mockReturnValue(undefined);

    const before = Date.now();
    const result = await service.execute("user-1", "post-1");
    const after = Date.now();

    expect(result).toEqual({ success: true });
    expect(postsRepository.delete).toHaveBeenCalledWith("post-1", expect.any(Date), tx);
    const deletedAt = (postsRepository.delete as jest.Mock).mock.calls[0][1] as Date;
    expect(deletedAt.getTime()).toBeGreaterThanOrEqual(before);
    expect(deletedAt.getTime()).toBeLessThanOrEqual(after);
  });
});
