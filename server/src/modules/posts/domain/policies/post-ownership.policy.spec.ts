import { PostOwnershipPolicy } from "./post-ownership.policy";

describe("PostOwnershipPolicy", () => {
  const policy = new PostOwnershipPolicy();

  it("allows the owner to manage the post", () => {
    expect(() =>
      policy.canManage("author-1", {
        id: "post-1",
        authorId: "author-1",
        content: "hello",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      } as any),
    ).not.toThrow();
  });

  it("rejects deleted posts", () => {
    expect(() =>
      policy.canManage("author-1", {
        id: "post-1",
        authorId: "author-1",
        content: "hello",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
      } as any),
    ).toThrow("You do not own this post");
  });

  it("rejects non-owners", () => {
    expect(() =>
      policy.canManage("viewer-1", {
        id: "post-1",
        authorId: "author-1",
        content: "hello",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      } as any),
    ).toThrow("You do not own this post");
  });
});
