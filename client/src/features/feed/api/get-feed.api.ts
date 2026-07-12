import { getMockFeedPage } from "./feed.mock";

export async function getFeed(cursor?: string | null) {
  return getMockFeedPage(cursor);
}
