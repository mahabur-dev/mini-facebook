import { mockDb } from "@/lib/mock/mock-db";

export async function getMockFeedPage(cursor?: string | null) {
  await new Promise((resolve) => setTimeout(resolve, 120));

  if (!cursor) {
    return mockDb.feedPages[0];
  }

  return mockDb.feedPages.find((page, index) => index === 1 && cursor === "page-2") ?? {
    items: [],
    nextCursor: null,
  };
}
