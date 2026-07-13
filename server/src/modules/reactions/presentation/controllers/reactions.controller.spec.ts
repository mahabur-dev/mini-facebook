import { ReactionsController } from "./reactions.controller";

describe("ReactionsController", () => {
  const postLikeService = { execute: jest.fn() };
  const postUnlikeService = { execute: jest.fn() };
  const getPostLikersService = { execute: jest.fn() };
  const commentLikeService = { execute: jest.fn() };
  const commentUnlikeService = { execute: jest.fn() };
  const getCommentLikersService = { execute: jest.fn() };

  const controller = new ReactionsController(
    postLikeService as any,
    postUnlikeService as any,
    getPostLikersService as any,
    commentLikeService as any,
    commentUnlikeService as any,
    getCommentLikersService as any,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("likes a post for the current user", async () => {
    postLikeService.execute.mockResolvedValue({ liked: true });

    await expect(controller.likePost({ sub: "user-1" }, "post-1")).resolves.toEqual({ liked: true });

    expect(postLikeService.execute).toHaveBeenCalledWith("user-1", "post-1");
  });

  it("unlikes a post for the current user", async () => {
    postUnlikeService.execute.mockResolvedValue({ liked: false });

    await expect(controller.unlikePost({ sub: "user-1" }, "post-1")).resolves.toEqual({ liked: false });

    expect(postUnlikeService.execute).toHaveBeenCalledWith("user-1", "post-1");
  });

  it("lists post likers with defaults", async () => {
    getPostLikersService.execute.mockResolvedValue({ users: [], nextCursor: null });

    await expect(controller.getPostLikers({ sub: "user-1" }, "post-1", {} as any)).resolves.toEqual({
      users: [],
      nextCursor: null,
    });

    expect(getPostLikersService.execute).toHaveBeenCalledWith("user-1", "post-1", {
      limit: 20,
      cursor: undefined,
    });
  });

  it("likes a comment for the current user", async () => {
    commentLikeService.execute.mockResolvedValue({ liked: true });

    await expect(controller.likeComment({ sub: "user-1" }, "comment-1")).resolves.toEqual({ liked: true });

    expect(commentLikeService.execute).toHaveBeenCalledWith("user-1", "comment-1");
  });

  it("unlikes a comment for the current user", async () => {
    commentUnlikeService.execute.mockResolvedValue({ liked: false });

    await expect(controller.unlikeComment({ sub: "user-1" }, "comment-1")).resolves.toEqual({ liked: false });

    expect(commentUnlikeService.execute).toHaveBeenCalledWith("user-1", "comment-1");
  });

  it("lists comment likers with custom cursor and limit", async () => {
    getCommentLikersService.execute.mockResolvedValue({ users: [], nextCursor: "cursor-1" });

    await expect(
      controller.getCommentLikers(
        { sub: "user-1" },
        "comment-1",
        {
          cursor: "cursor-2",
          limit: 35,
        } as any,
      ),
    ).resolves.toEqual({
      users: [],
      nextCursor: "cursor-1",
    });

    expect(getCommentLikersService.execute).toHaveBeenCalledWith("user-1", "comment-1", {
      limit: 35,
      cursor: "cursor-2",
    });
  });
});
