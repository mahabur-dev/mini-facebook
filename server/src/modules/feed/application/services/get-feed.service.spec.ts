import { GetFeedService } from "./get-feed.service";

describe("GetFeedService", () => {
  it("serializes the feed cursor as a base64url token", async () => {
    const repository = {
      findFeed: jest.fn().mockResolvedValue({
        items: [
          {
            id: "post-1",
            authorId: "user-1",
            content: "hello",
            visibility: "PUBLIC",
            createdAt: new Date("2026-07-12T10:00:00.000Z"),
            updatedAt: new Date("2026-07-12T10:00:00.000Z"),
            deletedAt: null,
            author: {
              id: "user-1",
              firstName: "A",
              lastName: "B",
              email: "a@example.com",
              status: "ACTIVE",
              lastLoginAt: null,
              createdAt: new Date("2026-07-12T09:00:00.000Z"),
              updatedAt: new Date("2026-07-12T09:00:00.000Z"),
              deletedAt: null,
            },
            media: null,
            statistics: null,
            isLikedByCurrentUser: false,
            isOwner: true,
          },
        ],
        nextCursor: {
          createdAt: new Date("2026-07-12T10:00:00.000Z"),
          id: "post-1",
        },
      }),
    };
    const service = new GetFeedService(repository as any);

    const result = await service.execute({
      viewerId: "user-1",
      limit: 10,
      cursor: null,
    });

    expect(repository.findFeed).toHaveBeenCalledWith({
      viewerId: "user-1",
      limit: 10,
      cursor: null,
    });
    expect(result.posts).toHaveLength(1);
    expect(result.nextCursor).toBe(
      Buffer.from(
        JSON.stringify({
          createdAt: "2026-07-12T10:00:00.000Z",
          id: "post-1",
        }),
      ).toString("base64url"),
    );
  });
});
