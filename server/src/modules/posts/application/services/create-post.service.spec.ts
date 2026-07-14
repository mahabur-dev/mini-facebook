import { CreatePostService } from "./create-post.service";
import { PostVisibility } from "../../domain/enums/post-visibility.enum";
import { PostEmptyException } from "../../domain/exceptions/post-empty.exception";
import { InvalidMediaException } from "../../../media/domain/exceptions/invalid-media.exception";
import { MediaNotOwnedException } from "../../../media/domain/exceptions/media-not-owned.exception";

describe("CreatePostService", () => {
  const prisma = {
    $transaction: jest.fn(),
  };
  const postsRepository = {
    create: jest.fn(),
    findById: jest.fn(),
  };
  const mediaRepository = {
    findById: jest.fn(),
    attachToPost: jest.fn(),
  };
  const postCreationPolicy = {
    canCreate: jest.fn(),
  };
  const mediaAttachmentPolicy = {
    canAttach: jest.fn(),
  };

  const service = new CreatePostService(
    prisma as any,
    postsRepository as any,
    mediaRepository as any,
    postCreationPolicy as any,
    mediaAttachmentPolicy as any,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("rejects empty posts without media", async () => {
    postCreationPolicy.canCreate.mockImplementation(() => {
      throw new PostEmptyException();
    });

    await expect(
      service.execute({
        authorId: "user-1",
        content: "   ",
        visibility: PostVisibility.PUBLIC,
      }),
    ).rejects.toBeInstanceOf(PostEmptyException);
  });

  it("creates a post and attaches media inside the transaction", async () => {
    const tx = {
      postStatistics: {
        create: jest.fn(),
      },
    };
    prisma.$transaction.mockImplementation(async (callback: any) => callback(tx));
    postCreationPolicy.canCreate.mockReturnValue(undefined);
    mediaRepository.findById.mockResolvedValue({
      id: "media-1",
      ownerId: "user-1",
      postId: null,
      fileUrl: "https://example.com/image.jpg",
      storageKey: "storage-key",
      mimeType: "image/jpeg",
      fileSize: 1024n,
      width: 100,
      height: 100,
      createdAt: new Date("2026-07-12T10:00:00.000Z"),
      deletedAt: null,
    });
    postsRepository.create.mockResolvedValue({
      id: "post-1",
      authorId: "user-1",
      content: "hello",
      visibility: PostVisibility.PUBLIC,
      createdAt: new Date("2026-07-12T10:00:00.000Z"),
      updatedAt: new Date("2026-07-12T10:00:00.000Z"),
      deletedAt: null,
    });
    postsRepository.findById.mockResolvedValue({ id: "post-1" });

    await expect(
      service.execute({
        authorId: "user-1",
        content: " hello ",
        visibility: PostVisibility.PUBLIC,
        mediaId: "media-1",
      }),
    ).resolves.toEqual({ post: { id: "post-1" } });

    expect(mediaRepository.findById).toHaveBeenCalledWith("media-1", tx);
    expect(mediaAttachmentPolicy.canAttach).toHaveBeenCalledWith("user-1", expect.any(Object));
    expect(postsRepository.create).toHaveBeenCalledWith(
      {
        authorId: "user-1",
        content: "hello",
        visibility: PostVisibility.PUBLIC,
      },
      tx,
    );
    expect(tx.postStatistics.create).toHaveBeenCalledWith({
      data: {
        postId: "post-1",
        likeCount: 0,
        commentCount: 0,
        replyCount: 0,
      },
    });
    expect(mediaRepository.attachToPost).toHaveBeenCalledWith("media-1", "post-1", tx);
    expect(postsRepository.findById).toHaveBeenCalledWith("post-1", tx);
  });

  it("rejects media that belongs to another user", async () => {
    const tx = {
      postStatistics: {
        create: jest.fn(),
      },
    };
    prisma.$transaction.mockImplementation(async (callback: any) => callback(tx));
    postCreationPolicy.canCreate.mockReturnValue(undefined);
    mediaRepository.findById.mockResolvedValue({
      id: "media-1",
      ownerId: "user-2",
      postId: null,
      fileUrl: "https://example.com/image.jpg",
      storageKey: "storage-key",
      mimeType: "image/jpeg",
      fileSize: 1024n,
      width: 100,
      height: 100,
      createdAt: new Date("2026-07-12T10:00:00.000Z"),
      deletedAt: null,
    });
    mediaAttachmentPolicy.canAttach.mockImplementation(() => {
      throw new MediaNotOwnedException();
    });

    await expect(
      service.execute({
        authorId: "user-1",
        content: "hello",
        visibility: PostVisibility.PUBLIC,
        mediaId: "media-1",
      }),
    ).rejects.toBeInstanceOf(MediaNotOwnedException);
  });
});
