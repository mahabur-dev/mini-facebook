import { CommentVisibilityPolicy } from "./comment-visibility.policy";
import { PostVisibilityPolicy } from "../../../posts/domain/policies/post-visibility.policy";
import { CommentNotFoundException } from "../exceptions/comment-not-found.exception";
import { PostVisibility } from "../../../posts/domain/enums/post-visibility.enum";

describe("CommentVisibilityPolicy", () => {
  const postsRepository = {
    findById: jest.fn(),
  };
  const postVisibilityPolicy = new PostVisibilityPolicy();
  const policy = new CommentVisibilityPolicy(postsRepository as any, postVisibilityPolicy);

  it("allows comments on visible posts", async () => {
    postsRepository.findById.mockResolvedValue({
      id: "post-1",
      authorId: "author-1",
      content: "hello",
      visibility: PostVisibility.PUBLIC,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

    await expect(
      policy.canView("viewer-1", {
        id: "comment-1",
        postId: "post-1",
        authorId: "author-2",
        parentCommentId: null,
        content: "nice",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      } as any),
    ).resolves.toBeUndefined();
  });

  it("rejects deleted comments", async () => {
    await expect(
      policy.canView("viewer-1", {
        id: "comment-1",
        postId: "post-1",
        authorId: "author-2",
        parentCommentId: null,
        content: "nice",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
      } as any),
    ).rejects.toBeInstanceOf(CommentNotFoundException);
  });

  it("rejects comments when the parent post is not visible", async () => {
    postsRepository.findById.mockResolvedValue({
      id: "post-1",
      authorId: "author-1",
      content: "hello",
      visibility: PostVisibility.PRIVATE,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

    await expect(
      policy.canView("viewer-1", {
        id: "comment-1",
        postId: "post-1",
        authorId: "author-2",
        parentCommentId: null,
        content: "nice",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      } as any),
    ).rejects.toThrow("Post not found");
  });
});
