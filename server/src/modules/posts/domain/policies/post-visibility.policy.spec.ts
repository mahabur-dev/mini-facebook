import { PostVisibilityPolicy } from "./post-visibility.policy";
import { PostVisibility } from "../enums/post-visibility.enum";

describe("PostVisibilityPolicy", () => {
  const policy = new PostVisibilityPolicy();

  it("allows public posts", () => {
    expect(() =>
      policy.canView("viewer-1", {
        id: "post-1",
        authorId: "author-1",
        content: "hello",
        visibility: PostVisibility.PUBLIC,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      } as any),
    ).not.toThrow();
  });

  it("allows a private post for the owner", () => {
    expect(() =>
      policy.canView("author-1", {
        id: "post-1",
        authorId: "author-1",
        content: "hello",
        visibility: PostVisibility.PRIVATE,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      } as any),
    ).not.toThrow();
  });

  it("rejects deleted posts", () => {
    expect(() =>
      policy.canView("viewer-1", {
        id: "post-1",
        authorId: "author-1",
        content: "hello",
        visibility: PostVisibility.PUBLIC,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
      } as any),
    ).toThrow("Post not found");
  });

  it("rejects private posts for non-owners", () => {
    expect(() =>
      policy.canView("viewer-1", {
        id: "post-1",
        authorId: "author-1",
        content: "hello",
        visibility: PostVisibility.PRIVATE,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      } as any),
    ).toThrow("Post not found");
  });
});
