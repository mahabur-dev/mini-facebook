import { mockDb } from "@/lib/mock/mock-db";

export async function loginApi(email: string, password: string) {
  await new Promise((resolve) => setTimeout(resolve, 120));

  const user = mockDb.users.find((entry) => entry.email === email);

  if (!user || password.length < 6) {
    throw new Error("Invalid credentials");
  }

  return {
    user,
    token: "demo-session-token",
  };
}
