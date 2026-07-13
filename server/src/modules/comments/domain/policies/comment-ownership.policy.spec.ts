import { CommentOwnershipPolicy } from "./comment-ownership.policy";

describe("CommentOwnershipPolicy", () => {
  const policy = new CommentOwnershipPolicy();

  it("allows the owner to manage the comment", () => {
    expect(() =>
      policy.canManage("author-1", {
        id: "comment-1",
        postId: "post-1",
        authorId: "author-1",
        parentCommentId: null,
        content: "nice",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      } as any),
    ).not.toThrow();
  });

  it("rejects deleted comments", () => {
    expect(() =>
      policy.canManage("author-1", {
        id: "comment-1",
        postId: "post-1",
        authorId: "author-1",
        parentCommentId: null,
        content: "nice",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
      } as any),
    ).toThrow("You do not own this comment");
  });

  it("rejects non-owners", () => {
    expect(() =>
      policy.canManage("viewer-1", {
        id: "comment-1",
        postId: "post-1",
        authorId: "author-1",
        parentCommentId: null,
        content: "nice",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      } as any),
    ).toThrow("You do not own this comment");
  });
});
