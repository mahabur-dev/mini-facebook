import { FeedController } from "./feed.controller";

describe("FeedController", () => {
  const getFeedService = {
    execute: jest.fn(),
  };
  const controller = new FeedController(getFeedService as any);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("parses cursor tokens and forwards the feed request", async () => {
    const cursor = Buffer.from(
      JSON.stringify({
        createdAt: "2026-07-12T10:00:00.000Z",
        id: "post-10",
      }),
    ).toString("base64url");
    getFeedService.execute.mockResolvedValue({
      posts: [],
      nextCursor: "next-cursor",
    });

    await expect(
      controller.getFeed(
        { sub: "user-1" },
        {
          cursor,
          limit: 7,
        } as any,
      ),
    ).resolves.toEqual({
      posts: [],
      nextCursor: "next-cursor",
    });

    expect(getFeedService.execute).toHaveBeenCalledWith({
      viewerId: "user-1",
      limit: 7,
      cursor: {
        createdAt: new Date("2026-07-12T10:00:00.000Z"),
        id: "post-10",
      },
    });
  });
});
