import { CommentsController } from "./comments.controller";

describe("CommentsController", () => {
  const createCommentService = { execute: jest.fn() };
  const getCommentsService = { execute: jest.fn() };
  const getRepliesService = { execute: jest.fn() };
  const updateCommentService = { execute: jest.fn() };
  const deleteCommentService = { execute: jest.fn() };

  const controller = new CommentsController(
    createCommentService as any,
    getCommentsService as any,
    getRepliesService as any,
    updateCommentService as any,
    deleteCommentService as any,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("creates a post comment with the current user as author", async () => {
    createCommentService.execute.mockResolvedValue({ id: "comment-1" });

    await expect(
      controller.createComment(
        { sub: "user-1" },
        "post-1",
        {
          content: "Nice post",
        } as any,
      ),
    ).resolves.toEqual({ id: "comment-1" });

    expect(createCommentService.execute).toHaveBeenCalledWith({
      postId: "post-1",
      authorId: "user-1",
      content: "Nice post",
      parentCommentId: undefined,
    });
  });

  it("lists post comments with the default limit", async () => {
    getCommentsService.execute.mockResolvedValue({ comments: [], nextCursor: null });

    await expect(controller.getComments({ sub: "user-1" }, "post-1", {} as any)).resolves.toEqual({
      comments: [],
      nextCursor: null,
    });

    expect(getCommentsService.execute).toHaveBeenCalledWith("user-1", "post-1", {
      limit: 10,
      cursor: undefined,
    });
  });

  it("lists replies with the provided cursor and limit", async () => {
    getRepliesService.execute.mockResolvedValue({ replies: [], nextCursor: "cursor-1" });

    await expect(
      controller.getReplies(
        { sub: "user-1" },
        "comment-1",
        {
          cursor: "cursor-2",
          limit: 25,
        } as any,
      ),
    ).resolves.toEqual({
      replies: [],
      nextCursor: "cursor-1",
    });

    expect(getRepliesService.execute).toHaveBeenCalledWith("user-1", "comment-1", {
      limit: 25,
      cursor: "cursor-2",
    });
  });

  it("creates a reply under a parent comment", async () => {
    createCommentService.execute.mockResolvedValue({ id: "reply-1" });

    await expect(
      controller.createReply(
        { sub: "user-1" },
        "comment-1",
        {
          content: "Thanks!",
        } as any,
      ),
    ).resolves.toEqual({ id: "reply-1" });

    expect(createCommentService.execute).toHaveBeenCalledWith({
      authorId: "user-1",
      content: "Thanks!",
      parentCommentId: "comment-1",
    });
  });

  it("updates comments using the current user context", async () => {
    updateCommentService.execute.mockResolvedValue({ id: "comment-1", content: "Updated" });

    await expect(
      controller.updateComment(
        { sub: "user-1" },
        "comment-1",
        {
          content: "Updated",
        } as any,
      ),
    ).resolves.toEqual({ id: "comment-1", content: "Updated" });

    expect(updateCommentService.execute).toHaveBeenCalledWith("user-1", "comment-1", {
      content: "Updated",
    });
  });

  it("deletes comments using the current user context", async () => {
    deleteCommentService.execute.mockResolvedValue({ success: true });

    await expect(controller.deleteComment({ sub: "user-1" }, "comment-1")).resolves.toEqual({ success: true });

    expect(deleteCommentService.execute).toHaveBeenCalledWith("user-1", "comment-1");
  });
});
