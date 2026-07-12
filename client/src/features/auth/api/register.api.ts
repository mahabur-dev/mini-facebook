import { mockDb } from "@/lib/mock/mock-db";

export async function registerApi(input: { firstName: string; lastName: string; email: string; password: string }) {
  await new Promise((resolve) => setTimeout(resolve, 120));

  const user = {
    id: `user-${mockDb.users.length + 1}`,
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
  };

  return {
    user,
    token: "demo-session-token",
  };
}
