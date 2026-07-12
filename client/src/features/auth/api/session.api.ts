import { mockDb } from "@/lib/mock/mock-db";

export async function sessionApi() {
  await new Promise((resolve) => setTimeout(resolve, 60));
  return {
    user: mockDb.currentUser,
  };
}
