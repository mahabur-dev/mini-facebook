import { mockDb } from "@/lib/mock/mock-db";

export async function getPost(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 80));
  return mockDb.feedPosts.find((post) => post.id === id) ?? null;
}
